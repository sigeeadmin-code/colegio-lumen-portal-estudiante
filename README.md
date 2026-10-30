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

### Documentación completa del flujo

Ver: **[docs/FLUJO-OFICIOS-ENLAZADO.md](docs/FLUJO-OFICIOS-ENLAZADO.md)**

### Resumen rápido

```
Calificaciones / Alertas de rendimiento  ──┐
                                           ├──►  OFICIOS / DOCUMENTAL
Asistencia / Justificaciones             ──┘         (módulo único)
                                                      • Lista
                                                      • Recorrido (Tutor → Inspector → Secretaría)
                                                      • Estados, versiones, editor
```

- **“+ Nuevo documento”** → solo para oficios manuales / ad-hoc.
- Generar oficio desde Calificaciones o Asistencia → crea el registro **dentro** de Oficios / documental y redirige al detalle de ese documento.

---

## Estructura del repositorio

```
colegio-lumen-portal-estudiante/
├── index.html                      # Inicio
├── mi-perfil/index.html            # Perfil estudiante (solo lectura)
├── justificaciones/index.html      # Justificaciones + modal
├── docs/
│   └── FLUJO-OFICIOS-ENLAZADO.md   # Especificación del flujo de oficios
└── README.md
```

## Tecnologías

- HTML5 + Tailwind CSS (CDN)
- JavaScript vanilla
- Responsive

## Despliegue

Listo para GitHub Pages, Vercel, Netlify o para que Claude lo despliegue.

---

**Colegio Lumen** · Cumplimiento del Reglamento del Ministerio de Educación del Ecuador.
