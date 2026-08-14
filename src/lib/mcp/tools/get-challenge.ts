import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { challenges } from "@/data/challenges";

export default defineTool({
  name: "get_challenge",
  title: "Detalhar um desafio de Product Owner",
  description:
    "Retorna um cenário completo de treino de PO: contexto, mensagem do stakeholder, opções de decisão com feedback e impacto, e pontos de aprendizado.",
  inputSchema: {
    id: z.string().min(1).describe("Id do desafio, obtido em list_challenges."),
    includeAnswers: z
      .boolean()
      .optional()
      .describe("Se false, omite qual decisão é a ideal e os feedbacks (padrão: true)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, includeAnswers = true }) => {
    const challenge = challenges.find((c) => c.id === id);
    if (!challenge) throw new ToolError(`Desafio "${id}" não encontrado.`);
    const payload = includeAnswers
      ? challenge
      : {
          ...challenge,
          decisions: challenge.decisions.map((d) => ({ id: d.id, text: d.text })),
          learningPoints: undefined,
        };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: { challenge: payload },
    };
  },
});