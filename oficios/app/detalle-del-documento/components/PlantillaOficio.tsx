import React from 'react';
import { NOTAS_0142 } from '@/lib/oficios-data';

export default function PlantillaOficio({ modo = 'entrega' }: { modo?: 'entrega' | 'auditoria' }) {
  const promedioGeneral = NOTAS_0142.reduce((a, n) => a + n.promedio, 0) / NOTAS_0142.length;
  return (
    <article className="mx-auto w-full max-w-[820px] rounded-md border border-border bg-card p-6 shadow-sm paper-grain md:p-10">
      <header className="border-b-2 border-primary pb-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">República del Ecuador · Ministerio de Educación</p>
        <h3 className="mt-1 text-lg font-bold uppercase tracking-wide text-primary">Unidad Educativa Ismael Pérez Pazmiño</h3>
        <p className="font-doc text-xs text-muted-foreground">AMIE 07H00094 · Zona 7 · Machala, El Oro</p>
      </header>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-3 text-sm">
        <div>
          <p className="font-semibold text-foreground">OFICIO DE ALERTA ACADÉMICA</p>
          <p className="font-doc text-primary">N° 0142-2026-UEIPP</p>
        </div>
        <p className="text-muted-foreground">Machala, 26 de octubre de 2026</p>
      </div>

      <div className="mt-5 space-y-1 text-sm text-foreground">
        <p><span className="font-semibold">Para:</span> Sr./Sra. Representante legal de Mateo Andrés Cárdenas Loaiza</p>
        <p><span className="font-semibold">De:</span> Lcda. Karina Zambrano, Tutora de 10mo A</p>
        <p><span className="font-semibold">Asunto:</span> Citación a reunión por bajo rendimiento en Matemática y Física</p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-foreground">
        De mi consideración: por medio del presente le informo que el estudiante Mateo Andrés Cárdenas Loaiza, de 10mo A, registra un promedio inferior al mínimo requerido (7,00) en las asignaturas de Matemática y Física durante el primer parcial. Con el fin de acordar acciones de acompañamiento, solicito su presencia en la reunión del <span className="font-semibold">jueves 29 de octubre de 2026, a las 10h30</span>, en la oficina de Inspección General.
      </p>

      <div className="mt-5 overflow-x-auto scroll-thin">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <caption className="mb-2 text-left text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Resumen de calificaciones y asistencia
          </caption>
          <thead>
            <tr className="bg-muted text-left text-[12px] uppercase tracking-wide text-muted-foreground">
              <th className="border border-border px-3 py-2 font-semibold">Asignatura</th>
              <th className="border border-border px-3 py-2 font-semibold">Docente</th>
              <th className="border border-border px-3 py-2 text-right font-semibold">P1</th>
              <th className="border border-border px-3 py-2 text-right font-semibold">P2</th>
              <th className="border border-border px-3 py-2 text-right font-semibold">Promedio</th>
              <th className="border border-border px-3 py-2 text-right font-semibold">Faltas</th>
            </tr>
          </thead>
          <tbody>
            {NOTAS_0142.map((n) => (
              <tr key={n.id} className={n.promedio < 7 ? 'bg-destructive/5' : ''}>
                <td className="border border-border px-3 py-2 font-medium text-foreground">{n.materia}</td>
                <td className="border border-border px-3 py-2 text-muted-foreground">{n.docente}</td>
                <td className="border border-border px-3 py-2 text-right tabular text-foreground">{n.p1.toFixed(2)}</td>
                <td className="border border-border px-3 py-2 text-right tabular text-foreground">{n.p2.toFixed(2)}</td>
                <td className={`border border-border px-3 py-2 text-right font-bold tabular ${n.promedio < 7 ? 'text-destructive' : 'text-success'}`}>
                  {n.promedio.toFixed(2)}
                </td>
                <td className="border border-border px-3 py-2 text-right tabular text-foreground">{n.faltas}</td>
              </tr>
            ))}
            <tr className="bg-muted/60">
              <td colSpan={4} className="border border-border px-3 py-2 text-right font-semibold text-foreground">Promedio general</td>
              <td className="border border-border px-3 py-2 text-right font-bold tabular text-warning">{promedioGeneral.toFixed(2)}</td>
              <td className="border border-border px-3 py-2 text-right font-semibold tabular text-foreground">7</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
        <p className="font-semibold">Acciones de refuerzo sugeridas para la familia</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Acompañar 30 minutos diarios de repaso en Matemática con resolución de ejercicios.</li>
          <li>Asistir a las tutorías de Física los martes y jueves de 14h00 a 15h00.</li>
          <li>Verificar semanalmente la libreta de tareas con firma del tutor.</li>
        </ul>
      </div>

      <p className="mt-5 text-sm text-foreground">Particular que comunico para los fines pertinentes.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 text-center text-sm sm:grid-cols-3">
        <div>
          <div className="border-t border-foreground/60 pt-2">
            <p className="font-semibold text-foreground">Lcda. Karina Zambrano</p>
            <p className="text-xs text-muted-foreground">Docente tutora</p>
          </div>
        </div>
        <div>
          <div className="border-t border-foreground/60 pt-2">
            <p className="font-semibold text-foreground">Mgs. Ricardo Palacios</p>
            <p className="text-xs text-muted-foreground">Inspector General</p>
          </div>
        </div>
        <div>
          <div className="border-t border-foreground/60 pt-2">
            <p className="font-semibold text-foreground">Representante legal</p>
            <p className="text-xs text-muted-foreground">Acuse de recibido · CI ___________</p>
          </div>
        </div>
      </div>

      {modo === 'auditoria' && (
        <div className="mt-8 rounded-md border-2 border-dashed border-accent/60 bg-accent/5 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Anexo de uso interno · recorrido del trámite</p>
          <p className="mt-1 text-sm text-foreground">
            Cadena de vistos: Tutor (emitió) → Inspector General (aprobó v2) → Rector (observó v2). Ver pestaña «Recorrido» para tiempos de espera por paso.
          </p>
        </div>
      )}
    </article>
  );
}
