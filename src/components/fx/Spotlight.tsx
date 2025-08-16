import { useEffect, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export function Spotlight() {
  const [pos, setPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight * 0.42 })
  const auto = useAnimationControls()

  useEffect(() => {
    // animación autónoma (respira)
    auto.start({
      x: [pos.x - 60, pos.x + 60, pos.x],
      y: [pos.y - 40, pos.y + 40, pos.y],
      transition: { duration: 9.5, ease: 'easeInOut', repeat: Infinity }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h, { passive: true })
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        // círculo centrado en el puntero
        background: `radial-gradient(680px 680px at ${pos.x}px ${pos.y}px, var(--accent-strong), transparent 60%)`,
        filter: 'blur(48px)', opacity: 0.13
      }}
      initial={{ opacity: 0, x: pos.x, y: pos.y }}
      animate={auto}
    />
  )
}
