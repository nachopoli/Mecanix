# Memoria General

Información General

La plataforma MECANIX, es cloud, totalmente responsive para todos los dispositivos (desktop, mobile, tablet). Opera en habla hispana 100%, aunque haya palabras clave en idioma inglés.

Desde cualquier sección interrelacionada se puede crear un cliente, vehículo, orden de trabajo. Por ejemplo, si me encuentro en la agenda y quiero agregar un turno, pero no tengo cargado el cliente, podría crearlo a partir de una conexión con la función de creación de cliente y así con cada caso, órdenes de trabajo, vehículos, etc.  
Puede también desde vehículo crear un peritaje con su diagnóstico, que quede grabado en el historial dentro de la base de datos de vehículos. También podría a partir del peritaje y diagnóstico, realizar un presupuesto que luego se convierte en orden de trabajo.  
Los vehículos estarán cargados por default en una base de datos dentro de la plataforma, para que la navegación sea intuitiva y sencilla, aportando la información de forma predictiva (marca, modelo, versión).

La plataforma tiene la opción de dictado por voz activa con transcripcion a texto para peritaje y diagnóstico, presupuesto y orden de trabajo.

La función de peritaje y diagnostico tiene un check list pre seteado, para marcar los puntos o los trabajos a realizar, esto estará cargado según el tipo de negocio que utilice la plataforma (puede ser mecánico, chapa y pintura etc). Esto tambien funciona como punto de inspeccion de ingreso /egreso de unidad pudiendo elegir si hacerlo o no al momento de recepcionar o entregar la unidad.

El presupuesto contiene la información del vehículo, del cliente, fecha hora y lugar de realización, describe el estado de la unidad y el detalle del peritaje con su respectivo diagnóstico, los trabajos a realizar, la duración estimada, la valorización en mano de obra, repuestos y materiales. 

Toda la información que ya fue completada manualmente no debe volver a ingresar, debe estar interconectada.

La plataforma relaciona la información: 

* El cliente puede tener múltiples vehículos.  
* El vehículo puede tener múltiples OT, diagnósticos, presupuestos, fotos.


Orden de Trabajo se conecta con técnico asignado presupuesto con su peritaje y diagnóstico, pagos, checklist, estado, imágenes.

Si el vehículo lo trajo otra persona se marca una casilla, aparecen dos campos adicionales para escribir el nombre y teléfono de quien trajo el vehículo. Esto es útil cuando no es el dueño quien lo trae al taller.

La plataforma prevee turnos con espacios para realizar peritaje y diagnostico.  
Las ordenes de trabajo son operativos y no influyen en la agenda de turnos para el cliente, aunque la agenda debe prever la recepción y entrega de la unidad.

Los clientes o prospectos no acceden a la plataforma, solo pueden realizar seguimiento a partir de hipervínculo html donde se muestra la información de la OT, en formato simple, según sus etapas, al estilo de información de envío en formato timeline.   
Además los clientes a través del presupuesto interactivo, pueden acceder al vínculo para pagar directamente desde ahí por medio de un botón.

En primera instancia la plataforma no será multi sucursal, puede serlo mas adelante (+3 años).

El inventario dentro de la plataforma es simple y basico, para registrar segun el rubro.

Facturación nace desde a partir de la Orden de trabajo, aunque pueden agregarse items en caso de ajuste manual.

La integración con Whatsapp es solo de automatización, a través de botones poder enviar hipervinculos con presupuesto interactivo, seguimiento de órdenes, recordatorios, etc.

Al iniciar la operacion en la plataforma por primera vez, durante la fase de configuracion inicial, el modo de uso:

Modos preconfigurados.

* Mecánica general  
* Chapa y pintura  
* Estética vehicular  
* Lubricentro  
* Electricidad  
* Neumáticos  
* Otro (Configuracion manual, asistida)

Navegación

| Inicio / Dashboard | Resumen operativo \+ acceso rápido de funciones |
| :---- | :---- |
| Agenda | Turnos y flujo diario |
| CRM | Clientes y vehículos |
| Operaciones | OT, diagnóstico, checklist |
| Administración | Pagos, caja, gastos, compras |
| Comunicación | WhatsApp, seguimiento |
| Reportes | Métricas |
| Inventarios | Stock  |
| Configuración | Usuarios y taller |

