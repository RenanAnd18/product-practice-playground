export interface MetricDataPoint {
  label: string;
  value: number;
  value2?: number;
}

export interface MetricDecision {
  id: string;
  text: string;
  feedback: string;
  isOptimal: boolean;
}

export interface MetricChallenge {
  id: string;
  title: string;
  metricName: string;
  caseDescription: string;
  chartType: "bar" | "line" | "area" | "stacked";
  data: MetricDataPoint[];
  dataLabel: string;
  dataLabel2?: string;
  unit: string;
  highlight: { label: string; value: string; trend: "up" | "down" | "neutral" };
  decisions: MetricDecision[];
  learningPoints: string[];
}

export const metricsChallenges: MetricChallenge[] = [
  {
    id: "m1",
    title: "Lead Time crescente no e-commerce",
    metricName: "Lead Time",
    caseDescription:
      "Você é PO de um e-commerce e percebeu que o Lead Time (tempo desde a criação do item até a entrega em produção) aumentou 40% nas últimas 4 sprints. O time entrega funcionalidades, mas o tempo total desde a ideia até o deploy está cada vez maior. O gráfico abaixo mostra a evolução do Lead Time médio (em dias) por sprint.",
    chartType: "bar",
    data: [
      { label: "Sprint 1", value: 8 },
      { label: "Sprint 2", value: 10 },
      { label: "Sprint 3", value: 12 },
      { label: "Sprint 4", value: 15 },
      { label: "Sprint 5", value: 18 },
    ],
    dataLabel: "Lead Time (dias)",
    unit: "dias",
    highlight: { label: "Lead Time atual", value: "18 dias", trend: "up" },
    decisions: [
      {
        id: "m1d1",
        text: "Pressionar o time para codar mais rápido e reduzir o tempo de desenvolvimento",
        feedback:
          "Pressionar o time ataca apenas uma parte do Lead Time. O problema pode estar em etapas anteriores (refinamento, aprovação) ou posteriores (code review, QA, deploy). Sem análise, você pode desmotivar o time sem resolver a causa raiz.",
        isOptimal: false,
      },
      {
        id: "m1d2",
        text: "Mapear o fluxo completo (da ideia ao deploy) para identificar gargalos em cada etapa",
        feedback:
          "Excelente! Mapear o fluxo end-to-end permite identificar onde o tempo está sendo gasto desnecessariamente — seja em filas de aprovação, refinamento tardio, code reviews lentos ou deploys manuais. É a abordagem sistêmica correta.",
        isOptimal: true,
      },
      {
        id: "m1d3",
        text: "Reduzir o escopo dos itens do backlog para que sejam entregues mais rápido",
        feedback:
          "Reduzir escopo pode ajudar, mas sem entender onde está o gargalo, você pode criar itens menores que ainda ficam parados em filas. É uma ação parcial que não resolve a causa raiz.",
        isOptimal: false,
      },
      {
        id: "m1d4",
        text: "Aumentar a equipe para ter mais capacidade de desenvolvimento",
        feedback:
          "Adicionar pessoas pode até piorar o Lead Time inicialmente (Lei de Brooks). Se o gargalo está em processos e não em capacidade, mais pessoas não ajudam.",
        isOptimal: false,
      },
      {
        id: "m1d5",
        text: "Ignorar a métrica, pois o time está entregando todas as sprints",
        feedback:
          "Ignorar Lead Time crescente é perigoso. Mesmo entregando, o tempo até o valor chegar ao cliente aumenta, reduzindo a competitividade e a capacidade de reagir ao mercado.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Lead Time mede o tempo total desde a criação do item até a entrega — não apenas o tempo de desenvolvimento",
      "Gargalos podem estar em qualquer etapa: refinamento, aprovação, desenvolvimento, QA ou deploy",
      "Mapear o fluxo de valor (Value Stream Mapping) é a melhor forma de identificar desperdícios",
      "Lead Time alto impacta diretamente o time-to-market e a capacidade de resposta ao mercado",
    ],
  },
  {
    id: "m2",
    title: "Cycle Time inconsistente no app financeiro",
    metricName: "Cycle Time",
    caseDescription:
      "Seu time desenvolve um app financeiro. O Cycle Time (tempo entre o início do trabalho e a conclusão) está muito inconsistente — alguns itens levam 1 dia, outros levam 12. Essa variabilidade dificulta previsibilidade. O gráfico mostra o Cycle Time de cada item entregue nas últimas 2 sprints.",
    chartType: "bar",
    data: [
      { label: "Item A", value: 2 },
      { label: "Item B", value: 8 },
      { label: "Item C", value: 1 },
      { label: "Item D", value: 12 },
      { label: "Item E", value: 3 },
      { label: "Item F", value: 9 },
      { label: "Item G", value: 2 },
      { label: "Item H", value: 11 },
    ],
    dataLabel: "Cycle Time (dias)",
    unit: "dias",
    highlight: { label: "Variação", value: "1-12 dias", trend: "up" },
    decisions: [
      {
        id: "m2d1",
        text: "Definir um limite máximo de Cycle Time e escalar itens que ultrapassem",
        feedback:
          "Definir limites é uma boa prática, mas sem entender por que alguns itens demoram mais, você estará apenas tratando sintomas. É necessário investigar as causas da variação primeiro.",
        isOptimal: false,
      },
      {
        id: "m2d2",
        text: "Analisar os itens com Cycle Time alto para identificar padrões (complexidade, dependências, tamanho)",
        feedback:
          "Perfeito! Investigar padrões nos outliers revela as causas raiz — itens grandes demais, dependências externas, falta de refinamento. Com essa análise, você pode agir preventivamente quebrando itens ou removendo impedimentos.",
        isOptimal: true,
      },
      {
        id: "m2d3",
        text: "Padronizar todos os itens para terem o mesmo tamanho estimado",
        feedback:
          "Padronizar tamanho ajuda na previsibilidade, mas nem todo item pode ser do mesmo tamanho. A abordagem correta é entender e tratar as causas da variação, não forçar uniformidade artificial.",
        isOptimal: false,
      },
      {
        id: "m2d4",
        text: "Atribuir os itens complexos apenas aos desenvolvedores seniores",
        feedback:
          "Isso cria dependência de pessoas específicas e não escala. Além disso, não resolve a causa da complexidade — apenas mascara o problema com mais habilidade individual.",
        isOptimal: false,
      },
      {
        id: "m2d5",
        text: "Aceitar a variação como natural do desenvolvimento de software",
        feedback:
          "Alguma variação é natural, mas uma diferença de 12x (1 dia vs 12 dias) indica problemas sistêmicos. POs devem buscar previsibilidade para planejar releases e comunicar expectativas com confiança.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Cycle Time mede o tempo ativo de trabalho — do 'em progresso' até 'concluído'",
      "Alta variabilidade no Cycle Time reduz previsibilidade e dificulta planejamento",
      "Analisar outliers revela padrões: itens grandes, dependências ou falta de refinamento",
      "Previsibilidade > velocidade: times previsíveis geram mais confiança que times rápidos mas erráticos",
    ],
  },
  {
    id: "m3",
    title: "Throughput em queda no marketplace",
    metricName: "Throughput",
    caseDescription:
      "Você lidera o produto de um marketplace. O Throughput (número de itens entregues por sprint) caiu 50% nas últimas sprints, mesmo com o time mantendo a mesma composição. O backlog tem itens prontos para desenvolvimento. O gráfico mostra a quantidade de itens entregues por sprint.",
    chartType: "bar",
    data: [
      { label: "Sprint 1", value: 12 },
      { label: "Sprint 2", value: 11 },
      { label: "Sprint 3", value: 8 },
      { label: "Sprint 4", value: 7 },
      { label: "Sprint 5", value: 6 },
    ],
    dataLabel: "Itens entregues",
    unit: "itens",
    highlight: { label: "Queda", value: "-50%", trend: "down" },
    decisions: [
      {
        id: "m3d1",
        text: "Adicionar mais itens ao sprint planning para forçar maior entrega",
        feedback:
          "Forçar mais itens sem entender a causa da queda leva a overcommitment, estresse e ainda menor qualidade. O Throughput cairá ainda mais com itens não finalizados acumulando.",
        isOptimal: false,
      },
      {
        id: "m3d2",
        text: "Investigar se houve aumento de débito técnico, retrabalho ou interrupções externas",
        feedback:
          "Excelente! Queda de Throughput com time estável geralmente indica aumento de débito técnico, bugs em produção consumindo tempo, interrupções ou itens maiores/mais complexos. Identificar a causa permite ação correta.",
        isOptimal: true,
      },
      {
        id: "m3d3",
        text: "Trocar membros do time que estejam performando abaixo",
        feedback:
          "Culpar indivíduos sem dados é injusto e contraproducente. A queda de Throughput geralmente é sistêmica (processos, complexidade, débito técnico) e não individual.",
        isOptimal: false,
      },
      {
        id: "m3d4",
        text: "Reduzir os critérios de qualidade para entregar mais rápido",
        feedback:
          "Reduzir qualidade gera mais bugs, mais retrabalho e mais queda de Throughput futuro. É uma espiral descendente que sacrifica o longo prazo pelo curto prazo.",
        isOptimal: false,
      },
      {
        id: "m3d5",
        text: "Cancelar refinamentos para usar o tempo em desenvolvimento",
        feedback:
          "Pular refinamentos leva a itens mal definidos, retrabalho e bloqueios durante o desenvolvimento. É uma falsa economia de tempo que piora o Throughput.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Throughput mede a quantidade de itens entregues por período — é uma métrica de vazão",
      "Queda de Throughput com time estável indica problemas sistêmicos, não individuais",
      "Débito técnico é a causa mais comum de queda gradual de Throughput",
      "Throughput é mais confiável que Velocity para medir capacidade real de entrega",
    ],
  },
  {
    id: "m4",
    title: "Velocity inflada no projeto SaaS",
    metricName: "Velocity",
    caseDescription:
      "Seu time de SaaS B2B reporta Velocity crescente (pontos entregues por sprint), mas os clientes reclamam que poucas funcionalidades de valor chegam. O gráfico mostra a Velocity vs. funcionalidades efetivamente usadas pelos clientes.",
    chartType: "line",
    data: [
      { label: "Sprint 1", value: 30, value2: 5 },
      { label: "Sprint 2", value: 35, value2: 4 },
      { label: "Sprint 3", value: 42, value2: 3 },
      { label: "Sprint 4", value: 48, value2: 3 },
      { label: "Sprint 5", value: 55, value2: 2 },
    ],
    dataLabel: "Story Points",
    dataLabel2: "Features usadas",
    unit: "pts",
    highlight: { label: "Velocity vs Adoção", value: "+83% / -60%", trend: "down" },
    decisions: [
      {
        id: "m4d1",
        text: "Comemorar a Velocity crescente e apresentar ao stakeholder como progresso",
        feedback:
          "Velocity sem valor é uma métrica de vaidade. Apresentar pontos entregues sem impacto real destrói a credibilidade do PO quando stakeholders perceberem a falta de resultados concretos.",
        isOptimal: false,
      },
      {
        id: "m4d2",
        text: "Revisar como os itens são estimados e conectar métricas de entrega a métricas de outcome (uso real)",
        feedback:
          "Perfeito! Conectar output (Velocity) a outcome (adoção) revela se estamos entregando valor real. A Velocity pode estar inflada por re-estimativas ou por entregar itens de baixo impacto. Focar em outcomes muda o jogo.",
        isOptimal: true,
      },
      {
        id: "m4d3",
        text: "Aumentar ainda mais a Velocity adicionando itens técnicos fáceis ao sprint",
        feedback:
          "Isso infla a métrica artificialmente e mascara o problema real: falta de valor entregue ao cliente. Velocity deve ser consequência, não objetivo.",
        isOptimal: false,
      },
      {
        id: "m4d4",
        text: "Parar de medir Velocity, já que não reflete valor",
        feedback:
          "Velocity ainda é útil para previsibilidade de capacidade. O problema não é a métrica em si, mas usá-la como único indicador de sucesso. Ela deve ser complementada com métricas de outcome.",
        isOptimal: false,
      },
      {
        id: "m4d5",
        text: "Pedir para o time reestimar todos os itens com pontos menores",
        feedback:
          "Re-estimar para baixo muda números, não a realidade. O gap entre entrega e valor continuará. A solução está em priorizar itens de maior impacto, não em ajustar estimativas.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Velocity mede output (pontos entregues), não outcome (valor gerado)",
      "Velocity inflada é um anti-pattern comum — pode indicar re-estimativas ou itens de baixo valor",
      "Sempre complemente Velocity com métricas de outcome: adoção, NPS, receita, retenção",
      "Velocity é uma ferramenta de planejamento do time, não uma métrica de performance do produto",
    ],
  },
  {
    id: "m5",
    title: "Burndown irregular na plataforma educacional",
    metricName: "Burndown / Burnup",
    caseDescription:
      "Você gerencia uma plataforma educacional. O Burndown da sprint atual mostra que nos primeiros 5 dias quase nenhum ponto foi queimado, e nos últimos 3 dias houve uma corrida para entregar tudo. Esse padrão se repete há 3 sprints. O gráfico mostra o Burndown ideal vs. real da sprint atual (10 dias, 40 pontos).",
    chartType: "area",
    data: [
      { label: "Dia 1", value: 40, value2: 40 },
      { label: "Dia 2", value: 36, value2: 39 },
      { label: "Dia 3", value: 32, value2: 38 },
      { label: "Dia 4", value: 28, value2: 37 },
      { label: "Dia 5", value: 24, value2: 35 },
      { label: "Dia 6", value: 20, value2: 33 },
      { label: "Dia 7", value: 16, value2: 28 },
      { label: "Dia 8", value: 12, value2: 18 },
      { label: "Dia 9", value: 8, value2: 8 },
      { label: "Dia 10", value: 4, value2: 2 },
    ],
    dataLabel: "Ideal",
    dataLabel2: "Real",
    unit: "pts",
    highlight: { label: "Padrão", value: "Hockey Stick", trend: "down" },
    decisions: [
      {
        id: "m5d1",
        text: "Exigir que o time entregue itens linearmente ao longo da sprint",
        feedback:
          "Exigir linearidade sem entender a causa é microgerenciamento. O padrão hockey stick geralmente indica problemas de refinamento, dependências ou itens grandes demais — não falta de esforço.",
        isOptimal: false,
      },
      {
        id: "m5d2",
        text: "Investigar se os itens estão bem refinados e se há bloqueios nos primeiros dias da sprint",
        feedback:
          "Excelente! O padrão hockey stick frequentemente indica itens mal refinados (o time gasta dias entendendo o que fazer), dependências que travam o início, ou itens grandes demais que só são 'concluídos' no final. Refinamento contínuo e itens menores resolvem isso.",
        isOptimal: true,
      },
      {
        id: "m5d3",
        text: "Adicionar daily meetings extras para monitorar o progresso diário",
        feedback:
          "Mais cerimônias sem resolver a causa raiz apenas consome mais tempo do time. Dailies extras podem parecer microgerenciamento e não atacam o problema de refinamento ou tamanho dos itens.",
        isOptimal: false,
      },
      {
        id: "m5d4",
        text: "Aceitar o padrão como normal, já que o time entrega no final da sprint",
        feedback:
          "Entregar tudo nos últimos dias aumenta riscos: QA apressado, bugs, itens não finalizados. Mesmo que 'funcione', a qualidade e sustentabilidade sofrem.",
        isOptimal: false,
      },
      {
        id: "m5d5",
        text: "Trocar para sprints mais curtas (1 semana) para forçar entregas mais frequentes",
        feedback:
          "Sprints mais curtas podem ajudar, mas sem resolver o refinamento e tamanho dos itens, o mesmo padrão se repetirá em escala menor. Trate a causa antes de mudar a cadência.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "O padrão 'hockey stick' no Burndown indica problemas de refinamento ou itens muito grandes",
      "Burndown ideal é uma referência, não um objetivo — desvios indicam onde investigar",
      "Itens menores e bem refinados promovem entregas mais uniformes ao longo da sprint",
      "Burnup é uma alternativa útil pois mostra também mudanças de escopo durante a sprint",
    ],
  },
  {
    id: "m6",
    title: "Entregas atrasadas no produto de logística",
    metricName: "Taxa de Entrega no Prazo",
    caseDescription:
      "Você é PO de um sistema de logística. A taxa de entrega no prazo (percentual de itens entregues dentro do prazo comprometido) caiu de 85% para 45% em 5 sprints. Stakeholders estão perdendo confiança na previsibilidade do time. O gráfico mostra a evolução da taxa de entrega no prazo.",
    chartType: "line",
    data: [
      { label: "Sprint 1", value: 85 },
      { label: "Sprint 2", value: 75 },
      { label: "Sprint 3", value: 60 },
      { label: "Sprint 4", value: 52 },
      { label: "Sprint 5", value: 45 },
    ],
    dataLabel: "% no prazo",
    unit: "%",
    highlight: { label: "Taxa atual", value: "45%", trend: "down" },
    decisions: [
      {
        id: "m6d1",
        text: "Parar de dar prazos para evitar compromissos que não serão cumpridos",
        feedback:
          "Evitar prazos destrói a confiança e impede o planejamento de negócios. Stakeholders precisam de previsibilidade. A solução é melhorar a acurácia das estimativas, não eliminá-las.",
        isOptimal: false,
      },
      {
        id: "m6d2",
        text: "Analisar por que os itens atrasam — sobrecarga, escopo creep, estimativas otimistas ou dependências externas",
        feedback:
          "Perfeito! Entender as causas do atraso (escopo mal definido, otimismo nas estimativas, dependências, interrupções) permite agir cirurgicamente. Use dados históricos para calibrar estimativas futuras e comunique com transparência.",
        isOptimal: true,
      },
      {
        id: "m6d3",
        text: "Adicionar buffers de 50% em todas as estimativas para garantir entregas no prazo",
        feedback:
          "Buffers grandes demais inflam prazos e reduzem a credibilidade. É melhor melhorar a acurácia das estimativas com base em dados históricos do que adicionar margem arbitrária.",
        isOptimal: false,
      },
      {
        id: "m6d4",
        text: "Reduzir o comprometimento da sprint para garantir 100% de entrega",
        feedback:
          "Comprometer menos que a capacidade real subutiliza o time e não resolve a causa dos atrasos. É uma solução conservadora que mascara problemas de processo.",
        isOptimal: false,
      },
      {
        id: "m6d5",
        text: "Culpar o time de QA pelos atrasos, já que os itens ficam parados em teste",
        feedback:
          "Culpar uma etapa sem dados é injusto. Mesmo que QA seja um gargalo, a causa pode estar em itens mal especificados, ausência de testes automatizados ou entrega tardia pelo dev.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Taxa de entrega no prazo é crucial para a confiança entre PO, time e stakeholders",
      "Causas comuns de atraso: escopo creep, estimativas otimistas, dependências e interrupções",
      "Use dados históricos (Cycle Time, Throughput) para calibrar estimativas futuras",
      "Transparência sobre riscos de atraso é melhor que surpresas de última hora",
    ],
  },
  {
    id: "m7",
    title: "WIP descontrolado no time de healthtech",
    metricName: "Work in Progress (WIP)",
    caseDescription:
      "Seu time de 5 devs está trabalhando simultaneamente em 14 itens no quadro Kanban. Nenhum item é finalizado há 3 dias. Todos estão 'em progresso', mas nada chega a 'concluído'. O gráfico mostra a evolução do WIP e dos itens concluídos por dia na última semana.",
    chartType: "stacked",
    data: [
      { label: "Seg", value: 8, value2: 3 },
      { label: "Ter", value: 10, value2: 2 },
      { label: "Qua", value: 12, value2: 1 },
      { label: "Qui", value: 13, value2: 0 },
      { label: "Sex", value: 14, value2: 0 },
    ],
    dataLabel: "WIP",
    dataLabel2: "Concluídos",
    unit: "itens",
    highlight: { label: "WIP / Dev", value: "2.8 itens", trend: "up" },
    decisions: [
      {
        id: "m7d1",
        text: "Manter o WIP alto para garantir que todos tenham trabalho e ninguém fique parado",
        feedback:
          "WIP alto cria a ilusão de produtividade. Context switching entre múltiplos itens reduz eficiência em até 40%. O resultado é muitos itens iniciados e nenhum finalizado — exatamente o cenário atual.",
        isOptimal: false,
      },
      {
        id: "m7d2",
        text: "Implementar limites de WIP (ex: máximo 2 itens por dev) e focar em finalizar antes de iniciar",
        feedback:
          "Excelente! Limitar WIP é um dos princípios mais poderosos do Kanban. Com WIP limitado, o time foca em finalizar itens, reduz context switching e aumenta o fluxo de entregas. 'Stop starting, start finishing!'",
        isOptimal: true,
      },
      {
        id: "m7d3",
        text: "Adicionar mais desenvolvedores ao time para dar conta do WIP",
        feedback:
          "Mais devs com WIP alto = mais itens em paralelo = mais context switching. O problema não é falta de pessoas, mas falta de foco. Lei de Little: Lead Time = WIP / Throughput.",
        isOptimal: false,
      },
      {
        id: "m7d4",
        text: "Cancelar os itens menos prioritários do quadro para reduzir o WIP",
        feedback:
          "Remover itens do quadro reduz o WIP momentaneamente, mas sem regras de limite, o WIP voltará a crescer. A solução sustentável são limites explícitos de WIP.",
        isOptimal: false,
      },
      {
        id: "m7d5",
        text: "Pedir para cada dev reportar o progresso de cada item diariamente",
        feedback:
          "Mais reports sem limitar WIP é burocracia sem resultado. O problema não é visibilidade — é excesso de trabalho simultâneo. Foque em reduzir o WIP, não em monitorar mais.",
        isOptimal: false,
      },
    ],
    learningPoints: [
      "Lei de Little: Lead Time = WIP / Throughput — reduzir WIP reduz Lead Time automaticamente",
      "Context switching entre tarefas pode reduzir a eficiência em até 40%",
      "Limites de WIP são a base do fluxo contínuo (Kanban) — 'Stop starting, start finishing'",
      "WIP ideal geralmente é 1-2 itens por desenvolvedor para maximizar foco e fluxo",
    ],
  },
];
