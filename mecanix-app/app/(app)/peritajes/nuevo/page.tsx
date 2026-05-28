'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Mic, Camera, Plus, X, CheckCircle2,
  AlertTriangle, XCircle, ChevronDown, ChevronUp,
  Wrench, FileText, Fuel, Car, Zap, Settings
} from 'lucide-react'
import { clientes, getVehiculosByCliente, type ChecklistEstado } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const ESTADO_CFG = {
  ok:      { label: 'OK',      icon: CheckCircle2,  color: 'text-green-600', bg: 'bg-green-50',  border: 'border-green-400' },
  revisar: { label: 'Revisar', icon: AlertTriangle,  color: 'text-amber-600', bg: 'bg-amber-50',  border: 'border-amber-400' },
  urgente: { label: 'Urgente', icon: XCircle,        color: 'text-red-600',   bg: 'bg-red-50',    border: 'border-red-400'   },
}

function nextEstado(c: ChecklistEstado): ChecklistEstado {
  return c === null ? 'ok' : c === 'ok' ? 'revisar' : c === 'revisar' ? 'urgente' : null
}

const SECCIONES = [
  {
    key: 'motor', label: 'Motor', Icon: Wrench,
    items: {
      aceite_motor: 'Aceite motor',
      filtro_aceite: 'Filtro aceite',
      filtro_aire: 'Filtro aire',
      correa_dist: 'Correa distribución',
      refrigeracion: 'Refrigeración',
      bujias: 'Bujías',
    },
  },
  {
    key: 'frenos', label: 'Frenos', Icon: AlertTriangle,
    items: {
      pastillas_del: 'Pastillas delanteras',
      pastillas_tras: 'Pastillas traseras',
      discos_del: 'Discos delanteros',
      liquido_frenos: 'Líquido de frenos',
    },
  },
  {
    key: 'suspension', label: 'Suspensión', Icon: Settings,
    items: {
      amort_del: 'Amortiguadores del.',
      amort_tras: 'Amortiguadores tras.',
      rotulas: 'Rótulas',
      bujes: 'Bujes',
      barra_estab: 'Barra estabilizadora',
    },
  },
  {
    key: 'electrico', label: 'Eléctrico', Icon: Zap,
    items: {
      bateria: 'Batería',
      alternador: 'Alternador',
      luces: 'Luces',
      escobillas: 'Escobillas',
    },
  },
  {
    key: 'neumaticos', label: 'Neumáticos', Icon: Car,
    items: {
      neu_del_izq: 'Del. izquierda',
      neu_del_der: 'Del. derecha',
      neu_tras_izq: 'Tras. izquierda',
      neu_tras_der: 'Tras. derecha',
    },
  },
]

const ALL_KEYS = SECCIONES.flatMap(s => Object.keys(s.items))

const TABS = ['Checklist', 'Inventario', 'Fotos', 'Observaciones'] as const
type Tab = typeof TABS[number]

const ACCESORIOS = [
  { key: 'gato', label: 'Gato hidráulico' },
  { key: 'triangulo', label: 'Triángulo de emergencia' },
  { key: 'extintor', label: 'Extintor' },
  { key: 'auxilio', label: 'Rueda de auxilio' },
  { key: 'manual', label: 'Manual del propietario' },
  { key: 'herramientas', label: 'Juego de herramientas' },
]

const COMBUSTIBLE_OPTS = ['1/8', '1/4', '1/2', '3/4', 'Lleno']
const FOTO_CATS = ['Frontal', 'Lat. derecha', 'Lat. izquierda', 'Trasero', 'Motor', 'Interior']
const DAÑO_ZONAS = ['Parabrisas', 'Capó', 'Techo', 'Lat. izq.', '—', 'Lat. der.', 'Paragolpe', 'Baúl', '—']

