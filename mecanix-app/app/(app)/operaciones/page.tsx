'use client'

import { useState } from 'react'
import {
  Plus, Wrench, FileText, Mic, AlertTriangle,
  Calendar, MoreVertical, Clipboard
} from 'lucide-react'
import {
  ordenesDeTrabajoMock, presupuestosMock,
  getCliente, getVehiculo, getTecnico,
  type OT, type EstadoOT
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type TabOp = 'ot' | 'presupuestos' | 'peritaje'

const OT_COLUMNAS: { key: EstadoOT; label: string; color: string; bg: string }[] = [
  { key: 'pendiente', label: 'Pendiente', color: '#f59e0b', bg: '#fffbeb' },
  { key: 'programada', label: 'Programada', color: '#6366f1', bg: '#eef2ff' },
  { key: 'en-curso', label: 'En curso', color: '#113d87', bg: '#e6ecf7' },
  { key: 'pausada', label: 'Pausada', color: '#8b5cf6', bg: '#ede9fe' },
  { key: 'finalizada', label: 'Finalizada', color: '#10b981', bg: '#d1fae5' },
  { key: 'entregada', label: 'Entregada', color: '#64748b', bg: '#f1f5f9' },
]

const PRIO_CONFIG = {
  urgente: { label: 'URGENTE', color: 'text-red-600', bg: 'bg-red-50' },
  alta: { label: 'ALTA', color: 'text-orange-600', bg: 'bg-orange-50' },
  normal: { label: '', color: '', bg: '' },
}

const PRES_ESTADO_BADGE: Record<string, string> = {
  borrador: 'badge-borrador',
  enviado: 'badge-enviado',
  pendiente: 'badge-pendiente',
  aprobado: 'badge-aprobado',
  rechazado: 'badge-rechazado',
  vencido: 'badge-vencido',
}

const PRES_ESTADO_LABEL: Record<string, string> = {
  borrador: 'Borrador', enviado: 'Enviado', pendiente: 'Pendiente',
  aprobado: 'Aprobado', rechazado: 'Rechazado', vencido: 'Vencido',
}

// Checklist predefinido mecánica
const CHECKLIST_ITEMS = [
  { id: 'frenos', label: 'Frenos' },
  { id: 'aceite', label: 'Aceite motor' },
  { id: 'filtro_aceite', label: 'Filtro de aceite' },
  { id: 'filtro_aire', label: 'Filtro de aire' },
  { id: 'suspension', label: 'Suspensión' },
  { id: 'neumaticos', label: 'Neumáticos' },
  { id: 'luces', label: 'Luces' },
  { id: 'bateria', label: 'Batería' },
  { id: 'refrigeracion', label: 'Refrigeración' },
  { id: 'escobillas', label: 'Escobillas' },
  { id: 'direccion', label: 'Dirección' },
  { id: 'escape', label: 'Escape' },
]

function OTCard({ ot }: { ot: OT }) {
  const cliente = getCliente(ot.clienteId)
  const vehiculo = getVehiculo(ot.vehiculoId)
  const tecnico = getTecnico(ot.tecnicoId)
  const prio = PRIO_CONFIG[ot.prioridad]

  return (
    <div className="bg-white rounded-2xl shadow-card p-3.5 w-[260px] md:w-full shrink-0 md:shrink">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-black text-[#113d87]">{ot.numero}</span>
            {prio.label && (
              <span className={cn('text-[9px] font-black px-1.5 py-0.5 rounded', prio.color, prio.bg)}>
                {prio.label}
              </span>
            )}
          </div>
          <p className="text-sm font-bold text-[#1e1e1e] leading-tight">{cliente?.nombre}</p>
        </div>
        <button className="p-1 rounded-lg hover:bg-gray-100">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Vehicle */}
      <div className="bg-[#f4f6f9] rounded-xl px-2.5 py-2 mb-2.5">
        <p className="text-xs font-semibold text-gray-700 leading-tight">
          {vehiculo?.marca} {vehiculo?.modelo}
        </p>
        <p className="text-[10px] text-gray-400 font-semibold">{vehiculo?.patente}</p>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-500 mb-2.5 line-clamp-2 leading-relaxed">{ot.descripcion}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {tecnico && (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: tecnico.color }}
            >
              {tecnico.initials}
            </div>
          )}
          <span className="text-[10px] text-gray-500 font-medium">{tecnico?.nombre.split(' ')[0]}</span>
        </div>
        <span className="text-xs font-black text-[#ee6a28]">${ot.total.toLocaleString('es-AR')}</span>
      </div>

      {/* Fecha estimada */}
      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
        <Calendar className="w-3 h-3 text-gray-400" />
        <span className="text-[10px] text-gray-400">
          Entrega:{' '}
          {new Date(ot.fechaEstimada + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
        </span>
      </div>

      {ot.notas && (
        <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-2 py-1 mt-2 flex items-start gap-1">
          <AlertTriangle className="w-3 h-3 shrink-0 mt-px" />
          {ot.notas}
        </p>
      )}
    </div>
  )
}

export default function OperacionesPage() {
  const [tab, setTab] = useState<TabOp>('ot')
  const [showNuevaOT, setShowNuevaOT] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [diagnostico, setDiagnostico] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function toggleCheck(id: string) {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const otPorEstado = (estado: EstadoOT) => ordenesDeTrabajoMock.filter(o => o.estado === estado)

  return (
    <div className="flex flex-col h-full">

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-4">
        <div className="flex gap-0 bg-[#f4f6f9] rounded-xl p-1">
          {([
            { key: 'ot', label: 'Órdenes de trabajo' },
            { key: 'presupuestos', label: 'Presupuestos' },
            { key: 'peritaje', label: 'Peritaje' },
          ] as { key: TabOp; label: string }[]).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs font-semibold transition-all',
                tab === t.key ? 'bg-white text-[#113d87] shadow-sm' : 'text-gray-500'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── OT Tab: Kanban ── */}
      {tab === 'ot' && (
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-x-auto overflow-y-hidden">
            <div className="flex gap-3 p-4 h-full" style={{ width: 'max-content' }}>
              {OT_COLUMNAS.map(col => {
                const ots = otPorEstado(col.key)
                return (
                  <div
                    key={col.key}
                    className="flex flex-col w-[270px] md:w-64 shrink-0"
                  >
                    {/* Column header */}
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-xl mb-2"
                      style={{ background: col.bg }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                        <span className="text-xs font-bold" style={{ color: col.color }}>{col.label}</span>
                      </div>
                      <span
                        className="text-xs font-black w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: col.color, color: '#fff' }}
                      >
                        {ots.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="flex flex-col gap-2.5 overflow-y-auto flex-1 pb-2">
                      {ots.length === 0 ? (
                        <div className="flex items-center justify-center h-20 rounded-2xl border-2 border-dashed border-gray-200">
                          <p className="text-xs text-gray-300 font-semibold">Sin OT</p>
                        </div>
                      ) : (
                        ots.map(ot => <OTCard key={ot.id} ot={ot} />)
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* FAB */}
          <button
            onClick={() => setShowNuevaOT(true)}
            className="fab"
            aria-label="Nueva OT"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* ── Presupuestos Tab ── */}
      {tab === 'presupuestos' && (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400">{presupuestosMock.length} presupuestos</p>
            <button className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all">
              <Plus className="w-3.5 h-3.5" />
              Nuevo presupuesto
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {presupuestosMock.map(p => {
              const cliente = getCliente(p.clienteId)
              const vehiculo = getVehiculo(p.vehiculoId)
              const isVencido = p.estado === 'vencido'

              return (
                <div key={p.id} className={cn('bg-white rounded-2xl shadow-card p-4', isVencido && 'border border-orange-200')}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-black text-[#113d87]">{p.numero}</span>
                        <span className={cn('badge', PRES_ESTADO_BADGE[p.estado])}>{PRES_ESTADO_LABEL[p.estado]}</span>
                      </div>
                      <p className="text-sm font-bold text-[#1e1e1e]">{cliente?.nombre}</p>
                      <p className="text-xs text-gray-500">{vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-black text-[#ee6a28]">${p.total.toLocaleString('es-AR')}</p>
                      <p className="text-[10px] text-gray-400">
                        Vence: {new Date(p.vencimiento + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="flex flex-col gap-1 mb-3">
                    {p.items.slice(0, 2).map(item => (
                      <div key={item.id} className="flex justify-between text-xs">
                        <span className="text-gray-500 truncate flex-1 mr-2">{item.descripcion}</span>
                        <span className="font-semibold text-gray-700 shrink-0">${item.total.toLocaleString('es-AR')}</span>
                      </div>
                    ))}
                    {p.items.length > 2 && (
                      <p className="text-xs text-gray-400">+{p.items.length - 2} ítem{p.items.length - 2 > 1 ? 's' : ''} más</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95">
                      <FileText className="w-3.5 h-3.5" />
                      PDF
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95">
                      Compartir
                    </button>
                    {(p.estado === 'enviado' || p.estado === 'pendiente') && (
                      <button className="flex-1 flex items-center justify-center gap-1 bg-[#e6ecf7] rounded-xl py-2 text-xs font-semibold text-[#113d87] active:scale-95">
                        <Clipboard className="w-3.5 h-3.5" />
                        Pasar a OT
                      </button>
                    )}
                    {p.estado === 'borrador' && (
                      <button className="flex-1 flex items-center justify-center gap-1 bg-[#fde8dc] rounded-xl py-2 text-xs font-semibold text-[#ee6a28] active:scale-95">
                        Enviar
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Peritaje Tab ── */}
      {tab === 'peritaje' && (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Selector de vehículo */}
          <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
            <p className="section-title">Vehículo a peritar</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Cliente</label>
                <select className="input-field">
                  <option value="">Seleccionar...</option>
                  {Array.from(new Set(ordenesDeTrabajoMock.map(o => o.clienteId))).map(id => {
                    const c = getCliente(id)
                    return <option key={id} value={id}>{c?.nombre}</option>
                  })}
                </select>
              </div>
              <div>
                <label className="label">Vehículo</label>
                <select className="input-field">
                  <option value="">Seleccionar...</option>
                </select>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
            <p className="section-title">Checklist de revisión</p>
            <div className="grid grid-cols-2 gap-2">
              {CHECKLIST_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all',
                    checkedItems[item.id]
                      ? 'border-[#113d87] bg-[#e6ecf7]'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 rounded flex items-center justify-center border-2 shrink-0 transition-all',
                    checkedItems[item.id]
                      ? 'bg-[#113d87] border-[#113d87]'
                      : 'border-gray-300'
                  )}>
                    {checkedItems[item.id] && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={cn(
                    'text-xs font-semibold',
                    checkedItems[item.id] ? 'text-[#113d87]' : 'text-gray-600'
                  )}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400 font-medium">
              <span>{Object.values(checkedItems).filter(Boolean).length} de {CHECKLIST_ITEMS.length} revisados</span>
            </div>
          </div>

          {/* Diagnóstico */}
          <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <p className="section-title mb-0">Diagnóstico</p>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={cn(
                  'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all',
                  isRecording
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[#e6ecf7] text-[#113d87]'
                )}
              >
                <Mic className="w-3.5 h-3.5" />
                {isRecording ? 'Grabando...' : 'Dictado por voz'}
              </button>
            </div>
            <textarea
              value={diagnostico}
              onChange={e => setDiagnostico(e.target.value)}
              placeholder="Describí el estado del vehículo y los trabajos a realizar..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#113d87]/30 focus:border-[#113d87] resize-none"
              rows={5}
            />
          </div>

          {/* Fotos */}
          <div className="bg-white rounded-2xl shadow-card p-4 mb-4">
            <p className="section-title">Registro fotográfico</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-[#f4f6f9] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                  <Plus className="w-5 h-5 text-gray-300" />
                </div>
              ))}
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-3 text-xs font-semibold text-gray-400 hover:border-gray-300 transition-colors">
              <Plus className="w-4 h-4" />
              Agregar foto
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 pb-4">
            <button className="btn-primary-full">
              <Wrench className="w-4 h-4" />
              Guardar peritaje
            </button>
            <button className="btn-orange-full">
              <FileText className="w-4 h-4" />
              Crear presupuesto
            </button>
          </div>
        </div>
      )}

      {/* Nueva OT Modal */}
      {showNuevaOT && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center" onClick={() => setShowNuevaOT(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#1e1e1e]">Nueva orden de trabajo</h3>
              <button onClick={() => setShowNuevaOT(false)} className="text-gray-400 text-2xl leading-none">×</button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="label">Cliente *</label>
                <input type="text" placeholder="Buscar cliente..." className="input-field" />
              </div>
              <div>
                <label className="label">Vehículo *</label>
                <select className="input-field">
                  <option>Seleccionar vehículo...</option>
                </select>
              </div>
              <div>
                <label className="label">Descripción del trabajo</label>
                <textarea
                  placeholder="Describí el trabajo a realizar..."
                  className="input-field resize-none"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Técnico asignado</label>
                  <select className="input-field">
                    <option>Roberto Díaz</option>
                    <option>Pablo Sánchez</option>
                    <option>Nicolás Torres</option>
                  </select>
                </div>
                <div>
                  <label className="label">Prioridad</label>
                  <select className="input-field">
                    <option>Normal</option>
                    <option>Alta</option>
                    <option>Urgente</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Fecha estimada de entrega</label>
                <input type="date" className="input-field" />
              </div>
              <button onClick={() => setShowNuevaOT(false)} className="btn-primary-full mt-1">
                Crear orden de trabajo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
