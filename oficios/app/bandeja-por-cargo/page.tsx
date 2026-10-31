import React from 'react';
import AppLayout from '@/components/AppLayout';
import CargoMetrics from '@/app/bandeja-por-cargo/components/CargoMetrics';
import CargoColaTable from '@/app/bandeja-por-cargo/components/CargoColaTable';

export default function BandejaPorCargoPage() {
  return (
    <AppLayout
      title="Bandeja por cargo"
      subtitle="Mgs. Ricardo Palacios · Inspector General · documentos pendientes de tu decisión"
    >
      <div className="space-y-5">
        <CargoMetrics />
        <CargoColaTable />
      </div>
    </AppLayout>
  );
}
