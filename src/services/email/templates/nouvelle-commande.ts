type NouvelleCommandeTemplateProps = {
  client: string
  jeu: string
  offre: string
  montant: number
}

export function nouvelleCommandeTemplate({
  client,
  jeu,
  offre,
  montant
}: NouvelleCommandeTemplateProps) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 30px; background:#f8fafc">
      <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px">

        <h1 style="color:#6d28d9;">
          🚀 NovaLoot
        </h1>

        <h2>Nouvelle commande reçue</h2>

        <p>Une nouvelle commande vient d'être effectuée.</p>

        <table style="width:100%;margin-top:20px">

          <tr>
            <td><strong>Client</strong></td>
            <td>${client}</td>
          </tr>

          <tr>
            <td><strong>Jeu</strong></td>
            <td>${jeu}</td>
          </tr>

          <tr>
            <td><strong>Offre</strong></td>
            <td>${offre}</td>
          </tr>

          <tr>
            <td><strong>Montant</strong></td>
            <td>${montant.toLocaleString()} Ar</td>
          </tr>

        </table>

      </div>
    </div>
  `
}
