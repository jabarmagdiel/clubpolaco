"use client";

import React, { useState } from 'react';
import { Activity, Search, Eye, ArrowRight, ShieldCheck, QrCode, CreditCard } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function CompletoTransaccionesPage() {
  const { payments } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');

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
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Libro Contable Digital</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Transacciones Digitales</h1>
          <p className="text-xs text-slate-500">Registro unificado de transacciones procesadas por pasarelas QR y Tarjetas con trazabilidad.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por Transaction ID, socio o recibo..."
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
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Fecha & Hora</th>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Canal / Pasarela</th>
                <th className="py-3 px-4">Comprobante Oficial</th>
                <th className="py-3 px-4 text-right">Importe Liquidado</th>
                <th className="py-3 px-4 text-center">Trazabilidad Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.transactionId || p.reference}</td>
                  <td className="py-3 px-4 text-slate-500">{p.date}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{p.memberName}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                      {p.method === 'qr_dinamico' ? <QrCode className="w-3 h-3 text-emerald-600" /> : <CreditCard className="w-3 h-3 text-indigo-600" />}
                      {p.method.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{p.receiptNumber}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 text-sm">{formatCurrency(p.amount)}</td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      href={`/demo/completo/pagos/${p.id}`}
                      className="px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px] border border-amber-200 transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-700" />
                      <span>Ver Timeline</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
