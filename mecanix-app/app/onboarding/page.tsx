'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Wrench, ChevronRight, ChevronLeft, Check, Zap, Users, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const RUBROS = [
  { id: 'mecanica', label: 'Mecánica general', icon: '🔧' },
  { id: 'chapa', label: 'Chapa y pintura', icon: '🎨' },
  { id: 'estetica', label: 'Estética vehicular', icon: '✨' },
  { id: 'lubri', label: 'Lubricentro', icon: '🛢️' },
  { id: 'electrica', label: 'Electricidad', icon: '⚡' },
  { id: 'neumaticos', label: 'Neumáticos', icon: '🔵' },
]

const TOTAL_STEPS = 4

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [nombreTaller, setNombreTaller] = useState('')
  const [telefono, setTelefono] = useState('')
  const [rubroSeleccionado, setRubroSeleccionado] = useState('')
  const [nombreAdmin, setNombreAdmin] = useState('')
  const [finishing, setFinishing] = useState(false)

  const progress = (step / TOTAL_STEPS) * 100

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(s => s - 1)
  }

  const handleFinish = () => {
    setFinishing(true)
    localStorage.setItem('mecanix_onboarding', 'done')
    localStorage.setItem('mecanix_taller', JSON.stringify({ nombre: nombreTaller || 'Mi Taller', rubro: rubroSeleccionado }))
    setTimeout(() => router.push('/inicio'), 1200)
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col">
      {/* Header */}
      <div className="bg-[#0a2657] px-5 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-[#ee6a28] rounded-xl flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-black text-xl tracking-tight">MECANIX</span>
        </div>
        {/* Progress bar */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-2">
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">
              Configuración inicial
            </p>
            <p className="text-blue-300 text-xs font-medium">
              {step} de {TOTAL_STEPS}
            </p>
          </div>
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ee6a28] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-8 max-w-lg mx-auto w-full">

        {/* Step 1: Bienvenida */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#e6ecf7] rounded-3xl flex items-center justify-center mx-auto mb-5">
                <Zap className="w-10 h-10 text-[#113d87]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e1e1e] mb-2">
                ¡Bienvenido a MECANIX!
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                En menos de 3 minutos vas a tener tu taller configurado y listo para operar.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: Settings, text: 'Configurá los datos de tu taller' },
                { icon: Users, text: 'Gestioná clientes y vehículos' },
                { icon: Wrench, text: 'Llevá tus OT en tiempo real' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-card">
                  <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#113d87]" />
                  </div>
                  <p className="text-sm font-medium text-[#1e1e1e]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Datos del taller */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-[#1e1e1e] mb-1">Datos del taller</h2>
            <p className="text-gray-500 text-sm mb-6">Completá la información básica de tu negocio</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Nombre del taller *</label>
                <input
                  type="text"
                  value={nombreTaller}
                  onChange={e => setNombreTaller(e.target.value)}
                  placeholder="Ej: Mecánica San Martín"
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  placeholder="Ej: 11-4500-1234"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Rubro principal *</label>
                <div className="grid grid-cols-2 gap-2.5 mt-1">
                  {RUBROS.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRubroSeleccionado(r.id)}
                      className={cn(
                        'flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all',
                        rubroSeleccionado === r.id
                          ? 'border-[#113d87] bg-[#e6ecf7]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      )}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <span className={cn(
                        'text-xs font-semibold',
                        rubroSeleccionado === r.id ? 'text-[#113d87]' : 'text-gray-700'
                      )}>
                        {r.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Tu cuenta */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-[#1e1e1e] mb-1">Tu cuenta de administrador</h2>
            <p className="text-gray-500 text-sm mb-6">Así aparecerá tu nombre dentro de la plataforma</p>

            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Nombre y apellido</label>
                <input
                  type="text"
                  value={nombreAdmin}
                  onChange={e => setNombreAdmin(e.target.value)}
                  placeholder="Ej: Carlos Fernández"
                  className="input-field"
                />
              </div>

              <div className="bg-[#e6ecf7] rounded-2xl p-4 mt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#113d87] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#113d87] mb-1">Rol: Administrador</p>
                    <p className="text-xs text-[#113d87]/70 leading-relaxed">
                      Tenés acceso total a la plataforma. Podés agregar más usuarios después desde Configuración.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Todo listo */}
        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-[#1e1e1e] mb-2">¡Todo listo!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {nombreTaller || 'Tu taller'} está configurado. Entrá al dashboard y empezá a operar.
            </p>

            <div className="bg-white rounded-2xl shadow-card p-5 text-left mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Resumen</p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Taller</span>
                  <span className="font-semibold text-[#1e1e1e]">{nombreTaller || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rubro</span>
                  <span className="font-semibold text-[#1e1e1e]">
                    {RUBROS.find(r => r.id === rubroSeleccionado)?.label || '—'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Admin</span>
                  <span className="font-semibold text-[#1e1e1e]">{nombreAdmin || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-semibold text-[#ee6a28]">Starter</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="px-5 pb-10 max-w-lg mx-auto w-full">
        {step < TOTAL_STEPS ? (
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="btn-secondary flex-none px-4"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleNext}
              className="btn-primary flex-1"
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleFinish}
            disabled={finishing}
            className={cn('btn-orange-full text-base', finishing && 'opacity-70')}
          >
            {finishing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Abriendo dashboard...
              </span>
            ) : (
              <>
                Ir al dashboard
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
