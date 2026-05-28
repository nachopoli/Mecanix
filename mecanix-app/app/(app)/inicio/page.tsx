'use client'

import Link from 'next/link'
import {
  CalendarDays, Wrench, FileText, Users, AlertTriangle,
  UserPlus, FilePlus, ClipboardPlus, CalendarPlus, ArrowRight,
  Clock, CheckCircle2
} from 'lucide-react'
import {
  clientes as mockClientes,
  ordenesDeTrabajoMock as mockOTs,
  presupuestosMock as mockPresupuestos,
  turnosMock as mockTurnos,
  getCliente as getMockCliente,
  getVehiculo as getMockVehiculo,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function getDayGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function getTodayLong() {
  return new Date().toLocaleDateString('es-AR', {
    weekday: 'long', day: 'numeric', month: 'long'
  })
}

export default function InicioPage() {
  const otActivas = mockOTs.filter(o => ['en-curso', 'programada', 'pendiente', 'pausada'].includes(o.estado))
  const presupPendientes = mockPresupuestos.filter(p => ['enviado', 'pendiente', 'borrador'].includes(p.estado))
  const presupVencidos = mockPresupuestos.filter(p => p.estado === 'vencido')
  const otDemoradas = mockOTs.filter(o => o.estado === 'en-curso' && o.prioridad === 'urgente')
  const otListas = mockOTs.filter(o => o.estado === 'finalizada')
  const turnosHoy = mockTurnos.filter(t => t.fecha === '2025-05-25')

  const kpis = [
    { label: 'Turnos hoy', value: turnosHoy.length, icon: CalendarDays, color: '#113d87', bg: '#e6ecf7', href: '/agenda' },
    { label: 'OT activas', value: otActivas.length, icon: Wrench, color: '#ee6a28', bg: '#fde8dc', href: '/operaciones' },
    { label: 'Presupuestos', value: presupPendientes.length, icon: FileText, color: '#8b5cf6', bg: '#ede9fe', href: '/operaciones' },
    { label: 'Clientes', value: mockClientes.length, icon: Users, color: '#10b981', bg: '#d1fae5', href: '/crm' },
  ]

  const acciones = [
    { label: 'Nuevo cliente', icon: UserPlus, href: '/clientes/nuevo', color: '#113d87', bg: '#e6ecf7' },
    { label: 'Nuevo presupuesto', icon: FilePlus, href: '/presupuestos/nuevo', color: '#ee6a28', bg: '#fde8dc' },
    { label: 'Nueva OT', icon: ClipboardPlus, href: '/operaciones/nueva', color: '#8b5cf6', bg: '#ede9fe' },
    { label: 'Nuevo turno', icon: CalendarPlus, href: '/turnos/nuevo', color: '#10b981', bg: '#d1fae5' },
  ]

  const estadoTurnoColor: Record<string, string> = {
    confirmado: 'bg-green-500',
    agendado: 'bg-blue-500',
    pendiente: 'bg-amber-500',
    cancelado: 'bg-red-500',
  }

  const otEstadoBadge: Record<string, string> = {
    'en-curso': 'badge-en-curso',
    finalizada: 'badge-finalizada',
    entregada: 'badge-entregada',
    pendiente: 'badge-pendiente',
    programada: 'badge-programada',
    pausada: 'badge-pendiente',
  }

  const otEstadoLabel: Record<string, string> = {
    'en-curso': 'En curso', finalizada: 'Finalizada', entregada: 'Entregada',
    pendiente: 'Pendiente', programada: 'Programada', pausada: 'Pausada',
  }

  return (
    <div className="px-4 py-5 md:px-6 md:py-6 max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-5">
        <p className="text-gray-500 text-sm font-medium capitalize">{getTodayLong()}</p>
        <h1 className="text-2xl font-bold text-[#1e1e1e] mt-0.5">
          {getDayGreeting()}, Admin
        </h1>
      </div>

      {/* Alertas contextuales */}
      {(presupVencidos.length > 0 || otDemoradas.length > 0 || otListas.length > 0) && (
        <div className="flex flex-col gap-2 mb-5">
          {presupVencidos.length > 0 && (
            <div className="flex items-center gap-3 bg-[#fde8dc] rounded-2xl px-4 py-3">
              <AlertTriangle className="w-4 h-4 text-[#ee6a28] shrink-0" />
              <p className="text-sm font-semibold text-[#c5541a] flex-1">
                {presupVencidos.length} presupuesto{presupVencidos.length > 1 ? 's' : ''} vencido{presupVencidos.length > 1 ? 's' : ''}
              </p>
              <Link href="/operaciones" className="text-xs font-bold text-[#ee6a28]">Ver</Link>
            </div>
          )}
          {otDemoradas.length > 0 && (
            <div className="flex items-center gap-3 bg-red-50 rounded-2xl px-4 py-3">
              <Clock className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-sm font-semibold text-red-600 flex-1">
                {otDemoradas.length} OT urgente{otDemoradas.length > 1 ? 's' : ''} en curso
              </p>
              <Link href="/operaciones" className="text-xs font-bold text-red-500">Ver</Link>
            </div>
          )}
          {otListas.length > 0 && (
            <div className="flex items-center gap-3 bg-green-50 rounded-2xl px-4 py-3">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <p className="text-sm font-semibold text-green-700 flex-1">
                {otListas.length} vehículo{otListas.length > 1 ? 's' : ''} listo{otListas.length > 1 ? 's' : ''} para entregar
              </p>
              <Link href="/operaciones" className="text-xs font-bold text-green-600">Ver</Link>
            </div>
          )}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {kpis.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-black leading-none" style={{ color }}>{value}</p>
              <p className="text-xs text-gray-500 font-medium leading-tight mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="mb-5">
        <p className="section-title">Acciones rápidas</p>
        <div className="grid grid-cols-2 gap-2.5">
          {acciones.map(({ label, icon: Icon, href, color, bg }) => (
            <Link key={label} href={href} className="bg-white rounded-2xl shadow-card p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <span className="text-xs font-semibold text-[#1e1e1e] leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Agenda del día */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">Agenda de hoy</p>
          <Link href="/agenda" className="flex items-center gap-1 text-xs font-semibold text-[#113d87]">
            Ver todo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {turnosHoy.map(t => {
            const cliente = getMockCliente(t.clienteId)
            const vehiculo = getMockVehiculo(t.vehiculoId)
            return (
              <Link key={t.id} href={`/turnos/${t.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                <div className="flex flex-col items-center w-12 shrink-0">
                  <span className="text-sm font-bold text-[#113d87]">{t.hora}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{t.duracion}min</span>
                </div>
                <div className={cn('w-0.5 h-10 rounded-full shrink-0', estadoTurnoColor[t.estado] || 'bg-gray-300')} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1e1e1e] truncate">{cliente?.nombre}</p>
                  <p className="text-xs text-gray-500 truncate">{vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{t.tipoTrabajo}</p>
                </div>
                <span className={cn(
                  'badge shrink-0',
                  t.estado === 'confirmado' ? 'badge-finalizada' :
                  t.estado === 'agendado' ? 'badge-en-curso' : 'badge-pendiente'
                )}>
                  {t.estado === 'confirmado' ? 'Confirmado' : t.estado === 'agendado' ? 'Agendado' : 'Pendiente'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-3">
          <p className="section-title mb-0">Actividad reciente</p>
          <Link href="/operaciones" className="flex items-center gap-1 text-xs font-semibold text-[#113d87]">
            Ver todo <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {mockOTs.slice(0, 4).map(ot => {
            const cliente = getMockCliente(ot.clienteId)
            const vehiculo = getMockVehiculo(ot.vehiculoId)
            return (
              <Link key={ot.id} href={`/operaciones/${ot.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform">
                <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                  <Wrench className="w-[18px] h-[18px] text-[#113d87]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-bold text-[#113d87]">{ot.numero}</p>
                    {ot.prioridad === 'urgente' && (
                      <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">URGENTE</span>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-[#1e1e1e] truncate">{cliente?.nombre}</p>
                  <p className="text-xs text-gray-400 truncate">{vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className={cn('badge', otEstadoBadge[ot.estado] || 'badge-borrador')}>
                    {otEstadoLabel[ot.estado] || ot.estado}
                  </span>
                  <span className="text-xs font-bold text-[#ee6a28]">${ot.total.toLocaleString('es-AR')}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    </div>
  )
}
