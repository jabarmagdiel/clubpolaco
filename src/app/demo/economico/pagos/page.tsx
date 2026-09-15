"use client";

import React, { useState } from 'react';
import { Receipt, Plus, Search, Filter, Printer, Download, CheckCircle2 } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { Receipt as ReceiptType } from '@/types/crm';

export default function EconomicoPagosPage() {
  const { payments, receipts } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);

  const filteredPayments = payments.filter(
    (p) =>
      p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Caja y Cobranzas</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Registro de Pagos</h1>
          <p className="text-xs text-slate-500">Asentamiento manual de ingresos en caja (Efectivo, QR manual, Transferencia).</p>
        </div>

        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Cobro en Caja</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por socio, recibo o referencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Nro. Recibo</th>
                <th className="py-3 px-4">Fecha y Hora</th>
                <th className="py-3 px-4">Socio Acreditado</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4">Referencia / Comprobante</th>
                <th className="py-3 px-4 text-right">Monto Cancelado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.receiptNumber}</td>
                  <td className="py-3 px-4 text-slate-500">{p.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{p.memberName}</td>
                  <td className="py-3 px-4 capitalize text-slate-600">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700">
                      {p.method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{p.reference}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 text-sm">
                    {formatCurrency(p.amount)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        const rec = receipts.find((r) => r.paymentId === p.id) || {
                          id: `rec-${p.id}`,
                          number: p.receiptNumber,
                          paymentId: p.id,
                          memberId: p.memberId,
                          memberName: p.memberName,
                          memberCi: p.memberCi,
                          memberCode: 'CP-001',
                          amount: p.amount,
                          concept: 'Cuota de Membresía Club Polanco',
                          method: p.method,
                          date: p.date,
                          generatedBy: 'Caja Club Polanco',
                        };
                        setSelectedReceipt(rec);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>Ver Recibo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ManualPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={(p) => {
          const rec = receipts.find((r) => r.paymentId === p.id);
          if (rec) setSelectedReceipt(rec);
        }}
      />

      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
}
