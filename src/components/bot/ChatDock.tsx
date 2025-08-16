// src/components/bot/ChatDock.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatPanel } from "./ChatPanel";

export function ChatDock({ onOpenChange }: { onOpenChange?: (o:boolean)=>void }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback((v?: boolean) => {
    const nv = v ?? !open;
    setOpen(nv);
    onOpenChange?.(nv);
  }, [open, onOpenChange]);

  const ggRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); toggle(true); }
      if (e.key.toLowerCase() === "g") {
        const now = Date.now();
        if (ggRef.current && now - ggRef.current < 450) toggle(true);
        ggRef.current = now;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <>
      <button
        onClick={() => toggle()}
        className="fixed bottom-5 right-5 z-40 rounded-full px-5 py-3 text-sm font-medium text-[oklch(22%_0_0)] shadow-lg hover:scale-[1.03]"
        style={{background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))', boxShadow: '0 12px 45px -12px var(--accent-ghost)'}}
        aria-label="Abrir chat de Ghebot"
      >
        Habla con Ghebot
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-end p-0 sm:p-4 bg-black/30"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => toggle(false)}
          >
            <motion.div
              className="w-full sm:w-[min(800px,92vw)] sm:rounded-2xl border border-[color-mix(in_oklch,var(--accent)_18%,transparent)] bg-[oklch(12%_0_0)]"
              initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog" aria-modal="true" aria-label="Chat con Ghebot"
              style={{ boxShadow: '0 24px 64px -20px oklch(0% 0 0 / 60%)' }}
            >
              <ChatPanel onClose={() => toggle(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
