import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  // pour éviter les erreurs de timeout
  pool: true,
  maxConnections: 1,
  rateDelta: 1000,
  rateLimit: 5
})
