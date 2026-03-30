import { useState, useCallback } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, Package, Search, Wrench, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SprintResults from "./SprintResults";
import type { SprintMetrics } from "./SprintResults";
import type { BacklogScenario, BacklogItem } from "@/data/backlog-items";

interface BacklogBoardProps {
  scenario: BacklogScenario;
  onBack: () => void;
}

type Column = "backlog" | "sprint" | "out";
type Phase = "planning" | "results" | "feedback";

const typeConfig = {
  bug: { icon: AlertTriangle, label: "Bug", className: "bg-destructive/20 text-destructive border-destructive/30" },
  feature: { icon: Package, label: "Feature", className: "bg-primary/20 text-primary border-primary/30" },
  "tech-debt": { icon: Wrench, label: "Tech Debt", className: "bg-warning/20 text-warning border-warning/30" },
  research: { icon: Search, label: "Research", className: "bg-info/20 text-info border-info/30" },
};

const effortLabels: Record<string, string> = { P: "P (0.5 sprint)", M: "M (1 sprint)", G: "G (2 sprints)", GG: "GG (3 sprints)" };
const effortValues: Record<string, number> = { P: 0.5, M: 1, G: 2, GG: 3 };

function simulateSprintExecution(sprintItemIds: string[], allItems: BacklogItem[]): SprintMetrics {
  const sprintItems = sprintItemIds.map((id) => allItems.find((i) => i.id === id)!).filter(Boolean);

  // Randomly determine delivered items (60-90% chance per item, smaller items more likely)
  const deliveredIds: string[] = [];
  const notDeliveredIds: string[] = [];

  for (const item of sprintItems) {
    const baseChance = { P: 0.95, M: 0.85, G: 0.65, GG: 0.5 }[item.effort];
    if (Math.random() < baseChance) {
      deliveredIds.push(item.id);
    } else {
      notDeliveredIds.push(item.id);
    }
  }

  // Ensure at least one delivered if there are items
  if (deliveredIds.length === 0 && sprintItems.length > 0) {
    const lucky = sprintItems[Math.floor(Math.random() * sprintItems.length)];
    deliveredIds.push(lucky.id);
    const idx = notDeliveredIds.indexOf(lucky.id);
    if (idx >= 0) notDeliveredIds.splice(idx, 1);
  }

  const velocity = deliveredIds.reduce((sum, id) => {
    const item = allItems.find((i) => i.id === id);
    return sum + (item ? effortValues[item.effort] : 0);
  }, 0);

  const throughput = deliveredIds.length;

  // Simulate realistic lead/cycle times
  const leadTimeDays = Math.floor(Math.random() * 5) + 8; // 8-12 days
  const cycleTimeDays = Math.floor(Math.random() * 3) + 3; // 3-5 days

  return { velocity, throughput, leadTimeDays, cycleTimeDays, deliveredIds, notDeliveredIds };
}

