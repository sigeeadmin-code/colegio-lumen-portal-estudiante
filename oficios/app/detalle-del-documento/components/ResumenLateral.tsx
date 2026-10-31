import React from 'react';
import Link from 'next/link';
import { Timer, Undo2, Layers, CornerUpLeft, Users, ArrowUpRight } from 'lucide-react';

export default function ResumenLateral() {
  return (
    <div className="space-y-5 print-hide">
      <section aria-label="Indicadores del trámite" className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-base font-semibold text-foreground">Indicadores del trámite</h3>
          <p className="text-xs text-muted-foreground">Derivados del historial inmutable</p>
        </div>
        <dl className="divide-y divide-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/15 text-warning">
              <Timer className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted-foreground">Tiempo total del trámite</dt>
              <dd className="text-sm font-bold tabular text-foreground">3 d 2 h (74 h)</dd>
            </div>
            <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[11px] font-bold text-warning">Meta 72 h</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <Undo2 className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted-foreground">Devoluciones</dt>
              <dd className="text-sm font-bold tabular text-foreground">2 observaciones</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/15 text-info">
              <Layers className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted-foreground">Versión actual del PDF</dt>
              <dd className="text-sm font-bold tabular text-foreground">v2 de 5 permitidas</dd>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-secondary-foreground">
              <Users className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <dt className="text-xs text-muted-foreground">Destinatario</dt>
              <dd className="truncate text-sm font-bold text-foreground">Rep. legal de Mateo Cárdenas</dd>
            </div>
          </div>
        </dl>
      </section>

      <section aria-label="Documentos relacionados" className="rounded-lg border border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <h3 className="text-base font-semibold text-foreground">Documentos relacionados</h3>
          <p className="text-xs text-muted-foreground">Mismo estudiante · periodo 2026-2027</p>
        </div>
        <ul className="divide-y divide-border">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-muted/50"
            >
              <CornerUpLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="font-doc text-sm font-semibold text-primary">0156-2026-UEIPP</p>
                <p className="truncate text-xs text-muted-foreground">Informe de seguimiento (hijo) · Borrador</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-muted/50"
            >
              <CornerUpLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="font-doc text-sm font-semibold text-primary">0129-2026-UEIPP</p>
                <p className="truncate text-xs text-muted-foreground">Plan de refuerzo · Aprobado final</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
