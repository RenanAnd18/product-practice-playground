import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { challenges } from "@/data/challenges";

export default defineTool({
  name: "list_challenges",
  title: "Listar desafios de Product Owner",
  description:
    "Lista os cenários de treino de Product Owner (em português) com id, título, categoria e nível (junior, pleno, senior). Use get_challenge para ver o cenário completo.",
  inputSchema: {
    difficulty: z
      .enum(["junior", "pleno", "senior"])
      .optional()
      .describe("Filtra pelo nível de senioridade."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ difficulty }) => {
    const items = challenges
      .filter((c) => !difficulty || c.difficulty === difficulty)
      .map((c) => ({
        id: c.id,
        title: c.title,
        category: c.category,
        difficulty: c.difficulty,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { total: items.length, items },
    };
  },
});