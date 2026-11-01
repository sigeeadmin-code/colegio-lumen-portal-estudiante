'use client';

import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  FileSpreadsheet,
  FileText,
  Users,
  GraduationCap,
  Filter,
  Printer,
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import {
  MESES,
  CURSOS_PARALELOS,
  RESUMEN_POR_CURSO,
  DETALLE_POR_ALUMNO,
  type ResumenCurso,
  type DetalleAlumno,
} from '@/lib/asistencia-report-data';

type Vista = 'curso' | 'alumno';
type RolVista = 'inspector' | 'tutor';

export default function ReporteMensualAsistenciaPage() {
  const [mes, setMes] = useState('2026-10');
  const [curso, setCurso] = useState<string>('todos');
  const [paralelo, setParalelo] = useState<string>('todos');
  const [vista, setVista] = useState<Vista>('curso');
  const [rol] = useState<RolVista>('inspector');

  const cursosDisponibles = useMemo(
    () => Array.from(new Set(CURSOS_PARALELOS.map((c) => c.curso))),
    [],
  );
  const paralelosDisponibles = useMemo(() => {
    const list =
      curso === 'todos'
        ? CURSOS_PARALELOS
        : CURSOS_PARALELOS.filter((c) => c.curso === curso);
    return Array.from(new Set(list.map((c) => c.paralelo)));
  }, [curso]);

  const resumenFiltrado = useMemo(() => {
    return RESUMEN_POR_CURSO.filter((r) => {
      if (curso !== 'todos' && r.curso !== curso) return false;
      if (paralelo !== 'todos' && r.paralelo !== paralelo) return false;
      return true;
    });
  }, [curso, paralelo]);

  const alumnosFiltrados = useMemo(() => {
    return DETALLE_POR_ALUMNO.filter((a) => {
      if (curso !== 'todos' && a.curso !== curso) return false;
      if (paralelo !== 'todos' && a.paralelo !== paralelo) return false;
      return true;
    });
  }, [curso, paralelo]);

  const kpis = useMemo(() => {
    const total = alumnosFiltrados.length || 1;
    const promedioAsistencia =
      alumnosFiltrados.reduce((s, a) => s + a.porcentajeAsistencia, 0) / total;
    const conRiesgo = alumnosFiltrados.filter((a) => a.porcentajeInjustificado >= 8).length;
    return {
      estudiantes: alumnosFiltrados.length,
      promedioAsistencia,
      conRiesgo,
      cursos: resumenFiltrado.length,
    };
  }, [alumnosFiltrados, resumenFiltrado]);

  const labelMes = MESES.find((m) => m.value === mes)?.label ?? mes;

  const exportar = (formato: 'pdf' | 'excel') => {
    toast.success(
      formato === 'pdf'
        ? `PDF del reporte mensual (${labelMes}) listo para descargar`
        : `Excel del reporte mensual (${labelMes}) listo para descargar`,
    );
  };

  return (
    <AppLayout
      title="Reporte mensual de asistencia"
      subtitle={
        rol === 'inspector'
          ? 'Inspector General · control institucional por curso y estudiante'
          : 'Docente tutor · asistencia de tu(s) curso(s) asignado(s)'
      }
    >
      <div className="space-y-5">
        <section className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-muted-foreground">Mes</span>
              <select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                className="h-10 min-w-[160px] rounded-md border border-input bg-card px-2.5 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
              >
                {MESES.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-muted-foreground">Curso</span>
              <select
                value={curso}
                onChange={(e) => {
                  setCurso(e.target.value);
                  setParalelo('todos');
                }}
                className="h-10 min-w-[140px] rounded-md border border-input bg-card px-2.5 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
              >
                <option value="todos">Todos los cursos</option>
                {cursosDisponibles.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-muted-foreground">Paralelo</span>
              <select
                value={paralelo}
                onChange={(e) => setParalelo(e.target.value)}
                className="h-10 min-w-[100px] rounded-md border border-input bg-card px-2.5 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
              >
                <option value="todos">Todos</option>
                {paralelosDisponibles.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>

            <div className="ml-auto flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => exportar('excel')}
                className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-all hover:bg-muted active:scale-95"
              >
                <FileSpreadsheet className="h-4 w-4 text-success" />
                Excel
              </button>
              <button
                type="button"
                onClick={() => exportar('pdf')}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
              >
                <FileText className="h-4 w-4" />
                PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  exportar('pdf');
                  setTimeout(() => window.print(), 300);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted active:scale-95"
              >
                <Printer className="h-4 w-4" />
                Imprimir
              </button>
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            Periodo: <span className="font-semibold text-foreground">{labelMes}</span>
            · Visible para Inspector General y Docente tutor · Exportable PDF y Excel
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Kpi label="Estudiantes" value={String(kpis.estudiantes)} hint="En el filtro actual" icon={<Users className="h-4 w-4" />} />
          <Kpi label="Cursos / paralelos" value={String(kpis.cursos)} hint="Grupos incluidos" icon={<GraduationCap className="h-4 w-4" />} />
          <Kpi label="% asistencia media" value={`${kpis.promedioAsistencia.toFixed(1)} %`} hint="Presentes + justificados" tone="success" />
          <Kpi
            label="Riesgo Art. 172"
            value={String(kpis.conRiesgo)}
            hint="≥ 8 % injustificadas (alerta)"
            tone={kpis.conRiesgo > 0 ? 'warning' : 'neutral'}
          />
        </section>

        <div className="flex gap-1 border-b border-border" role="tablist">
          {(
            [
              { key: 'curso' as const, label: 'Por curso / paralelo', icon: GraduationCap },
              { key: 'alumno' as const, label: 'Por alumno', icon: Users },
            ] as const
          ).map((t) => {
            const active = vista === t.key;
            return (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setVista(t.key)}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {vista === 'curso' ? (
          <TablaPorCurso data={resumenFiltrado} mes={labelMes} />
        ) : (
          <TablaPorAlumno data={alumnosFiltrados} mes={labelMes} />
        )}
      </div>
    </AppLayout>
  );
}

function Kpi({
  label,
  value,
  hint,
  icon,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  hint: string;
  icon?: React.ReactNode;
  tone?: 'neutral' | 'success' | 'warning';
}) {
  const toneCls =
    tone === 'success' ? 'text-success' : tone === 'warning' ? 'text-warning' : 'text-foreground';
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <p className={`mt-1 text-2xl font-bold tabular ${toneCls}`}>{value}</p>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function TablaPorCurso({ data, mes }: { data: ResumenCurso[]; mes: string }) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
        No hay datos de asistencia para el filtro seleccionado en {mes}.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <caption className="border-b border-border px-4 py-3 text-left">
          <span className="text-base font-semibold text-foreground">
            Resumen por curso y paralelo — {mes}
          </span>
          <p className="text-xs text-muted-foreground">
            Días lectivos del mes · % asistencia = (presentes + justificadas) / días × 100
          </p>
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted/60 text-[12px] uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-semibold">Curso</th>
            <th className="px-3 py-3 font-semibold">Paralelo</th>
            <th className="px-3 py-3 font-semibold">Tutor</th>
            <th className="px-3 py-3 text-right font-semibold">Estudiantes</th>
            <th className="px-3 py-3 text-right font-semibold">Días lectivos</th>
            <th className="px-3 py-3 text-right font-semibold">Presentes</th>
            <th className="px-3 py-3 text-right font-semibold">Justif.</th>
            <th className="px-3 py-3 text-right font-semibold">Injustif.</th>
            <th className="px-3 py-3 text-right font-semibold">Atrasos</th>
            <th className="px-4 py-3 text-right font-semibold">% Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={`${r.curso}-${r.paralelo}`} className="border-b border-border even:bg-muted/20 hover:bg-primary/5">
              <td className="px-4 py-3 font-medium text-foreground">{r.curso}</td>
              <td className="px-3 py-3 text-foreground">{r.paralelo}</td>
              <td className="max-w-[160px] truncate px-3 py-3 text-muted-foreground" title={r.tutor}>
                {r.tutor}
              </td>
              <td className="px-3 py-3 text-right tabular">{r.estudiantes}</td>
              <td className="px-3 py-3 text-right tabular">{r.diasLectivos}</td>
              <td className="px-3 py-3 text-right tabular text-success">{r.presentes}</td>
              <td className="px-3 py-3 text-right tabular text-info">{r.justificadas}</td>
              <td className="px-3 py-3 text-right tabular text-destructive">{r.injustificadas}</td>
              <td className="px-3 py-3 text-right tabular text-warning">{r.atrasos}</td>
              <td className="px-4 py-3 text-right">
                <span
                  className={`font-bold tabular ${
                    r.porcentajeAsistencia >= 95
                      ? 'text-success'
                      : r.porcentajeAsistencia >= 90
                        ? 'text-foreground'
                        : 'text-warning'
                  }`}
                >
                  {r.porcentajeAsistencia.toFixed(1)} %
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TablaPorAlumno({ data, mes }: { data: DetalleAlumno[]; mes: string }) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
        No hay estudiantes para el filtro seleccionado en {mes}.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
        <caption className="border-b border-border px-4 py-3 text-left">
          <span className="text-base font-semibold text-foreground">Detalle por alumno — {mes}</span>
          <p className="text-xs text-muted-foreground">
            Riesgo Art. 172: inasistencias injustificadas que se acercan o superan el 10 % del año lectivo
          </p>
        </caption>
        <thead>
          <tr className="border-b border-border bg-muted/60 text-[12px] uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-semibold">Estudiante</th>
            <th className="px-3 py-3 font-semibold">Cédula</th>
            <th className="px-3 py-3 font-semibold">Curso</th>
            <th className="px-3 py-3 font-semibold">Paralelo</th>
            <th className="px-3 py-3 text-right font-semibold">Presentes</th>
            <th className="px-3 py-3 text-right font-semibold">Justif.</th>
            <th className="px-3 py-3 text-right font-semibold">Injustif.</th>
            <th className="px-3 py-3 text-right font-semibold">Atrasos</th>
            <th className="px-3 py-3 text-right font-semibold">% Asist.</th>
            <th className="px-4 py-3 font-semibold">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((a) => (
            <tr key={a.id} className="border-b border-border even:bg-muted/20 hover:bg-primary/5">
              <td className="px-4 py-3 font-medium text-foreground">{a.nombre}</td>
              <td className="px-3 py-3 font-doc text-xs text-muted-foreground">{a.cedula}</td>
              <td className="px-3 py-3">{a.curso}</td>
              <td className="px-3 py-3">{a.paralelo}</td>
              <td className="px-3 py-3 text-right tabular text-success">{a.presentes}</td>
              <td className="px-3 py-3 text-right tabular text-info">{a.justificadas}</td>
              <td className="px-3 py-3 text-right tabular text-destructive">{a.faltasInjustificadas}</td>
              <td className="px-3 py-3 text-right tabular text-warning">{a.atrasos}</td>
              <td className="px-3 py-3 text-right font-bold tabular">{a.porcentajeAsistencia.toFixed(1)} %</td>
              <td className="px-4 py-3">
                {a.porcentajeInjustificado >= 10 ? (
                  <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-xs font-semibold text-destructive">
                    Riesgo Art. 172
                  </span>
                ) : a.porcentajeInjustificado >= 8 ? (
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-semibold text-warning">
                    Alerta preventiva
                  </span>
                ) : (
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
                    Normal
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
