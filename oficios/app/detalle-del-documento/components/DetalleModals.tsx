'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Send, PackageCheck, FilePlus2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export type ModalDetalle = 'reenviar' | 'entrega' | 'seguimiento' | null;

interface Props {
  modal: ModalDetalle;
  onClose: () => void;
  onDone: (tipo: Exclude<ModalDetalle, null>) => void;
}

interface ReenvioForm {
  resumen: string;
}

interface EntregaForm {
  fecha: string;
  medio: string;
  recibidoPor: string;
  cedula: string;
}

interface SeguimientoForm {
  promedioSiguiente: string;
  mejoro: string;
  evidencia: string;
}

const inputBase =
  'w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 focus:outline-none focus:ring-2';
const okRing = 'border-input focus:border-ring focus:ring-ring/25';
const errRing = 'border-destructive focus:ring-destructive/25';

export default function DetalleModals({ modal, onClose, onDone }: Props) {
  const [enviando, setEnviando] = useState(false);

  const reenvio = useForm<ReenvioForm>({ defaultValues: { resumen: '' } });
  const entrega = useForm<EntregaForm>({
    defaultValues: { fecha: '2026-10-28', medio: 'presencial', recibidoPor: '', cedula: '' },
  });
  const seguimiento = useForm<SeguimientoForm>({
    defaultValues: { promedioSiguiente: '', mejoro: 'si', evidencia: '' },
  });

  const cerrar = () => {
    reenvio.reset();
    entrega.reset();
    seguimiento.reset();
    setEnviando(false);
    onClose();
  };

  const finalizar = (tipo: Exclude<ModalDetalle, null>) => {
    setEnviando(true);
    // Conectar con Supabase: edge functions `enviar_a_ruta` (reenvío), `registrar_entrega` o `generar_seguimiento`
    setTimeout(() => {
      onDone(tipo);
      cerrar();
    }, 650);
  };

  const botonBase =
    'inline-flex min-w-[170px] items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-95 disabled:opacity-70';
  const cancelar = (
    <button
      type="button"
      onClick={cerrar}
      disabled={enviando}
      className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-secondary-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:opacity-50"
    >
      Cancelar
    </button>
  );

  return (
    <>
      <Modal
        open={modal === 'reenviar'}
        onClose={cerrar}
        title="Reenviar documento corregido"
        description="Se creará la versión 3 del PDF y el documento volverá al paso del Rector."
      >
        <form onSubmit={reenvio.handleSubmit(() => finalizar('reenviar'))} className="space-y-4" noValidate>
          <div>
            <label htmlFor="resumen-cambios" className="mb-1 block text-sm font-semibold text-foreground">
              Resumen de las correcciones
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              Quedará en el historial junto a la acción «reenviado». Mínimo 15 caracteres.
            </p>
            <textarea
              id="resumen-cambios"
              rows={4}
              {...reenvio.register('resumen', {
                required: 'Describe qué corregiste para el Rector',
                minLength: { value: 15, message: 'Detalla al menos 15 caracteres' },
              })}
              className={`${inputBase} ${reenvio.formState.errors.resumen ? errRing : okRing}`}
              placeholder="Ej.: Se añadieron tres acciones de refuerzo para la familia y el horario de tutorías."
            />
            {reenvio.formState.errors.resumen && (
              <p className="mt-1 text-xs font-medium text-destructive">{reenvio.formState.errors.resumen.message}</p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            {cancelar}
            <button type="submit" disabled={enviando} className={`${botonBase} bg-primary text-primary-foreground hover:bg-primary/90`}>
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {enviando ? 'Reenviando…' : 'Reenviar al Rector'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={modal === 'entrega'}
        onClose={cerrar}
        title="Registrar entrega al representante"
        description="Deja constancia de quién recibió la copia limpia del documento."
      >
        <form onSubmit={entrega.handleSubmit(() => finalizar('entrega'))} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="entrega-fecha" className="mb-1 block text-sm font-semibold text-foreground">Fecha de entrega</label>
              <input
                id="entrega-fecha"
                type="date"
                {...entrega.register('fecha', { required: 'Indica la fecha de entrega' })}
                className={`${inputBase} ${entrega.formState.errors.fecha ? errRing : okRing}`}
              />
              {entrega.formState.errors.fecha && (
                <p className="mt-1 text-xs font-medium text-destructive">{entrega.formState.errors.fecha.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="entrega-medio" className="mb-1 block text-sm font-semibold text-foreground">Medio de entrega</label>
              <select
                id="entrega-medio"
                {...entrega.register('medio')}
                className={`${inputBase} ${okRing}`}
              >
                <option value="presencial">Presencial en secretaría</option>
                <option value="estudiante">Por medio del estudiante</option>
                <option value="portal">Portal del representante</option>
                <option value="correo">Correo institucional</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="entrega-recibe" className="mb-1 block text-sm font-semibold text-foreground">Recibido por</label>
            <input
              id="entrega-recibe"
              type="text"
              {...entrega.register('recibidoPor', {
                required: 'Escribe el nombre completo de quien recibe',
                minLength: { value: 6, message: 'El nombre es demasiado corto' },
              })}
              className={`${inputBase} ${entrega.formState.errors.recibidoPor ? errRing : okRing}`}
              placeholder="Ej.: Marcela Loaiza Hidalgo"
            />
            {entrega.formState.errors.recibidoPor && (
              <p className="mt-1 text-xs font-medium text-destructive">{entrega.formState.errors.recibidoPor.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="entrega-cedula" className="mb-1 block text-sm font-semibold text-foreground">Cédula del representante</label>
            <input
              id="entrega-cedula"
              type="text"
              inputMode="numeric"
              {...entrega.register('cedula', {
                required: 'La cédula es obligatoria para el acuse',
                pattern: { value: /^\d{10}$/, message: 'La cédula debe tener 10 dígitos' },
              })}
              className={`${inputBase} font-doc ${entrega.formState.errors.cedula ? errRing : okRing}`}
              placeholder="0702345678"
            />
            {entrega.formState.errors.cedula && (
              <p className="mt-1 text-xs font-medium text-destructive">{entrega.formState.errors.cedula.message}</p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            {cancelar}
            <button type="submit" disabled={enviando} className={`${botonBase} bg-success text-success-foreground hover:bg-success/90`}>
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <PackageCheck className="h-4 w-4" />}
              {enviando ? 'Registrando…' : 'Registrar entrega'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={modal === 'seguimiento'}
        onClose={cerrar}
        title="Generar informe de seguimiento"
        description="Se crea un documento hijo con número propio que hereda el N° 0142-2026-UEIPP y el promedio inicial."
      >
        <form onSubmit={seguimiento.handleSubmit(() => finalizar('seguimiento'))} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/60 px-3.5 py-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Documento de origen</p>
              <p className="font-doc font-semibold text-primary">0142-2026-UEIPP</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Promedio inicial heredado</p>
              <p className="font-bold tabular text-foreground">6,98</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="seg-promedio" className="mb-1 block text-sm font-semibold text-foreground">Promedio siguiente</label>
              <input
                id="seg-promedio"
                type="text"
                inputMode="decimal"
                {...seguimiento.register('promedioSiguiente', {
                  required: 'Ingresa el promedio actual del estudiante',
                  pattern: { value: /^(10([.,]0{1,2})?|[0-9]([.,]\d{1,2})?)$/, message: 'Usa un valor entre 0 y 10' },
                })}
                className={`${inputBase} tabular ${seguimiento.formState.errors.promedioSiguiente ? errRing : okRing}`}
                placeholder="Ej.: 7,45"
              />
              {seguimiento.formState.errors.promedioSiguiente && (
                <p className="mt-1 text-xs font-medium text-destructive">{seguimiento.formState.errors.promedioSiguiente.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="seg-mejoro" className="mb-1 block text-sm font-semibold text-foreground">¿Evidencia de mejora?</label>
              <select id="seg-mejoro" {...seguimiento.register('mejoro')} className={`${inputBase} ${okRing}`}>
                <option value="si">Sí, mejoró</option>
                <option value="parcial">Mejora parcial</option>
                <option value="no">No hay mejora</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="seg-evidencia" className="mb-1 block text-sm font-semibold text-foreground">Evidencia observada</label>
            <textarea
              id="seg-evidencia"
              rows={3}
              {...seguimiento.register('evidencia', {
                required: 'Describe brevemente la evidencia de mejora o su ausencia',
                minLength: { value: 15, message: 'Detalla al menos 15 caracteres' },
              })}
              className={`${inputBase} ${seguimiento.formState.errors.evidencia ? errRing : okRing}`}
              placeholder="Ej.: Entregó las cuatro tareas pendientes y subió 0,5 puntos en el último quiz."
            />
            {seguimiento.formState.errors.evidencia && (
              <p className="mt-1 text-xs font-medium text-destructive">{seguimiento.formState.errors.evidencia.message}</p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            {cancelar}
            <button type="submit" disabled={enviando} className={`${botonBase} bg-primary text-primary-foreground hover:bg-primary/90`}>
              {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <FilePlus2 className="h-4 w-4" />}
              {enviando ? 'Creando…' : 'Crear borrador de seguimiento'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