Estado Comercial	Estado Financiero  
Pendiente (Sin pago)  
Aprobado (Pagado)  
Rechazado (No aceptado)  
Vencido Deuda

| Rol | Descripción | Principales Atributos y Permisos | Nivel de Acceso |
| :---- | ----- | ----- | ----- |
| Administrador | Responsable general del taller y la configuración del sistema. Normalmente propietario o gerente. | Acceso total al sistema, gestión de usuarios, configuración del taller, reportes financieros, dashboards, facturación, administración, métricas, permisos, integraciones y configuración general. | Total |
| Supervisor | Responsable operativo del flujo de trabajos y control de calidad. | Supervisión de órdenes de trabajo, asignación de tareas, control de tiempos, validación de diagnósticos, revisión de checklist, seguimiento de productividad y estado general del taller. | Alto |
| Administrativo | Encargado de atención al cliente y gestión operativa diaria. | Gestión de agenda y turnos, creación de presupuestos, carga de clientes y vehículos, seguimiento de órdenes de trabajo, facturación básica, registro de pagos, comunicación con clientes y gestión documental. | Medio |
| Operario | Mecánicos, chapistas, detailers o especialistas técnicos que ejecutan trabajos. | Perita y Diagnostica la unidad. Visualización y actualización de órdenes de trabajo, checklist, carga de observaciones técnicas, registro fotográfico, carga de horas y estado de tareas. Sin acceso financiero ni administrativo. | Bajo |

Esquema de Base de datos:

* Clientes \- Datos cliente  
  * Vehículos (datos de unidad a trabajar, según info descrita en módulos)  
  * Agenda de turnos (info segun modulo: fecha, hora, duración del trabajo, tipo de trabajo, estado)  
  * Presupuestos \- Cotizaciones y estado de cada una  
  * Vehículos precargados (marca, modelo, versión, motorización y demás información relevante)  
  * Orden de Trabajo (informacion segun modulo, estado)  
  * Registro Visual (fotos y videos) \- Integración con Drive o repositorio de preferencia del cliente  
  * Registro contable (facturación, gastos, pagos y cobros)  
  * Inventario (proveedores, stock, codigo de item, y demás información relevante)  
    

Arquitectura General:

| Capa | Función |
| ----- | ----- |
| Frontend Web Responsive | Interfaz visual del usuario |
| Backend SaaS | Lógica operativa y automatizaciones |
| Base de Datos Central | Clientes, Vehículos, Agenda de turnos, Presupuestos, Vehículos precargados, ordenes de trabajo, registro contable, inventario |
| Integración Storage Externo | Repositorio de almacenamiento de Fotos, videos y archivos pesados |
| Integraciones | WhatsApp, Mail, pagos, AFIP |
| Motor IA Operativa | Asistente y automatizaciones |
| Panel Analytics | Métricas y dashboards |

## MEMORIA DESCRIPTIVA DEL PROYECTO MECANIX

La plataforma contempla inicialmente:

* Talleres mecánicos.  
* Talleres de chapa y pintura.  
* Estética vehicular.  
* Lubricentros.  
* Electricidad automotriz.  
* Neumáticos.  
* Especialistas técnicos.

El proyecto opera bajo un modelo SaaS B2B de suscripción mensual.

---

## Propuesta de Valor

MECANIX brinda a talleres automotrices independientes una plataforma digital simple, accesible y especializada que permite:

* Organizar la operación diaria.  
* Automatizar procesos clave.  
* Mejorar la atención y experiencia del cliente.  
* Centralizar información operativa.  
* Profesionalizar la gestión.  
* Reducir pérdidas de tiempo y desorden administrativo.  
* Generar trazabilidad y transparencia.

La solución integra:

* Gestión operativa.  
* Seguimiento visual de trabajos.  
* Automatización.  
* Comunicación con clientes.  
* Administración básica.  
* Herramientas de productividad.  
* Ecosistema de alianzas estratégicas.

El objetivo es que el taller recupere tiempo operativo y pueda enfocarse en el crecimiento del negocio.

---

## Visión del Negocio

Convertirse en la plataforma de referencia para talleres automotrices independientes en Argentina y América Latina, impulsando la profesionalización y transformación digital del sector mediante tecnología intuitiva, automatización operativa y una red de alianzas estratégicas que conecten a los talleres con nuevas oportunidades de crecimiento, financiamiento, capacitación y desarrollo comercial.

