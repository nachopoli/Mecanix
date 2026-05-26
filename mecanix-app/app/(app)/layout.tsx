'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  Settings,
  Wrench,
  Bell,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/inicio', label: 'Inicio', icon: LayoutDashboard },
  { href: '/agenda', label: 'Agenda', icon: CalendarDays },
  { href: '/crm', label: 'CRM', icon: Users },
  { href: '/operaciones', label: 'Operaciones', icon: ClipboardList },
  { href: '/configuracion', label: 'Config.', icon: Settings },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const currentNav = navItems.find(n => pathname === n.href || pathname.startsWith(n.href + '/'))

  return (
    <div className="flex h-screen bg-[#f4f6f9] overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex flex-col w-60 bg-[#0a2657] shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-[#ee6a28] rounded-xl flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl text-white tracking-tight">MECANIX</span>
        </div>

        {/* Taller info */}
        <div className="px-5 py-3 border-b border-white/10">
          <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider mb-0.5">Taller</p>
          <p className="text-sm font-semibold text-white leading-tight">Mecánica San Martín</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-blue-200/80 hover:bg-white/8 hover:text-white'
                )}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
              </Link>
            )
          })}
        </nav>

        {/* Módulos próximamente */}
        <div className="px-3 pb-3">
          <p className="text-[10px] text-blue-500 font-semibold uppercase tracking-wider px-3 mb-2">Próximamente</p>
          {['Administración', 'Reportes', 'Inventario'].map(label => (
            <div key={label} className="flex items-center gap-3 px-3 py-2 rounded-xl text-blue-500/60 text-sm">
              <div className="w-[18px] h-[18px] rounded bg-white/5 shrink-0" />
              {label}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#ee6a28]/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#ee6a28]">A</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-none">Administrador</p>
              <p className="text-[10px] text-blue-400 mt-0.5">Plan Starter</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Mobile top bar */}
        <header className="md:hidden bg-[#0a2657] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#ee6a28] rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-lg text-white tracking-tight">MECANIX</span>
          </div>
          <div className="flex items-center gap-3">
            {currentNav && (
              <span className="text-blue-300 text-xs font-semibold">{currentNav.label}</span>
            )}
            <button className="relative" aria-label="Notificaciones">
              <Bell className="w-5 h-5 text-blue-200" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ee6a28] rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
            </button>
          </div>
        </header>

        {/* Desktop top bar */}
        <header className="hidden md:flex bg-white border-b border-gray-100 px-6 py-3.5 items-center justify-between shrink-0">
          <div>
            <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
              {currentNav?.label || 'MECANIX'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ee6a28] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-[#e6ecf7] flex items-center justify-center">
                <span className="text-xs font-bold text-[#113d87]">A</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-none">Admin</p>
                <p className="text-[10px] text-gray-400">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
          {/* Space for mobile bottom nav */}
          <div className="md:hidden h-20" />
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
        <div className="flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative"
              >
                {active && (
                  <span className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-[#113d87] rounded-b-full" />
                )}
                <Icon
                  className={cn('w-[22px] h-[22px]', active ? 'text-[#113d87]' : 'text-gray-400')}
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={cn(
                  'text-[9px] font-bold tracking-wide',
                  active ? 'text-[#113d87]' : 'text-gray-400'
                )}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
