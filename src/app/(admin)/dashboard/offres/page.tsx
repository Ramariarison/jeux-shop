'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import SidebarClient from '@/components/sidebar/sidebarClient'
import { useAuth } from '@/contexts/authContext'

type Offre = {
  id: string
  jeu_id: string
  label: string
  quantite_jetons: number
  prix_ariary: number
  prix_usd: number
  actif: boolean
}

type Jeu = {
  id: string
  nom: string
  slug: string
  logo_url: string
  offres: Offre[]
}

export default function OffresPage() {
  const supabase = createClient()
  const { user } = useAuth()
  const [jeux, setJeux] = useState<Jeu[]>([])
  const [loading, setLoading] = useState(true)
  const [jeuActif, setJeuActif] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [offreEdit, setOffreEdit] = useState<Offre | null>(null)

  const [label, setLabel] = useState('')
  const [quantite, setQuantite] = useState('')
  const [prixAriary, setPrixAriary] = useState('')
  const [prixUsd, setPrixUsd] = useState('')
  const [actif, setActif] = useState(true)
  const [saving, setSaving] = useState(false)

  async function fetchData() {
    setLoading(true)
    const { data } = await supabase
      .from('jeux')
      .select('id, nom, slug, logo_url, offres(*)')
      .order('nom')

    if (data) {
      setJeux(data)
      if (!jeuActif) setJeuActif(data[0]?.id ?? null)
    }
    setLoading(false)
  }

  useEffect(() => {
    async function init() {
      await fetchData()
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jeuSelectionne = jeux.find((j) => j.id === jeuActif)

  function openCreate() {
    setOffreEdit(null)
    setLabel('')
    setQuantite('')
    setPrixAriary('')
    setPrixUsd('')
    setActif(true)
    setModalOpen(true)
  }

  function openEdit(offre: Offre) {
    setOffreEdit(offre)
    setLabel(offre.label)
    setQuantite(String(offre.quantite_jetons))
    setPrixAriary(String(offre.prix_ariary))
    setPrixUsd(String(offre.prix_usd))
    setActif(offre.actif)
    setModalOpen(true)
  }

  async function handleSave() {
    if (!jeuActif) return
    setSaving(true)

    const payload = {
      jeu_id: jeuActif,
      label,
      quantite_jetons: parseInt(quantite),
      prix_ariary: parseFloat(prixAriary),
      prix_usd: parseFloat(prixUsd),
      actif
    }

    if (offreEdit) {
      await supabase.from('offres').update(payload).eq('id', offreEdit.id)
    } else {
      await supabase.from('offres').insert(payload)
    }

    await fetchData()
    setModalOpen(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cette offre ?')) return
    await supabase.from('offres').delete().eq('id', id)
    await fetchData()
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <SidebarClient active="offres" user={user} />

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Offres</h1>
            <p className="text-slate-500 text-sm mt-0.5">Gère les offres de jetons par jeu</p>
          </div>
          <Button
            onClick={openCreate}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            disabled={!jeuActif}
          >
            <Plus size={16} /> Ajouter une offre
          </Button>
        </div>

        {loading ? (
          <div className="text-center text-slate-500 py-20 animate-pulse">Chargement...</div>
        ) : (
          <>
            {/* Tabs jeux */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {jeux.map((jeu) => (
                <button
                  key={jeu.id}
                  onClick={() => setJeuActif(jeu.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    jeuActif === jeu.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <img src={jeu.logo_url} alt={jeu.nom} className="w-5 h-5 object-contain" />
                  {jeu.nom}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-md ${
                      jeuActif === jeu.id ? 'bg-white/20' : 'bg-white/10'
                    }`}
                  >
                    {jeu.offres.length}
                  </span>
                </button>
              ))}
            </div>

            {/* Liste offres du jeu sélectionné */}
            {jeuSelectionne &&
              (jeuSelectionne.offres.length === 0 ? (
                <div className="text-center text-slate-500 py-20">
                  Aucune offre pour {jeuSelectionne.nom}
                </div>
              ) : (
                <div className="bg-[#13131f] border border-white/5 rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs text-slate-500 uppercase tracking-wider">
                    <div className="col-span-4">Offre</div>
                    <div className="col-span-2">Jetons</div>
                    <div className="col-span-2">Prix Ariary</div>
                    <div className="col-span-2">Prix USD</div>
                    <div className="col-span-1">Statut</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {jeuSelectionne.offres
                    .sort((a, b) => a.prix_ariary - b.prix_ariary)
                    .map((offre, i) => (
                      <div
                        key={offre.id}
                        className={`grid grid-cols-12 gap-4 px-6 py-4 items-center ${
                          i !== jeuSelectionne.offres.length - 1 ? 'border-b border-white/5' : ''
                        }`}
                      >
                        <div className="col-span-4 text-white font-medium text-sm">
                          {offre.label}
                        </div>
                        <div className="col-span-2 text-slate-300 text-sm">
                          {offre.quantite_jetons.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-white text-sm font-semibold">
                          {offre.prix_ariary.toLocaleString()} Ar
                        </div>
                        <div className="col-span-2 text-slate-400 text-sm">${offre.prix_usd}</div>
                        <div className="col-span-1">
                          <div
                            className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${
                              offre.actif
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25'
                                : 'bg-slate-500/15 text-slate-400 border-slate-500/25'
                            }`}
                          >
                            {offre.actif ? 'Actif' : 'Inactif'}
                          </div>
                        </div>
                        <div className="col-span-1 flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(offre)}
                            className="text-slate-400 hover:text-white transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(offre.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </>
        )}
      </main>

      {/* Modal création/édition */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#13131f] border border-white/10 rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 className="text-white font-semibold">
                {offreEdit ? "Modifier l'offre" : 'Nouvelle offre'} — {jeuSelectionne?.nom}
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
                <Label className="text-slate-300 text-sm mb-1.5 block">Label</Label>
                <Input
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="100 Diamonds"
                  className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                />
              </div>
              <div>
                <Label className="text-slate-300 text-sm mb-1.5 block">Quantité de jetons</Label>
                <Input
                  type="number"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                  placeholder="100"
                  className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-300 text-sm mb-1.5 block">Prix Ariary</Label>
                  <Input
                    type="number"
                    value={prixAriary}
                    onChange={(e) => setPrixAriary(e.target.value)}
                    placeholder="5000"
                    className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                  />
                </div>
                <div>
                  <Label className="text-slate-300 text-sm mb-1.5 block">Prix USD</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={prixUsd}
                    onChange={(e) => setPrixUsd(e.target.value)}
                    placeholder="1.09"
                    className="bg-white/10 border-white/20 text-white rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="actif-offre"
                  checked={actif}
                  onChange={(e) => setActif(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600"
                />
                <Label htmlFor="actif-offre" className="text-slate-300 text-sm">
                  Offre active
                </Label>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11"
              >
                {saving ? 'Enregistrement...' : offreEdit ? 'Mettre à jour' : "Créer l'offre"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
