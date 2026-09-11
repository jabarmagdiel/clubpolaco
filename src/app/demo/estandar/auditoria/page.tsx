"use client";

import React, { useState } from 'react';
import { History, Shield, Filter, Search, User, Terminal } from 'lucide-react';
import { useCRM } from '@/lib/store';

export default function EstandarAuditoriaPage() {
  const { auditLogs } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.recordId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter ? log.module === moduleFilter : true;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Trazabilidad Interna</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Bitácora de Auditoría</h1>
          <p className="text-xs text-slate-500">Registro cronológico de operaciones, pagos, envíos WhatsApp e IPs simuladas.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por acción, usuario o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
          />
        </div>

        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
        >
          <option value="">Todos los Módulos</option>
          <option value="Caja / Cobranza">Caja / Cobranza</option>
          <option value="CRM Socios">CRM Socios</option>
          <option value="WhatsApp Cobranza">WhatsApp Cobranza</option>
          <option value="Automatizaciones">Automatizaciones</option>
          <option value="Membresías">Membresías</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Fecha y Hora</th>
                <th className="py-3 px-4">Usuario Responsable</th>
                <th className="py-3 px-4">Acción Realizada</th>
                <th className="py-3 px-4">Módulo</th>
                <th className="py-3 px-4">Registro / Referencia</th>
                <th className="py-3 px-4">IP Origen</th>
                <th className="py-3 px-4 text-center">Nivel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-800">{log.user}</td>
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">{log.action}</td>
                  <td className="py-3 px-4 font-sans text-slate-600">{log.module}</td>
                  <td className="py-3 px-4 text-slate-500">{log.recordId}</td>
                  <td className="py-3 px-4 text-slate-600">{log.ip}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded uppercase font-bold text-[9px] ${
                      log.riskLevel === 'critico' ? 'bg-rose-100 text-rose-800' :
                      log.riskLevel === 'medio' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.riskLevel}
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
