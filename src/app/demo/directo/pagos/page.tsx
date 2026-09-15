"use client";

import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Send,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { Receipt as ReceiptType } from '@/types/crm';

export default function DirectoPagosPage() {
  const { payments, receipts, members } = useCRM();
  const { toast } = useToast();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);
  const [search, setSearch] = useState('');

  const filteredPayments = payments.filter(p =>
    p.memberName.toLowerCase().includes(search.toLowerCase()) ||
    p.memberId.toLowerCase().includes(search.toLowerCase()) ||
    p.receiptNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenReceipt = (receiptNumber: string) => {
    const r = receipts.find(rec => rec.number === receiptNumber) || {
      id: 'rec-sample',
      number: receiptNumber,
      paymentId: 'pay-sample',
      memberId: 'm-1',
      memberName: 'Jan Kowalski',
      memberCode: 'POL-001',
      memberCi: '3819201',
      amount: 500,
      concept: 'Renovación de Membresía — Deportes',
      method: 'transfer',
      date: '2026-09-10',
      generatedBy: 'Caja Club Polanco',
      status: 'valido',
    };
    setSelectedReceipt(r as ReceiptType);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Receipt className="w-3.5 h-3.5" />
              Caja & Renovaciones
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              Notificación Automática por WhatsApp
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Cobranzas & Renovación de Membresías
          </h1>
          <p className="text-xs text-slate-500">
            Cada cobro registrado extiende la vigencia de la membresía del socio y despacha el recibo a su celular en el acto.
          </p>
        </div>

        <button
          onClick={() => setPaymentModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Cobro y Renovar</span>
        </button>
      </div>

      {/* Explanatory cascade card */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-5 rounded-2xl border border-emerald-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-xs space-y-0.5">
            <div className="font-bold text-sm text-white">Flujo Automatizado en 1 Solo Clic</div>
            <p className="text-slate-300">
              Al cobrar: <strong>1.</strong> Se cancela la deuda ➔ <strong>2.</strong> Se extiende la expiración (+30 días) ➔ <strong>3.</strong> Se envía WhatsApp al socio con su recibo oficial.
            </p>
          </div>
        </div>

        <span className="shrink-0 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          ✓ Sin trabajo manual repetitivo
        </span>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por socio, código o recibo..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-600 font-medium"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Recibo / Fecha</th>
                <th className="py-3 px-4">Socio Acreditado</th>
                <th className="py-3 px-4">Concepto de Membresía</th>
                <th className="py-3 px-4">Método de Pago</th>
                <th className="py-3 px-4 text-right">Monto Cobrado</th>
                <th className="py-3 px-4">WhatsApp Confirmado</th>
                <th className="py-3 px-4 text-center">Recibo Oficial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900">{p.receiptNumber}</div>
                    <div className="text-[11px] text-slate-400">{formatDate(p.date)}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{p.memberName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.memberId}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-800">
                      {p.notes || 'Renovación de Membresía'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 uppercase text-[11px] font-bold text-slate-600">
                    {p.method === 'efectivo' ? '💵 Efectivo' : p.method === 'transferencia' ? '🏦 Transferencia' : '📱 QR Bancario'}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 text-sm">
                    {formatCurrency(p.amount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <Send className="w-3 h-3 text-emerald-600" />
                      Enviado (✓✓)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleOpenReceipt(p.receiptNumber)}
                      className="inline-flex items-center gap-1 py-1 px-2.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                      title="Ver o imprimir recibo oficial"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span>Ver Recibo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Payment Modal */}
      <ManualPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

    </div>
  );
}
