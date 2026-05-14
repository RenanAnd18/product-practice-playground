export interface ClientScenario {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  difficulty: "junior" | "pleno" | "senior";
  transcription: string;
  tags: string[];
  duration: string;
}

export const clientScenarios: ClientScenario[] = [
  {
    id: "cs-1",
    clientName: "Mariana Costa",
    clientRole: "Gerente de Operações",
    company: "LogFlex Transportes",
    difficulty: "junior",
    duration: "~2 min",
    transcription: `"Olha, a minha maior dor hoje é rastreamento. Meus clientes ficam me ligando o dia inteiro perguntando onde está o pedido deles. Aí eu tenho que entrar em vários sistemas diferentes, pegar a informação, e mandar por WhatsApp. É horrível. Às vezes a gente demora uma hora pra responder e o cliente já ficou bravo.

Eu precisava de um jeito de o cliente mesmo conseguir ver onde está o pedido dele, sabe? Sem precisar me ligar. Tipo um link que a gente manda e ele acessa. E que atualize sozinho, sem eu precisar fazer nada.

Ah, e seria muito bom se a gente pudesse colocar o logo da empresa, porque hoje parece muito genérico. Meus clientes reclamam que não parece profissional."`,
    tags: ["Rastreamento", "Self-service", "Branding"],
  },
  {
    id: "cs-2",
    clientName: "Carlos Drummond",
    clientRole: "Proprietário",
    company: "Padaria Aromas do Sul",
    difficulty: "junior",
    duration: "~2 min",
    transcription: `"Eu tenho uma padaria e todo dia de manhã eu preciso saber o que foi mais vendido no dia anterior pra poder ajustar a produção. Hoje eu faço isso na cabeça, olhando o caixa e anotando num papel. Às vezes erro e faço pão demais, aí tem desperdício. Ou faço de menos e o cliente vai embora sem comprar.

O problema é que meu caixa é um sistema antigo e não tem relatório nenhum. Eu queria algo simples, que no final do dia eu vísse: 'hoje vendeu X pães, Y sonhos, Z croissants'. E no outro dia de manhã me avisasse: 'atenção, sonho tá vendendo muito, considera fazer mais hoje'.

Não precisa ser nada complicado, não. Só precisa ser fácil de usar, porque eu não entendo muito de tecnologia."`,
    tags: ["Relatório", "Produção", "Notificação"],
  },
  {
    id: "cs-3",
    clientName: "Rafael Mendes",
    clientRole: "Diretor Comercial",
    company: "VendaMais CRM",
    difficulty: "pleno",
    duration: "~3 min",
    transcription: `"A equipe de vendas tá perdendo negócio porque não tem visibilidade. Quando um vendedor entra de férias, o cliente fica no limbo. Ninguém sabe com quem falar, qual foi a última conversa, o que foi prometido. Já perdi um contrato de duzentos mil reais por causa disso.

Preciso que quando um vendedor sair de férias ou for desligado, outro vendedor assuma e já saiba o histórico todo. E que o cliente não perceba a troca, entende? Continuar a conversa de onde parou.

Outra coisa urgente: meu gerente não consegue ver em tempo real quais clientes tão parados há mais de quinze dias. Isso é crítico porque a gente perde a janela de oportunidade. Ele me pediu um semáforo, tipo: verde é ativo, amarelo é quinze dias sem contato, vermelho é trinta dias."`,
    tags: ["CRM", "Histórico", "Visibilidade", "Alerta"],
  },
  {
    id: "cs-4",
    clientName: "Beatriz Fonseca",
    clientRole: "Head de RH",
    company: "TalentHub",
    difficulty: "senior",
    duration: "~4 min",
    transcription: `"Nossa plataforma tem um sério problema de engajamento. Os candidatos começam o processo seletivo mas abandonam no meio. Temos dados que mostram que 68% desistem na etapa de testes, mas eu não sei por quê. Pode ser o tempo, pode ser a dificuldade, pode ser que o teste não carregou no celular.

Do lado das empresas clientes, elas reclamam que os relatórios são inúteis — mostram o percentual de aprovados mas não dão contexto nenhum. Um gestor me ligou semana passada perguntando por que o candidato foi reprovado e eu não tinha resposta.

E tem mais: precisamos de algum mecanismo de feedback para os candidatos, porque hoje eles fazem o teste e somem. Sem retorno nenhum. Isso afeta a reputação das empresas que usam nossa plataforma. Candidato faz processo, não recebe feedback, vai no Glassdoor e faz post negativo. Já aconteceu."`,
    tags: ["Engajamento", "Analytics", "Feedback", "Reputação"],
  },
  {
    id: "cs-5",
    clientName: "Priya Sharma",
    clientRole: "Product Manager",
    company: "EduTech Global",
    difficulty: "senior",
    duration: "~4 min",
    transcription: `"Nossa plataforma de ensino tem alunos em doze países e o problema é localização — não só idioma, mas contexto cultural. Um exemplo: temos um módulo de matemática financeira que usa exemplos com dólar e contexto americano. Quando um aluno no Brasil ou na Índia faz esse módulo, os exemplos não fazem sentido pra ele. O engajamento cai.

Mas fazer versões completamente separadas do conteúdo custa muito e vira um caos de manutenção. Eu preciso de um sistema onde o instrutor cria o conteúdo uma vez e consegue definir variantes regionais para trechos específicos. Tipo: 'nesse parágrafo, use Real e contexto brasileiro quando o aluno for do Brasil'.

E o aluno não deve nem perceber que está vendo uma versão adaptada — tem que ser transparente. E os relatórios de engajamento precisam quebrar por região, não apenas globalmente, porque cada mercado tem comportamento completamente diferente."`,
    tags: ["Localização", "Conteúdo", "Multi-região", "Analytics"],
  },
];
