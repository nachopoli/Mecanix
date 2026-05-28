'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { clientes } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const MARCAS = ['Toyota', 'Volkswagen', 'Ford', 'Chevrolet', 'Renault', 'Peugeot', 'Fiat', 'Honda', 'Nissan', 'Hyundai', 'Kia', 'Citroën', 'Mercedes', 'BMW', 'Audi', 'Otra']
const COMBUSTIBLES = ['Nafta', 'Diesel', 'GNC', 'Híbrido', 'Eléctrico']
const COLORES = ['Blanco', 'Negro', 'Plateado', 'Gris', 'Rojo', 'Azul', 'Verde', 'Otro']

function NuevoVehiculoContent() {
  const router = useRouter()
  const params = useSearchParams()

  const [form, setForm] = useState({
    clienteId: params.get('clienteId') ?? '',
    marca: '', modelo: '', version: '',
    año: new Date().getFullYear().toString(),
    patente: '', km: '', color: '', combustible: 'Nafta', vin: '',
  })
  const [saving, setSaving] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const returnTo = form.clienteId ? `/clientes/${form.clienteId}` : '/vehiculos'
    setTimeout(() => router.push(returnTo), 900)
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
          <h1 className="text-base font-bold text-[#1e1e1e]">Nuevo vehículo</h1>
          <p className="text-xs text-gray-400">Registrá un vehículo en el sistema</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Propietario */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Propietario</p>
          <div>
            <label className="label">Cliente *</label>
            <select
              className="input-field"
              value={form.clienteId}
              onChange={e => set('clienteId', e.target.value)}
              required
            >
              <option value="">Seleccionar cliente...</option>
              {clientes.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Identificación */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Identificación</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Marca *</label>
              <select className="input-field" value={form.marca} onChange={e => set('marca', e.target.value)} required>
                <option value="">Marca...</option>
                {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Modelo *</label>
              <input
                type="text"
                value={form.modelo}
                onChange={e => set('modelo', e.target.value)}
                placeholder="Ej: Hilux"
                className="input-field"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">Versión</label>
            <input
              type="text"
              value={form.version}
              onChange={e => set('version', e.target.value)}
              placeholder="Ej: 4x4 SR 2.8 TDi"
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Año *</label>
              <input
                type="number"
                value={form.año}
                onChange={e => set('año', e.target.value)}
                min="1960"
                max={new Date().getFullYear() + 1}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Patente *</label>
              <input
                type="text"
                value={form.patente}
                onChange={e => set('patente', e.target.value.toUpperCase())}
                placeholder="AB123CD"
                className="input-field font-bold tracking-wider"
                maxLength={7}
                required
              />
            </div>
          </div>
        </div>

        {/* Estado */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Estado actual</p>
          <div>
            <label className="label">Kilometraje *</label>
            <input
              type="number"
              value={form.km}
              onChange={e => set('km', e.target.value)}
              placeholder="85000"
              className="input-field"
              min="0"
              required
            />
          </div>
          <div>
            <label className="label">Combustible</label>
            <div className="flex gap-2 flex-wrap">
              {COMBUSTIBLES.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('combustible', c)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all',
                    form.combustible === c
                      ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                      : 'border-gray-200 text-gray-400'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORES.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('color', c)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all',
                    form.color === c
                      ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                      : 'border-gray-200 text-gray-400'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">VIN / N° de chasis</label>
            <input
              type="text"
              value={form.vin}
              onChange={e => set('vin', e.target.value.toUpperCase())}
              placeholder="WVZZZ2HZ..."
              className="input-field font-mono text-sm"
              maxLength={17}
            />
          </div>
        </div>

        <div className="flex gap-3 pb-4">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className={cn('btn-primary flex-1', saving && 'opacity-70')}>
            {saving ? 'Guardando...' : 'Guardar vehículo'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NuevoVehiculoPage() {
  return <Suspense fallback={null}><NuevoVehiculoContent /></Suspense>
}
