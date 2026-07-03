// services/email/email.service.ts
import { sgMail } from '@/lib/sendgrid/sendgrid'
import { nouvelleCommandeTemplate } from './templates/nouvelle-commande'
import { commandeValideeTemplate } from './templates/commande-validee'
import { commandeRefuseeTemplate } from './templates/commande-refusee'

const FROM = process.env.SENDGRID_FROM_EMAIL || 'vintsy093@gmail.com'

export async function sendNouvelleCommandeEmail(data: {
  client: string
  jeu: string
  offre: string
  montant: number
}) {
  console.log('Envoi nouvelle commande à admin')

  try {
    const result = await sgMail.send({
      to: process.env.ADMIN_EMAIL!,
      from: FROM,
      subject: '🔔 Nouvelle commande NovaLoot',
      html: nouvelleCommandeTemplate(data)
    })

    console.log('Email admin envoyé avec succès')
    return result
  } catch (error) {
    console.error('Erreur envoi email admin:', error)
    throw error
  }
}

export async function sendCommandeValideeEmail(data: {
  email: string
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}) {
  console.log(`Envoi email validation à ${data.email}...`)

  try {
    const result = await sgMail.send({
      to: data.email,
      from: FROM,
      subject: '✅ Votre commande a été validée',
      html: commandeValideeTemplate({
        client: data.client,
        jeu: data.jeu,
        offre: data.offre,
        montant: data.montant,
        playerId: data.playerId
      })
    })

    console.log('Email validation envoyé avec succès')
    return result
  } catch (error) {
    console.error('Erreur envoi email validation:', error)
    throw error
  }
}

export async function sendCommandeRefuseeEmail(data: {
  email: string
  client: string
  jeu: string
  offre: string
  montant: number
  playerId: string
}) {
  console.log(`Envoi email refus à ${data.email}...`)

  try {
    const result = await sgMail.send({
      to: data.email,
      from: FROM,
      subject: '❌ Votre commande a été refusée',
      html: commandeRefuseeTemplate({
        client: data.client,
        jeu: data.jeu,
        offre: data.offre,
        montant: data.montant,
        playerId: data.playerId
      })
    })

    console.log('Email refus envoyé avec succès')
    return result
  } catch (error) {
    console.error('Erreur envoi email refus:', error)
    throw error
  }
}
