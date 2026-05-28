'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Mic, Camera, Plus, X, CheckCircle2,
  AlertTriangle, XCircle, Wrench, FileText
} from 'lucide-react'
import { clientes, getVehiculosByCliente, CHECKLIST_KEYS, CHECKLIST_LABELS, type ChecklistEstado } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const ESTADO_CONFIG: Record<Exclude<ChecklistEstado, null>, { label: string; icon: typeof CheckCircle2; color: string; bg: string; border: string }> = {
  ok:      { label: 'OK',      icon: CheckCircle2,    color: 'text-green-600', bg: 'bg-green-50',   border: 'border-green-400' },
  revisar: { label: 'Revisar', icon: AlertTriangle,   color: 'text-amber-600', bg: 'bg-amber-50',   border: 'border-amber-400' },
  urgente: { label: 'Urgente', icon: XCircle,         color: 'text-red-600',   bg: 'bg-red-50',     border: 'border-red-400'   },
}

function nextEstado(current: ChecklistEstado): ChecklistEstado {
  if (current === null) return 'ok'
  if (current === 'ok') return 'revisar'
  if (current === 'revisar') return 'urgente'
  return null
}

export default function NuevoPeritajePage() {
  const router = useRouter()
  const [clienteId, setClienteId] = useState('')
  const [vehiculoId, setVehiculoId] = useState('')
  const [checklist, setChecklist] = useState<Record<string, ChecklistEstado>>({})
  const [diagnostico, setDiagnostico] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [trabajos, setTrabajos] = useState<string[]>([])
  const [nuevoTrabajo, setNuevoTrabajo] = useState('')

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

  function removeTrabajo(i: number) {
    setTrabajos(prev => prev.filter((_, idx) => idx !== i))
  }

  const countByEstado = (e: ChecklistEstado) => Object.values(checklist).filter(v => v === e).length

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
        <div className="flex-1">
          <h1 className="text-base font-bold text-[#1e1e1e]">Nuevo peritaje</h1>
          <p className="text-xs text-gray-400">Revisión técnica del vehículo</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Selección de vehículo */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Vehículo a peritar</p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="label">Cliente *</label>
              <select
                className="input-field"
                value={clienteId}
                onChange={e => { setClienteId(e.target.value); setVehiculoId('') }}
              >
                <option value="">Seleccionar cliente...</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Vehículo *</label>
              <select
                className="input-field"
                value={vehiculoId}
                onChange={e => setVehiculoId(e.target.value)}
                disabled={!clienteId}
              >
                <option value="">Seleccionar vehículo...</option>
                {vehiculosCliente.map(v => (
                  <option key={v.id} value={v.id}>{v.marca} {v.modelo} · {v.patente}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="section-title mb-0">Checklist de revisión</p>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{countByEstado('ok')} OK</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{countByEstado('revisar')} Rev.</span>
              <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{countByEstado('urgente')} Urg.</span>
            </div>
          </div>

          <div className="mb-3 text-[10px] text-gray-400 font-medium">Toca para cambiar estado: sin revisar → OK → Revisar → Urgente</div>

          <div className="grid grid-cols-2 gap-2">
            {CHECKLIST_KEYS.map(key => {
              const estado = checklist[key] ?? null
              const conf = estado ? ESTADO_CONFIG[estado] : null
              const Icon = conf?.icon

              return (
                <button
                  key={key}
                  onClick={() => toggleChecklist(key)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left transition-all',
                    conf
                      ? cn(conf.bg, conf.border)
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center shrink-0',
                    conf ? conf.bg : 'bg-gray-100'
                  )}>
                    {Icon ? (
                      <Icon className={cn('w-3 h-3', conf?.color)} />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={cn('text-xs font-semibold leading-tight', conf ? conf.color : 'text-gray-500')}>
                      {CHECKLIST_LABELS[key]}
                    </p>
                    {conf && (
                      <p className={cn('text-[9px] font-bold', conf.color)}>{conf.label}</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Diagnóstico */}
        <div className="bg-white rounded-2xl shadow-card p-4">
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
              {isRecording ? 'Grabando...' : 'Dictado'}
            </button>
          </div>
          <textarea
            value={diagnostico}
            onChange={e => setDiagnostico(e.target.value)}
            placeholder="Describí el estado general del vehículo, fallas detectadas y condición de los sistemas revisados..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#113d87]/30 focus:border-[#113d87] resize-none min-h-[120px]"
            rows={5}
          />
        </div>

        {/* Trabajos sugeridos */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Trabajos sugeridos</p>
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
          {trabajos.length > 0 && (
            <div className="flex flex-col gap-2">
              {trabajos.map((t, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#f4f6f9] rounded-xl px-3 py-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#113d87] shrink-0" />
                  <span className="text-sm text-gray-700 flex-1">{t}</span>
                  <button onClick={() => removeTrabajo(i)} className="text-gray-300 hover:text-gray-500">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Fotos */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Registro fotográfico</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="aspect-square bg-[#f4f6f9] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 gap-1">
                <Camera className="w-5 h-5 text-gray-300" />
                <span className="text-[10px] text-gray-300 font-medium">Foto {i + 1}</span>
              </div>
            ))}
          </div>
          <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-2.5 text-xs font-semibold text-gray-400 hover:border-gray-300 transition-colors">
            <Plus className="w-4 h-4" />
            Agregar foto
          </button>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-2 pb-4">
          <button
            onClick={() => router.push('/presupuestos/nuevo')}
            className="btn-primary-full"
          >
            <FileText className="w-4 h-4" />
            Guardar y crear presupuesto
          </button>
          <button
            onClick={() => router.back()}
            className="btn-secondary-full"
          >
            <Wrench className="w-4 h-4" />
            Guardar como borrador
          </button>
        </div>
      </div>
    </div>
  )
}
