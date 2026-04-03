import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, BarChart3 } from "lucide-react";
import MetricChallengeView from "@/components/MetricChallengeView";
import { metricsChallenges } from "@/data/metrics-challenges";

const MetricsSection = () => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleComplete = useCallback(
    (isOptimal: boolean) => {
      if (!activeMetric) return;
      setCompletedIds((prev) => new Set([...prev, activeMetric]));
      setResults((prev) => ({ ...prev, [activeMetric]: isOptimal }));

      const idx = metricsChallenges.findIndex((m) => m.id === activeMetric);
      const next = metricsChallenges[idx + 1];
      if (next) {
        setActiveMetric(next.id);
      } else {
        setActiveMetric(null);
      }
    },
    [activeMetric],
  );

  const current = metricsChallenges.find((m) => m.id === activeMetric);

  if (current) {
    return (
      <MetricChallengeView
        key={current.id}
        challenge={current}
        onBack={() => setActiveMetric(null)}
        onComplete={handleComplete}
      />
    );
  }

  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BarChart3 className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-display text-xl font-semibold text-foreground">
            Métricas de Entrega
          </h2>
          <Badge variant="outline" className="bg-info/20 text-info border-info/30">
            {completedIds.size}/{metricsChallenges.length}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground ml-8">
          Analise gráficos reais e tome decisões baseadas em dados — como um PO faz no dia a dia
        </p>
        {completedIds.size > 0 && (
          <p className="text-xs text-muted-foreground ml-8 mt-1 font-mono">
            Acertos: {correctCount}/{completedIds.size} ({Math.round((correctCount / completedIds.size) * 100)}%)
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {metricsChallenges.map((metric) => {
          const isCompleted = completedIds.has(metric.id);
          const wasCorrect = results[metric.id];
          return (
            <Card
              key={metric.id}
              className={`group relative border transition-all duration-300 cursor-pointer ${
                isCompleted
                  ? wasCorrect
                    ? "border-success/30 bg-success/5 hover:border-success/50"
                    : "border-destructive/30 bg-destructive/5 hover:border-destructive/50"
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
              onClick={() => setActiveMetric(metric.id)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className="border-info/30 text-info text-xs">
                    {metric.metricName}
                  </Badge>
                  {isCompleted ? (
                    <CheckCircle2 className={`w-5 h-5 ${wasCorrect ? "text-success" : "text-destructive"}`} />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {metric.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {metric.caseDescription}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default MetricsSection;
