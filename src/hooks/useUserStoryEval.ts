import { useState } from "react";

export interface StoryAnalysis {
  status: "boa" | "media" | "ruim";
  problemas: string;
  sugestao: string;
}

export interface EvaluationResult {
  nota: number;
  feedback_time: {
    positivo: string;
    confuso: string;
    faltando: string;
    melhorar: string;
  };
  analise_historias: StoryAnalysis[];
  versao_ideal: string[];
  perguntas_time: string[];
}

const STORAGE_KEY = "anthropic_api_key";

export function getStoredApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

export function saveApiKey(key: string) {
  localStorage.setItem(STORAGE_KEY, key);
}

export function clearApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

function buildPrompt(transcription: string, userStories: string): string {
  return `Você é um time de desenvolvimento experiente (engenheiros + QA + UX) avaliando histórias de usuário escritas por um Product Owner.

CONTEXTO:
Abaixo está a transcrição de um áudio de um cliente explicando uma necessidade de produto.

[TRANSCRIÇÃO DO ÁUDIO]
${transcription}

TAREFA:
O Product Owner ouviu esse áudio apenas uma vez e escreveu até 3 histórias de usuário.

[HISTÓRIAS DE USUÁRIO]
${userStories}

AVALIE como um time real de desenvolvimento faria.

CRITÉRIOS DE AVALIAÇÃO:
1. Clareza (está fácil de entender?)
2. Estrutura (segue o padrão: Como / Quero / Para?)
3. Completude (faltam informações importantes?)
4. Aderência ao pedido (captou corretamente o que o cliente queria?)
5. Ambiguidade (há dúvidas ou interpretações abertas?)

IMPORTANTE:
- Seja direto e realista (sem elogios genéricos)
- Fale como um time de desenvolvimento de verdade
- Aponte problemas mesmo que pequenos

Responda EXCLUSIVAMENTE com um objeto JSON válido, sem texto antes ou depois, no seguinte formato:

{
  "nota": <número de 0 a 10>,
  "feedback_time": {
    "positivo": "<o que está bom nas histórias>",
    "confuso": "<o que está confuso ou ambíguo>",
    "faltando": "<o que está faltando>",
    "melhorar": "<o que precisa ser melhorado com mais urgência>"
  },
  "analise_historias": [
    {
      "status": "<boa|media|ruim>",
      "problemas": "<problemas encontrados nessa história>",
      "sugestao": "<sugestão de melhoria específica>"
    }
  ],
  "versao_ideal": [
    "<história reescrita 1>",
    "<história reescrita 2>"
  ],
  "perguntas_time": [
    "<dúvida que o time levantaria 1>",
    "<dúvida que o time levantaria 2>",
    "<dúvida que o time levantaria 3>"
  ]
}`;
}

export function useUserStoryEval() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const evaluate = async (transcription: string, userStories: string) => {
    const apiKey = getStoredApiKey();
    if (!apiKey) {
      setError("Configure sua chave da API Anthropic primeiro.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: buildPrompt(transcription, userStories),
            },
          ],
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          (err as { error?: { message?: string } }).error?.message ?? `Erro ${response.status}`
        );
      }

      const data = await response.json() as {
        content: Array<{ type: string; text: string }>;
      };
      const text = data.content[0]?.text ?? "";

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Resposta inválida da IA.");

      const parsed = JSON.parse(jsonMatch[0]) as EvaluationResult;
      setResult(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  return { evaluate, loading, error, result, reset: () => setResult(null) };
}
