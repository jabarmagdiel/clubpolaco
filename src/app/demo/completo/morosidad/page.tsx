"use client";

import React, { useState } from 'react';
import { AlertTriangle, Download, QrCode, Search, Send, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function CompletoMorosidadPage() {
  const { members, quotas, sendBulkWhatsAppReminders } = useCRM();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const overdue = members
    .filter((m) => m.balance > 0)
    .map((m, idx) => ({
      ...m,
      quotaCount: quotas.filter((q) => q.memberId === m.id && q.status === 'vencido').length || 1,
      daysOverdue: 35 + ((idx * 17) % 45),
    }))
    .filter((m) => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleExport = () => {
    const data = overdue.map(m => ({ Codigo: m.code, Socio: m.fullName, CI: m.ci, Telefono: m.phone, DiasMora: m.daysOverdue, CuotasVencidas: m.quotaCount, SaldoMora: m.balance }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'MorosidadEnterprise');
    XLSX.writeFile(wb, 'Morosidad_Completo_Club_Polanco.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Scoring de Cartera Vencida
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Control de Morosidad & Recuperación QR</h1>
          <p className="text-xs text-slate-500">Cobranza automatizada mediante enlaces dinámicos de pago e integración bancaria.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="py-2.5 px-4 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Planilla</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filtrar moroso por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4 text-center">Cuotas Vencidas</th>
                <th className="py-3 px-4 text-center">Días de Atraso</th>
                <th className="py-3 px-4 text-right">Monto Vencido</th>
                <th className="py-3 px-4 text-right">Acciones Directas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overdue.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{m.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{m.fullName}</td>
                  <td className="py-3 px-4 text-slate-600">{m.categoryName}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{m.quotaCount}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
                      {m.daysOverdue} días
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 text-sm">{formatCurrency(m.balance)}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/demo/completo/pagos/qr"
                      className="py-1 px-3 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg text-[10px] inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Cobrar con QR</span>
                    </Link>
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
