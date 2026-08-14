import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { metricsChallenges } from "@/data/metrics-challenges";

export default defineTool({
  name: "get_metric_challenge",
  title: "Detalhar um desafio de métricas",
  description:
    "Retorna um desafio de métrica completo: descrição do caso, série de dados do gráfico, destaque, opções de decisão com feedback e pontos de aprendizado.",
  inputSchema: {
    id: z.string().min(1).describe("Id do desafio, obtido em list_metric_challenges."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const challenge = metricsChallenges.find((c) => c.id === id);
    if (!challenge) throw new ToolError(`Desafio de métrica "${id}" não encontrado.`);
    return {
      content: [{ type: "text", text: JSON.stringify(challenge, null, 2) }],
      structuredContent: { challenge },
    };
  },
});