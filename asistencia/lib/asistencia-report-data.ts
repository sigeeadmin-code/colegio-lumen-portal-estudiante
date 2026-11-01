/** Datos mock para reporte mensual de asistencia — SIGEE */

export const MESES = [
  { value: '2026-09', label: 'Septiembre 2026' },
  { value: '2026-10', label: 'Octubre 2026' },
  { value: '2026-11', label: 'Noviembre 2026' },
];

export const CURSOS_PARALELOS = [
  { curso: '10mo', paralelo: 'A' },
  { curso: '10mo', paralelo: 'B' },
  { curso: '9no', paralelo: 'A' },
  { curso: '9no', paralelo: 'C' },
  { curso: '1ro Bach', paralelo: 'A' },
];

export interface ResumenCurso {
  curso: string;
  paralelo: string;
  tutor: string;
  estudiantes: number;
  diasLectivos: number;
  presentes: number;
  justificadas: number;
  injustificadas: number;
  atrasos: number;
  porcentajeAsistencia: number;
}

export interface DetalleAlumno {
  id: string;
  nombre: string;
  cedula: string;
  curso: string;
  paralelo: string;
  presentes: number;
  justificadas: number;
  faltasInjustificadas: number;
  atrasos: number;
  porcentajeAsistencia: number;
  porcentajeInjustificado: number;
}

export const RESUMEN_POR_CURSO: ResumenCurso[] = [
  {
    curso: '10mo',
    paralelo: 'A',
    tutor: 'Lcda. Karina Zambrano',
    estudiantes: 32,
    diasLectivos: 20,
    presentes: 580,
    justificadas: 28,
    injustificadas: 22,
    atrasos: 15,
    porcentajeAsistencia: 96.6,
  },
  {
    curso: '10mo',
    paralelo: 'B',
    tutor: 'Ing. Pablo Encalada',
    estudiantes: 30,
    diasLectivos: 20,
    presentes: 540,
    justificadas: 20,
    injustificadas: 30,
    atrasos: 12,
    porcentajeAsistencia: 95.0,
  },
  {
    curso: '9no',
    paralelo: 'A',
    tutor: 'Lcda. Rosa Encarnación',
    estudiantes: 28,
    diasLectivos: 20,
    presentes: 510,
    justificadas: 18,
    injustificadas: 16,
    atrasos: 8,
    porcentajeAsistencia: 97.1,
  },
  {
    curso: '9no',
    paralelo: 'C',
    tutor: 'Lcda. Karina Zambrano',
    estudiantes: 29,
    diasLectivos: 20,
    presentes: 500,
    justificadas: 25,
    injustificadas: 35,
    atrasos: 20,
    porcentajeAsistencia: 93.8,
  },
  {
    curso: '1ro Bach',
    paralelo: 'A',
    tutor: 'Mgs. Ana Lucía Méndez',
    estudiantes: 26,
    diasLectivos: 20,
    presentes: 480,
    justificadas: 15,
    injustificadas: 12,
    atrasos: 6,
    porcentajeAsistencia: 97.7,
  },
];

export const DETALLE_POR_ALUMNO: DetalleAlumno[] = [
  {
    id: '1',
    nombre: 'Mateo Andrés Cárdenas Loaiza',
    cedula: '0705381246',
    curso: '10mo',
    paralelo: 'A',
    presentes: 17,
    justificadas: 1,
    faltasInjustificadas: 2,
    atrasos: 1,
    porcentajeAsistencia: 90.0,
    porcentajeInjustificado: 10.0,
  },
  {
    id: '2',
    nombre: 'Isabella Monserrate Fajardo',
    cedula: '0706123456',
    curso: '10mo',
    paralelo: 'A',
    presentes: 19,
    justificadas: 1,
    faltasInjustificadas: 0,
    atrasos: 0,
    porcentajeAsistencia: 100.0,
    porcentajeInjustificado: 0,
  },
  {
    id: '3',
    nombre: 'Génesis Priscila Mena Loaiza',
    cedula: '0705987654',
    curso: '10mo',
    paralelo: 'A',
    presentes: 16,
    justificadas: 2,
    faltasInjustificadas: 2,
    atrasos: 3,
    porcentajeAsistencia: 90.0,
    porcentajeInjustificado: 10.0,
  },
  {
    id: '4',
    nombre: 'Alison Pamela Granda Lojano',
    cedula: '0705234567',
    curso: '9no',
    paralelo: 'C',
    presentes: 15,
    justificadas: 1,
    faltasInjustificadas: 4,
    atrasos: 2,
    porcentajeAsistencia: 80.0,
    porcentajeInjustificado: 20.0,
  },
  {
    id: '5',
    nombre: 'Josué Emanuel Chamba Reyes',
    cedula: '0705345678',
    curso: '10mo',
    paralelo: 'B',
    presentes: 18,
    justificadas: 0,
    faltasInjustificadas: 2,
    atrasos: 1,
    porcentajeAsistencia: 90.0,
    porcentajeInjustificado: 10.0,
  },
  {
    id: '6',
    nombre: 'Valentina Sofía Ríos Paredes',
    cedula: '0705456789',
    curso: '9no',
    paralelo: 'A',
    presentes: 20,
    justificadas: 0,
    faltasInjustificadas: 0,
    atrasos: 0,
    porcentajeAsistencia: 100.0,
    porcentajeInjustificado: 0,
  },
];
