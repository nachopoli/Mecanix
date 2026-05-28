'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PerfilPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: 'Administrador',
    apellido: 'García',
    mail: 'admin@mecanicastaller.com',
    telefono: '11-4523-0000',
    rol: 'Administrador',
    nuevaPass: '',
    confirmarPass: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000) }, 900)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-[#1e1e1e]">Mi perfil</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Avatar */}
        <div className="flex flex-col items-center py-2">
          <div className="relative">
            <div className="w-24 h-24 bg-[#113d87] rounded-full flex items-center justify-center mb-3">
              <span className="text-3xl font-black text-white">AG</span>
            </div>
            <button type="button" className="absolute bottom-3 right-0 w-8 h-8 bg-[#ee6a28] rounded-full flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <span className="text-xs font-semibold text-gray-400">{form.rol}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Datos personales</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Nombre</label>
              <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Apellido</label>
              <input type="text" value={form.apellido} onChange={e => set('apellido', e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" value={form.mail} onChange={e => set('mail', e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Teléfono</label>
            <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Cambiar contraseña</p>
          <div>
            <label className="label">Nueva contraseña</label>
            <input type="password" value={form.nuevaPass} onChange={e => set('nuevaPass', e.target.value)} placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="label">Confirmar contraseña</label>
            <input type="password" value={form.confirmarPass} onChange={e => set('confirmarPass', e.target.value)} placeholder="••••••••" className="input-field" />
          </div>
          <p className="text-xs text-gray-400">Dejá en blanco para no cambiar la contraseña</p>
        </div>

        <button type="submit" disabled={saving} className={cn('btn-primary-full', saving && 'opacity-70')}>
          {saved ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}
