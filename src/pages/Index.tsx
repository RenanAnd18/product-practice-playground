import { useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import ChallengeCard from "@/components/ChallengeCard";
import ChallengeView from "@/components/ChallengeView";
import BacklogSimulation from "@/components/BacklogSimulation";
import { challenges, challengesByDifficulty } from "@/data/challenges";
import { Badge } from "@/components/ui/badge";
import { Shield, Swords, Crown, BookOpen, Kanban } from "lucide-react";

const difficultyConfig = {
  junior: {
    label: "Junior",
    description: "Fundamentos de gestão de produto e priorização",
    icon: Shield,
    badgeClass: "bg-success/20 text-success border-success/30",
  },
  pleno: {
    label: "Pleno",
    description: "Comunicação com stakeholders e gestão de processos",
    icon: Swords,
    badgeClass: "bg-warning/20 text-warning border-warning/30",
  },
  senior: {
    label: "Senior",
    description: "Estratégia de produto, métricas avançadas e visão de negócio",
    icon: Crown,
    badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
  },
} as const;

const Index = () => {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"challenges" | "backlog">("challenges");

  const handleSelect = useCallback((id: string) => {
    setActiveChallenge(id);
  }, []);

  const handleComplete = useCallback((isOptimal: boolean) => {
    if (activeChallenge) {
      setCompletedIds((prev) => new Set([...prev, activeChallenge]));
      setStreak((prev) => (isOptimal ? prev + 1 : 0));
      setActiveChallenge(null);
    }
  }, [activeChallenge]);

  const currentChallenge = challenges.find((c) => c.id === activeChallenge);

  if (currentChallenge) {
    return (
      <div className="min-h-screen bg-background">
        <ChallengeView
          challenge={currentChallenge}
          onBack={() => setActiveChallenge(null)}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        completedCount={completedIds.size}
        totalCount={challenges.length}
        streak={streak}
      />

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-secondary/50 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("challenges")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-display text-sm font-medium transition-all ${
              activeTab === "challenges"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Desafios
          </button>
          <button
            onClick={() => setActiveTab("backlog")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-display text-sm font-medium transition-all ${
              activeTab === "backlog"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Kanban className="w-4 h-4" />
            Priorização de Backlog
          </button>
        </div>
      </div>

      {activeTab === "challenges" ? (
        <main className="max-w-4xl mx-auto px-6 py-8 space-y-10">
          {(["junior", "pleno", "senior"] as const).map((difficulty) => {
            const config = difficultyConfig[difficulty];
            const items = challengesByDifficulty[difficulty];
            const completedInLevel = items.filter((c) => completedIds.has(c.id)).length;
            const Icon = config.icon;

            return (
              <section key={difficulty}>
                <div className="flex items-center gap-3 mb-1">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Nível {config.label}
                  </h2>
                  <Badge variant="outline" className={config.badgeClass}>
                    {completedInLevel}/{items.length}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 ml-8">
                  {config.description}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      isCompleted={completedIds.has(challenge.id)}
                      isLocked={false}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      ) : (
        <BacklogSimulation />
      )}
    </div>
  );
};

export default Index;
