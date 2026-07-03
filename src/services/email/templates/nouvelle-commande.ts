// templates/nouvelle-commande.ts
type NouvelleCommandeTemplateProps = {
  client: string
  jeu: string
  offre: string
  montant: number
  adminUrl?: string
}

export function nouvelleCommandeTemplate({
  client,
  jeu,
  offre,
  montant,
  adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://novalootmada.vercel.app/dashboard'
}: NouvelleCommandeTemplateProps) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouvelle commande - NovaLoot</title>
    </head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f8fafc;">
      
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:30px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;padding:40px;">
              
              <!-- Header -->
              <tr>
                <td style="padding-bottom:20px;border-bottom:2px solid #f3f4f6;">
                  <h1 style="margin:0;color:#6d28d9;font-size:28px;font-weight:700;">
                    🚀 NovaLoot
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding:30px 0;">
                  
                  <h2 style="margin:0 0 20px 0;color:#111827;font-size:24px;font-weight:600;">
                    🆕 Nouvelle commande reçue
                  </h2>
                  
                  <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 24px 0;">
                    Une nouvelle commande vient d'être effectuée sur NovaLoot.
                  </p>
                  
                  <!-- Détails de la commande -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;padding:20px;margin:0 0 24px 0;">
                    <tr>
                      <td style="padding-bottom:12px;">
                        <h3 style="margin:0;color:#111827;font-size:16px;font-weight:600;">
                          📦 Détails de la commande
                        </h3>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:4px 0;">
                        <table width="100%" cellpadding="4" cellspacing="0">
                          <tr>
                            <td style="color:#4b5563;font-size:14px;width:40%;"><strong>Client :</strong></td>
                            <td style="color:#111827;font-size:14px;font-weight:500;">${client}</td>
                          </tr>
                          <tr>
                            <td style="color:#4b5563;font-size:14px;"><strong>Jeu :</strong></td>
                            <td style="color:#111827;font-size:14px;">${jeu}</td>
                          </tr>
                          <tr>
                            <td style="color:#4b5563;font-size:14px;"><strong>Offre :</strong></td>
                            <td style="color:#111827;font-size:14px;">${offre}</td>
                          </tr>
                          <tr>
                            <td style="color:#4b5563;font-size:14px;"><strong>Montant :</strong></td>
                            <td style="color:#111827;font-size:14px;font-weight:600;">${montant.toLocaleString()} Ar</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Bouton Admin -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding:0 0 24px 0;">
                        <a href="${adminUrl}" style="display:inline-block;background:#6d28d9;color:#ffffff;padding:12px 32px;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px;">
                          📊 Voir dans l'admin
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0;">
                    ⏱️ Traitez cette commande dès que possible.
                  </p>
                  
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding-top:20px;border-top:2px solid #f3f4f6;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="color:#6b7280;font-size:13px;">
                        <p style="margin:0;">
                          NovaLoot - Votre plateforme de confiance
                        </p>
                        <p style="margin:4px 0 0 0;font-size:11px;">
                          Cet email est destiné aux administrateurs uniquement.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
      
    </body>
    </html>
  `
}
