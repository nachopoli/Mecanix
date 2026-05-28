'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Wrench, Building2, User, Clock, Zap, CheckCircle2, ChevronRight, Phone
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 'bienvenida', title: '¡Bienvenido a MECANIX!', subtitle: 'Vamos a configurar tu taller en minutos' },
  { id: 'taller',    title: 'Datos del taller',      subtitle: 'Así te van a encontrar tus clientes' },
  { id: 'cuenta',    title: 'Tu cuenta',              subtitle: 'Datos del administrador principal' },
  { id: 'tecnicos',  title: 'Tu equipo',              subtitle: 'Agregá a tus técnicos (podés editar después)' },
  { id: 'horarios',  title: 'Horarios de atención',  subtitle: 'Configurá los días y horas que abrís' },
  { id: 'modulos',   title: 'Módulos a usar',         subtitle: 'Seleccioná las funciones que vas a necesitar' },
  { id: 'listo',     title: '¡Todo listo!',           subtitle: 'Tu taller está configurado y listo para usar' },
]

const DIAS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

const MODULOS = [
  { id: 'crm',          label: 'CRM / Clientes',     icon: User,      desc: 'Gestión de clientes y vehículos' },
  { id: 'agenda',       label: 'Agenda / Turnos',    icon: Clock,     desc: 'Programación de turnos' },
  { id: 'ot',           label: 'Órdenes de Trabajo', icon: Wrench,    desc: 'Seguimiento de trabajos' },
  { id: 'presupuestos', label: 'Presupuestos',        icon: Zap,       desc: 'Generación de presupuestos' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [taller, setTaller] = useState({ nombre: '', telefono: '', ciudad: '', descripcion: '' })
  const [cuenta, setCuenta] = useState({ nombre: '', apellido: '', mail: '' })
  const [tecnico, setTecnico] = useState({ nombre: '', especialidad: '' })
  const [diasActivos, setDiasActivos] = useState(['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'])
  const [modulos, setModulos] = useState(['crm', 'agenda', 'ot', 'presupuestos'])

  const current = STEPS[step]
  const progress = ((step + 1) / STEPS.length) * 100

  function next() { setStep(s => Math.min(s + 1, STEPS.length - 1)) }
  function prev() { setStep(s => Math.max(s - 1, 0)) }

  function finish() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mecanix_onboarding', JSON.stringify({ taller, cuenta, diasActivos, modulos }))
    }
    router.push('/inicio')
  }

  function toggleDia(d: string) {
    setDiasActivos(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  function toggleModulo(id: string) {
    setModulos(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col">

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 px-5 py-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ee6a28] rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-[#113d87]">MECANIX</span>
          </div>
          <span className="text-xs font-semibold text-gray-400">Paso {step + 1} de {STEPS.length}</span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ee6a28] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-5 py-6 max-w-lg mx-auto w-full">

        {/* Step header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#1e1e1e] mb-1">{current.title}</h1>
          <p className="text-gray-500 text-sm">{current.subtitle}</p>
        </div>

        {/* ── Bienvenida ── */}
        {step === 0 && (
          <div className="flex flex-col items-center gap-6 flex-1 justify-center py-4">
            <div className="w-24 h-24 bg-[#e6ecf7] rounded-3xl flex items-center justify-center">
              <Wrench className="w-12 h-12 text-[#113d87]" strokeWidth={2} />
            </div>
            <p className="text-gray-600 text-base leading-relaxed text-center">
              En menos de <span className="font-bold text-[#113d87]">5 minutos</span> vas a tener tu taller
              configurado y listo para gestionar clientes, turnos y órdenes de trabajo.
            </p>
            <div className="flex flex-col gap-2 w-full">
              {['Configurar datos del taller', 'Agregar técnicos', 'Definir horarios', 'Activar módulos'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card">
                  <div className="w-6 h-6 bg-[#e6ecf7] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-[#113d87]">{i + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-[#1e1e1e]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Taller ── */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="label">Nombre del taller *</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={taller.nombre}
                  onChange={e => setTaller(p => ({ ...p, nombre: e.target.value }))}
                  placeholder="Mecánica San Martín"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="label">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={taller.telefono}
                  onChange={e => setTaller(p => ({ ...p, telefono: e.target.value }))}
                  placeholder="11-XXXX-XXXX"
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <label className="label">Ciudad / Localidad</label>
              <input type="text" value={taller.ciudad} onChange={e => setTaller(p => ({ ...p, ciudad: e.target.value }))} placeholder="Buenos Aires" className="input-field" />
            </div>
            <div>
              <label className="label">¿A qué se especializa?</label>
              <textarea value={taller.descripcion} onChange={e => setTaller(p => ({ ...p, descripcion: e.target.value }))} placeholder="Mecánica general, chapa y pintura, eléctrica..." className="input-field resize-none min-h-0" rows={3} />
            </div>
          </div>
        )}

        {/* ── Cuenta ── */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Nombre *</label>
                <input type="text" value={cuenta.nombre} onChange={e => setCuenta(p => ({ ...p, nombre: e.target.value }))} placeholder="Juan" className="input-field" />
              </div>
              <div>
                <label className="label">Apellido *</label>
                <input type="text" value={cuenta.apellido} onChange={e => setCuenta(p => ({ ...p, apellido: e.target.value }))} placeholder="García" className="input-field" />
              </div>
            </div>
            <div>
              <label className="label">Email de administrador *</label>
              <input type="email" value={cuenta.mail} onChange={e => setCuenta(p => ({ ...p, mail: e.target.value }))} placeholder="admin@miTaller.com" className="input-field" />
            </div>
            <div className="bg-[#e6ecf7] rounded-2xl p-4 text-sm text-[#113d87] font-medium leading-relaxed">
              Este va a ser el usuario administrador principal con acceso completo al sistema.
            </div>
          </div>
        )}

        {/* ── Técnicos ── */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
              <p className="text-sm font-bold text-[#1e1e1e]">Primer técnico (podés agregar más después)</p>
              <div>
                <label className="label">Nombre completo</label>
                <input type="text" value={tecnico.nombre} onChange={e => setTecnico(p => ({ ...p, nombre: e.target.value }))} placeholder="Roberto Díaz" className="input-field" />
              </div>
              <div>
                <label className="label">Especialidad</label>
                <div className="flex flex-wrap gap-2">
                  {['Mecánica general', 'Electricidad', 'Chapa y pintura', 'Transmisión'].map(esp => (
                    <button key={esp} type="button" onClick={() => setTecnico(p => ({ ...p, especialidad: esp }))}
                      className={cn('px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all',
                        tecnico.especialidad === esp ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]' : 'border-gray-200 text-gray-400'
                      )}>
                      {esp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button type="button" className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-2xl py-3 text-sm text-gray-400 font-semibold">
              + Agregar otro técnico
            </button>
          </div>
        )}

        {/* ── Horarios ── */}
        {step === 4 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">Tocá los días en que abrís el taller:</p>
            <div className="flex gap-2 flex-wrap">
              {DIAS.map(d => (
                <button key={d} type="button" onClick={() => toggleDia(d)}
                  className={cn('w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all',
                    diasActivos.includes(d) ? 'bg-[#113d87] border-[#113d87] text-white' : 'border-gray-200 text-gray-400 bg-white'
                  )}>
                  {d}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl shadow-card p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Apertura</label>
                  <input type="time" defaultValue="08:00" className="input-field text-center" />
                </div>
                <div>
                  <label className="label">Cierre</label>
                  <input type="time" defaultValue="18:00" className="input-field text-center" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Módulos ── */}
        {step === 5 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500">Todos activados por defecto. Podés ajustar después:</p>
            {MODULOS.map(m => {
              const Icon = m.icon
              const activo = modulos.includes(m.id)
              return (
                <button key={m.id} type="button" onClick={() => toggleModulo(m.id)}
                  className={cn('flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all',
                    activo ? 'bg-white border-[#113d87]' : 'bg-white border-gray-200 opacity-50'
                  )}>
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', activo ? 'bg-[#e6ecf7]' : 'bg-gray-100')}>
                    <Icon className={cn('w-5 h-5', activo ? 'text-[#113d87]' : 'text-gray-400')} />
                  </div>
                  <div className="flex-1">
                    <p className={cn('text-sm font-bold', activo ? 'text-[#1e1e1e]' : 'text-gray-400')}>{m.label}</p>
                    <p className="text-xs text-gray-400">{m.desc}</p>
                  </div>
                  <div className={cn('w-6 h-6 rounded-full flex items-center justify-center', activo ? 'bg-[#113d87]' : 'bg-gray-200')}>
                    {activo && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* ── Listo ── */}
        {step === 6 && (
          <div className="flex flex-col items-center gap-6 flex-1 justify-center py-4">
            <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="text-center">
              <p className="text-base font-bold text-[#1e1e1e]">{taller.nombre || 'Tu taller'} está listo</p>
              <p className="text-gray-500 text-sm mt-2">Empezá agregando tu primer cliente o creando tu primera OT.</p>
            </div>
            <div className="bg-[#e6ecf7] rounded-2xl p-4 w-full">
              <p className="text-xs font-bold text-[#113d87] uppercase tracking-wider mb-2">Próximos pasos</p>
              {['Agregá un cliente desde CRM', 'Agendá tu primer turno', 'Creá tu primera OT'].map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#113d87] flex items-center justify-center shrink-0">
                    <span className="text-[8px] font-black text-white">{i + 1}</span>
                  </div>
                  <span className="text-xs text-[#113d87] font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-auto pt-6 flex gap-3">
          {step > 0 && step < 6 && (
            <button type="button" onClick={prev} className="btn-secondary flex-1">Atrás</button>
          )}
          {step < 6 ? (
            <button type="button" onClick={next} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {step === 0 ? 'Comenzar' : 'Continuar'}
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button type="button" onClick={finish} className="btn-primary-full flex items-center justify-center gap-2">
              <Wrench className="w-4 h-4" />
              Ir al panel principal
            </button>
          )}
        </div>

        {step > 0 && step < 6 && (
          <button type="button" onClick={() => setStep(6)} className="text-center text-xs text-gray-400 py-3">
            Saltar configuración
          </button>
        )}
      </div>
    </div>
  )
}
