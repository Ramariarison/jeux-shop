type Props = {
  client: string
}

export function commandeValideeTemplate({ client }: Props) {
  return `
    <div style="font-family:Arial,sans-serif;padding:30px;background:#f8fafc">

      <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px">

        <h1 style="color:#6d28d9">
          🚀 NovaLoot
        </h1>

        <h2>Commande validée ✅</h2>

        <p>Bonjour <strong>${client}</strong>,</p>

        <p>
          Votre paiement a été vérifié.
        </p>

        <p>
          Votre commande est maintenant en cours de traitement.
        </p>

        <p>
          Merci de votre confiance ❤️
        </p>

      </div>

    </div>
  `
}
