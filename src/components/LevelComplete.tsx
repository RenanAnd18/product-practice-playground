import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Challenge } from "@/data/challenges";

interface LevelCompleteProps {
  difficulty: string;
  challenges: Challenge[];
  results: Record<string, boolean>; // challengeId -> isOptimal
  onRetry: () => void;
  onBack: () => void;
}

const LevelComplete = ({ difficulty, challenges, results, onRetry, onBack }: LevelCompleteProps) => {
  const total = challenges.length;
  const correct = challenges.filter((c) => results[c.id] === true).length;
  const percentage = Math.round((correct / total) * 100);

  const getMessage = () => {
    if (percentage === 100) return { text: "Perfeito! Você dominou este nível! 🏆", color: "text-success" };
    if (percentage >= 75) return { text: "Ótimo desempenho! Quase perfeito! 🎯", color: "text-success" };
    if (percentage >= 50) return { text: "Bom trabalho! Mas pode melhorar. 💪", color: "text-warning" };
    return { text: "Precisa praticar mais. Tente novamente! 📚", color: "text-destructive" };
  };

  const message = getMessage();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Nível {difficulty} concluído!
        </h2>
        <p className={`text-lg font-medium ${message.color}`}>{message.text}</p>
      </div>

      {/* Score */}
      <Card className="p-6 border-border mb-6 text-center">
        <div className="text-5xl font-display font-bold text-primary mb-1">{percentage}%</div>
        <p className="text-sm text-muted-foreground">
          {correct} de {total} decisões ótimas
        </p>
        <div className="w-full h-3 bg-secondary rounded-full mt-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </Card>

      {/* Per-challenge results */}
      <Card className="p-5 border-border mb-6">
        <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Resumo por desafio</h3>
        <div className="space-y-2">
          {challenges.map((c) => {
            const optimal = results[c.id] === true;
            return (
              <div key={c.id} className="flex items-center gap-3 py-1.5">
                {optimal ? (
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive shrink-0" />
                )}
                <span className="text-sm text-foreground/80 truncate">{c.title}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos desafios
        </Button>
        <Button onClick={onRetry} className="flex-1">
          <RotateCcw className="w-4 h-4 mr-2" />
          Refazer nível
        </Button>
      </div>
    </div>
  );
};

export default LevelComplete;
