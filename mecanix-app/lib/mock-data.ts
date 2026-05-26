export type EstadoOT = 'pendiente' | 'programada' | 'en-curso' | 'pausada' | 'finalizada' | 'entregada' | 'cancelada'
export type EstadoPresupuesto = 'borrador' | 'enviado' | 'pendiente' | 'aprobado' | 'rechazado' | 'vencido'
export type EstadoTurno = 'agendado' | 'confirmado' | 'pendiente' | 'cancelado' | 'vencido' | 'finalizado'
export type Prioridad = 'normal' | 'alta' | 'urgente'

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
}

export interface Tecnico {
  id: string
  nombre: string
  especialidad: string
  initials: string
  color: string
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
}

export const tecnicos: Tecnico[] = [
  { id: 't1', nombre: 'Roberto Díaz', especialidad: 'Mecánica general', initials: 'RD', color: '#3b82f6' },
  { id: 't2', nombre: 'Pablo Sánchez', especialidad: 'Electricidad', initials: 'PS', color: '#8b5cf6' },
  { id: 't3', nombre: 'Nicolás Torres', especialidad: 'Chapa y pintura', initials: 'NT', color: '#10b981' },
]

export const clientes: Cliente[] = [
  { id: 'c1', nombre: 'Carlos Fernández', telefono: '11-4523-7890', mail: 'carlos.f@gmail.com', direccion: 'Av. San Martín 1245, CABA', cuit: '20-23456789-5', etiqueta: 'VIP', origen: 'Referido', deudaPendiente: 0, fechaUltimaVisita: '2025-05-22' },
  { id: 'c2', nombre: 'Mariano López', telefono: '11-5534-2210', mail: 'mlopez@hotmail.com', etiqueta: 'Regular', origen: 'Google', deudaPendiente: 45000, fechaUltimaVisita: '2025-05-18' },
  { id: 'c3', nombre: 'Lucas Gómez', telefono: '11-6678-9901', mail: 'lgomez@gmail.com', etiqueta: 'Nuevo', origen: 'Instagram', deudaPendiente: 0, fechaUltimaVisita: '2025-05-22' },
  { id: 'c4', nombre: 'Juan Rodríguez', telefono: '11-7823-4456', mail: 'jrodriguez@yahoo.com', etiqueta: 'Regular', origen: 'Referido', deudaPendiente: 120000, fechaUltimaVisita: '2025-04-30' },
  { id: 'c5', nombre: 'Sebastián Martínez', telefono: '11-9912-3345', mail: 'sebas.m@gmail.com', etiqueta: 'VIP', origen: 'Presencial', deudaPendiente: 0, fechaUltimaVisita: '2025-05-24' },
]

export const vehiculos: Vehiculo[] = [
  { id: 'v1', clienteId: 'c1', marca: 'Toyota', modelo: 'Hilux', version: '4x4 SR 2.8 TDi', año: 2019, patente: 'AE123FG', km: 85000, color: 'Blanco' },
  { id: 'v2', clienteId: 'c1', marca: 'Volkswagen', modelo: 'Amarok', version: 'V6 Highline', año: 2021, patente: 'BF456TR', km: 42000, color: 'Negro' },
  { id: 'v3', clienteId: 'c2', marca: 'Renault', modelo: 'Kangoo', version: '1.6 Express', año: 2017, patente: 'CH789QW', km: 110000, color: 'Gris' },
  { id: 'v4', clienteId: 'c3', marca: 'Peugeot', modelo: '208', version: '1.6 Active', año: 2022, patente: 'DI012OP', km: 28000, color: 'Rojo' },
  { id: 'v5', clienteId: 'c4', marca: 'Ford', modelo: 'Ranger', version: 'XLS 2.2 TDi 4x2', año: 2020, patente: 'EJ345AS', km: 65000, color: 'Plateado' },
  { id: 'v6', clienteId: 'c5', marca: 'Fiat', modelo: 'Cronos', version: '1.3 Drive GSE', año: 2023, patente: 'FK678DF', km: 15000, color: 'Azul' },
  { id: 'v7', clienteId: 'c2', marca: 'Chevrolet', modelo: 'S10', version: 'LTZ 2.8 4x4', año: 2018, patente: 'GL901GH', km: 93000, color: 'Blanco' },
]

