"use client";

import React, { useState } from 'react';
import { MessageSquare, Send, CheckCheck, Sparkles, Filter, BarChart3, Users, Clock } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

export default function CompletoWhatsAppPage() {
  const { whatsappMessages, whatsappTemplates, members, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [segmentFilter, setSegmentFilter] = useState('deportes_mora');
  const [selectedTemplate, setSelectedTemplate] = useState('tmpl-3');

  // WhatsApp Advanced Metrics
  const totalSent = whatsappMessages.length || 24;
  const deliveredCount = 23;
  const readCount = 21;
  const readRate = Math.round((readCount / totalSent) * 100);

  const handleSendSegmented = () => {
    toast({
      type: 'success',
      title: 'Campaña Segmentada Despachada',
      message: 'Se despachó aviso con enlace QR únicamente a socios de la categoría Deportes con mora > Bs 200.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Meta Cloud API Enterprise
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">WhatsApp Enterprise & Segmentación</h1>
          <p className="text-xs text-slate-500">Métricas avanzadas de lectura, campañas hiper-segmentadas y trazabilidad por cuota.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Tasa de Lectura: {readRate}%
          </span>
        </div>
      </div>

      {/* 4 WhatsApp Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Total Mensajes</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{totalSent}</div>
          <span className="text-slate-400 text-[11px]">Enviados este ciclo</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Entregados</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{deliveredCount}</div>
          <span className="text-blue-700 font-semibold text-[11px]">98% efectividad</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Leídos por Socios</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{readCount}</div>
          <span className="text-emerald-700 font-semibold text-[11px]">Acuse de lectura azul</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Errores de Envío</span>
          <div className="text-2xl font-black text-slate-400 mt-1">0</div>
          <span className="text-slate-400 text-[11px]">Líneas verificadas</span>
        </div>
      </div>

      {/* Segmented Campaign Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Disparo Segmentado con Enlace Dinámico QR</h3>
            <p className="text-slate-500 text-[11px]">Filtre socios por categoría y nivel de deuda para cobranza dirigida.</p>
          </div>
          <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
            Regla de Segmentación
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Criterio de Segmentación</label>
            <select
              value={segmentFilter}
              onChange={e => setSegmentFilter(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-medium"
            >
              <option value="deportes_mora">Categoría Deportes + Mora &gt; Bs 200</option>
              <option value="recreacion_mora">Categoría Recreación + Mora &gt; Bs 400</option>
              <option value="cumpleanos_semana">Cumpleañeros de la semana</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Plantilla Formal</label>
            <select
              value={selectedTemplate}
              onChange={e => setSelectedTemplate(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-medium"
            >
              {whatsappTemplates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSendSegmented}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Lanzar Disparo Segmentado</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Historial Completo de Mensajería
        </div>
        <div className="divide-y divide-slate-100">
          {whatsappMessages.map((msg) => (
            <div key={msg.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{msg.memberName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({msg.phone})</span>
                  <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                    {msg.templateName}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">{msg.content}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                <span className="inline-flex items-center gap-1 font-bold text-[10px] uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{msg.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
