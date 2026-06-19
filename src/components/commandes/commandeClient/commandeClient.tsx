'use client'

import { ArrowLeft, Clock, CheckCircle, XCircle, CreditCard, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import { Commande } from '@/types/commande'
import { logout } from '@/app/(auth)/action'

interface Props {
    commandes: Commande[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const statutConfig: Record<string, { label: string; color: string; dot: string; icon: any }> = {
  en_attente_paiement: {
    label: 'En attente de validation',
    color: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    dot: 'bg-amber-400',
    icon: Clock,
  },
  paiement_recu: {
    label: 'Paiement confirmé',
    color: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    dot: 'bg-blue-400',
    icon: CreditCard,
  },
  en_traitement: {
    label: 'En cours de traitement',
    color: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    dot: 'bg-purple-400',
    icon: RefreshCw,
  },
  livree: {
    label: 'Livrée',
    color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    dot: 'bg-emerald-400',
    icon: CheckCircle,
  },
  annulee: {
    label: 'Annulée',
    color: 'bg-red-500/15 text-red-300 border-red-500/25',
    dot: 'bg-red-400',
    icon: XCircle,
  },
}

const jeuImages: Record<string, string> = {
  'Free Fire': '/images/freefire-diamonds.png',
  'PUBG Mobile': '/images/pubg-uc.png',
  'Mobile Legends': '/images/ml-diamonds.png',
}

const etapes = ['en_attente_paiement', 'paiement_recu', 'en_traitement', 'livree']

export default function CommandeClient({ commandes }: Props) {

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">

      {/* Header */}
      <header className="border-b border-white/5 backdrop-blur-md bg-[#0f0f1a]/80 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/catalogue" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors">
            <ArrowLeft size={16} />
            Retour au catalogue
          </a>
          <div className="flex items-center gap-4">
            {/*
            <button
              onClick={}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={16} />
            </button>
            */}
            <button
              onClick={() => logout()}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Mes commandes</h1>
          <p className="text-slate-400 text-sm">
            Suivez l`état de vos commandes en temps réel
          </p>
        </div>

        { commandes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-white font-medium mb-1">Aucune commande pour le moment</p>
            <p className="text-slate-400 text-sm mb-6">
              Va dans le catalogue pour recharger tes jetons
            </p>
            <a
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              Voir le catalogue
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {commandes.map((commande) => {
              const config = statutConfig[commande.statut]
              const Icon = config.icon
              const etapeActuelle = etapes.indexOf(commande.statut)
              const estAnnulee = commande.statut === 'annulee'

              return (
                <div
                  key={commande.id}
                  className="bg-white/5 border border-white/5 rounded-2xl p-5"
                >
                  {/* Header card */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center overflow-hidden">
                        {jeuImages[commande.offres?.jeux?.nom] ? (
                          <Image
                            src={jeuImages[commande.offres?.jeux?.nom]}
                            alt={commande.offres?.jeux?.nom}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg">🎮</span>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {commande.offres?.jeux?.nom}
                        </p>
                        <p className="text-purple-400 text-xs">{commande.offres?.label}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">
                        {commande.montant_ariary.toLocaleString()} Ar
                      </p>
                      <p className="text-slate-500 text-xs">
                        {new Date(commande.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Statut badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium mb-4 ${config.color}`}>
                    <Icon size={12} />
                    {config.label}
                  </div>

                  {/* Progress bar (sauf si annulée) */}
                  {!estAnnulee && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        {['Commande', 'Paiement', 'Traitement', 'Livré'].map((label, i) => (
                          <div key={label} className="flex-1 flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 transition-all ${
                              i <= etapeActuelle
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/10 text-slate-500'
                            }`}>
                              {i < etapeActuelle ? '✓' : i + 1}
                            </div>
                            <span className={`text-xs ${i <= etapeActuelle ? 'text-slate-300' : 'text-slate-600'}`}>
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${(etapeActuelle / (etapes.length - 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Détails */}
                  <div className="border-t border-white/5 pt-3 flex justify-between text-xs">
                    <div>
                      <p className="text-slate-500 mb-0.5">ID Joueur</p>
                      <p className="text-gray-300 font-mono">{commande.player_id_jeu}</p>
                    </div>
                    {commande.server_id && (
                      <div>
                        <p className="text-slate-500 mb-0.5">Serveur</p>
                        <p className="text-gray-300 font-mono">{commande.server_id}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-slate-500 mb-0.5">Paiement</p>
                      <p className="text-gray-300">
                        {commande.paiements?.[0]?.methode?.toUpperCase()} · {commande.paiements?.[0]?.reference_mvola}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}