import React from 'react';

/**
 * Plantilla formal de comunicación de inasistencia
 * Alineada al Reglamento General a la LOEI (Arts. 171 y 172)
 * y a la práctica documental de instituciones educativas del Ministerio de Educación.
 *
 * modo "entrega"  = copia limpia para el representante
 * modo "auditoria" = incluye pie de recorrido interno
 */
export default function PlantillaComunicacionInasistencia({
  modo = 'entrega',
}: {
  modo?: 'entrega' | 'auditoria';
}) {
  return (
    <article className="mx-auto w-full max-w-[820px] rounded-md border border-border bg-card p-6 shadow-sm paper-grain md:p-10">
      <header className="border-b-2 border-primary pb-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          República del Ecuador · Ministerio de Educación
        </p>
        <h3 className="mt-1 text-lg font-bold uppercase tracking-wide text-primary">
          Unidad Educativa Ismael Pérez Pazmiño
        </h3>
        <p className="font-doc text-xs text-muted-foreground">
          AMIE 07H00094 · Zona 7 · Distrito 07D02 · Machala, El Oro
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">Periodo lectivo 2026-2027</p>
      </header>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-3 text-sm">
        <div>
          <p className="font-semibold uppercase tracking-wide text-foreground">
            Comunicación de inasistencia
          </p>
          <p className="font-doc text-primary">Oficio N.º 0158-2026-UEIPP</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Fundamento: Reglamento a la LOEI, Arts. 171 y 172
          </p>
        </div>
        <p className="text-muted-foreground">Machala, 31 de octubre de 2026</p>
      </div>

      <div className="mt-5 space-y-1 text-sm text-foreground">
        <p>
          <span className="font-semibold">Señor(a):</span> Marcela Loaiza Hidalgo
        </p>
        <p>
          <span className="font-semibold">Representante legal de:</span> Mateo Andrés Cárdenas
          Loaiza
        </p>
        <p>
          <span className="font-semibold">Curso / paralelo:</span> 10.º de Educación General Básica
          · Paralelo A · Jornada Matutina
        </p>
        <p>
          <span className="font-semibold">Cédula del estudiante:</span> 0705381246
        </p>
        <p className="pt-1">
          <span className="font-semibold">De:</span> Lcda. Karina Zambrano · Tutora de curso
        </p>
        <p>
          <span className="font-semibold">Asunto:</span> Notificación de inasistencia y solicitud
          de justificación conforme al Art. 171 del Reglamento a la LOEI
        </p>
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground">
        <p>De mi consideración:</p>
        <p>
          Por medio del presente, y en cumplimiento de lo dispuesto en el{' '}
          <span className="font-semibold">
            artículo 171 del Reglamento General a la Ley Orgánica de Educación Intercultural
          </span>
          , me permito poner en su conocimiento que el estudiante{' '}
          <span className="font-semibold">Mateo Andrés Cárdenas Loaiza</span> registra las
          siguientes inasistencias en el presente periodo lectivo:
        </p>
      </div>

      <div className="mt-4 overflow-x-auto scroll-thin">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <caption className="mb-2 text-left text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Registro de inasistencias
          </caption>
          <thead>
            <tr className="bg-muted text-left text-[12px] uppercase tracking-wide text-muted-foreground">
              <th className="border border-border px-3 py-2 font-semibold">Fecha</th>
              <th className="border border-border px-3 py-2 font-semibold">Tipo</th>
              <th className="border border-border px-3 py-2 font-semibold">Jornadas / horas</th>
              <th className="border border-border px-3 py-2 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-3 py-2">28/10/2026</td>
              <td className="border border-border px-3 py-2">Inasistencia</td>
              <td className="border border-border px-3 py-2 text-right tabular">1 jornada</td>
              <td className="border border-border px-3 py-2 text-warning font-medium">Sin justificar</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">29/10/2026</td>
              <td className="border border-border px-3 py-2">Inasistencia</td>
              <td className="border border-border px-3 py-2 text-right tabular">1 jornada</td>
              <td className="border border-border px-3 py-2 text-warning font-medium">Sin justificar</td>
            </tr>
            <tr>
              <td className="border border-border px-3 py-2">30/10/2026</td>
              <td className="border border-border px-3 py-2">Inasistencia</td>
              <td className="border border-border px-3 py-2 text-right tabular">1 jornada</td>
              <td className="border border-border px-3 py-2 text-warning font-medium">Sin justificar</td>
            </tr>
            <tr className="bg-muted/50">
              <td colSpan={2} className="border border-border px-3 py-2 text-right font-semibold">
                Total días continuos
              </td>
              <td className="border border-border px-3 py-2 text-right font-bold tabular">3</td>
              <td className="border border-border px-3 py-2 text-destructive font-semibold">
                Requiere justificación ante Inspectoría
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-md border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
        <p className="font-semibold">Plazos y obligaciones (Art. 171)</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>
            La inasistencia de uno (1) o dos (2) días debe justificarse a más tardar hasta dos (2)
            días después del retorno del estudiante a clases, ante el tutor de curso.
          </li>
          <li>
            Si la inasistencia excediere tres (3) días continuos, el representante legal deberá
            justificarla, con la documentación respectiva, ante la máxima autoridad o el Inspector
            General de la institución educativa.
          </li>
          <li>
            Causales habituales de justificación: enfermedad del estudiante (certificado médico),
            calamidad doméstica, permisos especiales autorizados, entre otros contemplados en la
            normativa.
          </li>
        </ul>
      </div>

      <div className="mt-4 rounded-md border border-warning/30 bg-warning/5 px-4 py-3 text-sm text-foreground">
        <p className="font-semibold text-warning">Advertencia – Art. 172</p>
        <p className="mt-1 text-muted-foreground">
          En Educación Básica Superior y Bachillerato, las inasistencias injustificadas que excedan
          el <span className="font-semibold text-foreground">diez por ciento (10 %)</span> del total
          de horas de clase del año lectivo en una o más asignaturas conllevan la{' '}
          <span className="font-semibold text-foreground">reprobación</span> de dichas asignaturas.
          Se solicita su pronta gestión para evitar afectar la promoción del estudiante.
        </p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-foreground">
        En virtud de lo anterior, le solicito comedidamente presentar la justificación
        correspondiente, con la documentación de respaldo, en la oficina de Inspección General, en el
        horario de atención institucional, a más tardar el{' '}
        <span className="font-semibold">4 de noviembre de 2026</span>.
      </p>

      <p className="mt-3 text-sm text-foreground">Particular que comunico para los fines pertinentes.</p>
      <p className="mt-2 text-sm text-foreground">Atentamente,</p>

      <div className="mt-10 grid grid-cols-1 gap-8 text-center text-sm sm:grid-cols-3">
        <div>
          <div className="border-t border-foreground/60 pt-2">
            <p className="font-semibold text-foreground">Lcda. Karina Zambrano</p>
            <p className="text-xs text-muted-foreground">Tutora de 10.º A</p>
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
            <p className="text-xs text-muted-foreground">Fecha: ____ / ____ / ______</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
        <p>
          Documento emitido en el marco del Sistema Nacional de Educación. La notificación oportuna a
          los representantes legales constituye obligación institucional conforme al Reglamento a la
          LOEI. El historial de este trámite se registra de forma inmutable en el módulo institucional
          de Oficios.
        </p>
      </footer>

      {modo === 'auditoria' && (
        <div className="mt-6 rounded-md border-2 border-dashed border-accent/60 bg-accent/5 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            Anexo de uso interno · recorrido del trámite
          </p>
          <p className="mt-1 text-sm text-foreground">
            Origen: módulo Asistencia · Emisor: Tutor · Destino de ruta: Inspector General · Ver
            pestaña «Recorrido» para tiempos de espera y acciones.
          </p>
        </div>
      )}
    </article>
  );
}
