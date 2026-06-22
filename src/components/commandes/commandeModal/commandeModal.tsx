'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X, CreditCard, PhoneCall } from 'lucide-react'

type Offre = {
  id: string
  label: string
  quantite_jetons: number
  prix_ariary: number
  prix_usd: number
}

type Jeu = {
  id: string
  nom: string
  slug: string
}

type Props = {
  offre: Offre
  jeu: Jeu
  onClose: () => void
}

export default function CommandeModal({ offre, jeu, onClose }: Props) {
  const supabase = createClient()

  const [playerId, setPlayerId] = useState('')
  const [methodePaiement, setMethodePaiement] = useState<'mvola' | 'airtel' | 'orange'>('mvola')
  const [referencePaiement, setReferencePaiement] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [etape, setEtape] = useState<1 | 2>(1)

  const numerosPaiement = {
    mvola: '034 25 776 65',
    airtel: '033 XX XXX XX',
    orange: '032 XX XXX XX',
  }

  {/* Début de la nouvelle fonctionnalité */}
  const codesUSSD = {
    mvola: `#111*1*1*0342577665*${offre.prix_ariary}#`,
    airtel: '',
    orange: '',
  }

  function procederPaiement() {
    const ussd = codesUSSD[methodePaiement]

    if (!ussd) {
      alert('Code USSD non disponible pour cette méthode.')
      return
    }

    const encoded = ussd.replace(/#/g, '%23')

    window.location.href = `tel:${encoded}`
  }
  {/* fin du nouvelle fonctionnalité */}

  async function handleSubmit() {
    if (!playerId.trim()) {
      setError('Veuillez entrer votre ID joueur')
      return
    }
    if (!referencePaiement.trim()) {
      setError('Veuillez entrer la référence de votre paiement')
      return
    }

    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    // Créer la commande
    const { data: commande, error: errCommande } = await supabase
      .from('commandes')
      .insert({
        user_id: user.id,
        offre_id: offre.id,
        player_id_jeu: playerId,
        montant_ariary: offre.prix_ariary,
        montant_usd: offre.prix_usd,
        statut: 'en_attente_paiement',
      })
      .select()
      .single()

    if (errCommande || !commande) {
      setError('Erreur lors de la création de la commande')
      setLoading(false)
      return
    }

    // Enregistrer le paiement
    const { error: errPaiement } = await supabase
      .from('paiements')
      .insert({
        commande_id: commande.id,
        methode: methodePaiement,
        reference_mvola: referencePaiement,
        statut: 'en_attente',
        montant: offre.prix_ariary,
      })

    if (errPaiement) {
      setError('Erreur lors de l\'enregistrement du paiement')
      setLoading(false)
      return
    }

    setEtape(2)
    setLoading(false)
  }

  // Etape 2 : confirmation
  if (etape === 2) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h3 className="text-white text-xl font-bold mb-2">Commande envoyée !</h3>
          <p className="text-slate-400 text-sm mb-6">
            Votre commande a été reçue. Un administrateur va vérifier votre paiement
            et livrer vos jetons dans les plus brefs délais.
          </p>
          <div className="bg-white/5 rounded-xl p-4 text-left mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Jeu</span>
              <span className="text-white font-medium">{jeu.nom}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Offre</span>
              <span className="text-white font-medium">{offre.label}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Montant</span>
              <span className="text-white font-medium">{offre.prix_ariary.toLocaleString()} Ar</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">ID Joueur</span>
              <span className="text-white font-medium">{playerId}</span>
            </div>
          </div>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            onClick={onClose}
          >
            Fermer
          </Button>
        </div>
      </div>
    )
  }

  // Etape 1 : formulaire
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-white/20 rounded-2xl w-full max-w-md">

        {/* Header modal */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-white font-semibold text-lg">Commander</h3>
            <p className="text-slate-400 text-sm">{jeu.nom} {offre.label}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-3">

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* ID Joueur */}
          <div>
            <Label className="text-slate-300 text-sm mb-1.5 block">
              ID Joueur <span className="text-emerald-400">*</span>
            </Label>
            <Input
              placeholder="Entrez votre ID en jeu"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-xl h-11"
            />
            <p className="text-slate-500 text-xs mt-1">
              Trouvez votre ID dans le profil du jeu
            </p>
          </div>

          {/* Méthode de paiement */}
          <div>
            <Label className="text-slate-300 text-sm mb-2 block">
              Méthode de paiement <span className="text-emerald-400">*</span>
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {(['mvola', 'airtel', 'orange'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethodePaiement(m)}
                  className={`py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                    methodePaiement === m
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {m === 'mvola' ? 'Mvola' : m === 'airtel' ? 'Airtel' : 'Orange'}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions paiement */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">

            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-semibold text-emerald-300">
                  Paiement {methodePaiement.toUpperCase()}
                </p>

                <p className="text-xs text-slate-400">
                  Transférez exactement le montant indiqué
                </p>
              </div>
            </div>


            <div className="rounded-xl bg-black/20 p-3 mb-2">

              <p className="text-xs text-slate-400 mb-1">
                Numéro destinataire
              </p>

              <p className="text-lg font-bold text-white tracking-wide">
                {numerosPaiement[methodePaiement]}
              </p>

              <p className="mt-2 text-xs text-emerald-300">
                Montant : {offre.prix_ariary.toLocaleString()} Ar
              </p>

            </div>


            <Button
              type="button"
              onClick={procederPaiement}
              className="w-full h-11 rounded-xl bg-emerald-600! hover:bg-emerald-700! text-white font-semibold shadow-lg shadow-emerald-600/20"
            >
              <PhoneCall className="mr-2 h-4 w-4" />
              Procéder au paiement
            </Button>

          </div>

          {/* Référence paiement */}
          <div>
            <Label className="text-slate-300 text-sm mb-1.5 block">
              Référence de transaction <span className="text-emerald-400">*</span>
            </Label>
            <Input
              placeholder="Ex: MVOLA-123456789"
              value={referencePaiement}
              onChange={(e) => setReferencePaiement(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 rounded-xl h-11"
            />
          </div>

          {/* Bouton submit */}
          <Button
            className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Confirmer la commande'}
          </Button>

          <p className="text-center text-slate-500 text-xs">
            Délai de livraison estimé : 15 à 30 min
          </p>
        </div>
      </div>
    </div>
  )
}