export default function NuevoPeritajePage() {
  const router = useRouter()

  const [tab, setTab] = useState<Tab>('Checklist')
  const [clienteId, setClienteId] = useState('')
  const [vehiculoId, setVehiculoId] = useState('')

  // Checklist
  const [checklist, setChecklist] = useState<Record<string, ChecklistEstado>>({})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ motor: true })

  // Inventario
  const [accesorios, setAccesorios] = useState<Record<string, boolean>>({})
  const [combustible, setCombustible] = useState('1/2')
  const [km, setKm] = useState('')
  const [dañosZona, setDañosZona] = useState<Record<number, boolean>>({})

  // Observaciones
  const [diagnostico, setDiagnostico] = useState('')
  const [urgencia, setUrgencia] = useState<'normal' | 'alta' | 'urgente'>('normal')
  const [trabajos, setTrabajos] = useState<string[]>([])
  const [nuevoTrabajo, setNuevoTrabajo] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const vehiculosCliente = clienteId ? getVehiculosByCliente(clienteId) : []

  function toggleChecklist(key: string) {
    setChecklist(prev => ({ ...prev, [key]: nextEstado(prev[key] ?? null) }))
  }

  function addTrabajo() {
    if (nuevoTrabajo.trim()) {
      setTrabajos(prev => [...prev, nuevoTrabajo.trim()])
      setNuevoTrabajo('')
    }
  }

  const countByEstado = (e: ChecklistEstado) => Object.values(checklist).filter(v => v === e).length
  const reviewedItems = ALL_KEYS.filter(k => checklist[k] !== undefined && checklist[k] !== null).length
  const totalItems = ALL_KEYS.length

  return (
    <div className="flex flex-col h-screen bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3 shrink-0 z-10">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-[#1e1e1e]">Nuevo peritaje</h1>
          <p className="text-xs text-gray-400">PER-0043 · Revisión técnica</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold">
          <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{countByEstado('ok')} OK</span>
          <span className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">{countByEstado('revisar')}</span>
          <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">{countByEstado('urgente')}</span>
        </div>
      </div>

      {/* Vehicle selector */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-2 shrink-0">
        <select
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#113d87]/30"
          value={clienteId}
          onChange={e => { setClienteId(e.target.value); setVehiculoId('') }}
        >
          <option value="">Seleccionar cliente...</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#113d87]/30 disabled:opacity-40"
          value={vehiculoId}
          onChange={e => setVehiculoId(e.target.value)}
          disabled={!clienteId}
        >
          <option value="">Vehículo...</option>
          {vehiculosCliente.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo} · {v.patente}</option>)}
        </select>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 flex shrink-0">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'flex-1 py-3 text-xs font-bold transition-all border-b-2',
              tab === t ? 'text-[#113d87] border-[#113d87]' : 'text-gray-400 border-transparent'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">

        {/* ── CHECKLIST ── */}
        {tab === 'Checklist' && (
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="bg-white rounded-2xl shadow-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500">Progreso</span>
                <span className="text-xs font-bold text-[#113d87]">{reviewedItems}/{totalItems} ítems</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#113d87] rounded-full transition-all duration-300"
                  style={{ width: `${totalItems > 0 ? (reviewedItems / totalItems) * 100 : 0}%` }}
                />
              </div>
              <div className="flex items-center gap-2 mt-2 text-[10px] font-bold">
                <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{countByEstado('ok')} OK</span>
                <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{countByEstado('revisar')} Revisar</span>
                <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{countByEstado('urgente')} Urgente</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 font-medium px-1">Toca cada ítem: sin revisar → OK → Revisar → Urgente</p>

            {SECCIONES.map(({ key, label, Icon, items }) => {
              const isExpanded = expanded[key] !== false
              const entries = Object.entries(items)
              const urgCount = entries.filter(([k]) => checklist[k] === 'urgente').length
              const revCount = entries.filter(([k]) => checklist[k] === 'revisar').length

              return (
                <div key={key} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [key]: !isExpanded }))}
                    className="w-full flex items-center gap-3 px-4 py-3.5"
                  >
                    <div className="w-8 h-8 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#113d87]" />
                    </div>
                    <span className="text-sm font-bold text-[#1e1e1e] flex-1 text-left">{label}</span>
                    <div className="flex items-center gap-1.5 mr-1">
                      {urgCount > 0 && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">{urgCount} urg.</span>
                      )}
                      {revCount > 0 && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">{revCount} rev.</span>
                      )}
                    </div>
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4 text-gray-300 shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-gray-300 shrink-0" />
                    }
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      {entries.map(([itemKey, itemLabel]) => {
                        const estado = checklist[itemKey] ?? null
                        const conf = estado ? ESTADO_CFG[estado] : null
                        const ItemIcon = conf?.icon

                        return (
                          <button
                            key={itemKey}
                            onClick={() => toggleChecklist(itemKey)}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-all active:scale-95',
                              conf ? cn(conf.bg, conf.border) : 'border-gray-200 bg-white hover:border-gray-300'
                            )}
                          >
                            <div className={cn(
                              'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                              conf ? conf.bg : 'bg-gray-100'
                            )}>
                              {ItemIcon
                                ? <ItemIcon className={cn('w-3 h-3', conf?.color)} />
                                : <div className="w-2 h-2 rounded-full bg-gray-300" />
                              }
                            </div>
                            <div className="min-w-0">
                              <p className={cn('text-xs font-semibold leading-tight', conf ? conf.color : 'text-gray-500')}>
                                {itemLabel}
                              </p>
                              {conf && <p className={cn('text-[9px] font-bold', conf.color)}>{conf.label}</p>}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* ── INVENTARIO ── */}
        {tab === 'Inventario' && (
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-4">
              <p className="text-sm font-bold text-[#1e1e1e]">Condición al ingreso</p>

              <div>
                <label className="label">Kilometraje actual</label>
                <input
                  type="number"
                  value={km}
                  onChange={e => setKm(e.target.value)}
                  placeholder="Ej: 67000"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">
                  <span className="flex items-center gap-1.5">
                    <Fuel className="w-3.5 h-3.5" />
                    Nivel de combustible
                  </span>
                </label>
                <div className="flex gap-1.5 mb-2">
                  {COMBUSTIBLE_OPTS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setCombustible(opt)}
                      className={cn(
                        'flex-1 py-2 rounded-xl text-[11px] font-bold border-2 transition-all',
                        combustible === opt
                          ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                          : 'border-gray-200 text-gray-400'
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex gap-0.5 p-0.5">
                  {COMBUSTIBLE_OPTS.map((opt, i) => {
                    const level = COMBUSTIBLE_OPTS.indexOf(combustible)
                    return (
                      <div
                        key={opt}
                        className={cn(
                          'flex-1 rounded-full transition-all',
                          i <= level ? 'bg-[#113d87]' : 'bg-transparent'
                        )}
                      />
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="text-sm font-bold text-[#1e1e1e] mb-3">Accesorios presentes</p>
              <div className="flex flex-col gap-2">
                {ACCESORIOS.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setAccesorios(prev => ({ ...prev, [key]: !prev[key] }))}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl border border-gray-100 hover:bg-gray-50 active:scale-[0.99] transition-all"
                  >
                    <div className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all',
                      accesorios[key] ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    )}>
                      {accesorios[key] && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-gray-700 text-left">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="text-sm font-bold text-[#1e1e1e] mb-1">Golpes y daños visibles</p>
              <p className="text-[10px] text-gray-400 mb-3">Tocá para marcar zona dañada</p>
              <div className="grid grid-cols-3 gap-2">
                {DAÑO_ZONAS.map((zona, i) => (
                  zona === '—' ? <div key={i} /> :
                  <button
                    key={i}
                    onClick={() => setDañosZona(prev => ({ ...prev, [i]: !prev[i] }))}
                    className={cn(
                      'border-2 rounded-xl py-3 text-[11px] font-bold transition-all active:scale-95',
                      dañosZona[i]
                        ? 'bg-amber-50 border-amber-400 text-amber-700'
                        : 'border-dashed border-gray-200 text-gray-400 hover:border-amber-300'
                    )}
                  >
                    {zona}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FOTOS ── */}
        {tab === 'Fotos' && (
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="text-sm font-bold text-[#1e1e1e] mb-3">Registro fotográfico</p>
              <div className="grid grid-cols-2 gap-3">
                {FOTO_CATS.map(cat => (
                  <div
                    key={cat}
                    className="aspect-video bg-[#f4f6f9] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:border-[#113d87] hover:bg-[#e6ecf7] transition-all active:scale-95"
                  >
                    <Camera className="w-6 h-6 text-gray-300" />
                    <span className="text-[10px] font-semibold text-gray-400">{cat}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-3 text-xs font-semibold text-gray-400 hover:border-gray-300 transition-colors">
                <Plus className="w-4 h-4" />
                Agregar más fotos
              </button>
            </div>
            <div className="bg-[#e6ecf7] rounded-2xl p-4">
              <p className="text-xs text-[#113d87] font-semibold">
                Consejo: fotografiá el estado actual del vehículo para proteger al taller y al cliente ante cualquier disputa.
              </p>
            </div>
          </div>
        )}

        {/* ── OBSERVACIONES ── */}
        {tab === 'Observaciones' && (
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="bg-white rounded-2xl shadow-card p-4">
              <label className="label">Prioridad del trabajo</label>
              <div className="flex gap-2">
                {(['normal', 'alta', 'urgente'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setUrgencia(u)}
                    className={cn(
                      'flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all',
                      urgencia === u
                        ? u === 'urgente'
                          ? 'bg-red-500 border-red-500 text-white'
                          : u === 'alta'
                          ? 'bg-amber-50 border-amber-400 text-amber-700'
                          : 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                        : 'border-gray-200 text-gray-400'
                    )}
                  >
                    {u === 'normal' ? 'Normal' : u === 'alta' ? 'Alta' : 'Urgente'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <label className="label mb-0">Diagnóstico técnico</label>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={cn(
                    'flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all',
                    isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[#e6ecf7] text-[#113d87]'
                  )}
                >
                  <Mic className="w-3.5 h-3.5" />
                  {isRecording ? 'Grabando...' : 'Dictado'}
                </button>
              </div>
              <textarea
                value={diagnostico}
                onChange={e => setDiagnostico(e.target.value)}
                placeholder="Describí el estado general del vehículo, fallas detectadas y sistemas revisados..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#113d87]/30 resize-none min-h-[120px]"
                rows={5}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <label className="label">Trabajos sugeridos</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={nuevoTrabajo}
                  onChange={e => setNuevoTrabajo(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTrabajo()}
                  placeholder="Agregar trabajo..."
                  className="input-field flex-1 py-2 min-h-0 text-sm"
                />
                <button
                  onClick={addTrabajo}
                  className="w-10 h-10 bg-[#113d87] text-white rounded-xl flex items-center justify-center shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {trabajos.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Cambio de aceite y filtro', 'Correa de distribución', 'Pastillas de freno', 'Neumáticos', 'Batería'].map(sug => (
                    <button
                      key={sug}
                      onClick={() => setTrabajos(prev => [...prev, sug])}
                      className="text-[10px] font-semibold bg-[#f4f6f9] text-gray-600 px-2.5 py-1 rounded-full border border-gray-200 hover:border-[#113d87] hover:text-[#113d87] transition-colors"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              )}

              {trabajos.length > 0 && (
                <div className="flex flex-col gap-2">
                  {trabajos.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#f4f6f9] rounded-xl px-3 py-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#113d87] shrink-0" />
                      <span className="text-sm text-gray-700 flex-1">{t}</span>
                      <button
                        onClick={() => setTrabajos(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-gray-300 hover:text-gray-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 safe-bottom">
        <button
          onClick={() => router.back()}
          className="btn-secondary flex-1"
        >
          <FileText className="w-4 h-4" />
          Borrador
        </button>
        <button
          onClick={() => router.push('/presupuestos/nuevo?peritajeId=per3')}
          className="btn-primary flex-1"
        >
          <Wrench className="w-4 h-4" />
          Generar presupuesto
        </button>
      </div>
    </div>
  )
}
