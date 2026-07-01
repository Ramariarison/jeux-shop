const steps = [
  {
    step: '01',
    title: 'Choisis ton jeu',
    desc: 'Sélectionne ton jeu préféré et le pack de jetons qui te convient.'
  },
  {
    step: '02',
    title: 'Entre ton ID joueur',
    desc: "Renseigne ton identifiant en jeu pour qu'on puisse te livrer les jetons."
  },
  {
    step: '03',
    title: 'Paie via mobile money',
    desc: 'Envoie le montant via Mvola, Airtel Money ou Orange Money.'
  },
  {
    step: '04',
    title: 'Reçois tes jetons',
    desc: 'Ton compte est rechargé en moins de 10 min après confirmation du paiement.'
  }
]

export default function CommentSection() {
  return (
    <section id="comment" className="bg-white/2 border-y border-white/5 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Comment ça marche ?</h2>
          <p className="text-slate-400">En 4 étapes simples</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="relative">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 h-full">
                <div className="text-xs font-mono text-purple-500 mb-3">{step}</div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
