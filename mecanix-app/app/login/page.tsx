'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Wrench, Lock, Mail, HeadphonesIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Completá todos los campos.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const onboardingDone = typeof window !== 'undefined'
        ? localStorage.getItem('mecanix_onboarding')
        : null
      router.push(onboardingDone ? '/inicio' : '/onboarding')
    }, 900)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2657] via-[#0d3270] to-[#113d87] flex flex-col">
      {/* Top area */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-16 pb-6">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#ee6a28] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Wrench className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-white font-black text-4xl tracking-tight mb-1">MECANIX</h1>
          <p className="text-blue-300 text-sm font-medium">Gestión de talleres automotrices</p>
        </div>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6">
          <h2 className="text-[#1e1e1e] font-bold text-xl mb-1">Bienvenido</h2>
          <p className="text-gray-500 text-sm mb-6">Ingresá con tu usuario y contraseña</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="label">Usuario / Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="input-field pl-10"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-11"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Mostrar contraseña"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 font-medium -mt-1">{error}</p>
            )}

            {/* Forgot */}
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-xs text-[#113d87] font-semibold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'btn-primary-full mt-1 text-base',
                loading && 'opacity-70 cursor-not-allowed'
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </span>
              ) : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="pb-10 text-center px-5">
        <p className="text-blue-200/70 text-sm mb-4">
          ¿No tenés cuenta?{' '}
          <Link href="/registro" className="text-white font-bold hover:underline">
            Registrarte gratis
          </Link>
        </p>
        <button className="flex items-center gap-1.5 mx-auto text-blue-300/80 text-xs font-medium hover:text-blue-200 transition-colors">
          <HeadphonesIcon className="w-3.5 h-3.5" />
          Contactar soporte
        </button>
        <p className="text-blue-400/50 text-[11px] mt-3">v1.0 MVP — Plan Starter</p>
      </div>
    </div>
  )
}
