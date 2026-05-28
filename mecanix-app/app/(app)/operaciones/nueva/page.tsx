'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Bell, MessageCircle, Mail } from 'lucide-react'
import {
  clientes, tecnicos, getVehiculosByCliente, getPresupuesto,
  getCliente, getVehiculo, type ItemPresupuesto
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function NuevaOTContent() {
  const router = useRouter()
  const params = useSearchParams()

  const presupuestoId = params.get('presupuestoId') ?? ''
  const presupuesto = presupuestoId ? getPresupuesto(presupuestoId) : null
  const clientePreloaded = presupuesto ? getCliente(presupuesto.clienteId) : null
  const vehiculoPreloaded = presupuesto ? getVehiculo(presupuesto.vehiculoId) : null

  const [clienteId, setClienteId] = useState(presupuesto?.clienteId ?? params.get('clienteId') ?? '')
  const [vehiculoId, setVehiculoId] = useState(presupuesto?.vehiculoId ?? '')
  const [descripcion, setDescripcion] = useState(presupuesto ? presupuesto.items.map(i => i.descripcion).join(' · ') : '')
  const [tecnicoId, setTecnicoId] = useState('t1')
  const [prioridad, setPrioridad] = useState<'normal' | 'alta' | 'urgente'>('alta')
  const [fechaEstimada, setFechaEstimada] = useState('2025-05-30')
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)
  const [notifWA, setNotifWA] = useState(true)
  const [notifMail, setNotifMail] = useState(false)

  const [trabajosCheck, setTrabajosCheck] = useState<Record<string, boolean>>(
    presupuesto
      ? Object.fromEntries(presupuesto.items.map(i => [i.id, true]))
      : {}
  )

  const vehiculos = clienteId && !presupuesto ? getVehiculosByCliente(clienteId) : []
  const manoDeObra = presupuesto?.items.filter(i => i.tipo === 'mano-de-obra').reduce((a, i) => a + i.total, 0) ?? 0
  const repuestos = presupuesto?.items.filter(i => i.tipo !== 'mano-de-obra').reduce((a, i) => a + i.total, 0) ?? 0

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      router.push(presupuesto?.otId ? `/seguimiento/${presupuesto.otId}` : '/operaciones')
    }, 900)
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
          <p className="text-xs text-gray-400">
            {presupuesto ? `Desde ${presupuesto.numero}` : 'Completá los datos'}
          </p>
        </div>
      </div>

      {/* Banner aprobado */}
      {presupuesto && presupuesto.estado === 'aprobado' && (
        <div className="bg-green-500 px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <p className="text-white text-sm font-bold">
            Presupuesto aprobado · {presupuesto.numero} · ${presupuesto.total.toLocaleString('es-AR')}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Cliente y vehículo (read-only si viene de presupuesto) */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Cliente y vehículo</p>

          {presupuesto ? (
            <>
              {clientePreloaded && (
                <div className="bg-[#f4f6f9] rounded-xl px-4 py-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Cliente</p>
                  <p className="text-base font-bold text-[#1e1e1e]">{clientePreloaded.nombre}</p>
                  <p className="text-xs text-gray-400">{clientePreloaded.telefono}</p>
                </div>
              )}
              {vehiculoPreloaded && (
                <div className="bg-[#f4f6f9] rounded-xl px-4 py-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5">Vehículo</p>
                  <p className="text-base font-bold text-[#1e1e1e]">{vehiculoPreloaded.marca} {vehiculoPreloaded.modelo}</p>
                  <p className="text-xs text-gray-400">{vehiculoPreloaded.version} · {vehiculoPreloaded.patente}</p>
                </div>
              )}
            </>
          ) : (
            <>
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
                <label className="label">Vehículo *</label>
                <select
                  className="input-field"
                  value={vehiculoId}
                  onChange={e => setVehiculoId(e.target.value)}
                  disabled={!clienteId}
                  required
                >
                  <option value="">Seleccionar vehículo...</option>
                  {vehiculos.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo} · {v.patente}</option>)}
                </select>
              </div>
            </>
          )}
        </div>

        {/* Trabajos a realizar */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Trabajos a realizar</p>

          {presupuesto ? (
            <>
              <p className="text-xs text-gray-400">Del presupuesto aprobado</p>
              <div className="flex flex-col gap-2">
                {presupuesto.items.map((item: ItemPresupuesto) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTrabajosCheck(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl border border-gray-100 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className={cn(
                      'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all',
                      trabajosCheck[item.id] ? 'bg-[#113d87] border-[#113d87]' : 'border-gray-300'
                    )}>
                      {trabajosCheck[item.id] && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1e1e1e] truncate">{item.descripcion}</p>
                      <p className="text-xs text-gray-400">${item.total.toLocaleString('es-AR')}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
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
          )}

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
                    'flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all',
                    prioridad === p
                      ? p === 'urgente'
                        ? 'bg-red-500 border-red-500 text-white'
                        : p === 'alta'
                        ? 'bg-amber-50 border-amber-400 text-amber-700'
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
            <select className="input-field" value={tecnicoId} onChange={e => setTecnicoId(e.target.value)}>
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

        {/* Costos (solo si no viene de presupuesto) */}
        {!presupuesto && (
          <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
            <p className="section-title mb-0">Costos estimados</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="label">Mano de obra ($)</label>
                <input type="number" placeholder="0" className="input-field" min="0" />
              </div>
              <div className="flex-1">
                <label className="label">Repuestos ($)</label>
                <input type="number" placeholder="0" className="input-field" min="0" />
              </div>
            </div>
          </div>
        )}

        {/* Resumen costos si viene de presupuesto */}
        {presupuesto && (
          <div className="bg-[#e6ecf7] rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-500">Repuestos</span>
              <span className="font-semibold text-[#ee6a28]">${repuestos.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Mano de obra</span>
              <span className="font-semibold text-[#113d87]">${manoDeObra.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between items-center border-t border-blue-200 pt-2">
              <span className="font-bold text-[#1e1e1e]">Total OT</span>
              <span className="text-xl font-black text-[#ee6a28]">${presupuesto.total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        )}

        {/* Notificaciones */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Notificar al cliente</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25d366]" />
                <span className="text-sm font-semibold text-gray-700">WhatsApp</span>
              </div>
              <button
                type="button"
                onClick={() => setNotifWA(!notifWA)}
                className={cn('w-11 h-6 rounded-full transition-all relative', notifWA ? 'bg-[#25d366]' : 'bg-gray-200')}
              >
                <div className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all', notifWA ? 'left-5' : 'left-0.5')} />
              </button>
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#113d87]" />
                <span className="text-sm font-semibold text-gray-700">Email</span>
              </div>
              <button
                type="button"
                onClick={() => setNotifMail(!notifMail)}
                className={cn('w-11 h-6 rounded-full transition-all relative', notifMail ? 'bg-[#113d87]' : 'bg-gray-200')}
              >
                <div className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all', notifMail ? 'left-5' : 'left-0.5')} />
              </button>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <label className="label">Notas adicionales</label>
          <textarea
            value={notas}
            onChange={e => setNotas(e.target.value)}
            placeholder="Observaciones, instrucciones especiales..."
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
            <Bell className="w-4 h-4" />
            {saving ? 'Creando OT...' : 'Crear OT'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NuevaOTPage() {
  return <Suspense fallback={null}><NuevaOTContent /></Suspense>
}
