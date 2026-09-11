"use client";

import React, { useState } from 'react';
import { BarChart3, Download, Printer, FileSpreadsheet } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import * as XLSX from 'xlsx';

export default function EstandarReportesPage() {
  const { members, payments, quotas } = useCRM();
  const [reportTab, setReportTab] = useState<'cobranza' | 'socios' | 'mora'>('cobranza');

  const handleExport = () => {
    const data = payments.map(p => ({ Recibo: p.receiptNumber, Fecha: p.date, Socio: p.memberName, Metodo: p.method, Monto: p.amount }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'ReporteCobranza');
    XLSX.writeFile(wb, 'Reporte_Avanzado_Club_Polaco.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Business Intelligence</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">Plan Estándar</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Reportes & Métricas Avanzadas</h1>
          <p className="text-xs text-slate-500">Consolidado financiero de cobranza, altas de socios y efectividad de recaudación.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="py-2 px-3 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={handleExport}
            className="py-2 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white p-2 rounded-xl text-xs font-bold gap-2">
        <button
          onClick={() => setReportTab('cobranza')}
          className={`py-2 px-4 rounded-lg transition-colors ${reportTab === 'cobranza' ? 'bg-polaco-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Evolución de Cobranza
        </button>
        <button
          onClick={() => setReportTab('socios')}
          className={`py-2 px-4 rounded-lg transition-colors ${reportTab === 'socios' ? 'bg-polaco-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Padrón por Categorías
        </button>
      </div>

      {/* Table & Metrics */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-bold text-slate-900 text-sm">Resumen Ejecutivo de Recaudación</span>
          <span className="font-mono font-bold text-emerald-700 text-sm">
            Total Histórico: {formatCurrency(payments.reduce((a, b) => a + b.amount, 0))}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Comprobante</th>
                <th className="py-2.5 px-4">Fecha</th>
                <th className="py-2.5 px-4">Socio Titular</th>
                <th className="py-2.5 px-4">Medio de Pago</th>
                <th className="py-2.5 px-4 text-right">Importe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.slice(0, 10).map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{p.receiptNumber}</td>
                  <td className="py-2.5 px-4 text-slate-500">{p.date}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{p.memberName}</td>
                  <td className="py-2.5 px-4 capitalize text-slate-600">{p.method.replace('_', ' ')}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
