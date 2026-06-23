import { useState, useEffect, useCallback } from 'react'
import { getAllCommande, updateCommandeStatutComplet } from '@/services/commande.service'
import { CheckCircle, Clock, CreditCard, TrendingUp } from 'lucide-react'

type Commande = {
  id: string
  player_id_jeu: string
  server_id: string | null
  montant_ariary: number
  montant_usd: number
  statut: string
  created_at: string
  users: { nom: string; email: string; telephone: string }
  offres: { label: string; jeux: { nom: string } }
  paiements: {
    id: string
    methode: string
    reference_mvola: string
    statut: string
    montant: number
  }[]
}

export function useCommandes() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Charger les données
  async function loadData() {
    try {
        const data = await getAllCommande()
        setCommandes(data || [])
    } catch (err) {
        console.error("Erreur:", err)
        setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
        setLoading(false)
    }
  }
  
  // Mettre à jour le statut
  async function updateStatut(commandeId: string, newStatut: string) {
    setActionLoading(true)
    setError(null)

    try {
        const updatePaiement = newStatut === 'paiement_recu'

        await updateCommandeStatutComplet(
        commandeId,
        newStatut,
        updatePaiement
        )

        await loadData()

        return true
    } catch (err) {
        console.error("Erreur lors de la mise à jour:", err)
        setError(err instanceof Error ? err.message : 'Erreur de mise à jour')
        return false
    } finally {
        setActionLoading(false)
    }
  }

    // Chargement initial
  useEffect(() => {
    async function init() {
        await loadData()
    }

    init()
  }, [])

  // Filtrer les commandes par statut
  const getCommandesByStatut = useCallback((statut: string) => {
    if (statut === 'tous') return commandes
    return commandes.filter(c => c.statut === statut)
  }, [commandes])

  // Calculer les statistiques
  const getStats = useCallback(() => {
    return [
      { label: 'Total', value: commandes.length, color: 'text-white', bg: 'bg-white/10', icon: TrendingUp },
      { label: 'En attente', value: commandes.filter(c => c.statut === 'en_attente_paiement').length, color: 'text-amber-300', bg: 'bg-amber-500/10', icon: Clock },
      { label: 'Paiement reçu', value: commandes.filter(c => c.statut === 'paiement_recu').length, color: 'text-blue-300', bg: 'bg-blue-500/10', icon: CreditCard },
      { label: 'Livrées', value: commandes.filter(c => c.statut === 'livree').length, color: 'text-emerald-300', bg: 'bg-emerald-500/10', icon: CheckCircle },
    ]
  }, [commandes])

  return {
    // États
    commandes,
    loading,
    error,
    actionLoading,
    
    // Actions
    loadData,
    updateStatut,
    getCommandesByStatut,
    getStats,
    
    // Utilitaire
    reload: loadData,
  }
}