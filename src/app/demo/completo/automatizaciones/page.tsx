"use client";

import React, { useState } from 'react';
import { Zap, Play, ArrowRight, CheckCircle2, Sparkles, Filter, Plus, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

const ENTERPRISE_FLOWS = [
  {
    id: 'flow-1',
    title: 'Recuperación Preventiva de Cartera',
    cuando: 'Cuota vence en 3 días calendario',
    si: 'Saldo del socio > Bs 0 Y Estado cuota = Pendiente',
    entonces: ['Enviar recordatorio por WhatsApp', 'Generar enlace dinámico QR de pago', 'Registrar bitácora de seguimiento'],
    active: true,
  },
  {
    id: 'flow-2',
    title: 'Liquidación Inmediata de Cobro QR / Tarjeta',
    cuando: 'Webhook bancario recibido (payment.approved)',
    si: 'Monto coincide con cuota Y Hash HMAC es válido',
    entonces: ['Actualizar cuota a Pagado', 'Liquidar saldo del socio a Bs 0', 'Emitir recibo electrónico', 'Notificar al socio por WhatsApp', 'Asentar en cola de Libro Diario'],
    active: true,
  },
  {
    id: 'flow-3',
    title: 'Escalamiento de Mora y Bloqueo de Padrón',
    cuando: 'Atraso supera los 60 días continuos',
    si: 'Categoría = Deportes O General',
    entonces: ['Notificar al socio con advertencia de suspensión', 'Marcar en lista de cobro judicial', 'Asignar etiqueta "Cobranza Urgente"'],
    active: true,
  },
  {
    id: 'flow-4',
    title: 'Sincronización Contable Nocturna',
    cuando: 'Todos los días a las 23:59',
    si: 'Existen pagos con estado "Pendiente de integración"',
    entonces: ['Generar lote JSON agrupado', 'Transmitir vía API REST al ERP Siigo', 'Registrar log con token de autorización'],
    active: true,
  },
];

export default function CompletoAutomatizacionesPage() {
  const { toast } = useToast();
  const [flows, setFlows] = useState(ENTERPRISE_FLOWS);

  const handleTestFlow = (title: string) => {
    toast({
      type: 'success',
      title: 'Flujo Ejecutado (Simulación)',
      message: `El flujo visual "${title}" se disparó con éxito y evaluó las condiciones en 12ms.`,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Workflow Engine
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Constructor Visual de Automatizaciones
          </h1>
          <p className="text-xs text-slate-500">
            Diseño modular de reglas operativas basadas en triggers bancarios y condiciones de mora.
          </p>
        </div>
      </div>

      {/* Visual Workflow Cards */}
      <div className="space-y-6">
        {flows.map((flow) => (
          <div key={flow.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{flow.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400">ID: {flow.id}</span>
                </div>
              </div>

              <button
                onClick={() => handleTestFlow(flow.title)}
                className="py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl border border-amber-200 transition-colors flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current text-amber-700" />
                <span>Probar Disparo</span>
              </button>
            </div>

            {/* Visual Block: CUANDO -> SI -> ENTONCES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              
              {/* CUANDO */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    CUANDO (Disparador)
                  </span>
                  <p className="font-bold text-slate-900 text-xs mt-2 leading-snug">
                    {flow.cuando}
                  </p>
                </div>
                <span className="text-[10px] text-amber-700 font-mono mt-3">Trigger Event</span>
              </div>

              {/* SI */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-blue-800 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    SI (Condición Lógica)
                  </span>
                  <p className="font-bold text-slate-900 text-xs mt-2 leading-snug">
                    {flow.si}
                  </p>
                </div>
                <span className="text-[10px] text-blue-700 font-mono mt-3">Predicate Filter</span>
              </div>

              {/* ENTONCES */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    ENTONCES (Acciones en Cascada)
                  </span>
                  <ul className="mt-2 space-y-1 text-slate-800">
                    {flow.entonces.map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-[10px] text-emerald-700 font-mono mt-3">Async Pipelines</span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
