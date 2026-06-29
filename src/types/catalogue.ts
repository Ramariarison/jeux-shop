export type Offre = {
  id: string
  label: string
  quantite_jetons: number
  prix_ariary: number
  prix_usd: number
}

export type Jeu = {
  id: string
  nom: string
  slug: string
  logo_url: string
  offres: Offre[]
}
