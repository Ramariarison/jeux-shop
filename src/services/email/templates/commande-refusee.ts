type Props = {
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}

export function commandeRefuseeTemplate({ client, jeu, offre, montant, playerId }: Props) {
  return `
    <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:30px">
      <div style="max-width:600px;margin:auto;background:white;border-radius:16px;padding:32px;border:1px solid #e5e7eb">

        <h1 style="margin:0;color:#6d28d9;">
          NovaLoot
        </h1>

        <h2 style="margin-top:24px;color:#111827;">
          Votre commande a été refusée ❌
        </h2>

        <p style="color:#374151;">
          Bonjour <strong>${client}</strong>,
        </p>

        <p style="color:#374151;">
          Nous n'avons pas pu confirmer votre paiement. Votre commande a donc été refusée.
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
            <span style="color:#dc2626;font-weight:bold;">
              Refusée
            </span>
          </p>

        </div>

        <p style="color:#374151;">
          Si vous pensez qu'il s'agit d'une erreur, vérifiez votre référence de paiement puis contactez notre équipe afin que nous puissions examiner votre dossier.
        </p>

        <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

        <p style="font-size:13px;color:#6b7280;">
          Cet email a été envoyé automatiquement par NovaLoot.
        </p>

      </div>
    </div>
  `
}