La visión del proyecto es liderar un nuevo estándar de gestión automotriz, donde la transparencia, la eficiencia y la confianza formen parte natural de la relación entre el taller y el cliente final.

---

## Modelo de Negocio

Modelo SaaS B2B por suscripción mensual en dólares.

Modalidad:

* Suscripción mensual.  
* Sin permanencia obligatoria.  
* Modalidad de Contratación híbrida.  
  * Demo inicial en vivo.  
  * Prueba gratuita de 7 a 14 días.  
* Onboarding autogestionado asistido.

---

## Diagnóstico del Mercado

El sector automotriz independiente presenta:

* Baja digitalización.  
* Operaciones manuales.  
* Procesos desorganizados.  
* Escasa trazabilidad.  
* Comunicación informal.  
* Poca integración tecnológica.  
* Desconfianza histórica del consumidor.

Gran parte de los talleres opera mediante:

* Cuaderno y lapicera.  
* WhatsApp informal.  
* Presupuestos manuales.  
* Falta de historial.  
* Sin métricas.  
* Sin automatización.  
* Sin seguimiento profesional.

MECANIX busca cubrir ese vacío.

---

## Cliente Objetivo

### Perfil Principal

Talleres automotrices independientes.

Características:

* Entre 2 y 15 empleados.  
* Baja digitalización.  
* Operación desorganizada.  
* Dependencia operativa del dueño.  
* Crecimiento potencial.  
* Necesidad de profesionalización.

### Dolor Principal

* Pérdida de tiempo.  
* Mala organización.  
* Falta de control.  
* Desorden administrativo.  
* Mala experiencia del cliente.  
* Falta de seguimiento.  
* Pérdida de ventas.

### Necesidades

* Organización.  
* Control.  
* Comunicación.  
* Automatización.  
* Seguimiento.  
* Profesionalización.  
* Escalabilidad.

---

## Benchmark Competitivo

Competidores analizados:

* Vehix.  
* Servitech.  
* Mi Taller.  
* AppliCAR.  
* AppTaller.

Conclusiones:

Fortalezas observadas:

* Cloud.  
* Facturación.  
* Gestión básica.  
* Agenda.  
* Presupuestos.

Debilidades detectadas:

* UX anticuada.  
* Baja experiencia mobile.  
* Escasa automatización.  
* Mala experiencia onboarding.  
* Poca trazabilidad visual.  
* Comunicación limitada.  
* Sistemas complejos.  
* Poco enfoque operativo.

Diferenciación estratégica de MECANIX:

“Plataforma cloud mobile-first orientada a la operación real del taller, integrando trazabilidad visual, automatización y experiencia simple de uso.”

## ---

 **Arquitectura General**

### Modelo Tecnológico

* Cloud SaaS.  
* Responsive.  
* Mobile-first.  
* Multi dispositivo.  
* Navegación simplificada.  
* Escalable.

### Arquitectura General

| Capa | Función |
| ----- | ----- |
| Frontend Responsive | Interfaz visual del usuario |
| Backend SaaS | Lógica operativa y automatizaciones |
| Base de Datos Central | Información operativa |
| Integración Storage Externo | Fotos, videos y archivos |
| Integraciones | WhatsApp, Mail, pagos, ARCA |
| Motor IA Operativa | Asistente y automatizaciones |
| Analytics | Dashboards y métricas |

---

## Estructura General de Plataforma

### Navegación Principal

* Inicio / Dashboard.  
* Agenda.  
* CRM.  
* Operaciones.  
* Administración.  
* Comunicación.  
* Reportes.  
* Inventarios.  
* Configuración.

### Principio Operativo

Toda la información se encuentra interconectada.

Ejemplo:

* Desde Agenda se puede crear cliente.  
* Desde vehículo se puede crear diagnóstico.  
* Desde diagnóstico se genera presupuesto.  
* Desde presupuesto se genera OT.  
* Desde OT se generan pagos y facturación.

La información no debe volver a cargarse manualmente.

---

## Estados Operativos

### Turnos

* Agendado.  
* Confirmado.  
* Pendiente.  
* Cancelado.  
* Vencido.  
* Finalizado.

### Presupuestos

* Borrador.  
* Enviado.  
* Pendiente Vigente.  
* Pendiente Vencido.  
* Aprobado.  
* Rechazado.

