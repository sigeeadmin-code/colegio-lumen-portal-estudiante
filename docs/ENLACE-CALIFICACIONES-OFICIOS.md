# Enlace: Análisis de calificaciones → Módulo de Oficios

## Regla de negocio (obligatoria)

Cuando desde **Análisis de calificaciones** (o Asistencia / Justificaciones) se genera un documento:

| Acción del usuario | Qué debe ocurrir |
|--------------------|------------------|
| **Guardar borrador** | Se crea el documento en el módulo Oficios con estado `borrador`. Aparece en **Bandeja del emisor** del usuario que lo generó. **No** se notifica aún a Inspector/Rector. |
| **Enviar a ruta** (o “Guardar y enviar”) | Se crea/actualiza el documento, estado `en_ruta`, primer paso = Inspector (u el que defina el tipo). Notificación automática al cargo. Visible en **Cola de despacho** del Inspector. |
| **Imprimir** | Solo vista previa; no cambia el estado del trámite si aún no está guardado en Oficios. |

**No** se debe crear un documento aislado solo en el modal de calificaciones. El modal es el **editor/origen**; la fuente de verdad del seguimiento es el **módulo Oficios**.

---

## Flujo visual (como en la captura)

```
[Análisis de calificaciones]
        │
        │  Usuario elige tipo: Oficio / Plan / Acta / Ficha
        │  Completa número, ciudad, fecha, tutor, firmas…
        │  Vista previa del PDF a la derecha
        │
        ├─► [Guardar borrador]
        │         │
        │         ▼
        │   Módulo Oficios → Bandeja del emisor (estado: Borrador)
        │   El emisor puede editar, eliminar o “Enviar a ruta”
        │
        └─► [Enviar a trámite]  (recomendado añadir este botón)
                  │
                  ▼
            Módulo Oficios → en_ruta
            → Notifica Inspector General
            → Cola de despacho del Inspector
            → Aprobar / Observar / Rechazar
            → Siguiente cargo (Rector…)
            → Entrega al representante
```

---

## Tipos de documento desde calificaciones

| Tipo en el modal | Tipo en Oficios | Ruta de aprobación típica |
|------------------|-----------------|---------------------------|
| Oficio (alerta bajo rendimiento) | `oficio_alerta` | Tutor → Inspector → Rector |
| Plan de refuerzo | `plan_refuerzo` | Tutor → DECE → Inspector |
| Acta de compromiso | `acta_compromiso` | Tutor → Inspector → Secretaría |
| Ficha del tutor | `ficha_tutor` | Tutor (puede cerrar con visto Inspector) |

---

## Datos que deben enviarse al crear el oficio

```ts
interface CrearOficioDesdeCalificaciones {
  origenModulo: 'analisis_calificaciones' | 'asistencia' | 'justificaciones';
  origenEstudianteId: string;
  origenPeriodo: string;
  origenCurso: string;

  tipo: 'oficio_alerta' | 'plan_refuerzo' | 'acta_compromiso' | 'ficha_tutor';
  numero?: string;
  ciudad: string;
  fecha: string;
  docenteTutor: string;
  firmaAutoridad?: string;

  estudiante: { nombre: string; cedula?: string; curso: string };
  representante: { nombre: string };
  materiasAlerta: Array<{
    asignatura: string;
    docente: string;
    promedio: number;
    escala: string;
  }>;
  cuerpoHtmlOrTexto?: string;

  accion: 'guardar_borrador' | 'enviar_a_ruta';
  emisorUserId: string;
}
```

---

## Respuesta del backend / edge function

```ts
// POST /api/oficios/desde-calificaciones
{
  ok: true,
  documentoId: "uuid-...",
  numero: "0142-2026-UEIPP",
  estado: "borrador" | "en_ruta",
  redirectUrl: "/oficios/bandeja-emisor"
}
```

---

## Cambios de UI en el modal (recomendados)

Botones actuales: Guardar borrador · Imprimir · Cerrar

**Propuesta:**

1. **Guardar borrador** → crea en Oficios (`borrador`) → toast: “Guardado en tu bandeja de oficios”.
2. **Enviar a trámite** (nuevo, primario) → `en_ruta` → toast + redirect a detalle Oficios.
3. **Imprimir** → solo impresión.
4. **Cerrar** → confirmar si hay cambios sin guardar.

Texto de ayuda:

> Al guardar, el documento queda en **Oficios y fichas de seguimiento**. Desde allí se hace el trámite (Inspector → Rector) y el historial queda registrado.

---

## Qué NO hacer

- Guardar el PDF solo en calificaciones sin registro en Oficios.
- Crear un oficio que no aparece en la bandeja del emisor.
- Duplicar números sin `documentoId` único en Oficios.

Ver también: `docs/FLUJO-OFICIOS-ENLAZADO.md`.
