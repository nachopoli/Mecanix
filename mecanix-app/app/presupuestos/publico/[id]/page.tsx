'use client'

import { useParams } from 'next/navigation'
import { Wrench, CheckCircle2, XCircle, Phone, MessageSquare, FileText, Clock } from 'lucide-react'
import { getPresupuesto, getCliente, getVehiculo } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const TIPO_COLOR: Record<string, string> = {
  'mano-de-obra': 'bg-[#e6ecf7] text-[#113d87]',
  repuesto: 'bg-[#fde8dc] text-[#ee6a28]',
  material: 'bg-purple-100 text-purple-700',
}

const TIPO_LABEL: Record<string, string> = {
  'mano-de-obra': 'Mano de obra',
  repuesto: 'Repuesto',
  material: 'Material',
}

export default function PresupuestoPublicoPage() {
  const { id } = useParams()
  const [decision, setDecision] = useState<'aprobado' | 'rechazado' | null>(null)

  const presupuesto = getPresupuesto(id as string)
  const cliente = presupuesto ? getCliente(presupuesto.clienteId) : null
  const vehiculo = presupuesto ? getVehiculo(presupuesto.vehiculoId) : null

  if (!presupuesto) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-[#e6ecf7] rounded-3xl flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-[#113d87]" />
        </div>
        <h1 className="text-xl font-bold text-[#1e1e1e] mb-2">Presupuesto no encontrado</h1>
        <p className="text-gray-500 text-sm">El enlace puede estar vencido o ser incorrecto.</p>
      </div>
    )
  }

  const isVencido = presupuesto.estado === 'vencido'

  return (
    <div className="min-h-screen bg-[#f4f6f9]">

      {/* Header taller */}
      <div className="bg-[#0a2657] px-5 py-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#ee6a28] rounded-xl flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">MECANIX</p>
            <p className="text-blue-300 text-xs font-medium">Mecánica San Martín</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-300 text-xs font-semibold">Presupuesto</span>
            <span className={cn(
              'text-xs font-bold px-2.5 py-1 rounded-full',
              presupuesto.estado === 'aprobado' ? 'bg-green-500/20 text-green-300' :
              isVencido ? 'bg-red-500/20 text-red-300' :
              'bg-white/20 text-white'
            )}>
              {presupuesto.estado === 'aprobado' ? 'Aprobado' :
               isVencido ? 'Vencido' : 'Pendiente de aprobación'}
            </span>
          </div>
          <p className="text-white font-black text-xl">{presupuesto.numero}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-blue-300">
            <span>Emitido: {new Date(presupuesto.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Vence: {new Date(presupuesto.vencimiento + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4 max-w-lg mx-auto">

        {/* Cliente y vehículo */}
        {(cliente || vehiculo) && (
          <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-2">
            {cliente && (
              <div>
                <p className="text-xs text-gray-400">Cliente</p>
                <p className="text-base font-bold text-[#1e1e1e]">{cliente.nombre}</p>
              </div>
            )}
            {vehiculo && (
              <div>
                <p className="text-xs text-gray-400">Vehículo</p>
                <p className="text-sm font-semibold text-[#1e1e1e]">{vehiculo.marca} {vehiculo.modelo} · {vehiculo.version}</p>
                <p className="text-xs font-bold text-[#113d87]">{vehiculo.patente}</p>
              </div>
            )}
          </div>
        )}

        {/* Ítems */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Detalle del presupuesto</p>
          <div className="flex flex-col gap-3">
            {presupuesto.items.map(item => (
              <div key={item.id} className="flex items-start gap-3">
                <span className={cn('text-[10px] font-bold px-2 py-1 rounded-lg shrink-0', TIPO_COLOR[item.tipo])}>
                  {TIPO_LABEL[item.tipo]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1e1e1e]">{item.descripcion}</p>
                  <p className="text-xs text-gray-400">x{item.cantidad} × ${item.precioUnitario.toLocaleString('es-AR')}</p>
                </div>
                <p className="text-sm font-black text-[#1e1e1e] shrink-0">${item.total.toLocaleString('es-AR')}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
            <span className="text-base font-bold text-[#1e1e1e]">Total</span>
            <span className="text-2xl font-black text-[#ee6a28]">${presupuesto.total.toLocaleString('es-AR')}</span>
          </div>
        </div>

        {/* Notas */}
        {presupuesto.notas && (
          <div className="bg-[#f4f6f9] rounded-2xl p-4">
            <p className="text-xs font-bold text-gray-500 mb-1">Notas del taller</p>
            <p className="text-sm text-gray-600">{presupuesto.notas}</p>
          </div>
        )}

        {/* Decisión */}
        {!isVencido && presupuesto.estado !== 'aprobado' && presupuesto.estado !== 'rechazado' && (
          <>
            {decision ? (
              <div className={cn(
                'rounded-2xl p-5 text-center border-2',
                decision === 'aprobado' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
              )}>
                {decision === 'aprobado' ? (
                  <>
                    <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <p className="text-green-700 font-black text-lg">¡Presupuesto aprobado!</p>
                    <p className="text-green-600 text-sm mt-1">El taller fue notificado. Te contactarán para coordinar el trabajo.</p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
                    <p className="text-red-700 font-black text-lg">Presupuesto rechazado</p>
                    <p className="text-red-600 text-sm mt-1">El taller fue notificado. Podés contactarlos para más información.</p>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-sm font-semibold text-gray-600 text-center">¿Aprobás este presupuesto?</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDecision('rechazado')}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-300 bg-red-50 text-red-600 font-bold text-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    Rechazar
                  </button>
                  <button
                    onClick={() => setDecision('aprobado')}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-green-500 text-white font-bold text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Aprobar
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {isVencido && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-amber-700 font-bold">Presupuesto vencido</p>
            <p className="text-amber-600 text-sm mt-1">Contactá al taller para solicitar uno actualizado.</p>
          </div>
        )}

        {/* Contacto taller */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="text-xs font-bold text-gray-500 mb-3">Contactar al taller</p>
          <div className="flex gap-3">
            <a href="tel:1145235678" className="flex-1 flex items-center justify-center gap-2 bg-[#e6ecf7] text-[#113d87] font-semibold text-sm py-3 rounded-xl">
              <Phone className="w-4 h-4" />
              Llamar
            </a>
            <a href="https://wa.me/5491145235678" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold text-sm py-3 rounded-xl">
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 pb-4">
          Powered by{' '}
          <span className="font-black text-[#113d87]">MECANIX</span>
        </p>
      </div>
    </div>
  )
}