### Ordenes de Trabajo

* Pendiente.  
* Programada.  
* En curso.  
* Pausada.  
* Finalizada.  
* Entregada.  
* Cancelada.

### Pagos

* Pendiente.  
* Parcial.  
* Pagado.  
* Vencido.

---

## Customer Success y Soporte

### Canales

* Chatbot.  
* Tickets.  
* WhatsApp.  
* Mail.  
* Llamada.

### Horarios

* Equipo humano horario comercial.  
* Bot 24/7.

---

## KPIs del Negocio

### Financieros

* MRR.  
* CAC.  
* CPL.  
* Churn.  
* Conversión.

## Producto

* Usuarios activos.  
* Frecuencia de uso.  
* Tiempo en plataforma.  
* Módulos utilizados.  
* OT creadas.

## Satisfacción

* NPS.  
* Reclamos.  
* Tiempo de resolución.

---

## Consideraciones Técnicas Estratégicas

### Decisiones Correctas del Proyecto

* Mobile-first.  
* UX simplificada.  
* Vertical SaaS.  
* Cloud.  
* Onboarding guiado.  
* Automatización.  
* Interconexión operativa.

## Conclusión General

MECANIX se posiciona como una solución SaaS vertical especializada para talleres automotrices independientes, enfocada en resolver problemas operativos reales mediante digitalización, automatización y trazabilidad.

El proyecto presenta:

* Diferenciación clara.  
* Mercado amplio.  
* Baja madurez tecnológica del sector.  
* Necesidad evidente.  
* Potencial de escalabilidad.

La principal ventaja competitiva se encuentra en:

* Simplicidad.  
* Experiencia mobile.  
* Flujo operativo real.  
* Comunicación integrada.  
* Automatización.  
* Trazabilidad visual.  
* Especialización vertical.

El éxito del proyecto dependerá principalmente de:

* La facilidad de adopción.  
* La simplicidad del onboarding.  
* La velocidad operativa.  
* La estabilidad técnica.  
* La percepción de valor inmediato para el taller.  
* La capacidad de generar confianza y profesionalización en un mercado históricamente analógico.

# 💲 Modelo de suscripcion

# STARTER — USD 55 \- Hasta 3 usuarios

## MVP

## Objetivo

Capturar talleres tradicionales con baja digitalización.  
Operación Básica

## Perfil

Talleres pequeños 2 a 5 empleados  
Primera adopción SaaS (Early adopters)  
Clase media (entrada)

## Funcionalidades

**Módulo Operaciones**

* CRM   
* Peritaje y diagnóstico  
* Presupuesto   
* Orden de Trabajo  
* Agenda de turnos


**Módulo Configuración y Personalización**

* Configuración inicial  
* Roles  
* Personalización básica  
* Asistente Operativo  
  * Onboarding  
  * Soporte

# PROFESIONAL — USD 95 \- Hasta 5 usuarios

## Objetivo

Profesionalizar talleres en crecimiento.

## Perfil

5 a 10 empleados  
mayor volumen operativo y necesidad administrativa

## Funcionalidades

**Incluye Starter \+**

**Módulo Administración**

* Facturación electrónica  
* Registro de pagos  
* Caja básica  
* Gestión de gastos

**Módulo Inventario**

* Creación, modificación, alta baja de productos repuestos y materiales a fines del rubro.  
* Configuración de punto de quiebre de stock  
* Carga masiva o manual  
* Packs de reparacion / instalacion  
* Actualización automática según repuestos y materiales imputados en OT.

# 

# PREMIUM — USD 135 \- Hasta 10 usuarios

## Objetivo

Escalar y automatizar.

## Perfil

Talleres medianos, multiárea, alto flujo operativo automatizable.

## Funcionalidades

**Incluye Profesional \+**

**Módulo Reportes**

* Dashboard negocio  
* Métricas atención y contacto, etc  
* Reportes avanzado  
* Indicadores financieros

**Módulo Insurance**

* Comunicación triangular aseguradora-cliente-taller  
* Inspección digital  
* Trazabilidad documental  
* Presupuesto formal  
* Informes de inspección validados

# 📝 Memoria descriptiva MVP

# MEMORIA DESCRIPTIVA MVP 

## Descripción General del Proyecto

