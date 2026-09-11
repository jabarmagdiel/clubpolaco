"use client";

import React, { useState } from 'react';
import { Receipt, Search, Printer, Download, Eye } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { Receipt as ReceiptType } from '@/types/crm';

export default function EconomicoRecibosPage() {
  const { receipts } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);

  const filteredReceipts = receipts.filter(
    (r) =>
      r.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.memberCi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Documentos Fiscales</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Recibos Emitidos</h1>
          <p className="text-xs text-slate-500">Histórico de comprobantes y recibos oficiales con firma digital y formato imprimible.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nro. recibo, socio o CI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Número</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Documento (CI)</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4 text-right">Monto</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReceipts.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{r.number}</td>
                  <td className="py-3 px-4 text-slate-500">{r.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{r.memberName}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{r.memberCi}</td>
                  <td className="py-3 px-4 text-slate-600">{r.concept}</td>
                  <td className="py-3 px-4 capitalize text-slate-700">{r.method.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700">{formatCurrency(r.amount)}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold transition-colors inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver / Imprimir</span>
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
