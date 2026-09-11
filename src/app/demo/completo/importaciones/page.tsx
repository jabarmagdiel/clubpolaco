"use client";

import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

export default function CompletoImportacionesPage() {
  const { addMember } = useCRM();
  const { toast } = useToast();
  const [imported, setImported] = useState(false);

  const handleImportDemo = () => {
    addMember({ fullName: 'Tadeusz Kosciuszko', ci: '6819201 LP', phone: '+591 71928341', categoryName: 'Deportes' });
    addMember({ fullName: 'Ignacy Jan Paderewski', ci: '6819202 LP', phone: '+591 71928342', categoryName: 'Entretenimiento' });
    setImported(true);
    toast({
      type: 'success',
      title: 'Procesamiento Masivo Completado',
      message: 'Lote de socios incorporado con hashing de auditoría y validación de padrón.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Procesamiento ETL Masivo
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Carga Masiva Enterprise</h1>
          <p className="text-xs text-slate-500">Pipeline de ingesta de datos con verificación de duplicidad e indexación inmediata.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-2xs text-xs text-center space-y-4 max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Pipeline de Ingesta Excel / CSV</h3>
        <p className="text-slate-500 leading-relaxed max-w-md mx-auto">
          Mapea automáticamente campos de bases de datos externas y normaliza números telefónicos para WhatsApp Business.
        </p>

        <button
          onClick={handleImportDemo}
          disabled={imported}
          className={`py-3 px-6 rounded-xl font-bold transition-all shadow-xs inline-flex items-center gap-2 ${
            imported ? 'bg-emerald-100 text-emerald-800 cursor-default' : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{imported ? 'Lote de Socios Incorporado' : 'Simular Ingesta Masiva de Lote'}</span>
        </button>
      </div>
    </div>
  );
}