MECANIX es una plataforma SaaS cloud-first orientada a la digitalización operativa de talleres automotrices independientes y pequeños centros de servicios automotores.

La solución está diseñada para operar de manera totalmente responsive en dispositivos mobile, tablet y desktop, priorizando una experiencia mobile-first adaptada al contexto operativo real del taller.

El sistema busca centralizar y automatizar los procesos operativos, administrativos y de comunicación del negocio mediante una plataforma simple, intuitiva y especializada en el sector automotor.

El enfoque principal del MVP se orienta a talleres mecánicos, chapa y pintura y servicios automotrices de baja o media complejidad operativa, con estructuras de entre 2 y 15 empleados.

La plataforma opera completamente en idioma español.

Es una plataforma digital simple, accesible y especializada que permita organizar la operación diaria, automatizar procesos clave y mejorar la experiencia del cliente mediante trazabilidad, comunicación y control operativo en tiempo real.

El core de la solución es el módulo de operaciones, donde se puede digitalizar la operacion diaria de punta a punta. 

La solución fue diseñada específicamente para talleres con baja adopción tecnológica y estructuras operativas reducidas, permitiendo centralizar la operación diaria, automatizar procesos y mejorar la experiencia del cliente final mediante herramientas simples, intuitivas y adaptadas al funcionamiento real del rubro.

El proyecto nace a partir de una problemática estructural del mercado automotriz latinoamericano: la gran mayoría de talleres continúa operando mediante procesos manuales, registros en papel, comunicación informal y escasa trazabilidad operativa.

MECANIX busca transformar esa operación tradicional en un modelo digital, ordenado y escalable.

---

El MVP tiene como objetivo validar:

* adopción digital del taller tradicional,  
* uso operativo diario,  
* trazabilidad del trabajo,  
* mejora en comunicación con clientes,  
* organización de órdenes de trabajo,  
* automatización básica,  
* profesionalización de procesos,  
* y recurrencia del modelo SaaS.

El alcance funcional del MVP corresponde al modelo de suscripción STARTER.

(Modulo operaciones, configuracion)

---

## Modelo Operativo de Plataforma

La plataforma se estructura bajo un modelo cloud responsive.

Toda la información operativa se encuentra interrelacionada.

Desde cualquier módulo relacionado el usuario puede crear:

* clientes,  
* vehículos,  
* presupuestos,  
* diagnósticos,  
* órdenes de trabajo,  
* pagos,  
* registros.

El objetivo es evitar duplicación manual de información y reducir fricción operativa.

Ejemplo:

* desde Agenda puede crearse un nuevo cliente,  
* desde Vehículo puede iniciarse un peritaje,  
* desde Peritaje puede generarse un presupuesto,  
* desde Presupuesto puede generarse una Orden de Trabajo.

Toda la información previamente cargada se reutiliza automáticamente dentro de la plataforma.

---

## Arquitectura General de Plataforma

| Capa | Función |
| ----- | ----- |
| Frontend Responsive | Interfaz visual mobile-first |
| Backend SaaS | Lógica operativa y automatizaciones |
| Base de Datos Central | Operación, clientes, vehículos y registros |
| Storage Externo | Fotos, videos y archivos pesados |
| Integraciones | WhatsApp, Mail, pagos, AFIP/ARCA |
| Motor IA Operativa | Onboarding y asistencia contextual |
| Analytics | Métricas y dashboards |

---

## Navegación General

La navegación se diseña priorizando simplicidad operativa.

La estructura principal del MVP contempla:

| Sección | Función |
| :---- | :---- |
| Inicio / Dashboard | Resumen operativo y accesos rápidos |
| Agenda | Gestión de turnos y calendario |
| CRM | Clientes y vehículos |
| Operaciones | Diagnóstico, presupuesto y OT |
| Administración | Pagos, caja y gastos |
| Comunicación | WhatsApp y seguimiento |
| Reportes | Métricas operativas |
| Inventario | Stock básico y materiales |
| Configuración | Usuarios y parámetros del taller |

La navegación mobile utilizará estructura optimizada para pantallas reducidas y acceso rápido.

La versión desktop adapta la estructura responsive manteniendo la misma lógica operativa.

---

## Configuración Inicial y Onboarding

El onboarding será autogestionado y guiado mediante un asistente operativo.

La configuración inicial tendrá formato visual, breve y guiado mediante:

