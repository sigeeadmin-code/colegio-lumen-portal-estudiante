# UI de referencia – Módulo Oficios / Documental

Este documento describe el **diseño objetivo** del dashboard de Oficios.  
Las capturas de pantalla de referencia se encuentran en la carpeta `docs/oficios-ui/` (subir las PNG al repositorio).

Claude debe interpretar estas pantallas como el estándar visual y funcional a implementar.

---

## 1. Bandeja del emisor (Dashboard del creador del documento)

**Archivo de referencia:** `01-bandeja-emisor.png`

Pantalla principal para quien **emite** oficios (Tutor, Docente, etc.).

### KPIs superiores (tarjetas)

| KPI | Ejemplo | Color / significado |
|-----|---------|---------------------|
| **Observados por corregir** | 2 | Ámbar – documentos devueltos que requieren corrección |
| **En ruta** | 4 | Azul – circulando en el recorrido |
| **Borradores** | 2 | Gris – sin enviar |
| **Versión mayor a 5** | 1 | Rojo – alerta de muchas versiones |
| **Tiempo medio de trámite** | 3,8 días | Verde – con meta institucional (ej. 3 días) |

### Gráfico

- **Carga por estado**: barras (Borrador, Observado, En ruta, Aprobado, Entregado, Archivado, Rechazado)

### Textos de apoyo en las tarjetas

- “Devueltos por Rector y por DECE. El más antiguo lleva 4 días sin corregir.”
- “Esperando firma en Inspector, DECE o Secretaría.”
- “Sin enviar. Ficha 0155 y seguimiento 0156.”
- “El acta 0138 va por la versión 6: revisar con Inspección.”
- “Meta institucional: 3 días. Bajó 0,4 días frente a septiembre.”

---

## 2. Mis documentos (lista del emisor)

**Archivos de referencia:** `02-mis-documentos.png`, `09-mis-documentos-observados.png`, `03-lista-documentos-detalle.png`

### Pestañas de estado

- Todos · Borradores · **Observados** · En ruta · Emitidos / cerrados

### Columnas de la tabla

| Columna | Contenido |
|---------|-----------|
| N° documento | Ej. `0138-2026-UEIPP` |
| Asunto | Título + mensaje de observación en color (ámbar/rojo) cuando está observado/rechazado |
| Tipo | Badge: Acta, Refuerzo, Alerta, etc. |
| Estudiante | Nombre + cédula |
| Curso | 10mo B, 9no C… |
| Estado | Badge de color (Observado, Rechazado, Aprobado final, En ruta, Archivado) |
| Paso / Ruta | Mini barra de progreso del recorrido + actor actual |
| Acciones | Ver, Editar, Imprimir |

### Filtros

- Búsqueda por N°, estudiante, asunto o curso
- Tipo de documento
- Selector de columnas

---

## 3. Detalle del documento

**Archivos de referencia:** `04-detalle-documento-ruta.png`, `05-detalle-contenido-indicadores.png`

### Cabecera

- Número de documento + badges de estado y tipo + versión (`v2`)
- Asunto completo
- Estudiante, curso, cédula
- Emisor (nombre y cargo)
- Fecha de emisión y período lectivo

### Ruta de aprobación (timeline horizontal)

```
Tutor (Aprobado) → Inspector (Aprobado) → Rector (Observó) 
```

- Círculos verdes = completado
- Círculo ámbar/rojo = actual (observado / pendiente)
- Mensaje de devolución visible debajo cuando existe

### Pestañas del detalle

- **Documento** (vista de entrega / vista con recorrido)
- **Recorrido** (historial de pasos)
- **Seguimientos**
- **Versiones**

### Panel derecho – Indicadores del trámite

- Tiempo total del trámite (vs meta)
- Número de devoluciones / observaciones
- Versión actual del PDF (ej. v2 de 5 permitidas)
- Destinatario (representante legal)
- **Documentos relacionados** del mismo estudiante (con enlaces)

### Contenido del oficio (vista de entrega)

- Encabezado formal (Para / De / Asunto)
- Cuerpo del oficio
- Tabla de resumen de calificaciones y asistencia (cuando aplica)
- Firma

---

## 4. Bandeja por cargo (Inspector, DECE, Rector, Secretaría…)

**Archivos de referencia:** `06-bandeja-por-cargo.png`, `07-bandeja-cargo-graficos.png`

Pantalla para quien **decide** (aprueba, observa, rechaza).

### KPIs

| KPI | Ejemplo |
|-----|---------|
| Pendientes en mi despacho | 10 (con desglose: dentro de 24h / 24-48h / sobre 48h) |
| Espera máxima | 3 d 7 h (documento más antiguo) |
| Espera media | 36 h |
| Resueltos hoy | 3 |
| Devoluciones de la semana | 5 (tasa %) |

### Gráficos

- **Espera media por cargo** (barras horizontales: DECE, Inspector, Rector, Vicerrector, Secretaría, Tutor)
- **Llegadas y resoluciones por día** (líneas)

### Cola de despacho

- Pestañas por cargo: Inspector General · DECE · Vicerrector/a · Rector/a · Secretaría
- Alerta cuando hay documentos que superan 48 h
- Tabla ordenada por tiempo de espera / SLA
- Columnas: Curso, Emisor, Ruta (mini progreso), Versión, Llegada, Espera/SLA (con badge Vencido), Acciones (Ver, Aprobar, Observar, Rechazar)

---

## 5. Estados visuales estándar

| Estado | Color de badge | Significado |
|--------|----------------|-------------|
| Borrador | Gris | Sin enviar |
| En ruta | Azul | Circulando |
| Observado | Ámbar | Devuelto para corrección |
| Rechazado | Rojo | No procede |
| Aprobado / Aprobado final | Verde | Aprobado |
| Archivado | Gris oscuro | Cerrado / histórico |
| Entregado | Verde suave | Entregado al destinatario |

---

## 6. Principios de diseño a respetar

1. **Un solo módulo de oficios** – todo nace y se gestiona aquí.
2. **Bandeja del emisor** vs **Bandeja por cargo** – dos vistas según el rol.
3. **SLA visible** – tiempo de espera, meta institucional, documentos vencidos.
4. **Versiones controladas** – límite de versiones, alerta cuando se supera un umbral.
5. **Documentos relacionados** – siempre mostrar otros oficios del mismo estudiante.
6. **Observaciones claras** – el mensaje de devolución debe ser visible y accionable.
7. **Mini barras de ruta** en las listas para ver de un vistazo en qué paso está.

---

## 7. Cómo usar estas referencias

Las imágenes en `docs/oficios-ui/` son la fuente de verdad visual:

| Archivo | Pantalla |
|---------|----------|
| 01-bandeja-emisor.png | Dashboard del emisor |
| 02-mis-documentos.png | Lista Mis documentos |
| 03-lista-documentos-detalle.png | Filas de la lista |
| 04-detalle-documento-ruta.png | Detalle + ruta de aprobación |
| 05-detalle-contenido-indicadores.png | Contenido del oficio + indicadores |
| 06-bandeja-por-cargo.png | Dashboard del cargo (Inspector…) |
| 07-bandeja-cargo-graficos.png | Gráficos de espera y llegada |
| 08-cola-despacho.png | Cola ordenada por SLA |
| 09-mis-documentos-observados.png | Filtro Observados |

Claude debe implementar el módulo de Oficios **siguiendo estas pantallas** y el flujo de enlazado definido en `FLUJO-OFICIOS-ENLAZADO.md`.

---

**Colegio Lumen** · UI de referencia del módulo Oficios  
30 de octubre de 2026
