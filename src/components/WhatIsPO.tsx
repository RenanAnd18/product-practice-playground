import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, BarChart3, MessageSquare, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const pillars = [
  {
    icon: Target,
    title: "Visão de Produto",
    description: "Define a direção do produto — para onde ele vai e por quê. O P.O. garante que cada feature entregue contribua para um objetivo maior.",
  },
  {
    icon: Users,
    title: "Voz do Usuário",
    description: "Entende as dores e necessidades dos clientes. Faz pesquisas, entrevistas e usa dados para tomar decisões que resolvam problemas reais.",
  },
  {
    icon: BarChart3,
    title: "Priorização",
    description: "Decide O QUE construir e em qual ORDEM. Com recursos limitados, saber dizer 'não agora' é tão importante quanto dizer 'sim'.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação",
    description: "Ponte entre stakeholders (CEO, vendas, suporte) e o time técnico. Traduz necessidades de negócio em histórias de usuário claras.",
  },
];

const WhatIsPO = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6">
      <Card className="border-primary/20 bg-primary/5 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-primary/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h3 className="font-display font-semibold text-foreground text-sm">
                Novo na área? Entenda o que é ser um Product Owner
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Clique para expandir uma explicação rápida sobre o papel do P.O.
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </button>

        {isExpanded && (
          <div className="px-5 pb-5 space-y-4">
            <div className="border-t border-primary/10 pt-4">
              <p className="text-sm text-foreground/80 leading-relaxed">
                O <strong>Product Owner (P.O.)</strong> é o profissional responsável por maximizar o valor de um produto. 
                Ele é o ponto central entre o negócio (o que a empresa precisa), os usuários (o que as pessoas querem) e 
                o time de desenvolvimento (o que é possível construir). Pense no P.O. como o "CEO do produto" — ele não 
                gerencia pessoas, mas gerencia a direção do que será construído.
              </p>
            </div>

            <div>
              <Badge variant="outline" className="border-primary/30 text-primary text-xs mb-3">
                Os 4 pilares do P.O.
              </Badge>
              <div className="grid gap-3 sm:grid-cols-2">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                      <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{pillar.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">💡 No dia a dia:</strong> O P.O. participa de cerimônias ágeis 
                (planning, daily, review, retrospectiva), escreve histórias de usuário, prioriza o backlog, conversa com 
                stakeholders, analisa métricas e toma decisões de produto. Este simulador treina essas situações reais 
                que você vai enfrentar na prática.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WhatIsPO;