* barra de progreso,  
* checklist de implementación,  
* pasos secuenciales,  
* ayuda contextual.

El flujo inicial contempla:

1. Bienvenida  
2. Navegación general  
3. Configuración básica del taller  
4. Configuración de usuarios  
5. Rubro y servicios  
6. Agenda  
7. Primer cliente  
8. Primer diagnóstico  
9. Primer presupuesto  
10. Primera Orden de Trabajo  
11. Finalización

La plataforma contempla rubros preconfigurados:

* Mecánica general  
* Chapa y pintura  
* Estética vehicular  
* Lubricentro  
* Electricidad  
* Neumáticos  
* Otro (configuración manual)

Cada rubro configura:

* checklist,  
* categorías,  
* servicios,  
* tipos de verificaciones,  
* estructuras operativas.

---

## Roles y Permisos

### Administrador

Responsable general del taller y configuración completa de plataforma.

Permisos:

* acceso total,  
* usuarios,  
* configuración,  
* métricas,  
* administración,  
* reportes,  
* integraciones,  
* suscripción.

Nivel de acceso: Total.

---

### Supervisor

Responsable operativo y control de calidad.

Permisos:

* supervisión de OT,  
* validación de trabajos,  
* métricas operativas,  
* seguimiento,  
* visualización financiera,  
* productividad,  
* asignación.

No posee permisos de administración de plataforma.

Nivel de acceso: Alto.

---

### Administrativo

Responsable de atención y gestión operativa.

Permisos:

* agenda,  
* clientes,  
* presupuestos,  
* seguimiento,  
* pagos,  
* comunicación,  
* facturación básica,  
* carga documental.

Nivel de acceso: Medio.

---

### Operario

Responsable técnico de ejecución.

Permisos:

* diagnóstico,  
* checklist,  
* observaciones,  
* carga fotográfica,  
* horas,  
* actualización de estados.

Sin acceso financiero.

Nivel de acceso: Bajo.

---

## Estructura de Base de Datos

La base de datos central contempla las siguientes entidades:

| Entidad | Función |
| :---- | :---- |
| Clientes | Información de clientes |
| Vehículos | Información técnica y operativa |
| Agenda | Gestión de turnos |
| Diagnósticos | Peritajes y revisiones |
| Presupuestos | Cotizaciones y estados |
| Órdenes de Trabajo | Núcleo operativo |
| Registro Visual | Fotos y videos |
| Facturación y Pagos | Cobros y comprobantes |
| Gastos | Egresos operativos |
| Inventario | Stock y materiales |
| Usuarios | Accesos y roles |
| Configuración | Parámetros generales |

Relaciones:

* Un cliente puede tener múltiples vehículos.  
* Un vehículo puede tener múltiples diagnósticos, presupuestos y OT.  
* Una OT centraliza pagos, materiales, checklist, imágenes, historial y facturación.  
* Una OT puede tener múltiples comprobantes y pagos asociados.

---

## Autenticación y Acceso (alojado en modulo configuración)

Funciones:

* login,  
* recuperación de contraseña,  
* gestión de usuarios,  
* gestión de roles,  
* acceso seguro,  
* configuración de perfil,  
* gestión de suscripción,  
* soporte.

Configuración:

* nombre del taller,  
* identidad visual,  
* logo,  
* colores,  
* región,  
* impuestos,  
* unidades,  
* automatizaciones.

## Asistente Operativo IA

La IA del MVP se orienta a asistencia operativa.

Funciones:

* onboarding,  
* ayuda contextual,  
* guía paso a paso,  
* preguntas frecuentes,  
* sugerencias,  
* soporte.

El enfoque es de copiloto operativo.

No contempla IA generativa avanzada.

## Integraciones

Integraciones contempladas:

| Integración | Función |
| :---- | :---- |
| WhatsApp | Link de enlace envio mensaje directo |
| Mail | Link de enlace envio directo |
| AFIP/ARCA | Facturación |
| Plataformas de Pago | Links de cobro |
| Google Drive / Storage | Fotos y videos |

Las fotografías y videos se almacenan en repositorios externos, no forman parte de la base de datos integrada.

---

## Flujo Operativo General

El flujo operativo principal del sistema contempla:

