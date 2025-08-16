// eslint-disable @typescript-eslint/no-explicit-any
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import type { Msg, BotEvent } from "./chat-core";
import { sendToBot } from "./chat-core";

type DialogMsg = Omit<Msg, "role"> & { role: "user" | "assistant" };

const SUGGESTIONS = [
  "¿Qué puede automatizar Ghebot en mi negocio?",
  "Simula atención a un cliente nuevo",
  "Crea un flujo para agendar citas",
];

// Type guard: quita "system" y le dice a TS que solo quedan user/assistant
function isDialogMsg(m: Msg): m is DialogMsg {
  return m.role === "user" || m.role === "assistant";
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "sys", role: "system", content: "Eres Ghebot: breve, claro y útil." },
    {
      id: "hi",
      role: "assistant",
      content: "Hola, soy Ghebot. ¿Te muestro cómo puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const track = useCallback((ev: BotEvent) => {
    // Aquí podrías POSTear a n8n /events si quieres
    // fetch('/events', { method:'POST', body: JSON.stringify(ev) })
    // Por ahora, consola para no romper eslint no-unused-vars
    console.log("[ghebot:event]", ev);
  }, []);

  useEffect(() => {
    track({ type: "open", at: Date.now() });
  }, [track]);

  const dialogMsgs = useMemo<DialogMsg[]>(
    () => msgs.filter(isDialogMsg),
    [msgs]
  );

  const send = useCallback(
    async (text: string) => {
      const t = text.trim();
      if (!t || loading) return;

      const u: Msg = { id: crypto.randomUUID(), role: "user", content: t };
      setMsgs((m) => [...m, u]);
      setInput("");
      setLoading(true);
      track({ type: "send", at: Date.now(), meta: { len: t.length } });

      try {
        const reply = await sendToBot([...msgs, u]);
        const a: Msg = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        };
        setMsgs((m) => [...m, a]);
        track({ type: "success", at: Date.now() });
      } catch (e) {
        const a: Msg = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Hubo un problema al conectar. ¿Reintento?",
        };
        setMsgs((m) => [...m, a]);
        track({ type: "error", at: Date.now(), meta: { error: String(e) } });
      } finally {
        setLoading(false);
      }
    },
    [loading, msgs, track]
  );

  return (
    <div className="flex h-[70svh] flex-col">
      {/* Header minimal */}
      <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span className="text-sm text-[var(--muted)]">Ghebot</span>
        </div>
        <button
          onClick={onClose}
          className="rounded-md border border-transparent px-3 py-1.5 text-sm text-[var(--muted)] hover:border-[var(--accent)]"
        >
          Cerrar
        </button>
      </div>

      {/* Historial */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {dialogMsgs.map((m: any) => (
          <Bubble key={m.id} role={m.role} text={m.content} />
        ))}
        {loading && <Typing />}
        <div ref={endRef} />
      </div>

      {/* Sugerencias (solo si aún no hay input del usuario) */}
      {msgs.filter(isDialogMsg).length <= 1 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-[var(--border)] px-4 py-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-full border border-[color-mix(in_oklch,var(--accent)_20%,transparent)] px-3 py-1.5 text-sm text-[var(--fg)] hover:border-[var(--accent)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-[var(--border)] px-3 py-3"
      >
        <div className="flex items-center gap-2 rounded-xl border border-[color-mix(in_oklch,var(--accent)_18%,transparent)] bg-[oklch(14%_0_0)] px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje…"
            className="w-full bg-transparent outline-none placeholder:text-[oklch(70%_0.02_250)]"
            aria-label="Mensaje para Ghebot"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-lg px-3 py-1.5 text-[oklch(22%_0_0)] disabled:opacity-40"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-soft))",
            }}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

function Bubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[72ch] rounded-2xl px-3 py-2 text-sm ${
          isUser
            ? "bg-[oklch(18%_0_0)] text-[var(--fg)] border border-[oklch(24%_0_0)]"
            : "bg-[oklch(12%_0_0)] text-[var(--fg)] border border-[color-mix(in_oklch,var(--accent)_14%,transparent)]"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <motion.div
      className="inline-flex items-center gap-1 rounded-full bg-[oklch(12%_0_0)] px-3 py-1.5 text-[var(--muted)]"
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.6, repeat: Infinity }}
      aria-live="polite"
    >
      <span>Ghebot está escribiendo</span>
      <span className="inline-flex">
        <i className="mx-0.5 h-1 w-1 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:0ms]" />
        <i className="mx-0.5 h-1 w-1 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:120ms]" />
        <i className="mx-0.5 h-1 w-1 rounded-full bg-[var(--muted)] animate-bounce [animation-delay:240ms]" />
      </span>
    </motion.div>
  );
}
