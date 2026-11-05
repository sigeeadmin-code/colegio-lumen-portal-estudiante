# Conexión completa del proyecto SIGEE → GitHub + Supabase + Vercel

Repo: https://github.com/sigeeadmin-code/colegio-lumen-portal-estudiante

---

## 1. GitHub (ya está)

Código fuente en `main`. Cada push a `main` puede disparar deploy automático en Vercel **si el proyecto está importado**.

---

## 2. Supabase (una vez)

1. Crear proyecto en https://supabase.com
2. Project Settings → API → copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (solo servidor, nunca en el cliente)
3. Auth → Providers: Email (y/o magic link)
4. SQL Editor: crear tablas según `supabase/schema.sql` (en este repo)
5. Authentication → Users: usuarios de prueba por rol

### Roles del sistema (app_metadata o tabla `perfiles`)

| Rol | Código | Acceso |
|-----|--------|--------|
| Estudiante | `estudiante` | Mi Perfil, justificaciones |
| Docente / Tutor | `tutor` | Emisor oficios, reporte asistencia (sus cursos) |
| Inspector General | `inspector` | Bandeja cargo, reporte asistencia institucional |
| DECE | `dece` | Cola oficios DECE + (futuro dashboard) |
| Secretaría | `secretaria` | Cola oficios Secretaría, entregas |
| Vicerrector | `vicerrector` | Cola oficios |
| Rector | `rector` | Cola oficios, aprobación final |

---

## 3. Vercel (una vez → luego auto)

1. https://vercel.com → **Add New… → Project**
2. Import Git Repository: **sigeeadmin-code/colegio-lumen-portal-estudiante**
3. Framework Preset: **Next.js** (si Claude unifica el monorepo) o **Other** si es estático temporal
4. Root Directory: `.` (raíz) o la carpeta que Claude defina como app
5. **Environment Variables** (Production + Preview):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # solo server
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
```

6. Deploy
7. Settings → Git → Production Branch = `main`  
   → **cada push a main se despliega solo**

---

## 4. Qué debe quedar conectado

| Pieza | Origen | Destino |
|-------|--------|--------|
| Código UI | GitHub `main` | Vercel build |
| Auth / usuarios | Supabase Auth | App (sesión) |
| Datos estudiante, asistencia, oficios | Supabase DB | Páginas |
| PDF oficios / reportes | Storage o generación server | Download |
| Roles Secretaría, DECE, Inspector… | `perfiles.rol` o JWT claims | Bandejas y menús |

---

## 5. Checklist rápido

- [ ] Repo importado en Vercel
- [ ] Variables Supabase en Vercel
- [ ] Schema SQL aplicado en Supabase
- [ ] RLS por rol activado
- [ ] Deploy Production OK
- [ ] Push de prueba a `main` → redeploy automático

---

## Enlaces útiles

| Recurso | URL |
|---------|-----|
| GitHub | https://github.com/sigeeadmin-code/colegio-lumen-portal-estudiante |
| Guía Claude | `CLAUDE.md` |
| Schema DB | `supabase/schema.sql` |
| Env de ejemplo | `.env.example` |
