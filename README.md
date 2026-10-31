# Colegio Lumen – Portal del Estudiante & Módulo Oficios

## Estado del repositorio

| Módulo | Estado | Ubicación |
|--------|--------|-----------|
| **Mi Perfil** (estudiante) | Completo | `mi-perfil/` |
| **Justificaciones** (estudiante) | Completo | `justificaciones/` |
| **Oficios / Documental** | **En progreso** | `oficios/` |
| Flujo de enlazado | Documentado | `docs/FLUJO-OFICIOS-ENLAZADO.md` |
| UI de referencia | Documentado | `docs/UI-OFICIOS-DASHBOARD.md` |

---

## Módulo Oficios (`oficios/`)

Código React/Next.js (SigeeOficios) para el tráfico documental.

### Ya subido a GitHub

- `oficios/README.md`
- `oficios/app/layout.tsx`
- `oficios/app/bandeja-emisor/page.tsx` — Bandeja del emisor
- `oficios/app/detalle-del-documento/page.tsx` — Detalle del documento

### Componentes del detalle (código fuente disponible)

Deben estar en `oficios/app/detalle-del-documento/components/`:

| Componente | Función |
|------------|---------|
| DocumentoHeader | Cabecera + ruta de aprobación + observación |
| DetalleTabs | Pestañas Documento / Recorrido / Seguimientos / Versiones |
| PlantillaOficio | Visualizar el documento (vista entrega / auditoría) |
| RecorridoTimeline | Seguir el trámite (historial inmutable) |
| SeguimientosPanel | Documentos hijo enlazados |
| VersionesPanel | Control de versiones del PDF |
| ResumenLateral | Indicadores + documentos relacionados |
| AccionesPanel | Acciones según rol (corregir, reenviar, entregar) |
| DetalleModals | Modales de reenvío, entrega y seguimiento |
| EsperaPasoChart | Gráfico de espera por paso |

### Capacidades del módulo

- Documentos generados por **docentes, tutor, inspector general, rector, vicerrector**
- **Visualizar** el documento (plantilla formal imprimible)
- **Seguir el recorrido** del trámite (timeline + historial)
- Acciones según estado y rol
- Versiones controladas y documentos relacionados

### Dependencias

Next.js (App Router), Tailwind, lucide-react, recharts, react-hook-form, sonner.  
Datos mock: `@/lib/oficios-data`  
Componentes compartidos: `AppLayout`, `EmisorMetrics`, `EmisorTable`, badges, etc.

---

## Flujo de enlazado (recordatorio)

```
Calificaciones / Alertas  ──┐
                            ├──►  OFICIOS / DOCUMENTAL (este módulo)
Asistencia / Justificaciones ──┘
```

Ver `docs/FLUJO-OFICIOS-ENLAZADO.md`.

---

**Colegio Lumen** · Ministerio de Educación del Ecuador
