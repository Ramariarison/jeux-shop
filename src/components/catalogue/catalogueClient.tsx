'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

import { Badge } from '@/components/ui/badge'
import CommandeModal from '@/components/commandes/commandeModal/commandeModal'
import { logout } from '@/app/(auth)/action'

import type { Jeu, Offre } from '@/types/catalogue'
import { LogIn, LogOut, Sparkles } from 'lucide-react'

interface Props {
  jeux: Jeu[]
  user: User | null
}

export default function CatalogueClient({ jeux, user }: Props) {
  const [jeuActif, setJeuActif] = useState<string | null>(jeux[0]?.id ?? null)

  const [offreSelectionnee, setOffreSelectionnee] = useState<Offre | null>(null)

  const jeuSelectionne = jeux.find((j) => j.id === jeuActif)

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="shrink-0">
              <img src="/NovaLooot.png" alt="NovaLoot" className="h-8 w-auto object-contain" />
            </Link>
            <h2 className="hidden md:block text-lg font-semibold">
              <span
                style={{
                  background: 'linear-gradient(to right, #1DA1FF, #3B82F6, #7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Nova
              </span>{' '}
              <span
                style={{
                  background: 'linear-gradient(to right, #FDE047, #F59E0B, #F97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Loot
              </span>
            </h2>
            <div className="flex items-center gap-1.5 ml-2 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
              <div className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </div>
              <span className="text-green-400 text-xs font-medium">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/commande"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Mes commandes
                </Link>

                <form action={logout}>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut size={14} />
                    <span className="hidden md:block">Déconnexion</span>
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <LogIn size={16} />
                <span className="hidden md:block">Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Contenu */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Titre */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Catalogue</h2>

          <p className="text-slate-400">Choisis ton jeu et recharge tes jetons instantanément</p>
        </div>

        {/* Jeux */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {jeux.map((jeu) => (
            <button
              key={jeu.id}
              onClick={() => setJeuActif(jeu.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
              ${jeuActif === jeu.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
            >
              {jeu.nom}
            </button>
          ))}
        </div>

        {jeuSelectionne && (
          <div>
            {/* Jeu sélectionné */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                <Image
                  src={jeuSelectionne.logo_url}
                  alt={jeuSelectionne.nom}
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized
                />
              </div>

              <div>
                <h3 className="text-white font-semibold text-lg">{jeuSelectionne.nom}</h3>

                <p className="text-slate-400 text-sm">
                  {jeuSelectionne.offres.length} offres disponibles
                </p>
              </div>
            </div>

            {/* Offres */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...jeuSelectionne.offres]
                .sort((a, b) => a.prix_ariary - b.prix_ariary)
                .map((offre) => (
                  <div
                    key={offre.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 hover:border-purple-400/50 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-white font-semibold text-lg">{offre.label}</p>

                        <p className="text-slate-400 text-sm">
                          {offre.quantite_jetons.toLocaleString()} jetons
                        </p>
                      </div>

                      <Badge className="bg-purple-600/50 text-purple-200 border-purple-500/50 text-xs">
                        ${offre.prix_usd}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {offre.prix_ariary.toLocaleString()}
                        </p>

                        <p className="text-slate-400 text-xs">Ariary</p>
                      </div>

                      <button
                        onClick={() => setOffreSelectionnee(offre)}
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all duration-200 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                      >
                        <Sparkles className="w-4 h-4 animate-pulse transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                        <span>Commander</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal commande */}
      {offreSelectionnee && jeuSelectionne && (
        <CommandeModal
          offre={offreSelectionnee}
          jeu={jeuSelectionne}
          onClose={() => setOffreSelectionnee(null)}
        />
      )}
    </div>
  )
}
