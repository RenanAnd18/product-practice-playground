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
  // ===== LEAD TIME (3 questões) =====
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
      { id: "m1d1", text: "Pressionar o time para codar mais rápido e reduzir o tempo de desenvolvimento", feedback: "Pressionar o time ataca apenas uma parte do Lead Time. O problema pode estar em etapas anteriores (refinamento, aprovação) ou posteriores (code review, QA, deploy). Sem análise, você pode desmotivar o time sem resolver a causa raiz.", isOptimal: false },
      { id: "m1d2", text: "Mapear o fluxo completo (da ideia ao deploy) para identificar gargalos em cada etapa", feedback: "Excelente! Mapear o fluxo end-to-end permite identificar onde o tempo está sendo gasto desnecessariamente — seja em filas de aprovação, refinamento tardio, code reviews lentos ou deploys manuais. É a abordagem sistêmica correta.", isOptimal: true },
      { id: "m1d3", text: "Reduzir o escopo dos itens do backlog para que sejam entregues mais rápido", feedback: "Reduzir escopo pode ajudar, mas sem entender onde está o gargalo, você pode criar itens menores que ainda ficam parados em filas. É uma ação parcial que não resolve a causa raiz.", isOptimal: false },
      { id: "m1d4", text: "Aumentar a equipe para ter mais capacidade de desenvolvimento", feedback: "Adicionar pessoas pode até piorar o Lead Time inicialmente (Lei de Brooks). Se o gargalo está em processos e não em capacidade, mais pessoas não ajudam.", isOptimal: false },
      { id: "m1d5", text: "Ignorar a métrica, pois o time está entregando todas as sprints", feedback: "Ignorar Lead Time crescente é perigoso. Mesmo entregando, o tempo até o valor chegar ao cliente aumenta, reduzindo a competitividade e a capacidade de reagir ao mercado.", isOptimal: false },
    ],
    learningPoints: [
      "Lead Time mede o tempo total desde a criação do item até a entrega — não apenas o tempo de desenvolvimento",
      "Gargalos podem estar em qualquer etapa: refinamento, aprovação, desenvolvimento, QA ou deploy",
      "Mapear o fluxo de valor (Value Stream Mapping) é a melhor forma de identificar desperdícios",
      "Lead Time alto impacta diretamente o time-to-market e a capacidade de resposta ao mercado",
    ],
  },
  {
    id: "m1b",
    title: "Lead Time estável, mas clientes insatisfeitos",
    metricName: "Lead Time",
    caseDescription:
      "Seu time mantém um Lead Time médio de 6 dias há 3 sprints — um número considerado bom. Porém, ao analisar a distribuição, você percebe que 30% dos itens levam mais de 15 dias. Esses itens são justamente os que clientes mais pedem. O gráfico mostra a distribuição do Lead Time dos últimos 30 itens entregues.",
    chartType: "bar",
    data: [
      { label: "0-3 dias", value: 10 },
      { label: "4-6 dias", value: 8 },
      { label: "7-10 dias", value: 5 },
      { label: "11-15 dias", value: 4 },
      { label: "16+ dias", value: 9 },
    ],
    dataLabel: "Qtd de itens",
    unit: "itens",
    highlight: { label: "Itens 16+ dias", value: "30%", trend: "up" },
    decisions: [
      { id: "m1bd1", text: "O Lead Time médio está bom, não precisa agir", feedback: "A média mascara a realidade. Se 30% dos itens — justamente os mais valiosos — demoram mais de 15 dias, a percepção do cliente é de lentidão. Usar apenas a média é perigoso.", isOptimal: false },
      { id: "m1bd2", text: "Usar percentil 85 (P85) em vez de média para ter uma visão mais realista do Lead Time", feedback: "Excelente! O percentil 85 mostra que '85% dos itens são entregues em X dias', dando uma expectativa mais honesta. Além disso, analisar os outliers (16+ dias) revela padrões como dependências, complexidade ou falta de priorização.", isOptimal: true },
      { id: "m1bd3", text: "Priorizar apenas itens pequenos para manter a média baixa", feedback: "Priorizar só itens pequenos melhora a métrica, mas deixa de entregar valor complexo que o cliente precisa. É manipular o indicador em vez de resolver o problema real.", isOptimal: false },
      { id: "m1bd4", text: "Dividir todos os itens grandes em sub-itens menores antes de começar", feedback: "Quebrar itens ajuda, mas sem investigar por que os itens grandes demoram tanto (dependências? aprovações? complexidade técnica?), você pode acabar com muitos sub-itens que ainda travam nas mesmas etapas.", isOptimal: false },
      { id: "m1bd5", text: "Criar uma fila expressa para itens prioritários dos clientes", feedback: "Filas expressas criam um sistema de duas velocidades e podem gerar conflitos de prioridade. A abordagem correta é entender e tratar as causas dos atrasos nos itens complexos.", isOptimal: false },
    ],
    learningPoints: [
      "Média de Lead Time pode mascarar uma distribuição bimodal — sempre analise a distribuição completa",
      "Percentil 85 (P85) é mais confiável que média para comunicar expectativas de prazo",
      "Outliers de Lead Time frequentemente são os itens de maior valor — ignorá-los prejudica o cliente",
      "Analisar a distribuição revela padrões que a média esconde: dependências, gargalos ou tipos de item problemáticos",
    ],
  },
  {
    id: "m1c",
    title: "Lead Time baixo após mudança de processo",
    metricName: "Lead Time",
    caseDescription:
      "Após implementar deploy contínuo e eliminar aprovações manuais, o Lead Time caiu de 14 para 4 dias. Porém, o número de bugs em produção triplicou nas últimas 3 sprints. O gráfico mostra Lead Time vs. Bugs em produção.",
    chartType: "line",
    data: [
      { label: "Sprint 1", value: 14, value2: 2 },
      { label: "Sprint 2", value: 10, value2: 3 },
      { label: "Sprint 3", value: 7, value2: 5 },
      { label: "Sprint 4", value: 5, value2: 7 },
      { label: "Sprint 5", value: 4, value2: 9 },
    ],
    dataLabel: "Lead Time (dias)",
    dataLabel2: "Bugs em produção",
    unit: "dias",
    highlight: { label: "Bugs vs Lead Time", value: "+350% / -71%", trend: "up" },
    decisions: [
      { id: "m1cd1", text: "Voltar ao processo anterior com aprovações manuais para garantir qualidade", feedback: "Reverter todo o progresso é uma reação extrema. O deploy contínuo é uma boa prática — o problema está na falta de automação de testes, não no processo de deploy em si.", isOptimal: false },
      { id: "m1cd2", text: "Manter o deploy contínuo, mas investir em testes automatizados e feature flags para reduzir bugs", feedback: "Perfeito! Lead Time baixo com qualidade requer investimento em automação de testes, feature flags e observabilidade. Assim você mantém a velocidade sem sacrificar a qualidade.", isOptimal: true },
      { id: "m1cd3", text: "Aceitar mais bugs como custo natural da velocidade", feedback: "Bugs em produção geram retrabalho, perda de confiança do cliente e custos de suporte. O trade-off entre velocidade e qualidade pode ser eliminado com as práticas certas.", isOptimal: false },
      { id: "m1cd4", text: "Adicionar uma etapa de QA manual antes de cada deploy", feedback: "QA manual antes de cada deploy aumenta o Lead Time novamente e anula o ganho do deploy contínuo. Testes automatizados são a solução escalável.", isOptimal: false },
      { id: "m1cd5", text: "Reduzir o volume de deploys para diminuir a chance de bugs", feedback: "Deploys menos frequentes com lotes maiores aumentam o risco por deploy. É melhor fazer deploys pequenos e frequentes com boa cobertura de testes.", isOptimal: false },
    ],
    learningPoints: [
      "Otimizar Lead Time sem garantir qualidade é uma falsa economia — bugs geram retrabalho e aumentam o custo total",
      "Deploy contínuo exige investimento proporcional em testes automatizados e observabilidade",
      "Feature flags permitem deploy contínuo com controle de risco — ative funcionalidades gradualmente",
      "As melhores equipes otimizam Lead Time E qualidade simultaneamente, não escolhem um ou outro",
    ],
  },

  // ===== CYCLE TIME (3 questões) =====
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
      { id: "m2d1", text: "Definir um limite máximo de Cycle Time e escalar itens que ultrapassem", feedback: "Definir limites é uma boa prática, mas sem entender por que alguns itens demoram mais, você estará apenas tratando sintomas. É necessário investigar as causas da variação primeiro.", isOptimal: false },
      { id: "m2d2", text: "Analisar os itens com Cycle Time alto para identificar padrões (complexidade, dependências, tamanho)", feedback: "Perfeito! Investigar padrões nos outliers revela as causas raiz — itens grandes demais, dependências externas, falta de refinamento. Com essa análise, você pode agir preventivamente quebrando itens ou removendo impedimentos.", isOptimal: true },
      { id: "m2d3", text: "Padronizar todos os itens para terem o mesmo tamanho estimado", feedback: "Padronizar tamanho ajuda na previsibilidade, mas nem todo item pode ser do mesmo tamanho. A abordagem correta é entender e tratar as causas da variação, não forçar uniformidade artificial.", isOptimal: false },
      { id: "m2d4", text: "Atribuir os itens complexos apenas aos desenvolvedores seniores", feedback: "Isso cria dependência de pessoas específicas e não escala. Além disso, não resolve a causa da complexidade — apenas mascara o problema com mais habilidade individual.", isOptimal: false },
      { id: "m2d5", text: "Aceitar a variação como natural do desenvolvimento de software", feedback: "Alguma variação é natural, mas uma diferença de 12x (1 dia vs 12 dias) indica problemas sistêmicos. POs devem buscar previsibilidade para planejar releases e comunicar expectativas com confiança.", isOptimal: false },
    ],
    learningPoints: [
      "Cycle Time mede o tempo ativo de trabalho — do 'em progresso' até 'concluído'",
      "Alta variabilidade no Cycle Time reduz previsibilidade e dificulta planejamento",
      "Analisar outliers revela padrões: itens grandes, dependências ou falta de refinamento",
      "Previsibilidade > velocidade: times previsíveis geram mais confiança que times rápidos mas erráticos",
    ],
  },
  {
    id: "m2b",
    title: "Cycle Time alto apenas em bugs",
    metricName: "Cycle Time",
    caseDescription:
      "Ao segmentar o Cycle Time por tipo de item, você descobre que features têm Cycle Time médio de 3 dias, mas bugs levam em média 8 dias. Isso porque bugs frequentemente envolvem investigação, reprodução e testes de regressão. O gráfico compara o Cycle Time médio por tipo de item.",
    chartType: "bar",
    data: [
      { label: "Feature", value: 3 },
      { label: "Bug crítico", value: 10 },
      { label: "Bug normal", value: 7 },
      { label: "Melhoria", value: 4 },
      { label: "Dívida técnica", value: 5 },
    ],
    dataLabel: "Cycle Time médio (dias)",
    unit: "dias",
    highlight: { label: "Bug vs Feature", value: "2.7x mais lento", trend: "up" },
    decisions: [
      { id: "m2bd1", text: "Tratar todos os bugs como prioridade máxima para resolver rápido", feedback: "Priorizar todos os bugs igualmente interrompe o fluxo de features e cria um ciclo reativo. Nem todo bug precisa ser corrigido imediatamente — priorize pelo impacto no cliente.", isOptimal: false },
      { id: "m2bd2", text: "Investigar as causas raiz dos bugs recorrentes e investir em prevenção (testes, code review, pair programming)", feedback: "Excelente! Reduzir a quantidade de bugs na origem é mais eficiente que corrigir rápido. Investir em qualidade upstream (testes, code review, pair programming) reduz o volume de bugs e, consequentemente, o Cycle Time geral.", isOptimal: true },
      { id: "m2bd3", text: "Criar um time separado só para bugs para não impactar o Cycle Time de features", feedback: "Um time de bugs separado trata o sintoma, não a causa. Os desenvolvedores que criaram o código devem corrigir os bugs — isso gera aprendizado e incentiva qualidade.", isOptimal: false },
      { id: "m2bd4", text: "Reduzir o nível de testes para acelerar a correção de bugs", feedback: "Menos testes significa mais bugs escapando para produção, criando um ciclo vicioso. A solução é investir em testes automatizados, não reduzir a cobertura.", isOptimal: false },
      { id: "m2bd5", text: "Ignorar bugs não-críticos e focar apenas em features", feedback: "Ignorar bugs degrada a experiência do cliente e acumula dívida técnica. Bugs não-críticos se tornam críticos quando afetam a confiança do usuário.", isOptimal: false },
    ],
    learningPoints: [
      "Segmentar Cycle Time por tipo de item revela gargalos ocultos na média geral",
      "Bugs com Cycle Time alto indicam problemas de qualidade upstream — trate a causa, não o sintoma",
      "Investir em prevenção (testes, code review) é mais eficiente que otimizar correção de bugs",
      "Um time saudável tem proporção baixa de bugs vs features — monitore essa razão",
    ],
  },
  {
    id: "m2c",
    title: "Cycle Time melhorou, mas satisfação do time caiu",
    metricName: "Cycle Time",
    caseDescription:
      "Após implementar pair programming obrigatório e limites de WIP, o Cycle Time caiu de 7 para 3 dias. Porém, uma pesquisa interna mostra que a satisfação do time caiu de 8.5 para 6.0. Devs reclamam de falta de autonomia e excesso de reuniões. O gráfico mostra a evolução.",
    chartType: "line",
    data: [
      { label: "Mês 1", value: 7, value2: 8.5 },
      { label: "Mês 2", value: 6, value2: 7.8 },
      { label: "Mês 3", value: 5, value2: 7.0 },
      { label: "Mês 4", value: 4, value2: 6.5 },
      { label: "Mês 5", value: 3, value2: 6.0 },
    ],
    dataLabel: "Cycle Time (dias)",
    dataLabel2: "Satisfação (0-10)",
    unit: "dias",
    highlight: { label: "Cycle Time vs Satisfação", value: "-57% / -29%", trend: "down" },
    decisions: [
      { id: "m2cd1", text: "Manter as mudanças — o Cycle Time melhorou e isso é o que importa", feedback: "Ignorar a satisfação do time é perigoso. Times insatisfeitos eventualmente perdem talentos, e a rotatividade destrói métricas de longo prazo. Sustentabilidade importa.", isOptimal: false },
      { id: "m2cd2", text: "Flexibilizar as práticas: manter pair programming opcional e ajustar WIP limits com input do time", feedback: "Perfeito! Práticas impostas sem buy-in do time geram resistência. Envolver o time na definição de como trabalhar (WIP limits, pair programming) mantém os ganhos enquanto preserva autonomia e motivação.", isOptimal: true },
      { id: "m2cd3", text: "Reverter todas as mudanças e voltar ao processo anterior", feedback: "Reverter tudo desperdiça os ganhos reais de Cycle Time. A solução é ajustar, não abandonar. Encontre o equilíbrio entre processo e autonomia.", isOptimal: false },
      { id: "m2cd4", text: "Oferecer aumento de salário para compensar a insatisfação", feedback: "Compensação financeira não resolve problemas de autonomia e processo. O time quer ter voz em como trabalha — é uma questão de motivação intrínseca, não extrínseca.", isOptimal: false },
      { id: "m2cd5", text: "Substituir os devs que estão insatisfeitos por novos que aceitem o processo", feedback: "Trocar pessoas para manter um processo é uma inversão de prioridades. Processos existem para servir as pessoas, não o contrário. Rotatividade alta destrói conhecimento e produtividade.", isOptimal: false },
    ],
    learningPoints: [
      "Métricas de entrega devem ser equilibradas com métricas de saúde do time (satisfação, turnover)",
      "Práticas impostas sem participação do time geram resistência, mesmo quando melhoram métricas",
      "Autonomia é um dos maiores motivadores de times de desenvolvimento — preserve-a",
      "O melhor processo é aquele que o time ajudou a construir e se compromete a seguir",
    ],
  },

  // ===== THROUGHPUT (3 questões) =====
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
      { id: "m3d1", text: "Adicionar mais itens ao sprint planning para forçar maior entrega", feedback: "Forçar mais itens sem entender a causa da queda leva a overcommitment, estresse e ainda menor qualidade. O Throughput cairá ainda mais com itens não finalizados acumulando.", isOptimal: false },
      { id: "m3d2", text: "Investigar se houve aumento de débito técnico, retrabalho ou interrupções externas", feedback: "Excelente! Queda de Throughput com time estável geralmente indica aumento de débito técnico, bugs em produção consumindo tempo, interrupções ou itens maiores/mais complexos. Identificar a causa permite ação correta.", isOptimal: true },
      { id: "m3d3", text: "Trocar membros do time que estejam performando abaixo", feedback: "Culpar indivíduos sem dados é injusto e contraproducente. A queda de Throughput geralmente é sistêmica (processos, complexidade, débito técnico) e não individual.", isOptimal: false },
      { id: "m3d4", text: "Reduzir os critérios de qualidade para entregar mais rápido", feedback: "Reduzir qualidade gera mais bugs, mais retrabalho e mais queda de Throughput futuro. É uma espiral descendente que sacrifica o longo prazo pelo curto prazo.", isOptimal: false },
      { id: "m3d5", text: "Cancelar refinamentos para usar o tempo em desenvolvimento", feedback: "Pular refinamentos leva a itens mal definidos, retrabalho e bloqueios durante o desenvolvimento. É uma falsa economia de tempo que piora o Throughput.", isOptimal: false },
    ],
    learningPoints: [
      "Throughput mede a quantidade de itens entregues por período — é uma métrica de vazão",
      "Queda de Throughput com time estável indica problemas sistêmicos, não individuais",
      "Débito técnico é a causa mais comum de queda gradual de Throughput",
      "Throughput é mais confiável que Velocity para medir capacidade real de entrega",
    ],
  },
  {
    id: "m3b",
    title: "Throughput alto, mas itens errados entregues",
    metricName: "Throughput",
    caseDescription:
      "Seu time entrega consistentemente 10+ itens por sprint, mas na retrospectiva descobriu-se que 40% dos itens entregues nas últimas 3 sprints foram descartados ou refeitos porque não atendiam às necessidades do cliente. O gráfico mostra itens entregues vs. itens aproveitados.",
    chartType: "stacked",
    data: [
      { label: "Sprint 1", value: 6, value2: 5 },
      { label: "Sprint 2", value: 5, value2: 6 },
      { label: "Sprint 3", value: 4, value2: 7 },
      { label: "Sprint 4", value: 4, value2: 8 },
      { label: "Sprint 5", value: 3, value2: 9 },
    ],
    dataLabel: "Aproveitados",
    dataLabel2: "Descartados/Refeitos",
    unit: "itens",
    highlight: { label: "Itens desperdiçados", value: "40%", trend: "up" },
    decisions: [
      { id: "m3bd1", text: "Aumentar o Throughput para compensar os itens desperdiçados", feedback: "Entregar mais do errado é desperdício multiplicado. O problema não é volume, mas direção. Mais Throughput com baixo aproveitamento só aumenta o custo.", isOptimal: false },
      { id: "m3bd2", text: "Melhorar o processo de descoberta e validação antes do desenvolvimento (discovery + refinamento com usuários)", feedback: "Perfeito! Investir em discovery (entrevistas, protótipos, validação) antes de construir reduz desperdício. O Throughput efetivo (itens que geram valor) é mais importante que o Throughput bruto.", isOptimal: true },
      { id: "m3bd3", text: "Culpar o time de design por especificações imprecisas", feedback: "Culpar uma área é simplista. O problema é sistêmico — falta de validação com clientes, requisitos vagos, ou falta de envolvimento do PO no refinamento.", isOptimal: false },
      { id: "m3bd4", text: "Adicionar mais etapas de aprovação antes do desenvolvimento", feedback: "Mais aprovações burocráticas aumentam o Lead Time sem garantir que o item é o certo. A validação deve ser com o cliente/usuário, não com camadas de gestão.", isOptimal: false },
      { id: "m3bd5", text: "Considerar o Throughput total como métrica de sucesso, já que o time está entregando", feedback: "Throughput sem valor é métrica de vaidade. Se 40% é descartado, o Throughput efetivo é 60% do reportado. Medir apenas volume ignora o impacto real.", isOptimal: false },
    ],
    learningPoints: [
      "Throughput efetivo (itens que geram valor) é mais importante que Throughput bruto (total entregue)",
      "Desperdício alto indica problemas de discovery — invista em validação antes de construir",
      "Protótipos e MVPs reduzem o risco de construir a coisa errada",
      "Medir taxa de retrabalho/descarte é essencial para avaliar a qualidade das decisões de produto",
    ],
  },
  {
    id: "m3c",
    title: "Throughput estável, mas stakeholders insatisfeitos",
    metricName: "Throughput",
    caseDescription:
      "O time entrega 8 itens por sprint de forma consistente. Porém, stakeholders de 3 áreas diferentes reclamam que 'nada do que pedem é entregue'. Ao analisar, você descobre que 70% do Throughput vai para uma única área de negócio. O gráfico mostra a distribuição por área.",
    chartType: "stacked",
    data: [
      { label: "Sprint 1", value: 6, value2: 2 },
      { label: "Sprint 2", value: 5, value2: 3 },
      { label: "Sprint 3", value: 6, value2: 2 },
      { label: "Sprint 4", value: 5, value2: 3 },
      { label: "Sprint 5", value: 6, value2: 2 },
    ],
    dataLabel: "Área principal",
    dataLabel2: "Outras áreas",
    unit: "itens",
    highlight: { label: "Concentração", value: "70% uma área", trend: "neutral" },
    decisions: [
      { id: "m3cd1", text: "Informar aos stakeholders que o time tem capacidade limitada e que precisam esperar", feedback: "Dizer 'esperem' sem transparência sobre critérios de priorização gera frustração e política. Stakeholders precisam entender como e por que as decisões são tomadas.", isOptimal: false },
      { id: "m3cd2", text: "Criar um modelo transparente de alocação de capacidade entre áreas e revisar prioridades com todos os stakeholders", feedback: "Perfeito! Transparência na alocação de capacidade (ex: 40% área A, 30% área B, 30% área C) com revisão periódica cria previsibilidade e reduz conflitos. Stakeholders aceitam melhor quando entendem os trade-offs.", isOptimal: true },
      { id: "m3cd3", text: "Dividir o time em squads menores, uma para cada área de negócio", feedback: "Dividir o time pode funcionar a longo prazo, mas no curto prazo reduz a capacidade de cada squad e aumenta overhead de coordenação. Primeiro, resolva a alocação de forma transparente.", isOptimal: false },
      { id: "m3cd4", text: "Atender as reclamações e mudar a priorização para as áreas insatisfeitas", feedback: "Reagir a quem reclama mais cria um incentivo perverso — ganha quem pressiona mais. A priorização deve ser baseada em impacto e estratégia, não em volume de reclamações.", isOptimal: false },
      { id: "m3cd5", text: "Pedir para as áreas resolverem entre si quem tem prioridade", feedback: "Delegar priorização para stakeholders gera conflito e política. O PO existe justamente para fazer essa arbitragem com base em dados e estratégia.", isOptimal: false },
    ],
    learningPoints: [
      "Throughput por área/stakeholder revela desequilíbrios ocultos no Throughput total",
      "Transparência na alocação de capacidade reduz conflitos e melhora relações com stakeholders",
      "O PO deve ser o guardião da priorização estratégica — não delegue a decisão para quem pede mais",
      "Modelos de alocação (ex: 60/20/20) criam previsibilidade para todas as áreas",
    ],
  },

  // ===== VELOCITY (3 questões) =====
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
      { id: "m4d1", text: "Comemorar a Velocity crescente e apresentar ao stakeholder como progresso", feedback: "Velocity sem valor é uma métrica de vaidade. Apresentar pontos entregues sem impacto real destrói a credibilidade do PO quando stakeholders perceberem a falta de resultados concretos.", isOptimal: false },
      { id: "m4d2", text: "Revisar como os itens são estimados e conectar métricas de entrega a métricas de outcome (uso real)", feedback: "Perfeito! Conectar output (Velocity) a outcome (adoção) revela se estamos entregando valor real. A Velocity pode estar inflada por re-estimativas ou por entregar itens de baixo impacto. Focar em outcomes muda o jogo.", isOptimal: true },
      { id: "m4d3", text: "Aumentar ainda mais a Velocity adicionando itens técnicos fáceis ao sprint", feedback: "Isso infla a métrica artificialmente e mascara o problema real: falta de valor entregue ao cliente. Velocity deve ser consequência, não objetivo.", isOptimal: false },
      { id: "m4d4", text: "Parar de medir Velocity, já que não reflete valor", feedback: "Velocity ainda é útil para previsibilidade de capacidade. O problema não é a métrica em si, mas usá-la como único indicador de sucesso. Ela deve ser complementada com métricas de outcome.", isOptimal: false },
      { id: "m4d5", text: "Pedir para o time reestimar todos os itens com pontos menores", feedback: "Re-estimar para baixo muda números, não a realidade. O gap entre entrega e valor continuará. A solução está em priorizar itens de maior impacto, não em ajustar estimativas.", isOptimal: false },
    ],
    learningPoints: [
      "Velocity mede output (pontos entregues), não outcome (valor gerado)",
      "Velocity inflada é um anti-pattern comum — pode indicar re-estimativas ou itens de baixo valor",
      "Sempre complemente Velocity com métricas de outcome: adoção, NPS, receita, retenção",
      "Velocity é uma ferramenta de planejamento do time, não uma métrica de performance do produto",
    ],
  },
  {
    id: "m4b",
    title: "Velocity oscilante entre sprints",
    metricName: "Velocity",
    caseDescription:
      "A Velocity do seu time oscila drasticamente: 45 pontos em uma sprint, 20 na seguinte, 50, depois 15. Isso torna impossível prever quando features serão entregues. Stakeholders estão frustrados com datas que nunca se confirmam. O gráfico mostra a oscilação.",
    chartType: "bar",
    data: [
      { label: "Sprint 1", value: 45 },
      { label: "Sprint 2", value: 20 },
      { label: "Sprint 3", value: 50 },
      { label: "Sprint 4", value: 15 },
      { label: "Sprint 5", value: 48 },
      { label: "Sprint 6", value: 18 },
    ],
    dataLabel: "Story Points",
    unit: "pts",
    highlight: { label: "Variação", value: "15-50 pts", trend: "up" },
    decisions: [
      { id: "m4bd1", text: "Usar a média das últimas sprints para prever a próxima", feedback: "A média (32.7 pts) não reflete nenhuma sprint real. Com oscilação tão grande, usar média é enganoso. Primeiro, entenda por que a Velocity oscila tanto.", isOptimal: false },
      { id: "m4bd2", text: "Investigar o que difere entre sprints de alta e baixa Velocity (interrupções, férias, itens carregados, dependências)", feedback: "Excelente! Comparar sprints boas e ruins revela padrões: sprints ruins podem ter férias, interrupções de suporte, itens que transbordam, ou dependências externas. Entender o padrão permite ação preventiva.", isOptimal: true },
      { id: "m4bd3", text: "Fixar a Velocity em 30 pontos e comprometer exatamente isso toda sprint", feedback: "Fixar artificialmente ignora a realidade. Se as causas da oscilação não forem tratadas, o time vai overcommit em sprints ruins e undercommit nas boas.", isOptimal: false },
      { id: "m4bd4", text: "Parar de estimar em pontos e mudar para contagem de itens (Throughput)", feedback: "Throughput pode ser mais estável, mas trocar a métrica não resolve a causa da oscilação. Se o time varia em pontos, provavelmente varia em itens também.", isOptimal: false },
      { id: "m4bd5", text: "Adicionar buffer de sprint para absorver as variações", feedback: "Buffer ajuda na comunicação de prazos, mas não resolve a causa raiz. É melhor reduzir a variação tratando interrupções e dependências do que aceitar e compensar.", isOptimal: false },
    ],
    learningPoints: [
      "Velocity oscilante indica instabilidade no processo — interrupções, dependências ou composição variável do time",
      "Compare sprints de alta e baixa performance para identificar fatores externos que impactam a entrega",
      "Previsibilidade requer estabilidade: proteja o time de interrupções e gerencie dependências proativamente",
      "Use range (ex: 20-45 pts) em vez de ponto fixo quando a Velocity é instável",
    ],
  },
  {
    id: "m4c",
    title: "Velocity usada como meta de performance",
    metricName: "Velocity",
    caseDescription:
      "A gestão decidiu usar Velocity como KPI individual dos desenvolvedores: quem entregar mais pontos recebe bônus. Nas últimas 4 sprints, a Velocity 'dobrou', mas a qualidade caiu drasticamente. O gráfico mostra Velocity vs. Taxa de defeitos.",
    chartType: "line",
    data: [
      { label: "Sprint 1", value: 30, value2: 5 },
      { label: "Sprint 2", value: 40, value2: 12 },
      { label: "Sprint 3", value: 52, value2: 20 },
      { label: "Sprint 4", value: 60, value2: 28 },
    ],
    dataLabel: "Velocity (pts)",
    dataLabel2: "Defeitos encontrados",
    unit: "pts",
    highlight: { label: "Velocity vs Defeitos", value: "+100% / +460%", trend: "up" },
    decisions: [
      { id: "m4cd1", text: "Manter o incentivo, mas adicionar uma penalidade por defeitos", feedback: "Adicionar penalidades cria um ambiente de medo e competição nociva. O problema é usar Velocity como meta individual — isso gamifica a métrica e destrói colaboração.", isOptimal: false },
      { id: "m4cd2", text: "Eliminar Velocity como KPI individual e usá-la apenas como ferramenta de planejamento do time", feedback: "Perfeito! Velocity é uma métrica do time para planejamento, não para avaliação individual. Quando usada como meta, ela é gamificada (Lei de Goodhart: 'quando uma medida se torna meta, deixa de ser uma boa medida'). Avalie indivíduos por colaboração, qualidade e impacto.", isOptimal: true },
      { id: "m4cd3", text: "Ajustar as estimativas para serem mais rigorosas e evitar inflação", feedback: "Mais rigor nas estimativas não resolve o incentivo perverso. Enquanto houver bônus por pontos, o time encontrará formas de inflar — é comportamento racional dado o incentivo.", isOptimal: false },
      { id: "m4cd4", text: "Substituir Velocity por linhas de código como métrica de performance", feedback: "Linhas de código é uma métrica ainda pior que Velocity para performance individual. Mais código não significa mais valor — frequentemente significa menos eficiência.", isOptimal: false },
      { id: "m4cd5", text: "Manter o incentivo, mas medir Velocity apenas de itens sem defeitos", feedback: "Isso melhora um pouco, mas ainda incentiva volume sobre valor. O problema fundamental é vincular compensação a métricas de output — isso sempre distorce o comportamento.", isOptimal: false },
    ],
    learningPoints: [
      "Lei de Goodhart: 'Quando uma medida se torna meta, deixa de ser uma boa medida'",
      "Velocity é uma métrica do time para planejamento — nunca deve ser KPI individual",
      "Incentivos baseados em output (pontos, linhas) destroem qualidade e colaboração",
      "Avalie indivíduos por impacto, colaboração e crescimento — não por volume de entrega",
    ],
  },

  // ===== BURNDOWN / BURNUP (3 questões) =====
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
      { id: "m5d1", text: "Exigir que o time entregue itens linearmente ao longo da sprint", feedback: "Exigir linearidade sem entender a causa é microgerenciamento. O padrão hockey stick geralmente indica problemas de refinamento, dependências ou itens grandes demais — não falta de esforço.", isOptimal: false },
      { id: "m5d2", text: "Investigar se os itens estão bem refinados e se há bloqueios nos primeiros dias da sprint", feedback: "Excelente! O padrão hockey stick frequentemente indica itens mal refinados (o time gasta dias entendendo o que fazer), dependências que travam o início, ou itens grandes demais que só são 'concluídos' no final. Refinamento contínuo e itens menores resolvem isso.", isOptimal: true },
      { id: "m5d3", text: "Adicionar daily meetings extras para monitorar o progresso diário", feedback: "Mais cerimônias sem resolver a causa raiz apenas consome mais tempo do time. Dailies extras podem parecer microgerenciamento e não atacam o problema de refinamento ou tamanho dos itens.", isOptimal: false },
      { id: "m5d4", text: "Aceitar o padrão como normal, já que o time entrega no final da sprint", feedback: "Entregar tudo nos últimos dias aumenta riscos: QA apressado, bugs, itens não finalizados. Mesmo que 'funcione', a qualidade e sustentabilidade sofrem.", isOptimal: false },
      { id: "m5d5", text: "Trocar para sprints mais curtas (1 semana) para forçar entregas mais frequentes", feedback: "Sprints mais curtas podem ajudar, mas sem resolver o refinamento e tamanho dos itens, o mesmo padrão se repetirá em escala menor. Trate a causa antes de mudar a cadência.", isOptimal: false },
    ],
    learningPoints: [
      "O padrão 'hockey stick' no Burndown indica problemas de refinamento ou itens muito grandes",
      "Burndown ideal é uma referência, não um objetivo — desvios indicam onde investigar",
      "Itens menores e bem refinados promovem entregas mais uniformes ao longo da sprint",
      "Burnup é uma alternativa útil pois mostra também mudanças de escopo durante a sprint",
    ],
  },
  {
    id: "m5b",
    title: "Burnup revela escopo crescente na sprint",
    metricName: "Burndown / Burnup",
    caseDescription:
      "O Burnup da sprint mostra que o time está entregando de forma constante (linha de trabalho concluído sobe), mas a linha de escopo total também sobe — itens estão sendo adicionados no meio da sprint. O time planeja 30 pontos, mas ao final da sprint o escopo está em 45. O gráfico mostra a evolução.",
    chartType: "line",
    data: [
      { label: "Dia 1", value: 0, value2: 30 },
      { label: "Dia 2", value: 4, value2: 32 },
      { label: "Dia 3", value: 8, value2: 34 },
      { label: "Dia 4", value: 11, value2: 36 },
      { label: "Dia 5", value: 15, value2: 38 },
      { label: "Dia 6", value: 18, value2: 40 },
      { label: "Dia 7", value: 21, value2: 42 },
      { label: "Dia 8", value: 24, value2: 43 },
      { label: "Dia 9", value: 27, value2: 44 },
      { label: "Dia 10", value: 30, value2: 45 },
    ],
    dataLabel: "Concluído",
    dataLabel2: "Escopo total",
    unit: "pts",
    highlight: { label: "Escopo adicionado", value: "+50%", trend: "up" },
    decisions: [
      { id: "m5bd1", text: "Aceitar os itens adicionados porque são pedidos urgentes dos stakeholders", feedback: "Aceitar tudo sem questionar destrói a previsibilidade e sobrecarrega o time. Se tudo é urgente, nada é urgente. O PO deve proteger o sprint goal.", isOptimal: false },
      { id: "m5bd2", text: "Estabelecer uma política clara de sprint: novos itens entram apenas se algo sai, e comunicar aos stakeholders", feedback: "Excelente! Proteger o escopo da sprint é responsabilidade do PO. Uma política de 'entra um, sai um' mantém a previsibilidade. Itens urgentes de verdade podem entrar, mas com trade-off explícito e visível.", isOptimal: true },
      { id: "m5bd3", text: "Aumentar a capacidade planejada para absorver itens extras", feedback: "Planejar com folga para absorver scope creep normaliza o problema. A solução é reduzir o scope creep, não se adaptar a ele.", isOptimal: false },
      { id: "m5bd4", text: "Esconder o Burnup dos stakeholders para evitar que vejam 'espaço' para adicionar itens", feedback: "Esconder dados é antiético e contraproducente. Transparência é a base da confiança. Use o Burnup justamente para mostrar o impacto do scope creep.", isOptimal: false },
      { id: "m5bd5", text: "Mover para Kanban puro sem sprints fixas para acomodar mudanças constantes", feedback: "Kanban pode ajudar com fluxo contínuo, mas sem disciplina de priorização, o mesmo problema de scope creep continuará. O problema é gestão de escopo, não a cadência.", isOptimal: false },
    ],
    learningPoints: [
      "Burnup é superior ao Burndown para visualizar scope creep — mostra escopo e progresso separadamente",
      "Scope creep é uma das maiores ameaças à previsibilidade — o PO deve proteger o sprint goal",
      "Política de 'entra um, sai um' mantém a integridade da sprint sem bloquear urgências reais",
      "Use o Burnup como ferramenta de comunicação com stakeholders sobre impacto de mudanças de escopo",
    ],
  },
  {
    id: "m5c",
    title: "Burndown mostra time subutilizado",
    metricName: "Burndown / Burnup",
    caseDescription:
      "O Burndown da sprint mostra que o time completou todo o trabalho planejado (30 pontos) no dia 7 de uma sprint de 10 dias. Os últimos 3 dias foram gastos em 'melhorias gerais' sem direção clara. Isso acontece há 2 sprints seguidas. O gráfico mostra o progresso.",
    chartType: "area",
    data: [
      { label: "Dia 1", value: 30, value2: 30 },
      { label: "Dia 2", value: 27, value2: 26 },
      { label: "Dia 3", value: 24, value2: 22 },
      { label: "Dia 4", value: 21, value2: 17 },
      { label: "Dia 5", value: 18, value2: 12 },
      { label: "Dia 6", value: 15, value2: 7 },
      { label: "Dia 7", value: 12, value2: 0 },
      { label: "Dia 8", value: 9, value2: 0 },
      { label: "Dia 9", value: 6, value2: 0 },
      { label: "Dia 10", value: 3, value2: 0 },
    ],
    dataLabel: "Ideal",
    dataLabel2: "Real",
    unit: "pts",
    highlight: { label: "Conclusão", value: "Dia 7 de 10", trend: "down" },
    decisions: [
      { id: "m5cd1", text: "Adicionar mais pontos no próximo sprint planning para preencher os 10 dias", feedback: "Aumentar o compromisso baseado em sprints fáceis pode levar a overcommitment quando a complexidade aumentar. Calibre gradualmente com base em múltiplas sprints.", isOptimal: false },
      { id: "m5cd2", text: "Manter a capacidade e usar o tempo extra para discovery, redução de dívida técnica e experimentação", feedback: "Perfeito! Tempo 'extra' é valioso para atividades que não cabem no sprint normal: discovery de próximos itens, redução de dívida técnica, spikes de investigação, pair programming. Times saudáveis usam folga para melhorar continuamente.", isOptimal: true },
      { id: "m5cd3", text: "Reduzir o tamanho da sprint para 7 dias já que o time termina antes", feedback: "Encurtar a sprint elimina a folga, que é valiosa para melhoria contínua. O problema não é 'sobra de tempo', é como usar esse tempo estrategicamente.", isOptimal: false },
      { id: "m5cd4", text: "Reportar ao management que o time está ocioso e precisa de mais trabalho", feedback: "Reportar como 'ociosidade' é perigoso e desinforma. Folga (slack) é necessária para sustentabilidade. Times que operam a 100% de capacidade não têm espaço para lidar com imprevistos ou melhorar.", isOptimal: false },
      { id: "m5cd5", text: "Começar itens da próxima sprint antecipadamente", feedback: "Puxar itens futuros pode parecer produtivo, mas sem refinamento adequado pode gerar retrabalho. Melhor investir em preparação (refinamento, discovery) do que começar sem estar pronto.", isOptimal: false },
    ],
    learningPoints: [
      "Folga (slack) é necessária para sustentabilidade — times a 100% de capacidade são frágeis",
      "Tempo extra pode ser investido em discovery, dívida técnica, experimentação e aprendizado",
      "Calibre a capacidade gradualmente — não reaja a uma ou duas sprints",
      "Burndown que termina muito antes do fim da sprint indica oportunidade, não problema",
    ],
  },

  // ===== TAXA DE ENTREGA NO PRAZO (3 questões) =====
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
      { id: "m6d1", text: "Parar de dar prazos para evitar compromissos que não serão cumpridos", feedback: "Evitar prazos destrói a confiança e impede o planejamento de negócios. Stakeholders precisam de previsibilidade. A solução é melhorar a acurácia das estimativas, não eliminá-las.", isOptimal: false },
      { id: "m6d2", text: "Analisar por que os itens atrasam — sobrecarga, escopo creep, estimativas otimistas ou dependências externas", feedback: "Perfeito! Entender as causas do atraso (escopo mal definido, otimismo nas estimativas, dependências, interrupções) permite agir cirurgicamente. Use dados históricos para calibrar estimativas futuras e comunique com transparência.", isOptimal: true },
      { id: "m6d3", text: "Adicionar buffers de 50% em todas as estimativas para garantir entregas no prazo", feedback: "Buffers grandes demais inflam prazos e reduzem a credibilidade. É melhor melhorar a acurácia das estimativas com base em dados históricos do que adicionar margem arbitrária.", isOptimal: false },
      { id: "m6d4", text: "Reduzir o comprometimento da sprint para garantir 100% de entrega", feedback: "Comprometer menos que a capacidade real subutiliza o time e não resolve a causa dos atrasos. É uma solução conservadora que mascara problemas de processo.", isOptimal: false },
      { id: "m6d5", text: "Culpar o time de QA pelos atrasos, já que os itens ficam parados em teste", feedback: "Culpar uma etapa sem dados é injusto. Mesmo que QA seja um gargalo, a causa pode estar em itens mal especificados, ausência de testes automatizados ou entrega tardia pelo dev.", isOptimal: false },
    ],
    learningPoints: [
      "Taxa de entrega no prazo é crucial para a confiança entre PO, time e stakeholders",
      "Causas comuns de atraso: escopo creep, estimativas otimistas, dependências e interrupções",
      "Use dados históricos (Cycle Time, Throughput) para calibrar estimativas futuras",
      "Transparência sobre riscos de atraso é melhor que surpresas de última hora",
    ],
  },
  {
    id: "m6b",
    title: "Prazo cumprido, mas qualidade comprometida",
    metricName: "Taxa de Entrega no Prazo",
    caseDescription:
      "Após feedback negativo sobre atrasos, o time passou a entregar 95% dos itens no prazo. Porém, a taxa de bugs pós-entrega subiu de 10% para 35%. O time está cortando corners para cumprir prazos. O gráfico mostra a relação entre entregas no prazo e taxa de defeitos.",
    chartType: "line",
    data: [
      { label: "Sprint 1", value: 60, value2: 10 },
      { label: "Sprint 2", value: 72, value2: 15 },
      { label: "Sprint 3", value: 80, value2: 22 },
      { label: "Sprint 4", value: 90, value2: 28 },
      { label: "Sprint 5", value: 95, value2: 35 },
    ],
    dataLabel: "% no prazo",
    dataLabel2: "% bugs pós-entrega",
    unit: "%",
    highlight: { label: "Prazo vs Qualidade", value: "95% / 35% bugs", trend: "up" },
    decisions: [
      { id: "m6bd1", text: "Manter o foco no prazo — bugs podem ser corrigidos depois", feedback: "Bugs pós-entrega geram retrabalho que consome capacidade futura, reduzindo Throughput e credibilidade. Corrigir bugs custa 10x mais que preveni-los.", isOptimal: false },
      { id: "m6bd2", text: "Incluir 'Definition of Done' rigorosa que inclua qualidade, e ajustar estimativas para refletir o tempo real necessário", feedback: "Perfeito! Uma Definition of Done que inclua testes, code review e documentação evita que qualidade seja sacrificada por prazo. Ajustar estimativas para incluir o tempo de qualidade é honestidade, não pessimismo.", isOptimal: true },
      { id: "m6bd3", text: "Criar um time separado de QA para testar tudo antes da entrega", feedback: "QA separado sem mudar a pressão por prazo apenas empurra o gargalo. Se o time continua cortando corners, o QA encontrará muitos bugs mas não resolverá a causa.", isOptimal: false },
      { id: "m6bd4", text: "Reduzir o escopo de cada item para manter prazo e qualidade", feedback: "Reduzir escopo pode ajudar, mas sem uma Definition of Done clara, itens menores também podem ter qualidade ruim. O problema é o trade-off entre prazo e qualidade, não o tamanho.", isOptimal: false },
      { id: "m6bd5", text: "Esconder a taxa de bugs dos stakeholders para não gerar preocupação", feedback: "Esconder dados é desonesto e insustentável. Quando os stakeholders descobrirem (e vão), a confiança será destruída. Transparência é a base de relações profissionais saudáveis.", isOptimal: false },
    ],
    learningPoints: [
      "Taxa de entrega no prazo sem qualidade é uma métrica enganosa — sempre analise junto com taxa de defeitos",
      "Definition of Done é o contrato de qualidade do time — sem ela, 'entregue' é subjetivo",
      "Pressão por prazo sem ajuste de escopo ou estimativas leva a corte de qualidade — é uma lei natural",
      "O custo de corrigir bugs pós-entrega é 10-100x maior que preveni-los durante o desenvolvimento",
    ],
  },
  {
    id: "m6c",
    title: "Diferentes stakeholders, diferentes expectativas de prazo",
    metricName: "Taxa de Entrega no Prazo",
    caseDescription:
      "Ao analisar a taxa de entrega no prazo por stakeholder, você descobre uma disparidade: itens do time comercial têm 90% de entrega no prazo, enquanto itens do time de operações têm apenas 30%. O time de operações está considerando contratar desenvolvimento externo. O gráfico mostra a taxa por área.",
    chartType: "bar",
    data: [
      { label: "Comercial", value: 90 },
      { label: "Marketing", value: 75 },
      { label: "Financeiro", value: 65 },
      { label: "Suporte", value: 50 },
      { label: "Operações", value: 30 },
    ],
    dataLabel: "% no prazo",
    unit: "%",
    highlight: { label: "Disparidade", value: "90% vs 30%", trend: "down" },
    decisions: [
      { id: "m6cd1", text: "Priorizar itens de operações na próxima sprint para equilibrar", feedback: "Reagir com priorização pontual é um band-aid. Sem entender por que operações tem baixa taxa, o problema voltará. Além disso, pode gerar reclamação do comercial.", isOptimal: false },
      { id: "m6cd2", text: "Investigar por que itens de operações atrasam (complexidade técnica, dependências, falta de refinamento) e criar plano de ação transparente", feedback: "Perfeito! Investigar as causas específicas dos atrasos por área revela padrões: itens de operações podem ser mais complexos, ter mais dependências, ou receber menos atenção no refinamento. Um plano de ação transparente restaura a confiança.", isOptimal: true },
      { id: "m6cd3", text: "Deixar operações contratar desenvolvimento externo — isso reduz a demanda no time", feedback: "Desenvolvimento externo sem governança gera dívida técnica, fragmentação e custos ocultos. Além disso, sinaliza que o time interno não atende — um problema de credibilidade.", isOptimal: false },
      { id: "m6cd4", text: "Dar prazos mais longos para operações para garantir que sejam cumpridos", feedback: "Inflar prazos sem resolver a causa real apenas empurra o problema. Operações receberá entregas mais tarde enquanto comercial continua recebendo rápido — a disparidade percebida persiste.", isOptimal: false },
      { id: "m6cd5", text: "Remover prazos de itens de operações e trabalhar por ordem de prioridade", feedback: "Sem compromisso de prazo, operações perde visibilidade e confiança. A solução é melhorar a previsibilidade, não eliminá-la.", isOptimal: false },
    ],
    learningPoints: [
      "Segmentar taxa de entrega por stakeholder/área revela disparidades ocultas na média geral",
      "Disparidades podem indicar viés de priorização, diferenças de complexidade ou falta de refinamento para certas áreas",
      "Transparência sobre causas e planos de ação restaura confiança mais que promessas vagas",
      "Perder um stakeholder para desenvolvimento externo é um fracasso de gestão de produto — previna proativamente",
    ],
  },

  // ===== WORK IN PROGRESS (3 questões) =====
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
      { id: "m7d1", text: "Manter o WIP alto para garantir que todos tenham trabalho e ninguém fique parado", feedback: "WIP alto cria a ilusão de produtividade. Context switching entre múltiplos itens reduz eficiência em até 40%. O resultado é muitos itens iniciados e nenhum finalizado — exatamente o cenário atual.", isOptimal: false },
      { id: "m7d2", text: "Implementar limites de WIP (ex: máximo 2 itens por dev) e focar em finalizar antes de iniciar", feedback: "Excelente! Limitar WIP é um dos princípios mais poderosos do Kanban. Com WIP limitado, o time foca em finalizar itens, reduz context switching e aumenta o fluxo de entregas. 'Stop starting, start finishing!'", isOptimal: true },
      { id: "m7d3", text: "Adicionar mais desenvolvedores ao time para dar conta do WIP", feedback: "Mais devs com WIP alto = mais itens em paralelo = mais context switching. O problema não é falta de pessoas, mas falta de foco. Lei de Little: Lead Time = WIP / Throughput.", isOptimal: false },
      { id: "m7d4", text: "Cancelar os itens menos prioritários do quadro para reduzir o WIP", feedback: "Remover itens do quadro reduz o WIP momentaneamente, mas sem regras de limite, o WIP voltará a crescer. A solução sustentável são limites explícitos de WIP.", isOptimal: false },
      { id: "m7d5", text: "Pedir para cada dev reportar o progresso de cada item diariamente", feedback: "Mais reports sem limitar WIP é burocracia sem resultado. O problema não é visibilidade — é excesso de trabalho simultâneo. Foque em reduzir o WIP, não em monitorar mais.", isOptimal: false },
    ],
    learningPoints: [
      "Lei de Little: Lead Time = WIP / Throughput — reduzir WIP reduz Lead Time automaticamente",
      "Context switching entre tarefas pode reduzir a eficiência em até 40%",
      "Limites de WIP são a base do fluxo contínuo (Kanban) — 'Stop starting, start finishing'",
      "WIP ideal geralmente é 1-2 itens por desenvolvedor para maximizar foco e fluxo",
    ],
  },
  {
    id: "m7b",
    title: "WIP baixo, mas time bloqueado frequentemente",
    metricName: "Work in Progress (WIP)",
    caseDescription:
      "Após implementar WIP limit de 1 item por dev, o time de 4 devs frequentemente fica com 2 pessoas bloqueadas esperando code review ou aprovação de deploy. O WIP mostra apenas 2 itens ativos, mas o Throughput caiu 30%. O gráfico mostra WIP ativo vs. devs bloqueados por dia.",
    chartType: "stacked",
    data: [
      { label: "Seg", value: 4, value2: 0 },
      { label: "Ter", value: 3, value2: 1 },
      { label: "Qua", value: 2, value2: 2 },
      { label: "Qui", value: 2, value2: 2 },
      { label: "Sex", value: 3, value2: 1 },
    ],
    dataLabel: "WIP ativo",
    dataLabel2: "Devs bloqueados",
    unit: "devs",
    highlight: { label: "Bloqueio médio", value: "50% do time", trend: "up" },
    decisions: [
      { id: "m7bd1", text: "Remover os WIP limits já que estão prejudicando o Throughput", feedback: "Remover WIP limits é um retrocesso. O bloqueio não é causado pelo WIP limit, mas por gargalos no processo (code review, deploy). Tratar o gargalo mantém o benefício do WIP limit.", isOptimal: false },
      { id: "m7bd2", text: "Manter WIP limits, mas destravar os gargalos: implementar code review assíncrono, deploy automatizado e pair programming para reduzir filas", feedback: "Perfeito! WIP limits expõem gargalos — isso é uma feature, não um bug. Code review lento e deploy manual são os verdadeiros problemas. Automatizar deploys e criar padrões de code review (ex: SLA de 2h) destrava o fluxo.", isOptimal: true },
      { id: "m7bd3", text: "Aumentar o WIP limit para 2 itens por dev para ter algo para fazer quando bloqueado", feedback: "WIP limit de 2 pode funcionar como ajuste tático, mas sem resolver os gargalos de code review e deploy, o time terá 8 itens em paralelo e os mesmos bloqueios — apenas com mais context switching.", isOptimal: false },
      { id: "m7bd4", text: "Designar uma pessoa fixa para fazer code reviews o dia todo", feedback: "Uma pessoa fixa de review cria dependência e bottleneck humano. Além disso, essa pessoa não desenvolve. Melhor distribuir reviews com SLA e automação.", isOptimal: false },
      { id: "m7bd5", text: "Permitir que devs façam deploy sem code review quando bloqueados", feedback: "Pular code review compromete qualidade e segurança. A solução é tornar o code review mais rápido (SLA, pair programming, automação), não eliminá-lo.", isOptimal: false },
    ],
    learningPoints: [
      "WIP limits expõem gargalos no processo — isso é intencional e valioso",
      "Bloqueios frequentes indicam que etapas como code review e deploy precisam ser otimizadas",
      "Code review com SLA (ex: revisar em até 2h) e deploy automatizado destravam o fluxo",
      "O objetivo do WIP limit não é apenas limitar trabalho, mas forçar melhoria sistêmica do processo",
    ],
  },
  {
    id: "m7c",
    title: "WIP oculto em reuniões e trabalho não-planejado",
    metricName: "Work in Progress (WIP)",
    caseDescription:
      "O quadro Kanban mostra WIP de apenas 5 itens para um time de 5 devs — aparentemente saudável. Porém, ao fazer um levantamento, você descobre que cada dev gasta em média 3h/dia em reuniões, suporte e trabalho não-planejado que não aparece no quadro. O gráfico mostra a alocação real de tempo.",
    chartType: "stacked",
    data: [
      { label: "Dev 1", value: 4, value2: 4 },
      { label: "Dev 2", value: 3, value2: 5 },
      { label: "Dev 3", value: 5, value2: 3 },
      { label: "Dev 4", value: 2, value2: 6 },
      { label: "Dev 5", value: 4, value2: 4 },
    ],
    dataLabel: "Horas planejadas",
    dataLabel2: "Horas não-planejadas",
    unit: "horas/dia",
    highlight: { label: "Tempo não-planejado", value: "37.5% do dia", trend: "up" },
    decisions: [
      { id: "m7cd1", text: "Proibir reuniões e suporte para maximizar tempo de desenvolvimento", feedback: "Eliminar reuniões e suporte é impraticável e prejudicial. Algumas reuniões são necessárias e suporte é obrigatório. A questão é tornar o trabalho não-planejado visível e gerenciável.", isOptimal: false },
      { id: "m7cd2", text: "Tornar todo trabalho visível no quadro (incluindo reuniões, suporte e interrupções) e ajustar a capacidade planejada para refletir a realidade", feedback: "Perfeito! Trabalho invisível é trabalho não-gerenciado. Ao tornar visível, você pode: 1) planejar com capacidade real (60-65% do tempo), 2) identificar reuniões elimináveis, 3) rotacionar suporte para proteger o foco do time.", isOptimal: true },
      { id: "m7cd3", text: "Aumentar a estimativa dos itens para compensar o tempo perdido", feedback: "Inflar estimativas mascara o problema. O tempo gasto em reuniões e suporte continuará crescendo se não for gerenciado. Visibilidade é o primeiro passo.", isOptimal: false },
      { id: "m7cd4", text: "Contratar mais devs para compensar a perda de produtividade", feedback: "Mais devs terão o mesmo problema de reuniões e interrupções. Se 37.5% do tempo é não-planejado, novos devs também perderão essa proporção. Resolva a causa, não o sintoma.", isOptimal: false },
      { id: "m7cd5", text: "Aceitar como custo natural e não se preocupar", feedback: "37.5% de tempo não-planejado é um desperdício significativo. Mesmo que não possa ser eliminado totalmente, torná-lo visível permite otimizar e proteger o tempo de foco.", isOptimal: false },
    ],
    learningPoints: [
      "WIP no quadro não reflete todo o trabalho do time — reuniões, suporte e interrupções são WIP oculto",
      "Trabalho invisível é trabalho não-gerenciado — torne tudo visível para poder otimizar",
      "Planeje com capacidade real (tipicamente 60-70% do tempo) para evitar overcommitment crônico",
      "Rotação de suporte (uma pessoa por sprint) protege o foco do restante do time",
    ],
  },
  // ===== CONE DA INCERTEZA (3 questões) =====
  {
    id: "cone-incerteza-1",
    title: "Estimativas divergentes no início do projeto",
    metricName: "Cone da Incerteza",
    caseDescription:
      "Um novo produto está na fase de Discovery. O time estimou que o projeto levaria entre 3 e 12 meses. Stakeholders pedem uma data fixa de entrega para comunicar ao mercado. O gráfico mostra como a variação das estimativas diminui conforme o projeto avança nas fases.",
    chartType: "area",
    data: [
      { label: "Conceito", value: 400, value2: 25 },
      { label: "Discovery", value: 200, value2: 50 },
      { label: "Planej.", value: 125, value2: 80 },
      { label: "Design", value: 110, value2: 90 },
      { label: "Desenv.", value: 105, value2: 95 },
      { label: "Entrega", value: 100, value2: 100 },
    ],
    dataLabel: "Variação (%)",
    dataLabel2: "Confiança (%)",
    unit: "%",
    highlight: { label: "Variação atual (Discovery)", value: "0.5x–2x", trend: "down" },
    decisions: [
      { id: "ci1-a", text: "Comprometer uma data fixa agora para alinhar expectativas com stakeholders", feedback: "No início do projeto a incerteza é altíssima (0.25x a 4x). Comprometer uma data fixa nesta fase gera falsas expectativas e pressão desnecessária.", isOptimal: false },
      { id: "ci1-b", text: "Apresentar um range de datas com nível de confiança e refinar conforme o projeto avança", feedback: "Correto! O Cone da Incerteza mostra que estimativas melhoram com o tempo. Comunicar ranges com confiança crescente é a abordagem mais honesta e eficaz.", isOptimal: true },
      { id: "ci1-c", text: "Recusar dar qualquer estimativa até o projeto estar 80% concluído", feedback: "Embora a cautela seja válida, stakeholders precisam de alguma referência para planejamento. Ranges com disclaimers são mais úteis que silêncio total.", isOptimal: false },
      { id: "ci1-d", text: "Usar a estimativa mais otimista para motivar o time a entregar rápido", feedback: "Usar a estimativa mais otimista ignora a realidade do cone. Isso cria pressão insustentável e erode a confiança quando prazos são perdidos.", isOptimal: false },
      { id: "ci1-e", text: "Dobrar a estimativa do time como margem de segurança", feedback: "Adicionar buffer arbitrário não é gestão de incerteza — é adivinhação. O correto é reduzir a incerteza com Discovery e comunicar ranges reais.", isOptimal: false },
    ],
    learningPoints: [
      "No início de um projeto, estimativas podem variar de 0.25x a 4x o valor real — isso é normal e esperado",
      "O Cone da Incerteza mostra que a precisão melhora naturalmente conforme decisões são tomadas e riscos eliminados",
      "Comunique estimativas como ranges com nível de confiança, não como datas fixas",
      "Invista em Discovery e prototipação para estreitar o cone mais rapidamente",
    ],
  },
  {
    id: "cone-incerteza-2",
    title: "Reestimativa após fase de Design",
    metricName: "Cone da Incerteza",
    caseDescription:
      "O projeto passou pela fase de Design e o time revisou as estimativas. A previsão inicial era de 6 meses, agora o range está entre 5 e 7 meses. O PM quer saber se já pode travar o escopo e a data. O gráfico mostra a evolução da precisão das estimativas ao longo do projeto.",
    chartType: "line",
    data: [
      { label: "Mês 1", value: 16, value2: 4 },
      { label: "Mês 2", value: 10, value2: 5 },
      { label: "Mês 3", value: 8, value2: 5.5 },
      { label: "Mês 4", value: 7, value2: 5.5 },
      { label: "Mês 5", value: 6.5, value2: 5.8 },
      { label: "Mês 6", value: 6.2, value2: 6 },
    ],
    dataLabel: "Estimativa Máx (meses)",
    dataLabel2: "Estimativa Mín (meses)",
    unit: "meses",
    highlight: { label: "Range atual", value: "5–7 meses", trend: "down" },
    decisions: [
      { id: "ci2-a", text: "Sim, travar escopo e data agora — o range está estreito o suficiente", feedback: "Embora o range tenha diminuído, travar ambos (escopo e data) simultaneamente é arriscado. Mantenha flexibilidade em pelo menos uma dimensão.", isOptimal: false },
      { id: "ci2-b", text: "Travar a data em 7 meses mas manter escopo flexível com priorização contínua", feedback: "Correto! Fixar a data e flexibilizar escopo é a abordagem ágil clássica. Com o cone mais estreito, a data é confiável, mas detalhes de escopo podem mudar.", isOptimal: true },
      { id: "ci2-c", text: "Pedir mais 2 meses de buffer além dos 7 para garantir", feedback: "Buffers excessivos desperdiçam recursos e oportunidade de mercado. O cone já está estreito — use a confiança conquistada em vez de adicionar gordura.", isOptimal: false },
      { id: "ci2-d", text: "Voltar à fase de Discovery para ter mais certeza antes de comprometer", feedback: "Voltar atrás quando o cone já estreitou é desperdício. A incerteza restante é gerenciável com iteração durante o desenvolvimento.", isOptimal: false },
      { id: "ci2-e", text: "Ignorar as estimativas e entregar quando estiver pronto", feedback: "Sem compromisso de prazo, stakeholders não conseguem planejar go-to-market, campanhas ou dependências. Compromissos realistas são necessários.", isOptimal: false },
    ],
    learningPoints: [
      "Após a fase de Design, o cone tipicamente estreita para ±15-25% — confiança suficiente para compromissos com flexibilidade",
      "O triângulo de ferro (escopo, prazo, custo): fixe no máximo duas dimensões e mantenha a terceira flexível",
      "Reestimativas periódicas não são falha — são o processo funcionando corretamente",
      "Use milestones intermediários para validar se o projeto está dentro do cone esperado",
    ],
  },
  {
    id: "cone-incerteza-3",
    title: "Pressão por compromisso na fase de Conceito",
    metricName: "Cone da Incerteza",
    caseDescription:
      "A diretoria quer lançar um novo módulo do produto e pede ao PO uma estimativa de custo e prazo na reunião de amanhã. O projeto está na fase de conceito — apenas uma ideia com business case inicial. O gráfico mostra a margem de erro típica em cada fase segundo o Cone da Incerteza.",
    chartType: "bar",
    data: [
      { label: "Conceito", value: 400 },
      { label: "Viabilidade", value: 200 },
      { label: "Requisitos", value: 150 },
      { label: "Design", value: 115 },
      { label: "Código", value: 107 },
      { label: "Testes", value: 103 },
    ],
    dataLabel: "Margem de Erro (%)",
    unit: "%",
    highlight: { label: "Margem na fase atual", value: "4x (400%)", trend: "up" },
    decisions: [
      { id: "ci3-a", text: "Dar uma estimativa pontual baseada em projetos similares anteriores", feedback: "Projetos similares ajudam, mas na fase de conceito a variação é de 0.25x a 4x. Uma estimativa pontual passa falsa precisão.", isOptimal: false },
      { id: "ci3-b", text: "Apresentar o conceito do Cone da Incerteza e propor um spike de 2 semanas para estreitar o range", feedback: "Correto! Educar stakeholders sobre incerteza e propor ações concretas para reduzi-la é a postura mais profissional e eficaz de um PO.", isOptimal: true },
      { id: "ci3-c", text: "Pedir ao time para fazer Planning Poker e usar a média como estimativa", feedback: "Planning Poker funciona para histórias bem definidas, não para projetos inteiros na fase de conceito. A granularidade é muito baixa para essa técnica.", isOptimal: false },
      { id: "ci3-d", text: "Dizer que é impossível estimar e recusar dar qualquer número", feedback: "Embora tecnicamente correto, essa postura não ajuda a tomada de decisão. Ofereça ranges amplos com contexto em vez de recusar.", isOptimal: false },
      { id: "ci3-e", text: "Usar a estimativa mais pessimista (4x) como compromisso para não decepcionar", feedback: "Superestimar gera outros problemas: a diretoria pode cancelar o projeto por parecer caro demais, ou alocar recursos excessivos desnecessariamente.", isOptimal: false },
    ],
    learningPoints: [
      "Na fase de conceito, estimativas têm margem de erro de até 4x (400%) — isso é pesquisa consolidada, não opinião",
      "Spikes e provas de conceito são as ferramentas mais eficazes para estreitar o cone rapidamente",
      "Educar stakeholders sobre incerteza é responsabilidade do PO — use o Cone da Incerteza como ferramenta visual",
      "Estimativas devem sempre vir acompanhadas de premissas, riscos e nível de confiança",
    ],
  },
];
