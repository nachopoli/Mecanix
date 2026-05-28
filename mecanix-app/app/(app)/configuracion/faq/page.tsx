'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, MessageSquare, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQS = [
  {
    cat: 'Cuenta y acceso',
    items: [
      {
        q: '¿Cómo cambio mi contraseña?',
        a: 'Podés cambiarla desde Configuración → Mi perfil → Cambiar contraseña. También podés usar el enlace "Olvidé mi contraseña" en la pantalla de login.',
      },
      {
        q: '¿Cuántos usuarios puedo invitar?',
        a: 'Depende del plan: Starter admite hasta 3 usuarios, Profesional hasta 5 y Premium hasta 10. Podés gestionar usuarios desde Configuración → Usuarios.',
      },
      {
        q: '¿Puedo acceder desde varios dispositivos?',
        a: 'Sí, MECANIX funciona en cualquier dispositivo con navegador web. También podés instalarlo como app en tu teléfono usando la opción "Agregar a pantalla de inicio".',
      },
    ],
  },
  {
    cat: 'Operaciones',
    items: [
      {
        q: '¿Cómo creo una Orden de Trabajo?',
        a: 'Desde el módulo Operaciones, tocá el botón "+" para crear una nueva OT. Seleccioná cliente, vehículo y completá la descripción del trabajo. También podés crear una OT desde el detalle de un peritaje.',
      },
      {
        q: '¿Qué es el peritaje y cómo funciona?',
        a: 'El peritaje es una revisión técnica completa del vehículo antes de iniciar un trabajo. Incluye un checklist de 12 puntos, diagnóstico por texto o voz, y fotos. Al finalizar podés crear un presupuesto o OT directamente.',
      },
      {
        q: '¿Cómo funciona el presupuesto público?',
        a: 'Cuando enviás un presupuesto al cliente, este recibe un enlace único con la vista pública donde puede ver los ítems, aprobar o rechazar. No necesita tener cuenta en MECANIX.',
      },
      {
        q: '¿Puedo pasar un presupuesto aprobado a OT?',
        a: 'Sí. En la lista de presupuestos, los que están aprobados o enviados tienen el botón "Pasar a OT" que crea la orden de trabajo con los datos del presupuesto.',
      },
    ],
  },
  {
    cat: 'Facturación',
    items: [
      {
        q: '¿Cómo se cobra la suscripción?',
        a: 'La suscripción se cobra mensualmente en dólares por tarjeta de crédito. Podés cambiar tu método de pago desde Configuración → Suscripción.',
      },
      {
        q: '¿Qué pasa si no pago a tiempo?',
        a: 'Tenés un período de gracia de 7 días. Pasado ese plazo, tu cuenta queda en modo lectura hasta regularizar el pago. No se borran tus datos.',
      },
      {
        q: '¿Puedo cancelar cuando quiera?',
        a: 'Sí, podés cancelar en cualquier momento. Seguirás teniendo acceso hasta el final del período pagado. No hay penalidades por cancelación.',
      },
    ],
  },
]

export default function FAQPage() {
  const router = useRouter()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-[#1e1e1e]">Ayuda y FAQ</h1>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Soporte rápido */}
        <div className="bg-[#113d87] rounded-2xl p-5">
          <p className="text-white font-bold text-base mb-1">¿Necesitás ayuda?</p>
          <p className="text-blue-300 text-xs mb-4">Nuestro equipo está disponible de lunes a viernes, 9 a 18 hs.</p>
          <div className="flex gap-2">
            <a
              href="https://wa.me/5491144445555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 text-white text-xs font-semibold py-2.5 rounded-xl"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href="mailto:soporte@mecanix.com"
              className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 text-white text-xs font-semibold py-2.5 rounded-xl"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
          </div>
        </div>

        {/* FAQs */}
        {FAQS.map(cat => (
          <div key={cat.cat} className="flex flex-col gap-2">
            <p className="section-title">{cat.cat}</p>
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {cat.items.map((item, idx) => {
                const key = `${cat.cat}-${idx}`
                const isOpen = open === key
                return (
                  <div key={idx} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => setOpen(isOpen ? null : key)}
                      className="w-full flex items-center gap-3 px-4 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-[#1e1e1e] flex-1">{item.q}</span>
                      <ChevronRight className={cn('w-4 h-4 text-gray-400 shrink-0 transition-transform', isOpen && 'rotate-90')} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Version */}
        <p className="text-center text-xs text-gray-300 pb-4">MECANIX v1.0 MVP — Plan Starter</p>
      </div>
    </div>
  )
}
