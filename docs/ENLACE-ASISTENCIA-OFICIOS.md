# Enlace: Asistencia / Inasistencias → Módulo de Oficios

## Base normativa (Ministerio de Educación)

| Norma | Contenido relevante |
|-------|---------------------|
| **Reglamento a la LOEI – Art. 171 (Inasistencia)** | 1–2 días: notificación **inmediata** al representante; justificación hasta **2 días** después del retorno (tutor/docente de aula). Si excediere **3 días** continuos: justificación con documentación ante la **máxima autoridad o Inspector General**. |
| **Art. 172 (Reprobación por inasistencias)** | Básica Superior y Bachillerato: inasistencias **injustificadas > 10 %** del total de horas del año en una o más asignaturas → **reprobación** de esas asignaturas. |
| **Circular / lineamientos MINEDUC** | Justificación válida: enfermedad, calamidad doméstica, permisos especiales, etc., con evidencia. Inasistencia recurrente justificada → medidas de nivelación y apoyo (DECE / docentes). |

El sistema debe **comunicar** y **dejar constancia** en el módulo Oficios; no solo un mensaje suelto en asistencia.

---

## Regla de negocio (igual que calificaciones)

| Acción | Resultado |
|--------|-----------|
| **Guardar borrador** | Documento en Oficios, estado `borrador`, **Bandeja del emisor** (tutor / inspector de curso). |
| **Enviar a trámite** | Estado `en_ruta` → notifica según tipo (Inspector / Tutor / Rector) → **Cola de despacho**. |
| **Imprimir** | Solo copia; no reemplaza el registro en Oficios. |

Origen del modal de asistencia = editor.  
Fuente de verdad del seguimiento = **módulo Oficios**.

---

## Tipos de comunicación desde Asistencia

| Tipo | Cuándo se genera | Ruta típica |
|------|------------------|-------------|
| **Comunicación de inasistencia (1–2 días)** | Falta registrada; notificación inmediata al representante | Tutor → (archivo / acuse) |
| **Comunicación de inasistencia prolongada (≥ 3 días)** | Faltas continuas sin justificación o por justificar ante Inspector | Tutor → Inspector General |
| **Citación por inasistencias recurrentes** | Patrón de faltas; riesgo de medida educativa | Tutor → Inspector → Rector |
| **Alerta por riesgo de reprobación (Art. 172)** | % injustificadas acercándose o superando 10 % | Tutor → Inspector → Rector → notificación formal |
| **Constancia de justificación recibida** | Representante presentó documentos en plazo | Inspector / Tutor (cierra el trámite de justificación) |

---

## Flujo

```
[Módulo Asistencia]
   registro de falta / atraso / fuga
        │
        ▼
[Generar comunicación / oficio]
   tipo + fechas + horas/asignaturas + % asistencia
        │
        ├─ Guardar borrador ──► Oficios · Bandeja del emisor
        │
        └─ Enviar a trámite ──► Oficios · en_ruta
                                  → Inspector (si ≥3 días o recurrente)
                                  → historial inmutable
                                  → acuse / entrega al representante
```

---

## Payload sugerido

```ts
interface CrearOficioDesdeAsistencia {
  origenModulo: 'asistencia';
  origenEstudianteId: string;
  origenPeriodo: string;
  origenCurso: string;

  tipo:
    | 'comunicacion_inasistencia'
    | 'comunicacion_inasistencia_prolongada'
    | 'citacion_inasistencias_recurrentes'
    | 'alerta_reprobacion_art172'
    | 'constancia_justificacion';

  fechasInasistencia: string[];
  diasContinuos?: number;
  horasInjustificadas?: number;
  totalHorasPeriodo?: number;
  porcentajeInjustificado?: number;

  asignaturasAfectadas?: Array<{ materia: string; faltas: number }>;
  motivoRegistrado?: string;

  estudiante: { nombre: string; cedula?: string; curso: string };
  representante: { nombre: string; telefono?: string };

  ciudad: string;
  fecha: string;
  emisorUserId: string;
  accion: 'guardar_borrador' | 'enviar_a_ruta';
}
```

---

## UI del modal (Asistencia)

1. **Guardar borrador** → Oficios (bandeja emisor).
2. **Enviar a trámite** → ruta + notificación.
3. **Imprimir**.
4. Texto de ayuda: *“El documento queda registrado en Oficios para el seguimiento y el cumplimiento del Art. 171 / 172 del Reglamento a la LOEI.”*

---

## Criterios automáticos de generación (opcional)

| Evento en asistencia | Acción del sistema |
|----------------------|--------------------|
| 1.ª falta del día (1–2 días) | Sugerir “Comunicación de inasistencia” al tutor |
| ≥ 3 días continuos sin justificación | Sugerir oficio a Inspector + notificar |
| % injustificado ≥ 8 % (umbral preventivo) | Alerta temprana Art. 172 |
| % injustificado > 10 % | Oficio formal de riesgo de reprobación |

Todo documento generado **enlazado** a Oficios, no suelto en asistencia.
