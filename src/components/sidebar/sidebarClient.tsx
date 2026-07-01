'use client'

import { useState } from 'react'
import { GamepadIcon, Package, Users, LogOut, Menu, X } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { logout } from '@/app/(auth)/action'

type Props = {
  active: 'commandes' | 'jeux' | 'offres' | 'utilisateurs'
  user?: User | null
}

const menu = [
  { key: 'commandes', label: 'Commandes', icon: GamepadIcon, href: '/dashboard' },
  { key: 'jeux', label: 'Jeux', icon: GamepadIcon, href: '/dashboard/jeux' },
  { key: 'offres', label: 'Offres', icon: Package, href: '/dashboard/offres' },
  { key: 'utilisateurs', label: 'Utilisateurs', icon: Users, href: '/dashboard/utilisateurs' }
]

function NavMenu({ active, onClose }: { active: string; onClose?: () => void }) {
  return (
    <nav className="p-4 flex-1">
      <p className="text-slate-600 text-xs uppercase tracking-widest mb-3 px-2">Menu</p>
      {menu.map(({ key, label, icon: Icon, href }) => (
        <a
          key={key}
          href={href}
          onClick={onClose}
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
  )
}

function SidebarHeader() {
  return (
    <div className="p-3 border-b border-white/5">
      <div className="flex items-center gap-3">
        <img src="/NovaLooot.png" alt="NovaLoot" className="h-8 w-auto object-contain" />
        <div>
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
          <p className="text-slate-500 text-xs">Administration</p>
        </div>
      </div>
    </div>
  )
}

function SidebarFooter({ user }: { user?: User | null }) {
  return (
    <div className="p-4 border-t border-white/5">
      <div className="px-3 mb-1">
        <p className="text-white text-xs font-medium">{user?.email}</p>
        <p className="text-slate-500 text-xs">Connecté</p>
      </div>
      <button
        onClick={logout}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
      >
        <LogOut size={14} />
        Déconnexion
      </button>
    </div>
  )
}

export default function SidebarClient({ active, user }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Bouton burger mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 bg-[#13131f] border border-white/10 p-2 rounded-xl text-slate-400 hover:text-white transition-all"
      >
        <Menu size={20} />
      </button>

      {/* Overlay mobile */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar mobile (drawer) */}
      <aside
        className={`md:hidden fixed left-0 top-0 h-full w-64 bg-[#13131f] border-r border-white/5 z-40 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-slate-500 hover:text-white"
        >
          <X size={18} />
        </button>
        <SidebarHeader />
        <NavMenu active={active} onClose={() => setOpen(false)} />
        <SidebarFooter user={user} />
      </aside>

      {/* Sidebar desktop (fixe) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#13131f] border-r border-white/5 z-20 flex-col">
        <SidebarHeader />
        <NavMenu active={active} />
        <SidebarFooter user={user} />
      </aside>
    </>
  )
}
