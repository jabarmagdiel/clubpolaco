"use client";

import React, { useState } from 'react';
import {
  CalendarDays,
  MessageSquare,
  CheckSquare,
  Square,
  AlertTriangle,
  Download,
  Filter,
  Send,
  Layers,
  Sparkles,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { Member } from '@/types/crm';

export default function EstandarCobranzaPage() {
  const { members, quotas, sendBulkWhatsAppReminders, generateBulkQuotas, categories } = useCRM();
  const { toast } = useToast();

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isBulkQuotaOpen, setIsBulkQuotaOpen] = useState(false);
  const [bulkPeriod, setBulkPeriod] = useState('Octubre 2026');
  const [bulkDueDate, setBulkDueDate] = useState('2026-10-10');
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);

  // Overdue members for collection
  const debtors = members.filter((m) => m.balance > 0 && (categoryFilter ? m.categoryId === categoryFilter : true));

  const handleToggleSelect = (id: string) => {
    if (selectedMemberIds.includes(id)) {
      setSelectedMemberIds(selectedMemberIds.filter((mId) => mId !== id));
    } else {
      setSelectedMemberIds([...selectedMemberIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedMemberIds.length === debtors.length) {
      setSelectedMemberIds([]);
    } else {
      setSelectedMemberIds(debtors.map((d) => d.id));
    }
  };

  const handleSendBulkReminders = () => {
    if (selectedMemberIds.length === 0) {
      toast({ type: 'error', title: 'Selección vacía', message: 'Seleccione al menos un socio en mora.' });
      return;
    }

    sendBulkWhatsAppReminders(selectedMemberIds);
    toast({
      type: 'success',
      title: 'Recordatorios Despachados',
      message: `Se enviaron ${selectedMemberIds.length} avisos de cobranza por WhatsApp con éxito.`,
    });
    setSelectedMemberIds([]);
  };

  const handleGenerateQuotas = () => {
    const count = generateBulkQuotas(bulkPeriod, bulkDueDate);
    toast({
      type: 'success',
      title: 'Emisión Masiva Completada',
      message: `Se generaron ${count} cuotas segmentadas para el ciclo ${bulkPeriod}.`,
    });
    setIsBulkQuotaOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-polaco-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Gestión Avanzada de Cobranza
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Centro de Cobranzas y Recordatorios Masivos
          </h1>
          <p className="text-xs text-slate-500">
            Segmentación de socios morosos y despacho automatizado de recordatorios oficiales por WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBulkQuotaOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Generar Cuotas Masivas</span>
          </button>

          <button
            onClick={handleSendBulkReminders}
            disabled={selectedMemberIds.length === 0}
            className={`flex items-center gap-1.5 py-2 px-4 text-xs font-bold rounded-xl transition-all shadow-sm ${
              selectedMemberIds.length > 0
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enviar WhatsApp a ({selectedMemberIds.length}) seleccionados</span>
          </button>
        </div>
      </div>

      {/* Control Strip & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-polaco-700 transition-colors"
          >
            {selectedMemberIds.length === debtors.length && debtors.length > 0 ? (
              <CheckSquare className="w-4 h-4 text-polaco-600" />
            ) : (
              <Square className="w-4 h-4 text-slate-400" />
            )}
            <span>Seleccionar todos ({debtors.length} morosos)</span>
          </button>

          {selectedMemberIds.length > 0 && (
            <span className="bg-polaco-100 text-polaco-800 font-bold px-2 py-0.5 rounded-full text-[11px]">
              {selectedMemberIds.length} seleccionados
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Filtrar por Categoría:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-1.5 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
          >
            <option value="">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Debtors Table with Bulk Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Sel.</th>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Teléfono WhatsApp</th>
                <th className="py-3 px-4 text-center">Estado Notificación</th>
                <th className="py-3 px-4 text-right">Monto Vencido</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {debtors.map((m) => {
                const isSelected = selectedMemberIds.includes(m.id);
                return (
                  <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-polaco-50/40' : ''}`}>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleSelect(m.id)}
                        className="text-slate-500 hover:text-polaco-600 p-1"
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-polaco-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{m.code}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{m.fullName}</td>
                    <td className="py-3 px-4 text-slate-600">{m.categoryName}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{m.phone}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        Recordatorio Pendiente
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-rose-600 text-sm">
                      {formatCurrency(m.balance)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            sendBulkWhatsAppReminders([m.id]);
                            toast({ type: 'success', title: 'WhatsApp despachado', message: `Aviso enviado a ${m.fullName}` });
                          }}
                          className="px-2.5 py-1 rounded bg-polaco-50 hover:bg-polaco-100 text-polaco-700 font-semibold text-[11px] border border-polaco-200 flex items-center gap-1 transition-colors"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Avisar</span>
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Payment Modal */}
      <ManualPaymentModal
        isOpen={!!paymentMember}
        onClose={() => setPaymentMember(null)}
        defaultMember={paymentMember}
      />

      {/* Bulk Quotas Modal */}
      {isBulkQuotaOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 text-xs">
            <h3 className="text-base font-bold text-slate-900">Emisión Masiva de Cuotas por Categoría</h3>
            <p className="text-slate-500 mt-1">
              Genere de forma automática el ciclo de cobro para todos los socios según su categoría y membresía.
            </p>

            <div className="my-4 space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Período Fiscal</label>
                <input
                  type="text"
                  value={bulkPeriod}
                  onChange={(e) => setBulkPeriod(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha Límite de Pago</label>
                <input
                  type="date"
                  value={bulkDueDate}
                  onChange={(e) => setBulkDueDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsBulkQuotaOpen(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerateQuotas}
                className="flex-1 py-2 bg-polaco-600 hover:bg-polaco-700 text-white font-bold rounded-lg shadow-sm"
              >
                Generar Cuotas
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
