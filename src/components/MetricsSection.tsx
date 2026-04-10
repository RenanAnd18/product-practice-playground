import { useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, BarChart3, ChevronDown, ChevronRight } from "lucide-react";
import MetricChallengeView from "@/components/MetricChallengeView";
import MetricGroupResults from "@/components/MetricGroupResults";
import { metricsChallenges } from "@/data/metrics-challenges";

interface MetricGroup {
  name: string;
  challenges: typeof metricsChallenges;
}

const MetricsSection = () => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showGroupResult, setShowGroupResult] = useState<string | null>(null);

  const groups = useMemo<MetricGroup[]>(() => {
    const map = new Map<string, typeof metricsChallenges>();
    metricsChallenges.forEach((m) => {
      const arr = map.get(m.metricName) || [];
      arr.push(m);
      map.set(m.metricName, arr);
    });
    return Array.from(map.entries()).map(([name, challenges]) => ({ name, challenges }));
  }, []);

  const toggleGroup = (name: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const findGroupForChallenge = useCallback(
    (challengeId: string) => groups.find((g) => g.challenges.some((c) => c.id === challengeId)),
    [groups],
  );

  const handleComplete = useCallback(
    (isOptimal: boolean) => {
      if (!activeMetric) return;
      const newCompleted = new Set([...completedIds, activeMetric]);
      const newResults = { ...results, [activeMetric]: isOptimal };
      setCompletedIds(newCompleted);
      setResults(newResults);

      const group = findGroupForChallenge(activeMetric);
      if (!group) {
        setActiveMetric(null);
        return;
      }

      // Find next uncompleted challenge in this group
      const nextInGroup = group.challenges.find((c) => c.id !== activeMetric && !newCompleted.has(c.id));
      if (nextInGroup) {
        setActiveMetric(nextInGroup.id);
      } else {
        // All in group done — show group results
        setActiveMetric(null);
        setShowGroupResult(group.name);
      }
    },
    [activeMetric, completedIds, results, findGroupForChallenge],
  );

  const handleNextGroup = useCallback(() => {
    if (!showGroupResult) return;
    const idx = groups.findIndex((g) => g.name === showGroupResult);
    const nextGroup = groups[idx + 1];
    setShowGroupResult(null);
    if (nextGroup) {
      const firstUncompleted = nextGroup.challenges.find((c) => !completedIds.has(c.id));
      if (firstUncompleted) {
        setActiveMetric(firstUncompleted.id);
      }
    }
  }, [showGroupResult, groups, completedIds]);

  const current = metricsChallenges.find((m) => m.id === activeMetric);

  // Show group results screen
  if (showGroupResult) {
    const group = groups.find((g) => g.name === showGroupResult);
    const groupIdx = groups.findIndex((g) => g.name === showGroupResult);
    const nextGroup = groups[groupIdx + 1];
    if (group) {
      return (
        <MetricGroupResults
          metricName={group.name}
          challenges={group.challenges}
          results={results}
          nextGroupName={nextGroup?.name}
          onBack={() => setShowGroupResult(null)}
          onNextGroup={handleNextGroup}
        />
      );
    }
  }

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

      <div className="space-y-4">
        {groups.map((group) => {
          const groupCompleted = group.challenges.filter((c) => completedIds.has(c.id)).length;
          const groupCorrect = group.challenges.filter((c) => results[c.id] === true).length;
          const isExpanded = expandedGroups.has(group.name);
          const allDone = groupCompleted === group.challenges.length;

          return (
            <div key={group.name}>
              <button
                onClick={() => toggleGroup(group.name)}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  allDone
                    ? "border-success/30 bg-success/5 hover:border-success/50"
                    : "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                  <h3 className="font-display font-semibold text-foreground">{group.name}</h3>
                  <Badge variant="outline" className="border-info/30 text-info text-xs">
                    {groupCompleted}/{group.challenges.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  {groupCompleted > 0 && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {groupCorrect}/{groupCompleted} acertos
                    </span>
                  )}
                  {allDone && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowGroupResult(group.name);
                      }}
                      className="text-xs text-primary hover:text-primary/80 font-mono underline underline-offset-2"
                    >
                      Ver resultado
                    </button>
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-2 ml-4 space-y-2">
                  {group.challenges.map((metric, i) => {
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
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline" className="border-muted text-muted-foreground text-xs">
                              Questão {i + 1}
                            </Badge>
                            {isCompleted ? (
                              <CheckCircle2 className={`w-4 h-4 ${wasCorrect ? "text-success" : "text-destructive"}`} />
                            ) : (
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </div>
                          <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                            {metric.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {metric.caseDescription}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default MetricsSection;
