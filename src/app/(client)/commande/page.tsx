import CommandeClient from "@/components/commandes/commandeClient/commandeClient"
import { getCommandeById } from "@/services/commande.service"

export default async function Page() {

  const commandes = await getCommandeById();

  return(
    <CommandeClient commandes={commandes}/>
  )
}