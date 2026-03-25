import { useState, useMemo } from "react";
import { ArrowLeft, MessageSquare, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Challenge, Decision } from "@/data/challenges";

interface ChallengeViewProps {
  challenge: Challenge;
  onBack: () => void;
  onComplete: (isOptimal: boolean) => void;
}

const ChallengeView = ({ challenge, onBack, onComplete }: ChallengeViewProps) => {
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [showLearning, setShowLearning] = useState(false);

  const shuffledDecisions = useMemo(() => {
    const arr = [...challenge.decisions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [challenge.id]);

  const handleDecision = (decision: Decision) => {
    setSelectedDecision(decision);
  };

  const handleContinue = () => {
    if (selectedDecision) {
      onComplete(selectedDecision.isOptimal);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar aos desafios
      </button>

      {/* Context */}
      <div className="mb-8">
        <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
          {challenge.category} · {challenge.difficulty}
        </Badge>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          {challenge.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{challenge.context}</p>
      </div>

      {/* Scenario */}
      <Card className="bg-secondary/50 border-border mb-6 p-5">
        <p className="text-sm text-secondary-foreground leading-relaxed italic">
          📋 {challenge.scenario}
        </p>
      </Card>

      {/* Stakeholder Message */}
      <Card className="border-primary/20 bg-primary/5 mb-8 p-5">
        <div className="flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display font-semibold text-foreground text-sm">
                {challenge.stakeholderName}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {challenge.stakeholderRole}
              </span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">
              "{challenge.stakeholderMessage}"
            </p>
          </div>
        </div>
      </Card>

      {/* Decisions */}
      {!selectedDecision ? (
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            O que você faz?
          </h3>
          <div className="space-y-3">
            {challenge.decisions.map((decision, index) => (
              <Card
                key={decision.id}
                className="border-border hover:border-primary/40 transition-all cursor-pointer p-4 hover:bg-secondary/30"
                onClick={() => handleDecision(decision)}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {decision.text}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Feedback */}
          <Card
            className={`p-5 border ${
              selectedDecision.isOptimal
                ? "border-success/30 bg-success/5"
                : "border-destructive/30 bg-destructive/5"
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedDecision.isOptimal ? (
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
              )}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  {selectedDecision.isOptimal ? "Decisão acertada!" : "Não é a melhor escolha."}
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {selectedDecision.feedback}
                </p>
              </div>
            </div>
          </Card>

          {/* Impact Radar */}
          <Card className="p-5 border-border">
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm">
              Impacto da sua decisão
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Stakeholders", value: selectedDecision.impact.stakeholders },
                { label: "Entrega", value: selectedDecision.impact.delivery },
                { label: "Valor", value: selectedDecision.impact.value },
                { label: "Técnico", value: selectedDecision.impact.technical },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono w-24">
                    {item.label}
                  </span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.value > 0 ? "bg-success" : item.value < 0 ? "bg-destructive" : "bg-muted-foreground"
                      }`}
                      style={{
                        width: `${Math.abs(item.value) * 33.3}%`,
                        marginLeft: item.value < 0 ? "auto" : undefined,
                      }}
                    />
                  </div>
                  <span
                    className={`font-mono text-xs font-medium ${
                      item.value > 0 ? "text-success" : item.value < 0 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {item.value > 0 ? `+${item.value}` : item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Points */}
          {!showLearning ? (
            <Button
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => setShowLearning(true)}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Ver pontos de aprendizado
            </Button>
          ) : (
            <Card className="p-5 border-primary/20 bg-primary/5">
              <h4 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                Pontos de Aprendizado
              </h4>
              <ul className="space-y-2">
                {challenge.learningPoints.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground/80 flex items-start gap-2"
                  >
                    <span className="text-primary font-mono text-xs mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Button onClick={handleContinue} className="w-full">
            Próximo desafio
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeView;
