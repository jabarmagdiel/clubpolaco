"use client";

import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

export const DemoBanner: React.FC = () => {
  const { resetAllDemoData } = useCRM();
  const { toast } = useToast();

  const handleReset = () => {
    resetAllDemoData();
    toast({
      type: 'info',
      title: 'Datos restablecidos',
      message: 'La base de demostración ha vuelto a su estado original.',
    });
  };

  return (
    <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800 tracking-wide">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-white uppercase text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
          MODO DEMOSTRACIÓN
        </span>
        <span className="hidden sm:inline text-slate-400">
          Los datos, transacciones bancarias, WhatsApp y asientos contables mostrados son simulados.
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-[11px] font-mono text-emerald-400 hidden md:inline">
          DEMO_MODE=true
        </span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors hover:underline text-[11px]"
          title="Restablecer base de datos demo a valores iniciales"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">Reiniciar datos</span>
        </button>
      </div>
    </div>
  );
};
