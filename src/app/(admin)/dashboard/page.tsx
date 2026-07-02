import DashboardClient from '@/components/dashboard/dashboardClient'
import { getCurrentUser } from '@/services/user.service'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const user = await getCurrentUser()
  const supabase = await createClient()
  const { data: userData } = await supabase
    .from('users')
    .select('nom, email')
    .eq('id', user?.id)
    .single()

  return <DashboardClient userData={userData} />
}
