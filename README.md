# Colegio Lumen – Portal del Estudiante & Especificaciones

## Módulos del estudiante (implementados)

| Módulo | Ruta | Descripción |
|--------|------|-------------|
| **Mi Perfil** | `/mi-perfil/` | Solo lectura. Datos personales, familiares y representante de emergencia con botón **Llamar**. |
| **Justificaciones** | `/justificaciones/` | Listado + modal profesional. Flujo: Estudiante → Docente de la materia → Tutor → Inspector. |

---

## Flujo de Oficios (arquitectura correcta)

> **Regla de oro:** Todo oficio vive en el módulo **Oficios / documental**.  
> Los oficios generados desde Calificaciones o Asistencia **se enlazan**, no se crean como documentos independientes.

### Documentación

| Documento | Contenido |
|-----------|-----------|
| [docs/FLUJO-OFICIOS-ENLAZADO.md](docs/FLUJO-OFICIOS-ENLAZADO.md) | Cómo se enlazan los oficios desde Calificaciones y Asistencia |
| [docs/UI-OFICIOS-DASHBOARD.md](docs/UI-OFICIOS-DASHBOARD.md) | **UI de referencia completa** del dashboard de Oficios (bandeja emisor, bandeja por cargo, detalle, cola de despacho) |
| `docs/oficios-ui/*.png` | Capturas de pantalla del diseño objetivo |

### Resumen del flujo

```
Calificaciones / Alertas de rendimiento  ──┐
                                           ├──►  OFICIOS / DOCUMENTAL
Asistencia / Justificaciones             ──┘         (módulo único)
                                                      • Bandeja del emisor
                                                      • Bandeja por cargo
                                                      • Detalle + ruta + versiones
                                                      • Cola de despacho con SLA
```

---

## Estructura del repositorio

```
colegio-lumen-portal-estudiante/
├── index.html
├── mi-perfil/index.html
├── justificaciones/index.html
├── docs/
│   ├── FLUJO-OFICIOS-ENLAZADO.md
│   ├── UI-OFICIOS-DASHBOARD.md      ← UI de referencia
│   └── oficios-ui/                 ← capturas PNG (subir)
└── README.md
```

## Despliegue

Listo para GitHub Pages, Vercel, Netlify o para que Claude lo despliegue.

---

**Colegio Lumen** · Cumplimiento del Reglamento del Ministerio de Educación del Ecuador.
