import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { backlogScenarios } from "@/data/backlog-items";

export default defineTool({
  name: "get_backlog_scenario",
  title: "Cenários de priorização de backlog",
  description:
    "Sem id, lista os cenários de simulação de priorização de backlog. Com id, retorna o cenário completo: contexto, restrição de capacidade, itens, itens que chegam por sprint, ordem ideal e explicação.",
  inputSchema: {
    id: z.string().optional().describe("Id do cenário. Omita para listar todos."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    if (!id) {
      const items = backlogScenarios.map((s) => ({
        id: s.id,
        title: s.title,
        sprintCapacity: s.sprintCapacity,
        itemCount: s.items.length,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
        structuredContent: { total: items.length, items },
      };
    }
    const scenario = backlogScenarios.find((s) => s.id === id);
    if (!scenario) throw new ToolError(`Cenário de backlog "${id}" não encontrado.`);
    return {
      content: [{ type: "text", text: JSON.stringify(scenario, null, 2) }],
      structuredContent: { scenario },
    };
  },
});