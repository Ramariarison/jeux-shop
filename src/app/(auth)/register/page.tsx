'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleRegister() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nom, telephone } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/catalogue')
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">

      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />

      <div className="relative w-full max-w-md">

        {/* Logo / Titre */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Image
              src="/signature.png"
              alt="Rabbit Shop"
              width={56}
              height={56}
              className="object-contain"
            />
            <h1 className="text-3xl font-bold text-white">Rabbit Shop</h1>
          </div>
          <p className="text-slate-400 mt-1">Recharge tes jetons facilement</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">Créer un compte</h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label className="text-slate-300 text-sm mb-1.5 block">Nom complet</Label>
              <Input
                placeholder="Jean Dupont"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 rounded-xl h-11"
              />
            </div>
            <div>
              <Label className="text-slate-300 text-sm mb-1.5 block">Email</Label>
              <Input
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 rounded-xl h-11"
              />
            </div>
            <div>
              <Label className="text-slate-300 text-sm mb-1.5 block">Téléphone</Label>
              <Input
                placeholder="034 xx xxx xx"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 rounded-xl h-11"
              />
            </div>
            <div>
              <Label className="text-slate-300 text-sm mb-1.5 block">Mot de passe</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-purple-400 rounded-xl h-11"
              />
            </div>

            <Button
              className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium mt-2 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer mon compte'}
            </Button>
          </div>

          <p className="text-center text-sm text-slate-400 mt-6">
            Déjà un compte ?{' '}
            <a href="/login" className="text-purple-400 hover:text-purple-300 font-medium hover:underline">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}