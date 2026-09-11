"use client";

import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, KeyRound, Sparkles } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function CompletoConfiguracionPage() {
  const { toast } = useToast();
  const [apiKeyBnb, setApiKeyBnb] = useState('sec_bnb_live_8921049182301928');
  const [webhookSecret, setWebhookSecret] = useState('whsec_9012481902481092');
  const [accountingUrl, setAccountingUrl] = useState('https://api.siigo.com/v1');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ type: 'success', title: 'Configuración Enterprise Actualizada', message: 'Credenciales de APIs y Webhooks guardadas.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Parámetros Avanzados
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Configuración de Pasarelas & APIs</h1>
        <p className="text-xs text-slate-500">Parámetros de conexión bancaria, llaves de firma de Webhooks y endpoint contable.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs max-w-2xl text-xs">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">BNB Simple QR API Key</label>
            <input
              type="password"
              value={apiKeyBnb}
              onChange={e => setApiKeyBnb(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Webhook Secret (HMAC SHA-256)</label>
            <input
              type="password"
              value={webhookSecret}
              onChange={e => setWebhookSecret(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Base del Sistema Contable (ERP)</label>
            <input
              type="text"
              value={accountingUrl}
              onChange={e => setAccountingUrl(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg font-mono text-slate-900"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px] leading-relaxed">
            En entorno de demostración (<code>DEMO_MODE=true</code>), las llamadas a estos endpoints son simuladas de forma determinista para la presentación.
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Parámetros Enterprise</span>
          </button>
        </form>
      </div>
    </div>
  );
}
