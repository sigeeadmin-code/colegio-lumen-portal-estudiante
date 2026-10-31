'use client';

import React from 'react';
import {
  Pencil,
  Send,
  Printer,
  FileClock,
  PackageCheck,
  Lock,
  Info,
} from 'lucide-react';
import type { EstadoDocumento } from '@/lib/oficios-data';

interface Props {
  estado: EstadoDocumento;
  esEmisor: boolean;
  onEditar: () => void;
  onReenviar: () => void;
  onImprimirEntrega: () => void;
  onImprimirRecorrido: () => void;
  onRegistrarEntrega: () => void;
}

export default function AccionesPanel({
  estado,
  esEmisor,
  onEditar,
  onReenviar,
  onImprimirEntrega,
  onImprimirRecorrido,
  onRegistrarEntrega,
}: Props) {
  const puedeEditar = esEmisor && (estado === 'borrador' || estado === 'observado');
  const puedeReenviar = esEmisor && estado === 'observado';
  const puedeEntregar = estado === 'aprobado_final';
  const soloLectura = estado === 'archivado' || estado === 'rechazado' || estado === 'entregado';

  return (
    <section aria-label="Acciones del documento" className="rounded-lg border border-border bg-card print-hide">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-base font-semibold text-foreground">Acciones disponibles</h3>
        <p className="text-xs text-muted-foreground">Según tu rol (emisor) y el estado «{estado.replace('_', ' ')}»</p>
      </div>
      <div className="space-y-2 p-4">
        {puedeEditar && (
          <button
            type="button"
            onClick={onEditar}
            className="flex w-full items-center gap-3 rounded-md border border-input bg-card px-3.5 py-2.5 text-left text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted active:scale-[0.98]"
          >
            <Pencil className="h-4 w-4 text-primary" />
            Corregir plantilla
            <span className="ml-auto text-xs font-medium text-muted-foreground">crea v3</span>
          </button>
        )}
        {puedeReenviar && (
          <button
            type="button"
            onClick={onReenviar}
            className="flex w-full items-center gap-3 rounded-md bg-primary px-3.5 py-2.5 text-left text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-[0.98]"
          >
            <Send className="h-4 w-4" />
            Reenviar al Rector
            <span className="ml-auto text-xs font-medium text-primary-foreground/80">paso 3</span>
          </button>
        )}
        {puedeEntregar && (
          <button
            type="button"
            onClick={onRegistrarEntrega}
            className="flex w-full items-center gap-3 rounded-md bg-success px-3.5 py-2.5 text-left text-sm font-semibold text-success-foreground transition-all duration-150 hover:bg-success/90 active:scale-[0.98]"
          >
            <PackageCheck className="h-4 w-4" />
            Registrar entrega al representante
          </button>
        )}
        {soloLectura && (
          <div className="flex items-start gap-3 rounded-md bg-muted px-3.5 py-2.5 text-sm text-muted-foreground">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />
            Documento cerrado: solo lectura e impresión.
          </div>
        )}
        {!puedeEditar && !puedeReenviar && !puedeEntregar && !soloLectura && (
          <div className="flex items-start gap-3 rounded-md bg-info/10 px-3.5 py-2.5 text-sm text-info">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Este documento está en el despacho de otro cargo. Solo puedes consultarlo.
          </div>
        )}

        <div className="my-1 h-px bg-border" />

        <button
          type="button"
          onClick={onImprimirEntrega}
          className="flex w-full items-center gap-3 rounded-md border border-input bg-card px-3.5 py-2.5 text-left text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted active:scale-[0.98]"
        >
          <Printer className="h-4 w-4 text-secondary-foreground" />
          Imprimir para entrega
          <span className="ml-auto text-xs font-medium text-muted-foreground">copia limpia</span>
        </button>
        <button
          type="button"
          onClick={onImprimirRecorrido}
          className="flex w-full items-center gap-3 rounded-md border border-accent/40 bg-accent/5 px-3.5 py-2.5 text-left text-sm font-semibold text-foreground transition-all duration-150 hover:bg-accent/10 active:scale-[0.98]"
        >
          <FileClock className="h-4 w-4 text-accent" />
          Imprimir con recorrido
          <span className="ml-auto rounded bg-accent/15 px-1.5 py-0.5 text-[11px] font-bold text-accent">uso interno</span>
        </button>
      </div>
    </section>
  );
}
