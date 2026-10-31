# Módulo Oficios / Documental (SigeeOficios)

Código React/Next.js del módulo de tráfico documental.

## Estado en GitHub

### Subidos ✓

| Archivo | Función |
|---------|--------|
| `app/bandeja-emisor/page.tsx` | Bandeja del emisor |
| `app/detalle-del-documento/page.tsx` | Página de detalle |
| `app/layout.tsx` | Layout raíz |
| `app/not-found.tsx` | 404 |
| `components/AccionesPanel.tsx` | Acciones según rol/estado |
| `components/DocumentoHeader.tsx` | Cabecera + ruta de aprobación |
| `components/PlantillaOficio.tsx` | **Visualizar documento** (vista entrega) |
| `components/EsperaPasoChart.tsx` | Gráfico espera por paso |
| `components/VersionesPanel.tsx` | Versiones del PDF |
| `components/SeguimientosPanel.tsx` | Documentos hijo enlazados |
| `components/ResumenLateral.tsx` | Indicadores + relacionados |

### Pendientes de subir (código local disponible)

| Archivo | Función |
|---------|--------|
| `components/RecorridoTimeline.tsx` | **Seguir el trámite** (historial inmutable) |
| `components/DetalleTabs.tsx` | Pestañas Documento/Recorrido/Seguimientos/Versiones |
| `components/DetalleModals.tsx` | Modales reenviar/entrega/seguimiento |

> Estos 3 archivos están en el entorno de trabajo y se pueden agregar en el siguiente commit.

## Capacidades cubiertas

- Documentos de **docentes, tutor, inspector, rector, vicerrector**
- **Visualizar** el documento (`PlantillaOficio`)
- **Seguir el recorrido** (`DocumentoHeader` + `RecorridoTimeline`)
- Acciones según rol (corregir, reenviar, entregar, imprimir)
- Versiones, seguimientos y documentos relacionados

## Dependencias

Next.js App Router, Tailwind, lucide-react, recharts, react-hook-form, sonner.  
Datos: `@/lib/oficios-data`  
UI compartida: `AppLayout`, badges, `RouteStepper`, `Modal`, `EmptyState`, `EmisorMetrics`, `EmisorTable`

Integrar con `docs/FLUJO-OFICIOS-ENLAZADO.md`.
