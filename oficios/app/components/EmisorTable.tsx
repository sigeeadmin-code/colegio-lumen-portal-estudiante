'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Search, Plus, Eye, Pencil, Send, Trash2, Printer, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Columns3, CornerUpLeft, RefreshCw, X, FileX2 } from 'lucide-react';
import {
  DOCUMENTOS,
  TIPO_LABEL,
  COLUMNAS_TABLA_EMISOR,
  CARGO_CORTO,
  formatHoras,
  type DocumentoItem,
  type EstadoDocumento,
  type TipoDocumento,
} from '@/lib/oficios-data';
import { EstadoBadge, TipoBadge, VersionChip } from '@/components/ui/Badge';
import { RouteMini } from '@/components/ui/RouteStepper';
import Tooltip from '@/components/ui/Tooltip';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import TableSkeleton from '@/components/ui/TableSkeleton';

type TabKey = 'borradores' | 'observados' | 'en_ruta' | 'cerrados';
type SortKey = 'numero' | 'estado' | 'version' | 'tramite' | 'estudiante';

const TABS: { key: TabKey; label: string; estados: EstadoDocumento[] }[] = [
  { key: 'borradores', label: 'Borradores', estados: ['borrador'] },
  { key: 'observados', label: 'Observados', estados: ['observado'] },
  { key: 'en_ruta', label: 'En ruta', estados: ['en_ruta', 'aprobado_final'] },
  { key: 'cerrados', label: 'Emitidos / cerrados', estados: ['entregado', 'archivado', 'rechazado'] },
];

type ColKey = (typeof COLUMNAS_TABLA_EMISOR)[number]['key'];

