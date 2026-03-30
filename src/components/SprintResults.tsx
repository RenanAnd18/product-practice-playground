import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, BarChart3, Clock, Zap, TrendingUp, Lightbulb, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BacklogItem } from "@/data/backlog-items";

const effortValues: Record<string, number> = { P: 0.5, M: 1, G: 2, GG: 3 };

interface SprintMetrics {
  velocity: number;
  throughput: number;
  leadTimeDays: number;
  cycleTimeDays: number;
  deliveredIds: string[];
  notDeliveredIds: string[];
}

interface SprintResultsProps {
  sprintNumber: number;
  sprintItems: BacklogItem[];
  metrics: SprintMetrics;
  onAdvance: () => void;
  isLastSprint?: boolean;
  maxSprints?: number;
}

const getMetricAnalysis = (metric: string, metrics: SprintMetrics, sprintNumber: number) => {
  const analyses: Record<string, { analysis: string; tips: string[] }> = {
    velocity: {
      analysis: metrics.velocity >= 6
        ? `Excelente! O time entregou ${metrics.velocity} pontos, mostrando boa capacidade de execução.`
        : metrics.velocity >= 3
        ? `O time entregou ${metrics.velocity} pontos. Há espaço para melhorar a previsibilidade.`
        : `Apenas ${metrics.velocity} pontos entregues. O time pode estar enfrentando impedimentos ou os itens estavam mal estimados.`,
      tips: [
        "Use a velocity desta sprint para definir a capacidade da próxima.",
        "Evite puxar mais pontos do que a média das últimas 3 sprints.",
        "Se a velocity variou muito, investigue o que causou a oscilação.",
      ],
    },
    throughput: {
      analysis: metrics.throughput >= 4
        ? `${metrics.throughput} itens entregues! Boa vazão de trabalho.`
        : metrics.throughput >= 2
        ? `${metrics.throughput} itens finalizados. Considere quebrar itens grandes em menores.`
        : `Apenas ${metrics.throughput} item entregue. Itens podem estar muito grandes ou há gargalos no fluxo.`,
      tips: [
        "Prefira itens menores (P e M) para aumentar o throughput.",
        "Itens menores dão feedback mais rápido e reduzem risco.",
        "Monitore se o throughput está estável entre sprints.",
      ],
    },
    leadTime: {
      analysis: metrics.leadTimeDays <= 5
        ? `Lead time de ${metrics.leadTimeDays} dias é excelente! O time transforma ideias em valor rapidamente.`
        : metrics.leadTimeDays <= 10
        ? `Lead time de ${metrics.leadTimeDays} dias está na média. Pode melhorar priorizando mais cedo.`
        : `Lead time de ${metrics.leadTimeDays} dias é alto. Itens estão esperando demais antes de serem trabalhados.`,
      tips: [
        "Priorize itens de alto valor mais cedo para reduzir o lead time.",
        "Evite acumular itens no backlog sem priorização clara.",
        "Revise o backlog semanalmente para manter itens relevantes no topo.",
      ],
    },
    cycleTime: {
      analysis: metrics.cycleTimeDays <= 3
        ? `Cycle time de ${metrics.cycleTimeDays} dias é ótimo! O time executa rápido.`
        : metrics.cycleTimeDays <= 7
        ? `Cycle time de ${metrics.cycleTimeDays} dias. Há oportunidade de reduzir gargalos.`
        : `Cycle time de ${metrics.cycleTimeDays} dias é preocupante. O time está travando durante a execução.`,
      tips: [
        "Identifique onde os itens ficam parados (aguardando review, QA, etc).",
        "Limite o trabalho em progresso (WIP) para acelerar entregas.",
        "Quebre itens GG em partes menores para fluir mais rápido.",
      ],
    },
  };
  return analyses[metric] || { analysis: "", tips: [] };
};

