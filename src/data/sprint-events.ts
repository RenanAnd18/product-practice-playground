export interface EventChoice {
  label: string;
  description: string;
  consequence: string;
  impact: "positive" | "neutral" | "negative";
  /** Capacity modifier for next sprint (e.g., -1 reduces capacity) */
  capacityModifier?: number;
  /** Add an urgent item to backlog */
  injectItem?: {
    id: string;
    title: string;
    description: string;
    type: "bug" | "feature" | "tech-debt" | "research";
    effort: "P" | "M" | "G" | "GG";
    stakeholder: string;
    details: string;
  };
}

export interface SprintEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "stakeholder" | "team" | "market" | "technical";
  choices: [EventChoice, EventChoice, EventChoice];
}

export const sprintEvents: SprintEvent[] = [
  {
    id: "ev1",
    title: "Stakeholder irritado com item não entregue",
    description:
      "O diretor comercial ligou furioso: um cliente estratégico está ameaçando cancelar o contrato porque uma feature prometida não foi entregue. Ele já escalou para o VP.",
    icon: "😤",
    category: "stakeholder",
    choices: [
      {
        label: "Priorizar imediatamente",
        description: "Colocar a feature no topo da próxima sprint, independente do planejamento.",
        consequence:
          "Você atendeu o stakeholder, mas pode comprometer outros itens prioritários. Cuidado com o precedente — isso pode virar rotina.",
        impact: "neutral",
        injectItem: {
          id: "ev1-urgent",
          title: "[URGENTE] Feature solicitada pelo Diretor Comercial",
          description: "Feature escalada pela diretoria. Cliente estratégico ameaça cancelar.",
          type: "feature",
          effort: "G",
          stakeholder: "Diretor Comercial",
          details: "Alta pressão política. Item escalado para VP.",
        },
      },
      {
        label: "Negociar prazo com dados",
        description: "Apresentar a velocity do time e propor uma data realista baseada em métricas.",
        consequence:
          "Excelente decisão! Usar dados para negociar demonstra maturidade como P.O. e protege o time de pressão desnecessária.",
        impact: "positive",
      },
      {
        label: "Ignorar e manter o plano",
        description: "Seguir com a priorização atual sem dar retorno ao stakeholder.",
        consequence:
          "Ignorar stakeholders é arriscado. A falta de comunicação pode gerar mais escalonamentos e perda de confiança.",
        impact: "negative",
        capacityModifier: -0.5,
      },
    ],
  },
  {
    id: "ev2",
    title: "Desenvolvedor-chave pediu demissão",
    description:
      "O dev mais sênior do time anunciou que vai sair em 2 semanas. Ele é o único que conhece profundamente a arquitetura do sistema legado.",
    icon: "👋",
    category: "team",
    choices: [
      {
        label: "Priorizar documentação e knowledge transfer",
        description: "Criar itens de documentação e pair programming nas próximas 2 semanas.",
        consequence:
          "Ótima decisão! Mitigar o risco de knowledge silos é essencial. A sprint terá menos entrega, mas o time ficará mais resiliente.",
        impact: "positive",
        capacityModifier: -1,
        injectItem: {
          id: "ev2-doc",
          title: "[URGENTE] Knowledge Transfer — sistema legado",
          description: "Documentar arquitetura e fazer pair programming antes da saída do dev sênior.",
          type: "tech-debt",
          effort: "G",
          stakeholder: "Tech Lead",
          details: "Janela de 2 semanas. Risco alto de perda de conhecimento.",
        },
      },
      {
        label: "Manter o ritmo normal",
        description: "Continuar com o plano atual e lidar com as consequências depois.",
        consequence:
          "Arriscado. Sem knowledge transfer, o time pode travar em partes críticas do sistema nas próximas sprints.",
        impact: "negative",
        capacityModifier: -2,
      },
      {
        label: "Pedir para adiar a saída",
        description: "Negociar com RH e o dev para estender o aviso prévio.",
        consequence:
          "Pode funcionar, mas não depende só de você. É importante ter um plano B caso ele não aceite.",
        impact: "neutral",
      },
    ],
  },
  {
    id: "ev3",
    title: "Bug crítico em produção",
    description:
      "Um bug está causando perda de dados para 15% dos usuários. O suporte está lotado de reclamações e a reputação do produto está em jogo.",
    icon: "🔥",
    category: "technical",
    choices: [
      {
        label: "Parar tudo e corrigir",
        description: "Interromper a sprint atual e dedicar o time inteiro ao hotfix.",
        consequence:
          "Decisão correta para bugs críticos! A sprint será impactada, mas proteger os usuários é prioridade zero.",
        impact: "positive",
        capacityModifier: -1.5,
        injectItem: {
          id: "ev3-hotfix",
          title: "[CRÍTICO] Hotfix — perda de dados em produção",
          description: "Bug causando perda de dados para 15% dos usuários. Correção emergencial.",
          type: "bug",
          effort: "M",
          stakeholder: "Suporte / Usuários",
          details: "Impacto direto na retenção. Prioridade máxima.",
        },
      },
      {
        label: "Designar parte do time",
        description: "Manter metade do time na sprint e metade no hotfix.",
        consequence:
          "Abordagem razoável, mas o context-switching pode atrasar ambas as frentes. Monitore de perto.",
        impact: "neutral",
        capacityModifier: -1,
      },
      {
        label: "Agendar para a próxima sprint",
        description: "O bug é grave, mas já existe há tempo. Pode esperar mais uma sprint.",
        consequence:
          "Péssima decisão. Com 15% dos usuários afetados e suporte lotado, adiar vai custar churn e reputação.",
        impact: "negative",
      },
    ],
  },
  {
    id: "ev4",
    title: "Concorrente lançou feature similar",
    description:
      "Seu principal concorrente acabou de lançar uma feature que estava no seu roadmap para o próximo trimestre. O CEO está pressionando para acelerar.",
    icon: "⚡",
    category: "market",
    choices: [
      {
        label: "Acelerar o desenvolvimento",
        description: "Repriorizar o backlog para entregar a feature antes do planejado.",
        consequence:
          "Reagir ao concorrente pode fazer sentido, mas cuidado: entregar rápido sem qualidade pode ser pior que não entregar.",
        impact: "neutral",
        injectItem: {
          id: "ev4-feature",
          title: "[ESTRATÉGICO] Feature competitiva — resposta ao concorrente",
          description: "Acelerar entrega de feature similar à lançada pelo concorrente.",
          type: "feature",
          effort: "GG",
          stakeholder: "CEO",
          details: "Pressão da diretoria. Concorrente já lançou.",
        },
      },
      {
        label: "Manter o roadmap",
        description: "Seguir com o plano original e entregar com qualidade no prazo previsto.",
        consequence:
          "Boa decisão! Reagir por pânico raramente dá bom resultado. Foque em entregar valor diferenciado, não em copiar.",
        impact: "positive",
      },
      {
        label: "Pesquisar antes de decidir",
        description: "Fazer uma pesquisa rápida com usuários para entender o impacto real.",
        consequence:
          "Excelente! Decisões baseadas em dados são melhores que decisões por medo. Isso mostra maturidade como P.O.",
        impact: "positive",
        injectItem: {
          id: "ev4-research",
          title: "Pesquisa de impacto — feature do concorrente",
          description: "Entrevistar 10 usuários para entender se a feature do concorrente é relevante.",
          type: "research",
          effort: "P",
          stakeholder: "Product Manager",
          details: "Resultado esperado em 3 dias.",
        },
      },
    ],
  },
  {
    id: "ev5",
    title: "Mudança regulatória urgente",
    description:
      "Uma nova regulamentação (LGPD/compliance) entra em vigor em 30 dias. O jurídico exige adequação imediata sob risco de multa pesada.",
    icon: "⚖️",
    category: "stakeholder",
    choices: [
      {
        label: "Priorizar compliance imediatamente",
        description: "Colocar os itens de adequação no topo do backlog da próxima sprint.",
        consequence:
          "Decisão correta! Compliance não é negociável. Multas e sanções podem ser muito mais caras que atrasar features.",
        impact: "positive",
        injectItem: {
          id: "ev5-compliance",
          title: "[OBRIGATÓRIO] Adequação regulatória — prazo 30 dias",
          description: "Implementar mudanças exigidas pela nova regulamentação. Risco de multa.",
          type: "feature",
          effort: "G",
          stakeholder: "Jurídico",
          details: "Deadline legal. Não negociável.",
        },
      },
      {
        label: "Negociar prazo com jurídico",
        description: "Tentar conseguir uma extensão ou implementação parcial.",
        consequence:
          "Pode funcionar para ganhar tempo, mas regulamentações geralmente têm prazos rígidos. Tenha um plano B.",
        impact: "neutral",
      },
      {
        label: "Delegar para o time técnico",
        description: "Deixar o tech lead decidir como e quando implementar.",
        consequence:
          "Como P.O., compliance é sua responsabilidade de priorização. Delegar a decisão pode causar atrasos e falta de ownership.",
        impact: "negative",
      },
    ],
  },
  {
    id: "ev6",
    title: "Time desmotivado com tech debt",
    description:
      "Os devs estão reclamando que a base de código está insustentável. Dois membros ameaçaram pedir demissão se não houver tempo para refatoração.",
    icon: "😩",
    category: "team",
    choices: [
      {
        label: "Reservar 20% da sprint para tech debt",
        description: "Garantir que toda sprint tenha espaço para melhorias técnicas.",
        consequence:
          "Excelente prática! Equilíbrio entre entrega e saúde técnica é essencial para sustentabilidade a longo prazo.",
        impact: "positive",
        capacityModifier: -0.5,
      },
      {
        label: "Prometer uma sprint inteira de tech debt",
        description: "Dizer ao time que a próxima sprint será dedicada exclusivamente a refatoração.",
        consequence:
          "Promessa arriscada. Stakeholders podem não aceitar uma sprint sem entregas de valor. E promessas não cumpridas pioram a situação.",
        impact: "neutral",
      },
      {
        label: "Explicar que features vêm primeiro",
        description: "Argumentar que o negócio precisa de entregas e tech debt pode esperar.",
        consequence:
          "Péssima abordagem. Ignorar tech debt acumula problemas e acelera o turnover do time. A velocity vai cair progressivamente.",
        impact: "negative",
        capacityModifier: -1,
      },
    ],
  },
  {
    id: "ev7",
    title: "Oportunidade de parceria estratégica",
    description:
      "Uma grande empresa quer integrar seu produto, mas exige uma API específica pronta em 3 sprints. O contrato vale 5x a receita mensal atual.",
    icon: "🤝",
    category: "market",
    choices: [
      {
        label: "Aceitar e repriorizar",
        description: "Reorganizar o roadmap para entregar a API no prazo.",
        consequence:
          "Oportunidades assim são raras. Repriorizar faz sentido, mas comunique o impacto nos outros itens para todos os stakeholders.",
        impact: "positive",
        injectItem: {
          id: "ev7-api",
          title: "[ESTRATÉGICO] API de integração — parceria",
          description: "Desenvolver API exigida pelo parceiro estratégico. Prazo: 3 sprints.",
          type: "feature",
          effort: "GG",
          stakeholder: "Diretor de Negócios",
          details: "Contrato vale 5x receita mensal. Alta prioridade.",
        },
      },
      {
        label: "Pedir mais prazo ao parceiro",
        description: "Negociar 5 sprints em vez de 3 para manter o roadmap equilibrado.",
        consequence:
          "Negociar prazos é válido, mas cuidado para não perder a oportunidade. O parceiro pode procurar outro fornecedor.",
        impact: "neutral",
      },
      {
        label: "Recusar a parceria",
        description: "O roadmap atual é mais importante. Não vale desviar o time.",
        consequence:
          "Decisão controversa. Recusar pode ser prudente se o time está sobrecarregado, mas perder 5x de receita requer justificativa forte.",
        impact: "negative",
      },
    ],
  },
  {
    id: "ev8",
    title: "Feedback negativo de pesquisa com usuários",
    description:
      "Uma pesquisa de NPS revelou que a satisfação caiu 20 pontos. Os principais problemas citados são performance lenta e UX confusa no onboarding.",
    icon: "📉",
    category: "market",
    choices: [
      {
        label: "Criar sprint temática de UX/Performance",
        description: "Dedicar a próxima sprint a resolver os problemas apontados pelos usuários.",
        consequence:
          "Boa abordagem! Ouvir o usuário e agir rápido demonstra compromisso com o produto. O NPS deve reagir em 2-3 meses.",
        impact: "positive",
        injectItem: {
          id: "ev8-ux",
          title: "Melhorias de UX/Performance — resposta ao NPS",
          description: "Resolver os principais pontos de dor apontados na pesquisa de satisfação.",
          type: "feature",
          effort: "G",
          stakeholder: "Head de Produto",
          details: "NPS caiu 20 pontos. Foco em onboarding e performance.",
        },
      },
      {
        label: "Investigar mais a fundo",
        description: "Fazer entrevistas qualitativas antes de tomar ação.",
        consequence:
          "Válido se você não tem clareza sobre as causas. Mas não demore — NPS em queda pode significar churn iminente.",
        impact: "neutral",
        injectItem: {
          id: "ev8-research",
          title: "Pesquisa qualitativa — entrevistas de NPS",
          description: "Entrevistar 15 usuários detratores para entender causas raiz da insatisfação.",
          type: "research",
          effort: "P",
          stakeholder: "UX Researcher",
          details: "Complementar dados quantitativos do NPS.",
        },
      },
      {
        label: "Esperar o próximo ciclo de NPS",
        description: "Pode ter sido um ponto fora da curva. Melhor aguardar mais dados.",
        consequence:
          "Arriscado. Ignorar sinais de insatisfação é uma das principais causas de churn. Dados quantitativos + qualitativos são suficientes para agir.",
        impact: "negative",
      },
    ],
  },
];

/**
 * Returns a random event for sprints 2-5 (not sprint 1).
 * ~60% chance of an event happening per sprint transition.
 */
export function getRandomEvent(sprintNumber: number, usedEventIds: string[]): SprintEvent | null {
  if (sprintNumber <= 1) return null;
  
  // 60% chance of event
  if (Math.random() > 0.6) return null;

  const available = sprintEvents.filter((e) => !usedEventIds.includes(e.id));
  if (available.length === 0) return null;

  return available[Math.floor(Math.random() * available.length)];
}
