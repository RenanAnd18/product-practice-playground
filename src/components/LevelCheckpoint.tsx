import { PauseCircle, PlayCircle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Challenge } from "@/data/challenges";

interface LevelCheckpointProps {
  difficulty: string;
  challengesDone: Challenge[];
  results: Record<string, boolean>;
  onContinue: () => void;
  onStop: () => void;
}

const LevelCheckpoint = ({ difficulty, challengesDone, results, onContinue, onStop }: LevelCheckpointProps) => {
  const correct = challengesDone.filter((c) => results[c.id] === true).length;
  const total = challengesDone.length;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <PauseCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Metade do nível {difficulty}!
        </h2>
        <p className="text-muted-foreground">
          Você completou 5 de 10 desafios. Deseja ver seus resultados agora ou continuar?
        </p>
      </div>

      <Card className="p-5 border-border mb-6">
        <h3 className="font-display font-semibold text-foreground mb-3 text-sm">Parcial até aqui</h3>
        <div className="text-center mb-4">
          <span className="text-3xl font-display font-bold text-primary">{correct}/{total}</span>
          <span className="text-sm text-muted-foreground ml-2">decisões ótimas</span>
        </div>
        <div className="space-y-2">
          {challengesDone.map((c) => {
            const optimal = results[c.id] === true;
            return (
              <div key={c.id} className="flex items-center gap-3 py-1">
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
        <Button variant="outline" onClick={onStop} className="flex-1">
          <PauseCircle className="w-4 h-4 mr-2" />
          Parar e ver avaliação
        </Button>
        <Button onClick={onContinue} className="flex-1">
          <PlayCircle className="w-4 h-4 mr-2" />
          Continuar (+5 desafios)
        </Button>
      </div>
    </div>
  );
};

export default LevelCheckpoint;
