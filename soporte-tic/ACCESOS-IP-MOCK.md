# Mock UI — Filtro IP y multi-acceso (Soporte TIC)

## Barra de filtros

```
[Buscar usuario] [Desde] [Hasta] [Plantel ▼] [IP ________] [☑ Solo IPs multi-usuario] [Buscar] [Excel]
```

## KPI strip

| Sesiones activas | Usuarios únicos | IPs multi-usuario | Logins fallidos 24h |
|------------------|-----------------|------------------|---------------------|
| 2 | 5 | **2** (alerta) | 0 |

## Alerta contextual (si hay multi-IP en el rango)

> **2 direcciones IP** fueron usadas por más de un usuario en el periodo.  
> Revisar posibles cuentas compartidas o sesiones no controladas.  
> [Ver IPs multi-acceso]

## Tabla (columna IP enriquecida)

| Usuario | Rol | Plantel | Entrada | Salida | Tiempo | IP | Navegador |
|---------|-----|---------|---------|--------|--------|-----|-----------|
| Demo Admin… | Admin plantel | COLEGIO LUMEN | 06-nov 23:43 | conectado | 6 min | `190.110.44.218` ⚠ ×3 | Chrome |
| Edwin Ramon | Admin plantel | RED… | 06-nov 23:43 | conectado | 7 min | `181.199.41.45` ⚠ ×2 | Chrome |
| Demo Contador… | Contador | COLEGIO LUMEN | … | … | 1 min | `190.110.44.218` ⚠ ×3 | Chrome |

⚠ = IP compartida; tooltip lista otros usuarios.

## Drawer «Origen IP» (ejemplo 190.110.44.218)

- **IP:** 190.110.44.218  
- **Origen:** Ecuador · Machala (aprox.) · ISP: …  
- **Usuarios (3):** Admin, Contador, Docente — mismo plantel COLEGIO LUMEN  
- **Interpretación sugerida:** Red compartida del plantel (mismo /24 laboral) *o* uso compartido de equipo.  
- **Acciones:** [Cerrar todas las sesiones de esta IP] [Marcar incidente] [Bloquear IP 24h]
