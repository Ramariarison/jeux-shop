import { logout } from "@/app/(auth)/action"
import DashboardClient from "@/components/dashboard/dashboardClient"
import { getCurrentUser } from "@/services/user.service"

export default async function Page() {

  const user = await getCurrentUser()

  return(
    <DashboardClient 
      user={user}
      disconnect={logout}
    />
  )

}