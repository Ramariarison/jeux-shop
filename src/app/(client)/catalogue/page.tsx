'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import CommandeModal from '@/components/commandes/CommandeModal'

type Offre = {
  id: string
  label: string
  quantite_jetons: number
  prix_ariary: number
  prix_usd: number
}

type Jeu = {
  id: string
  nom: string
  slug: string
  logo_url: string
  offres: Offre[]
}

export default function CataloguePage() {
  const supabase = createClient()
  const [jeux, setJeux] = useState<Jeu[]>([])
  const [loading, setLoading] = useState(true)
  const [jeuActif, setJeuActif] = useState<string | null>(null)
  const [offreSelectionnee, setOffreSelectionnee] = useState<Offre | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('jeux')
        .select('*, offres(*)')
        .eq('actif', true)
        .order('nom')

      if (data) {
        setJeux(data)
        setJeuActif(data[0]?.id ?? null)
      }

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      setLoading(false)
    }
    fetchData()
  }, [])

  const jeuSelectionne = jeux.find(j => j.id === jeuActif)

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg animate-pulse">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">

    <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/signature.png"
            alt="Rabbit Shop"
            width={56}
            height={56}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-white">Rabbit Shop</h1>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <a href="/commande" className="text-sm text-slate-400 hover:text-white transition-colors">
                Mes commandes
              </a>
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  window.location.href = '/'
                }}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <a href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
              Connexion
            </a>
          )}
        </div>
      </div>
    </header>

      <div className="max-w-5xl mx-auto px-4 py-10">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Catalogue</h2>
          <p className="text-slate-400">Choisis ton jeu et recharge tes jetons instantanément</p>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {jeux.map((jeu) => (
            <button
              key={jeu.id}
              onClick={() => setJeuActif(jeu.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                jeuActif === jeu.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {jeu.nom}
            </button>
          ))}
        </div>

        {jeuSelectionne && (
          <div>
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
                <p className="text-slate-400 text-sm">{jeuSelectionne.offres.length} offres disponibles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {jeuSelectionne.offres
                .sort((a, b) => a.prix_ariary - b.prix_ariary)
                .map((offre) => (
                  <div
                    key={offre.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 hover:border-purple-400/50 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-white font-semibold text-lg">{offre.label}</p>
                        <p className="text-slate-400 text-sm">{offre.quantite_jetons.toLocaleString()} jetons</p>
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
                        className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all duration-200 group-hover:shadow-lg group-hover:shadow-purple-500/25"
                      >
                        Commander
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