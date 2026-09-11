"use client";

import React, { useState } from 'react';
import { Receipt, Search, Eye, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { Receipt as ReceiptType } from '@/types/crm';

export default function CompletoRecibosPage() {
  const { receipts } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);

  const filtered = receipts.filter(
    (r) =>
      r.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Facturación Electrónica Simbolizada
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Recibos Electrónicos Oficiales</h1>
          <p className="text-xs text-slate-500">Comprobantes correlativos con firma digital, validación QR y trazabilidad contable.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por número, socio o CI..."
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
                <th className="py-3 px-4">Número Oficial</th>
                <th className="py-3 px-4">Fecha Emisión</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Medio de Pago</th>
                <th className="py-3 px-4 text-right">Importe</th>
                <th className="py-3 px-4 text-center">Firma Digital</th>
                <th className="py-3 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{r.number}</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">{r.date}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-800">{r.memberName}</td>
                  <td className="py-3 px-4 font-sans capitalize">{r.method.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-700">{formatCurrency(r.amount)}</td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      ✓ Verificada
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors inline-flex items-center gap-1 text-[10px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Recibo</span>
                    </button>
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
