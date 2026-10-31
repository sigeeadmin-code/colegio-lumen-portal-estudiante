'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Check, MessageSquareWarning, Ban } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import type { DocumentoCola } from '@/lib/oficios-data';

export type ModalCargo = 'aprobar' | 'observar' | 'rechazar' | null;

interface Props {
  modal: ModalCargo;
  documento: DocumentoCola | null;
  onClose: () => void;
  onDone: (tipo: Exclude<ModalCargo, null>, motivo?: string) => void;
}

interface MotivoForm {
  motivo: string;
}

const inputBase =
  'w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:outline-none focus:ring-2';
const okRing = 'border-input focus:border-ring focus:ring-ring/25';
const errRing = 'border-destructive focus:ring-destructive/25';

function DocResumen({ d }: { d: DocumentoCola }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-3.5 py-3 text-sm">
      <p className="font-doc font-semibold text-primary">{d.numero}</p>
      <p className="mt-0.5 font-medium text-foreground">{d.asunto}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {d.estudiante} · {d.curso} · versión {d.version}
      </p>
    </div>
  );
}

export default function CargoDecisionModals({ modal, documento, onClose, onDone }: Props) {
  const [enviando, setEnviando] = useState(false);
  const form = useForm<MotivoForm>({ defaultValues: { motivo: '' } });

  const cerrar = () => {
    form.reset();
    setEnviando(false);
    onClose();
  };

  const finalizar = (tipo: Exclude<ModalCargo, null>, motivo?: string) => {
    setEnviando(true);
    setTimeout(() => {
      onDone(tipo, motivo);
      cerrar();
    }, 550);
  };

  if (!documento) return null;

  return (
    <>
      <Modal
        open={modal === 'aprobar'}
        onClose={cerrar}
        title="Aprobar paso"
        description="El documento avanzará al siguiente cargo de la ruta y se registrará tu firma en el historial."
        size="sm"
      >
        <div className="space-y-4">
          <DocResumen d={documento} />
          <p className="flex items-start gap-2 text-sm text-success">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            Tu acción quedará registrada con cargo, usuario y marca de tiempo. No se generará un PDF
            adicional.
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={cerrar}
              disabled={enviando}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={enviando}
              onClick={() => finalizar('aprobar')}
              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-semibold text-success-foreground transition-all duration-150 hover:bg-success/90 active:scale-95 disabled:opacity-70"
            >
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {enviando ? 'Aprobando…' : 'Aprobar paso'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={modal === 'observar'}
        onClose={cerrar}
        title="Devolver con observación"
        description="El documento vuelve al emisor para su corrección. El motivo es obligatorio y queda en el historial."
        size="sm"
      >
        <form
          onSubmit={form.handleSubmit((data) => finalizar('observar', data.motivo))}
          className="space-y-4"
          noValidate
        >
          <DocResumen d={documento} />
          <div>
            <label htmlFor="motivo-obs" className="mb-1 block text-sm font-semibold text-foreground">
              Motivo de la observación
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              Mínimo 15 caracteres. Sé específico para que el emisor sepa qué corregir.
            </p>
            <textarea
              id="motivo-obs"
              rows={3}
              {...form.register('motivo', {
                required: 'Indica el motivo de la observación',
                minLength: { value: 15, message: 'Detalla al menos 15 caracteres' },
              })}
              className={`${inputBase} ${form.formState.errors.motivo ? errRing : okRing}`}
              placeholder="Ej.: Falta adjuntar el promedio del primer parcial de Física."
            />
            {form.formState.errors.motivo && (
              <p className="mt-1 text-xs font-medium text-destructive">
                {form.formState.errors.motivo.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={cerrar}
              disabled={enviando}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-md bg-warning px-4 py-2 text-sm font-semibold text-warning-foreground transition-all duration-150 hover:bg-warning/90 active:scale-95 disabled:opacity-70"
            >
              {enviando ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageSquareWarning className="h-4 w-4" />
              )}
              {enviando ? 'Devolviendo…' : 'Devolver al emisor'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={modal === 'rechazar'}
        onClose={cerrar}
        title="Rechazar documento"
        description="El trámite se cierra definitivamente. Indica el motivo para dejar constancia."
        size="sm"
      >
        <form
          onSubmit={form.handleSubmit((data) => finalizar('rechazar', data.motivo))}
          className="space-y-4"
          noValidate
        >
          <DocResumen d={documento} />
          <div>
            <label htmlFor="motivo-rech" className="mb-1 block text-sm font-semibold text-foreground">
              Motivo del rechazo
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              Mínimo 15 caracteres. Sé específico para que el emisor sepa qué ocurrió.
            </p>
            <textarea
              id="motivo-rech"
              rows={3}
              {...form.register('motivo', {
                required: 'Indica el motivo del rechazo',
                minLength: { value: 15, message: 'Detalla al menos 15 caracteres' },
              })}
              className={`${inputBase} ${form.formState.errors.motivo ? errRing : okRing}`}
              placeholder="Ej.: El caso fue resuelto en mediación y el documento no procede."
            />
            {form.formState.errors.motivo && (
              <p className="mt-1 text-xs font-medium text-destructive">
                {form.formState.errors.motivo.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={cerrar}
              disabled={enviando}
              className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={enviando}
              className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-all duration-150 hover:bg-destructive/90 active:scale-95 disabled:opacity-70"
            >
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
              {enviando ? 'Rechazando…' : 'Rechazar trámite'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
