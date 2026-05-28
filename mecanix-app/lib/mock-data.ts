export type EstadoOT = 'pendiente' | 'programada' | 'en-curso' | 'pausada' | 'finalizada' | 'entregada' | 'cancelada'
export type EstadoPresupuesto = 'borrador' | 'enviado' | 'pendiente' | 'aprobado' | 'rechazado' | 'vencido'
export type EstadoTurno = 'agendado' | 'confirmado' | 'pendiente' | 'cancelado' | 'vencido' | 'finalizado'
export type Prioridad = 'normal' | 'alta' | 'urgente'
export type ChecklistEstado = 'ok' | 'revisar' | 'urgente' | null

export interface Cliente {
  id: string
  nombre: string
  telefono: string
  mail: string
  direccion?: string
  cuit?: string
  etiqueta: 'VIP' | 'Regular' | 'Nuevo' | 'Inactivo'
  origen: string
  deudaPendiente: number
  fechaUltimaVisita: string
  notas?: string
}

export interface Vehiculo {
  id: string
  clienteId: string
  marca: string
  modelo: string
  version: string
  año: number
  patente: string
  km: number
  color: string
  combustible?: string
  vin?: string
}

export interface Tecnico {
  id: string
  nombre: string
  especialidad: string
  initials: string
  color: string
  telefono?: string
  mail?: string
}

export interface OT {
  id: string
  numero: string
  vehiculoId: string
  clienteId: string
  tecnicoId: string
  estado: EstadoOT
  descripcion: string
  fechaIngreso: string
  fechaEstimada: string
  prioridad: Prioridad
  manoDeObra: number
  repuestos: number
  total: number
  notas?: string
  peritajeId?: string
  presupuestoId?: string
}

export interface ItemPresupuesto {
  id: string
  descripcion: string
  tipo: 'mano-de-obra' | 'repuesto' | 'material'
  cantidad: number
  precioUnitario: number
  total: number
}

export interface Presupuesto {
  id: string
  numero: string
  vehiculoId: string
  clienteId: string
  estado: EstadoPresupuesto
  fecha: string
  vencimiento: string
  items: ItemPresupuesto[]
  total: number
  otId?: string
  peritajeId?: string
  notas?: string
}

export interface Turno {
  id: string
  clienteId: string
  vehiculoId: string
  fecha: string
  hora: string
  duracion: number
  tipoTrabajo: string
  estado: EstadoTurno
  notas?: string
  tecnicoId?: string
}

export interface Peritaje {
  id: string
  numero: string
  vehiculoId: string
  clienteId: string
  tecnicoId: string
  fecha: string
  checklist: Record<string, ChecklistEstado>
  diagnostico: string
  trabajosSugeridos: string[]
  estado: 'borrador' | 'finalizado'
  otId?: string
  presupuestoId?: string
}

// ── Data ──────────────────────────────────────────

export const tecnicos: Tecnico[] = [
  { id: 't1', nombre: 'Roberto Díaz', especialidad: 'Mecánica general', initials: 'RD', color: '#3b82f6', telefono: '11-4523-1111', mail: 'rdiaz@mecanix.com' },
  { id: 't2', nombre: 'Pablo Sánchez', especialidad: 'Electricidad', initials: 'PS', color: '#8b5cf6', telefono: '11-4523-2222', mail: 'psanchez@mecanix.com' },
  { id: 't3', nombre: 'Nicolás Torres', especialidad: 'Chapa y pintura', initials: 'NT', color: '#10b981', telefono: '11-4523-3333', mail: 'ntorres@mecanix.com' },
]

