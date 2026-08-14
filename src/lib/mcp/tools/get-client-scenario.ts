import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { clientScenarios } from "@/data/client-scenarios";

export default defineTool({
  name: "get_client_scenario",
  title: "Cenários de cliente para histórias de usuário",
  description:
    "Sem id, lista os cenários do laboratório de histórias de usuário (cliente, empresa, nível, tags). Com id, retorna a transcrição completa da conversa com o cliente para praticar escrita de histórias.",
  inputSchema: {
    id: z.string().optional().describe("Id do cenário. Omita para listar todos."),
    difficulty: z
      .enum(["junior", "pleno", "senior"])
      .optional()
      .describe("Filtra a listagem pelo nível de senioridade."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, difficulty }) => {
    if (!id) {
      const items = clientScenarios
        .filter((s) => !difficulty || s.difficulty === difficulty)
        .map((s) => ({
          id: s.id,
          clientName: s.clientName,
          clientRole: s.clientRole,
          company: s.company,
          difficulty: s.difficulty,
          tags: s.tags,
        }));
      return {
        content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
        structuredContent: { total: items.length, items },
      };
    }
    const scenario = clientScenarios.find((s) => s.id === id);
    if (!scenario) throw new ToolError(`Cenário de cliente "${id}" não encontrado.`);
    return {
      content: [{ type: "text", text: JSON.stringify(scenario, null, 2) }],
      structuredContent: { scenario },
    };
  },
});