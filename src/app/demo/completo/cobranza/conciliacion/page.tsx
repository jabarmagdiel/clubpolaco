"use client";

import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Filter, ArrowRight, Check } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';

export default function CompletoConciliacionPage() {
  const { reconciliations, reconcileRecord, reconcileAllPending } = useCRM();
  const { toast } = useToast();
  const [filter, setFilter] = useState<'todos' | 'conciliado' | 'pendiente' | 'diferencia'>('todos');

  const filtered = reconciliations.filter((r) => (filter === 'todos' ? true : r.status === filter));

  const countConciliados = reconciliations.filter((r) => r.status === 'conciliado').length;
  const countPendientes = reconciliations.filter((r) => r.status === 'pendiente').length;
  const countDiferencias = reconciliations.filter((r) => r.status === 'diferencia').length;
  const totalConciliado = reconciliations
    .filter((r) => r.status === 'conciliado')
    .reduce((acc, r) => acc + r.amount, 0);

  const handleAutoReconcile = () => {
    reconcileAllPending();
    toast({
      type: 'success',
      title: 'Conciliación Automática Ejecutada',
      message: 'Motor algorítmico cruzó todas las transacciones bancarias contra pagos del CRM al 100%.',
    });
  };

  const handleSingleReconcile = (id: string) => {
    reconcileRecord(id);
    toast({
      type: 'success',
      title: 'Transacción Conciliada',
      message: 'Coincidencia validada manualmente.',
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Tesorería & Matching Algorítmico
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Motor de Conciliación Bancaria</h1>
          <p className="text-xs text-slate-500">
            Cruce automatizado entre extractos bancarios de BNB / Tarjetas y los pagos asentados en el CRM.
          </p>
        </div>

        <button
          onClick={handleAutoReconcile}
          className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Simular Conciliación Automática 100%</span>
        </button>
      </div>

      {/* 4 KPIs Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Conciliados Exitosos</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{countConciliados}</div>
          <span className="text-[11px] text-slate-400">Coincidencia exacta de monto e ID</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Monto Total Conciliado</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">{formatCurrency(totalConciliado)}</div>
          <span className="text-[11px] text-slate-400">Fondos confirmados en banco</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Pendientes de Extracto</span>
          <div className="text-2xl font-black text-amber-600 mt-1">{countPendientes}</div>
          <span className="text-[11px] text-slate-400">Aguardando liquidación ACH</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Diferencias Detectadas</span>
          <div className="text-2xl font-black text-rose-600 mt-1">{countDiferencias}</div>
          <span className="text-[11px] text-slate-400">Comisiones bancarias o desajustes</span>
        </div>

      </div>

      {/* Table Section with Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Extracto Bancario vs Libro de Pagos CRM
            </span>
          </div>

          <div className="flex gap-1.5 bg-slate-200/70 p-1 rounded-lg">
            {(['todos', 'conciliado', 'pendiente', 'diferencia'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-md capitalize font-bold text-[11px] transition-colors ${
                  filter === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Ref. Extracto Banco</th>
                <th className="py-2.5 px-4">ID Pago en CRM</th>
                <th className="py-2.5 px-4">Fecha Extracto</th>
                <th className="py-2.5 px-4">Canal Financiero</th>
                <th className="py-2.5 px-4 text-right">Monto Extracto</th>
                <th className="py-2.5 px-4 text-center">Estado de Conciliación</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{r.bankTxId}</td>
                  <td className="py-3 px-4 text-blue-700 font-bold">{r.crmPaymentId || 'Sin pago vinculado'}</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">{r.bankDate}</td>
                  <td className="py-3 px-4 font-sans text-slate-700 font-medium">{r.channel}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{formatCurrency(r.amount)}</td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      r.status === 'conciliado' ? 'bg-emerald-100 text-emerald-800' :
                      r.status === 'diferencia' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {r.status === 'conciliado' && <Check className="w-3 h-3 text-emerald-600" />}
                      {r.status === 'diferencia' && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                      <span>{r.status}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    {r.status !== 'conciliado' ? (
                      <button
                        onClick={() => handleSingleReconcile(r.id)}
                        className="py-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded border border-emerald-200 text-[10px] transition-colors"
                      >
                        Conciliar
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">{r.matchedAt?.substring(11, 16)}</span>
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
