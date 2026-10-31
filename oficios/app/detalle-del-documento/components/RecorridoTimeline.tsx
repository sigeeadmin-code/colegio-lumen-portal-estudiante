import React from 'react';
import {
  FilePlus2,
  Inbox,
  CheckCircle2,
  MessageSquareWarning,
  RefreshCcw,
  Ban,
  PackageCheck,
  Archive,
  Lock,
} from 'lucide-react';
import {
  HISTORIAL_0142,
  CARGO_LABEL,
  formatMinutos,
  type AccionHistorial,
} from '@/lib/oficios-data';
import EsperaPasoChart from '@/app/detalle-del-documento/components/EsperaPasoChart';

const ACCION_META: Record<AccionHistorial, { label: string; icon: React.ReactNode; tono: string }> = {
  emitido: { label: 'Emitido', icon: <FilePlus2 className="h-4 w-4" />, tono: 'bg-primary text-primary-foreground' },
  recibido: { label: 'Recibido', icon: <Inbox className="h-4 w-4" />, tono: 'bg-info text-info-foreground' },
  aprobado: { label: 'Aprobado', icon: <CheckCircle2 className="h-4 w-4" />, tono: 'bg-success text-success-foreground' },
  observado: { label: 'Observado', icon: <MessageSquareWarning className="h-4 w-4" />, tono: 'bg-warning text-warning-foreground' },
  reenviado: { label: 'Reenviado', icon: <RefreshCcw className="h-4 w-4" />, tono: 'bg-info text-info-foreground' },
  rechazado: { label: 'Rechazado', icon: <Ban className="h-4 w-4" />, tono: 'bg-destructive text-destructive-foreground' },
  entregado: { label: 'Entregado', icon: <PackageCheck className="h-4 w-4" />, tono: 'bg-success text-success-foreground' },
  archivado: { label: 'Archivado', icon: <Archive className="h-4 w-4" />, tono: 'bg-secondary text-secondary-foreground' },
};

export default function RecorridoTimeline() {
  const totalMin = HISTORIAL_0142.reduce((a, h) => a + h.esperaMinutos, 0);
  const devoluciones = HISTORIAL_0142.filter((h) => h.accion === 'observado').length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">Tiempo total de espera</p>
          <p className="mt-1 text-2xl font-bold tabular text-foreground">{formatMinutos(totalMin)}</p>
          <p className="text-xs text-muted-foreground">Suma de los {HISTORIAL_0142.length} pasos registrados</p>
        </div>
        <div className="rounded-lg border border-warning/30 bg-warning/5 px-4 py-3">
          <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">Devoluciones</p>
          <p className="mt-1 text-2xl font-bold tabular text-warning">{devoluciones}</p>
          <p className="text-xs text-muted-foreground">Inspector (v1) y Rector (v2)</p>
        </div>
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">Versión del PDF</p>
          <p className="mt-1 text-2xl font-bold tabular text-foreground">v2</p>
          <p className="text-xs text-muted-foreground">Límite de alerta: versión 5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="rounded-lg border border-border bg-card xl:col-span-3">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">Historial de recorrido</h3>
              <p className="text-xs text-muted-foreground">Registro solo-append: no puede editarse ni eliminarse</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Inmutable
            </span>
          </div>
          <ol className="relative px-4 py-4">
            {HISTORIAL_0142.map((h, i) => {
              const meta = ACCION_META[h.accion];
              const last = i === HISTORIAL_0142.length - 1;
              return (
                <li key={h.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {!last && <span className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5 bg-border" />}
                  <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${meta.tono}`}>
                    {meta.icon}
                  </span>
                  <div className="min-w-0 flex-1 rounded-lg border border-border bg-background/60 px-3.5 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {meta.label} · {CARGO_LABEL[h.cargo]}
                      </p>
                      <span className="rounded bg-muted px-1.5 py-0.5 font-doc text-xs font-semibold text-muted-foreground">
                        PDF v{h.versionPdf}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{h.usuario}</p>
                    <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                      <div>
                        <dt className="text-muted-foreground">Entrada</dt>
                        <dd className="font-doc font-semibold text-foreground">{h.fechaEntrada}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Acción</dt>
                        <dd className="font-doc font-semibold text-foreground">{h.fechaAccion}</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Tiempo de espera</dt>
                        <dd
                          className={`font-semibold tabular ${
                            h.esperaMinutos > 1440 ? 'text-destructive' : h.esperaMinutos > 600 ? 'text-warning' : 'text-foreground'
                          }`}
                        >
                          {formatMinutos(h.esperaMinutos)}
                        </dd>
                      </div>
                    </dl>
                    {h.comentario && (
                      <p
                        className={`mt-2 rounded border-l-2 px-2.5 py-1.5 text-sm ${
                          h.accion === 'observado'
                            ? 'border-warning bg-warning/10 text-warning' :'border-input bg-muted/60 text-foreground'
                        }`}
                      >
                        {h.comentario}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 xl:col-span-2">
          <h3 className="text-base font-semibold text-foreground">Espera por paso</h3>
          <p className="mb-2 text-sm text-muted-foreground">Horas que el documento permaneció en cada despacho</p>
          <EsperaPasoChart />
          <p className="mt-2 rounded-lg bg-destructive/5 px-3 py-2 text-xs text-destructive">
            El paso del Inspector (v1) acumuló 33 h 42 min: es el cuello de botella de este trámite.
          </p>
        </div>
      </div>
    </div>
  );
}