export const clientes: Cliente[] = [
  { id: 'c1', nombre: 'Carlos Fernández', telefono: '11-4523-7890', mail: 'carlos.f@gmail.com', direccion: 'Av. San Martín 1245, CABA', cuit: '20-23456789-5', etiqueta: 'VIP', origen: 'Referido', deudaPendiente: 0, fechaUltimaVisita: '2025-05-22', notas: 'Cliente desde 2021. Preferencia por repuestos originales.' },
  { id: 'c2', nombre: 'Mariano López', telefono: '11-5534-2210', mail: 'mlopez@hotmail.com', direccion: 'Corrientes 850, Avellaneda', etiqueta: 'Regular', origen: 'Google', deudaPendiente: 45000, fechaUltimaVisita: '2025-05-18' },
  { id: 'c3', nombre: 'Lucas Gómez', telefono: '11-6678-9901', mail: 'lgomez@gmail.com', direccion: 'Mitre 340, Lanús', etiqueta: 'Nuevo', origen: 'Instagram', deudaPendiente: 0, fechaUltimaVisita: '2025-05-22' },
  { id: 'c4', nombre: 'Juan Rodríguez', telefono: '11-7823-4456', mail: 'jrodriguez@yahoo.com', direccion: 'Belgrano 1120, Quilmes', cuit: '20-18765432-1', etiqueta: 'Regular', origen: 'Referido', deudaPendiente: 120000, fechaUltimaVisita: '2025-04-30' },
  { id: 'c5', nombre: 'Sebastián Martínez', telefono: '11-9912-3345', mail: 'sebas.m@gmail.com', direccion: 'Rivadavia 2200, Lomas de Zamora', cuit: '20-30123456-7', etiqueta: 'VIP', origen: 'Presencial', deudaPendiente: 0, fechaUltimaVisita: '2025-05-24' },
  { id: 'c6', nombre: 'Juan Pérez', telefono: '11-4456-7890', mail: 'jperez@gmail.com', direccion: 'Av. Rivadavia 3540, Flores', etiqueta: 'Nuevo', origen: 'Instagram', deudaPendiente: 0, fechaUltimaVisita: '2025-05-26' },
]

export const vehiculos: Vehiculo[] = [
  { id: 'v1', clienteId: 'c1', marca: 'Toyota', modelo: 'Hilux', version: '4x4 SR 2.8 TDi', año: 2019, patente: 'AE123FG', km: 85000, color: 'Blanco', combustible: 'Diesel' },
  { id: 'v2', clienteId: 'c1', marca: 'Volkswagen', modelo: 'Amarok', version: 'V6 Highline', año: 2021, patente: 'BF456TR', km: 42000, color: 'Negro', combustible: 'Diesel', vin: 'WVZZZ2HZXM000001' },
  { id: 'v3', clienteId: 'c2', marca: 'Renault', modelo: 'Kangoo', version: '1.6 Express', año: 2017, patente: 'CH789QW', km: 110000, color: 'Gris', combustible: 'Nafta' },
  { id: 'v4', clienteId: 'c3', marca: 'Peugeot', modelo: '208', version: '1.6 Active', año: 2022, patente: 'DI012OP', km: 28000, color: 'Rojo', combustible: 'Nafta' },
  { id: 'v5', clienteId: 'c4', marca: 'Ford', modelo: 'Ranger', version: 'XLS 2.2 TDi 4x2', año: 2020, patente: 'EJ345AS', km: 65000, color: 'Plateado', combustible: 'Diesel' },
  { id: 'v6', clienteId: 'c5', marca: 'Fiat', modelo: 'Cronos', version: '1.3 Drive GSE', año: 2023, patente: 'FK678DF', km: 15000, color: 'Azul', combustible: 'Nafta' },
  { id: 'v7', clienteId: 'c2', marca: 'Chevrolet', modelo: 'S10', version: 'LTZ 2.8 4x4', año: 2018, patente: 'GL901GH', km: 93000, color: 'Blanco', combustible: 'Diesel' },
  { id: 'v8', clienteId: 'c6', marca: 'Volkswagen', modelo: 'Gol', version: 'Trend 1.6 MSI', año: 2019, patente: 'ABC123', km: 67000, color: 'Gris', combustible: 'Nafta' },
]

