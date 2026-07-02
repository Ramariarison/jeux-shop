import { resend } from '@/lib/resend/resend'

import { nouvelleCommandeTemplate } from './templates/nouvelle-commande'
import { commandeValideeTemplate } from './templates/commande-validee'
import { commandeRefuseeTemplate } from './templates/commande-refusee'

const FROM = 'NovaLoot <onboarding@resend.dev>'

export async function sendNouvelleCommandeEmail(data: {
  client: string
  jeu: string
  offre: string
  montant: number
}) {
  return resend.emails.send({
    from: FROM,
    to: process.env.ADMIN_EMAIL!,
    subject: '🔔 Nouvelle commande NovaLoot',
    html: nouvelleCommandeTemplate(data)
  })
}

export async function sendCommandeValideeEmail(data: {
  email: string
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}) {
  return resend.emails.send({
    from: FROM,
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
}

export async function sendCommandeRefuseeEmail(data: {
  email: string
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}) {
  return resend.emails.send({
    from: FROM,
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
}
