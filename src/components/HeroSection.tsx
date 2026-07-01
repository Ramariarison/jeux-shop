import { ArrowRight, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
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
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
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
