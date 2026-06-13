'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Zap, Shield, Star } from 'lucide-react'

type Jeu = {
  id: string
  nom: string
  slug: string
  logo_url: string
}

export default function HomePage() {
  const supabase = createClient()
  const [jeux, setJeux] = useState<Jeu[]>([])
  const [user, setUser] = useState<unknown>(null)

  useEffect(() => {
    async function fetchData() {
      const { data: jeuxData } = await supabase
        .from('jeux')
        .select('id, nom, slug, logo_url')
        .eq('actif', true)

      if (jeuxData) setJeux(jeuxData)

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      {/* Header */}
      <header className="border-b border-white/5 backdrop-blur-md bg-[#0f0f1a]/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/signature.png"
              alt="Rabbit Shop"
              width={56}
              height={56}
              className="object-contain"
            />
            <span className="text-white font-bold text-lg">Rabbit Shop</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#jeux" className="text-slate-400 hover:text-white text-sm transition-colors">
              Jeux
            </a>
            <a href="#comment" className="text-slate-400 hover:text-white text-sm transition-colors">
              Comment ça marche
            </a>
            <a href="#faq" className="text-slate-400 hover:text-white text-sm transition-colors">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <a
                href="/catalogue"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all"
              >
                Catalogue <ArrowRight size={14} />
              </a>
            ) : (
              <>
                <a href="/login" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Connexion
                </a>
                <a
                  href="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all"
                >
                  S&apos;inscrire
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-600/15 border border-purple-500/25 text-purple-300 text-xs px-4 py-2 rounded-full mb-6">
            <Zap size={12} />
            Livraison rapide — 15 à 30 min
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Recharge tes jetons
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              facilement à Madagascar
            </span>
          </h1>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Achète tes diamonds, UC et jetons pour tes jeux mobiles préférés.
            Paiement via Mvola, Airtel Money ou Orange Money.
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

      {/* Jeux disponibles */}
      <section id="jeux" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Jeux disponibles</h2>
          <p className="text-slate-400">Recharge instantanément pour ces jeux</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {jeux.map((jeu) => (
            <a
              key={jeu.id}
              href="/catalogue"
              className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-200">
                <Image
                  src={jeu.logo_url}
                  alt={jeu.nom}
                  width={56}
                  height={56}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <p className="text-white font-medium text-sm">{jeu.nom}</p>
              <p className="text-purple-400 text-xs mt-1 flex items-center justify-center gap-1">
                Voir les offres <ArrowRight size={10} />
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment" className="bg-white/2 border-y border-white/5 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Comment ça marche ?</h2>
            <p className="text-slate-400">En 4 étapes simples</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Choisis ton jeu',
                desc: 'Sélectionne ton jeu préféré et le pack de jetons qui te convient.',
              },
              {
                step: '02',
                title: 'Entre ton ID joueur',
                desc: 'Renseigne ton identifiant en jeu pour qu\'on puisse te livrer les jetons.',
              },
              {
                step: '03',
                title: 'Paie via mobile money',
                desc: 'Envoie le montant via Mvola, Airtel Money ou Orange Money.',
              },
              {
                step: '04',
                title: 'Reçois tes jetons',
                desc: 'Ton compte est rechargé en moins de 30 min après confirmation du paiement.',
              },
            ].map(({ step, title, desc }) => (
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

      {/* Pourquoi nous choisir */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Pourquoi Jeton Games ?</h2>
          <p className="text-slate-400">La solution la plus simple à Madagascar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              color: 'text-yellow-400',
              bg: 'bg-yellow-500/10 border-yellow-500/20',
              title: 'Livraison rapide',
              desc: 'Tes jetons sont livrés en 15 minutes à 30 minutes maximum après confirmation du paiement.',
            },
            {
              icon: Shield,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              title: 'Paiement sécurisé',
              desc: 'Paiement 100% local via Mvola, Airtel Money ou Orange Money. Pas besoin de carte bancaire.',
            },
            {
              icon: Star,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20',
              title: 'Service fiable',
              desc: 'Des centaines de commandes traitées avec succès. Support disponible en cas de problème.',
            },
          ].map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <div className={`w-12 h-12 ${bg} border rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={22} className={color} />
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white/2 border-y border-white/5 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Questions fréquentes</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Combien de temps prend la livraison ?',
                a: 'En général entre 15 minutes et 30 minutes après confirmation de votre paiement. En dehors des heures de pointe, c\'est souvent plus rapide.',
              },
              {
                q: 'Quels moyens de paiement acceptez-vous ?',
                a: 'Nous acceptons Mvola (Telma), Airtel Money et Orange Money. Tous les paiements sont 100% locaux.',
              },
              {
                q: 'Comment trouver mon ID joueur ?',
                a: 'Dans la plupart des jeux, votre ID se trouve dans votre profil ou dans les paramètres du jeu. Pour Mobile Legends, vous avez aussi besoin de votre ID serveur.',
              },
              {
                q: 'Que se passe-t-il si je n\'ai pas reçu mes jetons ?',
                a: 'Contactez-nous directement via WhatsApp ou Facebook. Nous traitons tous les litiges rapidement et vous serez remboursé si le problème vient de notre côté.',
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="bg-white/5 border border-white/5 rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-white font-medium text-sm list-none hover:bg-white/5 transition-colors">
                  {q}
                  <span className="text-slate-500 group-open:rotate-45 transition-transform duration-200 text-lg">+</span>
                </summary>
                <div className="px-5 pb-4 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="bg-linear-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/20 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à recharger tes jetons ?
          </h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Rejoins des centaines de joueurs malgaches qui font confiance à Jeton Games.
          </p>
          <a
            href="/catalogue"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25"
          >
            Commencer maintenant <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <span className="text-slate-400 text-sm">Jeton Games © 2026</span>
          <div className="flex items-center gap-6">
            <a href="/catalogue" className="text-slate-500 hover:text-white text-sm transition-colors">
              Catalogue
            </a>
            <a href="/login" className="text-slate-500 hover:text-white text-sm transition-colors">
              Connexion
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}