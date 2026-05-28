'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { clientes, tecnicos, getVehiculosByCliente } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TIPOS_TRABAJO = [
  'Service completo', 'Cambio de aceite', 'Revisión eléctrica',
  'Chapa y pintura', 'Frenos', 'Alineación y balanceo',
  'Distribución', 'Refrigeración', 'Diagnóstico', 'Otro',
]

const DURACIONES = [
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '2 horas', value: 120 },
  { label: '4 horas', value: 240 },
  { label: 'Todo el día', value: 480 },
]

function NuevoTurnoContent() {
  const router = useRouter()
  const params = useSearchParams()

  const [clienteId, setClienteId] = useState(params.get('clienteId') ?? '')
  const [vehiculoId, setVehiculoId] = useState('')
  const [fecha, setFecha] = useState(params.get('fecha') ?? '')
  const [hora, setHora] = useState(params.get('hora') ?? '09:00')
  const [tipoTrabajo, setTipoTrabajo] = useState('')
  const [duracion, setDuracion] = useState(60)
  const [tecnicoId, setTecnicoId] = useState('')
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)

  const vehiculos = clienteId ? getVehiculosByCliente(clienteId) : []

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => router.push('/agenda'), 800)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-bold text-[#1e1e1e]">Nuevo turno</h1>
          <p className="text-xs text-gray-400">Agenda un turno para un cliente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Cliente */}
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
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Vehículo</label>
            <select
              className="input-field"
              value={vehiculoId}
              onChange={e => setVehiculoId(e.target.value)}
              disabled={!clienteId}
            >
              <option value="">Seleccionar vehículo...</option>
              {vehiculos.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo} · {v.patente}</option>)}
            </select>
          </div>
        </div>

        {/* Fecha y hora */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Fecha y hora</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Fecha *</label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Hora *</label>
              <input
                type="time"
                value={hora}
                onChange={e => setHora(e.target.value)}
                className="input-field"
                min="08:00"
                max="19:00"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Duración estimada</label>
            <div className="flex gap-2 flex-wrap">
              {DURACIONES.map(d => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDuracion(d.value)}
                  className={cn(
                    'px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all',
                    duracion === d.value
                      ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                      : 'border-gray-200 text-gray-400'
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tipo de trabajo */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Tipo de trabajo</p>
          <div className="flex flex-wrap gap-2">
            {TIPOS_TRABAJO.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTipoTrabajo(t)}
                className={cn(
                  'px-3 py-2 rounded-xl text-xs font-semibold border-2 transition-all',
                  tipoTrabajo === t
                    ? 'bg-[#fde8dc] border-[#ee6a28] text-[#ee6a28]'
                    : 'border-gray-200 text-gray-500'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Técnico y notas */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Asignación y notas</p>
          <div>
            <label className="label">Técnico (opcional)</label>
            <select className="input-field" value={tecnicoId} onChange={e => setTecnicoId(e.target.value)}>
              <option value="">Sin asignar</option>
              {tecnicos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Notas</label>
            <textarea
              value={notas}
              onChange={e => setNotas(e.target.value)}
              placeholder="Instrucciones especiales, aclaraciones..."
              className="input-field resize-none min-h-0"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3 pb-4">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">Cancelar</button>
          <button type="submit" disabled={saving} className={cn('btn-primary flex-1', saving && 'opacity-70')}>
            {saving ? 'Guardando...' : 'Agendar turno'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NuevoTurnoPage() {
  return <Suspense fallback={null}><NuevoTurnoContent /></Suspense>
}
