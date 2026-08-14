import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { metricsChallenges } from "@/data/metrics-challenges";

export default defineTool({
  name: "list_metric_challenges",
  title: "Listar desafios de métricas",
  description:
    "Lista os desafios de interpretação de métricas de entrega (Lead Time, Cycle Time, Throughput, Velocidade, WIP, Cone da Incerteza, etc.) com id, título e métrica.",
  inputSchema: {
    metricName: z
      .string()
      .optional()
      .describe("Filtra pelo nome da métrica (case-insensitive, busca parcial)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ metricName }) => {
    const needle = metricName?.trim().toLowerCase();
    const items = metricsChallenges
      .filter((c) => !needle || c.metricName.toLowerCase().includes(needle))
      .map((c) => ({ id: c.id, title: c.title, metricName: c.metricName }));
    const metrics = [...new Set(metricsChallenges.map((c) => c.metricName))];
    return {
      content: [
        { type: "text", text: JSON.stringify({ metrics, items }, null, 2) },
      ],
      structuredContent: { metrics, total: items.length, items },
    };
  },
});