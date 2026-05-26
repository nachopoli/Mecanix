# MEMORIA DESCRIPTIVA FUNCIONAL — MVP MECANIX

## 1. Descripción General del Proyecto

MECANIX es una plataforma SaaS B2B cloud-first orientada a la gestión operativa de talleres automotrices independientes en Argentina.

El producto fue diseñado bajo una lógica mobile-first real, priorizando el uso desde dispositivos móviles dentro del entorno operativo del taller.

La plataforma busca digitalizar y centralizar:

- Clientes
- Vehículos
- Agenda
- Diagnósticos
- Presupuestos
- Órdenes de trabajo
- Seguimiento operativo
- Comunicación con clientes

El MVP corresponde exclusivamente al plan STARTER.

El alcance funcional inicial incluye:

- Módulo Configuración y Personalización
- Módulo Operaciones

El objetivo del MVP no es construir una solución funcional con backend productivo, sino un prototipo navegable de alta fidelidad con datos mock realistas.

El prototipo debe transmitir:

- Simplicidad de uso
- Profesionalización del taller
- Organización operativa
- Velocidad de navegación
- Experiencia mobile superior a competidores
- Trazabilidad visual
- Automatización contextual

---

# 2. Objetivo del MVP

El MVP busca validar:

- Adopción digital del taller tradicional
- Uso operativo diario desde mobile
- Facilidad de onboarding
- Flujo operativo real
- Centralización de información
- Trazabilidad del trabajo
- Mejora en experiencia del cliente
- Viabilidad del modelo SaaS

El foco principal del prototipo debe estar puesto en:

1. Dashboard
2. Agenda
3. CRM
4. Peritaje y diagnóstico
5. Presupuesto interactivo
6. Orden de trabajo
7. Timeline público del cliente

---

# 3. Perfil del Usuario Final

## Usuario Principal

Dueño de taller mecánico independiente.

Ejemplo de buyer persona:

- Nombre: Carlos
- Edad: 42 años
- Perfil tecnológico bajo/intermedio
- Usa principalmente el celular
- Opera dentro del taller
- Necesita velocidad y claridad visual
- Tiene poco tiempo administrativo
- Maneja múltiples vehículos simultáneamente

## Necesidades Principales

- Ver rápidamente el estado operativo
- No cargar datos repetidos
- Acceso rápido desde mobile
- Seguimiento simple de trabajos
- Mejor comunicación con clientes
- Presupuestos claros
- Orden operativo
- Visualización rápida de pendientes

## Implicancias UX/UI

La interfaz debe contemplar:

- Botones grandes
- Alto contraste
- Lectura rápida
- Navegación simple
- Poca profundidad de navegación
- Información jerarquizada
- CTAs claros
- Acciones rápidas visibles
- Lenguaje argentino y directo
- Flujo intuitivo

---

# 4. Principios de Diseño del Producto

## Conceptos Base

- Mobile-first real
- Navegación rápida
- Baja fricción
- Operación con una mano
- Jerarquía visual clara
- Densidad de información balanceada
- Automatización contextual
- Visualización operativa inmediata

## Diferenciadores Estratégicos

### Mobile-first real

La experiencia está diseñada desde cero para celular.

No es una adaptación desktop reducida.

### Alertas contextuales

Ejemplos:

- “Tenés 3 presupuestos por vencer”
- “2 OT están demoradas”
- “Tenés 1 vehículo listo para entregar”

### Timeline público del cliente

Seguimiento visual estilo delivery/logística.

El cliente no ingresa a la plataforma.

Accede mediante link público.

### Dictado por voz

Uso de Web Speech API mock.

Orientado a:

- Diagnóstico
- Observaciones
- Descripción de trabajos

### Interconexión operativa

Toda la información se reutiliza automáticamente.

---

# 5. Branding e Identidad Visual

## Paleta Principal

### Primarios

| Color | Hex | Uso |
|---|---|---|
| Azul MECANIX | #113d87 | Headers, acciones principales |
| Azul oscuro | #0a2657 | Hover, profundidad |
| Azul claro | #e6ecf7 | Fondos suaves |
| Naranja MECANIX | #ee6a28 | CTA principales |
| Naranja oscuro | #c5541a | Hover CTA |
| Naranja claro | #fde8dc | Alertas suaves |

### Neutros

| Color | Hex | Uso |
|---|---|---|
| Gris 900 | #1e1e1e | Texto principal |
| Gris 700 | #4a4a4a | Texto secundario |
| Gris 500 | #8b8b8b | Placeholders |
| Gris 300 | #d4d4d4 | Bordes |
| Gris 100 | #f5f5f5 | Fondos |
| Gris 50 | #fafafa | Fondo general |
| Blanco | #ffffff | Cards y superficies |

### Estados Semánticos