const SprintResults = ({ sprintNumber, sprintItems, metrics, onAdvance }: SprintResultsProps) => {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const toggleMetric = (metric: string) => {
    setExpandedMetric(expandedMetric === metric ? null : metric);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-display text-xl font-bold text-foreground mb-1">
          Resultado da Sprint {sprintNumber}
        </h3>
        <p className="text-sm text-muted-foreground">
          O time executou a sprint e aqui estão os resultados reais da entrega.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          metricKey="velocity"
          icon={<TrendingUp className="w-4 h-4" />}
          label="Velocity"
          value={`${metrics.velocity} pts`}
          description="Pontos entregues nesta sprint"
          color="text-primary"
          isExpanded={expandedMetric === "velocity"}
          onToggle={() => toggleMetric("velocity")}
          analysis={getMetricAnalysis("velocity", metrics, sprintNumber)}
        />
        <MetricCard
          metricKey="throughput"
          icon={<BarChart3 className="w-4 h-4" />}
          label="Throughput"
          value={`${metrics.throughput} itens`}
          description="Quantidade de itens finalizados"
          color="text-success"
          isExpanded={expandedMetric === "throughput"}
          onToggle={() => toggleMetric("throughput")}
          analysis={getMetricAnalysis("throughput", metrics, sprintNumber)}
        />
        <MetricCard
          metricKey="leadTime"
          icon={<Clock className="w-4 h-4" />}
          label="Lead Time"
          value={`${metrics.leadTimeDays} dias`}
          description="Tempo da ideia até a entrega"
          color="text-warning"
          isExpanded={expandedMetric === "leadTime"}
          onToggle={() => toggleMetric("leadTime")}
          analysis={getMetricAnalysis("leadTime", metrics, sprintNumber)}
        />
        <MetricCard
          metricKey="cycleTime"
          icon={<Zap className="w-4 h-4" />}
          label="Cycle Time"
          value={`${metrics.cycleTimeDays} dias`}
          description="Tempo médio de execução"
          color="text-info"
          isExpanded={expandedMetric === "cycleTime"}
          onToggle={() => toggleMetric("cycleTime")}
          analysis={getMetricAnalysis("cycleTime", metrics, sprintNumber)}
        />
      </div>

      {/* Hint */}
      <p className="text-xs text-center text-muted-foreground italic">
        👆 Clique em cada métrica para ver análise e dicas para a próxima sprint
      </p>

      {/* Delivered / Not Delivered */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-success/20">
          <h4 className="font-display text-sm font-semibold text-success mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Entregues ({metrics.deliveredIds.length})
          </h4>
          <div className="space-y-2">
            {sprintItems
              .filter((i) => metrics.deliveredIds.includes(i.id))
              .map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-3 h-3 text-success shrink-0" />
                  <span className="text-foreground/80 truncate">{item.title}</span>
                  <Badge variant="outline" className="text-[9px] px-1 py-0 ml-auto shrink-0 border-border">
                    {item.effort}
                  </Badge>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-4 border-destructive/20">
          <h4 className="font-display text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Não entregues ({metrics.notDeliveredIds.length})
          </h4>
          {metrics.notDeliveredIds.length === 0 ? (
            <p className="text-xs text-muted-foreground">Todos os itens foram entregues! 🎉</p>
          ) : (
            <div className="space-y-2">
              {sprintItems
                .filter((i) => metrics.notDeliveredIds.includes(i.id))
                .map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-sm">
                    <XCircle className="w-3 h-3 text-destructive shrink-0" />
                    <span className="text-foreground/80 truncate">{item.title}</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 ml-auto shrink-0 border-border">
                      {item.effort}
                    </Badge>
                  </div>
                ))}
              <p className="text-xs text-muted-foreground mt-2 italic">
                ⚠️ Esses itens voltarão para o backlog na próxima sprint.
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Advance */}
      <Button onClick={onAdvance} className="w-full" size="lg">
        {isLastSprint ? (
          <>
            <FileText className="w-4 h-4 mr-2" />
            Ver Relatório de Desempenho
          </>
        ) : (
          <>
            Avançar para Sprint {sprintNumber + 1} de {maxSprints}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};

const MetricCard = ({
  icon,
  label,
  value,
  description,
  color,
  isExpanded,
  onToggle,
  analysis,
}: {
  metricKey: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
  isExpanded: boolean;
  onToggle: () => void;
  analysis: { analysis: string; tips: string[] };
}) => (
  <div className="col-span-1">
    <Card
      className={`p-3 border-border cursor-pointer transition-all hover:border-primary/40 hover:shadow-md ${isExpanded ? 'ring-1 ring-primary/30 border-primary/40' : ''}`}
      onClick={onToggle}
    >
      <div className={`flex items-center gap-2 mb-1 ${color}`}>
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        <ChevronDown className={`w-3 h-3 ml-auto transition-transform text-muted-foreground ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      <div className="text-xl font-display font-bold text-foreground">{value}</div>
      <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
    </Card>
    {isExpanded && (
      <Card className="mt-2 p-3 border-primary/20 bg-primary/5 col-span-full">
        <div className="flex items-start gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/90">{analysis.analysis}</p>
        </div>
        <div className="space-y-1.5 mt-3">
          <h5 className="text-xs font-semibold text-foreground flex items-center gap-1">💡 Dicas para a próxima sprint:</h5>
          {analysis.tips.map((tip, i) => (
            <p key={i} className="text-xs text-muted-foreground pl-4 flex items-start gap-1.5">
              <span className="text-primary shrink-0">•</span>
              {tip}
            </p>
          ))}
        </div>
      </Card>
    )}
  </div>
);

export default SprintResults;
export type { SprintMetrics };
