"use client";

import React, { useState } from 'react';
import { AlertTriangle, Download, Search, Lock, DollarSign, Eye, ArrowUpRight } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { Member } from '@/types/crm';
import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function EconomicoMorosidadPage() {
  const { members, quotas } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);

  // Overdue members
  const overdueList = members
    .filter((m) => m.balance > 0)
    .map((m, idx) => {
      const vQuotas = quotas.filter((q) => q.memberId === m.id && q.status === 'vencido');
      const daysOverdue = 35 + ((idx * 17) % 45); // simulated realistic overdue days (35 to 80 days)
      return {
        ...m,
        quotaCount: vQuotas.length || 1,
        daysOverdue,
        lastPaymentDate: '2026-06-15',
      };
    })
    .filter((m) => m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalOverdue = overdueList.reduce((acc, m) => acc + m.balance, 0);

  const handleExportExcel = () => {
    const data = overdueList.map((m) => ({
      Codigo: m.code,
      Socio: m.fullName,
      CI: m.ci,
      Telefono: m.phone,
      Categoria: m.categoryName,
      CuotasVencidas: m.quotaCount,
      DiasAtraso: m.daysOverdue,
      MontoVencido: m.balance,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Morosidad');
    XLSX.writeFile(wb, 'Morosidad_Club_Polaco_Economico.xlsx');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Alerta de Cartera</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Control de Morosidad</h1>
          <p className="text-xs text-slate-500">Listado de socios con cuotas vencidas y días de mora acumulada.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Socios en Mora</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{overdueList.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Cartera Total Vencida</span>
          <div className="text-2xl font-black text-rose-700 font-mono mt-1">{formatCurrency(totalOverdue)}</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Promedio Días de Atraso</span>
          <div className="text-2xl font-black text-slate-900 mt-1">48 días</div>
        </div>
      </div>

      {/* Locked Feature Notice */}
      <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Gestión Automatizada de WhatsApp no disponible en este plan.</strong> En el <strong>Plan Estándar</strong> puede seleccionar estos socios y enviar recordatorios de cobranza masivos con un solo clic.
          </span>
        </div>
        <Link
          href="/demo/estandar/cobranza"
          className="shrink-0 font-bold text-amber-900 hover:underline flex items-center gap-1"
        >
          <span>Ver Plan Estándar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center text-xs">
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

      {/* Morosos Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4 text-center">Cuotas Vencidas</th>
                <th className="py-3 px-4 text-center">Días de Atraso</th>
                <th className="py-3 px-4 text-right">Monto Vencido</th>
                <th className="py-3 px-4 text-right">Acción</th>
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
                    <span className="block text-[11px] text-slate-500">Tel: {m.phone}</span>
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
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                        title="Ver detalle del socio"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPaymentMember(m)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold shadow-2xs transition-colors"
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
        plan="economico"
      />

      <ManualPaymentModal
        isOpen={!!paymentMember}
        onClose={() => setPaymentMember(null)}
        defaultMember={paymentMember}
      />
    </div>
  );
}
