'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Users, User, Shield, ChevronRight, HelpCircle } from 'lucide-react'

const SECCION_ITEMS = [
  { href: '/configuracion/perfil',      label: 'Mi perfil',           icon: User,      desc: 'Datos personales y contraseña' },
  { href: '/configuracion/taller',      label: 'Datos del taller',    icon: Building2, desc: 'Nombre, logo, rubro, contacto' },
  { href: '/configuracion/usuarios',    label: 'Usuarios y roles',    icon: Users,     desc: '3 usuarios activos · Plan Starter' },
  { href: '/configuracion/suscripcion', label: 'Plan y suscripción',  icon: Shield,    desc: 'Starter — USD 55/mes' },
  { href: '/configuracion/faq',         label: 'Ayuda y FAQ',         icon: HelpCircle, desc: 'Preguntas frecuentes y soporte' },
]

export default function ConfiguracionPage() {
  const router = useRouter()

  return (
    <div className="px-4 py-5 max-w-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#1e1e1e]">Configuración</h1>
        <p className="text-gray-500 text-sm mt-0.5">Gestioná tu taller y usuarios</p>
      </div>

      {/* Taller summary card */}
      <div className="bg-gradient-to-r from-[#0a2657] to-[#113d87] rounded-2xl p-5 mb-5 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-base">Mecánica San Martín</p>
            <p className="text-blue-200 text-xs">Mecánica general</p>
          </div>
        </div>
        <div className="flex gap-4 text-xs text-blue-200">
          <span>3 usuarios</span>
          <span>·</span>
          <span>Plan Starter</span>
          <span>·</span>
          <span>Activo</span>
        </div>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-2.5">
        {SECCION_ITEMS.map(({ href, label, icon: Icon, desc }) => (
          <Link
            key={href}
            href={href}
            className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
          >
            <div className="w-11 h-11 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-[#113d87]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1e1e1e]">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => router.push('/login')}
          className="w-full py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
