// services/email/email.service.ts
import { transporter } from '@/lib/nodemailer/client'
import { nouvelleCommandeTemplate } from './templates/nouvelle-commande'
import { commandeValideeTemplate } from './templates/commande-validee'
import { commandeRefuseeTemplate } from './templates/commande-refusee'

const FROM = process.env.GMAIL_USER || 'vintsy093@gmail.com'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'vintsy093@gmail.com'

// Envoi email admin (nouvelle commande)
export async function sendNouvelleCommandeEmail(data: {
  client: string
  jeu: string
  offre: string
  montant: number
}) {
  try {
    const result = await transporter.sendMail({
      from: `"NovaLoot" <${FROM}>`,
      to: ADMIN_EMAIL,
      subject: '🔔 Nouvelle commande NovaLoot',
      html: nouvelleCommandeTemplate(data)
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email admin:', error)
    throw error
  }
}

// Envoi email validation
export async function sendCommandeValideeEmail(data: {
  email: string
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}) {
  try {
    const result = await transporter.sendMail({
      from: `"NovaLoot" <${FROM}>`,
      to: data.email,
      subject: '✅ Votre commande a été validée',
      html: commandeValideeTemplate({
        client: data.client,
        jeu: data.jeu,
        offre: data.offre,
        montant: data.montant,
        playerId: data.playerId
      })
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email validation:', error)
    throw error
  }
}

// Envoi email refus
export async function sendCommandeRefuseeEmail(data: {
  email: string
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}) {
  try {
    const result = await transporter.sendMail({
      from: `"NovaLoot" <${FROM}>`,
      to: data.email,
      subject: '❌ Votre commande a été refusée',
      html: commandeRefuseeTemplate({
        client: data.client,
        jeu: data.jeu,
        offre: data.offre,
        montant: data.montant,
        playerId: data.playerId
      })
    })

    return result
  } catch (error) {
    console.error('Erreur envoi email refus:', error)
    throw error
  }
}
