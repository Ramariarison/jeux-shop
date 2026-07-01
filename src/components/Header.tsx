/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { ArrowRight, LogIn, UserPlus, Wifi } from 'lucide-react'
import { User } from '@supabase/supabase-js'

interface Props {
  user: User | null
}

export default function Header({ user }: Props) {
  return (
    <header className="border-b border-white/5 backdrop-blur-md bg-[#0f0f1a]/80 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="shrink-0">
            <img src="/NovaLooot.png" alt="NovaLoot" className="h-8 w-auto object-contain" />
          </Link>
          <h2 className="text-lg font-semibold">
            <span
              style={{
                background: 'linear-gradient(to right, #1DA1FF, #3B82F6, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Nova
            </span>{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #FDE047, #F59E0B, #F97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Loot
            </span>
          </h2>
          <div className="relative ml-2 flex items-center justify-center w-3 h-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#jeux" className="text-slate-400 hover:text-white text-sm transition-colors">
            Jeux
          </Link>
          <Link
            href="#comment"
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Comment ça marche
          </Link>
          <Link href="#faq" className="text-slate-400 hover:text-white text-sm transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/catalogue"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all duration-200"
            >
              Catalogue <ArrowRight size={14} />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
              >
                <LogIn size={16} />
                <span>Connexion</span>
              </Link>

              <Link
                href="/register"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-xl transition-all duration-200"
              >
                <UserPlus size={16} />
                <span>S&apos;inscrire</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
