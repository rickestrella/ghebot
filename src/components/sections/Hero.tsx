import { motion } from 'framer-motion'

export const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden !bg-transparent !text-[var(--fg)]"
    >
      {/* patrón diagonal sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.055]" aria-hidden>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_13px,oklch(18%_0_0)_14px,transparent_15px)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[min(1100px,92vw)] flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-semibold tracking-tight text-balance sheen-title"
          style={{ fontSize: 'clamp(2.5rem, 6.2vw, 3.6rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          Ghebot
        </motion.h1>

        <motion.p
          className="mt-[clamp(1rem,1.25vw,1.45rem)] max-w-[56ch] text-pretty text-[clamp(1.06rem,2.3vw,1.3125rem)] !text-[var(--muted)]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.35 }}
        >
          Grow • Hope • Effort — Chatbots de IA hiper‑personalizados que atienden, asesoran y convierten.
          Minimalistas, precisos y listos para vender por ti.
        </motion.p>

        <motion.div
          className="mt-[clamp(1.25rem,2.2vw,2rem)] flex items-center gap-[clamp(0.618rem,1.2vw,1rem)]"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
        >
          <a
            href="#demo"
            className="group inline-flex items-center rounded-2xl border border-transparent px-5 py-3 text-[oklch(22%_0_0)] transition-all focus:outline-none hover:scale-[1.015] active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))',
              boxShadow: '0 14px 48px -16px var(--accent-ghost)'
            }}
          >
            Probar demo
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center rounded-2xl border border-[color-mix(in_oklch,var(--accent)_20%,transparent)] px-5 py-3 !text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
          >
            Hablar con nosotros
          </a>
        </motion.div>

        <div className="mt-[clamp(1.25rem,2.2vw,2rem)] h-px w-[clamp(120px,28vw,360px)] bg-[color-mix(in_oklch,var(--accent)_45%,transparent)] opacity-80 animate-[pulseSoft_4.236s_ease-in-out_infinite]" />
      </div>
    </section>
  )
}
