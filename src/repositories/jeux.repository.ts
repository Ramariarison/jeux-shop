// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getJeuxActifs(supabase: any) {
  return supabase.from('jeux').select('id, nom, slug, logo_url').eq('actif', true)
}
