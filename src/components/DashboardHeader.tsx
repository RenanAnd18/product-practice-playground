import { Target, Trophy, Flame } from "lucide-react";

interface DashboardHeaderProps {
  completedCount: number;
  totalCount: number;
  streak: number;
}

const DashboardHeader = ({ completedCount, totalCount, streak }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8 text-primary" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            PO Training Ground
          </h1>
        </div>
        <p className="text-muted-foreground font-mono text-sm mb-6">
          Treine suas habilidades de Product Owner com cenários reais do dia a dia
        </p>
        <div className="flex gap-6">
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-md">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-secondary-foreground">
              {completedCount}/{totalCount} desafios
            </span>
          </div>
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-md">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-secondary-foreground">
              {streak} acertos seguidos
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
