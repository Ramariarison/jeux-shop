import { createClient } from '@/lib/supabase/server'
import { getJeuxActifs } from '@/repositories/jeux.repository'

export async function getJeux() {
  const supabase = await createClient()

  const { data, error } = await getJeuxActifs(supabase)

  if (error) throw error

  return data
}
