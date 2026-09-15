"use client";

import React, { useState } from 'react';
import { Filter, Users, Send, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';

export default function CompletoSegmentacionPage() {
  const { members, sendBulkWhatsAppReminders } = useCRM();
  const { toast } = useToast();

  const [selectedSegment, setSelectedSegment] = useState<'deportes_mora' | 'recreacion_dia' | 'altas_recientes'>('deportes_mora');

  const filtered = members.filter((m) => {
    if (selectedSegment === 'deportes_mora') {
      return m.categoryName === 'Deportes' && m.balance > 0;
    } else if (selectedSegment === 'recreacion_dia') {
      return m.categoryName === 'Recreación' && m.balance === 0;
    } else {
      return m.tags?.includes('Nuevo Socio') || m.balance === 0;
    }
  });

  const handleBroadcast = () => {
    sendBulkWhatsAppReminders(filtered.map(m => m.id));
    toast({
      type: 'success',
      title: 'Campaña Segmentada Ejecutada',
      message: `Se enviaron mensajes personalizados con enlace QR a ${filtered.length} socios.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Segmentación Predictiva
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Segmentación Dinámica de Socios</h1>
          <p className="text-xs text-slate-500">Agrupación en vivo según comportamiento de pago, actividades e historial para acciones dirigidas.</p>
        </div>

        <button
          onClick={handleBroadcast}
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span>Lanzar Campaña a ({filtered.length}) Socios</span>
        </button>
      </div>

      {/* Segment Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div
          onClick={() => setSelectedSegment('deportes_mora')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedSegment === 'deportes_mora'
              ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-xs'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <span className="font-bold text-slate-900 text-sm block">Deportes con Mora &gt; Bs 0</span>
          <p className="text-slate-500 mt-1">Socios con acceso a canchas que registran cuotas pendientes.</p>
          <span className="font-bold text-amber-800 text-[11px] mt-2 block">
            {members.filter(m => m.categoryName === 'Deportes' && m.balance > 0).length} socios clasificados
          </span>
        </div>

        <div
          onClick={() => setSelectedSegment('recreacion_dia')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedSegment === 'recreacion_dia'
              ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <span className="font-bold text-slate-900 text-sm block">Recreación al Día</span>
          <p className="text-slate-500 mt-1">Socios de esparcimiento sin ninguna deuda acumulada.</p>
          <span className="font-bold text-emerald-800 text-[11px] mt-2 block">
            {members.filter(m => m.categoryName === 'Recreación' && m.balance === 0).length} socios clasificados
          </span>
        </div>

        <div
          onClick={() => setSelectedSegment('altas_recientes')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            selectedSegment === 'altas_recientes'
              ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <span className="font-bold text-slate-900 text-sm block">Socios Activos Fidelizados</span>
          <p className="text-slate-500 mt-1">Padrón activo para comunicados de asambleas y eventos institucionales del club.</p>
          <span className="font-bold text-blue-800 text-[11px] mt-2 block">
            {members.filter(m => m.balance === 0).length} socios clasificados
          </span>
        </div>
      </div>

      {/* Filtered Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Socios en el Segmento Activo ({filtered.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Código</th>
                <th className="py-2.5 px-4">Socio Titular</th>
                <th className="py-2.5 px-4">Categoría</th>
                <th className="py-2.5 px-4">Teléfono</th>
                <th className="py-2.5 px-4 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{m.code}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{m.fullName}</td>
                  <td className="py-2.5 px-4 text-slate-600">{m.categoryName}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{m.phone}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">
                    <span className={m.balance > 0 ? 'text-rose-600' : 'text-emerald-700'}>
                      {formatCurrency(m.balance)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
