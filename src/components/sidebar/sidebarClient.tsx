'use client'

import { GamepadIcon, Package, Users, LogOut } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'

type Props = {
  active: 'commandes' | 'jeux' | 'offres' | 'utilisateurs'
  user?: User | null
  logout?: () => void
}

export default function SidebarClient({ active, user, logout }: Props) {

  const menu = [
    { key: 'commandes', label: 'Commandes', icon: GamepadIcon, href: '/dashboard' },
    { key: 'jeux', label: 'Jeux', icon: GamepadIcon, href: '/dashboard/jeux' },
    { key: 'offres', label: 'Offres', icon: Package, href: '/dashboard/offres' },
    { key: 'utilisateurs', label: 'Utilisateurs', icon: Users, href: '/dashboard/utilisateurs' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#13131f] border-r border-white/5 z-20 flex flex-col">
      <div className="p-3 border-b border-white/5">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden">
            <Image
              src="/signature.png"
              alt="Rabbit Shop"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Rabbit Shop</p>
            <p className="text-slate-500 text-xs">Administration</p>
          </div>
        </div>
      </div>

      <nav className="p-4 flex-1">
        <p className="text-slate-600 text-xs uppercase tracking-widest mb-3 px-2">Menu</p>
        {menu.map(({ key, label, icon: Icon, href }) => (
          <a
            key={key}
            href={href}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mb-1 transition-all ${
              active === key
                ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20'
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">

        <div className='px-3 mb-1'>
          <p className="text-white text-xs font-medium">{user?.email}</p>
          <p className="text-slate-500 text-xs">Connecté</p>
        </div>

        <button
          onClick={async () => logout?.()}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}