# Módulo Oficios / Documental (SigeeOficios)

## Pantallas implementadas

### Emisor (Tutor / Docente)
| Ruta | Descripción |
|------|-------------|
| `app/bandeja-emisor/page.tsx` | Bandeja del emisor |
| `app/components/EmisorMetrics.tsx` | KPIs + gráfico carga por estado |
| `app/components/EmisorTable.tsx` | Mis documentos (filtros, paginación, acciones) |
| `app/detalle-del-documento/*` | Detalle: visualizar, recorrido, versiones, modales |

### Autoridad (Inspector / DECE / Rector / Secretaría)
| Ruta | Descripción |
|------|-------------|
| `app/bandeja-por-cargo/page.tsx` | **Bandeja por cargo** |
| `app/bandeja-por-cargo/components/CargoMetrics.tsx` | Pendientes, espera máx/media, resueltos, devoluciones |
| `app/bandeja-por-cargo/components/CargoColaTable.tsx` | Cola de despacho ordenada por SLA |
| `app/components/EsperaCargoChart.tsx` | Espera media por cargo |
| `app/components/LlegadasResolucionesChart.tsx` | Llegadas vs resoluciones por día |

## Capacidades

- Documentos de docentes, tutor, inspector, rector, vicerrector, DECE, secretaría
- Visualizar documento (PlantillaOficio)
- Seguir recorrido del trámite (RecorridoTimeline)
- Aprobar / observar / rechazar desde la cola de despacho
- SLA visible (24 h / 48 h, badge Vencido)
- Versiones controladas y documentos relacionados

## Aún necesario para correr

1. **`lib/oficios-data.ts`** — incluir `COLA_DESPACHO`, `ESPERA_POR_CARGO`, `LLEGADAS_RESOLUCIONES`, `DOCUMENTOS`, etc.
2. Componentes UI: `AppLayout`, `Badge`, `RouteStepper`, `Modal`, `MetricCard`, `EmptyState`, `Tooltip`, `TableSkeleton`
3. Backend / notificaciones reales
4. Enlace desde Calificaciones y Asistencia → este módulo

Ver `docs/FLUJO-OFICIOS-ENLAZADO.md` y `docs/UI-OFICIOS-DASHBOARD.md`.
