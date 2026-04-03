import { useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import ChallengeCard from "@/components/ChallengeCard";
import ChallengeView from "@/components/ChallengeView";
import LevelComplete from "@/components/LevelComplete";
import LevelCheckpoint from "@/components/LevelCheckpoint";
import BacklogSimulation from "@/components/BacklogSimulation";
import { challenges, challengesByDifficulty } from "@/data/challenges";
import { Badge } from "@/components/ui/badge";
import { Shield, Swords, Crown, BookOpen, Kanban, BarChart3 } from "lucide-react";
import WhatIsPO from "@/components/WhatIsPO";
import MetricsSection from "@/components/MetricsSection";

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

type Difficulty = "junior" | "pleno" | "senior";

const Index = () => {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"challenges" | "backlog" | "metrics">("challenges");
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [completedLevel, setCompletedLevel] = useState<Difficulty | null>(null);
  const [checkpointLevel, setCheckpointLevel] = useState<Difficulty | null>(null);

  const handleSelect = useCallback((id: string) => {
    setActiveChallenge(id);
  }, []);

  const handleComplete = useCallback((isOptimal: boolean) => {
    if (activeChallenge) {
      setCompletedIds((prev) => new Set([...prev, activeChallenge]));
      setResults((prev) => ({ ...prev, [activeChallenge]: isOptimal }));
      setStreak((prev) => (isOptimal ? prev + 1 : 0));

      const current = challenges.find((c) => c.id === activeChallenge);
      if (current) {
        const difficulty = current.difficulty as Difficulty;
        const sameLevelChallenges = challengesByDifficulty[difficulty];
        const currentIndex = sameLevelChallenges.findIndex((c) => c.id === activeChallenge);
        
        // Checkpoint after question 5 (index 4)
        if (currentIndex === 4) {
          setActiveChallenge(null);
          setCheckpointLevel(difficulty);
          return;
        }
        
        const next = sameLevelChallenges[currentIndex + 1];
        if (next) {
          setActiveChallenge(next.id);
          return;
        }
        // Last challenge of level — show completion screen
        setActiveChallenge(null);
        setCompletedLevel(difficulty);
        return;
      }
      setActiveChallenge(null);
    }
  }, [activeChallenge]);

  const handleRetryLevel = useCallback(() => {
    if (completedLevel) {
      const levelChallenges = challengesByDifficulty[completedLevel];
      // Clear results for this level
      setCompletedIds((prev) => {
        const next = new Set(prev);
        levelChallenges.forEach((c) => next.delete(c.id));
        return next;
      });
      setResults((prev) => {
        const next = { ...prev };
        levelChallenges.forEach((c) => delete next[c.id]);
        return next;
      });
      setCompletedLevel(null);
      setActiveChallenge(levelChallenges[0].id);
    }
  }, [completedLevel]);

  // Show checkpoint screen (after question 5)
  if (checkpointLevel) {
    const levelChallenges = challengesByDifficulty[checkpointLevel];
    const first5 = levelChallenges.slice(0, 5);
    return (
      <div className="min-h-screen bg-background">
        <LevelCheckpoint
          difficulty={difficultyConfig[checkpointLevel].label}
          challengesDone={first5}
          results={results}
          onContinue={() => {
            // Continue to question 6
            setCheckpointLevel(null);
            setActiveChallenge(levelChallenges[5].id);
          }}
          onStop={() => {
            // Show final results with only the 5 answered
            setCheckpointLevel(null);
            setCompletedLevel(checkpointLevel);
          }}
        />
      </div>
    );
  }

  // Show level complete screen
  if (completedLevel) {
    const levelChallenges = challengesByDifficulty[completedLevel];
    const answeredChallenges = levelChallenges.filter((c) => completedIds.has(c.id));
    return (
      <div className="min-h-screen bg-background">
        <LevelComplete
          difficulty={difficultyConfig[completedLevel].label}
          challenges={answeredChallenges}
          results={results}
          onRetry={handleRetryLevel}
          onBack={() => setCompletedLevel(null)}
        />
      </div>
    );
  }

  const currentChallenge = challenges.find((c) => c.id === activeChallenge);

  if (currentChallenge) {
    return (
      <div className="min-h-screen bg-background">
        <ChallengeView
          key={currentChallenge.id}
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
          <button
            onClick={() => setActiveTab("metrics")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-display text-sm font-medium transition-all ${
              activeTab === "metrics"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Métricas
          </button>
        </div>
      </div>

      <WhatIsPO />

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