Peritaje → Diagnóstico → Presupuesto → Aprobación → Orden de Trabajo → Registro → Seguimiento → Facturación → Cobro → Informe → Recordatorios

El flujo no es estrictamente lineal.

Todos los módulos se encuentran interrelacionados.

---

## Consideraciones Técnicas y Estratégicas

La plataforma prioriza:

* simplicidad,  
* velocidad operativa,  
* baja fricción,  
* adopción rápida,  
* experiencia mobile,  
* automatización básica,  
* trazabilidad.

El objetivo estratégico del MVP es validar:

* adopción del mercado,  
* recurrencia,  
* frecuencia de uso,  
* digitalización operativa,  
* retención,  
* y escalabilidad del modelo SaaS.

# 🌐 Módulos de Plataforma

**Módulos de Plataforma**

1. **Módulo Configuración y Personalización**  
* Asistente de IA Onboarding  
  * Ayuda contextual  
  * Sugerencias  
  * Guia paso a paso  
  * Chat Preguntas Frecuentes  
* Autenticación y Acceso   
  * Nombre del taller e identidad visual (si existiere)  
  * Usuario   
  * Contraseña  
  * Acceder con.  
  * Recuperar contraseña  
  * Soporte  
* Configuración  
  * Perfil  
  * Roles con descripción de atributos  
  * Suscripción  
  * Configuración inicial de Onboarding  
    * Alta   
    * Configuracion basica  
    * Usuarios  
    * Rubro y Servicios (preseteados)  
    * Personalización  
      * Logo, colores, identidad visual del taller  
  * Servicios  
  * Ordenes de trabajo  
  * Tipo de verificaciones de unidad  
  * Etiquetas y tipo de clientes  
  * Activacion de automatizaciones  
  * Configuracion de region (unidades de medida, formato de numeros, impuestos)  
2. **Módulo Operaciones (core)**

El módulo de operaciones contempla dentro de sus funciones: 

* CRM \- Clientes y Vehículos (alta, baja, modificación de clientes, vehículos y demás relacionados. Búsqueda. Contacto rápido)  
  * Cliente  
    * Nombre y Apellido  
    * Contacto (telefono, mail, whats app)  
    * Dirección  
    * Etiqueta y Tipo de Cliente  
    * Razon social / Cuit  
    * Vehiculos asociados  
    * Estado de Cuenta (ordenes y pagos)  
    * Origen del dato (publicidad, visita presencial, referido, meta ads, google ads, evento, etc etc)  
    * Adicionar todos los elementos e información necesaria para la operatoria de plataforma.  
    * Registro básico de contactos con el cliente, presupuestos enviados, ot asociadas, facturación básica.  
    * Avisos de deuda anteriores  
  * Vehiculo  
    * Marca, modelo, versión  
    * Patente / Domino  
    * Historial de reparaciones  
    * Check list de ingreso / egreso (nivel de combustible, llaves, descripción de pertenencias, estado general, etc), con check de unidad (marcado de daños / reparaciones a realizar, trabajos a realizar, etc)  
* Agenda \- Gestión de turnos   
  * Calendario con turnos identificadas por color según tipo de trabajo/prioridad  
  * Estados  
  * Recordatorios con asignación manual  
  * Automatización de recordatorios (suscripción avanzada), turnos sin cerrar, turnos próximos, etc para el taller y para el cliente, dando aviso por whats app o mail.  
  * Recordatorios automáticos (envio link)  
* Peritaje y diagnóstico  
  * Checklist precargado de puntos a revisar o trabajar (según el rubro configurado).  
  * Descripción de trabajo a realizar por dictado de voz.  
  * Captura de imágenes a través de cámara.  
  * Observación interna por dictado de voz.  
  * checklist de unidad (marcado de daños / reparaciones a realizar, trabajos a realizar, etc)  
* Presupuesto Interactivo  
  * Creación de presupuesto ( a partir de diagnostico o desde 0\)  
  * Botones de acciones (compartir, agregar item, avanzar a OT, imprimir PDF, etc).  
  * Incluye fotos del vehiculo registradas en peritaje y diagnostico.  
  * Detalle de ítem de trabajo, valor unitario y valores totales. Opción de desagregar mano de obra de repuestos / materiales.  
  * Presupuesto digital aprobable \+ botón pago online   
  * Automatización envío de presupuesto finalizado  
  * Automatización a orden de trabajo por presupuesto aceptado y/o abonado.   
  * Automatización de registro de turno seleccionado por el cliente post presupuesto aceptado.  
  * Automatización de recordatorio al cliente por presupuesto no definido.  
