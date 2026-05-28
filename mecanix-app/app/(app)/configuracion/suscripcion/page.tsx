'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, Star, Zap, Crown, CreditCard, Calendar, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const PLANES = [
  {
    id: 'starter',
    nombre: 'Starter',
    precio: 55,
    icon: Zap,
    color: '#113d87',
    bg: '#e6ecf7',
    actual: true,
    usuarios: 3,
    features: [
      'Módulo Operaciones completo',
      'CRM de clientes',
      'Agenda y turnos',
      'Peritaje y diagnóstico',
      'Presupuestos y OT',
      'Hasta 3 usuarios',
      'Soporte por email',
    ],
    noIncluye: ['Administración financiera', 'Inventario', 'Reportes avanzados', 'Integración seguros'],
  },
  {
    id: 'profesional',
    nombre: 'Profesional',
    precio: 95,
    icon: Star,
    color: '#ee6a28',
    bg: '#fde8dc',
    actual: false,
    usuarios: 5,
    features: [
      'Todo del plan Starter',
      'Módulo Administración',
      'Módulo Inventario',
      'Hasta 5 usuarios',
      'Reportes básicos',
      'Soporte prioritario',
    ],
    noIncluye: ['Reportes avanzados', 'Integración seguros'],
  },
  {
    id: 'premium',
    nombre: 'Premium',
    precio: 135,
    icon: Crown,
    color: '#8b5cf6',
    bg: '#ede9fe',
    actual: false,
    usuarios: 10,
    features: [
      'Todo del plan Profesional',
      'Reportes avanzados',
      'Integración con seguros',
      'Hasta 10 usuarios',
      'API access',
      'Soporte 24/7',
    ],
    noIncluye: [],
  },
]

export default function SuscripcionPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-[#1e1e1e]">Suscripción</h1>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Estado actual */}
        <div className="bg-[#113d87] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-blue-300 text-xs font-semibold mb-0.5">Plan actual</p>
              <p className="text-white text-xl font-black">Starter</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-200 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              Próximo pago: 28 jun 2025
            </div>
            <span className="text-white font-black text-lg">USD 55<span className="text-blue-300 text-xs font-medium">/mes</span></span>
          </div>
        </div>

        {/* Info facturación */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f4f6f9] rounded-xl flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#1e1e1e]">•••• •••• •••• 4242</p>
            <p className="text-xs text-gray-400">Vence: 12/27 · Visa</p>
          </div>
          <button className="text-xs font-semibold text-[#113d87]">Cambiar</button>
        </div>

        {/* Planes */}
        <p className="section-title">Planes disponibles</p>

        {PLANES.map(plan => {
          const Icon = plan.icon
          return (
            <div
              key={plan.id}
              className={cn(
                'bg-white rounded-2xl shadow-card p-5 border-2 transition-all',
                plan.actual ? 'border-[#113d87]' : 'border-transparent'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: plan.bg }}>
                    <Icon className="w-5 h-5" style={{ color: plan.color }} />
                  </div>
                  <div>
                    <p className="text-base font-black text-[#1e1e1e]">{plan.nombre}</p>
                    <p className="text-xs text-gray-400">{plan.usuarios} usuarios máx.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black" style={{ color: plan.color }}>USD {plan.precio}</p>
                  <p className="text-[10px] text-gray-400">/mes</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mb-4">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span className="text-xs text-gray-600">{f}</span>
                  </div>
                ))}
                {plan.noIncluye.map(f => (
                  <div key={f} className="flex items-center gap-2 opacity-40">
                    <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0">
                      <div className="w-3 h-0.5 bg-gray-400 rounded" />
                    </div>
                    <span className="text-xs text-gray-400">{f}</span>
                  </div>
                ))}
              </div>

              {plan.actual ? (
                <div className="flex items-center justify-center gap-2 py-2.5 bg-[#e6ecf7] rounded-xl">
                  <Check className="w-4 h-4 text-[#113d87]" />
                  <span className="text-xs font-bold text-[#113d87]">Plan actual</span>
                </div>
              ) : (
                <button
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-95"
                  style={{ background: plan.color }}
                >
                  Cambiar a {plan.nombre}
                </button>
              )}
            </div>
          )
        })}

        {/* Cancelar */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-red-700 mb-0.5">Cancelar suscripción</p>
            <p className="text-xs text-red-600">Si cancelás, perderás acceso al finalizar el período pagado.</p>
          </div>
          <button className="text-xs font-bold text-red-500 shrink-0">Cancelar</button>
        </div>
      </div>
    </div>
  )
}
