"use client";

import React, { useState } from 'react';
import { History, ShieldAlert, Filter, Search, Terminal, ArrowRight } from 'lucide-react';
import { useCRM } from '@/lib/store';

export default function CompletoAuditoriaForensePage() {
  const { auditLogs } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  const filtered = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter ? log.riskLevel === riskFilter : true;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Auditoría Forense & Compliance
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Bitácora Forense con Diffs de Datos</h1>
          <p className="text-xs text-slate-500">Trazabilidad detallada con comparación de valor anterior vs nuevo, riesgo y metadatos de red.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por usuario, IP, acción o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden font-bold"
        >
          <option value="">Todos los Niveles de Riesgo</option>
          <option value="critico">Riesgo Crítico</option>
          <option value="medio">Riesgo Medio</option>
          <option value="bajo">Riesgo Bajo / Informativo</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((log) => (
          <div key={log.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs text-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full uppercase font-bold text-[10px] ${
                  log.riskLevel === 'critico' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  log.riskLevel === 'medio' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  Riesgo {log.riskLevel}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{log.action}</h3>
                <span className="text-slate-400 font-mono text-[11px]">[{log.module}]</span>
              </div>

              <div className="font-mono text-slate-400 text-[11px] flex items-center gap-3">
                <span>IP: {log.ip}</span>
                <span>•</span>
                <span>{log.timestamp}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Usuario Ejecutor</span>
                <span className="font-semibold text-slate-800">{log.user}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Registro Afectado</span>
                <span className="font-mono font-bold text-slate-800">{log.recordId}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Transaction Link</span>
                <span className="font-mono text-purple-700 font-bold">{log.transactionId || 'N/A'}</span>
              </div>
            </div>

            {/* Diffs Viewer */}
            {(log.previousValue || log.newValue) && (
              <div className="mt-2 p-3 bg-slate-950 text-white rounded-xl font-mono text-[11px] space-y-1">
                {log.previousValue && (
                  <div className="text-rose-400 flex items-start gap-2">
                    <span className="font-bold select-none">- ANTES:</span>
                    <span>{log.previousValue}</span>
                  </div>
                )}
                {log.newValue && (
                  <div className="text-emerald-400 flex items-start gap-2">
                    <span className="font-bold select-none">+ AHORA:</span>
                    <span>{log.newValue}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
