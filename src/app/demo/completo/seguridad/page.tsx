"use client";

import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, Users, KeyRound, Smartphone } from 'lucide-react';

const SESSIONS = [
  { user: 'admin@clubpolaco.bo', role: 'Superadministrador', device: 'Chrome on Windows 11 (La Paz, BO)', ip: '192.168.1.104', status: 'Activa' },
  { user: 'caja@clubpolaco.bo', role: 'Caja / Finanzas', device: 'Firefox on Windows 10 (Sede Sopocachi)', ip: '192.168.1.112', status: 'Activa' },
  { user: 'portal.socio@clubpolaco.bo', role: 'Jan Kowalski (Socio)', device: 'Safari on iPhone 15 (La Paz)', ip: '200.105.144.92', status: 'Activa' },
];

const FAILED_ATTEMPTS = [
  { timestamp: '2026-09-09 23:14:02', user: 'root@clubpolaco.bo', ip: '185.220.101.5', reason: 'Usuario inexistente bloqueado por WAF' },
  { timestamp: '2026-09-08 19:40:15', user: 'caja@clubpolaco.bo', ip: '192.168.1.112', reason: 'Contraseña errónea (1 intento superado)' },
];

export default function CompletoSeguridadPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Controles Administrativos</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Centro de Seguridad & Sesiones</h1>
        <p className="text-xs text-slate-500">Supervisión de accesos, sesiones simultáneas e integridad del sistema.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Sesiones Concurrentes</span>
          <div className="text-2xl font-black text-slate-900 mt-1">3 activas</div>
          <span className="text-emerald-700 font-semibold text-[11px]">Todas autorizadas</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Autenticación 2FA</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">Habilitada</div>
          <span className="text-slate-400 text-[11px]">Obligatoria para roles admin</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Intentos Bloqueados (24h)</span>
          <div className="text-2xl font-black text-rose-600 mt-1">2 detectados</div>
          <span className="text-slate-400 text-[11px]">Mitigación por IP rate-limit</span>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Sesiones Activas en Tiempo Real
        </div>
        <div className="divide-y divide-slate-100">
          {SESSIONS.map((s, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900 text-sm">{s.user}</span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {s.role}
                  </span>
                </div>
                <p className="text-slate-500 mt-0.5">{s.device}</p>
                <span className="font-mono text-[10px] text-slate-400">IP: {s.ip}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Failed Attempts */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Intentos de Acceso Bloqueados
        </div>
        <div className="divide-y divide-slate-100 font-mono text-[11px]">
          {FAILED_ATTEMPTS.map((f, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div>
                <span className="text-slate-400">{f.timestamp}</span> • <strong className="text-slate-800 font-sans">{f.user}</strong>
                <p className="text-slate-500 font-sans text-xs mt-0.5">{f.reason}</p>
              </div>
              <span className="text-rose-600 font-bold">{f.ip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
