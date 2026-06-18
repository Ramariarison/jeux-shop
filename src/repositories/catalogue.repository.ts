// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function findCatalogue(supabase: any) {

    return supabase
        .from('jeux')
        .select(`*, offres(*)`)
        .eq('actif', true)
        .order('nom')

}