# Colegio Lumen — Portal / SIGEE

Portal institucional (estudiante, tutor, inspector, DECE, secretaría, rector).

## Conectar todo el proyecto

| Paso | Documento |
|------|-----------|
| GitHub + Supabase + Vercel (checklist) | **[DEPLOY.md](./DEPLOY.md)** |
| Instrucciones para Claude / IA | **[CLAUDE.md](./CLAUDE.md)** |
| Variables de entorno | **[.env.example](./.env.example)** |
| Schema base Supabase | **[supabase/schema.sql](./supabase/schema.sql)** |

**Repo:** https://github.com/sigeeadmin-code/colegio-lumen-portal-estudiante

### Auto-deploy Vercel

1. Importar este repo en Vercel  
2. Pegar variables de `.env.example` (valores reales de Supabase)  
3. Branch producción: `main`  
→ cada push a `main` despliega solo.

## Módulos en el repo

| Módulo | Ubicación |
|--------|-----------|
| Mi Perfil (solo lectura) | `mi-perfil/` |
| Reporte mensual asistencia | `asistencia/app/reporte-mensual/` |
| Oficios (emisor + cargo + detalle) | `oficios/` |
| Justificaciones | `justificaciones/` |
| Docs de flujo | `docs/` |

Roles: estudiante · tutor · inspector · **dece** · **secretaria** · vicerrector · rector
