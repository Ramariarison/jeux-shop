export type Commande = {
  id: string
  player_id_jeu: string
  server_id: string | null
  montant_ariary: number
  montant_usd: number
  statut: string
  created_at: string
  offres: { label: string; jeux: { nom: string } }
  paiements: { methode: string; reference_mvola: string; statut: string }[]
}