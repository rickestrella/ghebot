export function BackgroundTopGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(78% 0.34 50 / 0.22), transparent 70%), var(--bg)'
      }}
    />
  )
}
