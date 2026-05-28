'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Mail, Phone, Trash2, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Usuario {
  id: string
  nombre: string
  mail: string
  telefono: string
  rol: 'admin' | 'tecnico' | 'recepcion'
  activo: boolean
}

const USUARIOS_MOCK: Usuario[] = [
  { id: 'u1', nombre: 'Administrador García', mail: 'admin@mecanicastaller.com', telefono: '11-4523-0000', rol: 'admin', activo: true },
  { id: 'u2', nombre: 'Roberto Díaz', mail: 'rdiaz@mecanix.com', telefono: '11-4523-1111', rol: 'tecnico', activo: true },
  { id: 'u3', nombre: 'Pablo Sánchez', mail: 'psanchez@mecanix.com', telefono: '11-4523-2222', rol: 'tecnico', activo: true },
  { id: 'u4', nombre: 'Nicolás Torres', mail: 'ntorres@mecanix.com', telefono: '11-4523-3333', rol: 'tecnico', activo: false },
]

const ROL_CONFIG = {
  admin:    { label: 'Administrador', color: 'bg-[#e6ecf7] text-[#113d87]' },
  tecnico:  { label: 'Técnico',       color: 'bg-[#fde8dc] text-[#ee6a28]' },
  recepcion: { label: 'Recepción',    color: 'bg-purple-100 text-purple-700' },
}

export default function UsuariosPage() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [nuevaForm, setNuevaForm] = useState<{ nombre: string; mail: string; rol: 'admin' | 'tecnico' | 'recepcion' }>({ nombre: '', mail: '', rol: 'tecnico' })

  const planLimite = 3
  const usuariosActivos = USUARIOS_MOCK.filter(u => u.activo).length

  return (
    <div className="flex flex-col min-h-full bg-[#f4f6f9]">

      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-[#f4f6f9] flex items-center justify-center shrink-0">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-[#1e1e1e] flex-1">Usuarios</h1>
        <button
          onClick={() => setShowModal(true)}
          disabled={usuariosActivos >= planLimite}
          className={cn(
            'flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl',
            usuariosActivos >= planLimite
              ? 'bg-gray-100 text-gray-400'
              : 'bg-[#113d87] text-white'
          )}
        >
          <Plus className="w-3.5 h-3.5" />
          Invitar
        </button>
      </div>

      <div className="flex-1 px-4 py-5 flex flex-col gap-4">

        {/* Plan info */}
        <div className={cn(
          'rounded-2xl p-4 flex items-center gap-3',
          usuariosActivos >= planLimite ? 'bg-amber-50 border border-amber-200' : 'bg-[#e6ecf7]'
        )}>
          <Shield className={cn('w-5 h-5 shrink-0', usuariosActivos >= planLimite ? 'text-amber-500' : 'text-[#113d87]')} />
          <div className="flex-1">
            <p className={cn('text-sm font-bold', usuariosActivos >= planLimite ? 'text-amber-700' : 'text-[#113d87]')}>
              Plan Starter — {usuariosActivos}/{planLimite} usuarios activos
            </p>
            {usuariosActivos >= planLimite && (
              <p className="text-xs text-amber-600">Alcanzaste el límite. Upgrades al Plan Profesional.</p>
            )}
          </div>
          {usuariosActivos >= planLimite && (
            <button className="text-xs font-bold text-[#ee6a28] shrink-0">Upgrade</button>
          )}
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-2.5">
          {USUARIOS_MOCK.map(u => (
            <div key={u.id} className={cn('bg-white rounded-2xl shadow-card p-4', !u.activo && 'opacity-60')}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0',
                    u.rol === 'admin' ? 'bg-[#113d87]' : u.rol === 'tecnico' ? 'bg-[#ee6a28]' : 'bg-purple-500'
                  )}>
                    {u.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-bold text-[#1e1e1e] truncate">{u.nombre}</p>
                      {!u.activo && <span className="badge badge-borrador">Inactivo</span>}
                    </div>
                    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', ROL_CONFIG[u.rol].color)}>
                      {ROL_CONFIG[u.rol].label}
                    </span>
                  </div>
                </div>
                {u.rol !== 'admin' && (
                  <button className="p-2 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-1 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail className="w-3 h-3" />
                  {u.mail}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Phone className="w-3 h-3" />
                  {u.telefono}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal invitar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[#1e1e1e] mb-4">Invitar usuario</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="label">Nombre</label>
                <input type="text" value={nuevaForm.nombre} onChange={e => setNuevaForm(p => ({ ...p, nombre: e.target.value }))} className="input-field" placeholder="Nombre completo" />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" value={nuevaForm.mail} onChange={e => setNuevaForm(p => ({ ...p, mail: e.target.value }))} className="input-field" placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className="label">Rol</label>
                <div className="flex gap-2">
                  {(['tecnico', 'recepcion', 'admin'] as const).map(r => (
                    <button key={r} type="button" onClick={() => setNuevaForm(p => ({ ...p, rol: r }))}
                      className={cn('flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all',
                        nuevaForm.rol === r ? cn(ROL_CONFIG[r].color, 'border-transparent') : 'border-gray-200 text-gray-400'
                      )}>
                      {ROL_CONFIG[r].label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="btn-primary-full mt-1">Enviar invitación</button>
              <button onClick={() => setShowModal(false)} className="text-sm text-gray-400 text-center py-2">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
