'use client';

import React from 'react';
import { Inbox, Hourglass, Clock, CheckCheck, RotateCcw } from 'lucide-react';
import MetricCard from '@/components/ui/MetricCard';
import EsperaCargoChart from '@/app/components/EsperaCargoChart';
import LlegadasResolucionesChart from '@/app/components/LlegadasResolucionesChart';

export default function CargoMetrics() {
  return (
    <section aria-label="Indicadores de la bandeja por cargo" className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          hero
          tone="info"
          label="Pendientes en mi despacho"
          value="10"
          hint="3 llevan más de 48 horas esperando tu decisión."
          icon={<Inbox className="h-5 w-5" />}
          className="sm:col-span-2 xl:col-span-1"
        >
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-md bg-success/15 px-2 py-1 text-success">4 dentro de 24 h</span>
            <span className="rounded-md bg-warning/15 px-2 py-1 text-warning">3 entre 24 y 48 h</span>
            <span className="rounded-md bg-destructive/10 px-2 py-1 text-destructive">3 sobre 48 h</span>
          </div>
        </MetricCard>

        <MetricCard
          tone="alert"
          label="Espera máxima"
          value="3 d 7 h"
          hint="Oficio 0140-2026-UEIPP sin resolver desde el 25/10."
          icon={<Hourglass className="h-5 w-5" />}
        />

        <MetricCard
          tone="warning"
          label="Espera media"
          value="36"
          unit="h"
          hint="Sobre el SLA de 24 h. Subió 6 h frente a la semana pasada."
          icon={<Clock className="h-5 w-5" />}
        />

        <MetricCard
          tone="success"
          label="Resueltos hoy"
          value="3"
          hint="2 aprobados y 1 observado. Ritmo semanal: 6,4 por día."
          icon={<CheckCheck className="h-5 w-5" />}
        />

        <MetricCard
          tone="neutral"
          label="Devoluciones de la semana"
          value="5"
          hint="De 41 documentos despachados. Tasa de 12,2 %."
          icon={<RotateCcw className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="fade-up rounded-lg border border-border bg-card p-4">
          <div className="mb-2">
            <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
              Espera media por cargo
            </p>
            <p className="text-sm text-muted-foreground">
              Horas entre la llegada al despacho y la decisión · últimos 30 días
            </p>
          </div>
          <EsperaCargoChart />
        </div>

        <div className="fade-up rounded-lg border border-border bg-card p-4">
          <div className="mb-2">
            <p className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground">
              Llegadas y resoluciones por día
            </p>
            <p className="text-sm text-muted-foreground">
              Documentos que ingresan a mi cargo frente a los que despaché
            </p>
          </div>
          <LlegadasResolucionesChart />
        </div>
      </div>
    </section>
  );
}
