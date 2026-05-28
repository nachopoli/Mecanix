'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Plus, Car, User } from 'lucide-react'
import { turnosMock, getCliente, getVehiculo } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const HORAS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

function formatDate(d: Date) {
  return d.toISOString().split('T')[0]
}

const ESTADO_COLOR: Record<string, string> = {
  confirmado: 'bg-green-500',
  agendado: 'bg-[#113d87]',
  pendiente: 'bg-amber-500',
  cancelado: 'bg-red-500',
}

const ESTADO_BG: Record<string, string> = {
  confirmado: 'bg-green-50 border-l-green-500',
  agendado: 'bg-[#e6ecf7] border-l-[#113d87]',
  pendiente: 'bg-amber-50 border-l-amber-500',
  cancelado: 'bg-red-50 border-l-red-400',
}

export default function AgendaDiaPage() {
  const router = useRouter()
  const [fecha, setFecha] = useState(new Date('2025-05-25'))

  const fechaStr = formatDate(fecha)
  const turnosDia = turnosMock.filter(t => t.fecha === fechaStr)

  function prevDay() { setFecha(d => { const n = new Date(d); n.setDate(n.getDate() - 1); return n }) }
  function nextDay() { setFecha(d => { const n = new Date(d); n.setDate(n.getDate() + 1); return n }) }

  function getTurnoEnHora(hora: string) {
    return turnosDia.find(t => t.hora === hora)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-[#1e1e1e] flex-1">Vista del día</h1>
          <Link
            href="/turnos/nuevo"
            className="flex items-center gap-1.5 bg-[#ee6a28] text-white text-xs font-semibold px-3 py-2 rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" />
            Turno
          </Link>
        </div>

        {/* Selector de fecha */}
        <div className="flex items-center justify-between bg-[#f4f6f9] rounded-2xl p-3">
          <button onClick={prevDay} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white transition-colors">
            <ArrowLeft className="w-4 h-4 text-gray-500" />
          </button>
          <div className="text-center">
            <p className="text-base font-bold text-[#1e1e1e] capitalize">
              {fecha.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <p className="text-xs text-gray-400">{turnosDia.length} turno{turnosDia.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={nextDay} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white transition-colors">
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-2">
          {HORAS.map(hora => {
            const turno = getTurnoEnHora(hora)
            const cliente = turno ? getCliente(turno.clienteId) : null
            const vehiculo = turno ? getVehiculo(turno.vehiculoId) : null

            return (
              <div key={hora} className="flex items-start gap-3">
                <div className="w-12 text-right shrink-0 pt-3">
                  <span className="text-xs font-bold text-gray-400">{hora}</span>
                </div>

                <div className="flex-1 min-w-0">
                  {turno ? (
                    <Link
                      href={`/turnos/${turno.id}`}
                      className={cn(
                        'block rounded-2xl border-l-4 p-3.5 shadow-card transition-all',
                        ESTADO_BG[turno.estado] ?? 'bg-white border-l-gray-200'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={cn('w-2 h-2 rounded-full shrink-0', ESTADO_COLOR[turno.estado])} />
                          <span className="text-xs font-black text-[#113d87]">{turno.hora}</span>
                          <span className="text-xs text-gray-400">{turno.duracion} min</span>
                        </div>
                        <span className={cn(
                          'badge',
                          turno.estado === 'confirmado' ? 'badge-finalizada' :
                          turno.estado === 'agendado' ? 'badge-en-curso' : 'badge-pendiente'
                        )}>
                          {turno.estado === 'confirmado' ? 'Confirmado' : turno.estado === 'agendado' ? 'Agendado' : 'Pendiente'}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-[#1e1e1e] mb-1">{turno.tipoTrabajo}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600 font-medium">{cliente?.nombre}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{vehiculo?.marca} {vehiculo?.modelo}</span>
                        </div>
                      </div>
                      {turno.notas && (
                        <p className="text-xs text-amber-600 mt-1.5 bg-amber-50 rounded-lg px-2 py-1">{turno.notas}</p>
                      )}
                    </Link>
                  ) : (
                    <Link
                      href={`/turnos/nuevo?hora=${hora}&fecha=${fechaStr}`}
                      className="flex items-center gap-2 h-11 rounded-2xl border-2 border-dashed border-gray-200 px-4 hover:border-gray-300 transition-colors group"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400" />
                      <span className="text-xs text-gray-300 group-hover:text-gray-400">Disponible</span>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
