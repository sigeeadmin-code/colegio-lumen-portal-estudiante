# Módulo Oficios / Documental (SigeeOficios)

Código React/Next.js del módulo de tráfico documental.

## Pantallas implementadas

| Ruta | Descripción |
|------|-------------|
| `app/bandeja-emisor/page.tsx` | Bandeja del emisor (Tutor, Docente…) |
| `app/detalle-del-documento/page.tsx` | Detalle del documento |

## Componentes del detalle

- **DocumentoHeader** – Cabecera + ruta de aprobación + mensaje de observación
- **DetalleTabs** – Pestañas: Documento · Recorrido · Seguimientos · Versiones
- **PlantillaOficio** – Vista de entrega del oficio (imprimible)
- **RecorridoTimeline** – Historial inmutable del trámite
- **SeguimientosPanel** – Documentos hijo enlazados
- **VersionesPanel** – Versiones del PDF (límite anti-abuso)
- **ResumenLateral** – Indicadores + documentos relacionados
- **AccionesPanel** – Corregir, reenviar, imprimir, registrar entrega
- **DetalleModals** – Modales de reenvío, entrega y seguimiento
- **EsperaPasoChart** – Gráfico de espera por paso

## Capacidades

- Documentos generados por: docentes, tutor, inspector general, rector, vicerrector
- Visualizar documento (vista de entrega / vista con recorrido)
- Seguir el recorrido del trámite (timeline + historial inmutable)
- Acciones según rol y estado (editar, reenviar, observar, aprobar, entregar)
- Versiones controladas del PDF
- Documentos relacionados y seguimientos enlazados

## Dependencias esperadas

- Next.js (App Router)
- Tailwind CSS
- lucide-react
- recharts
- react-hook-form
- sonner (toasts)
- Datos mock en `@/lib/oficios-data`

Este código debe integrarse con el flujo de enlazado definido en `docs/FLUJO-OFICIOS-ENLAZADO.md`.
