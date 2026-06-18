'use server'

import { createClient } from "@/lib/supabase/server"

export async function getCommandes() {
    const supabase = await createClient()

      const { data, error } = await supabase
        .from('jeux')
        .select('*, offres(*)')
        .eq('actif', true)
        .order('nom')

    if(error) throw error

    return data
}