'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Car, ChevronRight, Fuel } from 'lucide-react'
import { vehiculos, getCliente } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const MARCAS = ['Todas', 'Toyota', 'Volkswagen', 'Renault', 'Ford', 'Peugeot', 'Fiat', 'Chevrolet']

export default function VehiculosPage() {
  const [search, setSearch] = useState('')
  const [marcaFiltro, setMarcaFiltro] = useState('Todas')

  const filtered = vehiculos.filter(v => {
    const q = search.toLowerCase()
    const matchSearch =
      v.marca.toLowerCase().includes(q) ||
      v.modelo.toLowerCase().includes(q) ||
      v.patente.toLowerCase().includes(q) ||
      getCliente(v.clienteId)?.nombre.toLowerCase().includes(q)
    const matchMarca = marcaFiltro === 'Todas' || v.marca === marcaFiltro
    return matchSearch && matchMarca
  })

  return (
    <div className="flex flex-col h-full bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-bold text-[#1e1e1e]">Vehículos</h1>
            <p className="text-xs text-gray-400">{vehiculos.length} registrados</p>
          </div>
          <Link
            href="/vehiculos/nuevo"
            className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" />
            Nuevo
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por patente, marca, cliente..."
            className="input-field pl-10"
          />
        </div>

        {/* Marca filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {MARCAS.map(m => (
            <button
              key={m}
              onClick={() => setMarcaFiltro(m)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all',
                marcaFiltro === m
                  ? 'bg-[#113d87] border-[#113d87] text-white'
                  : 'border-gray-200 text-gray-500 bg-white'
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Car className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 font-semibold">Sin vehículos</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filtered.map(v => {
              const cliente = getCliente(v.clienteId)
              return (
                <Link key={v.id} href={`/vehiculos/${v.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#e6ecf7] rounded-2xl flex items-center justify-center shrink-0">
                    <Car className="w-6 h-6 text-[#113d87]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-bold text-[#1e1e1e] truncate">{v.marca} {v.modelo}</p>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{v.version} · {v.año} · {v.color}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-[#113d87] bg-[#e6ecf7] px-2 py-0.5 rounded-lg">{v.patente}</span>
                      <span className="text-xs text-gray-400">{v.km.toLocaleString('es-AR')} km</span>
                      {v.combustible && (
                        <div className="flex items-center gap-0.5">
                          <Fuel className="w-3 h-3 text-gray-300" />
                          <span className="text-[10px] text-gray-400">{v.combustible}</span>
                        </div>
                      )}
                    </div>
                    {cliente && (
                      <p className="text-xs text-[#ee6a28] font-semibold mt-1 truncate">{cliente.nombre}</p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
