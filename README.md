# Colegio Lumen – Portal del Estudiante

Módulos implementados para el acceso de **estudiante**:

- **Mi Perfil** (solo lectura)
- **Justificaciones de Inasistencia** (con flujo oficial del Ministerio de Educación)

---

## 1. Mi Perfil (solo lectura)

Ruta: `/mi-perfil/`

Muestra de forma clara y profesional:

- Datos personales del estudiante
- Datos de los padres de familia
- **Representante de emergencia** con botón de llamada directa (`tel:`)

Todo es de solo visualización. No se permite edición desde el acceso del estudiante.

---

## 2. Justificaciones de Inasistencia

Ruta: `/justificaciones/`

### Flujo de aprobación (según Reglamento del Ministerio de Educación del Ecuador)

Cuando el estudiante (o su representante) registra una justificación:

1. **Estudiante / Representante**  
   Registra la fecha, la asignatura, el motivo y adjunta evidencia (certificado médico, etc.).

2. **Docente de la materia**  
   Recibe **notificación automática** de que la falta de su asignatura ha sido justificada.  
   (La falta pasa a estado “justificado” en su registro de asistencia).

3. **Tutor de curso**  
   Visualiza el caso y da seguimiento.  
   Puede ver el historial y el estado del trámite.

4. **Inspector de curso**  
   Es la **autoridad que aprueba o rechaza** la justificación de forma definitiva, conforme al reglamento vigente.

### Comunicación automática

Al momento de enviar la justificación el sistema genera las notificaciones a:

- Docente de la asignatura seleccionada
- Tutor de curso
- Inspector de curso

No es necesario enviar oficios manuales para el flujo estándar de justificación de inasistencia.

---

## 3. Módulo de Oficios (en elaboración)

Se está diseñando un **módulo de recorrido de oficios** que permitirá:

- Crear oficios formales (solicitudes, informes, comunicaciones)
- Definir el circuito de revisión y firma (recorrido)
- Seguimiento de estado (borrador → en revisión → firmado → archivado)
- Notificaciones a cada actor del recorrido
- Generación de PDF con membrete institucional

Este módulo será la base para trámites más formales (permisos especiales, reportes de inspectoría, etc.) y se integrará con el flujo de justificaciones cuando se requiera un documento oficial.

---

## Estructura del proyecto

```
colegio-lumen/
├── mi-perfil/
│   └── index.html          # Perfil del estudiante (solo lectura)
├── justificaciones/
│   └── index.html          # Listado + modal de nueva justificación
├── docs/                   # Documentación adicional (próximamente)
└── README.md
```

## Tecnologías

- HTML5 semántico
- Tailwind CSS (CDN)
- JavaScript vanilla
- Diseño responsive y accesible

## Despliegue

Este repositorio está preparado para ser desplegado por Claude o cualquier plataforma de hosting estático (Vercel, Netlify, GitHub Pages, etc.).

---

**Colegio Lumen** · Portal Académico  
Cumplimiento del Reglamento del Ministerio de Educación del Ecuador.