* Órdenes de trabajo (creación, cierre, asignación, estados, etc)  
  * Tablero kanban (pendientes, programadas, en curso, finalizadas, entregadas)  
  * Calendario con órdenes identificados por tipo de trabajo prioridad con su respectiva duración.   
  * La orden una vez finalizada permite imprimir un informe aclarando la garantía del trabajo.  
  * Estados  
  * Asignación a técnico / operador / equipo.  
  * Automatización de seguimiento y recordatorios de órdenes pendientes de concretar y de pago, órdenes próximas, etc.  
  * Registro de horas.  
  * Registro de materiales/repuestos.  
  * Historial  
  * Estado del trabajo online (seguimiento online para cliente)  
  * La orden de trabajo es el documento central que organiza todo el proceso de reparación de un vehículo en el taller. Es crucial que esta orden incluye todos los detalles necesarios para que el equipo técnico pueda llevar a cabo el trabajo de manera eficiente, y que sirva como un registro claro y transparente para el cliente. Desde el momento en que el cliente aprueba el presupuesto, la orden de trabajo marca el inicio formal de la reparación y es el documento que guiará cada paso del proceso.   
    Durante todo el proceso de reparación, la orden de trabajo se convierte en el documento de referencia para los técnicos y el equipo administrativo. A lo largo del proceso, se pueden agregar notas adicionales, observaciones técnicas, o incluso fotografías del progreso, lo que asegura que todo el trabajo esté registrado adecuadamente. Además, mantener un buen sistema de gestión de las órdenes de trabajo permite que los talleres operen de manera más eficiente y organizada.   
  * Información del cliente: Una orden de trabajo completa debe incluir la información de contacto del cliente, como nombre, teléfono y correo electrónico, para asegurar una comunicación efectiva durante todo el proceso de reparación. Esto permite que el taller pueda contactar rápidamente al cliente en caso de actualizaciones o problemas imprevistos.  
  * Datos del vehículo: Es fundamental que la orden de trabajo contenga detalles específicos del vehículo, como marca, modelo, año, kilometraje y cualquier número de identificación (VIN). Además, es importante registrar cualquier observación o inventario realizado al momento del ingreso al taller, especialmente si el vehículo presenta daños preexistentes o detalles que requieran atención especial (esto ya seria realizado durante el peritaje y diagnostico).  
  * Listado de piezas, repuestos y servicios: La orden debe detallar las piezas y repuestos que se van a utilizar durante la reparación, así como los servicios que el taller realizará en el vehículo. Esta lista ayuda a evitar malentendidos sobre el alcance del trabajo y garantiza que el cliente esté al tanto de lo que se va a realizar y por qué.  
  * Costos y tiempo estimado: Es esencial que la orden de trabajo incluya un desglose claro de los costos de las piezas, la mano de obra y cualquier otro gasto asociado. También debe especificar el tiempo estimado que tomará realizar la reparación, lo que ayuda al cliente a planificar la entrega y recogida del vehículo.  
  * Términos y condiciones: Las políticas del taller, como los términos de pago, las garantías y las responsabilidades, deben estar claramente expresadas en la orden de trabajo. Esto protege tanto al taller como al cliente y establece las reglas del servicio.  
  * Pagos y abonos: La orden de trabajo debe incluir una sección específica para el registro de pagos y abonos realizados por el cliente. A medida que el cliente hace abonos o pagos parciales, estos deben quedar reflejados en la orden, proporcionando un seguimiento claro de los montos pendientes y abonados.   
  * Link de seguimiento de estado de reparación.  
3. **Módulo Administración**  
* Facturación electrónica  
* Registro de pagos  
* Caja básica  
* Gestión de gastos  
4. **Módulo Reportes**  
* Dashboard negocio  
* Métricas atención y contacto, etc  
* Reportes avanzado  
* Indicadores financieros  
5. **Inventario**  
* Creación, modificación, alta baja de productos repuestos y materiales a fines del rubro.  
* Configuración de punto de quiebre de stock  
* Carga masiva o manual  
* Packs de reparacion / instalacion  
* Actualización automática según repuestos y materiales imputados en OT.

