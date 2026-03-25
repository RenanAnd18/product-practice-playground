import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import type { Challenge } from "@/data/challenges";

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  isLocked: boolean;
  onSelect: (id: string) => void;
}

const difficultyColors: Record<string, string> = {
  junior: "bg-success/20 text-success border-success/30",
  pleno: "bg-warning/20 text-warning border-warning/30",
  senior: "bg-destructive/20 text-destructive border-destructive/30",
};

const ChallengeCard = ({ challenge, isCompleted, isLocked, onSelect }: ChallengeCardProps) => {
  return (
    <Card
      className={`group relative border transition-all duration-300 cursor-pointer ${
        isLocked
          ? "opacity-50 cursor-not-allowed"
          : isCompleted
          ? "border-success/30 bg-success/5 hover:border-success/50"
          : "border-border hover:border-primary/50 hover:bg-secondary/50"
      }`}
      onClick={() => !isLocked && onSelect(challenge.id)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={difficultyColors[challenge.difficulty]}>
              {challenge.difficulty}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {challenge.category}
            </Badge>
          </div>
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          {challenge.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {challenge.context}
        </p>
      </div>
    </Card>
  );
};

export default ChallengeCard;
