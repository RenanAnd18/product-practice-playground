import { useState } from "react";
import {
  ArrowLeft,
  Mic,
  Send,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw,
  ChevronRight,
  Users,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { clientScenarios, type ClientScenario } from "@/data/client-scenarios";
import {
  useUserStoryEval,
  getStoredApiKey,
  saveApiKey,
  clearApiKey,
  type EvaluationResult,
  type StoryAnalysis,
} from "@/hooks/useUserStoryEval";

const difficultyConfig = {
  junior: { label: "Júnior", class: "bg-success/20 text-success border-success/30" },
  pleno: { label: "Pleno", class: "bg-warning/20 text-warning border-warning/30" },
  senior: { label: "Sênior", class: "bg-destructive/20 text-destructive border-destructive/30" },
};

const statusConfig: Record<StoryAnalysis["status"], { label: string; icon: typeof CheckCircle2; class: string }> = {
  boa: { label: "Boa", icon: CheckCircle2, class: "text-success border-success/30 bg-success/5" },
  media: { label: "Média", icon: AlertCircle, class: "text-warning border-warning/30 bg-warning/5" },
  ruim: { label: "Ruim", icon: XCircle, class: "text-destructive border-destructive/30 bg-destructive/5" },
};

function ApiKeySetup({ onSaved }: { onSaved: () => void }) {
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);

  const handleSave = () => {
    if (key.trim().startsWith("sk-ant-")) {
      saveApiKey(key.trim());
      onSaved();
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5 p-5 mb-6">
      <div className="flex items-start gap-3">
        <Key className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="font-display font-semibold text-foreground text-sm mb-1">
            Chave da API Anthropic necessária
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            A avaliação usa o Claude. Sua chave fica salva apenas no seu navegador e vai direto para a Anthropic.
          </p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={show ? "text" : "password"}
                placeholder="sk-ant-..."
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="pr-10 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button
              size="sm"
              disabled={!key.trim().startsWith("sk-ant-")}
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ScenarioCard({
  scenario,
  onSelect,
}: {
  scenario: ClientScenario;
  onSelect: (s: ClientScenario) => void;
}) {
  const diff = difficultyConfig[scenario.difficulty];
  return (
    <Card
      className="border-border hover:border-primary/40 transition-all cursor-pointer p-5 hover:bg-secondary/30 group"
      onClick={() => onSelect(scenario)}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <Badge variant="outline" className={`text-xs ${diff.class}`}>
          {diff.label}
        </Badge>
        <span className="text-xs text-muted-foreground font-mono">{scenario.duration}</span>
      </div>
      <p className="font-display font-semibold text-foreground text-sm mb-1">{scenario.clientName}</p>
      <p className="text-xs text-muted-foreground mb-3">
        {scenario.clientRole} · {scenario.company}
      </p>
      <div className="flex flex-wrap gap-1 mb-4">
        {scenario.tags.map((tag) => (
          <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded-md font-mono">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Iniciar cenário <ChevronRight className="w-3 h-3" />
      </div>
    </Card>
  );
}

function EvaluationView({
  result,
  userStories,
  onReset,
}: {
  result: EvaluationResult;
  userStories: string;
  onReset: () => void;
}) {
  const stories = userStories.split(/\n{2,}/).filter((s) => s.trim());

  const noteColor =
    result.nota >= 8 ? "text-success" : result.nota >= 5 ? "text-warning" : "text-destructive";

  return (
    <div className="space-y-6">
      {/* Score */}
      <Card className="p-6 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className={`text-5xl font-display font-bold ${noteColor}`}>
            {result.nota}
            <span className="text-2xl text-muted-foreground">/10</span>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < result.nota ? noteColor : "text-muted-foreground/30"}`}
                  fill={i < result.nota ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-mono">Nota do time de desenvolvimento</p>
          </div>
        </div>
      </Card>

      {/* Team Feedback */}
      <Card className="p-5 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground text-sm">Feedback do time</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "O que está bom", value: result.feedback_time.positivo, color: "text-success" },
            { label: "O que está confuso", value: result.feedback_time.confuso, color: "text-warning" },
            { label: "O que está faltando", value: result.feedback_time.faltando, color: "text-destructive" },
            { label: "O que precisa melhorar", value: result.feedback_time.melhorar, color: "text-primary" },
          ].map((item) => (
            <div key={item.label}>
              <span className={`text-xs font-mono font-semibold ${item.color}`}>{item.label}</span>
              <p className="text-sm text-foreground/80 leading-relaxed mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Per-story analysis */}
      {result.analise_historias.length > 0 && (
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm mb-3">
            Análise por história
          </h3>
          <div className="space-y-3">
            {result.analise_historias.map((analise, i) => {
              const status = statusConfig[analise.status] ?? statusConfig.media;
              const StatusIcon = status.icon;
              return (
                <Card key={i} className={`p-4 border ${status.class}`}>
                  <div className="flex items-start gap-3">
                    <StatusIcon className="w-4 h-4 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-mono text-xs text-muted-foreground">
                          História {i + 1}
                        </span>
                        <Badge variant="outline" className={`text-xs ${status.class}`}>
                          {status.label}
                        </Badge>
                      </div>
                      {stories[i] && (
                        <p className="text-xs text-muted-foreground italic mb-2 border-l-2 border-border pl-2">
                          {stories[i].substring(0, 120)}{stories[i].length > 120 ? "…" : ""}
                        </p>
                      )}
                      <p className="text-xs text-foreground/80 mb-1">
                        <span className="font-semibold">Problema:</span> {analise.problemas}
                      </p>
                      <p className="text-xs text-foreground/80">
                        <span className="font-semibold">Sugestão:</span> {analise.sugestao}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Ideal version */}
      {result.versao_ideal.length > 0 && (
        <Card className="p-5 border-success/20 bg-success/5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Versão ideal (como o time escreveria)
          </h3>
          <div className="space-y-2">
            {result.versao_ideal.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="font-mono text-xs text-success mt-0.5 shrink-0">{i + 1}.</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Team questions */}
      {result.perguntas_time.length > 0 && (
        <Card className="p-5 border-border">
          <h3 className="font-display font-semibold text-foreground text-sm mb-3">
            Perguntas que o time faria antes de desenvolver
          </h3>
          <ul className="space-y-2">
            {result.perguntas_time.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="text-primary font-mono text-xs mt-0.5 shrink-0">?</span>
                {q}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Button variant="outline" onClick={onReset} className="w-full">
        <RotateCcw className="w-4 h-4 mr-2" />
        Tentar outro cenário
      </Button>
    </div>
  );
}

const UserStoryLab = () => {
  const [hasKey, setHasKey] = useState(() => !!getStoredApiKey());
  const [selected, setSelected] = useState<ClientScenario | null>(null);
  const [userStories, setUserStories] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { evaluate, loading, error, result, reset } = useUserStoryEval();

  const handleSelect = (scenario: ClientScenario) => {
    setSelected(scenario);
    setUserStories("");
    setSubmitted(false);
    reset();
  };

  const handleSubmit = async () => {
    if (!selected || !userStories.trim()) return;
    setSubmitted(true);
    await evaluate(selected.transcription, userStories);
  };

  const handleReset = () => {
    setSelected(null);
    setUserStories("");
    setSubmitted(false);
    reset();
  };

  const storyCount = userStories.split(/\n{2,}/).filter((s) => s.trim()).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Laboratório de Histórias de Usuário
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Ouça o cliente, escreva as histórias de usuário e receba avaliação realista do time de desenvolvimento.
        </p>
      </div>

      {!hasKey && (
        <ApiKeySetup onSaved={() => setHasKey(true)} />
      )}

      {hasKey && !selected && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Escolha um cenário para começar:</p>
            <button
              onClick={() => { clearApiKey(); setHasKey(false); }}
              className="text-xs text-muted-foreground hover:text-foreground font-mono flex items-center gap-1"
            >
              <Key className="w-3 h-3" /> Trocar chave
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {clientScenarios.map((s) => (
              <ScenarioCard key={s.id} scenario={s} onSelect={handleSelect} />
            ))}
          </div>
        </>
      )}

      {hasKey && selected && !result && (
        <div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos cenários
          </button>

          {/* Client info */}
          <div className="mb-2 flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`text-xs ${difficultyConfig[selected.difficulty].class}`}
            >
              {difficultyConfig[selected.difficulty].label}
            </Badge>
            <span className="font-mono text-xs text-muted-foreground">{selected.duration} de áudio</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            {selected.clientName}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            {selected.clientRole} · {selected.company}
          </p>

          {/* Transcription */}
          <Card className="border-primary/20 bg-primary/5 mb-6 p-5">
            <div className="flex items-start gap-3">
              <Mic className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-2">TRANSCRIÇÃO DO ÁUDIO</p>
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {selected.transcription}
                </p>
              </div>
            </div>
          </Card>

          {/* User story input */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-display font-semibold text-foreground text-sm">
                Suas histórias de usuário
              </label>
              <span className={`text-xs font-mono ${storyCount > 3 ? "text-destructive" : "text-muted-foreground"}`}>
                {storyCount}/3 histórias
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Escreva até 3 histórias seguindo o formato <span className="font-mono">Como / Quero / Para</span>. Separe cada história com uma linha em branco.
            </p>
            <Textarea
              value={userStories}
              onChange={(e) => setUserStories(e.target.value)}
              placeholder={"Como [usuário], quero [funcionalidade], para [benefício].\n\nComo [usuário], quero [funcionalidade], para [benefício]."}
              className="min-h-[200px] font-mono text-sm resize-none"
              disabled={loading}
            />
          </div>

          {error && (
            <Card className="border-destructive/30 bg-destructive/5 p-4 mb-4">
              <div className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </Card>
          )}

          <Button
            onClick={handleSubmit}
            disabled={!userStories.trim() || loading || storyCount > 3}
            className="w-full"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                Time avaliando suas histórias...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar para avaliação do time
              </>
            )}
          </Button>
        </div>
      )}

      {hasKey && result && selected && (
        <div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos cenários
          </button>
          <div className="mb-6">
            <p className="text-xs font-mono text-muted-foreground mb-1">AVALIAÇÃO DO TIME — {selected.clientName} · {selected.company}</p>
          </div>
          <EvaluationView
            result={result}
            userStories={userStories}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
};

export default UserStoryLab;
