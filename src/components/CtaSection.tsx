import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <div className="bg-linear-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Prêt à recharger tes jetons ?
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Rejoins des centaines de joueurs malgaches qui font confiance à Jeton
          Games.
        </p>
        <a
          href="/catalogue"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25"
        >
          Commencer maintenant <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
