'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Wrench, Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RegistroPage() {
  const router = useRouter()
  const [step, setStep] = useState<'cuenta' | 'taller'>('cuenta')
  const [form, setForm] = useState({
    nombre: '', apellido: '', mail: '', telefono: '', password: '',
    taller: '', tallertelfono: '', tallerCiudad: '',
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleCuenta(e: React.FormEvent) {
    e.preventDefault()
    setStep('taller')
  }

  function handleTaller(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push('/onboarding'), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a2657] via-[#0d3270] to-[#113d87] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-12 pb-6">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#ee6a28] rounded-2xl flex items-center justify-center mb-3 shadow-lg">
            <Wrench className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-white font-black text-3xl tracking-tight">MECANIX</h1>
          <p className="text-blue-300 text-sm font-medium mt-0.5">Creá tu cuenta gratuita</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-6">
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-black', step === 'cuenta' ? 'bg-[#ee6a28] text-white' : 'bg-green-500 text-white')}>
            {step === 'cuenta' ? '1' : '✓'}
          </div>
          <div className={cn('w-12 h-0.5 rounded', step === 'taller' ? 'bg-white' : 'bg-white/30')} />
          <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-black', step === 'taller' ? 'bg-[#ee6a28] text-white' : 'bg-white/20 text-white/50')}>
            2
          </div>
        </div>
        <p className="text-blue-300 text-xs mb-5">
          {step === 'cuenta' ? 'Paso 1 de 2 — Tu cuenta' : 'Paso 2 de 2 — Tu taller'}
        </p>

        {/* Card */}
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6">

          {step === 'cuenta' && (
            <>
              <h2 className="text-[#1e1e1e] font-bold text-lg mb-1">Datos de acceso</h2>
              <p className="text-gray-400 text-sm mb-5">Vas a usar estos datos para ingresar</p>

              <form onSubmit={handleCuenta} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Nombre *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Juan" className="input-field pl-10" required />
                    </div>
                  </div>
                  <div>
                    <label className="label">Apellido *</label>
                    <input type="text" value={form.apellido} onChange={e => set('apellido', e.target.value)} placeholder="García" className="input-field" required />
                  </div>
                </div>

                <div>
                  <label className="label">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" value={form.mail} onChange={e => set('mail', e.target.value)} placeholder="tu@correo.com" className="input-field pl-10" required />
                  </div>
                </div>

                <div>
                  <label className="label">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="11-XXXX-XXXX" className="input-field pl-10" />
                  </div>
                </div>

                <div>
                  <label className="label">Contraseña *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => set('password', e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="input-field pl-10 pr-11"
                      minLength={8}
                      required
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary-full mt-1 text-base">
                  Continuar
                </button>
              </form>
            </>
          )}

          {step === 'taller' && (
            <>
              <h2 className="text-[#1e1e1e] font-bold text-lg mb-1">Tu taller</h2>
              <p className="text-gray-400 text-sm mb-5">Así lo verán tus clientes</p>

              <form onSubmit={handleTaller} className="flex flex-col gap-4">
                <div>
                  <label className="label">Nombre del taller *</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={form.taller} onChange={e => set('taller', e.target.value)} placeholder="Mecánica San Martín" className="input-field pl-10" required />
                  </div>
                </div>
                <div>
                  <label className="label">Teléfono del taller</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" value={form.tallertelfono} onChange={e => set('tallertelfono', e.target.value)} placeholder="11-XXXX-XXXX" className="input-field pl-10" />
                  </div>
                </div>
                <div>
                  <label className="label">Ciudad</label>
                  <input type="text" value={form.tallerCiudad} onChange={e => set('tallerCiudad', e.target.value)} placeholder="Buenos Aires" className="input-field" />
                </div>

                <button type="submit" disabled={loading} className={cn('btn-primary-full mt-1 text-base', loading && 'opacity-70')}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Creando cuenta...
                    </span>
                  ) : 'Crear cuenta gratis'}
                </button>

                <button type="button" onClick={() => setStep('cuenta')} className="text-sm text-gray-400 text-center py-1">
                  ← Volver al paso anterior
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-blue-300/70 text-xs mt-5 text-center">
          ¿Ya tenés cuenta?{' '}
          <Link href="/login" className="text-white font-bold hover:underline">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}
