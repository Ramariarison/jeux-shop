'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Badge } from '@/components/ui/badge'
import Sidebar from '../../Sidebar'
import { Shield, User as UserIcon, Mail, Phone } from 'lucide-react'

type User = {
  id: string
  nom: string
  email: string
  telephone: string
  role: string
  created_at: string
}

export default function UtilisateursPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [filtreRole, setFiltreRole] = useState<'tous' | 'client' | 'admin'>('tous')
  const [updating, setUpdating] = useState<string | null>(null)

  async function fetchUsers() {
    setLoading(true)
    const { data } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setUsers(data)
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  async function toggleRole(user: User) {
    setUpdating(user.id)
    const newRole = user.role === 'admin' ? 'client' : 'admin'
    await supabase.from('users').update({ role: newRole }).eq('id', user.id)
    await fetchUsers()
    setUpdating(null)
  }

  const usersFiltres = filtreRole === 'tous' ? users : users.filter(u => u.role === filtreRole)

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    clients: users.filter(u => u.role === 'client').length,
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Sidebar active="utilisateurs" />

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Utilisateurs</h1>
            <p className="text-slate-500 text-sm mt-0.5">{stats.total} utilisateur(s) au total</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-emerald-500/10 border border-white/5 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">Clients</p>
            <p className="text-3xl font-bold text-emerald-300">{stats.clients}</p>
          </div>
          <div className="bg-purple-500/10 border border-white/5 rounded-2xl p-5">
            <p className="text-slate-400 text-sm mb-1">Admins</p>
            <p className="text-3xl font-bold text-purple-300">{stats.admins}</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/5 rounded-2xl p-1.5 w-fit">
          {(['tous', 'client', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFiltreRole(r)}
              className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                filtreRole === r
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r === 'tous' ? 'Tous' : r === 'admin' ? 'Admins' : 'Clients'}
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <div className="text-center text-slate-500 py-20 animate-pulse">Chargement...</div>
        ) : usersFiltres.length === 0 ? (
          <div className="text-center text-slate-500 py-20">Aucun utilisateur</div>
        ) : (
          <div className="bg-[#13131f] border border-white/5 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
              <div className="col-span-3">Nom</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Téléphone</div>
              <div className="col-span-1">Rôle</div>
              <div className="col-span-1">Inscrit le</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {usersFiltres.map((user, i) => (
              <div
                key={user.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${
                  i !== usersFiltres.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/20 flex items-center justify-center text-xs text-purple-300 font-medium shrink-0">
                    {user.nom?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                  <p className="text-white text-sm font-medium truncate">{user.nom}</p>
                </div>
                <div className="col-span-3 flex items-center gap-1.5 text-slate-300 text-sm truncate">
                  <Mail size={12} className="text-slate-500 shrink-0" />
                  {user.email}
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-slate-300 text-sm">
                  <Phone size={12} className="text-slate-500 shrink-0" />
                  {user.telephone || '—'}
                </div>
                <div className="col-span-1">
                  <Badge className={`text-xs border ${
                    user.role === 'admin'
                      ? 'bg-purple-500/15 text-purple-300 border-purple-500/25'
                      : 'bg-white/5 text-slate-400 border-white/10'
                  }`}>
                    {user.role === 'admin' ? (
                      <span className="flex items-center gap-1"><Shield size={10} /> Admin</span>
                    ) : (
                      <span className="flex items-center gap-1"><UserIcon size={10} /> Client</span>
                    )}
                  </Badge>
                </div>
                <div className="col-span-1 text-slate-500 text-xs">
                  {new Date(user.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => toggleRole(user)}
                    disabled={updating === user.id}
                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                      user.role === 'admin'
                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/20'
                        : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/20'
                    }`}
                  >
                    {updating === user.id
                      ? '...'
                      : user.role === 'admin'
                        ? 'Retirer admin'
                        : 'Rendre admin'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}