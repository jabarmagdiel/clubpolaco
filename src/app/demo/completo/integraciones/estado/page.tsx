"use client";

import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, Server, Wifi, Clock, ArrowRight } from 'lucide-react';

const SERVICES = [
  { name: 'Pasarela QR BNB Simple API', provider: 'Banco Nacional de Bolivia', status: 'Operativo', uptime: '99.98%', latency: '82 ms', endpoint: 'https://api.bnb.com.bo/qr/v2/charge' },
  { name: 'Pasarela Tarjetas CyberSource', provider: 'Red Enlace Bolivia / VisaNet', status: 'Operativo', uptime: '99.95%', latency: '124 ms', endpoint: 'https://secure.cybersource.com/v1/payments' },
  { name: 'Meta WhatsApp Business API', provider: 'Meta Cloud API Direct', status: 'Operativo', uptime: '100.0%', latency: '65 ms', endpoint: 'https://graph.facebook.com/v19.0/messages' },
  { name: 'Conector ERP Contable', provider: 'Siigo Cloud / ERP Club Polanco', status: 'Operativo', uptime: '99.90%', latency: '95 ms', endpoint: 'https://api.siigo.com/v1/journals' },
  { name: 'Servicio de Firma Digital Recibos', provider: 'Módulo Interno Club Polanco', status: 'Operativo', uptime: '100.0%', latency: '12 ms', endpoint: 'https://demo.clubpolanco.bo/api/crypto/sign' },
];

export default function CompletoEstadoServiciosPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Monitoreo de Infraestructura</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Estado de Servicios & APIs</h1>
        <p className="text-xs text-slate-500">Monitor de disponibilidad, latencias y salud de conexiones con entidades bancarias y sistemas externos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Disponibilidad Global</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">99.97%</div>
          <span className="text-slate-400 text-[11px]">Últimos 90 días</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Latencia Promedio</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-1">75 ms</div>
          <span className="text-emerald-700 font-semibold text-[11px]">Rendimiento óptimo</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Incidentes Reportados</span>
          <div className="text-2xl font-black text-slate-900 mt-1">0 activos</div>
          <span className="text-slate-400 text-[11px]">Operación continua</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Conexiones Externas Activas
        </div>
        <div className="divide-y divide-slate-100">
          {SERVICES.map((srv, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-900 text-sm">{srv.name}</span>
                </div>
                <p className="text-slate-500 mt-0.5">{srv.provider}</p>
                <code className="text-[10px] text-slate-400 mt-1 block font-mono">{srv.endpoint}</code>
              </div>

              <div className="flex items-center gap-6 font-mono text-slate-600">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-sans block">Uptime</span>
                  <span className="font-bold text-slate-800">{srv.uptime}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-sans block">Latencia</span>
                  <span className="font-bold text-emerald-700">{srv.latency}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase font-sans">
                  {srv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
