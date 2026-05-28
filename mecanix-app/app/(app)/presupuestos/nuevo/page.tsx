'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Send, FileText } from 'lucide-react'
import { clientes, getVehiculosByCliente, type ItemPresupuesto } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type TipoItem = 'mano-de-obra' | 'repuesto' | 'material'
const TIPO_LABEL: Record<TipoItem, string> = {
  'mano-de-obra': 'Mano de obra',
  repuesto: 'Repuesto',
  material: 'Material',
}
const TIPO_COLOR: Record<TipoItem, string> = {
  'mano-de-obra': 'bg-[#e6ecf7] text-[#113d87]',
  repuesto: 'bg-[#fde8dc] text-[#ee6a28]',
  material: 'bg-purple-100 text-purple-700',
}

let nextId = 1

function NuevoPresupuestoContent() {
  const router = useRouter()
  const params = useSearchParams()

  const [clienteId, setClienteId] = useState(params.get('clienteId') ?? '')
  const [vehiculoId, setVehiculoId] = useState('')
  const [validez, setValidez] = useState('7')
  const [items, setItems] = useState<ItemPresupuesto[]>([
    { id: 'new-1', descripcion: '', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 0, total: 0 },
  ])
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)

  const vehiculos = clienteId ? getVehiculosByCliente(clienteId) : []
  const total = items.reduce((acc, i) => acc + i.cantidad * i.precioUnitario, 0)

  function addItem() {
    nextId++
    setItems(prev => [...prev, {
      id: `new-${nextId}`, descripcion: '', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 0, total: 0,
    }])
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function updateItem(id: string, field: keyof ItemPresupuesto, value: string | number) {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      const updated = { ...item, [field]: value }
      updated.total = updated.cantidad * updated.precioUnitario
      return updated
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => router.push('/operaciones'), 900)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-bold text-[#1e1e1e]">Nuevo presupuesto</h1>
          <p className="text-xs text-gray-400">Armá el presupuesto para el cliente</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Cliente y vehículo */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Destinatario</p>
          <div>
            <label className="label">Cliente *</label>
            <select className="input-field" value={clienteId} onChange={e => { setClienteId(e.target.value); setVehiculoId('') }} required>
              <option value="">Seleccionar cliente...</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Vehículo</label>
            <select className="input-field" value={vehiculoId} onChange={e => setVehiculoId(e.target.value)} disabled={!clienteId}>
              <option value="">Seleccionar vehículo...</option>
              {vehiculos.map(v => <option key={v.id} value={v.id}>{v.marca} {v.modelo} · {v.patente}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Validez</label>
            <div className="flex gap-2">
              {['3', '7', '15', '30'].map(d => (
                <button key={d} type="button" onClick={() => setValidez(d)}
                  className={cn('flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all',
                    validez === d ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]' : 'border-gray-200 text-gray-400'
                  )}>
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="section-title mb-0">Ítems</p>
            <button type="button" onClick={addItem} className="flex items-center gap-1 text-xs font-bold text-[#113d87]">
              <Plus className="w-3.5 h-3.5" />
              Agregar
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((item, idx) => (
              <div key={item.id} className="border border-gray-100 rounded-2xl p-3 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">Ítem {idx + 1}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(item.id)} className="text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Tipo */}
                <div className="flex gap-1.5">
                  {(Object.keys(TIPO_LABEL) as TipoItem[]).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateItem(item.id, 'tipo', t)}
                      className={cn(
                        'flex-1 py-1.5 rounded-xl text-[10px] font-bold border transition-all',
                        item.tipo === t ? TIPO_COLOR[t] + ' border-transparent' : 'border-gray-200 text-gray-400'
                      )}
                    >
                      {TIPO_LABEL[t]}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={item.descripcion}
                  onChange={e => updateItem(item.id, 'descripcion', e.target.value)}
                  placeholder="Descripción del ítem..."
                  className="input-field py-2 min-h-0 text-sm"
                />

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 mb-1 block">Cantidad</label>
                    <input
                      type="number"
                      value={item.cantidad}
                      onChange={e => updateItem(item.id, 'cantidad', Number(e.target.value))}
                      className="input-field py-2 min-h-0 text-sm"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold text-gray-400 mb-1 block">Precio unit. ($)</label>
                    <input
                      type="number"
                      value={item.precioUnitario || ''}
                      onChange={e => updateItem(item.id, 'precioUnitario', Number(e.target.value))}
                      placeholder="0"
                      className="input-field py-2 min-h-0 text-sm"
                      min="0"
                    />
                  </div>
                </div>

                {item.precioUnitario > 0 && (
                  <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                    <span className="text-xs text-gray-400">Subtotal</span>
                    <span className="text-sm font-black text-[#ee6a28]">
                      ${(item.cantidad * item.precioUnitario).toLocaleString('es-AR')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        {total > 0 && (
          <div className="bg-[#113d87] rounded-2xl p-4 flex items-center justify-between">
            <span className="text-white font-semibold">Total presupuesto</span>
            <span className="text-2xl font-black text-white">${total.toLocaleString('es-AR')}</span>
          </div>
        )}

        {/* Notas */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <label className="label">Notas / Observaciones</label>
          <textarea
            value={notas}
            onChange={e => setNotas(e.target.value)}
            placeholder="Condiciones de pago, garantía, aclaraciones..."
            className="input-field resize-none min-h-0"
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-2 pb-4">
          <button type="submit" disabled={saving} className={cn('btn-primary-full', saving && 'opacity-70')}>
            <Send className="w-4 h-4" />
            {saving ? 'Guardando...' : 'Guardar y enviar'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary-full">
            <FileText className="w-4 h-4" />
            Guardar como borrador
          </button>
        </div>
      </form>
    </div>
  )
}

export default function NuevoPresupuestoPage() {
  return <Suspense fallback={null}><NuevoPresupuestoContent /></Suspense>
}