export const ordenesDeTrabajoMock: OT[] = [
  { id: 'ot1', numero: 'OT-0241', vehiculoId: 'v1', clienteId: 'c1', tecnicoId: 't1', estado: 'en-curso', descripcion: 'Service completo: aceite, filtros y revisión frenos', fechaIngreso: '2025-05-23', fechaEstimada: '2025-05-25', prioridad: 'alta', manoDeObra: 25000, repuestos: 38000, total: 63000 },
  { id: 'ot2', numero: 'OT-0242', vehiculoId: 'v3', clienteId: 'c2', tecnicoId: 't1', estado: 'en-curso', descripcion: 'Reparación sistema de refrigeración, bomba de agua', fechaIngreso: '2025-05-24', fechaEstimada: '2025-05-26', prioridad: 'urgente', manoDeObra: 18000, repuestos: 42000, total: 60000 },
  { id: 'ot3', numero: 'OT-0240', vehiculoId: 'v5', clienteId: 'c4', tecnicoId: 't2', estado: 'finalizada', descripcion: 'Revisión sistema eléctrico y batería', fechaIngreso: '2025-05-20', fechaEstimada: '2025-05-22', prioridad: 'normal', manoDeObra: 12000, repuestos: 28000, total: 40000 },
  { id: 'ot4', numero: 'OT-0243', vehiculoId: 'v4', clienteId: 'c3', tecnicoId: 't3', estado: 'pendiente', descripcion: 'Reparación paragolpe delantero y pintura', fechaIngreso: '2025-05-25', fechaEstimada: '2025-05-28', prioridad: 'normal', manoDeObra: 35000, repuestos: 15000, total: 50000 },
  { id: 'ot5', numero: 'OT-0244', vehiculoId: 'v6', clienteId: 'c5', tecnicoId: 't1', estado: 'programada', descripcion: 'Service de los 15.000 km y alineación', fechaIngreso: '2025-05-25', fechaEstimada: '2025-05-26', prioridad: 'normal', manoDeObra: 15000, repuestos: 22000, total: 37000 },
  { id: 'ot6', numero: 'OT-0239', vehiculoId: 'v2', clienteId: 'c1', tecnicoId: 't2', estado: 'entregada', descripcion: 'Cambio de correa de distribución', fechaIngreso: '2025-05-15', fechaEstimada: '2025-05-17', prioridad: 'alta', manoDeObra: 30000, repuestos: 55000, total: 85000 },
  { id: 'ot7', numero: 'OT-0245', vehiculoId: 'v7', clienteId: 'c2', tecnicoId: 't3', estado: 'pausada', descripcion: 'Reparación caja de cambios — esperando repuesto', fechaIngreso: '2025-05-21', fechaEstimada: '2025-05-30', prioridad: 'alta', manoDeObra: 45000, repuestos: 75000, total: 120000, notas: 'Esperando sincronizadores del proveedor' },
]

export const presupuestosMock: Presupuesto[] = [
  {
    id: 'p1', numero: 'PRE-0089', vehiculoId: 'v3', clienteId: 'c2', estado: 'enviado',
    fecha: '2025-05-22', vencimiento: '2025-05-29',
    items: [
      { id: 'i1', descripcion: 'Bomba de agua', tipo: 'repuesto', cantidad: 1, precioUnitario: 38000, total: 38000 },
      { id: 'i2', descripcion: 'Mano de obra reparación', tipo: 'mano-de-obra', cantidad: 1, precioUnitario: 18000, total: 18000 },
      { id: 'i3', descripcion: 'Anticongelante 5L', tipo: 'material', cantidad: 1, precioUnitario: 4000, total: 4000 },
    ],
    total: 60000,
  },
  {
    id: 'p2', numero: 'PRE-0090', vehiculoId: 'v5', clienteId: 'c4', estado: 'aprobado',
    fecha: '2025-05-19', vencimiento: '2025-05-26',
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
]

export const turnosMock: Turno[] = [
  { id: 'tu1', clienteId: 'c1', vehiculoId: 'v1', fecha: '2025-05-25', hora: '08:30', duracion: 120, tipoTrabajo: 'Service completo', estado: 'confirmado' },
  { id: 'tu2', clienteId: 'c3', vehiculoId: 'v4', fecha: '2025-05-25', hora: '10:00', duracion: 240, tipoTrabajo: 'Chapa y pintura', estado: 'confirmado' },
  { id: 'tu3', clienteId: 'c5', vehiculoId: 'v6', fecha: '2025-05-25', hora: '11:30', duracion: 90, tipoTrabajo: 'Service 15k km', estado: 'agendado' },
  { id: 'tu4', clienteId: 'c4', vehiculoId: 'v5', fecha: '2025-05-25', hora: '14:00', duracion: 60, tipoTrabajo: 'Revisión eléctrica', estado: 'agendado' },
  { id: 'tu5', clienteId: 'c2', vehiculoId: 'v3', fecha: '2025-05-25', hora: '15:30', duracion: 120, tipoTrabajo: 'Refrigeración', estado: 'pendiente' },
]

export function getCliente(id: string) { return clientes.find(c => c.id === id) }
export function getVehiculo(id: string) { return vehiculos.find(v => v.id === id) }
export function getTecnico(id: string) { return tecnicos.find(t => t.id === id) }
export function getVehiculosByCliente(clienteId: string) { return vehiculos.filter(v => v.clienteId === clienteId) }
export function getOTsByCliente(clienteId: string) { return ordenesDeTrabajoMock.filter(ot => ot.clienteId === clienteId) }
