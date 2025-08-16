import { useEffect, useRef, useState } from 'react'
import { Hero } from './components/sections/Hero'
import { ChatCTA } from './components/ui/ChatCTA'
import { Navbar } from './components/layout/Navbar'
import { Spotlight } from './components/fx/Spotlight'
import { BackgroundTopGlow } from './components/fx/Background' // opcional
import './app.css'
import { ChatDock } from './components/bot/ChatDock'

export default function App() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => setNavVisible(!e.isIntersecting))
    }, { rootMargin: '-20% 0px 0px 0px', threshold: 0.01 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* capas globales de fondo */}
      <BackgroundTopGlow />
      <Spotlight />

      <Navbar visible={navVisible} />
      <div ref={sentinelRef} aria-hidden className="h-4" />

      <Hero />
      <ChatDock />
    </>
  )
}
