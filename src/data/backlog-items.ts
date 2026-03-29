export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  type: "feature" | "bug" | "tech-debt" | "research";
  effort: "P" | "M" | "G" | "GG";
  stakeholder: string;
  details: string;
}

export interface BacklogScenario {
  id: string;
  title: string;
  context: string;
  constraint: string;
  sprintCapacity: string;
  items: BacklogItem[];
  incomingItems: BacklogItem[][]; // items that arrive after each sprint (index 0 = after sprint 1)
  optimalOrder: string[];
  explanation: string[];
}

export const backlogScenarios: BacklogScenario[] = [
  {
    id: "bs1",
    title: "Sprint de Crise no E-commerce",
    context: "Você é P.O. de um e-commerce que fatura R$2M/mês. A Black Friday é em 3 semanas. O time tem capacidade para 5 itens de tamanho M nesse sprint (2 semanas). Você precisa decidir o que entra, o que fica em progresso e o que pode esperar.",
    constraint: "Capacidade do sprint: 5 pontos. Cada item tem um tamanho: P (Pequeno) = 0.5 ponto, M (Médio) = 1 ponto, G (Grande) = 2 pontos, GG (Muito Grande) = 3 pontos. Arraste os itens mais importantes para a coluna 'Sprint' sem ultrapassar 5 pontos no total.",
    sprintCapacity: "5M",
    items: [
      {
        id: "bs1-1",
        title: "Bug: Cupom não aplica desconto no mobile",
        description: "30% dos acessos são mobile. Cupons são principal driver de conversão na Black Friday.",
        type: "bug",
        effort: "P",
        stakeholder: "Suporte",
        details: "50 tickets/dia. Impacto estimado: R$150k/mês em vendas perdidas no mobile.",
      },
      {
        id: "bs1-2",
        title: "Feature: Wishlist com notificação de preço",
        description: "Usuários podem salvar produtos e ser notificados quando o preço cair.",
        type: "feature",
        effort: "G",
        stakeholder: "CEO",
        details: "O CEO viu no concorrente e quer para a Black Friday. Sem validação com usuários.",
      },
      {
        id: "bs1-3",
        title: "Tech Debt: Migrar gateway de pagamento",
        description: "Gateway atual tem 2% de falha em transações. Novo gateway tem 0.1%.",
        type: "tech-debt",
        effort: "GG",
        stakeholder: "Tech Lead",
        details: "2% de falha = R$40k/mês perdido. Migração é complexa e arriscada pré-Black Friday.",
      },
      {
        id: "bs1-4",
        title: "Feature: Filtro avançado por marca e preço",
        description: "Top 3 em pedidos do time de vendas. Melhora a descoberta de produtos.",
        type: "feature",
        effort: "M",
        stakeholder: "Head de Vendas",
        details: "Análise mostra que usuários que usam filtros convertem 2.5x mais.",
      },
      {
        id: "bs1-5",
        title: "Bug: Checkout trava em pagamento com PIX",
        description: "PIX representa 40% das transações. Bug afeta 8% dos pagamentos PIX.",
        type: "bug",
        effort: "M",
        stakeholder: "Suporte",
        details: "120 tickets/semana. Estimativa: R$200k/mês em transações perdidas.",
      },
      {
        id: "bs1-6",
        title: "Feature: Recomendações personalizadas na home",
        description: "ML-based. Produtos recomendados baseados em histórico de navegação.",
        type: "feature",
        effort: "GG",
        stakeholder: "Head de Produto",
        details: "Benchmarks indicam +15% em ticket médio. Mas precisa de 3 meses de dados para treinar modelo.",
      },
      {
        id: "bs1-7",
        title: "Research: Teste A/B no fluxo de checkout",
        description: "Hipótese: simplificar checkout de 4 para 2 steps aumenta conversão.",
        type: "research",
        effort: "M",
        stakeholder: "UX Designer",
        details: "Dados mostram 35% de abandono no step 3. Potencial de +20% em conversão.",
      },
      {
        id: "bs1-8",
        title: "Feature: Programa de fidelidade com pontos",
        description: "Sistema de pontos para compras recorrentes. Cashback em formato de crédito.",
        type: "feature",
        effort: "GG",
        stakeholder: "Head de Marketing",
        details: "Concorrente lançou há 2 meses. Sem dados de impacto ainda.",
      },
    ],
    incomingItems: [
      [
        {
          id: "bs1-new1",
          title: "Bug: Cálculo de frete incorreto para região Norte",
          description: "Frete calculado 3x acima do real para estados do Norte. Clientes abandonam carrinho.",
          type: "bug",
          effort: "M",
          stakeholder: "Suporte",
          details: "45 tickets nos últimos 3 dias. Região Norte representa 8% das vendas.",
        },
        {
          id: "bs1-new2",
          title: "Feature: Banner promocional dinâmico na home",
          description: "CEO quer banner animado para Black Friday com countdown timer.",
          type: "feature",
          effort: "P",
          stakeholder: "Head de Marketing",
          details: "Solicitação urgente do marketing para campanha que começa em 5 dias.",
        },
      ],
      [
        {
          id: "bs1-new3",
          title: "Bug: Estoque não atualiza em tempo real",
          description: "Clientes compram produtos esgotados, gerando cancelamentos e frustração.",
          type: "bug",
          effort: "G",
          stakeholder: "Operações",
          details: "12 cancelamentos por dia. NPS caiu 15 pontos no último mês.",
        },
        {
          id: "bs1-new4",
          title: "Feature: Avaliações de produtos com fotos",
          description: "Permitir que clientes enviem fotos nas avaliações de produtos.",
          type: "feature",
          effort: "M",
          stakeholder: "Head de Produto",
          details: "Pesquisa mostra que 72% dos usuários confiam mais em reviews com fotos.",
        },
        {
          id: "bs1-new5",
          title: "Tech Debt: Cache de catálogo expira incorretamente",
          description: "Produtos atualizados demoram até 6h para aparecer no site.",
          type: "tech-debt",
          effort: "P",
          stakeholder: "Tech Lead",
          details: "Impacta diretamente campanhas de preço da Black Friday.",
        },
      ],
    ],
    optimalOrder: ["bs1-5", "bs1-1", "bs1-4", "bs1-7"],
    explanation: [
      "🥇 Bug do PIX — Maior impacto em receita (R$200k/mês, 40% das transações). Corrigir primeiro é essencial.",
      "🥈 Bug do cupom mobile — Segundo maior impacto, esforço pequeno e crítico para a Black Friday.",
      "🥉 Filtro avançado — Dados comprovam 2.5x mais conversão, esforço médio e alto retorno.",
      "4️⃣ Teste A/B checkout — Discovery que pode gerar +20% conversão com esforço médio.",
      "❌ A migração do gateway é importante mas arriscada pré-Black Friday. Wishlist, recomendações e fidelidade são features não validadas ou que precisam de mais tempo.",
    ],
  },
  {
    id: "bs2",
    title: "SaaS B2B: Retenção em Queda",
    context: "Você é P.O. de um SaaS B2B de gestão de projetos. O churn aumentou de 3% para 7% nos últimos 2 meses. O time tem capacidade para 5 itens M nesse sprint. O CEO quer ações imediatas.",
    constraint: "Capacidade do sprint: 5 pontos. Tamanhos: P (Pequeno) = 0.5 ponto, M (Médio) = 1 ponto, G (Grande) = 2 pontos, GG (Muito Grande) = 3 pontos. Foque em itens que impactam diretamente a retenção dos clientes.",
    sprintCapacity: "5M",
    items: [
      {
        id: "bs2-1",
        title: "Feature: Dashboard de métricas para gestores",
        description: "Relatórios visuais de produtividade da equipe para gerentes.",
        type: "feature",
        effort: "G",
        stakeholder: "Head de Vendas",
        details: "Top feature pedida em demos de vendas. 60% dos trials enterprise pedem isso.",
      },
      {
        id: "bs2-2",
        title: "Bug: Notificações duplicadas em projetos compartilhados",
        description: "Usuários recebem 3-5x notificações do mesmo evento.",
        type: "bug",
        effort: "M",
        stakeholder: "Suporte",
        details: "Principal motivo de tickets no último mês. Usuários desativam notificações e perdem updates importantes.",
      },
      {
        id: "bs2-3",
        title: "Feature: Integração com Slack",
        description: "Notificações de tarefas e updates direto no Slack.",
        type: "feature",
        effort: "M",
        stakeholder: "CS Manager",
        details: "Mencionado em 40% das entrevistas de churn como motivo de abandono. Concorrentes já têm.",
      },
      {
        id: "bs2-4",
        title: "Tech Debt: Refatorar sistema de permissões",
        description: "Código legado causa bugs intermitentes em convites de time.",
        type: "tech-debt",
        effort: "G",
        stakeholder: "Tech Lead",
        details: "3 bugs de permissão nos últimos 2 sprints. Cada um levou 2 dias para diagnosticar.",
      },
      {
        id: "bs2-5",
        title: "Feature: Templates de projeto pré-configurados",
        description: "Onboarding mais rápido com templates prontos (Marketing, Dev, RH).",
        type: "feature",
        effort: "M",
        stakeholder: "Head de Produto",
        details: "Activation rate é 23%. Benchmark do setor é 40%. Templates podem acelerar time-to-value.",
      },
      {
        id: "bs2-6",
        title: "Feature: App mobile nativo",
        description: "Versão mobile completa do produto.",
        type: "feature",
        effort: "GG",
        stakeholder: "CEO",
        details: "CEO acha essencial, mas pesquisa mostra que 85% do uso é desktop. Mobile web responsivo atende 90% dos casos.",
      },
      {
        id: "bs2-7",
        title: "Research: Entrevistas de churn com 10 clientes que cancelaram",
        description: "Entender os reais motivos de cancelamento além do que o survey mostra.",
        type: "research",
        effort: "P",
        stakeholder: "P.O.",
        details: "Survey de churn indica 'preço' como motivo, mas pesquisas mostram que respostas de survey frequentemente mascaram problemas de produto.",
      },
      {
        id: "bs2-8",
        title: "Feature: Single Sign-On (SSO) via SAML",
        description: "Autenticação enterprise com SSO corporativo.",
        type: "feature",
        effort: "G",
        stakeholder: "Head de Vendas",
        details: "3 deals de R$50k/mês bloqueados por falta de SSO. Requisito de compliance.",
      },
    ],
    incomingItems: [
      [
        {
          id: "bs2-new1",
          title: "Bug: Exportação de relatório gera PDF em branco",
          description: "Clientes enterprise não conseguem exportar relatórios para apresentações.",
          type: "bug",
          effort: "M",
          stakeholder: "CS Manager",
          details: "5 clientes enterprise (R$30k MRR total) escalaram o problema esta semana.",
        },
        {
          id: "bs2-new2",
          title: "Feature: Automação de tarefas recorrentes",
          description: "Criar tarefas automaticamente em intervalos definidos (diário, semanal).",
          type: "feature",
          effort: "G",
          stakeholder: "Head de Produto",
          details: "Feature mais votada no roadmap público. 200+ votos de clientes ativos.",
        },
      ],
      [
        {
          id: "bs2-new3",
          title: "Bug: Busca não encontra tarefas arquivadas",
          description: "Clientes perdem acesso a tarefas antigas quando tentam buscar.",
          type: "bug",
          effort: "P",
          stakeholder: "Suporte",
          details: "30 tickets/semana. Workaround: navegar manualmente por projetos arquivados.",
        },
        {
          id: "bs2-new4",
          title: "Feature: Modo escuro",
          description: "Tema dark para o produto, solicitado por muitos usuários.",
          type: "feature",
          effort: "M",
          stakeholder: "Comunidade",
          details: "120 pedidos no feedback board. Não impacta churn diretamente mas melhora satisfação.",
        },
        {
          id: "bs2-new5",
          title: "Tech Debt: Migrar de REST para GraphQL nas APIs críticas",
          description: "APIs de listagem são lentas por over-fetching de dados.",
          type: "tech-debt",
          effort: "GG",
          stakeholder: "Tech Lead",
          details: "Tempo de carregamento de projetos: 4.2s (meta: <1s). Impacta percepção de qualidade.",
        },
      ],
    ],
    optimalOrder: ["bs2-7", "bs2-2", "bs2-3", "bs2-5"],
    explanation: [
      "🥇 Entrevistas de churn — Esforço mínimo (P), mas essencial para validar se as ações de retenção estão na direção certa.",
      "🥈 Bug de notificações — Causa direta de frustração e desengajamento, impacta retenção imediata.",
      "🥉 Integração Slack — Mencionada em 40% das entrevistas de churn, resolve causa real de abandono.",
      "4️⃣ Templates — Melhora activation rate de 23% para próximo do benchmark, impacta retenção de novos clientes.",
      "❌ SSO é importante para receita mas não impacta churn atual. Dashboard e app mobile são features sem validação direta com o problema de retenção.",
    ],
  },
];
