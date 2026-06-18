import CatalogueClient from '@/components/catalogue/catalogueClient'
import { getCatalogue } from '@/services/catalogue.service'
import { getCurrentUser } from '@/services/user.service'

export default async function Page(){

    const jeux = await getCatalogue()
    const user = await getCurrentUser()

    return(
        <CatalogueClient
            jeux={jeux}
            user={user}
        />
    )
}