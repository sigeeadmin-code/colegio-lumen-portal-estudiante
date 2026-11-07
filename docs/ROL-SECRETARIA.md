# Rol Secretario/a — SIGEE

Código interno: `secretaria` (etiqueta UI: **Secretario/a**)

---

## Resumen

La secretaría es el eslabón administrativo de **recepción, despacho y seguimiento documental**. Puede **consultar** asistencia, estudiantes y justificaciones; en **Oficios** actúa en la cola de su cargo (aprobar/despachar lo que le llega). **No** tiene módulo de finanzas ni edición de fichas de estudiante.

---

## Matriz de acceso

| Módulo / función | Acceso | Notas |
|------------------|--------|--------|
| **Asistencias** | ✅ Solo visualización | Registro diario, listados |
| **Análisis de asistencia** | ✅ Solo visualización | Reportes, % , riesgos Art. 172 (consulta) |
| **Reporte mensual asistencia** | ✅ Ver / exportar si el plantel lo habilita | PDF/Excel de consulta institucional |
| **Estudiantes** | ✅ Solo visualización | Ficha, curso, paralelo, contactos — **no editar** |
| **Encadenamiento** | ✅ Visualizar | Cadena de trámites / vínculo calificaciones·asistencia → oficios |
| **Justificaciones** | ✅ Visualizar (y gestionar solo si el flujo del plantel lo asigna a secretaría) | Por defecto: ver estado y adjuntos |
| **Oficios y documentación** | ✅ **Sí — rol operativo** | Bandeja por cargo Secretaría: documentos que le llegan |
| Aprobar / despachar oficios de su cola | ✅ | Entrega a representante, registro de recepción, avance de paso |
| Ver recorrido e historial del oficio | ✅ | Solo lectura del historial inmutable |
| **Finanzas** | ❌ Sin acceso | Cobros, pensiones, rubros, reportes contables |
| Alta / edición de usuarios | ❌ | Salvo que Admin delegue otro rol |
| Editar datos de estudiante | ❌ | Solo lectura |
| Crear oficios sin origen | ❌ | Los oficios nacen de reportes/asistencia/calificaciones |

---

## Oficios — responsabilidad concreta

```
… → (pasos previos) → Secretaría → …
```

- Ve la **Bandeja por cargo → Secretaría** (o “Cola de despacho” filtrada a su cargo).
- Acciones típicas sobre lo que **le llega**:
  - Registrar **entrega** al padre/madre/representante (fecha, medio, recibido por, cédula).
  - Marcar despachado / continuar ruta si el reglamento del documento lo pide.
  - Devolver con observación solo si el flujo del plantel lo permite en ese paso.
- **No** sustituye a Inspector, DECE ni Rector en sus aprobaciones pedagógicas o de autoridad.

---

## Asistencia y estudiantes (solo lectura)

- Consultar inasistencias y justificaciones para **cuadrar entregas de citaciones/comunicados**.
- Ver listado de estudiantes del plantel (o del alcance que Admin asigne) **sin** botones de editar, fusionar o dar de baja.
- Análisis de asistencia: dashboards y reportes en modo **consulta** (mismo criterio que un rol de apoyo administrativo, no de control pedagógico exclusivo del inspector).

---

## Encadenamiento

Puede **visualizar** el enlace entre:

- origen (calificaciones / asistencia),
- oficio generado,
- estado del trámite y pasos.

No reescribe el origen ni borra el vínculo.

---

## Finanzas

| Recurso | Acceso |
|---------|--------|
| Menú Finanzas / Contabilidad / Pensiones | Oculto o 403 |
| APIs de cobros, facturas, saldos | RLS / backend denegado para `secretaria` |

Si un usuario necesita finanzas **y** secretaría, debe ser otro rol (p. ej. Contador) o doble perfil explícito definido por Admin — no mezclar por defecto.

---

## Menú sugerido (Secretario/a)

- Inicio / panel resumido (oficios pendientes de despacho)
- Estudiantes *(solo lectura)*
- Asistencia *(consulta + análisis)*
- Justificaciones *(consulta)*
- Oficios y documentación *(bandeja Secretaría + detalle)*
- Encadenamiento / seguimiento de trámites *(lectura)*
- ~~Finanzas~~

---

## Implementación técnica (checklist)

- [ ] Rol `secretaria` en alta de usuario (ya suele existir como Secretario/a)
- [ ] Guards de ruta: `/finanzas/**` → denegado
- [ ] Estudiantes: UI sin acciones de edición; API PATCH/DELETE denegado
- [ ] Asistencia y análisis: GET permitido; POST de registro diario solo si el plantel lo delega (por defecto no)
- [ ] Oficios: lectura global acotada + **escritura de acciones** solo si `cargo_actual = secretaria`
- [ ] RLS Supabase alineada a esta matriz
- [ ] Soporte TIC / listado usuarios: filtro por rol Secretario/a

---

## Diferencia rápida con roles vecinos

| Rol | Oficios | Asistencia | Estudiantes | Finanzas |
|-----|---------|------------|-------------|----------|
| **Secretaría** | Despacho / entrega de su cola | Ver + análisis | Ver | No |
| Inspector | Aprobación de su paso + control | Ver + gestión según plantel | Ver | No |
| DECE | Paso consejería | Consulta riesgo | Ver casos | No |
| Contador | No (o mínimo) | No | Limitado | **Sí** |
| Docente/Tutor | Emisor | Sus cursos | Sus cursos | No |

Documento relacionado: `docs/ROL-DECE.md`, módulo `oficios/`, `docs/ENLACE-ASISTENCIA-OFICIOS.md`.
