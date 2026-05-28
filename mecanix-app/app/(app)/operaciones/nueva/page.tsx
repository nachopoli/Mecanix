'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { clientes, tecnicos, getVehiculosByCliente } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function NuevaOTContent() {
  const router = useRouter()
  const params = useSearchParams()

  const [clienteId, setClienteId] = useState(params.get('clienteId') ?? '')
  const [vehiculoId, setVehiculoId] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [tecnicoId, setTecnicoId] = useState('t1')
  const [prioridad, setPrioridad] = useState<'normal' | 'alta' | 'urgente'>('normal')
  const [fechaEstimada, setFechaEstimada] = useState('')
  const [manoDeObra, setManoDeObra] = useState('')
  const [repuestos, setRepuestos] = useState('')
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)

  const vehiculos = clienteId ? getVehiculosByCliente(clienteId) : []
  const total = (Number(manoDeObra) || 0) + (Number(repuestos) || 0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      router.push('/operaciones')
    }, 800)
  }

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
        <div>
          <h1 className="text-base font-bold text-[#1e1e1e]">Nueva orden de trabajo</h1>
          <p className="text-xs text-gray-400">Completá los datos de la OT</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Cliente y vehículo */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Cliente y vehículo</p>
          <div>
            <label className="label">Cliente *</label>
            <select
              className="input-field"
              value={clienteId}
              onChange={e => { setClienteId(e.target.value); setVehiculoId('') }}
              required
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
              required
            >
              <option value="">Seleccionar vehículo...</option>
              {vehiculos.map(v => (
                <option key={v.id} value={v.id}>{v.marca} {v.modelo} · {v.patente}</option>
              ))}
            </select>
            {clienteId && vehiculos.length === 0 && (
              <p className="text-xs text-amber-600 mt-1">Sin vehículos. <span className="underline cursor-pointer">Agregar vehículo</span></p>
            )}
          </div>
        </div>

        {/* Trabajo */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Trabajo a realizar</p>
          <div>
            <label className="label">Descripción *</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Describí el trabajo a realizar..."
              className="input-field resize-none min-h-0"
              rows={3}
              required
            />
          </div>

          {/* Prioridad */}
          <div>
            <label className="label">Prioridad</label>
            <div className="flex gap-2">
              {(['normal', 'alta', 'urgente'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrioridad(p)}
                  className={cn(
                    'flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all capitalize',
                    prioridad === p
                      ? p === 'urgente'
                        ? 'bg-red-500 border-red-500 text-white'
                        : p === 'alta'
                        ? 'bg-orange-100 border-orange-400 text-orange-700'
                        : 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                      : 'border-gray-200 text-gray-400'
                  )}
                >
                  {p === 'normal' ? 'Normal' : p === 'alta' ? 'Alta' : 'Urgente'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Asignación */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Asignación</p>
          <div>
            <label className="label">Técnico asignado</label>
            <select
              className="input-field"
              value={tecnicoId}
              onChange={e => setTecnicoId(e.target.value)}
            >
              {tecnicos.map(t => (
                <option key={t.id} value={t.id}>{t.nombre} — {t.especialidad}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Fecha estimada de entrega</label>
            <input
              type="date"
              value={fechaEstimada}
              onChange={e => setFechaEstimada(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Costos estimados */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Costos estimados</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Mano de obra ($)</label>
              <input
                type="number"
                placeholder="0"
                value={manoDeObra}
                onChange={e => setManoDeObra(e.target.value)}
                className="input-field"
                min="0"
              />
            </div>
            <div>
              <label className="label">Repuestos ($)</label>
              <input
                type="number"
                placeholder="0"
                value={repuestos}
                onChange={e => setRepuestos(e.target.value)}
                className="input-field"
                min="0"
              />
            </div>
          </div>
          {total > 0 && (
            <div className="bg-[#f4f6f9] rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-600">Total estimado</span>
              <span className="text-lg font-black text-[#ee6a28]">${total.toLocaleString('es-AR')}</span>
            </div>
          )}
        </div>

        {/* Notas */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <label className="label">Notas adicionales</label>
          <textarea
            value={notas}
            onChange={e => setNotas(e.target.value)}
            placeholder="Observaciones, instrucciones especiales, etc..."
            className="input-field resize-none min-h-0"
            rows={3}
          />
        </div>

        {/* Submit */}
        <div className="flex gap-3 pb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className={cn('btn-primary flex-1', saving && 'opacity-70')}
          >
            {saving ? 'Creando...' : 'Crear OT'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NuevaOTPage() {
  return <Suspense fallback={null}><NuevaOTContent /></Suspense>
}
