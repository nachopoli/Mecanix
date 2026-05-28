'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, CheckCircle2, AlertTriangle, XCircle,
  User, Car, Wrench, FileText, Share2, ChevronRight
} from 'lucide-react'
import {
  getPeritaje, getCliente, getVehiculo, getTecnico,
  CHECKLIST_LABELS, CHECKLIST_KEYS, type ChecklistEstado
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const ESTADO_CONFIG: Record<Exclude<ChecklistEstado, null>, { label: string; icon: typeof CheckCircle2; color: string; bg: string; border: string }> = {
  ok:      { label: 'OK',      icon: CheckCircle2,  color: 'text-green-600', bg: 'bg-green-50',   border: 'border-green-300' },
  revisar: { label: 'Revisar', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50',   border: 'border-amber-300' },
  urgente: { label: 'Urgente', icon: XCircle,       color: 'text-red-600',   bg: 'bg-red-50',     border: 'border-red-300'   },
}

export default function DetallePeritajePage() {
  const { id } = useParams()
  const router = useRouter()

  const peritaje = getPeritaje(id as string)
  if (!peritaje) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center px-8">
        <Wrench className="w-12 h-12 text-gray-200 mb-3" />
        <p className="text-gray-500 font-semibold">Peritaje no encontrado</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#113d87] font-semibold">Volver</button>
      </div>
    )
  }

  const cliente = getCliente(peritaje.clienteId)
  const vehiculo = getVehiculo(peritaje.vehiculoId)
  const tecnico = getTecnico(peritaje.tecnicoId)

  const countOk = Object.values(peritaje.checklist).filter(v => v === 'ok').length
  const countRevisar = Object.values(peritaje.checklist).filter(v => v === 'revisar').length
  const countUrgente = Object.values(peritaje.checklist).filter(v => v === 'urgente').length

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-[#113d87]">{peritaje.numero}</span>
            <span className={cn(
              'badge',
              peritaje.estado === 'finalizado' ? 'badge-finalizada' : 'badge-borrador'
            )}>
              {peritaje.estado === 'finalizado' ? 'Finalizado' : 'Borrador'}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {new Date(peritaje.fecha + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'long', day: '2-digit', month: 'long' })}
          </p>
        </div>
        <button className="p-2 rounded-xl hover:bg-gray-50">
          <Share2 className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Resumen */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-3 text-center">
            <p className="text-2xl font-black text-green-600">{countOk}</p>
            <p className="text-[10px] font-semibold text-green-600">OK</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
            <p className="text-2xl font-black text-amber-600">{countRevisar}</p>
            <p className="text-[10px] font-semibold text-amber-600">Revisar</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-center">
            <p className="text-2xl font-black text-red-600">{countUrgente}</p>
            <p className="text-[10px] font-semibold text-red-600">Urgente</p>
          </div>
        </div>

        {/* Cliente y Vehículo */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <Link href={`/clientes/${cliente?.id}`} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#113d87]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Cliente</p>
              <p className="text-sm font-bold text-[#1e1e1e] truncate">{cliente?.nombre}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>
          <div className="h-px bg-gray-100" />
          <Link href={`/vehiculos/${vehiculo?.id}`} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#fde8dc] rounded-xl flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-[#ee6a28]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Vehículo</p>
              <p className="text-sm font-bold text-[#1e1e1e]">{vehiculo?.marca} {vehiculo?.modelo}</p>
              <p className="text-xs text-[#113d87] font-bold">{vehiculo?.patente}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>
          {tecnico && (
            <>
              <div className="h-px bg-gray-100" />
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: tecnico.color }}
                >
                  {tecnico.initials}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Técnico</p>
                  <p className="text-sm font-bold text-[#1e1e1e]">{tecnico.nombre}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Checklist resultado */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Checklist de revisión</p>
          <div className="grid grid-cols-2 gap-2">
            {CHECKLIST_KEYS.map(key => {
              const estado = peritaje.checklist[key] ?? null
              const conf = estado ? ESTADO_CONFIG[estado] : null
              const Icon = conf?.icon

              return (
                <div
                  key={key}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-xl border-2',
                    conf ? cn(conf.bg, conf.border) : 'border-gray-100 bg-gray-50'
                  )}
                >
                  <div className={cn('w-5 h-5 rounded-full flex items-center justify-center shrink-0', conf ? conf.bg : 'bg-gray-200')}>
                    {Icon ? (
                      <Icon className={cn('w-3 h-3', conf?.color)} />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={cn('text-xs font-semibold', conf ? conf.color : 'text-gray-400')}>
                      {CHECKLIST_LABELS[key]}
                    </p>
                    {conf && (
                      <p className={cn('text-[9px] font-bold', conf.color)}>{conf.label}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Diagnóstico */}
        {peritaje.diagnostico && (
          <div className="bg-white rounded-2xl shadow-card p-4">
            <p className="section-title mb-2">Diagnóstico</p>
            <p className="text-sm text-gray-700 leading-relaxed">{peritaje.diagnostico}</p>
          </div>
        )}

        {/* Trabajos sugeridos */}
        {peritaje.trabajosSugeridos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-card p-4">
            <p className="section-title mb-3">Trabajos sugeridos</p>
            <div className="flex flex-col gap-2">
              {peritaje.trabajosSugeridos.map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ee6a28] shrink-0 mt-1.5" />
                  <span className="text-sm text-gray-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col gap-2 pb-4">
          {peritaje.otId ? (
            <Link href={`/operaciones/${peritaje.otId}`} className="btn-primary-full flex items-center justify-center gap-2">
              <Wrench className="w-4 h-4" />
              Ver OT asociada
            </Link>
          ) : (
            <Link href={`/operaciones/nueva?peritajeId=${peritaje.id}`} className="btn-primary-full flex items-center justify-center gap-2">
              <Wrench className="w-4 h-4" />
              Crear OT
            </Link>
          )}
          {!peritaje.presupuestoId && (
            <Link href={`/presupuestos/nuevo?peritajeId=${peritaje.id}`} className="btn-secondary-full flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Crear presupuesto
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
