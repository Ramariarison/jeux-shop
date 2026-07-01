import { Zap, Shield, Star } from 'lucide-react'

const reasons = [
  {
    icon: Zap,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    title: 'Livraison rapide',
    desc: 'Tes jetons sont livrés en 5 minutes à 10 minutes maximum après confirmation du paiement.'
  },
  {
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
    title: 'Paiement sécurisé',
    desc: 'Paiement 100% local via Mvola, Airtel Money ou Orange Money. Pas besoin de carte bancaire.'
  },
  {
    icon: Star,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
    title: 'Service fiable',
    desc: 'Des centaines de commandes traitées avec succès. Support disponible en cas de problème.'
  }
]

export default function PourquoiSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-3">Pourquoi Nova Loot ?</h2>
        <p className="text-slate-400">La solution la plus simple à Madagascar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className="bg-white/5 border border-white/5 rounded-2xl p-6">
            <div
              className={`w-12 h-12 ${bg} border rounded-xl flex items-center justify-center mb-4`}
            >
              <Icon size={22} className={color} />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
