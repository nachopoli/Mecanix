'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Wrench, User, Car, Calendar, Clock,
  FileText, ChevronRight, AlertTriangle, CheckCircle2,
  Clipboard, Edit
} from 'lucide-react'
import {
  getOT, getCliente, getVehiculo, getTecnico,
  type EstadoOT
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const ESTADO_CONFIG: Record<EstadoOT, { label: string; color: string; bg: string; badge: string }> = {
  pendiente:  { label: 'Pendiente',  color: '#f59e0b', bg: '#fffbeb', badge: 'badge-pendiente' },
  programada: { label: 'Programada', color: '#6366f1', bg: '#eef2ff', badge: 'badge-programada' },
  'en-curso': { label: 'En curso',   color: '#113d87', bg: '#e6ecf7', badge: 'badge-en-curso' },
  pausada:    { label: 'Pausada',    color: '#8b5cf6', bg: '#ede9fe', badge: 'badge-pendiente' },
  finalizada: { label: 'Finalizada', color: '#10b981', bg: '#d1fae5', badge: 'badge-finalizada' },
  entregada:  { label: 'Entregada', color: '#64748b', bg: '#f1f5f9', badge: 'badge-entregada' },
  cancelada:  { label: 'Cancelada', color: '#ef4444', bg: '#fef2f2', badge: 'badge-cancelada' },
}

const PRIO_CONFIG = {
  urgente: { label: 'URGENTE', color: 'text-red-600', bg: 'bg-red-50' },
  alta:    { label: 'ALTA',    color: 'text-orange-600', bg: 'bg-orange-50' },
  normal:  { label: 'Normal',  color: 'text-gray-500', bg: '' },
}

const TIMELINE: EstadoOT[] = ['pendiente', 'programada', 'en-curso', 'finalizada', 'entregada']

export default function DetalleOTPage() {
  const { id } = useParams()
  const router = useRouter()
  const [showEstadoMenu, setShowEstadoMenu] = useState(false)

  const ot = getOT(id as string)
  if (!ot) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center px-8">
        <Wrench className="w-12 h-12 text-gray-200 mb-3" />
        <p className="text-gray-500 font-semibold">OT no encontrada</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#113d87] font-semibold">Volver</button>
      </div>
    )
  }

  const cliente = getCliente(ot.clienteId)
  const vehiculo = getVehiculo(ot.vehiculoId)
  const tecnico = getTecnico(ot.tecnicoId)
  const estadoConf = ESTADO_CONFIG[ot.estado]
  const prio = PRIO_CONFIG[ot.prioridad]

  const estadoIdx = TIMELINE.indexOf(ot.estado as typeof TIMELINE[number])

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
            <span className="text-base font-black text-[#113d87]">{ot.numero}</span>
            <span className={cn('badge', estadoConf.badge)}>{estadoConf.label}</span>
            {ot.prioridad !== 'normal' && (
              <span className={cn('text-[10px] font-black px-1.5 py-0.5 rounded', prio.color, prio.bg)}>
                {prio.label}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{ot.descripcion}</p>
        </div>
        <button className="p-2 rounded-xl hover:bg-gray-50">
          <Edit className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Timeline de estado */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Estado</p>
          <div className="flex items-center gap-0">
            {TIMELINE.map((e, i) => {
              const done = estadoIdx > i
              const current = estadoIdx === i
              const last = i === TIMELINE.length - 1
              const eConf = ESTADO_CONFIG[e]
              return (
                <div key={e} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                        done || current ? 'text-white' : 'bg-gray-100 text-gray-300'
                      )}
                      style={done || current ? { background: eConf.color } : {}}
                    >
                      {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <p className={cn(
                      'text-[9px] font-semibold mt-1 text-center leading-tight',
                      current ? 'text-[#113d87]' : done ? 'text-gray-400' : 'text-gray-200'
                    )}>
                      {eConf.label}
                    </p>
                  </div>
                  {!last && (
                    <div className={cn('h-0.5 flex-1 mb-4', done ? 'bg-[#113d87]' : 'bg-gray-100')} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={() => setShowEstadoMenu(!showEstadoMenu)}
              className="w-full flex items-center justify-between text-xs font-semibold text-[#113d87]"
            >
              Cambiar estado
              <ChevronRight className={cn('w-4 h-4 transition-transform', showEstadoMenu && 'rotate-90')} />
            </button>
            {showEstadoMenu && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(Object.keys(ESTADO_CONFIG) as EstadoOT[]).map(e => (
                  <button
                    key={e}
                    onClick={() => setShowEstadoMenu(false)}
                    className={cn(
                      'text-xs font-semibold px-3 py-2 rounded-xl border-2 transition-all',
                      ot.estado === e ? 'border-[#113d87] bg-[#e6ecf7] text-[#113d87]' : 'border-gray-200 text-gray-500'
                    )}
                  >
                    {ESTADO_CONFIG[e].label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cliente y Vehículo */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <Link href={`/clientes/${cliente?.id}`} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#113d87]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Cliente</p>
              <p className="text-sm font-bold text-[#1e1e1e] truncate">{cliente?.nombre}</p>
              <p className="text-xs text-gray-400">{cliente?.telefono}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>

          <div className="h-px bg-gray-100" />

          <Link href={`/vehiculos/${vehiculo?.id}`} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fde8dc] rounded-xl flex items-center justify-center shrink-0">
              <Car className="w-4 h-4 text-[#ee6a28]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Vehículo</p>
              <p className="text-sm font-bold text-[#1e1e1e]">{vehiculo?.marca} {vehiculo?.modelo}</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#113d87] bg-[#e6ecf7] px-1.5 py-0.5 rounded">{vehiculo?.patente}</span>
                <span className="text-xs text-gray-400">{vehiculo?.km.toLocaleString('es-AR')} km</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </Link>
        </div>

        {/* Técnico y Fechas */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Asignación</p>
          <div className="flex flex-col gap-3">
            {tecnico && (
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ background: tecnico.color }}
                >
                  {tecnico.initials}
                </div>
                <div>
                  <p className="text-xs text-gray-400">Técnico</p>
                  <p className="text-sm font-semibold text-[#1e1e1e]">{tecnico.nombre}</p>
                  <p className="text-xs text-gray-400">{tecnico.especialidad}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f4f6f9] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-[10px] text-gray-400 font-semibold">Ingreso</p>
                </div>
                <p className="text-sm font-bold text-[#1e1e1e]">
                  {new Date(ot.fechaIngreso + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                </p>
              </div>
              <div className="bg-[#f4f6f9] rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#ee6a28]" />
                  <p className="text-[10px] text-[#ee6a28] font-semibold">Entrega estimada</p>
                </div>
                <p className="text-sm font-bold text-[#1e1e1e]">
                  {new Date(ot.fechaEstimada + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Costos */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Costos</p>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">Mano de obra</span>
              <span className="text-sm font-semibold text-[#1e1e1e]">${ot.manoDeObra.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">Repuestos</span>
              <span className="text-sm font-semibold text-[#1e1e1e]">${ot.repuestos.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-base font-bold text-[#1e1e1e]">Total</span>
              <span className="text-xl font-black text-[#ee6a28]">${ot.total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Notas */}
        {ot.notas && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-700 mb-1">Notas</p>
              <p className="text-sm text-amber-700">{ot.notas}</p>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col gap-2">
          {ot.peritajeId && (
            <Link href={`/peritajes/${ot.peritajeId}`} className="btn-secondary-full flex items-center justify-center gap-2">
              <Clipboard className="w-4 h-4" />
              Ver peritaje
            </Link>
          )}
          <Link href={`/presupuestos/nuevo?otId=${ot.id}`} className="btn-primary-full flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" />
            {ot.presupuestoId ? 'Ver presupuesto' : 'Crear presupuesto'}
          </Link>
          {(ot.estado === 'finalizada') && (
            <button className="btn-orange-full flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Marcar como entregada
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
