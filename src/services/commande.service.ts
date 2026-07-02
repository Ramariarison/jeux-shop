'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from './user.service'
import {
  findCommande,
  findAllCommande,
  updateCommandeStatut,
  updatePaiementStatut,
  findCommandeComplete
} from '@/repositories/commande.repository'
import {
  sendCommandeRefuseeEmail,
  sendCommandeValideeEmail,
  sendNouvelleCommandeEmail
} from './email/email.service'
import { sendAdminNotification } from '@/services/notification/ntfy.service'

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
}

type Props = {
  offre: Offre
  jeu: Jeu
  playerId: string
  methodePaiement: string
  referencePaiement: string
}

export async function createCommande({
  offre,
  jeu,
  playerId,
  methodePaiement,
  referencePaiement
}: Props) {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const { data: userData } = await supabase
    .from('users')
    .select('nom, email')
    .eq('id', user?.id)
    .single()

  try {
    // Créer la commande
    const { data: commande, error: errCommande } = await supabase
      .from('commandes')
      .insert({
        user_id: user?.id,
        offre_id: offre.id,
        player_id_jeu: playerId,
        montant_ariary: offre.prix_ariary,
        montant_usd: offre.prix_usd,
        statut: 'en_attente_paiement'
      })
      .select()
      .single()

    if (errCommande || !commande) {
      return {
        success: false,
        error: 'Erreur lors de la création de la commande',
        data: null
      }
    }

    // Enregistrer le paiement
    const { error: errPaiement } = await supabase.from('paiements').insert({
      commande_id: commande.id,
      methode: methodePaiement,
      reference_mvola: referencePaiement,
      statut: 'en_attente',
      montant: offre.prix_ariary
    })

    if (errPaiement) {
      // Supprimer la commande si le paiement échoue
      await supabase.from('commandes').delete().eq('id', commande.id)

      return {
        success: false,
        error: "Erreur lors de l'enregistrement du paiement",
        data: null
      }
    }

    try {
      await sendNouvelleCommandeEmail({
        client: userData?.nom ?? '',
        jeu: jeu.nom,
        offre: offre.label,
        montant: offre.prix_ariary
      })
    } catch (error) {
      console.error('Erreur Resend :', error)
    }

    try {
      await sendAdminNotification({
        client: userData?.nom ?? '',
        jeu: jeu.nom,
        offre: offre.label,
        montant: offre.prix_ariary
      })
    } catch (error) {
      console.error('Erreur ntfy :', error)
    }

    return {
      success: true,
      data: commande,
      error: ''
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Une erreur inattendue est survenue'

    return {
      success: false,
      error: errorMessage,
      data: null
    }
  }
}

export async function getCommandeById() {
  const supabase = await createClient()
  const user = await getCurrentUser()
  const user_id = user?.id
  const { data, error } = await findCommande(supabase, user_id)

  if (error) throw error

  return data
}

export async function getAllCommande() {
  const supabase = await createClient()
  const { data, error } = await findAllCommande(supabase)

  if (error) throw error

  return data
}

export async function updateCommandeStatutComplet(
  commandeId: string,
  newStatut: string,
  updatePaiement: boolean
) {
  const supabase = await createClient()

  // Mise à jour du statut
  const { data: commandeData, error: commandeError } = await updateCommandeStatut(
    supabase,
    commandeId,
    newStatut
  )

  if (commandeError) throw commandeError

  // Mise à jour du paiement
  if (updatePaiement) {
    const { error: paiementError } = await updatePaiementStatut(supabase, commandeId, 'confirme')

    if (paiementError) throw paiementError
  }

  // Récupérer toutes les informations nécessaires
  const { data: commande, error } = await findCommandeComplete(supabase, commandeId)

  if (error) throw error

  const utilisateur = commande?.users.at(0)
  const offre = commande?.offres.at(0)
  const jeu = offre?.jeux.at(0)

  if (!utilisateur || !offre || !jeu) {
    throw new Error('Informations de la commande incomplètes.')
  }

  // Envoi du mail
  if (newStatut === 'paiement_recu') {
    await sendCommandeValideeEmail({
      email: utilisateur.email,
      client: utilisateur.nom,
      jeu: jeu.nom,
      offre: offre.label,
      montant: commande.montant_ariary,
      playerId: commande.player_id_jeu
    })
  }

  if (newStatut === 'annulee') {
    await sendCommandeRefuseeEmail({
      email: utilisateur.email,
      client: utilisateur.nom,
      jeu: jeu.nom,
      offre: offre.label,
      montant: commande.montant_ariary,
      playerId: commande.player_id_jeu
    })
  }

  return commandeData
}
