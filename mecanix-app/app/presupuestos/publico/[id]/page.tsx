'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Wrench, CheckCircle2, XCircle, Phone, MessageSquare,
  FileText, Clock, Download, ArrowRight, AlertTriangle
} from 'lucide-react'
import { getPresupuesto, getCliente, getVehiculo } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

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
  const [downloading, setDownloading] = useState(false)

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
  const isAprobado = presupuesto.estado === 'aprobado' || decision === 'aprobado'
  const isRechazado = decision === 'rechazado'

  const firstName = cliente?.nombre.split(' ')[0] ?? 'Cliente'
  const seña = Math.round(presupuesto.total * 0.2)

  const repuestos = presupuesto.items.filter(i => i.tipo !== 'mano-de-obra')
  const manoDeObra = presupuesto.items.filter(i => i.tipo === 'mano-de-obra')
  const totalRepuestos = repuestos.reduce((a, i) => a + i.total, 0)
  const totalMdo = manoDeObra.reduce((a, i) => a + i.total, 0)

  return (
    <div className="min-h-screen bg-[#f4f6f9]">

      {/* Header taller */}
      <div className="bg-gradient-to-b from-[#0a2657] to-[#113d87] px-5 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#ee6a28] rounded-xl flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-black text-lg leading-none">MECANIX</p>
            <p className="text-blue-300 text-xs font-medium">Mecánica San Martín</p>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-4">
          <p className="text-blue-300 text-sm font-medium">Hola {firstName},</p>
          <p className="text-white font-black text-2xl leading-tight">tu presupuesto está listo</p>
        </div>

        {/* Presupuesto card */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-blue-300 text-xs font-semibold">N° {presupuesto.numero}</span>
            <span className={cn(
              'text-xs font-bold px-2.5 py-1 rounded-full',
              isAprobado ? 'bg-green-500/30 text-green-200' :
              isVencido ? 'bg-red-500/30 text-red-300' :
              'bg-white/20 text-white'
            )}>
              {isAprobado ? 'Aprobado' : isVencido ? 'Vencido' : 'Pendiente de aprobación'}
            </span>
          </div>
          <div className="text-center py-2">
            <p className="text-blue-300 text-xs font-semibold mb-1">Total</p>
            <p className="text-white font-black text-4xl">${presupuesto.total.toLocaleString('es-AR')}</p>
          </div>
          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-blue-300">
            <span>Emitido: {new Date(presupuesto.fecha + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Vence: {new Date(presupuesto.vencimiento + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-4 max-w-lg mx-auto -mt-3">

        {/* Urgencia / alerta */}
        {!isAprobado && !isVencido && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-xs font-semibold text-amber-700">
              Este presupuesto vence el {new Date(presupuesto.vencimiento + 'T12:00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'long' })}
            </p>
          </div>
        )}

        {/* Vehículo */}
        {vehiculo && (
          <div className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-[#113d87]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#1e1e1e]">{vehiculo.marca} {vehiculo.modelo} {vehiculo.version}</p>
              <p className="text-xs text-gray-400">{vehiculo.año} · {vehiculo.color}</p>
            </div>
            <span className="text-xs font-black text-[#113d87] bg-[#e6ecf7] px-2 py-1 rounded-lg">
              {vehiculo.patente}
            </span>
          </div>
        )}

        {/* Detalle ítems */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="section-title mb-3">Detalle del presupuesto</p>

          {repuestos.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Repuestos</p>
              <div className="flex flex-col gap-2">
                {repuestos.map(item => (
                  <div key={item.id} className="flex items-start gap-2">
                    <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5', TIPO_COLOR[item.tipo])}>
                      {TIPO_LABEL[item.tipo]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1e1e1e]">{item.descripcion}</p>
                      {item.cantidad > 1 && (
                        <p className="text-xs text-gray-400">x{item.cantidad} × ${item.precioUnitario.toLocaleString('es-AR')}</p>
                      )}
                    </div>
                    <p className="text-sm font-bold text-[#1e1e1e] shrink-0">${item.total.toLocaleString('es-AR')}</p>
                  </div>
                ))}
                <div className="flex justify-between pt-1.5 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-semibold">Subtotal repuestos</span>
                  <span className="text-sm font-bold text-[#ee6a28]">${totalRepuestos.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
          )}

          {manoDeObra.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">Mano de obra</p>
              <div className="flex flex-col gap-2">
                {manoDeObra.map(item => (
                  <div key={item.id} className="flex items-start gap-2">
                    <span className={cn('text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5', TIPO_COLOR[item.tipo])}>
                      MO
                    </span>
                    <p className="text-sm font-semibold text-[#1e1e1e] flex-1">{item.descripcion}</p>
                    <p className="text-sm font-bold text-[#1e1e1e] shrink-0">${item.total.toLocaleString('es-AR')}</p>
                  </div>
                ))}
                <div className="flex justify-between pt-1.5 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-semibold">Subtotal mano de obra</span>
                  <span className="text-sm font-bold text-[#113d87]">${totalMdo.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-2 pt-3 border-t-2 border-gray-100 flex items-center justify-between">
            <span className="text-base font-bold text-[#1e1e1e]">TOTAL</span>
            <span className="text-2xl font-black text-[#ee6a28]">${presupuesto.total.toLocaleString('es-AR')}</span>
          </div>
          {presupuesto.notas && (
            <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100">{presupuesto.notas}</p>
          )}
        </div>

        {/* Seña (20%) */}
        {isAprobado && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-bold text-sm">Presupuesto aprobado</p>
            </div>
            <p className="text-xs text-green-600 mb-3">Podés abonar una seña del 20% para reservar tu turno y comenzar el trabajo.</p>
            <button className="w-full bg-green-600 text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
              <ArrowRight className="w-4 h-4" />
              Pagar seña · ${seña.toLocaleString('es-AR')}
            </button>
          </div>
        )}

        {/* Decisión */}
        {!isVencido && !isAprobado && !isRechazado && presupuesto.estado !== 'aprobado' && (
          <div className="bg-white rounded-2xl shadow-card p-4">
            <p className="text-sm font-semibold text-gray-600 text-center mb-3">¿Aprobás este presupuesto?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDecision('rechazado')}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-red-300 bg-red-50 text-red-600 font-bold text-sm active:scale-95 transition-all"
              >
                <XCircle className="w-4 h-4" />
                Rechazar
              </button>
              <button
                onClick={() => setDecision('aprobado')}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-green-500 text-white font-bold text-sm active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Aprobar
              </button>
            </div>
          </div>
        )}

        {isRechazado && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 text-center">
            <XCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <p className="text-red-700 font-black text-lg">Presupuesto rechazado</p>
            <p className="text-red-600 text-sm mt-1">El taller fue notificado. Podés contactarlos para más información.</p>
          </div>
        )}

        {isVencido && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-amber-700 font-bold">Presupuesto vencido</p>
            <p className="text-amber-600 text-sm mt-1">Contactá al taller para solicitar uno actualizado.</p>
          </div>
        )}

        {/* Seguimiento (si tiene OT asociada) */}
        {presupuesto.otId && (
          <a
            href={`/seguimiento/${presupuesto.otId}`}
            className="bg-[#e6ecf7] rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-all"
          >
            <div className="w-10 h-10 bg-[#113d87] rounded-xl flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#113d87]">Seguí el estado de tu vehículo</p>
              <p className="text-xs text-blue-500">Ver timeline de la reparación →</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#113d87]" />
          </a>
        )}

        {/* Descarga y contacto */}
        <div className="flex gap-3">
          <button
            onClick={() => { setDownloading(true); setTimeout(() => setDownloading(false), 1500) }}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-600 font-semibold text-sm py-3 rounded-xl active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Generando...' : 'Descargar PDF'}
          </button>
          <a
            href="https://wa.me/5491145235678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white font-semibold text-sm py-3 rounded-xl active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4">
          <p className="text-xs font-bold text-gray-500 mb-3">Contactar al taller</p>
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
          Powered by{' '}
          <span className="font-black text-[#113d87]">MECANIX</span>
        </p>
      </div>
    </div>
  )
}