export const ordenesDeTrabajoMock: OT[] = [
  { id: 'ot1', numero: 'OT-0241', vehiculoId: 'v1', clienteId: 'c1', tecnicoId: 't1', estado: 'en-curso', descripcion: 'Service completo: aceite, filtros y revisión frenos', fechaIngreso: '2025-05-23', fechaEstimada: '2025-05-25', prioridad: 'alta', manoDeObra: 25000, repuestos: 38000, total: 63000, peritajeId: 'per1' },
  { id: 'ot2', numero: 'OT-0242', vehiculoId: 'v3', clienteId: 'c2', tecnicoId: 't1', estado: 'en-curso', descripcion: 'Reparación sistema de refrigeración, bomba de agua', fechaIngreso: '2025-05-24', fechaEstimada: '2025-05-26', prioridad: 'urgente', manoDeObra: 18000, repuestos: 42000, total: 60000, presupuestoId: 'p1' },
  { id: 'ot3', numero: 'OT-0240', vehiculoId: 'v5', clienteId: 'c4', tecnicoId: 't2', estado: 'finalizada', descripcion: 'Revisión sistema eléctrico y batería', fechaIngreso: '2025-05-20', fechaEstimada: '2025-05-22', prioridad: 'normal', manoDeObra: 12000, repuestos: 28000, total: 40000, presupuestoId: 'p2' },
  { id: 'ot4', numero: 'OT-0243', vehiculoId: 'v4', clienteId: 'c3', tecnicoId: 't3', estado: 'pendiente', descripcion: 'Reparación paragolpe delantero y pintura', fechaIngreso: '2025-05-25', fechaEstimada: '2025-05-28', prioridad: 'normal', manoDeObra: 35000, repuestos: 15000, total: 50000 },
  { id: 'ot5', numero: 'OT-0244', vehiculoId: 'v6', clienteId: 'c5', tecnicoId: 't1', estado: 'programada', descripcion: 'Service de los 15.000 km y alineación', fechaIngreso: '2025-05-25', fechaEstimada: '2025-05-26', prioridad: 'normal', manoDeObra: 15000, repuestos: 22000, total: 37000 },
  { id: 'ot6', numero: 'OT-0239', vehiculoId: 'v2', clienteId: 'c1', tecnicoId: 't2', estado: 'entregada', descripcion: 'Cambio de correa de distribución', fechaIngreso: '2025-05-15', fechaEstimada: '2025-05-17', prioridad: 'alta', manoDeObra: 30000, repuestos: 55000, total: 85000 },
  { id: 'ot7', numero: 'OT-0245', vehiculoId: 'v7', clienteId: 'c2', tecnicoId: 't3', estado: 'pausada', descripcion: 'Reparación caja de cambios — esperando repuesto', fechaIngreso: '2025-05-21', fechaEstimada: '2025-05-30', prioridad: 'alta', manoDeObra: 45000, repuestos: 75000, total: 120000, notas: 'Esperando sincronizadores del proveedor' },
  { id: 'ot8', numero: 'OT-0246', vehiculoId: 'v8', clienteId: 'c6', tecnicoId: 't1', estado: 'en-curso', descripcion: 'Service completo: aceite, filtros, correa de distribución y bomba de agua', fechaIngreso: '2025-05-26', fechaEstimada: '2025-05-30', prioridad: 'alta', manoDeObra: 40000, repuestos: 96800, total: 136800, presupuestoId: 'p5', peritajeId: 'per3' },
]

export const presupuestosMock: Presupuesto[] = [
  {
    id: 'p1', numero: 'PRE-0089', vehiculoId: 'v3', clienteId: 'c2', estado: 'enviado',
    fecha: '2025-05-22', vencimiento: '2025-05-29', otId: 'ot2',
    items: [
      { id: 'i1', descripcion: 'Bomba de agua', tipo: 'repuesto', cantidad: 1, precioUnitario: 38000, total: 38000 },
      { id: 'i2', descripcion: 'Mano de obra reparación', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 18000, total: 18000 },
      { id: 'i3', descripcion: 'Anticongelante 5L', tipo: 'material', cantidad: 1, precioUnitario: 4000, total: 4000 },
    ],
    total: 60000,
  },
  {
    id: 'p2', numero: 'PRE-0090', vehiculoId: 'v5', clienteId: 'c4', estado: 'aprobado',
    fecha: '2025-05-19', vencimiento: '2025-05-26', otId: 'ot3',
    items: [
      { id: 'i4', descripcion: 'Revisión sistema eléctrico', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 12000, total: 12000 },
      { id: 'i5', descripcion: 'Batería 12V 65Ah', tipo: 'repuesto', cantidad: 1, precioUnitario: 28000, total: 28000 },
    ],
    total: 40000,
  },
  {
    id: 'p3', numero: 'PRE-0088', vehiculoId: 'v7', clienteId: 'c2', estado: 'vencido',
    fecha: '2025-05-05', vencimiento: '2025-05-12',
    items: [
      { id: 'i6', descripcion: 'Reparación caja de cambios', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 45000, total: 45000 },
      { id: 'i7', descripcion: 'Sincronizadores x2', tipo: 'repuesto', cantidad: 2, precioUnitario: 15000, total: 30000 },
    ],
    total: 75000,
  },
  {
    id: 'p4', numero: 'PRE-0091', vehiculoId: 'v4', clienteId: 'c3', estado: 'borrador',
    fecha: '2025-05-25', vencimiento: '2025-06-01',
    items: [
      { id: 'i8', descripcion: 'Reparación paragolpe delantero', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 35000, total: 35000 },
      { id: 'i9', descripcion: 'Pintura frontal', tipo: 'material', cantidad: 1, precioUnitario: 15000, total: 15000 },
    ],
    total: 50000,
  },
  {
    id: 'p5', numero: 'PRE-0092', vehiculoId: 'v8', clienteId: 'c6', estado: 'aprobado',
    fecha: '2025-05-26', vencimiento: '2025-06-02', peritajeId: 'per3',
    items: [
      { id: 'p5-i1', descripcion: 'Aceite sintético 5W30 5L', tipo: 'repuesto', cantidad: 1, precioUnitario: 11200, total: 11200 },
      { id: 'p5-i2', descripcion: 'Filtro aceite original', tipo: 'repuesto', cantidad: 1, precioUnitario: 4500, total: 4500 },
      { id: 'p5-i3', descripcion: 'Filtro aire original', tipo: 'repuesto', cantidad: 1, precioUnitario: 3800, total: 3800 },
      { id: 'p5-i4', descripcion: 'Kit correa de distribución completo', tipo: 'repuesto', cantidad: 1, precioUnitario: 52500, total: 52500 },
      { id: 'p5-i5', descripcion: 'Bomba de agua', tipo: 'repuesto', cantidad: 1, precioUnitario: 24800, total: 24800 },
      { id: 'p5-i6', descripcion: 'Mano de obra service completo', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 18000, total: 18000 },
      { id: 'p5-i7', descripcion: 'Mano de obra distribución y bomba', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 22000, total: 22000 },
    ],
    total: 136800,
    notas: 'Incluye mano de obra y repuestos. Garantía 3 meses / 5.000 km.',
  },
]

