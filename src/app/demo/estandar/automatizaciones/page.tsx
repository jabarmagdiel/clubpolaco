"use client";

import React from 'react';
import { Zap, Play, CheckCircle2, AlertCircle, Clock, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

export default function EstandarAutomatizacionesPage() {
  const { automations, toggleAutomation } = useCRM();
  const { toast } = useToast();

  const handleToggle = (id: string, name: string) => {
    toggleAutomation(id);
    toast({
      type: 'info',
      title: 'Regla Modificada',
      message: `El estado de la regla "${name}" ha sido actualizado.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-polaco-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Motor de Procesos
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Automatizaciones de Cobranza & Notificación</h1>
          <p className="text-xs text-slate-500">Reglas configurables para disparo de eventos sin intervención manual.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {automations.map((rule) => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl border transition-all ${
              rule.enabled ? 'bg-white border-slate-200 shadow-2xs' : 'bg-slate-50/70 border-slate-200 opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                  rule.enabled ? 'bg-polaco-50 text-polaco-700' : 'bg-slate-200 text-slate-500'
                }`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{rule.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono">ID: {rule.id}</span>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={() => handleToggle(rule.id, rule.name)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  rule.enabled ? 'bg-polaco-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    rule.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Rule Logic Details */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
              <div className="flex gap-2">
                <span className="font-bold text-slate-400 uppercase text-[10px] w-20">Disparador:</span>
                <span className="font-semibold text-slate-800">{rule.trigger}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-slate-400 uppercase text-[10px] w-20">Condición:</span>
                <span className="text-slate-700">{rule.condition}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-slate-400 uppercase text-[10px] w-20">Acción:</span>
                <span className="text-polaco-700 font-semibold">{rule.action}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
              <span>Ejecuciones: <strong className="text-slate-800">{rule.executionsCount} veces</strong></span>
              <span>Último disparo: {rule.lastRun || 'Hoy'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
