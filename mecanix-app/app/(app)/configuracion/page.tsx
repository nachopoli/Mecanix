'use client'

import { useState } from 'react'
import {
  Building2, Users, Wrench, Bell, Shield, ChevronRight,
  Check, Upload, Plus, Trash2, ToggleLeft, ToggleRight
} from 'lucide-react'

type SeccionConfig = 'taller' | 'usuarios' | 'servicios' | 'automatizaciones' | 'plan'

const SECCION_ITEMS = [
  { key: 'taller' as SeccionConfig, label: 'Datos del taller', icon: Building2, desc: 'Nombre, logo, rubro, contacto' },
  { key: 'usuarios' as SeccionConfig, label: 'Usuarios y roles', icon: Users, desc: '3 usuarios activos' },
  { key: 'servicios' as SeccionConfig, label: 'Servicios y checklist', icon: Wrench, desc: 'Categorías, tipos de trabajo' },
  { key: 'automatizaciones' as SeccionConfig, label: 'Automatizaciones', icon: Bell, desc: 'Recordatorios y alertas' },
  { key: 'plan' as SeccionConfig, label: 'Plan y suscripción', icon: Shield, desc: 'Starter — USD 55/mes' },
]

const USUARIOS_MOCK = [
  { id: 'u1', nombre: 'Admin Taller', rol: 'Administrador', mail: 'admin@mecanix.ar', activo: true },
  { id: 'u2', nombre: 'Roberto Díaz', rol: 'Operario', mail: 'rdiaz@mecanix.ar', activo: true },
  { id: 'u3', nombre: 'Pablo Sánchez', rol: 'Operario', mail: 'psanchez@mecanix.ar', activo: true },
]

const ROL_COLOR: Record<string, { bg: string; color: string }> = {
  Administrador: { bg: '#fde8dc', color: '#ee6a28' },
  Supervisor: { bg: '#e6ecf7', color: '#113d87' },
  Administrativo: { bg: '#d1fae5', color: '#10b981' },
  Operario: { bg: '#ede9fe', color: '#8b5cf6' },
}

const AUTOMATIZACIONES = [
  { id: 'a1', label: 'Recordatorio de turno al cliente (24hs antes)', activo: true },
  { id: 'a2', label: 'Alerta de presupuesto por vencer', activo: true },
  { id: 'a3', label: 'Notificación de OT finalizada', activo: false },
  { id: 'a4', label: 'Recordatorio de pago pendiente', activo: true },
  { id: 'a5', label: 'Seguimiento de presupuesto no respondido', activo: false },
]

