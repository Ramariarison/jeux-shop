const NTFY_TOPIC = process.env.NTFY_TOPIC!

type NotificationData = {
  client: string
  jeu: string
  offre: string
  montant: number
}

export async function sendAdminNotification(data: NotificationData) {
  try {
    const response = await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        Title: 'Nouvelle commande NovaLoot',
        Priority: '5',
        Tags: 'money'
      },
      body: `Une nouvelle commande vient d'être effectuée.

Client : ${data.client}
Jeu : ${data.jeu}
Offre : ${data.offre}
Montant : ${data.montant.toLocaleString()} Ar`
    })

    if (!response.ok) {
      throw new Error("Impossible d'envoyer la notification ntfy.")
    }
  } catch (error) {
    console.error('Erreur ntfy :', error)
  }
}
