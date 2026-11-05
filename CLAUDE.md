# Instrucciones para Claude — Colegio Lumen / SIGEE

Repo: `sigeeadmin-code/colegio-lumen-portal-estudiante`  
Objetivo: unificar, conectar **Supabase** + **Vercel** y desplegar **todo el proyecto**.

**Guía de conexión humana:** ver `DEPLOY.md`

---

## Conexión del stack

| Capa | Servicio |
|------|----------|
| Código | GitHub `main` |
| Auth + DB + Storage | Supabase |
| Hosting / CI | Vercel (auto-deploy en push a `main`) |

Variables obligatorias (ver `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (solo server)
- `NEXT_PUBLIC_APP_URL`

Schema base: `supabase/schema.sql`

---

## Ya subido (no inventar de cero)

### 1. Mi Perfil (estudiante) — solo lectura
- `mi-perfil/index.html`
- Datos estudiante, padres, representante de emergencia

### 2. Reporte mensual de asistencia
- `asistencia/app/reporte-mensual/page.tsx`
- `asistencia/lib/asistencia-report-data.ts`
- Filtros mes/curso/paralelo · por curso y por alumno · PDF + Excel
- Roles: Inspector General + Docente tutor

### 3. Oficios
- `oficios/` — emisor, bandeja por cargo, detalle, plantillas LOEI
- Cargos en ruta: Tutor → Inspector → **DECE** → **Secretaría** → Vicerrector → Rector
- **Sin** botón «Nuevo documento»: origen = calificaciones / asistencia

### 4. Justificaciones
- `justificaciones/index.html`

### 5. Roles a soportar en menú y RLS
`estudiante` · `tutor` · `inspector` · `dece` · `secretaria` · `vicerrector` · `rector`

---

## Qué debe hacer Claude

1. Unificar en **Next.js App Router** (una sola app desplegable).
2. Aplicar `supabase/schema.sql` + RLS por rol (incluir **secretaria** y **dece**).
3. Auth Supabase; redirigir por `perfiles.rol`.
4. Conectar Mi Perfil, asistencia, oficios y justificaciones a tablas reales.
5. Export PDF/Excel del reporte mensual (API route).
6. Configurar para que Vercel construya desde la raíz (o documentar `rootDirectory`).
7. No crear oficios huérfanos: solo desde reportes/asistencia/calificaciones.

## Prioridad

1. Auth + roles  
2. Mi Perfil  
3. Reporte asistencia + export  
4. Oficios (datos reales + Secretaría/DECE en cola)  
5. Justificaciones  

UI: Tailwind, español Ecuador, LOEI Arts. 171–172.
