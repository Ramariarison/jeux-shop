type Props = {
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}

export function commandeValideeTemplate({ client, jeu, offre, montant, playerId }: Props) {
  return `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px">
      <div style="max-width:600px;margin:auto;background:white;border-radius:16px;padding:32px;border:1px solid #e5e7eb">

        <h1 style="margin:0;color:#6d28d9;">
          NovaLoot
        </h1>

        <h2 style="margin-top:24px;color:#111827;">
          Votre commande a été validée ✅
        </h2>

        <p style="color:#374151;">
          Bonjour <strong>${client}</strong>,
        </p>

        <p style="color:#374151;">
          Nous avons bien reçu et vérifié votre paiement.
          Votre commande est désormais <strong>validée</strong> et sera livrée très prochainement.
        </p>

        <div style="margin:24px 0;padding:20px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb">

          <h3 style="margin-top:0;color:#111827;">
            Récapitulatif de votre commande
          </h3>

          <p><strong>Jeu :</strong> ${jeu}</p>

          <p><strong>Offre :</strong> ${offre}</p>

          <p><strong>Montant :</strong> ${montant.toLocaleString()} Ar</p>

          <p><strong>ID Joueur :</strong> ${playerId}</p>

          <p>
            <strong>Statut :</strong>
            <span style="color:#16a34a;font-weight:bold;">
              Validée
            </span>
          </p>

        </div>

        <p style="color:#374151;">
          Merci de votre confiance et bon jeu !
        </p>

        <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

        <p style="font-size:13px;color:#6b7280;">
          Cet email a été envoyé automatiquement par NovaLoot.
        </p>

      </div>
    </div>
  `
}
