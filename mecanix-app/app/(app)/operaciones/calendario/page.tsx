'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Plus, Wrench } from 'lucide-react'
import { ordenesDeTrabajoMock, getCliente, getVehiculo, type EstadoOT } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS_SEMANA = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

const ESTADO_DOT: Partial<Record<EstadoOT, string>> = {
  'en-curso': 'bg-[#113d87]',
  pendiente: 'bg-amber-400',
  programada: 'bg-indigo-400',
  finalizada: 'bg-green-500',
  entregada: 'bg-gray-400',
  pausada: 'bg-purple-400',
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function OperacionesCalendarioPage() {
  const router = useRouter()
  const today = new Date('2025-05-25')
  const [mes, setMes] = useState(today.getMonth())
  const [año, setAño] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  function prevMes() {
    if (mes === 0) { setMes(11); setAño(a => a - 1) }
    else setMes(m => m - 1)
  }

  function nextMes() {
    if (mes === 11) { setMes(0); setAño(a => a + 1) }
    else setMes(m => m + 1)
  }

  const daysInMonth = getDaysInMonth(año, mes)
  const firstDay = getFirstDayOfMonth(año, mes)

  function getOTsForDay(day: number) {
    const dateStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return ordenesDeTrabajoMock.filter(
      ot => ot.fechaEstimada === dateStr || ot.fechaIngreso === dateStr
    )
  }

  const selectedDateStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
  const otsSelected = ordenesDeTrabajoMock.filter(
    ot => ot.fechaEstimada === selectedDateStr || ot.fechaIngreso === selectedDateStr
  )

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-[#1e1e1e] flex-1">OTs — Calendario</h1>
        <Link href="/operaciones/nueva" className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl">
          <Plus className="w-3.5 h-3.5" />
          Nueva OT
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Navegación mes */}
        <div className="bg-white px-4 pb-4">
          <div className="flex items-center justify-between py-3">
            <button onClick={prevMes} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-base font-bold text-[#1e1e1e]">{MESES[mes]} {año}</span>
            <button onClick={nextMes} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Días semana */}
          <div className="grid grid-cols-7 mb-1">
            {DIAS_SEMANA.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
            ))}
          </div>

          {/* Días */}
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const ots = getOTsForDay(day)
              const isToday = day === today.getDate() && mes === today.getMonth() && año === today.getFullYear()
              const isSelected = day === selectedDay
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    'flex flex-col items-center py-1.5 rounded-xl transition-all',
                    isSelected ? 'bg-[#113d87]' : isToday ? 'bg-[#e6ecf7]' : 'hover:bg-gray-50'
                  )}
                >
                  <span className={cn(
                    'text-sm font-bold',
                    isSelected ? 'text-white' : isToday ? 'text-[#113d87]' : 'text-gray-700'
                  )}>
                    {day}
                  </span>
                  {ots.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {ots.slice(0, 3).map(ot => (
                        <div
                          key={ot.id}
                          className={cn('w-1.5 h-1.5 rounded-full', ESTADO_DOT[ot.estado] ?? 'bg-gray-300', isSelected && 'opacity-70')}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* OTs del día seleccionado */}
        <div className="px-4 py-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
            {selectedDay} de {MESES[mes]} — {otsSelected.length} OT{otsSelected.length !== 1 ? 's' : ''}
          </p>

          {otsSelected.length === 0 ? (
            <div className="text-center py-10">
              <Wrench className="w-10 h-10 text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Sin OTs para este día</p>
              <Link href="/operaciones/nueva" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#113d87]">
                <Plus className="w-3.5 h-3.5" />
                Crear OT
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {otsSelected.map(ot => {
                const cliente = getCliente(ot.clienteId)
                const vehiculo = getVehiculo(ot.vehiculoId)
                const isIngreso = ot.fechaIngreso === selectedDateStr
                return (
                  <Link key={ot.id} href={`/operaciones/${ot.id}`} className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
                    <div className={cn('w-2 rounded-full self-stretch shrink-0', ESTADO_DOT[ot.estado] ?? 'bg-gray-300')} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-black text-[#113d87]">{ot.numero}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                          {isIngreso ? 'Ingreso' : 'Entrega estimada'}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#1e1e1e] truncate">{cliente?.nombre}</p>
                      <p className="text-xs text-gray-400">{vehiculo?.marca} {vehiculo?.modelo} · {vehiculo?.patente}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{ot.descripcion}</p>
                    </div>
                    <span className="text-sm font-black text-[#ee6a28] shrink-0">${ot.total.toLocaleString('es-AR')}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
