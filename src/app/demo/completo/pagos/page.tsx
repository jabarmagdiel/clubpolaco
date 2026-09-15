"use client";

import React, { useState } from 'react';
import { Receipt, Search, Eye, QrCode, CreditCard, Sparkles, ArrowRight } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { Receipt as ReceiptType } from '@/types/crm';
import Link from 'next/link';

export default function CompletoPagosPage() {
  const { payments, receipts } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);

  const filtered = payments.filter(
    (p) =>
      p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.transactionId && p.transactionId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Libro Financiero de Pagos
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Libro de Pagos & Conciliaciones</h1>
          <p className="text-xs text-slate-500">Historial completo con timeline de trazabilidad, recibos con QR y asientos contables sincronizados.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/demo/completo/pagos/qr"
            className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span>Emitir QR Dinámico</span>
          </Link>
          <Link
            href="/demo/completo/pagos/tarjetas"
            className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Checkout Tarjetas</span>
          </Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por socio, recibo, transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Comprobante</th>
                <th className="py-3 px-4">Fecha & Hora</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Canal Digital</th>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4 text-right">Monto</th>
                <th className="py-3 px-4 text-center">Trazabilidad & Recibo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{p.receiptNumber}</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">{p.date}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-800">{p.memberName}</td>
                  <td className="py-3 px-4 font-sans capitalize">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[10px] font-bold">
                      {p.method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-purple-700 font-bold">{p.transactionId || p.reference}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700 text-sm">{formatCurrency(p.amount)}</td>
                  <td className="py-3 px-4 text-center font-sans">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={`/demo/completo/pagos/${p.id}`}
                        className="py-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg text-[10px] border border-amber-200 transition-colors inline-flex items-center gap-1"
                        title="Ver Timeline de Trazabilidad Completa del Pago"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-700" />
                        <span>Timeline</span>
                      </Link>
                      <button
                        onClick={() => {
                          const r = receipts.find(rec => rec.paymentId === p.id) || {
                            id: `rec-${p.id}`,
                            number: p.receiptNumber,
                            paymentId: p.id,
                            memberId: p.memberId,
                            memberName: p.memberName,
                            memberCi: p.memberCi,
                            memberCode: 'CP-001',
                            amount: p.amount,
                            concept: 'Cuota de Membresía',
                            method: p.method,
                            date: p.date,
                            generatedBy: 'Pasarela Digital Club Polanco',
                          };
                          setSelectedReceipt(r);
                        }}
                        className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-[10px]"
                      >
                        Recibo PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
}
