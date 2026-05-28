'use client'

import { useParams } from 'next/navigation'
import { Wrench, CheckCircle2, Clock, Car, Phone, MessageSquare } from 'lucide-react'
import { getOT, getVehiculo, type EstadoOT } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const TIMELINE_STEPS: { estado: EstadoOT; label: string; desc: string }[] = [
  { estado: 'pendiente',  label: 'Recibido',        desc: 'Tu vehículo fue recibido en el taller' },
  { estado: 'programada', label: 'Programado',      desc: 'El trabajo fue asignado al técnico' },
  { estado: 'en-curso',   label: 'En proceso',      desc: 'El técnico está trabajando en tu vehículo' },
  { estado: 'finalizada', label: 'Listo para retirar', desc: '¡Tu vehículo está listo! Podés pasar a buscarlo' },
  { estado: 'entregada',  label: 'Entregado',       desc: 'Vehículo entregado. ¡Gracias!' },
]

const ORDEN_ESTADO: EstadoOT[] = ['pendiente', 'programada', 'en-curso', 'finalizada', 'entregada']

export default function SeguimientoPage() {
  const { id } = useParams()

  const ot = getOT(id as string)
  const vehiculo = ot ? getVehiculo(ot.vehiculoId) : null

  if (!ot) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-[#e6ecf7] rounded-3xl flex items-center justify-center mb-4">
          <Wrench className="w-8 h-8 text-[#113d87]" />
        </div>
        <h1 className="text-xl font-bold text-[#1e1e1e] mb-2">Orden no encontrada</h1>
        <p className="text-gray-500 text-sm">El enlace puede estar incorrecto o vencido.</p>
      </div>
    )
  }

  const currentIdx = ORDEN_ESTADO.indexOf(ot.estado as typeof ORDEN_ESTADO[number])

  return (
    <div className="min-h-screen bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-[#0a2657] px-5 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-[#ee6a28] rounded-xl flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">MECANIX</p>
            <p className="text-blue-300 text-xs">Mecánica San Martín</p>
          </div>
        </div>

        <p className="text-blue-300 text-xs font-semibold mb-1">Seguimiento de vehículo</p>
        <p className="text-white font-black text-2xl">{ot.numero}</p>
        <p className="text-blue-200 text-sm mt-1">{ot.descripcion}</p>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4 max-w-lg mx-auto">

        {/* Vehículo */}
        {vehiculo && (
          <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-[#113d87]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#1e1e1e]">{vehiculo.marca} {vehiculo.modelo}</p>
              <p className="text-xs text-gray-400">{vehiculo.version} · {vehiculo.año}</p>
              <p className="text-xs font-black text-[#113d87] bg-[#e6ecf7] px-2 py-0.5 rounded-lg inline-block mt-0.5">{vehiculo.patente}</p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <p className="section-title mb-4">Estado de tu vehículo</p>

          <div className="flex flex-col gap-0">
            {TIMELINE_STEPS.map((step, idx) => {
              const done = idx <= currentIdx && ot.estado !== 'cancelada'
              const current = idx === currentIdx
              const last = idx === TIMELINE_STEPS.length - 1

              return (
                <div key={step.estado} className="flex gap-4">
                  {/* Indicador */}
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all',
                      done
                        ? current
                          ? 'bg-[#ee6a28] shadow-lg'
                          : 'bg-[#113d87]'
                        : 'bg-gray-100'
                    )}>
                      {done && !current ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : current ? (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      ) : (
                        <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                      )}
                    </div>
                    {!last && (
                      <div className={cn('w-0.5 h-10 my-1 rounded-full', done ? 'bg-[#113d87]' : 'bg-gray-100')} />
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 pb-4">
                    <p className={cn(
                      'text-sm font-bold',
                      current ? 'text-[#ee6a28]' : done ? 'text-[#113d87]' : 'text-gray-300'
                    )}>
                      {step.label}
                      {current && ' ←'}
                    </p>
                    <p className={cn('text-xs mt-0.5', done ? 'text-gray-500' : 'text-gray-300')}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Fechas */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl shadow-card p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <p className="text-[10px] text-gray-400 font-semibold">Ingresó</p>
            </div>
            <p className="text-sm font-bold text-[#1e1e1e]">
              {new Date(ot.fechaIngreso + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#ee6a28]" />
              <p className="text-[10px] text-[#ee6a28] font-semibold">Entrega estimada</p>
            </div>
            <p className="text-sm font-bold text-[#1e1e1e]">
              {new Date(ot.fechaEstimada + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </p>
          </div>
        </div>

        {/* Contacto */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="text-xs font-bold text-gray-500 mb-3">¿Tenés alguna pregunta?</p>
          <div className="flex gap-3">
            <a href="tel:1145235678" className="flex-1 flex items-center justify-center gap-2 bg-[#e6ecf7] text-[#113d87] font-semibold text-sm py-3 rounded-xl">
              <Phone className="w-4 h-4" />
              Llamar
            </a>
            <a
              href="https://wa.me/5491145235678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold text-sm py-3 rounded-xl"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 pb-4">
          Powered by <span className="font-black text-[#113d87]">MECANIX</span>
        </p>
      </div>
    </div>
  )
}
