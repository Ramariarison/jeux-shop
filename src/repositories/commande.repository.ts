import { SupabaseClient } from '@supabase/supabase-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findCommande(supabase: any, user_id: any) {
  return supabase
    .from('commandes')
    .select(`*, offres(label, jeux(nom)), paiements(methode, reference_mvola, statut)`)
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
}

export async function findAllCommande(supabase: SupabaseClient) {
  return supabase
    .from('commandes')
    .select(
      `*, users(nom, email, telephone), offres(label, jeux(nom)), paiements(id, methode, reference_mvola, statut, montant)`
    )
    .order('created_at', { ascending: false })
}

export async function findCommandeComplete(supabase: SupabaseClient, commandeId: string) {
  return supabase
    .from('commandes')
    .select(
      `
      player_id_jeu,
      montant_ariary,
      users (
        nom,
        email
      ),
      offres (
        label,
        jeux (
          nom
        )
      )
    `
    )
    .eq('id', commandeId)
    .single()
}

export async function updateCommandeStatut(
  supabase: SupabaseClient,
  commandeId: string,
  newStatut: string
) {
  return await supabase
    .from('commandes')
    .update({
      statut: newStatut,
      updated_at: new Date().toISOString()
    })
    .eq('id', commandeId)
}

export async function updatePaiementStatut(
  supabase: SupabaseClient,
  commandeId: string,
  statut: string
) {
  return await supabase
    .from('paiements')
    .update({
      statut: statut,
      paid_at: new Date().toISOString()
    })
    .eq('commande_id', commandeId)
}
