"use client";

import React from 'react';
import { BarChart3, Download, Printer, FileSpreadsheet, TrendingUp } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import * as XLSX from 'xlsx';

export default function CompletoReportesPage() {
  const { payments, members, reconciliations } = useCRM();

  const handleExport = () => {
    const data = payments.map(p => ({
      Recibo: p.receiptNumber,
      Fecha: p.date,
      Socio: p.memberName,
      Metodo: p.method,
      Monto: p.amount,
      TransactionId: p.transactionId || 'MANUAL',
      Conciliado: p.conciliated ? 'SI' : 'NO',
      Contabilidad: p.accountingStatus || 'SINCRONIZADO',
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BI_Financiero');
    XLSX.writeFile(wb, 'Reporte_Financiero_Completo_Club_Polaco.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Financial Intelligence (BI)</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Ratios Financieros & Análisis BI</h1>
          <p className="text-xs text-slate-500">Métricas avanzadas de cobranza digital, velocidad de recaudación y cumplimiento contable.</p>
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
            <span>Exportar Libro BI (.xlsx)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Tasa de Aprobación QR</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">98.4%</div>
          <span className="text-[11px] text-slate-400">Sin rechazos interbancarios</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Velocidad de Cobro</span>
          <div className="text-2xl font-black text-slate-900 mt-1">2.4 días</div>
          <span className="text-[11px] text-emerald-700 font-semibold">-45% reducción vs manual</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Efectividad Conciliación</span>
          <div className="text-2xl font-black text-blue-600 mt-1">99.1%</div>
          <span className="text-[11px] text-slate-400">Coincidencia automática</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Tasa Integración ERP</span>
          <div className="text-2xl font-black text-purple-600 mt-1">100%</div>
          <span className="text-[11px] text-slate-400">Libro auxiliar al día</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-bold text-slate-900 text-sm">Libro de Conciliación & Contabilidad Integrada</span>
          <span className="font-mono text-slate-400">{payments.length} transacciones auditadas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px]">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] font-sans">
              <tr>
                <th className="py-2.5 px-4">Comprobante</th>
                <th className="py-2.5 px-4">Socio</th>
                <th className="py-2.5 px-4">Canal</th>
                <th className="py-2.5 px-4 text-right">Monto</th>
                <th className="py-2.5 px-4 text-center">Conciliación Bancaria</th>
                <th className="py-2.5 px-4 text-center">Asiento ERP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{p.receiptNumber}</td>
                  <td className="py-2.5 px-4 font-sans font-semibold text-slate-800">{p.memberName}</td>
                  <td className="py-2.5 px-4 font-sans capitalize">{p.method.replace('_', ' ')}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">{formatCurrency(p.amount)}</td>
                  <td className="py-2.5 px-4 text-center font-sans">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Conciliado 100%
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center font-sans">
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      AST-SYNC OK
                    </span>
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
