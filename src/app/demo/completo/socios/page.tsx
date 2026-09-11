"use client";

import React, { useState } from 'react';
import { Users, Search, QrCode, MessageSquare, Eye, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import Link from 'next/link';
import { Member } from '@/types/crm';

export default function CompletoSociosPage() {
  const { members, categories } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);

  const filtered = members.filter((m) => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.toLowerCase().includes(searchTerm.toLowerCase()) || m.ci.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter ? m.categoryId === categoryFilter : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              CRM Enterprise & Scoring Financiero
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Base Integral de Socios</h1>
          <p className="text-xs text-slate-500">Padrón unificado con scoring de cumplimiento, enlaces de pago dinámico y auditoría de eventos.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por socio, documento, código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden font-bold"
        >
          <option value="">Todas las Categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Scoring Histórico</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Saldo Pendiente</th>
                <th className="py-3 px-4 text-right">Acciones Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{m.code}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => setSelectedMember(m)} className="font-bold text-slate-900 hover:text-polaco-600 hover:underline text-left">
                      {m.fullName}
                    </button>
                    <span className="block text-[11px] text-slate-400 font-mono">{m.ci}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{m.categoryName}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                        <div className={`h-full ${m.balance === 0 ? 'bg-emerald-500 w-full' : 'bg-rose-500 w-1/3'}`} />
                      </div>
                      <span className="text-[10px] font-bold font-mono">{m.balance === 0 ? '98/100' : '45/100'}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      m.status === 'activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold">
                    <span className={m.balance > 0 ? 'text-rose-600' : 'text-slate-400'}>
                      {formatCurrency(m.balance)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                        title="Ver perfil completo"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link
                        href="/demo/completo/pagos/qr"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                        title="Generar QR bancario para este socio"
                      >
                        <QrCode className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setPaymentMember(m)}
                        className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold"
                      >
                        Cobro
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
        plan="completo"
        onOpenPaymentModal={(m) => setPaymentMember(m)}
      />

      <ManualPaymentModal
        isOpen={!!paymentMember}
        onClose={() => setPaymentMember(null)}
        defaultMember={paymentMember}
      />
    </div>
  );
}
