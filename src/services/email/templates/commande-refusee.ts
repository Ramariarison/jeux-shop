type Props = {
  client: string
}

export function commandeRefuseeTemplate({ client }: Props) {
  return `
    <div style="font-family:Arial,sans-serif;padding:30px;background:#f8fafc">

      <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px">

        <h1 style="color:#6d28d9">
          🚀 NovaLoot
        </h1>

        <h2>Commande refusée ❌</h2>

        <p>Bonjour <strong>${client}</strong>,</p>

        <p>
          Nous n'avons pas pu confirmer votre paiement.
        </p>

        <p>
          Merci de vérifier votre transfert puis de nous contacter si besoin.
        </p>

      </div>

    </div>
  `
}