| Estado | Color | Fondo |
|---|---|---|
| Éxito | #16a34a | #dcfce7 |
| Atención | #ea580c | #fed7aa |
| Error | #dc2626 | #fee2e2 |
| Info | #113d87 | #e6ecf7 |
| Neutro | #64748b | #f1f5f9 |

---

# 6. Tipografía

## Familia Tipográfica

Montserrat

## Jerarquía

| Uso | Peso |
|---|---|
| Títulos principales | Bold |
| Subtítulos | Semibold |
| Labels y botones | Medium |
| Texto general | Regular |

## Escala Mobile

| Nivel | Tamaño |
|---|---|
| Display | 28 / 32 |
| H1 | 22 / 28 |
| H2 | 18 / 24 |
| H3 | 16 / 22 |
| Body | 14 / 20 |
| Small | 12 / 16 |
| Micro | 11 / 14 |

---

# 7. Arquitectura General de Plataforma

| Capa | Función |
|---|---|
| Frontend Responsive | Interfaz visual |
| Backend SaaS | Lógica operativa |
| Base de Datos Central | Clientes y operación |
| Storage externo | Fotos y videos |
| Integraciones | WhatsApp, pagos, AFIP |
| IA operativa | Asistencia contextual |
| Analytics | Métricas y dashboards |

---

# 8. Navegación General del MVP

## Estructura Principal

| Sección | Función |
|---|---|
| Inicio | Dashboard operativo |
| Agenda | Turnos y calendario |
| CRM | Clientes y vehículos |
| Operaciones | Diagnóstico, presupuesto y OT |
| Configuración | Usuarios y personalización |

## Navegación Mobile

La navegación principal mobile debe utilizar:

- Bottom navigation
- Íconos simples
- Labels cortos
- Acciones rápidas flotantes
- Jerarquía clara

## Navegación Desktop

- Sidebar lateral
- Cards operativas
- Layout responsive adaptado
- Mantener lógica mobile

---

# 9. Flujo Operativo Principal

## Flujo Base

Agenda → Cliente → Vehículo → Peritaje → Diagnóstico → Presupuesto → Aprobación → Orden de Trabajo → Seguimiento → Entrega

## Principios del Flujo

- Toda la información se reutiliza
- No deben existir cargas duplicadas
- El usuario puede crear entidades desde cualquier módulo
- El flujo no es completamente lineal

Ejemplo:

- Desde agenda se puede crear cliente
- Desde vehículo se puede iniciar peritaje
- Desde diagnóstico se crea presupuesto
- Desde presupuesto se genera OT

---

# 10. Pantallas Principales del MVP

# 10.1 Pantalla Login

## Objetivo

Permitir acceso rápido y claro.

## Componentes

- Logo MECANIX
- Nombre del taller
- Campo usuario
- Campo contraseña
- CTA “Ingresar”
- Recuperar contraseña
- Soporte

## Consideraciones Visuales

- Fondo limpio
- Branding fuerte
- Alto contraste
- CTA azul principal
- Inputs grandes
- Espaciado cómodo

---

# 10.2 Dashboard / Inicio

## Objetivo

Mostrar resumen operativo inmediato.

## Prioridad UX

Debe ser la pantalla más impactante del MVP.

## Componentes

### Header

- Nombre del taller
- Saludo contextual
- Fecha
- Notificaciones

### Cards Resumen

- Turnos hoy
- Presupuestos pendientes
- OT activas
- Clientes activos

### Alertas Contextuales

Ejemplos:

- “Tenés 3 presupuestos por vencer”
- “1 OT está demorada”
- “2 vehículos listos para entregar”

### Acciones rápidas

- Nuevo cliente
- Nuevo presupuesto
- Nuevo turno
- Nueva OT

### Actividad reciente

- Últimos vehículos ingresados
- Últimos presupuestos
- OT recientes

### Agenda rápida del día

- Hora
- Cliente
- Vehículo
- Estado

## Formato Visual

- Cards grandes
- Bordes suaves
- Íconos simples
- Espaciado amplio
- Información resumida

---

# 10.3 Agenda

## Objetivo

Gestionar turnos y flujo diario.

## Componentes

### Vista calendario

- Día
- Semana
- Agenda vertical mobile

### Tarjetas de turno

Información:

- Hora
- Cliente
- Vehículo
- Tipo de trabajo
- Estado
- Duración estimada

### Estados

- Agendado
- Confirmado
- Pendiente
- Cancelado
- Vencido
- Finalizado

### Acciones rápidas

- Confirmar
- Reprogramar
- Crear cliente
- Crear presupuesto
- Crear OT

## Colores

Identificación visual por estado.

---

# 10.4 CRM — Clientes

## Objetivo

Centralizar información del cliente.

## Vista principal

Listado tipo cards.

## Información visible

