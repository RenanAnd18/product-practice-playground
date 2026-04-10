import { useState, useMemo } from "react";
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, TrendingUp, TrendingDown, Minus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import MetricChart from "@/components/MetricChart";
import type { MetricChallenge, MetricDecision } from "@/data/metrics-challenges";

const metricSummaries: Record<string, string> = {
  "Lead Time": "Mede o tempo total desde a criação de um item até sua entrega ao usuário final. Inclui tempo de espera, desenvolvimento, testes e deploy. Quanto menor, mais ágil é o fluxo.",
  "Cycle Time": "Mede o tempo entre o início do trabalho ativo em um item e sua conclusão. Diferente do Lead Time, não inclui o tempo de espera na fila. É o principal indicador de eficiência do time.",
  "Throughput": "Quantidade de itens entregues em um período. Indica a capacidade de entrega do time. Analisar tendências é mais útil do que valores absolutos.",
  "Velocity": "Soma dos story points entregues por sprint. Serve para planejamento de capacidade, não para comparar times. Estabilidade importa mais que valor alto.",
  "Burndown / Burnup": "Burndown mostra o trabalho restante ao longo da sprint. Burnup mostra o trabalho concluído acumulado. Juntos revelam se o escopo está mudando e se o ritmo é sustentável.",
  "Taxa de Entrega no Prazo": "Percentual de itens entregues dentro do prazo comprometido. Reflete a previsibilidade do time e a qualidade das estimativas. Meta saudável: acima de 80%.",
  "WIP (Work in Progress)": "Quantidade de itens em andamento simultaneamente. WIP alto causa context switching, aumenta lead time e reduz qualidade. Limitar WIP é essencial para fluxo contínuo.",
  "Cone da Incerteza": "Mostra como a margem de erro das estimativas diminui conforme o projeto avança. No início, estimativas podem variar de 0.25x a 4x. Conforme mais informação é obtida, a faixa se estreita.",
};

interface MetricChallengeViewProps {
  challenge: MetricChallenge;
  onBack: () => void;
  onComplete: (isOptimal: boolean) => void;
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const MetricChallengeView = ({ challenge, onBack, onComplete }: MetricChallengeViewProps) => {
  const [selected, setSelected] = useState<MetricDecision | null>(null);
  const [showLearning, setShowLearning] = useState(false);

  const shuffled = useMemo(() => {
    const arr = [...challenge.decisions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [challenge.id]);

  const TrendIcon = trendIcons[challenge.highlight.trend];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar às métricas
      </button>

      {/* Header */}
      <div className="mb-6">
        <Badge variant="outline" className="mb-3 border-info/30 text-info">
          Métrica · {challenge.metricName}
        </Badge>
        <h2 className="font-display text-2xl font-bold text-foreground mb-3">
          {challenge.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-sm">{challenge.caseDescription}</p>
      </div>

      {/* Highlight Card */}
      <Card className="border-border bg-secondary/50 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{challenge.highlight.label}</p>
            <p className="text-2xl font-display font-bold text-foreground mt-1">{challenge.highlight.value}</p>
          </div>
          <div className={`p-3 rounded-full ${
            challenge.highlight.trend === "up" ? "bg-destructive/10" : challenge.highlight.trend === "down" ? "bg-destructive/10" : "bg-muted"
          }`}>
            <TrendIcon className={`w-6 h-6 ${
              challenge.highlight.trend === "neutral" ? "text-muted-foreground" : "text-destructive"
            }`} />
          </div>
        </div>
      </Card>

      {/* Chart */}
      <Card className="border-border p-5 mb-8">
        <MetricChart challenge={challenge} />
      </Card>

      {/* Decisions or Feedback */}
      {!selected ? (
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Com base nessa métrica, o que você faz?
          </h3>
          <div className="space-y-3">
            {shuffled.map((d, i) => (
              <Card
                key={d.id}
                className="border-border hover:border-primary/40 transition-all cursor-pointer p-4 hover:bg-secondary/30"
                onClick={() => setSelected(d)}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-muted-foreground mt-0.5 shrink-0">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">{d.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className={`p-5 border ${
            selected.isOptimal ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
          }`}>
            <div className="flex items-start gap-3">
              {selected.isOptimal ? (
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
              )}
              <div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  {selected.isOptimal ? "Análise correta!" : "Não é a melhor abordagem."}
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">{selected.feedback}</p>
              </div>
            </div>
          </Card>

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
                  <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                    <span className="text-primary font-mono text-xs mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Button onClick={() => onComplete(selected.isOptimal)} className="w-full">
            Próxima métrica
          </Button>
        </div>
      )}
    </div>
  );
};

export default MetricChallengeView;
