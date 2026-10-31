'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ESPERA_POR_PASO_0142, formatMinutos } from '@/lib/oficios-data';

interface TipProps {
  active?: boolean;
  payload?: { value: number; payload: { paso: string } }[];
}

function CustomTip({ active, payload }: TipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground">{payload[0].payload.paso}</p>
      <p className="text-sm font-bold text-foreground tabular">{formatMinutos(payload[0].value)}</p>
    </div>
  );
}

export default function EsperaPasoChart() {
  const horas = ESPERA_POR_PASO_0142.map((d) => ({ ...d, horas: Math.round((d.minutos / 60) * 10) / 10 }));
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={horas} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="paso" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} unit=" h" />
          <Tooltip content={<CustomTip />} cursor={{ fill: 'var(--muted)' }} />
          <Bar dataKey="minutos" radius={[5, 5, 0, 0]} maxBarSize={34}>
            {horas.map((d) => (
              <Cell
                key={`cell-paso-${d.paso}`}
                fill={d.minutos > 1440 ? 'var(--destructive)' : d.minutos > 600 ? 'var(--warning)' : 'var(--info)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
