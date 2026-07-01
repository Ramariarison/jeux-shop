const faqs = [
  {
    q: 'Combien de temps prend la livraison ?',
    a: "En général entre 5 minutes et 10 minutes après confirmation de votre paiement. En dehors des heures de pointe, c'est souvent plus rapide."
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Nous acceptons Mvola (Telma), Airtel Money et Orange Money. Tous les paiements sont 100% locaux.'
  },
  {
    q: 'Comment trouver mon ID joueur ?',
    a: 'Dans la plupart des jeux, votre ID se trouve dans votre profil ou dans les paramètres du jeu. Pour Mobile Legends, vous avez aussi besoin de votre ID serveur.'
  },
  {
    q: "Que se passe-t-il si je n'ai pas reçu mes jetons ?",
    a: 'Contactez-nous directement via WhatsApp ou Facebook. Nous traitons tous les litiges rapidement et vous serez remboursé si le problème vient de notre côté.'
  }
]

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white/2 border-y border-white/5 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Questions fréquentes</h2>
        </div>

        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="bg-white/5 border border-white/5 rounded-xl overflow-hidden group"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-white font-medium text-sm list-none hover:bg-white/5 transition-colors">
                {q}
                <span className="text-slate-500 group-open:rotate-45 transition-transform duration-200 text-lg">
                  +
                </span>
              </summary>
              <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                {a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
