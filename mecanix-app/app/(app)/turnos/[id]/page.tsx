'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Clock, Calendar, User, Car, Wrench,
  Phone, MessageSquare, Edit, CheckCircle2, X
} from 'lucide-react'
import { getTurno, getCliente, getVehiculo, getTecnico } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const ESTADO_CONFIG: Record<string, { label: string; badge: string; color: string }> = {
  confirmado: { label: 'Confirmado', badge: 'badge-finalizada', color: 'text-green-600' },
  agendado:   { label: 'Agendado',   badge: 'badge-en-curso',   color: 'text-[#113d87]' },
  pendiente:  { label: 'Pendiente',  badge: 'badge-pendiente',  color: 'text-amber-600' },
  cancelado:  { label: 'Cancelado',  badge: 'badge-cancelada',  color: 'text-red-500'   },
  finalizado: { label: 'Finalizado', badge: 'badge-finalizada', color: 'text-green-600' },
  vencido:    { label: 'Vencido',    badge: 'badge-vencido',    color: 'text-orange-600'},
}

export default function DetalleTurnoPage() {
  const { id } = useParams()
  const router = useRouter()

  const turno = getTurno(id as string)
  if (!turno) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-24 text-center px-8">
        <Calendar className="w-12 h-12 text-gray-200 mb-3" />
        <p className="text-gray-500 font-semibold">Turno no encontrado</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#113d87] font-semibold">Volver</button>
      </div>
    )
  }

  const cliente = getCliente(turno.clienteId)
  const vehiculo = getVehiculo(turno.vehiculoId)
  const tecnico = turno.tecnicoId ? getTecnico(turno.tecnicoId) : null
  const estadoConf = ESTADO_CONFIG[turno.estado] ?? ESTADO_CONFIG.pendiente

  const fechaDisplay = new Date(turno.fecha + 'T12:00:00').toLocaleDateString('es-AR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

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
            <span className="text-base font-bold text-[#1e1e1e]">Turno</span>
            <span className={cn('badge', estadoConf.badge)}>{estadoConf.label}</span>
          </div>
          <p className="text-xs text-gray-400 capitalize">{fechaDisplay}</p>
        </div>
        <button className="p-2 rounded-xl hover:bg-gray-50">
          <Edit className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Fecha y hora */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-[#e6ecf7] rounded-xl p-3 text-center">
              <Calendar className="w-5 h-5 text-[#113d87] mx-auto mb-1" />
              <p className="text-xs text-[#113d87] font-semibold capitalize">{new Date(turno.fecha + 'T12:00:00').toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
            </div>
            <div className="flex-1 bg-[#fde8dc] rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 text-[#ee6a28] mx-auto mb-1" />
              <p className="text-xs text-[#ee6a28] font-semibold">{turno.hora} · {turno.duracion} min</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-1">Tipo de trabajo</p>
            <p className="text-base font-bold text-[#1e1e1e]">{turno.tipoTrabajo}</p>
          </div>
        </div>

        {/* Cliente */}
        {cliente && (
          <Link href={`/clientes/${cliente.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div className="w-11 h-11 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-[#113d87]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Cliente</p>
              <p className="text-sm font-bold text-[#1e1e1e]">{cliente.nombre}</p>
              <p className="text-xs text-gray-400">{cliente.telefono}</p>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${cliente.telefono}`}
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 bg-[#e6ecf7] rounded-xl flex items-center justify-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#113d87]" />
              </a>
              <a
                href={`https://wa.me/54${cliente.telefono.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="w-8 h-8 bg-[#d1fae5] rounded-xl flex items-center justify-center"
              >
                <MessageSquare className="w-3.5 h-3.5 text-green-600" />
              </a>
            </div>
          </Link>
        )}

        {/* Vehículo */}
        {vehiculo && (
          <Link href={`/vehiculos/${vehiculo.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div className="w-11 h-11 bg-[#fde8dc] rounded-xl flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-[#ee6a28]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400">Vehículo</p>
              <p className="text-sm font-bold text-[#1e1e1e]">{vehiculo.marca} {vehiculo.modelo}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-black text-[#113d87] bg-[#e6ecf7] px-2 py-0.5 rounded-lg">{vehiculo.patente}</span>
                <span className="text-xs text-gray-400">{vehiculo.km.toLocaleString('es-AR')} km</span>
              </div>
            </div>
          </Link>
        )}

        {/* Técnico */}
        {tecnico && (
          <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0"
              style={{ background: tecnico.color }}
            >
              {tecnico.initials}
            </div>
            <div>
              <p className="text-xs text-gray-400">Técnico asignado</p>
              <p className="text-sm font-bold text-[#1e1e1e]">{tecnico.nombre}</p>
              <p className="text-xs text-gray-400">{tecnico.especialidad}</p>
            </div>
          </div>
        )}

        {/* Notas */}
        {turno.notas && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-xs font-bold text-amber-700 mb-1">Notas</p>
            <p className="text-sm text-amber-700">{turno.notas}</p>
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col gap-2 pb-4">
          {turno.estado === 'agendado' && (
            <button className="btn-primary-full flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Confirmar turno
            </button>
          )}
          <Link
            href={`/operaciones/nueva?clienteId=${turno.clienteId}&vehiculoId=${turno.vehiculoId}`}
            className="btn-secondary-full flex items-center justify-center gap-2"
          >
            <Wrench className="w-4 h-4" />
            Crear OT desde turno
          </Link>
          {turno.estado !== 'cancelado' && (
            <button className="flex items-center justify-center gap-2 text-red-500 font-semibold text-sm py-3 rounded-2xl border-2 border-red-200 bg-red-50">
              <X className="w-4 h-4" />
              Cancelar turno
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
