# Flujo de Oficios Enlazados – Colegio Lumen

## Principio fundamental

**Todo oficio vive en el módulo `Oficios / documental`.**

Los módulos de **Calificaciones**, **Alertas de rendimiento** y **Asistencia / Justificaciones** **no crean documentos independientes**.  
Solo **disparan** la creación de un registro dentro del módulo central de Oficios, con el tipo, estudiante, curso y recorrido ya definidos.

---

## Arquitectura correcta

```
┌─────────────────────────────┐
│  Calificaciones / Alertas   │
│  (bajo rendimiento)         │────┐
└─────────────────────────────┘    │
                                   │  crea + enlaza
┌─────────────────────────────┐    │
│  Asistencia / Justificaciones│────┤
│  (oficio por inasistencia)  │    │
└─────────────────────────────┘    │
                                   ▼
                    ┌──────────────────────────────┐
                    │   OFICIOS / DOCUMENTAL       │
                    │   (módulo único de seguimiento)│
                    │                              │
                    │  • Lista de documentos       │
                    │  • Detalle + recorrido       │
                    │  • Estados (En ruta, etc.)   │
                    │  • Versiones                 │
                    │  • Editor de contenido       │
                    └──────────────────────────────┘
```

---

## Tipos de oficio y recorrido estándar

| Tipo de documento              | Origen típico                    | Recorrido inicial recomendado                  | Quién aprueba / cierra |
|--------------------------------|----------------------------------|------------------------------------------------|------------------------|
| Oficio por inasistencia        | Asistencia / Justificaciones     | Tutor de curso → Inspector → Secretaría        | Inspector / Secretaría |
| Oficio de alerta (bajo rendimiento) | Calificaciones / Alertas     | Docente → Tutor de curso → Inspector → Secretaría | Inspector / Secretaría |
| Plan de refuerzo               | Alertas de rendimiento           | Tutor → Inspector → Secretaría                 | Inspector              |
| Acta de compromiso             | Reunión con representantes       | Tutor → Inspector → Secretaría                 | Inspector              |
| Ficha del tutor                | Seguimiento del tutor            | Tutor → Inspector                              | Inspector              |
| Oficio ad-hoc / manual         | Botón “+ Nuevo documento”        | Según el tipo seleccionado                     | Según tipo             |

> El recorrido exacto puede configurarse por tipo de documento en el sistema.  
> Lo importante es que **siempre nace dentro de Oficios / documental**.

---

## Flujo detallado: desde Calificaciones / Alertas

1. El docente (o el sistema) detecta bajo rendimiento en una o varias asignaturas.
2. Desde el módulo **Alertas de rendimiento** o **Calificaciones** el docente elige:
   - “Generar oficio de alerta” / “Notificar bajo rendimiento”
3. El sistema **crea automáticamente** un documento en **Oficios / documental** con:
   - Tipo: `Oficio de alerta` (o `Plan de refuerzo` si se elige)
   - Estudiante, curso, paralelo, período lectivo
   - Asunto pre-llenado (ej. “Notificación de alerta temprana de bajo rendimiento académico…”)
   - Tabla de promedios (si aplica)
   - Estado: `En ruta`
   - Primer paso del recorrido: normalmente **Tutor de curso** o el propio docente según configuración
4. El docente puede editar el contenido del oficio **dentro** del módulo Oficios (misma pantalla de detalle + editor).
5. Al guardar / enviar, el documento avanza por el recorrido (Tutor → Inspector General → Secretaría).
6. Cada actor recibe notificación y puede aprobar, devolver o cerrar.

**No se abre un modal “Nuevo documento” independiente.**  
Se redirige (o se abre el panel de detalle) del documento recién creado en Oficios / documental.

---

## Flujo detallado: desde Asistencia / Justificaciones

1. Se registra una justificación de inasistencia **o** el docente/inspector genera un oficio por inasistencia reiterada.
2. El sistema crea el documento en **Oficios / documental**:
   - Tipo: `Oficio por inasistencia`
   - Estudiante, curso, fecha(s) de la falta, motivo
   - Estado: `En ruta`
   - Recorrido: Tutor → Inspector → Secretaría (o el definido)
3. El documento queda visible en la lista de Oficios del docente, del tutor y del inspector.
4. El contenido (carta formal) se edita desde el mismo módulo.

---

## Qué NO se debe hacer

| Incorrecto | Correcto |
|------------|----------|
| Crear un oficio “sueltos” desde Calificaciones con su propio flujo | Crear el registro **dentro** de Oficios / documental |
| Tener dos lugares donde se gestionan oficios | Un solo módulo de seguimiento: **Oficios / documental** |
| Modal “Nuevo documento” como único punto de entrada para todo | “+ Nuevo documento” solo para oficios **manuales / ad-hoc** |
| Duplicar el documento en otro módulo | Enlazar (una sola instancia del documento) |

---

## Comportamiento del botón “+ Nuevo documento”

- Solo para oficios que **no** nacen de un módulo académico.
- Al crear, el documento también vive en Oficios / documental.
- Se selecciona tipo, estudiante, curso, período y se genera el borrador con el recorrido correspondiente al tipo.

---

## Estados del documento (ya existentes en el módulo)

- **Borrador** – aún no enviado
- **En ruta** – circulando por el recorrido
- **Aprobado / Cerrado** – finalizado
- **Devuelto** – requiere corrección

Cada paso del recorrido muestra:
- Quién aprobó
- Quién tiene el turno (“Le toca”)
- Tiempo en el despacho actual

---

## Notificaciones automáticas

Al crear o avanzar un oficio se notifica a:

- El siguiente actor del recorrido
- (Opcional) al representante del estudiante cuando el oficio es de alerta o citación

---

## Resumen para implementación

1. Los módulos de **Calificaciones**, **Alertas de rendimiento** y **Asistencia/Justificaciones** solo tienen un botón/acción de tipo:
   - “Generar oficio de alerta”
   - “Generar oficio por inasistencia”
2. Esa acción llama a la API/servicio de **Oficios / documental** y crea el documento con los datos pre-cargados.
3. El usuario es redirigido (o se abre el panel lateral) al documento recién creado **dentro** del módulo Oficios / documental.
4. Toda la edición, recorrido, versiones y cierre se hace exclusivamente ahí.

---

**Colegio Lumen** · Especificación de flujo de oficios enlazados  
Fecha: 30 de octubre de 2026
