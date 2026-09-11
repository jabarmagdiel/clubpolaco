"use client";

import React, { useState } from 'react';
import { AlertTriangle, Download, Search, MessageSquare, Eye } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { Member } from '@/types/crm';
import * as XLSX from 'xlsx';

export default function EstandarMorosidadPage() {
  const { members, quotas, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);

  const overdueList = members
    .filter((m) => m.balance > 0)
    .map((m, idx) => ({
      ...m,
      quotaCount: quotas.filter((q) => q.memberId === m.id && q.status === 'vencido').length || 1,
      daysOverdue: 35 + ((idx * 17) % 45),
    }))
    .filter((m) => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSendReminder = (m: Member) => {
    sendSingleWhatsApp(m.id, 'tmpl-3');
    toast({
      type: 'success',
      title: 'WhatsApp Enviado',
      message: `Recordatorio de mora despachado a ${m.fullName}`,
    });
  };

  const handleExport = () => {
    const data = overdueList.map(m => ({ Codigo: m.code, Socio: m.fullName, CI: m.ci, Telefono: m.phone, DiasMora: m.daysOverdue, CuotasVencidas: m.quotaCount, SaldoMora: m.balance }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Morosidad');
    XLSX.writeFile(wb, 'Morosidad_Club_Polaco_Estandar.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Cartera en Mora</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">Plan Estándar</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Control de Morosidad & Cobranza Directa</h1>
          <p className="text-xs text-slate-500">Gestión de socios con cuotas vencidas con disparador individual y masivo por WhatsApp.</p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Planilla</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filtrar moroso por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
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
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overdueList.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{m.code}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="font-bold text-slate-900 hover:text-polaco-600 hover:underline text-left"
                    >
                      {m.fullName}
                    </button>
                    <span className="block text-[11px] text-slate-400">Tel: {m.phone}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{m.categoryName}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-800">{m.quotaCount}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
                      {m.daysOverdue} días
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 text-sm">
                    {formatCurrency(m.balance)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleSendReminder(m)}
                        className="px-2.5 py-1 rounded bg-polaco-50 hover:bg-polaco-100 text-polaco-700 font-semibold text-[11px] border border-polaco-200 flex items-center gap-1 transition-colors"
                        title="Enviar recordatorio WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Aviso WA</span>
                      </button>
                      <button
                        onClick={() => setPaymentMember(m)}
                        className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                      >
                        Cobrar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        plan="estandar"
      />

      <ManualPaymentModal
        isOpen={!!paymentMember}
        onClose={() => setPaymentMember(null)}
        defaultMember={paymentMember}
      />
    </div>
  );
}
