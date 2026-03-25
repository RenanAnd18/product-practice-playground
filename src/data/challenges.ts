export interface Decision {
  id: string;
  text: string;
  impact: {
    stakeholders: number; // -3 to +3
    delivery: number;
    value: number;
    technical: number;
  };
  feedback: string;
  isOptimal: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  category: string;
  difficulty: "junior" | "pleno" | "senior";
  context: string;
  scenario: string;
  stakeholderMessage: string;
  stakeholderName: string;
  stakeholderRole: string;
  decisions: Decision[];
  learningPoints: string[];
}

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "Backlog Explodindo",
    category: "Priorização",
    difficulty: "junior",
    context: "Você é P.O. de um produto de e-commerce. O backlog tem 47 itens e o sprint começa amanhã. O time tem capacidade para 5 itens.",
    scenario: "Seu gerente de produto marcou uma reunião urgente. Ele quer saber como você vai priorizar o próximo sprint. Três stakeholders diferentes mandaram pedidos 'urgentes' no Slack.",
    stakeholderMessage: "Preciso que você me explique até as 15h como vai priorizar esse sprint. O CEO perguntou sobre a feature de recomendações, o time de vendas precisa do filtro avançado, e o suporte está reclamando de um bug crítico no checkout. Não me venha com 'tudo é importante'. Quero ver trade-offs claros.",
    stakeholderName: "Marina Silva",
    stakeholderRole: "Head de Produto",
    decisions: [
      {
        id: "1a",
        text: "Corrigir o bug do checkout primeiro, depois priorizar filtro avançado por impacto em receita, e agendar recomendações para o sprint seguinte com justificativa baseada em dados.",
        impact: { stakeholders: 3, delivery: 2, value: 3, technical: 1 },
        feedback: "Excelente! Você priorizou corretamente: bugs críticos primeiro (afetam receita diretamente), depois valor de negócio mensurável, e soube dizer 'não agora' com embasamento. Isso é maturidade de P.O.",
        isOptimal: true,
      },
      {
        id: "1b",
        text: "Focar na feature de recomendações porque o CEO pediu — é importante manter a liderança satisfeita.",
        impact: { stakeholders: -2, delivery: -1, value: -1, technical: 0 },
        feedback: "Priorizar por HiPPO (Highest Paid Person's Opinion) é um anti-pattern clássico. O bug do checkout está causando perda de receita AGORA. Um P.O. precisa ter coragem de dizer não, mesmo para o CEO, quando tem dados que sustentam a decisão.",
        isOptimal: false,
      },
      {
        id: "1c",
        text: "Tentar encaixar tudo prometendo que o time vai dar um 'gás extra' nesse sprint.",
        impact: { stakeholders: -1, delivery: -3, value: -2, technical: -3 },
        feedback: "Over-commitment é um dos erros mais graves de um P.O. Isso gera débito técnico, burnout no time e perda de credibilidade quando inevitavelmente não entrega. Sprint planning não é negociação de bazar.",
        isOptimal: false,
      },
      {
        id: "1d",
        text: "Pedir mais uma semana para analisar os dados antes de decidir.",
        impact: { stakeholders: -2, delivery: -2, value: 0, technical: 0 },
        feedback: "Análise paralisia. Você já tem informação suficiente para tomar uma decisão: um bug crítico em produção, métricas de vendas disponíveis, e capacidade definida do time. Um P.O. precisa tomar decisões com informação imperfeita.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Bugs críticos em produção sempre têm prioridade sobre features novas",
      "Use frameworks como RICE ou WSJF para priorização objetiva",
      "Dizer 'não' com dados é mais poderoso do que dizer 'sim' sem convicção",
      "Capacidade do time é um limite rígido, não negociável",
    ],
  },
  {
    id: "2",
    title: "Stakeholder Desalinhado",
    category: "Comunicação",
    difficulty: "pleno",
    context: "O diretor comercial está exigindo uma feature que não está no roadmap. Ele já prometeu para um cliente grande que será entregue no próximo mês.",
    scenario: "Você recebeu um e-mail do diretor comercial copiando o VP de produto e o CTO. Ele está pressionando por uma integração customizada que beneficia apenas um cliente, mas que consumiria 3 sprints do time.",
    stakeholderMessage: "Esse cliente representa 15% da nossa receita. Se não entregarmos essa integração até o final do mês, eles vão cancelar o contrato. Já prometi que faríamos. Preciso que seu time comece HOJE.",
    stakeholderName: "Ricardo Mendes",
    stakeholderRole: "Diretor Comercial",
    decisions: [
      {
        id: "2a",
        text: "Marcar uma reunião com o diretor, o PM e o CTO para entender o impacto real, propor uma solução MVP mais enxuta e definir critérios claros de aceite junto ao cliente.",
        impact: { stakeholders: 2, delivery: 2, value: 3, technical: 2 },
        feedback: "Perfeito. Você não disse 'não' nem 'sim' cegamente. Envolveu as partes certas, buscou entender o problema real (retenção do cliente) e propôs uma alternativa viável. Isso é gestão de stakeholder na prática.",
        isOptimal: true,
      },
      {
        id: "2b",
        text: "Aceitar o pedido imediatamente e reorganizar o backlog para acomodar.",
        impact: { stakeholders: 0, delivery: -3, value: -2, technical: -2 },
        feedback: "Você criou um precedente perigoso: qualquer stakeholder que gritar mais alto vai furar a fila. Além disso, customizações para um cliente degradam o produto para todos. O P.O. é guardião do produto, não executor de pedidos.",
        isOptimal: false,
      },
      {
        id: "2c",
        text: "Responder por e-mail dizendo que não é possível e que ele não deveria ter prometido sem consultar o time.",
        impact: { stakeholders: -3, delivery: 0, value: 0, technical: 0 },
        feedback: "Mesmo estando tecnicamente certo, essa abordagem é politicamente desastrosa. Um P.O. precisa de habilidade diplomática. Confronto público por e-mail destrói relações e não resolve o problema do cliente.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Nunca aceite nem rejeite pedidos urgentes imediatamente — investigue primeiro",
      "Stakeholders vendem 'soluções', mas o P.O. deve entender o 'problema'",
      "Customizações para um cliente devem ser avaliadas como product-market fit",
      "Comunicação assertiva ≠ comunicação agressiva",
    ],
  },
  {
    id: "3",
    title: "Refinamento Caótico",
    category: "User Stories",
    difficulty: "junior",
    context: "O time está reclamando que as histórias de usuário estão mal escritas. Os devs não entendem os critérios de aceite e a sprint anterior teve 40% de re-trabalho.",
    scenario: "Na retrospectiva, o tech lead trouxe dados mostrando que o re-trabalho aumentou 3x nos últimos 2 meses. O time está frustrado e apontando para a qualidade das user stories.",
    stakeholderMessage: "Os devs estão desmotivados. Ontem dois seniors me procuraram para reclamar que passam mais tempo pedindo esclarecimentos do que codando. Se isso continuar, vou perder gente boa do time. Precisamos resolver isso no próximo refinamento.",
    stakeholderName: "Lucas Andrade",
    stakeholderRole: "Tech Lead",
    decisions: [
      {
        id: "3a",
        text: "Reconhecer o problema, propor um novo formato de refinamento com sessões de Example Mapping antes do sprint, e criar um template de user story com critérios de aceite em formato BDD (Given/When/Then).",
        impact: { stakeholders: 3, delivery: 3, value: 2, technical: 3 },
        feedback: "Ótima abordagem! Example Mapping é uma técnica poderosa para alinhar entendimento antes da sprint. O formato BDD torna os critérios de aceite testáveis e reduz ambiguidade. Você atacou a causa raiz, não o sintoma.",
        isOptimal: true,
      },
      {
        id: "3b",
        text: "Pedir para os devs pararem de reclamar e lerem as stories com mais atenção antes de começar a codar.",
        impact: { stakeholders: -3, delivery: -2, value: -1, technical: -3 },
        feedback: "Culpar o time é o caminho mais rápido para destruir confiança. Se 40% é re-trabalho, o problema está no processo, não nas pessoas. O P.O. é responsável pela clareza do backlog — isso é literalmente seu trabalho.",
        isOptimal: false,
      },
      {
        id: "3c",
        text: "Escrever user stories mais detalhadas com documentação de 3+ páginas para cada item.",
        impact: { stakeholders: -1, delivery: -2, value: 0, technical: -1 },
        feedback: "Documentação excessiva é tão ruim quanto documentação insuficiente. O Manifesto Ágil valoriza 'software funcionando mais que documentação abrangente'. A solução é colaboração, não burocracia.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Example Mapping: regras, exemplos e perguntas antes de escrever stories",
      "Critérios de aceite em BDD reduzem ambiguidade e facilitam testes",
      "Re-trabalho alto é sintoma de refinamento fraco, não de devs ruins",
      "INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable",
    ],
  },
  {
    id: "4",
    title: "Métricas que Mentem",
    category: "Métricas",
    difficulty: "senior",
    context: "Sua head de produto está pressionando para melhorar o NPS do produto. O NPS caiu de 42 para 28 nos últimos 3 meses. Ela quer um plano de ação.",
    scenario: "Você precisa apresentar na próxima reunião de liderança um plano para recuperar o NPS. Mas ao analisar os dados, você percebe que o NPS caiu por causa de uma mudança de UX que AUMENTOU a conversão em 23%.",
    stakeholderMessage: "O board está preocupado com o NPS. Preciso de um plano concreto para subir para 40+ no próximo trimestre. Não me importa como, mas preciso de resultados. A reputação do produto está em jogo.",
    stakeholderName: "Carla Ribeiro",
    stakeholderRole: "VP de Produto",
    decisions: [
      {
        id: "4a",
        text: "Apresentar os dados completos: NPS caiu, mas conversão subiu 23%. Propor segmentar o NPS por cohort para entender quais usuários estão insatisfeitos e endereçar os problemas específicos sem reverter a mudança que gerou valor.",
        impact: { stakeholders: 3, delivery: 1, value: 3, technical: 1 },
        feedback: "Brilhante. Você demonstrou pensamento analítico sofisticado. Métricas isoladas mentem — o contexto importa. Segmentar por cohort revela se são power users reclamando de mudança ou novos usuários com problemas reais. Isso é product sense de verdade.",
        isOptimal: true,
      },
      {
        id: "4b",
        text: "Reverter a mudança de UX para subir o NPS de volta.",
        impact: { stakeholders: 1, delivery: -1, value: -3, technical: -1 },
        feedback: "Você sacrificou 23% de conversão (receita real) para melhorar uma métrica de vaidade. NPS é um indicador, não um objetivo. Nenhum CFO ficaria feliz sabendo que você trocou receita por pontos de satisfação.",
        isOptimal: false,
      },
      {
        id: "4c",
        text: "Manipular a pesquisa de NPS enviando apenas para usuários que você sabe que estão satisfeitos.",
        impact: { stakeholders: -3, delivery: 0, value: -3, technical: 0 },
        feedback: "Isso é fraude de dados. Além de antiético, quando descobrirem (e vão descobrir), sua credibilidade será destruída permanentemente. P.O. que manipula métricas perde a confiança de todo o time e liderança.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Métricas isoladas sem contexto podem levar a decisões erradas",
      "Sempre analise métricas correlacionadas antes de agir",
      "NPS é um indicador lagging — entenda as causas, não trate o sintoma",
      "Segmentação por cohort revela padrões invisíveis em médias gerais",
    ],
  },
  {
    id: "5",
    title: "Sprint Review Desastrosa",
    category: "Cerimônias",
    difficulty: "pleno",
    context: "A última sprint entregou apenas 2 dos 8 itens planejados. O time está desmoralizado e a liderança está questionando a capacidade do time.",
    scenario: "Você tem 30 minutos para a Sprint Review com todos os stakeholders. Precisa apresentar os resultados e manter a confiança na equipe.",
    stakeholderMessage: "Mais uma sprint com entrega baixa. Estou começando a questionar se esse time tem a senioridade necessária. Quero uma explicação clara do que aconteceu e um plano para que isso não se repita. Se na próxima sprint for igual, vamos ter que reestruturar o time.",
    stakeholderName: "Fernando Costa",
    stakeholderRole: "CTO",
    decisions: [
      {
        id: "5a",
        text: "Ser transparente sobre o que deu errado (impedimentos, dependências externas, estimativas otimistas), apresentar os 2 itens entregues com foco no valor gerado, e propor ações concretas: melhorar estimativas, reduzir WIP, e criar buffer para imprevistos.",
        impact: { stakeholders: 3, delivery: 3, value: 2, technical: 2 },
        feedback: "Excelente gestão de crise. Transparência constrói confiança, foco em valor entregue (não volume) muda a narrativa, e ações concretas mostram maturidade. Reduzir WIP e melhorar estimativas ataca as causas raiz mais comuns de under-delivery.",
        isOptimal: true,
      },
      {
        id: "5b",
        text: "Culpar os devs pela estimativa errada e a equipe de infraestrutura pelos impedimentos.",
        impact: { stakeholders: -3, delivery: -2, value: -1, technical: -3 },
        feedback: "P.O. que culpa o time perde o time. Você é co-responsável pelas estimativas (participou do planning) e deveria ter escalado impedimentos proativamente. Jogar culpa destrói a segurança psicológica que o Scrum precisa para funcionar.",
        isOptimal: false,
      },
      {
        id: "5c",
        text: "Cancelar a Sprint Review e pedir mais tempo para 'preparar melhor a apresentação'.",
        impact: { stakeholders: -2, delivery: -1, value: -1, technical: 0 },
        feedback: "Evitar transparência só piora a situação. Stakeholders percebem quando você está escondendo problemas. A Sprint Review existe justamente para inspeção e adaptação — cancelá-la é anti-ágil.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Sprint Review é sobre valor entregue, não volume de tickets fechados",
      "Transparência sobre falhas constrói mais confiança do que tentar esconder",
      "Velocity instável é sintoma — investigue: WIP alto, dependências, escopo mal definido",
      "O P.O. é co-responsável pela sprint, não um observador externo",
    ],
  },
];
