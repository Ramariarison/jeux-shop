'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import SidebarClient from '@/components/sidebar/sidebarClient'
import { useAuth } from '@/contexts/authContext'

type Jeu = {
  id: string
  nom: string
  slug: string
  logo_url: string
  actif: boolean
}

export default function JeuxPage() {
  const { user } = useAuth()
  const supabase = createClient()
  const [jeux, setJeux] = useState<Jeu[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [jeuEdit, setJeuEdit] = useState<Jeu | null>(null)

  const [nom, setNom] = useState('')
  const [slug, setSlug] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [actif, setActif] = useState(true)
  const [saving, setSaving] = useState(false)

  async function fetchJeux() {
    setLoading(true)
    const { data } = await supabase.from('jeux').select('*').order('nom')
    if (data) setJeux(data)
    setLoading(false)
  }

  useEffect(() => {
    async function init() {
      await fetchJeux()
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openCreate() {
    setJeuEdit(null)
    setNom('')
    setSlug('')
    setLogoUrl('')
    setActif(true)
    setModalOpen(true)
  }

  function openEdit(jeu: Jeu) {
    setJeuEdit(jeu)
    setNom(jeu.nom)
    setSlug(jeu.slug)
    setLogoUrl(jeu.logo_url)
    setActif(jeu.actif)
    setModalOpen(true)
  }

  async function handleSave() {
    setSaving(true)
    if (jeuEdit) {
      await supabase
        .from('jeux')
        .update({ nom, slug, logo_url: logoUrl, actif })
        .eq('id', jeuEdit.id)
    } else {
      await supabase.from('jeux').insert({ nom, slug, logo_url: logoUrl, actif })
    }
    await fetchJeux()
    setModalOpen(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer ce jeu et toutes ses offres ?')) return
    await supabase.from('jeux').delete().eq('id', id)
    await fetchJeux()
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <SidebarClient active="jeux" user={user} />

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Jeux</h1>
            <p className="text-slate-500 text-sm mt-0.5">{jeux.length} jeu(x) au total</p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
          >
            <Plus size={16} />
            Ajouter un jeu
          </Button>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-20 animate-pulse">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jeux.map((jeu) => (
              <div key={jeu.id} className="bg-white/5 border border-white/5 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                    <img src={jeu.logo_url} alt={jeu.nom} className="w-10 h-10 object-contain" />
                  </div>
                  <div
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                      jeu.actif
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25'
                        : 'bg-slate-500/15 text-slate-400 border-slate-500/25'
                    }`}
                  >
                    {jeu.actif ? 'Actif' : 'Inactif'}
                  </div>
                </div>
                <p className="text-white font-semibold mb-1">{jeu.nom}</p>
                <p className="text-slate-500 text-xs font-mono mb-4">{jeu.slug}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(jeu)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-sm py-2 rounded-xl transition-all"
                  >
                    <Pencil size={14} /> Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(jeu.id)}
                    className="flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 rounded-xl transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal création/édition */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 className="text-white font-semibold">
                {jeuEdit ? 'Modifier le jeu' : 'Nouveau jeu'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label className="text-slate-300 text-sm mb-1.5 block">Nom</Label>
                <Input
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Free Fire"
                  className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                />
              </div>
              <div>
                <Label className="text-slate-300 text-sm mb-1.5 block">Slug</Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="free-fire"
                  className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                />
              </div>
              <div>
                <Label className="text-slate-300 text-sm mb-1.5 block">URL du logo</Label>
                <Input
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="/logos/free-fire.png"
                  className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="actif"
                  checked={actif}
                  onChange={(e) => setActif(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600"
                />
                <Label htmlFor="actif" className="text-slate-300 text-sm">
                  Jeu actif
                </Label>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11"
              >
                {saving ? 'Enregistrement...' : jeuEdit ? 'Mettre à jour' : 'Créer le jeu'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
