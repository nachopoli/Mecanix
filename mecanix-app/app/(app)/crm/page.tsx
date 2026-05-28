'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Phone, MessageCircle, ChevronRight, Car, AlertCircle, Star } from 'lucide-react'
import { clientes, vehiculos, getVehiculosByCliente } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type Tab = 'clientes' | 'vehiculos'

const etiquetaConfig: Record<string, { color: string; bg: string }> = {
  VIP: { color: '#ee6a28', bg: '#fde8dc' },
  Regular: { color: '#113d87', bg: '#e6ecf7' },
  Nuevo: { color: '#10b981', bg: '#d1fae5' },
  Inactivo: { color: '#8b8b8b', bg: '#f5f5f5' },
}

function getInitials(nombre: string) {
  return nombre.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

export default function CRMPage() {
  const [tab, setTab] = useState<Tab>('clientes')
  const [search, setSearch] = useState('')

  const clientesFiltrados = clientes.filter(c =>
    `${c.nombre} ${c.telefono} ${c.mail}`.toLowerCase().includes(search.toLowerCase())
  )

  const vehiculosFiltrados = vehiculos.filter(v =>
    `${v.marca} ${v.modelo} ${v.patente} ${v.version}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 px-4 pt-4 pb-0">
        <div className="flex gap-0 bg-[#f4f6f9] rounded-xl p-1 mb-4">
          {(['clientes', 'vehiculos'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize',
                tab === t
                  ? 'bg-white text-[#113d87] shadow-sm'
                  : 'text-gray-500'
              )}
            >
              {t === 'clientes' ? 'Clientes' : 'Vehículos'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={tab === 'clientes' ? 'Buscar cliente...' : 'Buscar vehículo...'}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">

        {/* Stats bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-400">
            {tab === 'clientes'
              ? `${clientesFiltrados.length} cliente${clientesFiltrados.length !== 1 ? 's' : ''}`
              : `${vehiculosFiltrados.length} vehículo${vehiculosFiltrados.length !== 1 ? 's' : ''}`}
          </p>
          <Link
            href={tab === 'clientes' ? '/clientes/nuevo' : '/vehiculos/nuevo'}
            className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            {tab === 'clientes' ? 'Nuevo cliente' : 'Nuevo vehículo'}
          </Link>
        </div>

        {/* Clientes list */}
        {tab === 'clientes' && (
          <div className="flex flex-col gap-2.5">
            {clientesFiltrados.map(cliente => {
              const initials = getInitials(cliente.nombre)
              const veh = getVehiculosByCliente(cliente.id)
              const cfg = etiquetaConfig[cliente.etiqueta] || etiquetaConfig.Regular

              return (
                <div key={cliente.id} className="bg-white rounded-2xl shadow-card p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Avatar */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-bold text-[#1e1e1e]">{cliente.nombre}</p>
                        {cliente.etiqueta === 'VIP' && (
                          <Star className="w-3 h-3 text-[#ee6a28] fill-[#ee6a28]" />
                        )}
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {cliente.etiqueta}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{cliente.telefono}</p>
                      <p className="text-xs text-gray-400 truncate">{cliente.mail}</p>
                    </div>

                    {cliente.deudaPendiente > 0 && (
                      <div className="flex items-center gap-1 shrink-0">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-xs font-bold text-red-500">
                          ${cliente.deudaPendiente.toLocaleString('es-AR')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Vehicles chips */}
                  {veh.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mb-3">
                      {veh.map(v => (
                        <div key={v.id} className="flex items-center gap-1 bg-[#f4f6f9] rounded-lg px-2.5 py-1">
                          <Car className="w-3 h-3 text-gray-400" />
                          <span className="text-[11px] font-semibold text-gray-600">
                            {v.marca} {v.modelo} · {v.patente}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Info row */}
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                    <span>Origen: <span className="font-semibold text-gray-600">{cliente.origen}</span></span>
                    <span>·</span>
                    <span>
                      Última visita:{' '}
                      <span className="font-semibold text-gray-600">
                        {new Date(cliente.fechaUltimaVisita + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                      </span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a href={`tel:${cliente.telefono}`} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95 transition-all hover:bg-gray-50">
                      <Phone className="w-3.5 h-3.5" />
                      Llamar
                    </a>
                    <a href={`https://wa.me/549${cliente.telefono.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95 transition-all hover:bg-gray-50">
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <Link href={`/clientes/${cliente.id}`} className="flex-1 flex items-center justify-center gap-1.5 bg-[#e6ecf7] rounded-xl py-2 text-xs font-semibold text-[#113d87] active:scale-95 transition-all">
                      Ver ficha
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Vehiculos list */}
        {tab === 'vehiculos' && (
          <div className="flex flex-col gap-2.5">
            {vehiculosFiltrados.map(v => {
              const cliente = clientes.find(c => c.id === v.clienteId)
              const markaColors: Record<string, string> = {
                Toyota: '#e63946', Volkswagen: '#1d3557', Ford: '#003087', Renault: '#f4a261',
                Peugeot: '#6b4226', Fiat: '#e63946', Chevrolet: '#f4c430',
              }
              const color = markaColors[v.marca] || '#113d87'

              return (
                <div key={v.id} className="bg-white rounded-2xl shadow-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0"
                      style={{ background: color }}
                    >
                      {v.marca.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1e1e1e]">
                        {v.marca} {v.modelo}
                      </p>
                      <p className="text-xs text-gray-500">{v.version} · {v.año}</p>
                      <p className="text-xs font-bold text-[#113d87] mt-0.5">{v.patente}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">Km</p>
                      <p className="text-sm font-bold text-[#1e1e1e]">{v.km.toLocaleString('es-AR')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 bg-[#f4f6f9] rounded-xl px-3 py-2">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Propietario</p>
                      <p className="text-xs font-semibold text-[#1e1e1e] mt-0.5">{cliente?.nombre}</p>
                    </div>
                    <div className="flex-1 bg-[#f4f6f9] rounded-xl px-3 py-2">
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Color</p>
                      <p className="text-xs font-semibold text-[#1e1e1e] mt-0.5">{v.color}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/peritajes/nuevo?vehiculoId=${v.id}`} className="flex-1 flex items-center justify-center gap-1.5 bg-[#e6ecf7] rounded-xl py-2 text-xs font-semibold text-[#113d87] active:scale-95 transition-all">
                      Peritaje
                    </Link>
                    <Link href={`/presupuestos/nuevo?vehiculoId=${v.id}`} className="flex-1 flex items-center justify-center gap-1.5 bg-[#fde8dc] rounded-xl py-2 text-xs font-semibold text-[#ee6a28] active:scale-95 transition-all">
                      Presupuesto
                    </Link>
                    <Link href={`/vehiculos/${v.id}`} className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95 transition-all">
                      Historial
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>


    </div>
  )
}
