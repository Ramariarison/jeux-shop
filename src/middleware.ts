import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  // Routes publiques accessibles sans connexion
  const publicRoutes = ['/login', '/register']
  const isPublicRoute = publicRoutes.some(r => pathname.startsWith(r))

  // Page d'accueil et catalogue accessibles à tous
  const openRoutes = ['/', '/catalogue']
  const isOpenRoute = openRoutes.includes(pathname)

  // Pas connecté → redirige vers /login (sauf routes ouvertes/publiques)
  if (!user && !isPublicRoute && !isOpenRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Connecté → vérifie le rôle pour les routes admin
  if (user && pathname.startsWith('/dashboard')) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.redirect(new URL('/catalogue', request.url))
    }
  }

  // Déjà connecté → redirige vers /catalogue si tente d'accéder à /login ou /register
  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL('/catalogue', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logos|.*\\.png$).*)',
  ],
}