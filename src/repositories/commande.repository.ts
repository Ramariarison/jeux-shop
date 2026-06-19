// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findCommande(supabase: any, user_id: any) {

    return supabase
      .from('commandes')
      .select(`*, offres(label, jeux(nom)), paiements(methode, reference_mvola, statut)`)
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
}