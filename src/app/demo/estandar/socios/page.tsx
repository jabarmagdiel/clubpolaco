"use client";

import React, { useState } from 'react';
import { Users, Search, Filter, MessageSquare, Plus, Eye, DollarSign, Tag, CheckCircle2, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { useToast } from '@/lib/toast';
import { Member } from '@/types/crm';

export default function EstandarSociosPage() {
  const { members, categories, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || m.code.toLowerCase().includes(searchTerm.toLowerCase()) || m.ci.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter ? m.categoryId === categoryFilter : true;
    const matchesTag = tagFilter ? m.tags?.includes(tagFilter) : true;
    return matchesSearch && matchesCat && matchesTag;
  });

  const handleSendReminder = (m: Member) => {
    sendSingleWhatsApp(m.id, 'tmpl-3');
    toast({
      type: 'success',
      title: 'WhatsApp Enviado',
      message: `Aviso oficial despachado al socio ${m.fullName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-polaco-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              CRM Avanzado & Segmentación
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Base Centralizada de Socios</h1>
          <p className="text-xs text-slate-500">Historial de comunicación, etiquetas y acciones directas por WhatsApp.</p>
        </div>
      </div>

      {/* Filters Bar with Tags */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por socio, documento, código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 outline-hidden"
          >
            <option value="">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 outline-hidden"
          >
            <option value="">Todas las Etiquetas</option>
            <option value="Al Día">Al Día</option>
            <option value="Cobranza Urgente">Cobranza Urgente</option>
            <option value="Frecuente">Frecuente</option>
            <option value="Mora > 60d">Mora &gt; 60d</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Nombre y Apellidos</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Teléfono WhatsApp</th>
                <th className="py-3 px-4">Etiquetas</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Saldo</th>
                <th className="py-3 px-4 text-right">Acciones Directas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{m.code}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="font-bold text-slate-900 hover:text-polaco-600 hover:underline text-left"
                    >
                      {m.fullName}
                    </button>
                    <span className="block text-[11px] text-slate-400">{m.ci}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{m.categoryName}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{m.phone}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {m.tags?.map((t, i) => (
                        <span key={i} className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          t.includes('Urgente') ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {t}
                        </span>
                      ))}
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
                      {m.balance > 0 && (
                        <button
                          onClick={() => handleSendReminder(m)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                          title="Enviar aviso WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setPaymentMember(m)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-900 text-white rounded text-[11px] font-bold"
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
        plan="estandar"
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
