import { useState, useCallback } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, Package, Search, Wrench, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BacklogScenario, BacklogItem } from "@/data/backlog-items";

interface BacklogBoardProps {
  scenario: BacklogScenario;
  onBack: () => void;
}

type Column = "backlog" | "sprint" | "out";

const typeConfig = {
  bug: { icon: AlertTriangle, label: "Bug", className: "bg-destructive/20 text-destructive border-destructive/30" },
  feature: { icon: Package, label: "Feature", className: "bg-primary/20 text-primary border-primary/30" },
  "tech-debt": { icon: Wrench, label: "Tech Debt", className: "bg-warning/20 text-warning border-warning/30" },
  research: { icon: Search, label: "Research", className: "bg-info/20 text-info border-info/30" },
};

const effortLabels: Record<string, string> = { P: "Pequeno", M: "Médio", G: "Grande", GG: "Muito Grande" };
const effortValues: Record<string, number> = { P: 0.5, M: 1, G: 2, GG: 3 };

const BacklogBoard = ({ scenario, onBack }: BacklogBoardProps) => {
  const [columns, setColumns] = useState<Record<Column, string[]>>({
    backlog: scenario.items.map((i) => i.id),
    sprint: [],
    out: [],
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const itemMap = new Map(scenario.items.map((i) => [i.id, i]));

  const getSprintLoad = useCallback(() => {
    return columns.sprint.reduce((sum, id) => {
      const item = itemMap.get(id);
      return sum + (item ? effortValues[item.effort] : 0);
    }, 0);
  }, [columns.sprint, itemMap]);

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

    // Check capacity for sprint column
    if (targetColumn === "sprint") {
      const currentLoad = columns.sprint
        .filter((id) => id !== draggedItem)
        .reduce((sum, id) => {
          const i = itemMap.get(id);
          return sum + (i ? effortValues[i.effort] : 0);
        }, 0);
      if (currentLoad + effortValues[item.effort] > 5) return;
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
    const sprintItems = columns.sprint;
    const optimal = scenario.optimalOrder;

    let points = 0;
    // Points for including optimal items
    for (const id of optimal) {
      if (sprintItems.includes(id)) points += 25;
    }

    setScore(points);
    setSubmitted(true);
  };

  const handleReset = () => {
    setColumns({
      backlog: scenario.items.map((i) => i.id),
      sprint: [],
      out: [],
    });
    setSubmitted(false);
    setScore(0);
  };

  const renderItem = (item: BacklogItem) => {
    const config = typeConfig[item.type];
    const Icon = config.icon;
    const isOptimal = submitted && scenario.optimalOrder.includes(item.id);
    const isInSprint = columns.sprint.includes(item.id);

    return (
      <div
        key={item.id}
        draggable={!submitted}
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
          {submitted && isOptimal && (
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

  const columnConfig = [
    { key: "backlog" as Column, title: "📋 Backlog", subtitle: "Itens disponíveis" },
    { key: "sprint" as Column, title: "🚀 Sprint", subtitle: `Capacidade: ${sprintLoad}M / 5M` },
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
        <h2 className="font-display text-xl font-bold text-foreground mb-2">{scenario.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">{scenario.context}</p>
        <Card className="bg-secondary/50 border-border p-3">
          <p className="text-xs text-secondary-foreground font-mono">⚠️ {scenario.constraint}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {columnConfig.map((col) => (
          <div
            key={col.key}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, col.key)}
            className={`min-h-[200px] rounded-lg border-2 border-dashed p-3 transition-colors ${
              draggedItem ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/20"
            } ${col.key === "sprint" && sprintLoad > 5 ? "border-destructive/50" : ""}`}
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
                      sprintLoad > 5 ? "bg-destructive" : sprintLoad > 4 ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${Math.min((sprintLoad / 5) * 100, 100)}%` }}
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
          Validar Priorização
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
            <p className="text-sm text-foreground/80 leading-relaxed">{scenario.explanation}</p>
          </Card>
          <Button onClick={handleReset} variant="outline" className="w-full">
            Tentar novamente
          </Button>
        </div>
      )}
    </div>
  );
};

export default BacklogBoard;
