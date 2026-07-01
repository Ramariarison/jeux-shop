'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Zap } from 'lucide-react'

interface Diamond {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  rotation: number
  rotationSpeed: number
  emoji: string
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const emojis = ['💎', '⚡', '💠', '🪙', '✨']
    const diamonds: Diamond[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 16 + 10,
      speed: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }))

    let animId: number

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      diamonds.forEach((d) => {
        ctx.save()
        ctx.globalAlpha = d.opacity
        ctx.translate(d.x, d.y)
        ctx.rotate(d.rotation)
        ctx.font = `${d.size}px serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(d.emoji, 0, 0)
        ctx.restore()

        d.y += d.speed
        d.rotation += d.rotationSpeed

        if (d.y > canvas.height + 20) {
          d.y = -20
          d.x = Math.random() * canvas.width
        }
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative overflow-hidden">
      {/* Canvas diamonds */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-600/15 border border-purple-500/25 text-purple-300 text-xs px-4 py-2 rounded-full mb-6">
          <Zap size={12} />
          Livraison rapide
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Recharge tes jetons
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            facilement à Madagascar
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Achète tes diamonds, UC et jetons pour tes jeux mobiles préférés. Paiement via Mvola,
          Airtel Money ou Orange Money.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="/catalogue"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25"
          >
            Voir le catalogue <ArrowRight size={16} />
          </a>
          <a
            href="#comment"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-8 py-3.5 rounded-xl font-medium transition-all"
          >
            Comment ça marche
          </a>
        </div>
      </div>
    </section>
  )
}
