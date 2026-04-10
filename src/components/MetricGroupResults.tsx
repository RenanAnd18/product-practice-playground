import { ArrowLeft, ArrowRight, Trophy, Target, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MetricChallenge } from "@/data/metrics-challenges";

interface MetricGroupResultsProps {
  metricName: string;
  challenges: MetricChallenge[];
  results: Record<string, boolean>;
  nextGroupName?: string;
  onBack: () => void;
  onNextGroup: () => void;
}

const gradeFromScore = (pct: number): { grade: string; color: string; message: string } => {
  if (pct >= 90) return { grade: "A+", color: "text-success", message: "Excelente! Domínio completo dessa métrica." };
  if (pct >= 80) return { grade: "A", color: "text-success", message: "Ótimo! Você entende bem essa métrica." };
  if (pct >= 60) return { grade: "B", color: "text-primary", message: "Bom, mas ainda há espaço para melhorar." };
  if (pct >= 40) return { grade: "C", color: "text-warning", message: "Razoável. Revise os pontos de aprendizado." };
  return { grade: "D", color: "text-destructive", message: "Precisa revisar essa métrica com atenção." };
};

const MetricGroupResults = ({
  metricName,
  challenges,
  results,
  nextGroupName,
  onBack,
  onNextGroup,
}: MetricGroupResultsProps) => {
  const correct = challenges.filter((c) => results[c.id] === true).length;
  const total = challenges.length;
  const pct = Math.round((correct / total) * 100);
  const { grade, color, message } = gradeFromScore(pct);

  // Collect all unique learning points from challenges the user got wrong
  const missedChallenges = challenges.filter((c) => results[c.id] !== true);
  const allLearningPoints = challenges.flatMap((c) => c.learningPoints);
  const missedLearningPoints = missedChallenges.flatMap((c) => c.learningPoints);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4 border-info/30 text-info">
          {metricName} · Resultado Final
        </Badge>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-secondary/50 border-2 border-border flex items-center justify-center">
            <Trophy className={`w-10 h-10 ${color}`} />
          </div>
        </div>
        <h2 className={`font-display text-5xl font-bold ${color} mb-2`}>{grade}</h2>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>

      {/* Score Card */}
      <Card className="border-border bg-secondary/30 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Acertos</span>
          </div>
          <div className="text-right">
            <span className="font-display text-2xl font-bold text-foreground">{correct}/{total}</span>
            <span className="text-muted-foreground text-sm ml-2">({pct}%)</span>
          </div>
        </div>
        {/* Question breakdown */}
        <div className="flex gap-2 mt-4 justify-center">
          {challenges.map((c, i) => (
            <div
              key={c.id}
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold border ${
                results[c.id] === true
                  ? "bg-success/10 border-success/30 text-success"
                  : "bg-destructive/10 border-destructive/30 text-destructive"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Card>

      {/* Learning Points from missed questions */}
      {missedLearningPoints.length > 0 && (
        <Card className="p-5 border-primary/20 bg-primary/5 mb-6">
          <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            Revise esses pontos
          </h4>
          <ul className="space-y-2">
            {missedLearningPoints.map((point, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-primary font-mono text-xs mt-0.5">→</span>
                {point}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* All learning points if perfect score */}
      {missedLearningPoints.length === 0 && (
        <Card className="p-5 border-success/20 bg-success/5 mb-6">
          <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-success" />
            Pontos-chave que você domina
          </h4>
          <ul className="space-y-2">
            {allLearningPoints.slice(0, 6).map((point, i) => (
              <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-success font-mono text-xs mt-0.5">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar ao painel
        </Button>
        {nextGroupName && (
          <Button onClick={onNextGroup} className="flex-1 gap-2">
            {nextGroupName}
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default MetricGroupResults;