export const turnosMock: Turno[] = [
  { id: 'tu1', clienteId: 'c1', vehiculoId: 'v1', fecha: '2025-05-25', hora: '08:30', duracion: 120, tipoTrabajo: 'Service completo', estado: 'confirmado', tecnicoId: 't1' },
  { id: 'tu2', clienteId: 'c3', vehiculoId: 'v4', fecha: '2025-05-25', hora: '10:00', duracion: 240, tipoTrabajo: 'Chapa y pintura', estado: 'confirmado', tecnicoId: 't3' },
  { id: 'tu3', clienteId: 'c5', vehiculoId: 'v6', fecha: '2025-05-25', hora: '11:30', duracion: 90, tipoTrabajo: 'Service 15k km', estado: 'agendado', tecnicoId: 't1' },
  { id: 'tu4', clienteId: 'c4', vehiculoId: 'v5', fecha: '2025-05-25', hora: '14:00', duracion: 60, tipoTrabajo: 'Revisión eléctrica', estado: 'agendado', tecnicoId: 't2' },
  { id: 'tu5', clienteId: 'c2', vehiculoId: 'v3', fecha: '2025-05-25', hora: '15:30', duracion: 120, tipoTrabajo: 'Refrigeración', estado: 'pendiente', tecnicoId: 't1' },
  { id: 'tu6', clienteId: 'c1', vehiculoId: 'v2', fecha: '2025-05-26', hora: '09:00', duracion: 180, tipoTrabajo: 'Distribución', estado: 'confirmado', tecnicoId: 't2' },
  { id: 'tu7', clienteId: 'c5', vehiculoId: 'v6', fecha: '2025-05-27', hora: '10:30', duracion: 60, tipoTrabajo: 'Alineación y balanceo', estado: 'agendado', tecnicoId: 't1' },
  { id: 'tu8', clienteId: 'c4', vehiculoId: 'v5', fecha: '2025-05-28', hora: '08:00', duracion: 120, tipoTrabajo: 'Cambio frenos', estado: 'agendado', tecnicoId: 't2', notas: 'Revisar también pastillas traseras' },
]

