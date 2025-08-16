import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        aria-label="Abrir chat de demo"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-20 rounded-full px-5 py-3 text-sm font-medium text-[oklch(22%_0_0)] shadow-lg transition-transform hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))',
          boxShadow: '0 12px 45px -12px var(--accent-ghost)'
        }}
      >
        Habla con Ghebot
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 grid place-items-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[min(680px,92vw)] rounded-2xl border border-[color-mix(in_oklch,var(--accent)_22%,transparent)] bg-[oklch(14%_0_0)] p-4 sm:p-6"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              role="dialog" aria-modal="true" aria-label="Demo de Ghebot"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-lg font-medium text-[var(--fg)]">Demo de Ghebot</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-transparent px-3 py-1.5 text-sm text-[var(--muted)] hover:border-[var(--accent)]"
                >
                  Cerrar
                </button>
              </div>

              <div className="rounded-xl border border-[color-mix(in_oklch,var(--accent)_12%,transparent)] bg-[oklch(12%_0_0)] p-3 text-[var(--muted)]">
                (Aquí irá el widget real n8n/iframe/API). Por ahora es un placeholder para el flujo de demo.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}