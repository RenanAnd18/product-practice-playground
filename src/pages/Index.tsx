import { useState, useCallback } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import ChallengeCard from "@/components/ChallengeCard";
import ChallengeView from "@/components/ChallengeView";
import { challenges } from "@/data/challenges";

const Index = () => {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [streak, setStreak] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);

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
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-6">
          Desafios Disponíveis
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              isCompleted={completedIds.has(challenge.id)}
              isLocked={false}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
