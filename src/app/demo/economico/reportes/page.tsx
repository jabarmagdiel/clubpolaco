"use client";

import React, { useState } from 'react';
import { BarChart3, Download, FileSpreadsheet, Filter } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import * as XLSX from 'xlsx';

export default function EconomicoReportesPage() {
  const { members, payments, quotas } = useCRM();
  const [reportType, setReportType] = useState<'socios' | 'pagos' | 'cuotas' | 'morosidad'>('pagos');

  const handleExport = () => {
    let data: any[] = [];
    let filename = 'Reporte_Club_Polanco';

    if (reportType === 'socios') {
      data = members.map(m => ({ Codigo: m.code, Nombre: m.fullName, CI: m.ci, Categoria: m.categoryName, Membresia: m.membershipName, Estado: m.status, Saldo: m.balance }));
      filename = 'Reporte_Socios';
    } else if (reportType === 'pagos') {
      data = payments.map(p => ({ Recibo: p.receiptNumber, Fecha: p.date, Socio: p.memberName, Metodo: p.method, Monto: p.amount, Referencia: p.reference }));
      filename = 'Reporte_Pagos';
    } else if (reportType === 'cuotas') {
      data = quotas.map(q => ({ Socio: q.memberName, Periodo: q.period, Concepto: q.concept, Monto: q.amount, Vencimiento: q.dueDate, Estado: q.status }));
      filename = 'Reporte_Cuotas';
    } else {
      data = members.filter(m => m.balance > 0).map(m => ({ Codigo: m.code, Socio: m.fullName, CI: m.ci, Telefono: m.phone, Deuda: m.balance }));
      filename = 'Reporte_Morosidad';
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Módulo de Reportería</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Reportes Operativos</h1>
          <p className="text-xs text-slate-500">Generación y exportación de planillas de cobranza y padrón de socios a Excel.</p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white shadow-2xs transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Exportar a Excel (.xlsx)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white p-2 rounded-xl text-xs font-bold gap-2">
        {(['pagos', 'socios', 'cuotas', 'morosidad'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setReportType(tab)}
            className={`py-2 px-4 rounded-lg capitalize transition-colors ${
              reportType === tab ? 'bg-polaco-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Reporte de {tab}
          </button>
        ))}
      </div>

      {/* Data Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700 uppercase tracking-wider">
            Vista Previa de Datos ({reportType.toUpperCase()})
          </span>
          <span className="text-slate-500">
            {reportType === 'pagos' ? `${payments.length} registros` :
             reportType === 'socios' ? `${members.length} registros` :
             reportType === 'cuotas' ? `${quotas.length} registros` :
             `${members.filter(m => m.balance > 0).length} registros`}
          </span>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] sticky top-0">
              {reportType === 'pagos' && (
                <tr>
                  <th className="py-2.5 px-4">Recibo</th>
                  <th className="py-2.5 px-4">Fecha</th>
                  <th className="py-2.5 px-4">Socio</th>
                  <th className="py-2.5 px-4">Método</th>
                  <th className="py-2.5 px-4 text-right">Importe</th>
                </tr>
              )}
              {reportType === 'socios' && (
                <tr>
                  <th className="py-2.5 px-4">Código</th>
                  <th className="py-2.5 px-4">Nombre</th>
                  <th className="py-2.5 px-4">Categoría</th>
                  <th className="py-2.5 px-4">Estado</th>
                  <th className="py-2.5 px-4 text-right">Saldo</th>
                </tr>
              )}
              {reportType === 'cuotas' && (
                <tr>
                  <th className="py-2.5 px-4">Socio</th>
                  <th className="py-2.5 px-4">Período</th>
                  <th className="py-2.5 px-4">Vencimiento</th>
                  <th className="py-2.5 px-4">Estado</th>
                  <th className="py-2.5 px-4 text-right">Importe</th>
                </tr>
              )}
              {reportType === 'morosidad' && (
                <tr>
                  <th className="py-2.5 px-4">Código</th>
                  <th className="py-2.5 px-4">Socio</th>
                  <th className="py-2.5 px-4">Teléfono</th>
                  <th className="py-2.5 px-4 text-right">Monto Deuda</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportType === 'pagos' && payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{p.receiptNumber}</td>
                  <td className="py-2.5 px-4 text-slate-500">{p.date}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{p.memberName}</td>
                  <td className="py-2.5 px-4 capitalize text-slate-600">{p.method.replace('_', ' ')}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                </tr>
              ))}
              {reportType === 'socios' && members.map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{m.code}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{m.fullName}</td>
                  <td className="py-2.5 px-4 text-slate-600">{m.categoryName}</td>
                  <td className="py-2.5 px-4 capitalize font-semibold">{m.status}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold">{formatCurrency(m.balance)}</td>
                </tr>
              ))}
              {reportType === 'cuotas' && quotas.slice(0, 30).map(q => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{q.memberName}</td>
                  <td className="py-2.5 px-4 text-slate-700">{q.period}</td>
                  <td className="py-2.5 px-4 text-slate-500">{q.dueDate}</td>
                  <td className="py-2.5 px-4 capitalize">{q.status}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold">{formatCurrency(q.amount)}</td>
                </tr>
              ))}
              {reportType === 'morosidad' && members.filter(m => m.balance > 0).map(m => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{m.code}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{m.fullName}</td>
                  <td className="py-2.5 px-4 text-slate-500">{m.phone}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-rose-700">{formatCurrency(m.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