- Nombre
- Teléfono
- Vehículos asociados
- Última visita
- Estado de cuenta

## Acciones rápidas

- Llamar
- WhatsApp
- Ver vehículos
- Crear presupuesto
- Crear OT

## Ficha Cliente

### Información

- Datos personales
- Dirección
- CUIT
- Etiquetas
- Origen
- Historial
- Deuda pendiente

### Relacionados

- Vehículos
- Presupuestos
- OT
- Pagos

---

# 10.5 CRM — Vehículos

## Objetivo

Centralizar historial técnico.

## Información Principal

- Marca
- Modelo
- Versión
- Año
- Patente
- Kilometraje

## Componentes

### Historial

- Diagnósticos
- Presupuestos
- OT
- Fotos

### Checklist de ingreso

- Combustible
- Llaves
- Daños visibles
- Objetos dentro del vehículo

### Acciones

- Crear diagnóstico
- Crear presupuesto
- Crear OT

---

# 10.6 Peritaje y Diagnóstico

## Objetivo

Registrar inspección técnica del vehículo.

## Prioridad MVP

Pantalla crítica del producto.

## Componentes

### Información superior

- Cliente
- Vehículo
- Patente
- Fecha

### Checklist técnico

Configurado según rubro.

Ejemplo:

- Frenos
- Suspensión
- Aceite
- Neumáticos
- Luces

### Diagnóstico

- Campo texto amplio
- Dictado por voz
- Observaciones

### Registro visual

- Fotos
- Captura cámara

### Acciones

- Guardar
- Crear presupuesto
- Compartir

## UX esperada

- Operación rápida
- Inputs grandes
- Scroll simple
- Muy usable desde celular

---

# 10.7 Presupuesto Interactivo

## Objetivo

Generar cotización profesional y aprobable.

## Prioridad MVP

Pantalla estratégica.

## Componentes

### Encabezado

- Cliente
- Vehículo
- Fecha
- Estado

### Ítems

- Trabajo
- Mano de obra
- Repuestos
- Materiales
- Subtotales
- Total

### Funciones

- Agregar ítem
- Editar
- Compartir
- Exportar PDF
- Aprobar
- Rechazar
- Convertir en OT

### Automatizaciones Mock

- Recordatorio de vencimiento
- Link de pago
- Cambio automático de estado

### Estados

- Borrador
- Enviado
- Pendiente
- Aprobado
- Rechazado
- Vencido

## Visual

- Muy limpio
- Jerarquía fuerte del total
- CTA destacado en naranja

---

# 10.8 Orden de Trabajo (OT)

## Objetivo

Centralizar toda la operación.

## Concepto

Documento operativo central.

## Componentes

### Información General

- Cliente
- Vehículo
- Técnico asignado
- Fecha
- Estado

### Estados

- Pendiente
- Programada
- En curso
- Pausada
- Finalizada
- Entregada
- Cancelada

### Checklist

- Tareas realizadas
- Observaciones
- Fotos
- Horas

### Materiales y repuestos

- Listado
- Cantidad
- Costo

### Seguimiento

- Timeline interno
- Registro histórico

### Acciones

- Cambiar estado
- Asignar técnico
- Agregar observación
- Compartir seguimiento
- Finalizar

---

# 10.9 Tablero Kanban OT

## Objetivo

Visualizar carga operativa.

## Columnas

- Pendientes
- Programadas
- En curso
- Finalizadas
- Entregadas

## Tarjetas

Información:

- Cliente
- Vehículo
- Patente
- Técnico
- Prioridad
- Tiempo estimado

## UX

- Scroll horizontal mobile
- Drag and drop mock
- Colores por prioridad

---

# 10.10 Timeline Cliente

## Objetivo

Permitir seguimiento simple al cliente.

## Acceso

Mediante link público.

Sin login.

## Inspiración

Tracking tipo Pedidos Ya / Mercado Libre.

## Componentes

### Estado actual

Ejemplo:

“Tu vehículo está en reparación”

### Timeline

- Vehículo recibido
- Diagnóstico realizado
- Presupuesto enviado
- Trabajo en curso
- Trabajo finalizado
- Listo para entregar

### Información adicional

- Fotos
- Observaciones
- Fecha estimada

## Objetivo UX

Generar confianza.

---

# 10.11 Configuración

## Objetivo

Personalizar el taller y gestionar accesos.

## Secciones

### Taller

- Nombre
- Logo
- Colores
- Rubro

### Usuarios

- Alta
- Roles
- Permisos

### Servicios

- Tipos de trabajo
- Categorías
- Checklist

### Automatizaciones

- Recordatorios
- Alertas
- WhatsApp

---

# 11. Onboarding

## Objetivo

Reducir fricción inicial.

## Formato

- Wizard guiado
- Checklist visual
- Barra de progreso
- Pasos simples

## Flujo