export default function ConfiguracionPage() {
  const [seccion, setSeccion] = useState<SeccionConfig | null>(null)
  const [automatizaciones, setAutomatizaciones] = useState(AUTOMATIZACIONES)
  const [saved, setSaved] = useState(false)

  function toggleAuto(id: string) {
    setAutomatizaciones(prev => prev.map(a => a.id === id ? { ...a, activo: !a.activo } : a))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // List view
  if (!seccion) {
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
          {SECCION_ITEMS.map(({ key, label, icon: Icon, desc }) => (
            <button
              key={key}
              onClick={() => setSeccion(key)}
              className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform w-full"
            >
              <div className="w-11 h-11 bg-[#e6ecf7] rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#113d87]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1e1e1e]">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
            Cerrar sesión
          </button>
        </div>
      </div>
    )
  }

  // Section detail views
  return (
    <div className="flex flex-col h-full">
      {/* Back header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3.5 flex items-center gap-3">
        <button
          onClick={() => setSeccion(null)}
          className="p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 rotate-180" />
        </button>
        <p className="text-base font-bold text-[#1e1e1e]">
          {SECCION_ITEMS.find(s => s.key === seccion)?.label}
        </p>
        {saved && (
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-green-600">
            <Check className="w-3.5 h-3.5" /> Guardado
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full">

        {/* ── Taller ── */}
        {seccion === 'taller' && (
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="section-title">Logo del taller</p>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#e6ecf7] rounded-2xl flex items-center justify-center">
                  <Building2 className="w-9 h-9 text-[#113d87]" />
                </div>
                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 btn-secondary text-xs px-4 py-2 min-h-0">
                    <Upload className="w-3.5 h-3.5" /> Subir logo
                  </button>
                  <p className="text-[10px] text-gray-400">PNG o JPG · Máx. 2MB</p>
                </div>
              </div>
            </div>

            {/* Datos */}
            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="section-title">Información del taller</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="label">Nombre del taller</label>
                  <input type="text" defaultValue="Mecánica San Martín" className="input-field" />
                </div>
                <div>
                  <label className="label">Teléfono</label>
                  <input type="tel" defaultValue="11-4500-1234" className="input-field" />
                </div>
                <div>
                  <label className="label">Dirección</label>
                  <input type="text" defaultValue="Av. San Martín 1245, CABA" className="input-field" />
                </div>
                <div>
                  <label className="label">Rubro</label>
                  <select className="input-field" defaultValue="mecanica">
                    <option value="mecanica">Mecánica general</option>
                    <option value="chapa">Chapa y pintura</option>
                    <option value="estetica">Estética vehicular</option>
                    <option value="lubri">Lubricentro</option>
                    <option value="electrica">Electricidad</option>
                    <option value="neumaticos">Neumáticos</option>
                  </select>
                </div>
                <div>
                  <label className="label">Zona horaria</label>
                  <select className="input-field">
                    <option>América/Buenos_Aires (GMT-3)</option>
                  </select>
                </div>
              </div>
            </div>

            <button onClick={handleSave} className="btn-primary-full">
              Guardar cambios
            </button>
          </div>
        )}

        {/* ── Usuarios ── */}
        {seccion === 'usuarios' && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#e6ecf7] rounded-2xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#113d87] rounded-xl flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#113d87]">Plan Starter — 3 usuarios máximo</p>
                <p className="text-xs text-[#113d87]/70">3 de 3 usuarios activos</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {USUARIOS_MOCK.map(u => {
                const rolCfg = ROL_COLOR[u.rol] || ROL_COLOR.Operario
                const initials = u.nombre.split(' ').slice(0, 2).map(n => n[0]).join('')
                return (
                  <div key={u.id} className="bg-white rounded-2xl shadow-card p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0"
                        style={{ background: rolCfg.bg, color: rolCfg.color }}
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1e1e1e]">{u.nombre}</p>
                        <p className="text-xs text-gray-400">{u.mail}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: rolCfg.bg, color: rolCfg.color }}
                        >
                          {u.rol}
                        </span>
                        {u.activo
                          ? <span className="text-[10px] text-green-500 font-semibold">Activo</span>
                          : <span className="text-[10px] text-gray-400 font-semibold">Inactivo</span>
                        }
                      </div>
                    </div>
                    {u.rol !== 'Administrador' && (
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 border border-gray-200 rounded-xl py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-50">Editar</button>
                        <button className="flex-1 border border-red-100 rounded-xl py-1.5 text-xs font-semibold text-red-400 hover:bg-red-50 flex items-center justify-center gap-1">
                          <Trash2 className="w-3 h-3" /> Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <button className="btn-secondary-full flex items-center gap-2 justify-center opacity-50 cursor-not-allowed" disabled>
              <Plus className="w-4 h-4" />
              Invitar usuario (límite alcanzado)
            </button>
          </div>
        )}

        {/* ── Servicios ── */}
        {seccion === 'servicios' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="section-title">Tipos de trabajo</p>
              <div className="flex flex-col gap-2 mb-3">
                {['Service completo', 'Frenos', 'Cambio de aceite', 'Electricidad', 'Suspensión', 'Chapa y pintura', 'Refrigeración', 'Revisión general'].map(s => (
                  <div key={s} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm font-medium text-[#1e1e1e]">{s}</span>
                    <button className="text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-xs font-semibold text-[#113d87]">
                <Plus className="w-4 h-4" /> Agregar tipo de trabajo
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="section-title">Checklist predeterminado</p>
              <p className="text-xs text-gray-500 mb-3">Los ítems marcados aparecen por defecto en peritaje</p>
              <div className="grid grid-cols-2 gap-2">
                {['Frenos', 'Aceite', 'Filtros', 'Suspensión', 'Neumáticos', 'Luces', 'Batería', 'Refrigeración'].map(item => (
                  <div key={item} className="flex items-center gap-2 py-1.5">
                    <div className="w-4 h-4 rounded border-2 border-[#113d87] bg-[#113d87] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handleSave} className="btn-primary-full">Guardar</button>
          </div>
        )}

        {/* ── Automatizaciones ── */}
        {seccion === 'automatizaciones' && (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-card divide-y divide-gray-50">
              {automatizaciones.map(a => (
                <div key={a.id} className="flex items-center gap-3 p-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1e1e1e] leading-tight">{a.label}</p>
                  </div>
                  <button
                    onClick={() => toggleAuto(a.id)}
                    className="shrink-0 transition-all active:scale-95"
                  >
                    {a.activo
                      ? <ToggleRight className="w-9 h-9 text-[#113d87]" />
                      : <ToggleLeft className="w-9 h-9 text-gray-300" />
                    }
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#fde8dc] rounded-2xl p-4">
              <p className="text-xs font-bold text-[#c5541a] mb-1">WhatsApp e integración de envío</p>
              <p className="text-xs text-[#c5541a]/80 leading-relaxed">
                Las automatizaciones de WhatsApp requieren configurar el número de envío. Disponible en Plan Profesional.
              </p>
            </div>

            <button onClick={handleSave} className="btn-primary-full">Guardar automatizaciones</button>
          </div>
        )}

        {/* ── Plan ── */}
        {seccion === 'plan' && (
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-[#0a2657] to-[#113d87] rounded-2xl p-5 text-white">
              <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">Plan actual</p>
              <p className="text-3xl font-black mb-0.5">Starter</p>
              <p className="text-blue-200 text-sm">USD 55 / mes · Hasta 3 usuarios</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-blue-300 mb-2">Próxima renovación: 25/06/2025</p>
                <span className="text-xs font-bold bg-green-400/20 text-green-300 px-3 py-1 rounded-full">Activo</span>
              </div>
            </div>

            {[
              { nombre: 'Profesional', precio: 'USD 95', usuarios: '5 usuarios', features: ['Todo de Starter', 'Facturación electrónica', 'Inventario', 'Caja y gastos'] },
              { nombre: 'Premium', precio: 'USD 135', usuarios: '10 usuarios', features: ['Todo de Profesional', 'Reportes avanzados', 'Dashboard negocio', 'Módulo aseguradoras'] },
            ].map(plan => (
              <div key={plan.nombre} className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-base font-black text-[#1e1e1e]">{plan.nombre}</p>
                    <p className="text-xs text-gray-500">{plan.usuarios}</p>
                  </div>
                  <p className="text-xl font-black text-[#ee6a28]">{plan.precio}<span className="text-xs text-gray-400 font-normal">/mes</span></p>
                </div>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-[#113d87] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="btn-secondary-full text-sm">
                  Cambiar a {plan.nombre}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
