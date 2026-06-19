import { createClient } from "@/lib/supabase/server"
import { getCurrentUser } from "./user.service"
import { findCommande } from "@/repositories/commande.repository"

export async function getCommandeById() {

  const supabase = await createClient()

  const user = await getCurrentUser()

  const user_id = user?.id

  const { data, error } = await findCommande(supabase, user_id)

  if (error) throw error

  return data

}