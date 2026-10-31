'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Search,
  RefreshCw,
  Eye,
  Check,
  MessageSquareWarning,
  Ban,
  AlertTriangle,
} from 'lucide-react';
import {
  COLA_DESPACHO,
  TIPO_LABEL,
  CARGO_CORTO,
  formatHoras,
  type DocumentoCola,
  type TipoDocumento,
  type CargoDespacho,
} from '@/lib/oficios-data';
import { EstadoBadge, TipoBadge, VersionChip } from '@/components/ui/Badge';
import { RouteMini } from '@/components/ui/RouteStepper';
import Tooltip from '@/components/ui/Tooltip';
import EmptyState from '@/components/ui/EmptyState';
import TableSkeleton from '@/components/ui/TableSkeleton';

const CARGOS: { key: CargoDespacho | 'todos'; label: string }[] = [
  { key: 'inspector_general', label: 'Inspector General' },
  { key: 'dece', label: 'DECE' },
  { key: 'vicerrector', label: 'Vicerrector/a' },
  { key: 'rector', label: 'Rector/a' },
  { key: 'secretaria', label: 'Secretaría' },
];

type FiltroCola = 'todos' | 'vencidos' | 'reenviados';

export default function CargoColaTable() {
  const [cargo, setCargo] = useState<CargoDespacho | 'todos'>('inspector_general');
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState<TipoDocumento | 'todos'>('todos');
  const [filtro, setFiltro] = useState<FiltroCola>('todos');
  const [cargando, setCargando] = useState(false);
  const [ultimaCarga, setUltimaCarga] = useState('28/10/2026 08:40');

  const conteoPorCargo = useMemo(() => {
    const out: Record<string, number> = {};
    CARGOS.forEach((c) => {
      if (c.key === 'todos') return;
      out[c.key] = COLA_DESPACHO.filter((d) => d.pasoActual === c.key).length;
    });
    return out;
  }, []);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return COLA_DESPACHO.filter((d) => {
      if (cargo !== 'todos' && d.pasoActual !== cargo) return false;
      if (tipo !== 'todos' && d.tipo !== tipo) return false;
      if (filtro === 'vencidos' && !d.vencido) return false;
      if (filtro === 'reenviados' && d.version < 2) return false;
      if (
        q &&
        !`${d.numero} ${d.asunto} ${d.estudiante} ${d.emisor} ${d.curso}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => b.horasEspera - a.horasEspera);
  }, [cargo, tipo, filtro, busqueda]);

  const vencidosCount = filtrados.filter((d) => d.vencido).length;

  const refrescar = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setUltimaCarga('28/10/2026 08:41');
      toast.success('Cola de despacho actualizada');
    }, 700);
  };

  const decidir = (d: DocumentoCola, accion: 'aprobar' | 'observar' | 'rechazar') => {
    const labels = {
      aprobar: 'aprobado y avanzó al siguiente paso',
      observar: 'devuelto al emisor con observación',
      rechazar: 'rechazado y cerrado',
    };
    toast.success(`${d.numero}: ${labels[accion]}`);
  };

  return (
    <section aria-label="Cola de despacho" className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Cola de despacho</h2>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
              Ordenada por tiempo de espera · actualizada {ultimaCarga}
            </p>
          </div>
          <button
            type="button"
            onClick={refrescar}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
          >
            <RefreshCw className={`h-4 w-4 ${cargando ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>

        <div className="-mb-px flex gap-1 overflow-x-auto scroll-thin" role="tablist">
          {CARGOS.map((c) => {
            const active = cargo === c.key;
            const count = c.key === 'todos' ? COLA_DESPACHO.length : conteoPorCargo[c.key] ?? 0;
            return (
              <button
                key={`cargo-${c.key}`}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCargo(c.key)}
                className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:border-input hover:text-foreground'
                }`}
              >
                {c.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular ${
                    active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {vencidosCount > 0 && (
        <div className="mx-4 mt-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3.5 py-2.5 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <span className="font-semibold">{vencidosCount} documento{vencidosCount > 1 ? 's' : ''}</span>{' '}
            superan las 48 horas en tu despacho. Prioriza los de mayor espera.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <label className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <span className="sr-only">Buscar en la cola</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por N°, estudiante, asunto o emisor…"
            className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Tipo</span>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoDocumento | 'todos')}
            className="h-10 rounded-md border border-input bg-card px-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
          >
            <option value="todos">Todos los tipos</option>
            {(Object.keys(TIPO_LABEL) as TipoDocumento[]).map((k) => (
              <option key={`tipo-${k}`} value={k}>
                {TIPO_LABEL[k]}
              </option>
            ))}
          </select>
        </label>

        <div className="flex rounded-md border border-input bg-card p-0.5" role="group">
          {(
            [
              { key: 'todos', label: 'Todos' },
              { key: 'vencidos', label: 'Vencidos' },
              { key: 'reenviados', label: 'Reenviados' },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFiltro(f.key)}
              className={`rounded px-3 py-1.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                filtro === f.key
                  ? 'bg-primary text-primary-foreground'
                  : 'text-secondary-foreground hover:bg-muted'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {cargando ? (
        <TableSkeleton rows={5} cols={7} />
      ) : filtrados.length === 0 ? (
        <EmptyState
          icon={<InboxEmpty />}
          title="No hay documentos en esta cola"
          description="Cuando un emisor envíe un oficio a tu cargo, aparecerá aquí ordenado por tiempo de espera."
        />
      ) : (
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-[12px] uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">N° / Asunto</th>
                <th className="px-3 py-3 font-semibold">Estudiante</th>
                <th className="px-3 py-3 font-semibold">Curso</th>
                <th className="px-3 py-3 font-semibold">Emisor</th>
                <th className="px-3 py-3 font-semibold">Ruta</th>
                <th className="px-3 py-3 font-semibold">Versión</th>
                <th className="px-3 py-3 font-semibold">Llegada</th>
                <th className="px-3 py-3 font-semibold">
                  Espera / SLA <span className="text-primary">↓</span>
                </th>
                <th className="px-4 py-3 text-right font-semibold">Decidir</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((d) => (
                <tr
                  key={d.id}
                  className="group border-b border-border transition-colors duration-150 even:bg-muted/20 hover:bg-primary/5"
                >
                  <td className="max-w-[260px] px-4 py-3 align-top">
                    <Link
                      href="/detalle-del-documento"
                      className="font-doc text-[13px] font-semibold text-primary hover:underline"
                    >
                      {d.numero}
                    </Link>
                    <p className="mt-0.5 truncate text-sm text-foreground" title={d.asunto}>
                      {d.asunto}
                    </p>
                    <div className="mt-1">
                      <TipoBadge tipo={d.tipo} />
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <p className="max-w-[160px] truncate text-foreground" title={d.estudiante}>
                      {d.estudiante}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-top text-foreground">{d.curso}</td>
                  <td className="px-3 py-3 align-top">
                    <p className="max-w-[140px] truncate text-foreground" title={d.emisor}>
                      {d.emisor}
                    </p>
                  </td>
                  <td className="px-3 py-3 align-top">
                    <p className="mb-1 text-sm font-medium text-foreground">
                      Paso: {CARGO_CORTO[d.pasoActual]}
                    </p>
                    <RouteMini ruta={d.ruta} />
                  </td>
                  <td className="px-3 py-3 align-top">
                    <VersionChip version={d.version} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 align-top font-doc text-xs text-muted-foreground">
                    {d.fechaLlegada}
                  </td>
                  <td className="px-3 py-3 align-top">
                    <span
                      className={`font-semibold tabular ${
                        d.horasEspera > 48
                          ? 'text-destructive'
                          : d.horasEspera > 24
                            ? 'text-warning'
                            : 'text-foreground'
                      }`}
                    >
                      {formatHoras(d.horasEspera)}
                    </span>
                    {d.vencido && (
                      <span className="ml-1.5 rounded bg-destructive/15 px-1.5 py-0.5 text-[11px] font-bold text-destructive">
                        Vencido
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center justify-end gap-0.5">
                      <Tooltip label="Ver detalle">
                        <Link
                          href="/detalle-del-documento"
                          className="rounded-md p-1.5 text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
                          aria-label={`Ver ${d.numero}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Tooltip>
                      <Tooltip label="Aprobar y avanzar">
                        <button
                          type="button"
                          onClick={() => decidir(d, 'aprobar')}
                          className="rounded-md p-1.5 text-success transition-all duration-150 hover:bg-success/10 active:scale-95"
                          aria-label={`Aprobar ${d.numero}`}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      </Tooltip>
                      <Tooltip label="Observar (devolver)">
                        <button
                          type="button"
                          onClick={() => decidir(d, 'observar')}
                          className="rounded-md p-1.5 text-warning transition-all duration-150 hover:bg-warning/10 active:scale-95"
                          aria-label={`Observar ${d.numero}`}
                        >
                          <MessageSquareWarning className="h-4 w-4" />
                        </button>
                      </Tooltip>
                      <Tooltip label="Rechazar">
                        <button
                          type="button"
                          onClick={() => decidir(d, 'rechazar')}
                          className="rounded-md p-1.5 text-destructive transition-all duration-150 hover:bg-destructive/10 active:scale-95"
                          aria-label={`Rechazar ${d.numero}`}
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function InboxEmpty() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );
}
