'use client'

import { useParams } from 'next/navigation'
import { Wrench, CheckCircle2, Clock, Car, Phone, MessageSquare, Camera } from 'lucide-react'
import { getOT, getVehiculo, getCliente, getPresupuesto } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const STEPS = [
  { label: 'Recibido en taller',       desc: 'Tu vehículo fue recibido y registrado en el sistema.',    photo: false },
  { label: 'Peritaje realizado',        desc: 'Revisión técnica completa del vehículo.',                  photo: true  },
  { label: 'Presupuesto enviado',       desc: 'El presupuesto fue enviado para tu aprobación.',           photo: false },
  { label: 'Presupuesto aprobado',      desc: 'Aprobaste el presupuesto. ¡Comenzamos!',                  photo: false },
  { label: 'Trabajo programado',        desc: 'Se asignó el técnico y se agendó el trabajo.',             photo: false },
  { label: 'En proceso',               desc: 'El técnico está trabajando en tu vehículo.',               photo: true  },
  { label: 'Listo para retirar',        desc: '¡Tu vehículo está listo! Podés pasar a buscarlo.',        photo: true  },
  { label: 'Entregado',                desc: 'Vehículo entregado. ¡Gracias por elegirnos!',              photo: false },
]

function getStepFromEstado(estado: string): number {
  switch (estado) {
    case 'pendiente':  return 1
    case 'programada': return 5
    case 'en-curso':   return 6
    case 'finalizada': return 7
    case 'entregada':  return 8
    default:           return 1
  }
}

export default function SeguimientoPage() {
  const { id } = useParams()

  const ot = getOT(id as string)
  const vehiculo = ot ? getVehiculo(ot.vehiculoId) : null
  const cliente = ot ? getCliente(ot.clienteId) : null
  const presupuesto = ot?.presupuestoId ? getPresupuesto(ot.presupuestoId) : null

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

  const currentStep = getStepFromEstado(ot.estado)
  const progressPct = Math.round((currentStep / STEPS.length) * 100)

  const seña = presupuesto ? Math.round(presupuesto.total * 0.2) : 0
  const saldo = presupuesto ? presupuesto.total - seña : 0

  return (
    <div className="min-h-screen bg-[#f4f6f9]">

      {/* Header */}
      <div className="bg-gradient-to-b from-[#0a2657] to-[#113d87] px-5 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#ee6a28] rounded-xl flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">MECANIX</p>
            <p className="text-blue-300 text-xs">Mecánica San Martín</p>
          </div>
        </div>

        {cliente && (
          <div className="mb-2">
            <p className="text-blue-300 text-sm font-medium">Hola {cliente.nombre.split(' ')[0]},</p>
            <p className="text-white font-black text-xl leading-tight">este es el estado de tu vehículo</p>
          </div>
        )}

        <p className="text-blue-200 text-xs mt-1 mb-4">{ot.numero} · {ot.descripcion}</p>

        {/* Progress bar */}
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-bold">{STEPS[currentStep - 1]?.label}</span>
            <span className="text-blue-200 text-xs font-bold">{progressPct}%</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ee6a28] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-blue-300 text-[10px] mt-2">Paso {currentStep} de {STEPS.length}</p>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4 max-w-lg mx-auto -mt-3">

        {/* Vehículo */}
        {vehiculo && (
          <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <Car className="w-6 h-6 text-[#113d87]" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-[#1e1e1e]">{vehiculo.marca} {vehiculo.modelo}</p>
              <p className="text-xs text-gray-400">{vehiculo.version} · {vehiculo.año}</p>
            </div>
            <span className="text-xs font-black text-[#113d87] bg-[#e6ecf7] px-2.5 py-1 rounded-lg">
              {vehiculo.patente}
            </span>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <p className="section-title mb-4">Seguimiento paso a paso</p>

          <div className="flex flex-col gap-0">
            {STEPS.map((step, idx) => {
              const stepNum = idx + 1
              const done = stepNum < currentStep
              const current = stepNum === currentStep
              const last = idx === STEPS.length - 1

              return (
                <div key={idx} className="flex gap-4">
                  {/* Indicator column */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                      done    ? 'bg-[#113d87]'  :
                      current ? 'bg-[#ee6a28] ring-4 ring-[#ee6a28]/20' :
                                'bg-gray-100'
                    )}>
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : current ? (
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      ) : (
                        <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
                      )}
                    </div>
                    {!last && (
                      <div className={cn(
                        'w-0.5 my-1 rounded-full flex-1 min-h-[28px]',
                        done ? 'bg-[#113d87]' : 'bg-gray-100'
                      )} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={cn('flex-1 pb-4', last && 'pb-0')}>
                    <p className={cn(
                      'text-sm font-bold',
                      current ? 'text-[#ee6a28]' :
                      done    ? 'text-[#113d87]' :
                                'text-gray-300'
                    )}>
                      {step.label}
                      {current && <span className="ml-2 text-[10px] bg-[#ee6a28] text-white px-1.5 py-0.5 rounded-full font-bold">AHORA</span>}
                    </p>
                    <p className={cn('text-xs mt-0.5', done || current ? 'text-gray-500' : 'text-gray-300')}>
                      {step.desc}
                    </p>

                    {/* Photo placeholder for done steps with photo */}
                    {done && step.photo && (
                      <div className="mt-2 flex gap-2">
                        {[1, 2].map(n => (
                          <div
                            key={n}
                            className="w-16 h-12 bg-[#f4f6f9] rounded-lg border border-gray-200 flex items-center justify-center"
                          >
                            <Camera className="w-4 h-4 text-gray-300" />
                          </div>
                        ))}
                      </div>
                    )}
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
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Ingresó</p>
            </div>
            <p className="text-sm font-bold text-[#1e1e1e]">
              {new Date(ot.fechaIngreso + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-card p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#ee6a28]" />
              <p className="text-[10px] text-[#ee6a28] font-semibold uppercase">Entrega est.</p>
            </div>
            <p className="text-sm font-bold text-[#1e1e1e]">
              {new Date(ot.fechaEstimada + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </p>
          </div>
        </div>

        {/* Resumen financiero */}
        {presupuesto && (
          <div className="bg-white rounded-2xl shadow-card p-4">
            <p className="section-title mb-3">Resumen económico</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monto total</span>
                <span className="font-bold text-[#1e1e1e]">${presupuesto.total.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Seña abonada (20%)</span>
                <span className="font-bold text-green-600">${seña.toLocaleString('es-AR')}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-base font-bold text-[#1e1e1e]">Saldo a pagar</span>
                <span className="text-xl font-black text-[#ee6a28]">${saldo.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Contacto */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="text-xs font-bold text-gray-500 mb-3">¿Tenés alguna pregunta?</p>
          <div className="flex gap-3">
            <a
              href="tel:1145235678"
              className="flex-1 flex items-center justify-center gap-2 bg-[#e6ecf7] text-[#113d87] font-semibold text-sm py-3 rounded-xl"
            >
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
