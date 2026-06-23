'use server'

import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./user.service"
import { findCommande, findAllCommande, updateCommandeStatut, updatePaiementStatut } from "@/repositories/commande.repository"

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
) 
{
  const supabase = await createClient()
  
  // Maj status commande
  const { data: commandeData, error: commandeError } = await updateCommandeStatut(
    supabase,
    commandeId,
    newStatut
  )
  
  if (commandeError) throw commandeError

  // Maj status paiement
  if (updatePaiement) {
    const paiementStatut = 'confirme'
    const { error: paiementError } = await updatePaiementStatut(
      supabase,
      commandeId,
      paiementStatut
    )
    
    if (paiementError) throw paiementError

    return commandeData
  }
}