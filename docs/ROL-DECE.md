# Rol DECE — Departamento de Consejería Estudiantil (SIGEE)

## Problema

En **Nuevo usuario** el desplegable de ROL no incluye **DECE**, pero el módulo de **Oficios / documentación** ya contempla a DECE en la ruta de aprobación (bandeja por cargo).

Hay que **añadir el rol al alta de usuarios** y alinearlo con los permisos reales del sistema.

---

## 1. Etiqueta en el formulario «Nuevo usuario»

Agregar al select de ROL (junto a Inspector General, Docente, etc.):

| Valor interno (código) | Etiqueta visible |
|------------------------|------------------|
| `dece` | **DECE** (Consejería estudiantil) |

Orden sugerido en el listado:

1. Administrador de Plantel  
2. Supervisor de Plantel  
3. Inspector General  
4. **DECE (Consejería estudiantil)** ← nuevo  
5. Secretario/a  
6. Contador de Plantel  
7. Administrativo  
8. Docente  
9. Estudiante  
10. Padre/Madre de familia  

*(Vicerrector / Rector si el plantel los usa como roles de sistema, mantenerlos también.)*

---

## 2. Perfil funcional DECE (qué puede hacer)

### Oficios y documentación (ya previsto en el diseño)

| Capacidad | Detalle |
|-----------|--------|
| **Bandeja por cargo – DECE** | Ver oficios cuyo paso actual es DECE |
| Aprobar / observar / rechazar paso | Igual que Inspector en su eslabón de la ruta |
| Ver documento y recorrido | Lectura del PDF/plantilla e historial |
| Tipos frecuentes | Oficios de alerta académica, refuerzo, citaciones con componente socioemocional, derivaciones |
| No es emisor genérico | Los oficios nacen de calificaciones/asistencia/tutor; DECE interviene en la ruta, no crea oficios “sueltos” sin origen |

### Lectura / apoyo (recomendado)

| Capacidad | Detalle |
|-----------|--------|
| Estudiantes en riesgo | Vista de alertas Art. 172 / bajo rendimiento vinculadas a oficios |
| Justificaciones (consulta) | Ver estado de justificaciones del plantel (sin sustituir al inspector si el reglamento lo reserva) |
| Mi Perfil de estudiante | Solo lectura cuando hay caso activo (datos de contacto de emergencia) |

### Lo que DECE **no** debe tener por defecto

- Administración de usuarios / roles  
- Contabilidad / nómina  
- Configuración de plantel  
- Borrado de oficios o alteración del historial inmutable  

---

## 3. Mapeo con roles del formulario actual

| Rol en UI (alta usuario) | Código | Relación con oficios |
|--------------------------|--------|----------------------|
| Administrador de Plantel | `admin_plantel` | Gestión integral |
| Secretario/a | `secretaria` | Cola oficios + entregas |
| Supervisor de Plantel | `supervisor` | Según política del plantel |
| Contador de Plantel | `contador` | Sin cola de oficios pedagógicos |
| Administrativo | `administrativo` | Limitado |
| Inspector General | `inspector` | Cola + asistencia institucional |
| **DECE** | **`dece`** | **Cola oficios DECE** |
| Docente | `docente` / `tutor` | Emisor (tutor de curso) |
| Estudiante | `estudiante` | Perfil + justificaciones |
| Padre/Madre de familia | `representante` | Consulta acotada |

---

## 4. Ruta típica de oficio (dónde entra DECE)

Ejemplos (ajustables por tipo de documento):

```
Tutor (emisor) → Inspector → DECE → Secretaría (entrega) → Rector
```

o, si el caso es solo pedagógico sin paso DECE:

```
Tutor → Inspector → Rector
```

DECE entra cuando el tipo de oficio o el reglamento interno exige mirada de consejería (refuerzo, convivencia, seguimiento socioemocional).

---

## 5. Cambio técnico mínimo en el alta de usuario

1. Incluir opción en el `<select>` de ROL:  
   `value="dece"` → etiqueta **DECE (Consejería estudiantil)**  
2. Guardar en `perfiles.rol` (o tabla de roles del plantel) el valor `dece`  
3. Menú lateral / guards: si `rol === 'dece'` → acceso a **Oficios → Bandeja por cargo (DECE)**  
4. RLS Supabase: políticas de `oficios` / `oficio_historial` que permitan a `dece` leer y actuar en pasos donde `cargo_actual = 'dece'`  

### SQL (ampliar check si hace falta)

```sql
-- Si el check de perfiles es restrictivo, alinearlo a los roles reales del plantel:
alter table public.perfiles drop constraint if exists perfiles_rol_check;
alter table public.perfiles add constraint perfiles_rol_check check (rol in (
  'admin_plantel','supervisor','inspector','dece','secretaria','contador',
  'administrativo','docente','tutor','estudiante','representante',
  'vicerrector','rector','admin'
));
```

---

## 6. Criterio de asignación

- Un usuario DECE = personal del **Departamento de Consejería Estudiantil** del plantel  
- Puede haber más de un usuario con rol DECE en el mismo plantel (comparten la misma cola)  
- No usar el rol Docente ni Administrativo como “atajo” para DECE: rompe la bandeja por cargo y la auditoría  

---

## 7. Checklist para quien mantiene SIGEE (producción)

- [ ] Añadir **DECE** al dropdown de Nuevo usuario  
- [ ] Persistir código `dece` en BD  
- [ ] Visible en listado de usuarios y filtros de Soporte TIC (rol)  
- [ ] Entrar con ese usuario y ver **Bandeja por cargo → DECE**  
- [ ] Probar aprobar / devolver oficio en paso DECE  
- [ ] No darle menús de Admin/Contador  

Documento de referencia en repo oficios: bandeja por cargo y `CLAUDE.md` (roles).
