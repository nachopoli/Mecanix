'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus, Camera, CheckCircle2, AlertTriangle, XCircle,
  Calendar, Share2, Eye, MessageCircle, List, LayoutGrid,
  FileText, ChevronRight,
} from 'lucide-react'
import {
  ordenesDeTrabajoMock, presupuestosMock, peritajesMock,
  getCliente, getVehiculo, getTecnico,
  type OT,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type TabOp = 'peritaje' | 'presupuesto' | 'ot'
type OtView = 'kanban' | 'lista'

// ── Priority config ────────────────────────────────────────────────────────
const PRIO = {
  urgente: { label: 'URGENTE', border: 'border-l-red-500',   bg: 'bg-red-50',    text: 'text-red-600',    pill: 'bg-red-100 text-red-700' },
  alta:    { label: 'ALTA',    border: 'border-l-orange-400', bg: 'bg-orange-50', text: 'text-orange-600', pill: 'bg-orange-100 text-orange-700' },
  normal:  { label: 'NORMAL',  border: 'border-l-gray-300',   bg: 'bg-white',     text: 'text-gray-500',   pill: 'bg-gray-100 text-gray-500' },
}

const KANBAN_PRIO: { key: 'urgente' | 'alta' | 'normal'; label: string }[] = [
  { key: 'urgente', label: 'Urgente' },
  { key: 'alta',    label: 'Alta' },
  { key: 'normal',  label: 'Normal / Baja' },
]

// ── Presupuesto estado config ──────────────────────────────────────────────
const PRES_CONF: Record<string, { label: string; border: string; pill: string; pillText: string }> = {
  borrador:  { label: 'Borrador',  border: 'border-l-gray-300',   pill: 'bg-gray-100',   pillText: 'text-gray-600' },
  enviado:   { label: 'Enviado',   border: 'border-l-[#113d87]',  pill: 'bg-[#e6ecf7]',  pillText: 'text-[#113d87]' },
  pendiente: { label: 'Pendiente', border: 'border-l-amber-400',  pill: 'bg-amber-50',   pillText: 'text-amber-700' },
  aprobado:  { label: 'Aprobado',  border: 'border-l-green-500',  pill: 'bg-green-50',   pillText: 'text-green-700' },
  rechazado: { label: 'Rechazado', border: 'border-l-red-500',    pill: 'bg-red-50',     pillText: 'text-red-700' },
  vencido:   { label: 'Vencido',   border: 'border-l-red-400',    pill: 'bg-red-50',     pillText: 'text-red-600' },
}

// ── Helpers ────────────────────────────────────────────────────────────────
function checklistCounts(checklist: Record<string, string | null>) {
  let ok = 0, revisar = 0, urgente = 0
  Object.values(checklist).forEach(v => {
    if (v === 'ok') ok++
    else if (v === 'revisar') revisar++
    else if (v === 'urgente') urgente++
  })
  return { ok, revisar, urgente }
}

// ── OT Card for list view ──────────────────────────────────────────────────
function OTListCard({ ot }: { ot: OT }) {
  const cliente = getCliente(ot.clienteId)
  const vehiculo = getVehiculo(ot.vehiculoId)
  const tecnico = getTecnico(ot.tecnicoId)
  const prio = PRIO[ot.prioridad] ?? PRIO.normal

  return (
    <div className={cn('bg-white rounded-2xl shadow-card border-l-4 p-3.5', prio.border)}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <span className="text-xs font-black text-[#113d87]">{ot.numero}</span>
            {ot.prioridad !== 'normal' && (
              <span className={cn('text-[9px] font-black px-1.5 py-0.5 rounded-full', prio.pill)}>
                {prio.label}
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-[#1e1e1e] leading-tight truncate">{cliente?.nombre}</p>
          <p className="text-xs text-gray-500 truncate">{vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-base font-black text-[#ee6a28]">${ot.total.toLocaleString('es-AR')}</p>
          <div className="flex items-center gap-1 justify-end mt-0.5">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-[10px] text-gray-400">
              {new Date(ot.fechaEstimada + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 line-clamp-1 mb-2.5">{ot.descripcion}</p>

      {ot.notas && (
        <div className="flex items-start gap-1 bg-amber-50 rounded-xl px-2.5 py-1.5 mb-2.5">
          <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0 mt-px" />
          <span className="text-[10px] text-amber-700">{ot.notas}</span>
        </div>
      )}

      <div className="flex items-center gap-2">
        {tecnico && (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0"
            style={{ background: tecnico.color }}
          >
            {tecnico.initials}
          </div>
        )}
        <span className="text-[10px] text-gray-500 flex-1">{tecnico?.nombre.split(' ')[0]}</span>

        {ot.id && (
          <Link
            href={`/seguimiento/${ot.id}`}
            className="flex items-center gap-1 bg-[#e6ecf7] text-[#113d87] text-xs font-semibold px-2.5 py-1.5 rounded-xl active:scale-95 transition-all"
          >
            <Eye className="w-3 h-3" />
            Timeline
          </Link>
        )}
        <button className="flex items-center gap-1 bg-[#f4f6f9] text-gray-600 text-xs font-semibold px-2.5 py-1.5 rounded-xl active:scale-95 transition-all">
          <Share2 className="w-3 h-3" />
          Compartir
        </button>
      </div>
    </div>
  )
}

// ── OT Card for Kanban ─────────────────────────────────────────────────────
function OTKanbanCard({ ot }: { ot: OT }) {
  const cliente = getCliente(ot.clienteId)
  const vehiculo = getVehiculo(ot.vehiculoId)
  const tecnico = getTecnico(ot.tecnicoId)

  return (
    <div className="bg-white rounded-2xl shadow-card p-3 w-[240px] shrink-0">
      <div className="flex items-start gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <span className="text-xs font-black text-[#113d87]">{ot.numero}</span>
          <p className="text-sm font-bold text-[#1e1e1e] leading-tight truncate">{cliente?.nombre}</p>
          <p className="text-[10px] text-gray-400 truncate">{vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}</p>
        </div>
        <span className="text-sm font-black text-[#ee6a28] shrink-0">${ot.total.toLocaleString('es-AR')}</span>
      </div>
      <p className="text-[10px] text-gray-500 line-clamp-2 mb-2.5 leading-relaxed">{ot.descripcion}</p>
      <div className="flex items-center gap-1.5">
        {tecnico && (
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black text-white shrink-0" style={{ background: tecnico.color }}>
            {tecnico.initials}
          </div>
        )}
        <span className="text-[9px] text-gray-400 flex-1">{tecnico?.nombre.split(' ')[0]}</span>
        <Link href={`/seguimiento/${ot.id}`} className="flex items-center gap-1 bg-[#e6ecf7] text-[#113d87] text-[10px] font-bold px-2 py-1 rounded-lg active:scale-95">
          <Eye className="w-3 h-3" />
          Timeline
        </Link>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function OperacionesPage() {
  const [tab, setTab] = useState<TabOp>('peritaje')
  const [otView, setOtView] = useState<OtView>('lista')

  const TABS: { key: TabOp; label: string }[] = [
    { key: 'peritaje',    label: 'Peritaje' },
    { key: 'presupuesto', label: 'Presupuesto' },
    { key: 'ot',          label: 'Órdenes de Trabajo' },
  ]

  return (
    <div className="flex flex-col h-full">

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <div className="flex gap-0 bg-[#f4f6f9] rounded-xl p-1">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex-1 py-2 rounded-lg text-[11px] font-semibold transition-all leading-tight px-1',
                tab === t.key ? 'bg-white text-[#113d87] shadow-sm' : 'text-gray-500'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab: Peritaje ── */}
      {tab === 'peritaje' && (
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400">{peritajesMock.length} peritajes</p>
            <Link
              href="/peritajes/nuevo"
              className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo peritaje
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {peritajesMock.map(per => {
              const cliente = getCliente(per.clienteId)
              const vehiculo = getVehiculo(per.vehiculoId)
              const counts = checklistCounts(per.checklist)
              const total = counts.ok + counts.revisar + counts.urgente
              const linkedPres = presupuestosMock.find(p => p.id === per.presupuestoId)

              return (
                <div key={per.id} className="bg-white rounded-2xl shadow-card overflow-hidden border-l-4 border-l-[#113d87]">
                  {/* Vehicle header strip */}
                  <div className="bg-[#113d87] px-4 py-2.5 flex items-center gap-3">
                    <div className="text-2xl">🚗</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold leading-tight truncate">
                        {vehiculo?.marca} {vehiculo?.modelo} {vehiculo?.version}
                      </p>
                      <p className="text-white/70 text-[10px]">
                        {vehiculo?.patente} · {vehiculo?.año} · {vehiculo?.km?.toLocaleString('es-AR')} km
                      </p>
                    </div>
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0',
                      per.estado === 'finalizado' ? 'bg-green-500 text-white' : 'bg-white/20 text-white'
                    )}>
                      {per.estado === 'finalizado' ? 'Finalizado' : 'Borrador'}
                    </span>
                  </div>

                  <div className="p-3.5">
                    {/* Client + number */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <p className="text-sm font-bold text-[#1e1e1e]">{cliente?.nombre}</p>
                        <p className="text-[10px] text-gray-400">{per.numero} · {new Date(per.fecha + 'T12:00:00').toLocaleDateString('es-AR')}</p>
                      </div>
                      {linkedPres && (
                        <span className="text-[10px] font-semibold bg-[#e6ecf7] text-[#113d87] px-2 py-1 rounded-lg">
                          {linkedPres.numero}
                        </span>
                      )}
                    </div>

                    {/* Checklist summary */}
                    <div className="flex gap-2 mb-3">
                      <div className="flex items-center gap-1.5 bg-green-50 rounded-xl px-2.5 py-1.5 flex-1 justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs font-black text-green-700">{counts.ok}</span>
                        <span className="text-[10px] text-green-600 font-medium">OK</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-50 rounded-xl px-2.5 py-1.5 flex-1 justify-center">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-black text-amber-700">{counts.revisar}</span>
                        <span className="text-[10px] text-amber-600 font-medium">Atención</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-red-50 rounded-xl px-2.5 py-1.5 flex-1 justify-center">
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs font-black text-red-700">{counts.urgente}</span>
                        <span className="text-[10px] text-red-600 font-medium">Falla</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#113d87] rounded-full transition-all"
                          style={{ width: `${total > 0 ? Math.round(((counts.ok + counts.revisar + counts.urgente) / total) * 100) : 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 shrink-0">{total} ítems</span>
                    </div>

                    {/* Trabajos sugeridos preview */}
                    {per.trabajosSugeridos.length > 0 && (
                      <div className="mb-3">
                        {per.trabajosSugeridos.slice(0, 2).map((t, i) => (
                          <p key={i} className="text-[10px] text-gray-500 flex items-center gap-1">
                            <ChevronRight className="w-3 h-3 text-[#ee6a28] shrink-0" />
                            {t}
                          </p>
                        ))}
                        {per.trabajosSugeridos.length > 2 && (
                          <p className="text-[10px] text-gray-400 pl-4">+{per.trabajosSugeridos.length - 2} más</p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/peritajes/nuevo?peritajeId=${per.id}`}
                        className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95 transition-all"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        Ver peritaje
                      </Link>
                      {per.presupuestoId ? (
                        <Link
                          href={`/presupuestos/publico/${per.presupuestoId}`}
                          className="flex-1 flex items-center justify-center gap-1 bg-[#e6ecf7] rounded-xl py-2 text-xs font-semibold text-[#113d87] active:scale-95 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Ver presupuesto
                        </Link>
                      ) : (
                        <Link
                          href={`/presupuestos/nuevo?peritajeId=${per.id}`}
                          className="flex-1 flex items-center justify-center gap-1 bg-[#fde8dc] rounded-xl py-2 text-xs font-semibold text-[#ee6a28] active:scale-95 transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Crear presupuesto
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Link href="/peritajes/nuevo" className="fab" aria-label="Nuevo peritaje">
            <Plus className="w-6 h-6" />
          </Link>
        </div>
      )}

      {/* ── Tab: Presupuesto ── */}
      {tab === 'presupuesto' && (
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400">{presupuestosMock.length} presupuestos</p>
            <Link
              href="/presupuestos/nuevo"
              className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo presupuesto
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {presupuestosMock.map(p => {
              const cliente = getCliente(p.clienteId)
              const vehiculo = getVehiculo(p.vehiculoId)
              const conf = PRES_CONF[p.estado] ?? PRES_CONF.borrador
              const repuestos = p.items.filter(i => i.tipo === 'repuesto').reduce((s, i) => s + i.total, 0)
              const mo = p.items.filter(i => i.tipo === 'mano-de-obra').reduce((s, i) => s + i.total, 0)

              return (
                <div key={p.id} className={cn('bg-white rounded-2xl shadow-card border-l-4 p-4', conf.border)}>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-xs font-black text-[#113d87]">{p.numero}</span>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', conf.pill, conf.pillText)}>
                          {conf.label}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#1e1e1e]">{cliente?.nombre}</p>
                      <p className="text-xs text-gray-500">
                        {vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-black text-[#ee6a28]">${p.total.toLocaleString('es-AR')}</p>
                      <p className="text-[10px] text-gray-400">
                        Vence {new Date(p.vencimiento + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Breakdown */}
                  {(repuestos > 0 || mo > 0) && (
                    <div className="flex gap-3 mb-3">
                      {repuestos > 0 && (
                        <div className="flex-1 bg-[#f4f6f9] rounded-xl px-2.5 py-2">
                          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Repuestos</p>
                          <p className="text-xs font-bold text-gray-700">${repuestos.toLocaleString('es-AR')}</p>
                        </div>
                      )}
                      {mo > 0 && (
                        <div className="flex-1 bg-[#f4f6f9] rounded-xl px-2.5 py-2">
                          <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">Mano de obra</p>
                          <p className="text-xs font-bold text-gray-700">${mo.toLocaleString('es-AR')}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Items preview */}
                  <div className="flex flex-col gap-1 mb-3">
                    {p.items.slice(0, 2).map(item => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="text-gray-500 truncate flex-1 mr-2">{item.descripcion}</span>
                        <span className="font-semibold text-gray-700 shrink-0">${item.total.toLocaleString('es-AR')}</span>
                      </div>
                    ))}
                    {p.items.length > 2 && (
                      <p className="text-[10px] text-gray-400">+{p.items.length - 2} ítem{p.items.length - 2 > 1 ? 's' : ''} más</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/presupuestos/publico/${p.id}`}
                      className="flex-1 flex items-center justify-center gap-1 border border-[#113d87] text-[#113d87] rounded-xl py-2 text-xs font-semibold active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Vista cliente
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-1 bg-[#25D366] text-white rounded-xl py-2 text-xs font-semibold active:scale-95 transition-all">
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </button>
                    {(p.estado === 'aprobado' && !p.otId) && (
                      <Link
                        href={`/operaciones/nueva?presupuestoId=${p.id}`}
                        className="flex-1 flex items-center justify-center gap-1 bg-[#fde8dc] text-[#ee6a28] rounded-xl py-2 text-xs font-semibold active:scale-95 transition-all"
                      >
                        Crear OT
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <Link href="/presupuestos/nuevo" className="fab" aria-label="Nuevo presupuesto">
            <Plus className="w-6 h-6" />
          </Link>
        </div>
      )}

      {/* ── Tab: OT ── */}
      {tab === 'ot' && (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* View toggle */}
          <div className="bg-white border-b border-gray-100 px-4 py-2.5 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-gray-400">{ordenesDeTrabajoMock.length} órdenes</p>
            <div className="flex bg-[#f4f6f9] rounded-lg p-0.5">
              <button
                onClick={() => setOtView('lista')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
                  otView === 'lista' ? 'bg-white text-[#113d87] shadow-sm' : 'text-gray-500'
                )}
              >
                <List className="w-3.5 h-3.5" />
                Lista
              </button>
              <button
                onClick={() => setOtView('kanban')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
                  otView === 'kanban' ? 'bg-white text-[#113d87] shadow-sm' : 'text-gray-500'
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Kanban
              </button>
            </div>
          </div>

          {/* List view */}
          {otView === 'lista' && (
            <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
              {(['urgente', 'alta', 'normal'] as const).map(prio => {
                const ots = ordenesDeTrabajoMock.filter(o => o.prioridad === prio || (prio === 'normal' && !['urgente', 'alta'].includes(o.prioridad)))
                if (ots.length === 0) return null
                const conf = PRIO[prio]
                return (
                  <div key={prio} className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn('text-[10px] font-black px-2 py-0.5 rounded-full', conf.pill)}>
                        {prio === 'normal' ? 'NORMAL / BAJA' : conf.label}
                      </span>
                      <span className={cn('text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center text-white', {
                        'bg-red-500': prio === 'urgente',
                        'bg-orange-400': prio === 'alta',
                        'bg-gray-400': prio === 'normal',
                      })}>
                        {ots.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {ots.map(ot => <OTListCard key={ot.id} ot={ot} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Kanban view */}
          {otView === 'kanban' && (
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-x-auto">
                <div className="flex gap-3 p-4 h-full" style={{ width: 'max-content' }}>
                  {KANBAN_PRIO.map(col => {
                    const ots = ordenesDeTrabajoMock.filter(o =>
                      col.key === 'normal'
                        ? !['urgente', 'alta'].includes(o.prioridad)
                        : o.prioridad === col.key
                    )
                    const conf = PRIO[col.key]
                    return (
                      <div key={col.key} className="flex flex-col w-[256px] shrink-0">
                        <div className={cn('flex items-center justify-between px-3 py-2 rounded-xl mb-2', conf.bg)}>
                          <span className={cn('text-xs font-bold', conf.text)}>{col.label}</span>
                          <span className={cn('text-xs font-black w-5 h-5 rounded-full flex items-center justify-center text-white', {
                            'bg-red-500': col.key === 'urgente',
                            'bg-orange-400': col.key === 'alta',
                            'bg-gray-400': col.key === 'normal',
                          })}>
                            {ots.length}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2.5 overflow-y-auto flex-1 pb-2">
                          {ots.length === 0 ? (
                            <div className="flex items-center justify-center h-20 rounded-2xl border-2 border-dashed border-gray-200">
                              <p className="text-xs text-gray-300 font-semibold">Sin OT</p>
                            </div>
                          ) : (
                            ots.map(ot => <OTKanbanCard key={ot.id} ot={ot} />)
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          <Link href="/operaciones/nueva" className="fab" aria-label="Nueva OT">
            <Plus className="w-6 h-6" />
          </Link>
        </div>
      )}

    </div>
  )
}
