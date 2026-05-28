'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const PROVINCIAS = ['Buenos Aires', 'CABA', 'Córdoba', 'Santa Fe', 'Mendoza', 'Tucumán', 'Salta', 'Otra']

export default function TallerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: 'Mecánica San Martín',
    cuit: '30-71234567-9',
    telefono: '11-4523-5678',
    mail: 'contacto@mecanicastaller.com',
    direccion: 'Av. San Martín 1245',
    ciudad: 'Buenos Aires',
    provincia: 'Buenos Aires',
    cp: '1234',
    web: '',
    descripcion: 'Taller mecánico especializado en service, reparaciones y chapa.',
  })
  const [horarios, setHorarios] = useState<Record<string, { activo: boolean; desde: string; hasta: string }>>({
    Lunes:    { activo: true,  desde: '08:00', hasta: '18:00' },
    Martes:   { activo: true,  desde: '08:00', hasta: '18:00' },
    Miércoles:{ activo: true,  desde: '08:00', hasta: '18:00' },
    Jueves:   { activo: true,  desde: '08:00', hasta: '18:00' },
    Viernes:  { activo: true,  desde: '08:00', hasta: '17:00' },
    Sábado:   { activo: true,  desde: '09:00', hasta: '13:00' },
    Domingo:  { activo: false, desde: '09:00', hasta: '13:00' },
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function toggleDia(dia: string) {
    setHorarios(prev => ({ ...prev, [dia]: { ...prev[dia], activo: !prev[dia].activo } }))
  }

  function setHorario(dia: string, field: 'desde' | 'hasta', value: string) {
    setHorarios(prev => ({ ...prev, [dia]: { ...prev[dia], [field]: value } }))
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
        <h1 className="text-base font-bold text-[#1e1e1e]">Datos del taller</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-4 py-5 flex flex-col gap-4">

        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Información del taller</p>
          <div>
            <label className="label">Nombre del taller *</label>
            <input type="text" value={form.nombre} onChange={e => set('nombre', e.target.value)} className="input-field" required />
          </div>
          <div>
            <label className="label">CUIT</label>
            <input type="text" value={form.cuit} onChange={e => set('cuit', e.target.value)} placeholder="30-XXXXXXXX-X" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Teléfono</label>
              <input type="tel" value={form.telefono} onChange={e => set('telefono', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" value={form.mail} onChange={e => set('mail', e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Descripción</label>
            <textarea value={form.descripcion} onChange={e => set('descripcion', e.target.value)} className="input-field resize-none min-h-0" rows={2} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-4 flex flex-col gap-3">
          <p className="section-title mb-0">Ubicación</p>
          <div>
            <label className="label">Dirección</label>
            <input type="text" value={form.direccion} onChange={e => set('direccion', e.target.value)} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Ciudad</label>
              <input type="text" value={form.ciudad} onChange={e => set('ciudad', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Código postal</label>
              <input type="text" value={form.cp} onChange={e => set('cp', e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label">Provincia</label>
            <select className="input-field" value={form.provincia} onChange={e => set('provincia', e.target.value)}>
              {PROVINCIAS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Horarios */}
        <div className="bg-white rounded-2xl shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-[#113d87]" />
            <p className="section-title mb-0">Horarios de atención</p>
          </div>
          <div className="flex flex-col gap-2.5">
            {DIAS.map(dia => {
              const h = horarios[dia]
              return (
                <div key={dia} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleDia(dia)}
                    className={cn(
                      'w-10 h-6 rounded-full transition-all shrink-0 relative',
                      h.activo ? 'bg-[#113d87]' : 'bg-gray-200'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 bg-white rounded-full absolute top-1 transition-all',
                      h.activo ? 'left-5' : 'left-1'
                    )} />
                  </button>
                  <span className={cn('text-xs font-semibold w-20 shrink-0', h.activo ? 'text-[#1e1e1e]' : 'text-gray-300')}>
                    {dia}
                  </span>
                  {h.activo ? (
                    <div className="flex items-center gap-1.5 flex-1">
                      <input
                        type="time"
                        value={h.desde}
                        onChange={e => setHorario(dia, 'desde', e.target.value)}
                        className="flex-1 text-xs border border-gray-200 rounded-xl px-2 py-2 text-center font-semibold focus:outline-none focus:border-[#113d87]"
                      />
                      <span className="text-xs text-gray-400">a</span>
                      <input
                        type="time"
                        value={h.hasta}
                        onChange={e => setHorario(dia, 'hasta', e.target.value)}
                        className="flex-1 text-xs border border-gray-200 rounded-xl px-2 py-2 text-center font-semibold focus:outline-none focus:border-[#113d87]"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-300 flex-1">Cerrado</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <button type="submit" disabled={saving} className={cn('btn-primary-full', saving && 'opacity-70')}>
          {saved ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}
