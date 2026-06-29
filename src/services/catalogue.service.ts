import { createClient } from '@/lib/supabase/server'
import { findCatalogue } from '@/repositories/catalogue.repository'

export async function getCatalogue() {
  const supabase = await createClient()

  const { data, error } = await findCatalogue(supabase)

  if (error) throw error

  return data
}
