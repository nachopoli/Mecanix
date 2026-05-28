'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Plus, Trash2, Eye, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import {
  clientes, getVehiculosByCliente, getPeritaje, getPresupuesto,
  type ItemPresupuesto
} from '@/lib/mock-data'
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

let itemCounter = 100

function makeItem(tipo: TipoItem = 'repuesto'): ItemPresupuesto {
  return { id: `new-${++itemCounter}`, descripcion: '', tipo, cantidad: 1, precioUnitario: 0, total: 0 }
}

function preloadFromPresupuesto(presupuestoId: string) {
  const p = getPresupuesto(presupuestoId)
  if (!p) return null
  return { clienteId: p.clienteId, vehiculoId: p.vehiculoId, items: p.items, numero: p.numero }
}

function preloadFromPeritaje(peritajeId: string) {
  const per = getPeritaje(peritajeId)
  if (!per) return null
  if (per.presupuestoId) {
    const data = preloadFromPresupuesto(per.presupuestoId)
    if (data) return { ...data, peritajeId }
  }
  return { clienteId: per.clienteId, vehiculoId: per.vehiculoId, items: [] as ItemPresupuesto[], peritajeId, numero: undefined }
}

function NuevoPresupuestoContent() {
  const router = useRouter()
  const params = useSearchParams()

  const peritajeId = params.get('peritajeId') ?? ''
  const preloaded = peritajeId ? preloadFromPeritaje(peritajeId) : null

  const [clienteId, setClienteId] = useState(preloaded?.clienteId ?? params.get('clienteId') ?? '')
  const [vehiculoId, setVehiculoId] = useState(preloaded?.vehiculoId ?? '')
  const [validez, setValidez] = useState('7')
  const [descuento, setDescuento] = useState(0)
  const [ivaEnabled, setIvaEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showItems, setShowItems] = useState(true)

  const initialItems: ItemPresupuesto[] = preloaded?.items.length
    ? preloaded.items
    : [makeItem('repuesto')]

  const [items, setItems] = useState<ItemPresupuesto[]>(initialItems)

  const vehiculos = clienteId ? getVehiculosByCliente(clienteId) : []
  const numero = preloaded?.numero ?? 'PRE-NUEVO'

  const subtotal = items.reduce((acc, i) => acc + i.cantidad * i.precioUnitario, 0)
  const descuentoAmt = Math.round(subtotal * (descuento / 100))
  const baseIva = subtotal - descuentoAmt
  const ivaAmt = ivaEnabled ? Math.round(baseIva * 0.21) : 0
  const total = baseIva + ivaAmt

  const repuestos = items.filter(i => i.tipo === 'repuesto' || i.tipo === 'material')
  const manoDeObra = items.filter(i => i.tipo === 'mano-de-obra')

  function addItem(tipo: TipoItem) {
    setItems(prev => [...prev, makeItem(tipo)])
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

  function handleSend() {
    setSaving(true)
    setTimeout(() => router.push('/operaciones'), 900)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      {/* Header azul con total */}
      <div className="bg-gradient-to-b from-[#0a2657] to-[#113d87] px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-white font-bold text-base">{numero}</h1>
            <p className="text-blue-300 text-xs">Nuevo presupuesto</p>
          </div>
          <span className="badge bg-amber-400 text-amber-900">Borrador</span>
        </div>

        <div className="text-center">
          <p className="text-blue-300 text-xs font-semibold mb-1">Total presupuesto</p>
          <p className="text-white font-black text-4xl">
            ${total.toLocaleString('es-AR')}
          </p>
          {(descuento > 0 || ivaEnabled) && (
            <p className="text-blue-300 text-xs mt-1">
              Subtotal ${subtotal.toLocaleString('es-AR')}
              {descuento > 0 && ` · Desc. ${descuento}%`}
              {ivaEnabled && ' · IVA 21% incluido'}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 -mt-3 flex flex-col gap-3 pb-32">

        {/* Cliente y vehículo */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Destinatario</p>
          <div className="flex flex-col gap-2">
            <select
              className="input-field"
              value={clienteId}
              onChange={e => { setClienteId(e.target.value); setVehiculoId('') }}
            >
              <option value="">Seleccionar cliente...</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
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
          <div>
            <label className="label">Validez</label>
            <div className="flex gap-2">
              {['3', '7', '15', '30'].map(d => (
                <button
                  key={d}
                  onClick={() => setValidez(d)}
                  className={cn(
                    'flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all',
                    validez === d ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]' : 'border-gray-200 text-gray-400'
                  )}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Repuestos */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <button
            onClick={() => setShowItems(!showItems)}
            className="w-full flex items-center justify-between px-4 py-3.5"
          >
            <div>
              <p className="text-sm font-bold text-[#1e1e1e] text-left">Repuestos y materiales</p>
              <p className="text-xs text-gray-400 text-left">{repuestos.length} ítems · ${repuestos.reduce((a, i) => a + i.cantidad * i.precioUnitario, 0).toLocaleString('es-AR')}</p>
            </div>
            {showItems ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {showItems && (
            <div className="px-4 pb-4 flex flex-col gap-2">
              {repuestos.map((item) => (
                <ItemRow key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} canRemove={items.length > 1} />
              ))}
              <button
                onClick={() => addItem('repuesto')}
                className="flex items-center gap-1.5 text-xs font-bold text-[#ee6a28] py-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar repuesto
              </button>
            </div>
          )}
        </div>

        {/* Mano de obra */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5">
            <div>
              <p className="text-sm font-bold text-[#1e1e1e]">Mano de obra</p>
              <p className="text-xs text-gray-400">{manoDeObra.length} ítems · ${manoDeObra.reduce((a, i) => a + i.cantidad * i.precioUnitario, 0).toLocaleString('es-AR')}</p>
            </div>
          </div>
          <div className="px-4 pb-4 flex flex-col gap-2">
            {manoDeObra.map((item) => (
              <ItemRow key={item.id} item={item} onUpdate={updateItem} onRemove={removeItem} canRemove={items.length > 1} />
            ))}
            <button
              onClick={() => addItem('mano-de-obra')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#113d87] py-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Agregar mano de obra
            </button>
          </div>
        </div>

        {/* Ajustes */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Ajustes</p>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700 flex-1">Descuento</label>
            <div className="flex items-center gap-1">
              {[0, 5, 10, 15, 20].map(d => (
                <button
                  key={d}
                  onClick={() => setDescuento(d)}
                  className={cn(
                    'px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all',
                    descuento === d ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]' : 'border-gray-200 text-gray-400'
                  )}
                >
                  {d}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-700">IVA 21%</p>
              <p className="text-xs text-gray-400">Aplicar IVA al total</p>
            </div>
            <button
              onClick={() => setIvaEnabled(!ivaEnabled)}
              className={cn(
                'w-12 h-6 rounded-full transition-all relative',
                ivaEnabled ? 'bg-[#113d87]' : 'bg-gray-200'
              )}
            >
              <div className={cn(
                'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all',
                ivaEnabled ? 'left-6' : 'left-0.5'
              )} />
            </button>
          </div>

          {/* Resumen */}
          <div className="border-t border-gray-100 pt-3 flex flex-col gap-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString('es-AR')}</span>
            </div>
            {descuento > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Descuento {descuento}%</span>
                <span className="font-semibold text-green-600">−${descuentoAmt.toLocaleString('es-AR')}</span>
              </div>
            )}
            {ivaEnabled && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">IVA 21%</span>
                <span className="font-semibold">+${ivaAmt.toLocaleString('es-AR')}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1 border-t border-gray-100 mt-1">
              <span className="text-base font-bold text-[#1e1e1e]">Total</span>
              <span className="text-2xl font-black text-[#ee6a28]">${total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer fijo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 safe-bottom">
        <button
          onClick={() => router.push('/presupuestos/publico/p5')}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-[#113d87] text-[#113d87] font-semibold rounded-xl py-3 text-sm active:scale-95 transition-all"
        >
          <Eye className="w-4 h-4" />
          Vista cliente
        </button>
        <button
          onClick={handleSend}
          disabled={saving}
          className={cn('flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold rounded-xl py-3 text-sm active:scale-95 transition-all', saving && 'opacity-70')}
        >
          <MessageCircle className="w-4 h-4" />
          {saving ? 'Enviando...' : 'Enviar WhatsApp'}
        </button>
      </div>
    </div>
  )
}

function ItemRow({
  item, onUpdate, onRemove, canRemove
}: {
  item: ItemPresupuesto
  onUpdate: (id: string, field: keyof ItemPresupuesto, value: string | number) => void
  onRemove: (id: string) => void
  canRemove: boolean
}) {
  const subtotal = item.cantidad * item.precioUnitario

  return (
    <div className="border border-gray-100 rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', TIPO_COLOR[item.tipo as TipoItem])}>
          {TIPO_LABEL[item.tipo as TipoItem]}
        </span>
        {canRemove && (
          <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <input
        type="text"
        value={item.descripcion}
        onChange={e => onUpdate(item.id, 'descripcion', e.target.value)}
        placeholder="Descripción..."
        className="input-field py-2 min-h-0 text-sm"
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-gray-400 mb-1 block">Cant.</label>
          <input
            type="number"
            value={item.cantidad}
            onChange={e => onUpdate(item.id, 'cantidad', Number(e.target.value))}
            className="input-field py-2 min-h-0 text-sm"
            min="1"
          />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-400 mb-1 block">Precio unit. ($)</label>
          <input
            type="number"
            value={item.precioUnitario || ''}
            onChange={e => onUpdate(item.id, 'precioUnitario', Number(e.target.value))}
            placeholder="0"
            className="input-field py-2 min-h-0 text-sm"
            min="0"
          />
        </div>
      </div>
      {subtotal > 0 && (
        <div className="flex justify-between items-center pt-1 border-t border-gray-100">
          <span className="text-xs text-gray-400">Subtotal</span>
          <span className="text-sm font-black text-[#ee6a28]">${subtotal.toLocaleString('es-AR')}</span>
        </div>
      )}
    </div>
  )
}

export default function NuevoPresupuestoPage() {
  return <Suspense fallback={null}><NuevoPresupuestoContent /></Suspense>
}
