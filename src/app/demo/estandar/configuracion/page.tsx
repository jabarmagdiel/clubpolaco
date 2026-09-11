"use client";

import React, { useState } from 'react';
import { Settings, Save, Sparkles, MessageSquare } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function EstandarConfiguracionPage() {
  const { toast } = useToast();
  const [senderName, setSenderName] = useState('Club Polaco - Secretaría');
  const [waPhone, setWaPhone] = useState('+591 2 2441920');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ type: 'success', title: 'Ajustes guardados', message: 'Parámetros de comunicación actualizados.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Parámetros del Sistema</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">Plan Estándar</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Configuración de Canales</h1>
        <p className="text-xs text-slate-500">Ajustes del remitente de WhatsApp y notificaciones automáticas.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-xl text-xs">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nombre Remitente WhatsApp Business</label>
            <input
              type="text"
              value={senderName}
              onChange={e => setSenderName(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Línea Oficial WhatsApp</label>
            <input
              type="text"
              value={waPhone}
              onChange={e => setWaPhone(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-slate-900 font-mono"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 bg-polaco-600 hover:bg-polaco-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
        </form>
      </div>
    </div>
  );
}