const BacklogBoard = ({ scenario, onBack }: BacklogBoardProps) => {
  const [currentSprint, setCurrentSprint] = useState(1);
  const [phase, setPhase] = useState<Phase>("planning");
  const [columns, setColumns] = useState<Record<Column, string[]>>({
    backlog: scenario.items.map((i) => i.id),
    sprint: [],
    out: [],
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [sprintMetrics, setSprintMetrics] = useState<SprintMetrics | null>(null);
  const [sprintHistory, setSprintHistory] = useState<{ sprint: number; metrics: SprintMetrics }[]>([]);
  const [allItems, setAllItems] = useState<BacklogItem[]>(scenario.items);
  const [newItemsAnnouncement, setNewItemsAnnouncement] = useState<BacklogItem[]>([]);

  const itemMap = new Map(allItems.map((i) => [i.id, i]));

  const getSprintLoad = useCallback(() => {
    return columns.sprint.reduce((sum, id) => {
      const item = itemMap.get(id);
      return sum + (item ? effortValues[item.effort] : 0);
    }, 0);
  }, [columns.sprint, itemMap]);

  // Use previous velocity as capacity hint for sprint 2+, minimum floor of 1
  const rawCapacity = currentSprint === 1
    ? 5
    : (sprintHistory.length > 0 ? sprintHistory[sprintHistory.length - 1].metrics.velocity : 5);
  const sprintCapacity = Math.max(rawCapacity, 1);

  // Check if all backlog items are larger than capacity
  const smallestBacklogEffort = columns.backlog.length > 0
    ? Math.min(...columns.backlog.map((id) => { const item = itemMap.get(id); return item ? effortValues[item.effort] : Infinity; }))
    : 0;
  const capacityTooLow = currentSprint > 1 && sprintCapacity < smallestBacklogEffort && columns.backlog.length > 0;

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumn: Column) => {
    e.preventDefault();
    if (!draggedItem) return;

    const item = itemMap.get(draggedItem);
    if (!item) return;

    if (targetColumn === "sprint") {
      const currentLoad = columns.sprint
        .filter((id) => id !== draggedItem)
        .reduce((sum, id) => {
          const i = itemMap.get(id);
          return sum + (i ? effortValues[i.effort] : 0);
        }, 0);
      if (currentLoad + effortValues[item.effort] > sprintCapacity) return;
    }

    setColumns((prev) => {
      const newCols = { ...prev };
      for (const col of ["backlog", "sprint", "out"] as Column[]) {
        newCols[col] = prev[col].filter((id) => id !== draggedItem);
      }
      newCols[targetColumn] = [...newCols[targetColumn], draggedItem];
      return newCols;
    });
    setDraggedItem(null);
  };

  const handleSubmit = () => {
    if (currentSprint === 1) {
      // Sprint 1: show optimal feedback first
      const sprintItems = columns.sprint;
      const optimal = scenario.optimalOrder;
      let points = 0;
      for (const id of optimal) {
        if (sprintItems.includes(id)) points += 25;
      }
      setScore(points);
      setSubmitted(true);
    } else {
      // Sprint 2+: go straight to execution
      executeSprintAndShowResults();
    }
  };

  const handleProceedToExecution = () => {
    executeSprintAndShowResults();
  };

  const executeSprintAndShowResults = () => {
    const metrics = simulateSprintExecution(columns.sprint, allItems);
    setSprintMetrics(metrics);
    setSprintHistory((prev) => [...prev, { sprint: currentSprint, metrics }]);
    setPhase("results");
  };

  const handleAdvanceToNextSprint = () => {
    if (!sprintMetrics) return;

    const delivered = new Set(sprintMetrics.deliveredIds);
    const notDelivered = sprintMetrics.notDeliveredIds;

    // Remaining backlog items (not delivered)
    const remainingBacklog = columns.backlog.filter((id) => !delivered.has(id));
    
    // "Out" items come BACK to backlog (simulating real PO life)
    const outItems = columns.out.filter((id) => !delivered.has(id));

    // Get incoming new items for this sprint transition
    const incomingIndex = currentSprint - 1; // after sprint 1 → index 0
    const incomingItems = scenario.incomingItems?.[incomingIndex] ?? [];

    // Add incoming items to allItems
    if (incomingItems.length > 0) {
      setAllItems((prev) => [...prev, ...incomingItems]);
      setNewItemsAnnouncement(incomingItems);
    } else {
      setNewItemsAnnouncement([]);
    }

    // Merge: not delivered + remaining backlog + out items + new incoming
    const newBacklog = [...remainingBacklog, ...notDelivered, ...outItems, ...incomingItems.map((i) => i.id)];
    const availableItems = newBacklog.length;

    if (availableItems === 0) {
      setPhase("feedback");
      return;
    }

    setColumns({
      backlog: newBacklog,
      sprint: [],
      out: [],
    });

    setCurrentSprint((prev) => prev + 1);
    setPhase("planning");
    setSubmitted(false);
    setScore(0);
    setSprintMetrics(null);
  };

  const handleReset = () => {
    setColumns({
      backlog: scenario.items.map((i) => i.id),
      sprint: [],
      out: [],
    });
    setAllItems(scenario.items);
    setNewItemsAnnouncement([]);
    setSubmitted(false);
    setScore(0);
    setCurrentSprint(1);
    setPhase("planning");
    setSprintMetrics(null);
    setSprintHistory([]);
  };

  const renderItem = (item: BacklogItem) => {
    const config = typeConfig[item.type];
    const Icon = config.icon;
    const isOptimal = submitted && currentSprint === 1 && scenario.optimalOrder.includes(item.id);
    const isInSprint = columns.sprint.includes(item.id);

    return (
      <div
        key={item.id}
        draggable={!submitted && phase === "planning"}
        onDragStart={(e) => handleDragStart(e, item.id)}
        className={`group cursor-grab active:cursor-grabbing transition-all ${
          submitted && isOptimal && isInSprint
            ? "ring-2 ring-success/50"
            : submitted && isOptimal && !isInSprint
            ? "ring-2 ring-warning/50"
            : ""
        }`}
      >
        <Card className="p-3 border-border hover:border-primary/30 transition-colors bg-card">
          <div className="flex items-start gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0 opacity-40 group-hover:opacity-100" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${config.className}`}>
                  <Icon className="w-3 h-3 mr-1" />
                  {config.label}
                </Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border text-muted-foreground">
                  {effortLabels[item.effort]}
                </Badge>
              </div>
              <h4 className="text-sm font-medium text-foreground leading-tight">{item.title}</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
                📎 {item.stakeholder} · {item.details}
              </p>
            </div>
          </div>
          {submitted && currentSprint === 1 && isOptimal && (
            <div className="mt-2 flex items-center gap-1 text-xs">
              {isInSprint ? (
                <span className="text-success flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Prioridade correta
                </span>
              ) : (
                <span className="text-warning flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Deveria estar no sprint
                </span>
              )}
            </div>
          )}
        </Card>
      </div>
    );
  };

  const sprintLoad = getSprintLoad();

  // Results phase
  if (phase === "results" && sprintMetrics) {
    const sprintItems = columns.sprint.map((id) => itemMap.get(id)!).filter(Boolean);
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <SprintResults
          sprintNumber={currentSprint}
          sprintItems={sprintItems}
          metrics={sprintMetrics}
          onAdvance={handleAdvanceToNextSprint}
        />
      </div>
    );
  }

  // All done phase
  if (phase === "feedback") {
    const totalDelivered = sprintHistory.reduce((sum, h) => sum + h.metrics.throughput, 0);
    const avgVelocity = sprintHistory.length > 0
      ? (sprintHistory.reduce((sum, h) => sum + h.metrics.velocity, 0) / sprintHistory.length).toFixed(1)
      : "0";

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Backlog concluído! 🎉
        </h2>
        <p className="text-muted-foreground mb-6">
          Você completou {sprintHistory.length} sprints e entregou {totalDelivered} itens com velocity média de {avgVelocity} pontos.
        </p>

        <Card className="p-5 border-border mb-6">
          <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Resumo por Sprint</h3>
          <div className="space-y-2">
            {sprintHistory.map((h) => (
              <div key={h.sprint} className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0">
                <span className="text-foreground">Sprint {h.sprint}</span>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Velocity: <strong className="text-foreground">{h.metrics.velocity}</strong></span>
                  <span>Entregues: <strong className="text-foreground">{h.metrics.throughput}</strong></span>
                  <span>Cycle Time: <strong className="text-foreground">{h.metrics.cycleTimeDays}d</strong></span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Button onClick={handleReset} className="w-full">
          Refazer simulação
        </Button>
      </div>
    );
  }

  // Planning phase
  const columnConfig = [
    { key: "backlog" as Column, title: "📋 Backlog", subtitle: "Itens disponíveis" },
    { key: "sprint" as Column, title: `🚀 Sprint ${currentSprint}`, subtitle: `Capacidade: ${sprintLoad} / ${sprintCapacity} pts` },
    { key: "out" as Column, title: "🚫 Fora do Sprint", subtitle: "Descartados / próximo sprint" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="font-display text-xl font-bold text-foreground">{scenario.title}</h2>
          <Badge variant="outline" className="border-primary/30 text-primary">Sprint {currentSprint}</Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{scenario.context}</p>
        <Card className="bg-secondary/50 border-border p-3">
          <p className="text-xs text-secondary-foreground font-mono">
            ⚠️ {currentSprint === 1 ? scenario.constraint : `Baseado na velocity da sprint anterior (${sprintCapacity} pts), planeje a Sprint ${currentSprint}. Itens não entregues e descartados voltaram ao backlog.`}
          </p>
        </Card>

        {/* New items announcement */}
        {newItemsAnnouncement.length > 0 && currentSprint > 1 && (
          <Card className="bg-warning/10 border-warning/30 p-3 mt-2">
            <p className="text-xs font-semibold text-warning mb-2">🆕 Novos itens chegaram ao backlog!</p>
            <p className="text-xs text-muted-foreground mb-2">
              Como no dia a dia real de um P.O., novas demandas surgiram entre as sprints. Avalie a prioridade desses novos itens junto com os existentes.
            </p>
            <ul className="space-y-1">
              {newItemsAnnouncement.map((item) => (
                <li key={item.id} className="text-xs text-foreground/80 pl-3 border-l-2 border-warning/30">
                  <strong>{item.title}</strong> — {item.description}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Show previous sprint metrics as context */}
        {sprintHistory.length > 0 && (
          <Card className="bg-info/5 border-info/20 p-3 mt-2">
            <p className="text-xs font-semibold text-info mb-1">📊 Métricas da Sprint {currentSprint - 1}:</p>
            <p className="text-xs text-muted-foreground">
              Velocity: <strong>{sprintHistory[sprintHistory.length - 1].metrics.velocity} pts</strong> · 
              Throughput: <strong>{sprintHistory[sprintHistory.length - 1].metrics.throughput} itens</strong> · 
              Cycle Time: <strong>{sprintHistory[sprintHistory.length - 1].metrics.cycleTimeDays} dias</strong>
            </p>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {columnConfig.map((col) => (
          <div
            key={col.key}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.key)}
            className={`min-h-[200px] rounded-lg border-2 border-dashed p-3 transition-colors ${
              draggedItem ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/20"
            } ${col.key === "sprint" && sprintLoad > sprintCapacity ? "border-destructive/50" : ""}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-sm font-semibold text-foreground">{col.title}</h3>
              <span className="text-xs font-mono text-muted-foreground">{col.subtitle}</span>
            </div>
            {col.key === "sprint" && (
              <div className="mb-3">
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      sprintLoad > sprintCapacity ? "bg-destructive" : sprintLoad > sprintCapacity * 0.8 ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${Math.min((sprintLoad / sprintCapacity) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              {columns[col.key].map((id) => {
                const item = itemMap.get(id);
                return item ? renderItem(item) : null;
              })}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <Button
          onClick={handleSubmit}
          disabled={columns.sprint.length === 0}
          className="w-full"
        >
          {currentSprint === 1 ? "Validar Priorização" : `Executar Sprint ${currentSprint}`}
        </Button>
      ) : (
        <div className="space-y-4">
          <Card className={`p-5 border ${score >= 75 ? "border-success/30 bg-success/5" : score >= 50 ? "border-warning/30 bg-warning/5" : "border-destructive/30 bg-destructive/5"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-2xl font-display font-bold ${score >= 75 ? "text-success" : score >= 50 ? "text-warning" : "text-destructive"}`}>
                {score}/100
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground">
                  {score >= 75 ? "Excelente priorização!" : score >= 50 ? "Boa tentativa, mas pode melhorar." : "Priorização precisa de ajustes."}
                </h4>
              </div>
            </div>
            <div className="space-y-2 mt-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priorização ideal:</p>
              {scenario.explanation.map((line, i) => (
                <p key={i} className="text-sm text-foreground/80 leading-relaxed pl-3 border-l-2 border-primary/20 ml-1 py-0.5">
                  {line}
                </p>
              ))}
            </div>
          </Card>
          <div className="flex gap-3">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Recomeçar
            </Button>
            <Button onClick={handleProceedToExecution} className="flex-1">
              Executar Sprint {currentSprint} →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BacklogBoard;
