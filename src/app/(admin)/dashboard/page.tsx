'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, RefreshCw } from 'lucide-react'
import Sidebar from '../Sidebar'
import { useCommandes } from '@/hooks/useCommandes'
import { Commande } from '@/types/commande'

// constante UI
const statutConfig: Record<string, { label: string; color: string; dot: string }> = {
  en_attente_paiement: {
    label: 'En attente',
    color: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    dot: 'bg-amber-400',
  },
  paiement_recu: {
    label: 'Paiement reçu',
    color: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    dot: 'bg-blue-400',
  },
  en_traitement: {
    label: 'En traitement',
    color: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    dot: 'bg-purple-400',
  },
  livree: {
    label: 'Livrée',
    color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    dot: 'bg-emerald-400',
  },
  annulee: {
    label: 'Annulée',
    color: 'bg-red-500/15 text-red-300 border-red-500/25',
    dot: 'bg-red-400',
  },
}

export default function DashboardPage() {

  const {
    commandes,
    loading,
    error,
    actionLoading,
    updateStatut,
    getCommandesByStatut,
    getStats,
    reload
  } = useCommandes()

  const [filtreStatut, setFiltreStatut] = useState('tous')
  const [commandeSelectionnee, setCommandeSelectionnee] = useState<Commande | null>(null)

  const commandesFiltrees = getCommandesByStatut(filtreStatut)
  const stats = getStats()

  const handleUpdateStatut = async (commandeId: string, newStatut: string) => {
    const success = await updateStatut(commandeId, newStatut)
    if (success) {
      setCommandeSelectionnee(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Sidebar active="commandes" />
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Commandes</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {commandes.length} commande{commandes.length > 1 ? 's' : ''} au total
            </p>
          </div>
          <button
            onClick={reload}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-400 hover:text-white text-sm transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Chargement...' : 'Actualiser'}
          </button>
        </div>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            Erreur: {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, color, bg, icon: Icon }) => (
            <div key={label} className={`${bg} border border-white/5 rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-sm">{label}</p>
                <Icon size={16} className={color} />
              </div>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/5 rounded-2xl p-1.5 w-fit">
          {['tous', ...Object.keys(statutConfig)].map((s) => (
            <button
              key={s}
              onClick={() => setFiltreStatut(s)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                filtreStatut === s
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s === 'tous' ? 'Toutes' : statutConfig[s].label}
            </button>
          ))}
        </div>

        {/* Tableau */}
        {loading ? (
          <div className="text-center text-slate-500 py-20 animate-pulse">Chargement...</div>
        ) : commandesFiltrees.length === 0 ? (
          <div className="text-center text-slate-500 py-20">Aucune commande</div>
        ) : (
          <div className="bg-[#13131f] border border-white/5 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <div className="col-span-2">Jeu / Offre</div>
              <div className="col-span-2">Client</div>
              <div className="col-span-2">ID Joueur</div>
              <div className="col-span-2">Paiement</div>
              <div className="col-span-1">Montant</div>
              <div className="col-span-2">Statut</div>
              <div className="col-span-1">Date</div>
            </div>

            {/* Lignes du tableau */}
            {commandesFiltrees.map((commande, index) => (
              <div
                key={commande.id}
                onClick={() => setCommandeSelectionnee(commande)}
                className={`grid grid-cols-12 gap-4 px-6 py-4 cursor-pointer transition-all hover:bg-white/5 ${
                  index !== commandesFiltrees.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                {/* Jeu */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">
                      {commande.offres?.jeux?.nom}
                    </p>
                    <p className="text-purple-400 text-xs truncate">{commande.offres?.label}</p>
                  </div>
                </div>

                {/* Client */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-white text-sm truncate">{commande.users?.nom}</p>
                    <p className="text-slate-500 text-xs">{commande.users?.telephone}</p>
                  </div>
                </div>

                {/* ID Joueur */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-white text-sm font-mono">{commande.player_id_jeu}</p>
                    {commande.server_id && (
                      <p className="text-slate-500 text-xs">Srv: {commande.server_id}</p>
                    )}
                  </div>
                </div>

                {/* Paiement */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <p className="text-slate-300 text-xs font-medium uppercase">
                      {commande.paiements?.[0]?.methode}
                    </p>
                    <p className="text-slate-500 text-xs font-mono">
                      {commande.paiements?.[0]?.reference_mvola}
                    </p>
                  </div>
                </div>

                {/* Montant */}
                <div className="col-span-1 flex items-center">
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {commande.montant_ariary.toLocaleString()}
                    </p>
                    <p className="text-slate-500 text-xs">Ar</p>
                  </div>
                </div>

                {/* Statut */}
                <div className="col-span-2 flex items-center">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${statutConfig[commande.statut]?.color}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${statutConfig[commande.statut]?.dot}`} />
                    <span className="hidden xl:block">{statutConfig[commande.statut]?.label}</span>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-1 flex items-center">
                  <div>
                    <p className="text-slate-400 text-xs">
                      {new Date(commande.created_at).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: 'short'
                      })}
                    </p>
                    <p className="text-slate-600 text-xs">
                      {new Date(commande.created_at).toLocaleTimeString('fr-FR', {
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal (inchangé) */}
      {commandeSelectionnee && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            {/* ... Contenu du modal */}
            
            {/* Actions avec handleUpdateStatut */}
            <div className="space-y-2">
              {commandeSelectionnee.statut === 'en_attente_paiement' && (
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11"
                  onClick={() => handleUpdateStatut(commandeSelectionnee.id, 'paiement_recu')}
                  disabled={actionLoading}
                >
                  <CheckCircle size={16} className="mr-2" /> Confirmer le paiement
                </Button>
              )}
              {/* ... Autres boutons */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}