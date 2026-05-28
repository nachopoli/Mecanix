'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Car, User, Wrench, Gauge, Calendar,
  Palette, Fuel, ChevronRight, Plus, Hash
} from 'lucide-react'
import {
  getVehiculo, getCliente, getOTsByVehiculo, getPeritajesByVehiculo
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const OT_ESTADO_BADGE: Record<string, string> = {
  'en-curso': 'badge-en-curso', finalizada: 'badge-finalizada', entregada: 'badge-entregada',
  pendiente: 'badge-pendiente', programada: 'badge-programada', pausada: 'badge-pendiente', cancelada: 'badge-cancelada',
}

const OT_ESTADO_LABEL: Record<string, string> = {
  'en-curso': 'En curso', finalizada: 'Finalizada', entregada: 'Entregada',
  pendiente: 'Pendiente', programada: 'Programada', pausada: 'Pausada', cancelada: 'Cancelada',
}

type Tab = 'info' | 'historial' | 'peritajes'

export default function DetalleVehiculoPage() {
  const { id } = useParams()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('info')

  const vehiculo = getVehiculo(id as string)
  if (!vehiculo) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center px-8">
        <Car className="w-12 h-12 text-gray-200 mb-3" />
        <p className="text-gray-500 font-semibold">Vehículo no encontrado</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#113d87] font-semibold">Volver</button>
      </div>
    )
  }

  const cliente = getCliente(vehiculo.clienteId)
  const ots = getOTsByVehiculo(vehiculo.id)
  const peritajes = getPeritajesByVehiculo(vehiculo.id)

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-0">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-[#1e1e1e]">{vehiculo.marca} {vehiculo.modelo}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#113d87] bg-[#e6ecf7] px-2 py-0.5 rounded-lg">{vehiculo.patente}</span>
              <span className="text-xs text-gray-400">{vehiculo.año}</span>
            </div>
          </div>
          <button className="text-xs font-semibold text-[#113d87] px-3 py-1.5 rounded-xl bg-[#e6ecf7]">
            Editar
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-0 -mx-4 px-4 scrollbar-hide">
          {([
            { key: 'info', label: 'Ficha técnica' },
            { key: 'historial', label: `OTs (${ots.length})` },
            { key: 'peritajes', label: `Peritajes (${peritajes.length})` },
          ] as { key: Tab; label: string }[]).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'shrink-0 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap',
                tab === t.key ? 'border-[#113d87] text-[#113d87]' : 'border-transparent text-gray-400'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-5">

        {/* ── Info Tab ── */}
        {tab === 'info' && (
          <div className="flex flex-col gap-3">
            {/* Propietario */}
            {cliente && (
              <Link href={`/clientes/${cliente.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#113d87]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Propietario</p>
                  <p className="text-sm font-bold text-[#1e1e1e]">{cliente.nombre}</p>
                  <p className="text-xs text-gray-400">{cliente.telefono}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            )}

            {/* Ficha */}
            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="section-title mb-3">Datos del vehículo</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Car,      label: 'Versión',    value: vehiculo.version },
                  { icon: Calendar, label: 'Año',        value: vehiculo.año.toString() },
                  { icon: Gauge,    label: 'Kilometraje', value: `${vehiculo.km.toLocaleString('es-AR')} km` },
                  { icon: Palette,  label: 'Color',      value: vehiculo.color },
                  { icon: Fuel,     label: 'Combustible', value: vehiculo.combustible ?? '—' },
                  { icon: Hash,     label: 'Patente',    value: vehiculo.patente },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-[#f4f6f9] rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5 text-gray-400" />
                      <p className="text-[10px] text-gray-400 font-semibold">{label}</p>
                    </div>
                    <p className="text-sm font-bold text-[#1e1e1e]">{value}</p>
                  </div>
                ))}
              </div>
              {vehiculo.vin && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 font-semibold mb-1">VIN / Chasis</p>
                  <p className="text-xs font-mono font-bold text-gray-600">{vehiculo.vin}</p>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex gap-3">
              <Link href={`/operaciones/nueva?vehiculoId=${vehiculo.id}&clienteId=${vehiculo.clienteId}`} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Nueva OT
              </Link>
              <Link href={`/peritajes/nuevo?vehiculoId=${vehiculo.id}`} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <Wrench className="w-4 h-4" />
                Peritaje
              </Link>
            </div>
          </div>
        )}

        {/* ── Historial OTs ── */}
        {tab === 'historial' && (
          <div className="flex flex-col gap-3">
            <Link
              href={`/operaciones/nueva?vehiculoId=${vehiculo.id}&clienteId=${vehiculo.clienteId}`}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-[#ee6a28]/30 rounded-2xl py-3.5 text-sm font-semibold text-[#ee6a28]"
            >
              <Plus className="w-4 h-4" />
              Nueva OT para este vehículo
            </Link>

            {ots.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Sin órdenes de trabajo</p>
              </div>
            ) : (
              ots.map(ot => (
                <Link key={ot.id} href={`/operaciones/${ot.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                    <Wrench className="w-4 h-4 text-[#113d87]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-black text-[#113d87]">{ot.numero}</span>
                      <span className={cn('badge', OT_ESTADO_BADGE[ot.estado])}>{OT_ESTADO_LABEL[ot.estado]}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1e1e1e] truncate">{ot.descripcion}</p>
                    <p className="text-xs text-gray-400">{new Date(ot.fechaIngreso + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-[#ee6a28]">${ot.total.toLocaleString('es-AR')}</p>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1" />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* ── Peritajes ── */}
        {tab === 'peritajes' && (
          <div className="flex flex-col gap-3">
            <Link
              href={`/peritajes/nuevo?vehiculoId=${vehiculo.id}`}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-[#113d87]/30 rounded-2xl py-3.5 text-sm font-semibold text-[#113d87]"
            >
              <Plus className="w-4 h-4" />
              Nuevo peritaje
            </Link>

            {peritajes.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Sin peritajes registrados</p>
              </div>
            ) : (
              peritajes.map(p => {
                const countOk = Object.values(p.checklist).filter(v => v === 'ok').length
                const countUrgente = Object.values(p.checklist).filter(v => v === 'urgente').length
                return (
                  <Link key={p.id} href={`/peritajes/${p.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4 text-[#113d87]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-black text-[#113d87]">{p.numero}</span>
                        <span className={cn('badge', p.estado === 'finalizado' ? 'badge-finalizada' : 'badge-borrador')}>
                          {p.estado === 'finalizado' ? 'Finalizado' : 'Borrador'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{new Date(p.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">{countOk} OK</span>
                        {countUrgente > 0 && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{countUrgente} urgente</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                  </Link>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}
