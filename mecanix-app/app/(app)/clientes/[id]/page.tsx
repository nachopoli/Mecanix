'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Phone, Mail, MapPin, CreditCard, User, Car,
  Wrench, AlertCircle, Plus, MessageSquare, Star, ChevronRight
} from 'lucide-react'
import {
  getCliente, getVehiculosByCliente, getOTsByCliente, getPresupuestosByCliente,
  getVehiculo
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type Tab = 'info' | 'vehiculos' | 'historial' | 'deuda'

const ETIQUETA_STYLE: Record<string, string> = {
  VIP: 'bg-amber-100 text-amber-700',
  Regular: 'bg-blue-100 text-blue-700',
  Nuevo: 'bg-green-100 text-green-700',
  Inactivo: 'bg-gray-100 text-gray-500',
}

const OT_ESTADO_BADGE: Record<string, string> = {
  'en-curso': 'badge-en-curso',
  finalizada: 'badge-finalizada',
  entregada: 'badge-entregada',
  pendiente: 'badge-pendiente',
  programada: 'badge-programada',
  pausada: 'badge-pendiente',
  cancelada: 'badge-cancelada',
}

const OT_ESTADO_LABEL: Record<string, string> = {
  'en-curso': 'En curso', finalizada: 'Finalizada', entregada: 'Entregada',
  pendiente: 'Pendiente', programada: 'Programada', pausada: 'Pausada', cancelada: 'Cancelada',
}

export default function DetalleClientePage() {
  const { id } = useParams()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('info')

  const cliente = getCliente(id as string)
  const vehiculos = getVehiculosByCliente(id as string)
  const ots = getOTsByCliente(id as string)
  const presupuestos = getPresupuestosByCliente(id as string)

  if (!cliente) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center py-24">
        <User className="w-12 h-12 text-gray-200 mb-3" />
        <p className="text-gray-500 font-semibold">Cliente no encontrado</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#113d87] font-semibold">Volver</button>
      </div>
    )
  }

  const totalHistorico = ots.filter(o => o.estado === 'entregada' || o.estado === 'finalizada')
    .reduce((acc, o) => acc + o.total, 0)

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
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-[#1e1e1e] truncate">{cliente.nombre}</h1>
              <span className={cn('badge text-[10px]', ETIQUETA_STYLE[cliente.etiqueta])}>{cliente.etiqueta}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Última visita: {new Date(cliente.fechaUltimaVisita + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <Link
            href={`/clientes/nuevo?edit=${cliente.id}`}
            className="text-xs font-semibold text-[#113d87] px-3 py-1.5 rounded-xl bg-[#e6ecf7]"
          >
            Editar
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-0 -mx-4 px-4 scrollbar-hide">
          {([
            { key: 'info', label: 'Información' },
            { key: 'vehiculos', label: `Vehículos (${vehiculos.length})` },
            { key: 'historial', label: `Historial (${ots.length})` },
            { key: 'deuda', label: 'Cuenta' },
          ] as { key: Tab; label: string }[]).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'shrink-0 px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap',
                tab === t.key
                  ? 'border-[#113d87] text-[#113d87]'
                  : 'border-transparent text-gray-400'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-5">

        {/* ── Info Tab ── */}
        {tab === 'info' && (
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
              <p className="section-title mb-0">Datos de contacto</p>
              <a href={`tel:${cliente.telefono}`} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#113d87]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Teléfono</p>
                  <p className="text-sm font-semibold text-[#1e1e1e]">{cliente.telefono}</p>
                </div>
              </a>
              <a href={`mailto:${cliente.mail}`} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#113d87]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-semibold text-[#1e1e1e]">{cliente.mail}</p>
                </div>
              </a>
              {cliente.direccion && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#113d87]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Dirección</p>
                    <p className="text-sm font-semibold text-[#1e1e1e]">{cliente.direccion}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
              <p className="section-title mb-0">Datos adicionales</p>
              {cliente.cuit && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#f4f6f9] rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">CUIT</p>
                    <p className="text-sm font-semibold text-[#1e1e1e]">{cliente.cuit}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#f4f6f9] rounded-xl flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Origen</p>
                  <p className="text-sm font-semibold text-[#1e1e1e]">{cliente.origen}</p>
                </div>
              </div>
            </div>

            {cliente.notas && (
              <div className="bg-white rounded-2xl shadow-card p-4">
                <p className="section-title mb-2">Notas</p>
                <p className="text-sm text-gray-600 leading-relaxed">{cliente.notas}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl shadow-card p-3 text-center">
                <p className="text-2xl font-black text-[#113d87]">{ots.length}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">OT total</p>
              </div>
              <div className="bg-white rounded-2xl shadow-card p-3 text-center">
                <p className="text-2xl font-black text-[#ee6a28]">{vehiculos.length}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Vehículos</p>
              </div>
              <div className="bg-white rounded-2xl shadow-card p-3 text-center">
                <p className="text-lg font-black text-[#10b981]">${(totalHistorico / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Histórico</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/54${cliente.telefono.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold text-sm rounded-2xl py-3"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
              <Link
                href={`/turnos/nuevo?clienteId=${cliente.id}`}
                className="flex items-center justify-center gap-2 bg-[#ee6a28] text-white font-semibold text-sm rounded-2xl py-3"
              >
                <Plus className="w-4 h-4" />
                Nuevo turno
              </Link>
            </div>
          </div>
        )}

        {/* ── Vehículos Tab ── */}
        {tab === 'vehiculos' && (
          <div className="flex flex-col gap-3">
            <Link
              href={`/vehiculos/nuevo?clienteId=${cliente.id}`}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-[#113d87]/30 rounded-2xl py-3.5 text-sm font-semibold text-[#113d87]"
            >
              <Plus className="w-4 h-4" />
              Agregar vehículo
            </Link>

            {vehiculos.map(v => (
              <Link key={v.id} href={`/vehiculos/${v.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                <div className="w-11 h-11 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                  <Car className="w-5 h-5 text-[#113d87]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#1e1e1e]">{v.marca} {v.modelo}</p>
                  <p className="text-xs text-gray-400">{v.version} · {v.año}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-bold text-[#113d87] bg-[#e6ecf7] px-2 py-0.5 rounded-lg">{v.patente}</span>
                    <span className="text-xs text-gray-400">{v.km.toLocaleString('es-AR')} km</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
              </Link>
            ))}

            {vehiculos.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Sin vehículos registrados</p>
              </div>
            )}
          </div>
        )}

        {/* ── Historial Tab ── */}
        {tab === 'historial' && (
          <div className="flex flex-col gap-3">
            <Link
              href={`/operaciones/nueva?clienteId=${cliente.id}`}
              className="flex items-center justify-center gap-2 border-2 border-dashed border-[#ee6a28]/30 rounded-2xl py-3.5 text-sm font-semibold text-[#ee6a28]"
            >
              <Plus className="w-4 h-4" />
              Nueva OT
            </Link>

            {ots.map(ot => {
              const vehiculo = getVehiculo(ot.vehiculoId)
              return (
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
                    <p className="text-xs text-gray-400">{vehiculo?.marca} {vehiculo?.modelo} · {new Date(ot.fechaIngreso + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-[#ee6a28]">${ot.total.toLocaleString('es-AR')}</p>
                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto mt-1" />
                  </div>
                </Link>
              )
            })}

            {ots.length === 0 && (
              <div className="text-center py-12">
                <Wrench className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Sin órdenes de trabajo</p>
              </div>
            )}
          </div>
        )}

        {/* ── Deuda/Cuenta Tab ── */}
        {tab === 'deuda' && (
          <div className="flex flex-col gap-3">
            <div className={cn(
              'rounded-2xl p-5 text-center',
              cliente.deudaPendiente > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
            )}>
              {cliente.deudaPendiente > 0 ? (
                <>
                  <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-red-500 mb-1">Deuda pendiente</p>
                  <p className="text-4xl font-black text-red-600">${cliente.deudaPendiente.toLocaleString('es-AR')}</p>
                </>
              ) : (
                <>
                  <Star className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-green-600 mb-1">Sin deuda pendiente</p>
                  <p className="text-4xl font-black text-green-700">$0</p>
                </>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="section-title mb-3">Resumen de presupuestos</p>
              {presupuestos.length > 0 ? presupuestos.map(p => (
                <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-xs font-bold text-[#113d87]">{p.numero}</p>
                    <p className="text-xs text-gray-400">{new Date(p.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}</p>
                  </div>
                  <p className="text-sm font-black text-[#ee6a28]">${p.total.toLocaleString('es-AR')}</p>
                </div>
              )) : (
                <p className="text-xs text-gray-400 text-center py-4">Sin presupuestos</p>
              )}
            </div>

            {cliente.deudaPendiente > 0 && (
              <div className="flex flex-col gap-2">
                <button className="btn-primary-full">
                  <CreditCard className="w-4 h-4" />
                  Registrar pago
                </button>
                <button className="btn-secondary-full">
                  <MessageSquare className="w-4 h-4" />
                  Enviar recordatorio
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
