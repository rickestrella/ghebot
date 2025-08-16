import { motion, AnimatePresence } from "framer-motion";

export function Navbar({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
          className="fixed inset-x-0 top-0 z-30 mx-auto mt-3 flex max-w-[min(1100px,92vw)] items-center justify-between rounded-2xl border border-[color-mix(in_oklch,var(--accent)_18%,transparent)] bg-[oklch(14%_0_0/80%)] px-4 py-2 backdrop-blur"
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span className="text-sm font-medium text-[var(--muted)]">
              Ghebot
            </span>
          </div>
          <a
            href="#demo"
            className="rounded-xl border border-[color-mix(in_oklch,var(--accent)_22%,transparent)] px-3 py-1.5 text-sm text-[var(--fg)] hover:border-[var(--accent)]"
          >
            Probar demo
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
