"use client";

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  CheckCheck,
  Check,
  Clock,
  AlertCircle,
  Sparkles,
  Users,
  Copy,
  Plus
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { formatCurrency } from '@/lib/utils';

export default function EstandarWhatsAppPage() {
  const { whatsappMessages, whatsappTemplates, members, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [selectedMemberId, setSelectedMemberId] = useState(members[0]?.id || '');
  const [selectedTemplateId, setSelectedTemplateId] = useState('tmpl-2');
  const [customMessage, setCustomMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'conversaciones' | 'plantillas' | 'envios'>('conversaciones');

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const selectedTemplate = whatsappTemplates.find((t) => t.id === selectedTemplateId);

  // Generate preview
  const previewText = customMessage || (selectedTemplate
    ? selectedTemplate.content
        .replace('{{nombre}}', selectedMember?.fullName || '')
        .replace('{{codigo}}', selectedMember?.code || '')
        .replace('{{concepto}}', 'Cuota Ordinaria Mensual')
        .replace('{{monto}}', String(selectedMember?.balance || 250))
        .replace('{{fecha_vencimiento}}', '10 de Septiembre de 2026')
        .replace('{{nro_recibo}}', 'REC-2026-0891')
    : '');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    sendSingleWhatsApp(selectedMemberId, selectedTemplateId, customMessage || undefined);
    toast({
      type: 'success',
      title: 'Mensaje WhatsApp Despachado (Demo)',
      message: `Simulación de entrega completada al número ${selectedMember?.phone}. Estado: Leído.`,
    });
    setCustomMessage('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Centro de Comunicación
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300">
              WhatsApp Business API Preparado
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Centro de Mensajería WhatsApp
          </h1>
          <p className="text-xs text-slate-500">
            Envío automatizado de avisos de cobranza, confirmaciones de pago y salutaciones de la colectividad.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Servicio WhatsApp: En Línea
          </span>
        </div>
      </div>

      {/* Main Grid: Chat Simulator & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Dispatcher Form / Live Chat Simulation */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Simulador de Envío Oficial</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              DEMO_MODE=true
            </span>
          </div>

          <form onSubmit={handleSend} className="space-y-4">
            
            {/* Member Select */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Destinatario (Socio Titular)</label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-hidden focus:ring-2 focus:ring-emerald-600"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} ({m.phone}) — {m.categoryName} — Saldo: {formatCurrency(m.balance)}
                  </option>
                ))}
              </select>
            </div>

            {/* Template Select */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Plantilla Formal Aprobada</label>
              <select
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  setCustomMessage('');
                }}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-hidden focus:ring-2 focus:ring-emerald-600"
              >
                {whatsappTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    [{t.category}] {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Chat Preview Bubble */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Previsualización de Mensaje en WhatsApp</label>
              <div className="p-4 bg-emerald-900/10 border border-emerald-600/30 rounded-2xl bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="max-w-md bg-white p-3.5 rounded-2xl shadow-sm border border-emerald-100 text-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-100 pb-1 font-semibold">
                    <span>Club Polanco Oficial • WhatsApp Business</span>
                    <span>10:21</span>
                  </div>
                  <p className="text-xs leading-relaxed whitespace-pre-line text-slate-700">
                    {previewText}
                  </p>
                  <div className="flex justify-end items-center gap-1 text-[10px] text-emerald-600 font-bold">
                    <span>Enviado</span>
                    <CheckCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Custom overwrite */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Personalizar o Agregar Mensaje Adicional</label>
              <textarea
                rows={2}
                placeholder="Escriba aquí para sobreescribir la plantilla..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Simular Envío Inmediato</span>
            </button>
          </form>
        </div>

        {/* Right: Templates Library & Live Message Logs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Templates Library */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs text-xs space-y-3">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>Plantillas Preconfiguradas</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">
                {whatsappTemplates.length} Oficiales
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {whatsappTemplates.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplateId(tmpl.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedTemplateId === tmpl.id
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{tmpl.name}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-tight">
                    {tmpl.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Message Log */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs text-xs space-y-3">
            <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
              <span>Historial de Envíos Recientes</span>
              <span className="text-[10px] text-emerald-700 font-bold">Tiempo Real</span>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {whatsappMessages.slice(0, 8).map((msg) => (
                <div key={msg.id} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{msg.memberName}</span>
                    <span className="text-[10px] font-mono text-slate-400">{msg.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 truncate">{msg.content}</div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-400 font-mono">{msg.phone}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      msg.status === 'leido' ? 'bg-emerald-100 text-emerald-800' :
                      msg.status === 'entregado' ? 'bg-blue-100 text-blue-800' :
                      msg.status === 'enviado' ? 'bg-slate-200 text-slate-700' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {msg.status === 'leido' && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                      {msg.status === 'entregado' && <CheckCheck className="w-3 h-3 text-blue-600" />}
                      {msg.status === 'enviado' && <Check className="w-3 h-3 text-slate-500" />}
                      <span>{msg.status}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
