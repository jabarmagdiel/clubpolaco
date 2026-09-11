"use client";

import React, { useState } from 'react';
import { CalendarDays, Plus, Filter, Search, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';

export default function EconomicoCuotasPage() {
  const { quotas, generateBulkQuotas, members } = useCRM();
  const { toast } = useToast();

  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [bulkPeriod, setBulkPeriod] = useState('Octubre 2026');
  const [bulkDueDate, setBulkDueDate] = useState('2026-10-10');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const filteredQuotas = quotas.filter((q) => {
    const matchesSearch = q.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || q.memberCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? q.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const handleGenerateBulk = () => {
    const count = generateBulkQuotas(bulkPeriod, bulkDueDate);
    toast({
      type: 'success',
      title: 'Emisión Masiva Completada',
      message: `Se emitieron ${count} cuotas manuales para el ciclo ${bulkPeriod}.`,
    });
    setIsBulkModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Gestión de Cobranza</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Cuotas de Membresía</h1>
          <p className="text-xs text-slate-500">Emisión individual y masiva manual de obligaciones mensuales para socios.</p>
        </div>

        <button
          onClick={() => setIsBulkModalOpen(true)}
          className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-polaco-600 hover:bg-polaco-700 text-white shadow-2xs transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>Generar Cuotas Masivas</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por socio o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 outline-hidden focus:ring-2 focus:ring-polaco-600"
        >
          <option value="">Todos los Estados</option>
          <option value="pendiente">Pendientes</option>
          <option value="pagado">Pagadas</option>
          <option value="vencido">Vencidas (Mora)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Socio Titular</th>
                <th className="py-3 px-4">Período</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Vencimiento</th>
                <th className="py-3 px-4 text-right">Importe</th>
                <th className="py-3 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotas.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{q.memberName}</div>
                    <span className="text-[10px] font-mono text-slate-400 font-normal">{q.memberCode}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{q.period}</td>
                  <td className="py-3 px-4 text-slate-600">{q.concept}</td>
                  <td className="py-3 px-4 text-slate-500">{q.dueDate}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{formatCurrency(q.amount)}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        q.status === 'pagado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.status === 'vencido'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Generator Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Generación Masiva Manual de Cuotas</h3>
            <p className="text-xs text-slate-500 mt-1">
              Emitirá cuotas para los {members.length} socios registrados según el valor de su membresía.
            </p>

            <div className="my-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Período Fiscal</label>
                <input
                  type="text"
                  value={bulkPeriod}
                  onChange={(e) => setBulkPeriod(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Fecha de Vencimiento</label>
                <input
                  type="date"
                  value={bulkDueDate}
                  onChange={(e) => setBulkDueDate(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setIsBulkModalOpen(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleGenerateBulk}
                className="flex-1 py-2 bg-polaco-600 hover:bg-polaco-700 text-white font-bold rounded-lg"
              >
                Confirmar Emisión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