export default function EmisorTable() {
  const [tab, setTab] = useState<TabKey | 'todos'>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState<TipoDocumento | 'todos'>('todos');
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'tramite', dir: 'desc' });
  const [seleccion, setSeleccion] = useState<string[]>([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);
  const [cargando, setCargando] = useState(false);
  const [removidos, setRemovidos] = useState<string[]>([]);
  const [saliendo, setSaliendo] = useState<string[]>([]);
  const [colsVisibles, setColsVisibles] = useState<ColKey[]>(COLUMNAS_TABLA_EMISOR.map((c) => c.key));
  const [menuCols, setMenuCols] = useState(false);
  const [confirmar, setConfirmar] = useState<DocumentoItem | null>(null);
  const [confirmarEnvio, setConfirmarEnvio] = useState<DocumentoItem | null>(null);
  const [estadoEditando, setEstadoEditando] = useState<string | null>(null);
  const [ultimaCarga, setUltimaCarga] = useState('28/10/2026 08:40');

  const base = useMemo(() => DOCUMENTOS.filter((d) => !removidos.includes(d.id)), [removidos]);

  const conteo = useMemo(() => {
    const out: Record<string, number> = { todos: base.length };
    TABS.forEach((t) => {
      out[t.key] = base.filter((d) => t.estados.includes(d.estado)).length;
    });
    return out;
  }, [base]);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const estadosTab = tab === 'todos' ? null : TABS.find((t) => t.key === tab)?.estados ?? null;
    const list = base.filter((d) => {
      if (estadosTab && !estadosTab.includes(d.estado)) return false;
      if (tipo !== 'todos' && d.tipo !== tipo) return false;
      if (q && !`${d.numero} ${d.asunto} ${d.estudiante} ${d.curso}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...list].sort((a, b) => {
      switch (sort.key) {
        case 'numero':
          return a.numero.localeCompare(b.numero) * dir;
        case 'estado':
          return a.estado.localeCompare(b.estado) * dir;
        case 'version':
          return (a.version - b.version) * dir;
        case 'estudiante':
          return a.estudiante.localeCompare(b.estudiante) * dir;
        default:
          return (a.horasEnTramite - b.horasEnTramite) * dir;
      }
    });
  }, [base, tab, tipo, busqueda, sort]);

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);
  const todosMarcados = visibles.length > 0 && visibles.every((d) => seleccion.includes(d.id));

  const toggleSort = (key: SortKey) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  };

  const toggleCol = (key: ColKey) => {
    setColsVisibles((c) => (c.includes(key) ? c.filter((k) => k !== key) : [...c, key]));
  };

  const mostrar = (key: ColKey) => colsVisibles.includes(key);

  const refrescar = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setUltimaCarga('28/10/2026 08:41');
      toast.success('Bandeja actualizada');
    }, 700);
  };

  const eliminarBorrador = (d: DocumentoItem) => {
    setConfirmar(null);
    setSaliendo((s) => [...s, d.id]);
    setTimeout(() => {
      setRemovidos((r) => [...r, d.id]);
      setSaliendo((s) => s.filter((x) => x !== d.id));
      setSeleccion((s) => s.filter((x) => x !== d.id));
      toast.success(`Borrador ${d.numero} eliminado`);
    }, 260);
  };

  const enviarARuta = (d: DocumentoItem) => {
    setConfirmarEnvio(null);
    toast.success(`Documento ${d.numero} enviado a Inspector General`);
  };

  const accionMasiva = (accion: 'imprimir' | 'enviar') => {
    if (accion === 'imprimir') {
      toast.success(`${seleccion.length} documentos enviados a impresión (copia de entrega)`);
    } else {
      toast.success(`${seleccion.length} documentos enviados a ruta`);
    }
    setSeleccion([]);
  };

  const SortHead = ({ k, children }: { k: SortKey; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => toggleSort(k)}
      className={`inline-flex items-center gap-1 font-semibold transition-colors duration-150 hover:text-foreground ${
        sort.key === k ? 'text-primary' : ''
      }`}
    >
      {children}
      {sort.key === k && (sort.dir === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />)}
    </button>
  );

  return (
    <section aria-label="Tabla de documentos" className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Mis documentos</h2>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
              Última actualización {ultimaCarga}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={refrescar}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${cargando ? 'animate-spin' : ''}`} />
              Actualizar
            </button>
            <button
              type="button"
              onClick={() => toast.success('Se abrió el asistente de nuevo documento (seleccione el tipo)')}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Nuevo documento
            </button>
          </div>
        </div>

        <div className="-mb-px flex gap-1 overflow-x-auto scroll-thin" role="tablist">
          {[{ key: 'todos' as const, label: 'Todos' }, ...TABS.map((t) => ({ key: t.key, label: t.label }))].map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={`tab-${t.key}`}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setTab(t.key);
                  setPagina(1);
                }}
                className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:border-input hover:text-foreground'
                }`}
              >
                {t.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular ${
                    active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  } ${t.key === 'observados' && conteo.observados > 0 && !active ? 'bg-warning text-warning-foreground' : ''}`}
                >
                  {conteo[t.key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <label className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <span className="sr-only">Buscar en mis documentos</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
            placeholder="Buscar por N°, estudiante, asunto o curso…"
            className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Tipo</span>
          <select
            value={tipo}
            onChange={(e) => {
              setTipo(e.target.value as TipoDocumento | 'todos');
              setPagina(1);
            }}
            className="h-10 rounded-md border border-input bg-card px-2.5 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
          >
            <option value="todos">Todos los tipos</option>
            {(Object.keys(TIPO_LABEL) as TipoDocumento[]).map((k) => (
              <option key={`opt-tipo-${k}`} value={k}>
                {TIPO_LABEL[k]}
              </option>
            ))}
          </select>
        </label>

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() => setMenuCols((v) => !v)}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-input bg-card px-3 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
            aria-expanded={menuCols}
          >
            <Columns3 className="h-4 w-4" />
            Columnas
            <span className="rounded bg-muted px-1.5 text-xs font-semibold tabular text-muted-foreground">
              {colsVisibles.length}/{COLUMNAS_TABLA_EMISOR.length}
            </span>
          </button>
          {menuCols && (
            <>
              <button type="button" aria-label="Cerrar menú de columnas" className="fixed inset-0 z-30 cursor-default" onClick={() => setMenuCols(false)} />
              <div className="modal-in absolute right-0 z-40 mt-2 w-56 rounded-lg border border-border bg-card p-2 shadow-xl">
                <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Columnas visibles</p>
                {COLUMNAS_TABLA_EMISOR.map((c) => (
                  <label
                    key={`col-${c.key}`}
                    className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors duration-150 hover:bg-muted"
                  >
                    <input
                      type="checkbox"
                      checked={colsVisibles.includes(c.key)}
                      onChange={() => toggleCol(c.key)}
                      className="h-4 w-4 rounded border-input accent-primary"
                    />
                    {c.label}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {cargando ? (
        <TableSkeleton rows={6} cols={8} />
      ) : visibles.length === 0 ? (
        <EmptyState
          icon={<FileX2 className="h-6 w-6" />}
          title={busqueda || tipo !== 'todos' ? 'Ningún documento coincide con el filtro' : 'Aún no tienes documentos en esta pestaña'}
          description={
            busqueda || tipo !== 'todos'
              ? 'Prueba con otro N° de documento, otro estudiante o quita el filtro de tipo.'
              : 'Cuando generes un oficio, plan o acta desde una alerta, aparecerá aquí con su recorrido.'
          }
          actionLabel="Nuevo documento"
          onAction={() => toast.success('Se abrió el asistente de nuevo documento (seleccione el tipo)')}
        />
      ) : (
        <div className="overflow-x-auto scroll-thin">
          <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-[12px] uppercase tracking-wide text-muted-foreground">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Seleccionar todos los documentos de la página"
                    checked={todosMarcados}
                    onChange={() =>
                      setSeleccion((s) =>
                        todosMarcados
                          ? s.filter((id) => !visibles.some((d) => d.id === id))
                          : Array.from(new Set([...s, ...visibles.map((d) => d.id)]))
                      )
                    }
                    className="h-4 w-4 rounded border-input accent-primary"
                  />
                </th>
                {mostrar('numero') && (
                  <th className="px-3 py-3">
                    <SortHead k="numero">N° documento</SortHead>
                  </th>
                )}
                {mostrar('asunto') && <th className="px-3 py-3 font-semibold">Asunto</th>}
                {mostrar('tipo') && <th className="px-3 py-3 font-semibold">Tipo</th>}
                {mostrar('estudiante') && (
                  <th className="px-3 py-3">
                    <SortHead k="estudiante">Estudiante</SortHead>
                  </th>
                )}
                {mostrar('curso') && <th className="px-3 py-3 font-semibold">Curso</th>}
                {mostrar('estado') && (
                  <th className="px-3 py-3">
                    <SortHead k="estado">Estado</SortHead>
                  </th>
                )}
                {mostrar('paso') && <th className="px-3 py-3 font-semibold">Paso actual</th>}
                {mostrar('version') && (
                  <th className="px-3 py-3">
                    <SortHead k="version">Versión</SortHead>
                  </th>
                )}
                {mostrar('tramite') && (
                  <th className="px-3 py-3">
                    <SortHead k="tramite">En trámite</SortHead>
                  </th>
                )}
                {mostrar('actualizado') && <th className="px-3 py-3 font-semibold">Actualizado</th>}
                <th className="px-4 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((d) => {
                const marcado = seleccion.includes(d.id);
                const saliendoFila = saliendo.includes(d.id);
                const editable = d.estado === 'borrador' || d.estado === 'observado';
                return (
                  <tr
                    key={d.id}
                    className={`group border-b border-border transition-all duration-200 even:bg-muted/20 hover:bg-primary/5 ${
                      marcado ? 'bg-primary/10 even:bg-primary/10' : ''
                    } ${saliendoFila ? 'row-exit' : ''}`}
                  >
                    <td className="px-4 py-3 align-top">
                      <input
                        type="checkbox"
                        aria-label={`Seleccionar documento ${d.numero}`}
                        checked={marcado}
                        onChange={() =>
                          setSeleccion((s) => (marcado ? s.filter((x) => x !== d.id) : [...s, d.id]))
                        }
                        className="h-4 w-4 rounded border-input accent-primary"
                      />
                    </td>
                    {mostrar('numero') && (
                      <td className="px-3 py-3 align-top">
                        <Link
                          href="/detalle-del-documento"
                          className="font-doc text-[13px] font-semibold text-primary transition-colors duration-150 hover:underline"
                        >
                          {d.numero}
                        </Link>
                        {d.esSeguimiento && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <CornerUpLeft className="h-3 w-3" />
                            Hijo de 0121-2026
                          </p>
                        )}
                      </td>
                    )}
                    {mostrar('asunto') && (
                      <td className="max-w-[300px] px-3 py-3 align-top">
                        <p className="truncate font-medium text-foreground" title={d.asunto}>
                          {d.asunto}
                        </p>
                        {d.estado === 'observado' && d.ultimoMotivo && (
                          <p className="mt-1 line-clamp-2 rounded border-l-2 border-warning bg-warning/10 px-2 py-1 text-xs text-warning">
                            {d.ultimoMotivo}
                          </p>
                        )}
                        {d.estado === 'rechazado' && d.ultimoMotivo && (
                          <p className="mt-1 line-clamp-2 rounded border-l-2 border-destructive bg-destructive/10 px-2 py-1 text-xs text-destructive">
                            {d.ultimoMotivo}
                          </p>
                        )}
                      </td>
                    )}
                    {mostrar('tipo') && (
                      <td className="px-3 py-3 align-top">
                        <TipoBadge tipo={d.tipo} />
                      </td>
                    )}
                    {mostrar('estudiante') && (
                      <td className="px-3 py-3 align-top">
                        <p className="max-w-[190px] truncate text-foreground" title={d.estudiante}>
                          {d.estudiante}
                        </p>
                        <p className="font-doc text-xs text-muted-foreground">{d.cedulaEstudiante}</p>
                      </td>
                    )}
                    {mostrar('curso') && (
                      <td className="whitespace-nowrap px-3 py-3 align-top text-foreground">{d.curso}</td>
                    )}
                    {mostrar('estado') && (
                      <td className="relative px-3 py-3 align-top">
                        <button
                          type="button"
                          disabled={d.estado !== 'borrador'}
                          onClick={() => setEstadoEditando(estadoEditando === d.id ? null : d.id)}
                          className="rounded-full transition-all duration-150 enabled:hover:ring-2 enabled:hover:ring-ring/30 disabled:cursor-default"
                          aria-label={`Estado de ${d.numero}: ${d.estado}`}
                        >
                          <EstadoBadge estado={d.estado} />
                        </button>
                        {estadoEditando === d.id && d.estado === 'borrador' && (
                          <>
                            <button type="button" aria-label="Cerrar" className="fixed inset-0 z-30 cursor-default" onClick={() => setEstadoEditando(null)} />
                            <div className="modal-in absolute left-3 top-full z-40 mt-1 w-48 rounded-lg border border-border bg-card p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setEstadoEditando(null);
                                  setConfirmarEnvio(d);
                                }}
                                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted"
                              >
                                <Send className="h-4 w-4 text-info" />
                                Enviar a ruta
                              </button>
                              <button
                                type="button"
                                onClick={() => setEstadoEditando(null)}
                                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted"
                              >
                                <X className="h-4 w-4" />
                                Mantener borrador
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    )}
                    {mostrar('paso') && (
                      <td className="px-3 py-3 align-top">
                        {d.pasoActual ? (
                          <div className="space-y-1.5">
                            <p className="text-sm font-medium text-foreground">{CARGO_CORTO[d.pasoActual]}</p>
                            <RouteMini ruta={d.ruta} />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            {d.estado === 'borrador' ? 'Sin enviar' : 'Ruta cerrada'}
                          </span>
                        )}
                      </td>
                    )}
                    {mostrar('version') && (
                      <td className="px-3 py-3 align-top">
                        <div className="flex flex-col gap-1">
                          <VersionChip version={d.version} />
                          {d.devoluciones > 0 && (
                            <span className="text-xs text-muted-foreground tabular">{d.devoluciones} devol.</span>
                          )}
                        </div>
                      </td>
                    )}
                    {mostrar('tramite') && (
                      <td className="whitespace-nowrap px-3 py-3 align-top">
                        <span
                          className={`font-semibold tabular ${
                            d.horasEnTramite > 168
                              ? 'text-destructive'
                              : d.horasEnTramite > 72
                                ? 'text-warning'
                                : 'text-foreground'
                          }`}
                        >
                          {formatHoras(d.horasEnTramite)}
                        </span>
                      </td>
                    )}
                    {mostrar('actualizado') && (
                      <td className="whitespace-nowrap px-3 py-3 align-top font-doc text-xs text-muted-foreground">
                        {d.actualizado}
                      </td>
                    )}
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center justify-end gap-0.5 opacity-60 transition-opacity duration-150 group-hover:opacity-100 focus-within:opacity-100">
                        <Tooltip label="Ver detalle y recorrido">
                          <Link
                            href="/detalle-del-documento"
                            className="rounded-md p-1.5 text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
                            aria-label={`Ver detalle de ${d.numero}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Tooltip>
                        {editable && (
                          <Tooltip label={d.estado === 'observado' ? 'Corregir y reenviar' : 'Editar borrador'}>
                            <Link
                              href="/detalle-del-documento"
                              className="rounded-md p-1.5 text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
                              aria-label={`Editar ${d.numero}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Tooltip>
                        )}
                        {d.estado === 'borrador' && (
                          <Tooltip label="Enviar a ruta de aprobación">
                            <button
                              type="button"
                              onClick={() => setConfirmarEnvio(d)}
                              className="rounded-md p-1.5 text-info transition-all duration-150 hover:bg-info/10 active:scale-95"
                              aria-label={`Enviar ${d.numero} a ruta`}
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </Tooltip>
                        )}
                        {(d.estado === 'aprobado_final' || d.estado === 'entregado' || d.estado === 'archivado') && (
                          <Tooltip label="Imprimir copia de entrega">
                            <button
                              type="button"
                              onClick={() => toast.success(`Copia de entrega de ${d.numero} lista para imprimir`)}
                              className="rounded-md p-1.5 text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
                              aria-label={`Imprimir ${d.numero}`}
                            >
                              <Printer className="h-4 w-4" />
                            </button>
                          </Tooltip>
                        )}
                        {d.estado === 'borrador' && (
                          <Tooltip label="Eliminar borrador (no se puede deshacer)">
                            <button
                              type="button"
                              onClick={() => setConfirmar(d)}
                              className="rounded-md p-1.5 text-destructive transition-all duration-150 hover:bg-destructive/10 active:scale-95"
                              aria-label={`Eliminar ${d.numero}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!cargando && filtrados.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
          <p className="text-muted-foreground">
            Mostrando{' '}
            <span className="font-semibold text-foreground tabular">
              {(paginaActual - 1) * porPagina + 1}–{Math.min(paginaActual * porPagina, filtrados.length)}
            </span>{' '}
            de <span className="font-semibold text-foreground tabular">{filtrados.length}</span> documentos
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-muted-foreground">
              Filas
              <select
                value={porPagina}
                onChange={(e) => {
                  setPorPagina(Number(e.target.value));
                  setPagina(1);
                }}
                className="h-9 rounded-md border border-input bg-card px-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
              >
                {[5, 8, 12].map((n) => (
                  <option key={`pp-${n}`} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={paginaActual === 1}
                onClick={() => setPagina(paginaActual - 1)}
                className="rounded-md border border-input p-2 text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                <button
                  key={`page-${n}`}
                  type="button"
                  onClick={() => setPagina(n)}
                  className={`h-9 min-w-9 rounded-md px-2 text-sm font-semibold tabular transition-all duration-150 active:scale-95 ${
                    n === paginaActual
                      ? 'bg-primary text-primary-foreground'
                      : 'text-secondary-foreground hover:bg-muted'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={paginaActual === totalPaginas}
                onClick={() => setPagina(paginaActual + 1)}
                className="rounded-md border border-input p-2 text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Página siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {seleccion.length > 0 && (
        <div className="slide-bar sticky bottom-4 z-30 mx-4 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-foreground px-4 py-3 text-background shadow-2xl">
          <p className="text-sm font-semibold">
            <span className="tabular">{seleccion.length}</span> documento{seleccion.length > 1 ? 's' : ''}{' '}
            seleccionado{seleccion.length > 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => accionMasiva('imprimir')}
              className="inline-flex items-center gap-2 rounded-md bg-background/15 px-3 py-1.5 text-sm font-semibold text-background transition-all duration-150 hover:bg-background/25 active:scale-95"
            >
              <Printer className="h-4 w-4" />
              Imprimir entrega
            </button>
            <button
              type="button"
              onClick={() => accionMasiva('enviar')}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-95"
            >
              <Send className="h-4 w-4" />
              Enviar a ruta
            </button>
            <button
              type="button"
              onClick={() => setSeleccion([])}
              className="rounded-md p-1.5 text-background transition-all duration-150 hover:bg-background/15 active:scale-95"
              aria-label="Limpiar selección"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <Modal
        open={confirmar !== null}
        onClose={() => setConfirmar(null)}
        title="Eliminar borrador"
        description="Solo los borradores se pueden eliminar. Los documentos en ruta quedan en el historial."
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setConfirmar(null)}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
            >
              Conservar borrador
            </button>
            <button
              type="button"
              onClick={() => confirmar && eliminarBorrador(confirmar)}
              className="rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-all duration-150 hover:bg-destructive/90 active:scale-95"
            >
              Eliminar borrador
            </button>
          </>
        }
      >
        <p className="text-sm text-foreground">
          Se eliminará el borrador <span className="font-doc font-semibold">{confirmar?.numero}</span> de{' '}
          <span className="font-semibold">{confirmar?.estudiante}</span>. Esta acción no se puede deshacer.
        </p>
      </Modal>

      <Modal
        open={confirmarEnvio !== null}
        onClose={() => setConfirmarEnvio(null)}
        title="Enviar documento a ruta"
        description="Una vez enviado, el contenido queda bloqueado hasta que una autoridad lo observe."
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setConfirmarEnvio(null)}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
            >
              Seguir editando
            </button>
            <button
              type="button"
              onClick={() => confirmarEnvio && enviarARuta(confirmarEnvio)}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95"
            >
              <Send className="h-4 w-4" />
              Enviar a ruta
            </button>
          </>
        }
      >
        <p className="text-sm text-foreground">
          El documento <span className="font-doc font-semibold">{confirmarEnvio?.numero}</span> pasará al primer cargo
          de la ruta configurada para su tipo y se notificará al Inspector General.
        </p>
      </Modal>
    </section>
  );
}
