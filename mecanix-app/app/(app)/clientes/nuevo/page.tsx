'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const ORIGENES = ['Referido', 'Google', 'Instagram', 'Facebook', 'Presencial', 'Otro']

export default function NuevoClientePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '', telefono: '', mail: '', direccion: '',
    cuit: '', origen: '', etiqueta: 'Regular', notas: '',
  })
  const [saving, setSaving] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => router.push('/crm'), 900)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-bold text-[#1e1e1e]">Nuevo cliente</h1>
          <p className="text-xs text-gray-400">Completá los datos de contacto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Avatar placeholder */}
        <div className="flex flex-col items-center py-2">
          <div className="w-20 h-20 bg-[#e6ecf7] rounded-full flex items-center justify-center mb-2">
            <User className="w-9 h-9 text-[#113d87]" />
          </div>
          <p className="text-xs text-[#113d87] font-semibold">Foto de perfil (opcional)</p>
        </div>

        {/* Datos personales */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Datos de contacto</p>
          <div>
            <label className="label">Nombre completo *</label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => set('nombre', e.target.value)}
              placeholder="Ej: Carlos Fernández"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="label">Teléfono *</label>
            <input
              type="tel"
              value={form.telefono}
              onChange={e => set('telefono', e.target.value)}
              placeholder="11-XXXX-XXXX"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              value={form.mail}
              onChange={e => set('mail', e.target.value)}
              placeholder="correo@ejemplo.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Dirección</label>
            <input
              type="text"
              value={form.direccion}
              onChange={e => set('direccion', e.target.value)}
              placeholder="Av. San Martín 1234, CABA"
              className="input-field"
            />
          </div>
        </div>

        {/* Datos fiscales */}
        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Datos adicionales</p>
          <div>
            <label className="label">CUIT / DNI</label>
            <input
              type="text"
              value={form.cuit}
              onChange={e => set('cuit', e.target.value)}
              placeholder="20-XXXXXXXX-X"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Etiqueta</label>
            <div className="flex gap-2 flex-wrap">
              {(['Regular', 'VIP', 'Nuevo', 'Inactivo'] as const).map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => set('etiqueta', tag)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all',
                    form.etiqueta === tag
                      ? tag === 'VIP'
                        ? 'bg-amber-100 border-amber-400 text-amber-700'
                        : tag === 'Nuevo'
                        ? 'bg-green-100 border-green-400 text-green-700'
                        : tag === 'Inactivo'
                        ? 'bg-gray-100 border-gray-400 text-gray-600'
                        : 'bg-blue-100 border-blue-400 text-blue-700'
                      : 'border-gray-200 text-gray-400'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">¿Cómo nos conoció?</label>
            <div className="flex gap-2 flex-wrap">
              {ORIGENES.map(o => (
                <button
                  key={o}
                  type="button"
                  onClick={() => set('origen', o)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all',
                    form.origen === o
                      ? 'bg-[#e6ecf7] border-[#113d87] text-[#113d87]'
                      : 'border-gray-200 text-gray-400'
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <label className="label">Notas internas</label>
          <textarea
            value={form.notas}
            onChange={e => set('notas', e.target.value)}
            placeholder="Preferencias, observaciones del cliente..."
            className="input-field resize-none min-h-0"
            rows={3}
          />
        </div>

        <div className="flex gap-3 pb-4">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className={cn('btn-primary flex-1', saving && 'opacity-70')}>
            {saving ? 'Guardando...' : 'Crear cliente'}
          </button>
        </div>
      </form>
    </div>
  )
}
