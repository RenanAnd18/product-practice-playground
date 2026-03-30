import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Kanban, ArrowRight } from "lucide-react";
import { backlogScenarios } from "@/data/backlog-items";
import BacklogBoard from "./BacklogBoard";

const BacklogSimulation = () => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const scenario = backlogScenarios.find((s) => s.id === activeScenario);

  if (scenario) {
    return <BacklogBoard scenario={scenario} onBack={() => setActiveScenario(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Kanban className="w-6 h-6 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            Simulação de Priorização
          </h2>
        </div>
        <p className="text-muted-foreground text-sm mb-3">
          Arraste itens do backlog para o sprint. Você tem capacidade limitada — priorize pelo maior impacto.
        </p>
        <Card className="p-3 border-primary/20 bg-primary/5">
          <p className="text-xs text-foreground/80">
            📋 <strong>Como funciona:</strong> Você será avaliado ao longo de <strong>5 sprints</strong>. Ao final, será gerado um <strong>relatório de desempenho</strong> com nota, métricas e recomendações — como se fosse entregue ao seu gestor. Priorize com estratégia!
          </p>
        </Card>
      </div>

      <div className="grid gap-4">
        {backlogScenarios.map((s) => (
          <Card
            key={s.id}
            className="p-5 border-border hover:border-primary/40 transition-all cursor-pointer hover:bg-secondary/30"
            onClick={() => setActiveScenario(s.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display font-semibold text-foreground">{s.title}</h3>
                  <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                    {s.items.length} itens
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.context}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BacklogSimulation;
