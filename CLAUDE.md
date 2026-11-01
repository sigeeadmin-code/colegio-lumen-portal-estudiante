# Instrucciones para Claude — Colegio Lumen / SIGEE

Repo: `sigeeadmin-code/colegio-lumen-portal-estudiante`  
Objetivo: mejorar, integrar **Supabase** y desplegar en **Vercel**.

---

## Ya subido (no inventar de cero)

### 1. Mi Perfil (estudiante) — solo lectura
- Ruta en repo: `mi-perfil/index.html`
- Contenido: datos del estudiante, padres de familia, representante de emergencia (llamar al contacto)
- **Solo visualización** (no edición por el estudiante)
- Mejorar a React/Next si el proyecto base ya es Next.js; mantener UX profesional

### 2. Reporte mensual de asistencia
- `asistencia/app/reporte-mensual/page.tsx` — pantalla completa
- `asistencia/lib/asistencia-report-data.ts` — mocks y tipos
- `docs/REPORTE-MENSUAL-ASISTENCIA.md` — especificación

**Requisitos del reporte:**
- Filtros: mes, curso, paralelo
- Vistas: **por curso/paralelo** y **por alumno**
- Roles: **Inspector General** (todos los cursos) y **Docente tutor** (solo sus asignados)
- Exportar: **PDF** y **Excel**
- Estados Art. 172: Normal / Alerta preventiva (≥8%) / Riesgo (≥10%)

### 3. Oficios (módulo completo)
- `oficios/` — bandeja emisor, bandeja por cargo, detalle, plantillas LOEI
- Sin botón «Nuevo documento»: los oficios nacen de calificaciones/asistencia
- Docs: `docs/ENLACE-CALIFICACIONES-OFICIOS.md`, `docs/ENLACE-ASISTENCIA-OFICIOS.md`

### 4. Justificaciones
- `justificaciones/index.html`

---

## Qué debe hacer Claude

1. **Unificar** en una app Next.js (App Router) si aún no está unificado.
2. **Supabase**
   - Tablas sugeridas: `estudiantes`, `representantes`, `asistencia_diaria`, `oficios`, `oficio_historial`, `justificaciones`
   - RLS por rol (estudiante / tutor / inspector / rector)
   - Storage para PDF de oficios si aplica
3. **Vercel**
   - Deploy desde este repo o monorepo
   - Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, service role solo en server
4. **Export PDF/Excel** del reporte de asistencia (API route o edge function).
5. **Mi Perfil** como página de solo lectura alimentada por Supabase (`estudiantes` + `representantes`).
6. No crear oficios sueltos: enlazar desde asistencia/calificaciones → módulo oficios.

---

## Prioridad de implementación

1. Auth + roles (Supabase Auth)
2. Mi Perfil (lectura)
3. Reporte mensual asistencia + export PDF/Excel
4. Oficios (ya hay UI; conectar datos reales)
5. Justificaciones enlazadas

---

## Contacto del diseño

- UI: Tailwind, estilo institucional SIGEE
- Idioma: español (Ecuador)
- Normativa: Reglamento a la LOEI Arts. 171–172 (asistencia)
