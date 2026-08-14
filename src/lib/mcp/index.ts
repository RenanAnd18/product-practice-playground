import { defineMcp } from "@lovable.dev/mcp-js";
import listChallengesTool from "./tools/list-challenges";
import getChallengeTool from "./tools/get-challenge";
import listMetricChallengesTool from "./tools/list-metric-challenges";
import getMetricChallengeTool from "./tools/get-metric-challenge";
import getBacklogScenarioTool from "./tools/get-backlog-scenario";
import getClientScenarioTool from "./tools/get-client-scenario";

export default defineMcp({
  name: "product-masterclass",
  title: "Product Masterclass",
  version: "0.1.0",
  instructions:
    "Conteúdo de treino de Product Owner (em português) deste app: cenários de decisão por nível de senioridade, desafios de interpretação de métricas de entrega, simulações de priorização de backlog e transcrições de clientes para praticar histórias de usuário. Use as ferramentas de listagem primeiro e depois as de detalhe pelo id. Todo o conteúdo é público e somente leitura.",
  tools: [
    listChallengesTool,
    getChallengeTool,
    listMetricChallengesTool,
    getMetricChallengeTool,
    getBacklogScenarioTool,
    getClientScenarioTool,
  ],
});