1. Bienvenida
2. Configuración taller
3. Usuarios
4. Rubro
5. Servicios
6. Primer cliente
7. Primer diagnóstico
8. Primer presupuesto
9. Primera OT
10. Finalización

---

# 12. Sistema de Estados

## Turnos

- Agendado
- Confirmado
- Pendiente
- Cancelado
- Vencido
- Finalizado

## Presupuestos

- Borrador
- Enviado
- Pendiente vigente
- Pendiente vencido
- Aprobado
- Rechazado

## OT

- Pendiente
- Programada
- En curso
- Pausada
- Finalizada
- Entregada
- Cancelada

## Pagos

- Pendiente
- Parcial
- Pagado
- Vencido

---

# 13. Datos Mock Recomendados

## Vehículos

Marcas frecuentes Argentina:

- Volkswagen
- Toyota
- Ford
- Renault
- Peugeot
- Fiat
- Chevrolet

## Ejemplos

- Toyota Hilux
- VW Gol Trend
- Ford Ranger
- Renault Kangoo
- Peugeot 208
- Fiat Cronos

## Patentes

Formato Mercosur.

Ejemplo:

- AE123FG
- AF455TR

## Clientes

Nombres argentinos reales.

Ejemplo:

- Carlos Fernández
- Juan Rodríguez
- Mariano López
- Lucas Gómez

---

# 14. Componentes UI Recurrentes

## Cards

- Bordes suaves
- Fondo blanco
- Shadow leve
- Padding amplio

## Botones

- Altura mínima táctil 44px
- Primario azul
- CTA naranja
- Íconos simples

## Inputs

- Grandes
- Labels visibles
- Buen contraste

## Alertas

- Ícono
- Estado visual
- Texto corto

---

# 15. Responsividad

## Mobile

Resolución principal.

Diseño prioritario.

## Tablet

Adaptación intermedia.

## Desktop

Sidebar lateral.

Mayor densidad de información.

---

# 16. Interacciones Clave del Prototipo

## Deben sentirse reales

- Navegación entre módulos
- Cambio de estados
- Cards clickeables
- Tabs
- Modales
- Timeline
- Botones rápidos
- Dropdowns
- Checklist
- Kanban mock

---

# 17. Priorización Visual del MVP

## Máxima prioridad

1. Dashboard
2. Peritaje
3. Presupuesto
4. Timeline cliente
5. OT

## Prioridad media

- CRM
- Agenda
- Configuración

## Baja prioridad

- Reportes avanzados
- Administración completa
- Inventario avanzado

---

# 18. Consideraciones Estratégicas para el Prototipo

El prototipo debe transmitir:

- Profesionalización
- Simplicidad
- Rapidez
- Orden operativo
- Confianza
- Modernización del taller

La experiencia visual debe sentirse:

- Moderna
- Clara
- Operativa
- Accesible
- Simple
- Con foco mobile

El sistema no debe parecer:

- Corporativo
- Complejo
- Administrativo pesado
- Técnico en exceso

---

# 19. Inconsistencias y Puntos a Alinear

## 1. Alcance del MVP vs navegación general

En algunos apartados aparecen:

- Administración
- Reportes
- Inventario
- Comunicación

Pero el MVP STARTER solo incluye:

- Configuración
- Operaciones

Recomendación:

Mantener esos módulos fuera del flujo principal del prototipo o mostrarlos como “Próximamente”.

---

## 2. Facturación AFIP/ARCA

La integración aparece en arquitectura general, pero pertenece al plan Profesional.

No debería mostrarse funcionalmente en el MVP.

---

## 3. Automatizaciones avanzadas

Algunas automatizaciones descriptas corresponden más a versiones futuras.

En MVP deberían mostrarse como:

- estados mock
- alertas visuales
- triggers simulados

No como lógica compleja.

---

## 4. Inventario

El módulo inventario aparece varias veces integrado en OT.

Como el MVP STARTER no lo incluye:

- puede mostrarse simplificado
- o directamente omitirse

---

## 5. Administración financiera

Caja, gastos y facturación aparecen mezclados en ciertos flujos.

No deberían ser centrales dentro del MVP.

---

## 6. IA Operativa

Actualmente está correctamente planteada como asistencia contextual.

Es importante evitar mostrar IA generativa compleja porque no forma parte del MVP.

---

# 20. Conclusión Estratégica

El MVP MECANIX debe enfocarse en demostrar:

- Flujo operativo real
- UX mobile superior
- Simplicidad de adopción
- Profesionalización del taller
- Centralización operativa
- Experiencia visual moderna

El éxito del prototipo dependerá principalmente de:

- Claridad visual
- Velocidad de navegación percibida
- Fluidez entre módulos
- Coherencia operativa
- Calidad visual mobile-first
- Realismo de los datos mock
- Sensación de producto listo para usar

