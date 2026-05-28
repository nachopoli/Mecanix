'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus, Phone, MessageCircle, FileText, ClipboardList } from 'lucide-react'
import { turnosMock, getCliente, getVehiculo } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const DAYS_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function getWeekDays(baseDate: Date) {
  const days = []
  const start = new Date(baseDate)
  const dayOfWeek = start.getDay()
  start.setDate(start.getDate() - dayOfWeek)
  for (let i = 0; i < 7; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    days.push(d)
  }
  return days
}

function toDateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const estadoConfig: Record<string, { label: string; color: string; bar: string }> = {
  confirmado: { label: 'Confirmado', color: 'badge-finalizada', bar: 'bg-green-500' },
  agendado: { label: 'Agendado', color: 'badge-en-curso', bar: 'bg-blue-500' },
  pendiente: { label: 'Pendiente', color: 'badge-pendiente', bar: 'bg-amber-500' },
  cancelado: { label: 'Cancelado', color: 'badge-cancelada', bar: 'bg-red-400' },
  finalizado: { label: 'Finalizado', color: 'badge-finalizada', bar: 'bg-green-400' },
}

export default function AgendaPage() {
  const today = new Date('2025-05-25')
  const [selectedDate, setSelectedDate] = useState(today)
  const [weekBase, setWeekBase] = useState(today)

  const weekDays = getWeekDays(weekBase)
  const selectedStr = toDateStr(selectedDate)
  const todayStr = toDateStr(today)

  const turnosDia = turnosMock.filter(t => t.fecha === selectedStr)
  const allTurnos = turnosMock

  function prevWeek() {
    const d = new Date(weekBase)
    d.setDate(d.getDate() - 7)
    setWeekBase(d)
  }
  function nextWeek() {
    const d = new Date(weekBase)
    d.setDate(d.getDate() + 7)
    setWeekBase(d)
  }

  const monthLabel = `${MONTHS[weekBase.getMonth()]} ${weekBase.getFullYear()}`

  return (
    <div className="flex flex-col h-full">

      {/* Calendar header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevWeek} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <p className="text-sm font-bold text-[#1e1e1e] capitalize">{monthLabel}</p>
          <button onClick={nextWeek} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => {
            const str = toDateStr(day)
            const isToday = str === todayStr
            const isSelected = str === selectedStr
            const hasEvents = allTurnos.some(t => t.fecha === str)

            return (
              <button
                key={str}
                onClick={() => setSelectedDate(day)}
                className="flex flex-col items-center gap-1 py-1"
              >
                <span className="text-[10px] font-semibold text-gray-400 uppercase">
                  {DAYS_SHORT[day.getDay()]}
                </span>
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  isSelected
                    ? 'bg-[#113d87] text-white'
                    : isToday
                    ? 'bg-[#e6ecf7] text-[#113d87]'
                    : 'text-gray-700 hover:bg-gray-100'
                )}>
                  {day.getDate()}
                </div>
                {hasEvents && (
                  <div className={cn(
                    'w-1 h-1 rounded-full',
                    isSelected ? 'bg-white' : 'bg-[#ee6a28]'
                  )} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Turnos del día */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold text-[#1e1e1e] capitalize">
              {selectedDate.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {turnosDia.length === 0 ? 'Sin turnos' : `${turnosDia.length} turno${turnosDia.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Link
            href={`/turnos/nuevo?fecha=${selectedStr}`}
            className="flex items-center gap-1.5 bg-[#113d87] text-white text-xs font-semibold px-3 py-2 rounded-xl active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Nuevo turno
          </Link>
        </div>

        {turnosDia.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-[#e6ecf7] rounded-2xl flex items-center justify-center mb-4">
              <ChevronLeft className="w-8 h-8 text-[#113d87] opacity-30" />
            </div>
            <p className="text-gray-400 text-sm font-medium">Sin turnos para este día</p>
            <Link
              href={`/turnos/nuevo?fecha=${selectedStr}`}
              className="mt-4 text-xs font-semibold text-[#113d87] underline underline-offset-2"
            >
              Agregar turno
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {turnosDia.map(t => {
              const cliente = getCliente(t.clienteId)
              const vehiculo = getVehiculo(t.vehiculoId)
              const cfg = estadoConfig[t.estado] || estadoConfig.agendado

              return (
                <div key={t.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  {/* Color bar */}
                  <div className={cn('h-1 w-full', cfg.bar)} />

                  <Link href={`/turnos/${t.id}`} className="block p-4">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold text-[#113d87]">{t.hora}</span>
                          <span className="text-xs text-gray-400 font-medium">· {t.duracion} min</span>
                        </div>
                        <p className="text-base font-bold text-[#1e1e1e]">{cliente?.nombre}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {vehiculo?.marca} {vehiculo?.modelo} {vehiculo?.version}
                        </p>
                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                          {vehiculo?.patente}
                        </p>
                      </div>
                      <span className={cn('badge shrink-0', cfg.color)}>{cfg.label}</span>
                    </div>

                    {/* Tipo de trabajo */}
                    <div className="bg-[#f4f6f9] rounded-xl px-3 py-2">
                      <p className="text-xs font-semibold text-gray-600">{t.tipoTrabajo}</p>
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="flex gap-2 px-4 pb-4">
                    <a
                      href={`tel:${cliente?.telefono}`}
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95 transition-all hover:bg-gray-50"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Llamar
                    </a>
                    <a
                      href={`https://wa.me/549${cliente?.telefono?.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl py-2 text-xs font-semibold text-gray-600 active:scale-95 transition-all hover:bg-gray-50"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                    <Link
                      href={`/presupuestos/nuevo?clienteId=${t.clienteId}`}
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#e6ecf7] rounded-xl py-2 text-xs font-semibold text-[#113d87] active:scale-95 transition-all"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Presupuesto
                    </Link>
                    <Link
                      href={`/operaciones/nueva?clienteId=${t.clienteId}`}
                      onClick={e => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#fde8dc] rounded-xl py-2 text-xs font-semibold text-[#ee6a28] active:scale-95 transition-all"
                    >
                      <ClipboardList className="w-3.5 h-3.5" />
                      OT
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
