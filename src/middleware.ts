import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  const publicRoutes = ['/login', '/register']
  const isPublicRoute = publicRoutes.some(r => pathname.startsWith(r))

  const openRoutes = ['/', '/catalogue']
  const isOpenRoute = openRoutes.includes(pathname)

  // Récupère le rôle si connecté
  let role: string | null = null
  if (user) {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()
    role = userData?.role ?? null
  }

  // Pas connecté → redirige vers /login (sauf routes ouvertes/publiques)
  if (!user && !isPublicRoute && !isOpenRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Connecté mais pas admin → bloque l'accès au dashboard
  if (user && pathname.startsWith('/dashboard') && role !== 'admin') {
    return NextResponse.redirect(new URL('/catalogue', request.url))
  }

  // Admin connecté → redirige vers /dashboard s'il va sur / ou /catalogue
  if (user && role === 'admin' && isOpenRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Déjà connecté → redirige vers /catalogue ou /dashboard si tente /login ou /register
  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL(role === 'admin' ? '/dashboard' : '/catalogue', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logos|.*\\.png$).*)',
  ],
}