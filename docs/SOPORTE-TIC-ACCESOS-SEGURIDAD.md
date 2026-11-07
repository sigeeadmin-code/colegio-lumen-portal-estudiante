# Soporte TIC — Accesos, IP y ciberseguridad (SIGEE)

Mejora del panel **Soporte TIC → Accesos** a partir del monitoreo actual (entradas/salidas por usuario).

---

## 1. Problema observado

En la tabla de accesos aparecen **la misma IP en varios usuarios/roles**, por ejemplo:

| IP | Usuarios |
|----|----------|
| `190.110.44.218` | Demo Admin Plantel, Demo Contador, Demo Docente |
| `181.199.41.45` | Edwin Ramon (Admin), Demo Contador |

Puede ser red institucional compartida **o** uso compartido de credenciales / sesión comprometida. Hace falta **filtro por IP**, **alerta de IP multi-usuario** y **rastreo de origen**.

---

## 2. Filtros de Accesos (ampliados)

| Filtro | Uso |
|--------|-----|
| Usuario (nombre o correo) | Ya existe |
| Desde / Hasta | Ya existe |
| Plantel | Ya existe |
| **IP** | Nuevo — coincidencia exacta o prefijo |
| **Solo IPs multi-usuario** | Toggle — muestra solo IPs usadas por ≥2 cuentas |
| Rol | Opcional |
| Estado (conectado / cerrado) | Opcional |

Botones: **Buscar** · **Excel** · **Exportar incidentes IP**

---

## 3. Vista profesional: IPs en riesgo

Tarjeta / pestaña secundaria **«IPs multi-acceso»**:

- Lista de IPs con **N usuarios distintos** en el rango de fechas
- Badge de severidad:
  - **Info**: 2 usuarios, mismo plantel, horario laboral → probable red compartida
  - **Alerta**: ≥3 usuarios o roles de alto privilegio (Admin + Contador + Docente)
  - **Crítico**: mismo IP + roles sensibles en horarios atípicos o planteles distintos
- Click en IP → **panel lateral de rastreo**

### Panel lateral «Origen de la IP»

| Bloque | Contenido |
|--------|-----------|
| Resumen | IP, país/ciudad (GeoIP), ISP/ASN, tipo (residencial / móvil / datacenter / VPN sospechosa) |
| Sesiones | Timeline de entradas/salidas ligadas a esa IP |
| Usuarios | Lista de cuentas que la usaron + rol + plantel |
| Acciones | Forzar cierre de sesiones, marcar incidente, bloquear IP temporal, notificar Seguridad |

*GeoIP vía servicio (MaxMind, ipapi, o edge function Supabase). No inventar geolocalización en cliente.*

---

## 4. Mejor herramienta de monitoreo de usuarios

### KPIs en cabecera de Accesos

- Sesiones activas ahora
- Usuarios únicos (rango)
- **IPs con ≥2 usuarios**
- Intentos fallidos de login (si hay log de auth)
- Sesiones > 8 h abiertas (posible abandono / hijack)

### Tabla enriquecida

Columnas actuales +:

- **IP** (clickeable → panel origen)
- Indicador si esa IP es **compartida** (icono + tooltip «También: usuario X, Y»)
- **Origen resumido** (ciudad · ISP) en hover o columna opcional
- Dispositivo / OS más fiable si el user-agent se parsea en servidor

### Tiempo por usuario (sub-tab ya existente)

Mantener y añadir: total de IPs distintas por usuario (usuario que salta de muchas IPs = posible cuenta compartida o ataque).

---

## 5. Protección ante ciberataques — qué ofrecer

### Ya orientado a detección (Soporte TIC)

| Capacidad | Descripción |
|-----------|-------------|
| Filtro y alerta IP multi-usuario | Credenciales compartidas o compromiso |
| Rastreo GeoIP + ISP | Origen de la conexión |
| Export Excel de accesos e incidentes | Auditoría |
| Cierre forzado de sesión | Contención |
| Bloqueo temporal de IP | Mitigación rápida |

### Capas recomendadas a añadir al sistema

| Capa | Medida | Prioridad |
|------|--------|-----------|
| **Auth** | MFA obligatorio para Admin, Contador, Inspector, Rector | Alta |
| **Auth** | Rate limit de login + bloqueo tras N fallos | Alta |
| **Auth** | Alertas de login desde país nuevo / IP nueva | Alta |
| **Sesión** | Timeout de inactividad + rotación de refresh tokens | Alta |
| **Sesión** | Lista de sesiones activas por usuario («cerrar otras») | Media |
| **Red** | WAF (Vercel/Cloudflare) + bot fight | Alta |
| **Red** | HTTPS only, HSTS, headers de seguridad | Alta |
| **App** | RLS Supabase por rol (ya previsto) | Alta |
| **App** | Logs de auditoría inmutables (quién cambió qué) | Media |
| **App** | Detección de fuerza bruta y credential stuffing (mismos passwords fallidos desde muchas IPs) | Alta |
| **Datos** | Backups cifrados + retención | Alta |
| **Operación** | Playbook: incidente IP / cuenta comprometida | Media |
| **Usuarios** | Política: no compartir cuentas; un usuario = una persona | Alta |

### Pestaña **Seguridad** (del mismo panel Soporte TIC)

Sugerencia de bloques:

1. **Intentos de acceso fallidos** (últimas 24 h / 7 d)
2. **IPs bloqueadas** (lista + desbloquear)
3. **Cuentas con MFA pendiente** (roles sensibles)
4. **Alertas abiertas** (IP multi-usuario, país anómalo, fuerza bruta)
5. **Salud del perímetro** (WAF on, certificados, último backup)

---

## 6. Flujos UX resumidos

```
Accesos
  ├─ Filtros (usuario, fechas, plantel, IP, solo multi-IP)
  ├─ KPIs (activos, multi-IP, fallidos…)
  ├─ Tabs: Entradas y salidas | Tiempo por usuario | IPs multi-acceso
  └─ Click IP → Drawer origen (geo, ISP, usuarios, acciones)

Seguridad
  ├─ Fallidos / bloqueos / MFA / alertas
  └─ Enlace a playbook de incidente
```

---

## 7. Datos técnicos sugeridos (Supabase)

```sql
-- Ejemplo de vista/materialización para multi-IP
-- auth logs o tabla sesiones: user_id, ip, user_agent, started_at, ended_at, plantel_id

create table if not exists public.sesiones_acceso (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  email text,
  rol text,
  plantel text,
  ip inet not null,
  user_agent text,
  entrada timestamptz not null default now(),
  salida timestamptz,
  geo_pais text,
  geo_ciudad text,
  isp text
);

create index on public.sesiones_acceso (ip, entrada desc);
create index on public.sesiones_acceso (user_id, entrada desc);
```

API/Edge:

- `GET /api/soporte-tic/accesos?ip=&desde=&hasta=&multi=1`
- `GET /api/soporte-tic/ip/:ip` → geo + usuarios + sesiones
- `POST /api/soporte-tic/ip/:ip/bloquear`
- `POST /api/soporte-tic/sesiones/:id/cerrar`

---

## 8. Prioridad de implementación

1. Filtro por IP + toggle «solo multi-usuario»  
2. Tab/panel IPs multi-acceso + drawer origen (aunque geo sea “pendiente de API”)  
3. Acciones: cerrar sesión / marcar incidente  
4. Pestaña Seguridad (fallidos, bloqueos)  
5. MFA + rate limit + WAF en perímetro  

Normativa y contexto: sistema educativo multi-plantel (SIGEE); privilegios Admin/Contador deben vigilarse con más rigor.