export const peritajesMock: Peritaje[] = [
  {
    id: 'per1',
    numero: 'PER-0041',
    vehiculoId: 'v1',
    clienteId: 'c1',
    tecnicoId: 't1',
    fecha: '2025-05-23',
    checklist: {
      frenos: 'ok',
      aceite: 'revisar',
      filtro_aceite: 'revisar',
      filtro_aire: 'ok',
      suspension: 'ok',
      neumaticos: 'ok',
      luces: 'ok',
      bateria: 'ok',
      refrigeracion: 'urgente',
      escobillas: 'revisar',
      direccion: 'ok',
      escape: 'ok',
    },
    diagnostico: 'Vehículo con service vencido. Aceite con más de 15.000 km de uso, filtros por cambiar. Nivel de refrigerante bajo, posible pérdida menor en manguera superior. Escobillas desgastadas pero funcionales.',
    trabajosSugeridos: ['Cambio de aceite y filtro', 'Revisión y recarga sistema de refrigeración', 'Cambio de escobillas', 'Revisión manguera superior radiador'],
    estado: 'finalizado',
    otId: 'ot1',
  },
  {
    id: 'per3',
    numero: 'PER-0043',
    vehiculoId: 'v8',
    clienteId: 'c6',
    tecnicoId: 't1',
    fecha: '2025-05-26',
    checklist: {
      frenos: 'ok',
      aceite: 'urgente',
      filtro_aceite: 'urgente',
      filtro_aire: 'revisar',
      suspension: 'ok',
      neumaticos: 'revisar',
      luces: 'ok',
      bateria: 'ok',
      refrigeracion: 'revisar',
      escobillas: 'ok',
      direccion: 'ok',
      escape: 'ok',
    },
    diagnostico: 'Aceite con más de 25.000 km de uso, color negro y viscosidad baja. Filtro de aceite totalmente colmatado. Filtro de aire sucio. Neumáticos con desgaste irregular, presión baja. Refrigeración con nivel bajo. Correa de distribución presenta desgaste visible. Se recomienda intervención urgente de motor.',
    trabajosSugeridos: ['Cambio de aceite y filtro de aceite', 'Cambio de filtro de aire', 'Kit correa de distribución + bomba de agua', 'Alineación y balanceo', 'Revisión sistema de refrigeración'],
    estado: 'finalizado',
    presupuestoId: 'p5',
    otId: 'ot8',
  },
  {
    id: 'per2',
    numero: 'PER-0042',
    vehiculoId: 'v3',
    clienteId: 'c2',
    tecnicoId: 't1',
    fecha: '2025-05-24',
    checklist: {
      frenos: 'ok',
      aceite: 'ok',
      filtro_aceite: 'ok',
      filtro_aire: 'revisar',
      suspension: 'ok',
      neumaticos: 'revisar',
      luces: 'ok',
      bateria: 'revisar',
      refrigeracion: 'urgente',
      escobillas: 'ok',
      direccion: 'ok',
      escape: 'ok',
    },
    diagnostico: 'Sistema de refrigeración con falla. Bomba de agua con ruido anormal y pérdida de presión. Neumáticos con desgaste irregular. Batería con poca carga, posible reemplazo próximo.',
    trabajosSugeridos: ['Reemplazo bomba de agua', 'Carga y prueba de batería', 'Alineación y balanceo'],
    estado: 'finalizado',
    otId: 'ot2',
    presupuestoId: 'p1',
  },
]

// ── Helpers ──────────────────────────────────────

export function getCliente(id: string) { return clientes.find(c => c.id === id) }
export function getVehiculo(id: string) { return vehiculos.find(v => v.id === id) }
export function getTecnico(id: string) { return tecnicos.find(t => t.id === id) }
export function getOT(id: string) { return ordenesDeTrabajoMock.find(o => o.id === id) }
export function getPresupuesto(id: string) { return presupuestosMock.find(p => p.id === id) }
export function getTurno(id: string) { return turnosMock.find(t => t.id === id) }
export function getPeritaje(id: string) { return peritajesMock.find(p => p.id === id) }

export function getVehiculosByCliente(clienteId: string) { return vehiculos.filter(v => v.clienteId === clienteId) }
export function getOTsByCliente(clienteId: string) { return ordenesDeTrabajoMock.filter(o => o.clienteId === clienteId) }
export function getOTsByVehiculo(vehiculoId: string) { return ordenesDeTrabajoMock.filter(o => o.vehiculoId === vehiculoId) }
export function getPresupuestosByCliente(clienteId: string) { return presupuestosMock.filter(p => p.clienteId === clienteId) }
export function getTurnosByCliente(clienteId: string) { return turnosMock.filter(t => t.clienteId === clienteId) }
export function getPeritajesByVehiculo(vehiculoId: string) { return peritajesMock.filter(p => p.vehiculoId === vehiculoId) }

export const CHECKLIST_LABELS: Record<string, string> = {
  frenos: 'Frenos',
  aceite: 'Aceite motor',
  filtro_aceite: 'Filtro aceite',
  filtro_aire: 'Filtro aire',
  suspension: 'Suspensión',
  neumaticos: 'Neumáticos',
  luces: 'Luces',
  bateria: 'Batería',
  refrigeracion: 'Refrigeración',
  escobillas: 'Escobillas',
  direccion: 'Dirección',
  escape: 'Escape',
}

export const CHECKLIST_KEYS = Object.keys(CHECKLIST_LABELS)
