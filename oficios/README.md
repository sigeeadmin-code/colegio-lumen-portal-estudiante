# Módulo Oficios / Documental (SigeeOficios)

## Estado: CASI COMPLETO (código de pantallas principales en el repo)

### Subido a GitHub ✓

#### Bandeja del emisor
- `app/bandeja-emisor/page.tsx`
- `app/components/EmisorMetrics.tsx` — KPIs (Observados, En ruta, Borradores, etc.)
- `app/components/CargaEstadoChart.tsx` — gráfico de carga por estado

#### Detalle del documento
- `app/detalle-del-documento/page.tsx`
- `DocumentoHeader.tsx` — cabecera + ruta de aprobación
- `DetalleTabs.tsx` — pestañas Documento / Recorrido / Seguimientos / Versiones
- `PlantillaOficio.tsx` — **visualizar el documento**
- `RecorridoTimeline.tsx` — **seguir el trámite** (historial inmutable)
- `AccionesPanel.tsx` — corregir, reenviar, entregar, imprimir
- `SeguimientosPanel.tsx`, `VersionesPanel.tsx`, `ResumenLateral.tsx`
- `EsperaPasoChart.tsx`

### Aún faltan en el repo (código listo localmente)

| Archivo | Tamaño | Función |
|---------|--------|--------|
| `app/components/EmisorTable.tsx` | ~35 KB | Tabla "Mis documentos" (filtros, paginación, acciones) |
| `detalle.../DetalleModals.tsx` | ~12 KB | Modales: reenviar, registrar entrega, generar seguimiento |

### Dependencias compartidas que Claude debe tener o crear

- `@/lib/oficios-data` — datos mock (DOCUMENTOS, HISTORIAL, NOTAS, etc.)
- `@/components/AppLayout`
- `@/components/ui/Badge`, `RouteStepper`, `Modal`, `EmptyState`, `MetricCard`, `Tooltip`, `TableSkeleton`

### Capacidades cubiertas con lo subido

1. Documentos de autoridades (tutor, inspector, rector…)
2. **Visualizar** el documento (`PlantillaOficio`)
3. **Seguir el recorrido** del trámite (`RecorridoTimeline` + `DocumentoHeader`)
4. KPIs de la bandeja del emisor
5. Acciones según rol y estado

### Qué falta para correr la app completa

1. Subir `EmisorTable.tsx` y `DetalleModals.tsx`
2. Crear/adaptar `lib/oficios-data.ts` y componentes UI compartidos
3. Bandeja por cargo (Inspector/DECE) — no incluida en estos archivos
4. Conexión real a backend (Supabase edge functions mencionadas en comentarios)
