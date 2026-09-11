"use client";

import React, { useState } from 'react';
import { CalendarDays, QrCode, Search, Layers, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function CompletoCuotasPage() {
  const { quotas } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = quotas.filter(q =>
    q.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.memberCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Gestión Cuotas Enterprise
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Cuotas Ordinarias de Membresía</h1>
          <p className="text-xs text-slate-500">Obligaciones mensuales con generación dinámica de QR por cuota.</p>
        </div>

        <Link
          href="/demo/completo/pagos/qr"
          className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center gap-1.5"
        >
          <QrCode className="w-4 h-4" />
          <span>Generar Cobro QR</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por socio o código..."
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
                <th className="py-2.5 px-4">Socio Titular</th>
                <th className="py-2.5 px-4">Período</th>
                <th className="py-2.5 px-4">Concepto</th>
                <th className="py-2.5 px-4">Vencimiento</th>
                <th className="py-2.5 px-4 text-right">Importe</th>
                <th className="py-2.5 px-4 text-center">Estado</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(q => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{q.memberName}</div>
                    <span className="text-[10px] font-mono text-slate-400">{q.memberCode}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{q.period}</td>
                  <td className="py-3 px-4 text-slate-600">{q.concept}</td>
                  <td className="py-3 px-4 text-slate-500">{q.dueDate}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{formatCurrency(q.amount)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      q.status === 'pagado' ? 'bg-emerald-100 text-emerald-800' :
                      q.status === 'vencido' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {q.status !== 'pagado' && (
                      <Link
                        href="/demo/completo/pagos/qr"
                        className="py-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg text-[10px] inline-flex items-center gap-1"
                      >
                        <QrCode className="w-3 h-3" />
                        <span>Cobro QR</span>
                      </Link>
                    )}
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
