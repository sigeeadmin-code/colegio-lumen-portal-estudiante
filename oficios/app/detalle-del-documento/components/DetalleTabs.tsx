'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { FileText, Route, Link2, GitCommitHorizontal, Printer } from 'lucide-react';
import PlantillaOficio from '@/app/detalle-del-documento/components/PlantillaOficio';
import RecorridoTimeline from '@/app/detalle-del-documento/components/RecorridoTimeline';
import SeguimientosPanel from '@/app/detalle-del-documento/components/SeguimientosPanel';
import VersionesPanel from '@/app/detalle-del-documento/components/VersionesPanel';
import AccionesPanel from '@/app/detalle-del-documento/components/AccionesPanel';
import ResumenLateral from '@/app/detalle-del-documento/components/ResumenLateral';
import DetalleModals, { type ModalDetalle } from '@/app/detalle-del-documento/components/DetalleModals';
import { SEGUIMIENTOS_0142, HISTORIAL_0142, VERSIONES_0142 } from '@/lib/oficios-data';

type TabKey = 'documento' | 'recorrido' | 'seguimientos' | 'versiones';

const TABS: { key: TabKey; label: string; icon: React.ReactNode; count?: number }[] = [
  { key: 'documento', label: 'Documento', icon: <FileText className="h-4 w-4" /> },
  { key: 'recorrido', label: 'Recorrido', icon: <Route className="h-4 w-4" />, count: HISTORIAL_0142.length },
  { key: 'seguimientos', label: 'Seguimientos', icon: <Link2 className="h-4 w-4" />, count: SEGUIMIENTOS_0142.length },
  { key: 'versiones', label: 'Versiones', icon: <GitCommitHorizontal className="h-4 w-4" />, count: VERSIONES_0142.length },
];

export default function DetalleTabs() {
  const [tab, setTab] = useState<TabKey>('documento');
  const [modo, setModo] = useState<'entrega' | 'auditoria'>('entrega');
  const [modal, setModal] = useState<ModalDetalle>(null);

  const imprimirEntrega = () => {
    setModo('entrega');
    setTab('documento');
    toast.success('Vista de entrega lista: sin tabla de recorrido interno');
    setTimeout(() => window.print(), 250);
  };

  const imprimirRecorrido = () => {
    setModo('auditoria');
    setTab('documento');
    toast.success('Vista con recorrido lista: marcada como uso interno');
    setTimeout(() => window.print(), 250);
  };

  const terminado = (tipo: Exclude<ModalDetalle, null>) => {
    if (tipo === 'reenviar') toast.success('Versión 3 generada y documento reenviado al Rector');
    if (tipo === 'entrega') toast.success('Entrega registrada. El documento pasa a «entregado»');
    if (tipo === 'seguimiento') toast.success('Borrador de seguimiento 0157-2026-UEIPP creado y enlazado');
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-4">
          <div className="print-hide -mb-1 flex gap-1 overflow-x-auto border-b border-border scroll-thin" role="tablist">
            {TABS.map((t) => {
              const active = tab === t.key;
              return (
                <button
                  key={`dtab-${t.key}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:border-input hover:text-foreground'
                  }`}
                >
                  {t.icon}
                  {t.label}
                  {t.count !== undefined && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular ${
                        active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {tab === 'documento' && (
            <div className="fade-up space-y-3">
              <div className="print-hide flex flex-wrap items-center justify-between gap-3">
                <div className="flex rounded-md border border-input bg-card p-0.5" role="group" aria-label="Modo de vista">
                  <button
                    type="button"
                    onClick={() => setModo('entrega')}
                    className={`rounded px-3 py-1.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                      modo === 'entrega' ? 'bg-primary text-primary-foreground' : 'text-secondary-foreground hover:bg-muted'
                    }`}
                  >
                    Vista de entrega
                  </button>
                  <button
                    type="button"
                    onClick={() => setModo('auditoria')}
                    className={`rounded px-3 py-1.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                      modo === 'auditoria' ? 'bg-accent text-accent-foreground' : 'text-secondary-foreground hover:bg-muted'
                    }`}
                  >
                    Vista con recorrido
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95"
                >
                  <Printer className="h-4 w-4" />
                  Imprimir vista actual
                </button>
              </div>
              <PlantillaOficio modo={modo} />
            </div>
          )}

          {tab === 'recorrido' && (
            <div className="fade-up">
              <RecorridoTimeline />
            </div>
          )}

          {tab === 'seguimientos' && (
            <div className="fade-up">
              <SeguimientosPanel onGenerar={() => setModal('seguimiento')} />
            </div>
          )}

          {tab === 'versiones' && (
            <div className="fade-up">
              <VersionesPanel />
            </div>
          )}
        </div>

        <aside className="space-y-5">
          <AccionesPanel
            estado="observado"
            esEmisor
            onEditar={() => toast.success('Editor de plantilla abierto: al guardar se generará la versión 3')}
            onReenviar={() => setModal('reenviar')}
            onImprimirEntrega={imprimirEntrega}
            onImprimirRecorrido={imprimirRecorrido}
            onRegistrarEntrega={() => setModal('entrega')}
          />
          <ResumenLateral />
        </aside>
      </div>

      <DetalleModals modal={modal} onClose={() => setModal(null)} onDone={terminado} />
    </>
  );
}
