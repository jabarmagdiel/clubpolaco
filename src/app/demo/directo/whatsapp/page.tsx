"use client";

import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Smartphone,
  PhoneCall,
  Bot,
  Zap,
  Gift
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { formatCurrency } from '@/lib/utils';

export default function DirectoWhatsAppPage() {
  const { members, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [activeScenario, setActiveScenario] = useState<'preventivo' | 'vencido' | 'pago_exitoso' | 'bienvenida'>('preventivo');

  // Simulated messages for the smartphone view
  const scenarioMessages = {
    preventivo: `🇵🇱 CLUB POLACO — AVISO DE VIGENCIA
Estimado(a) socio(a) ${selectedMember?.fullName || 'Jan Kowalski'} (Código: ${selectedMember?.code || '#POL-001'}):

Le saludamos cordialmente. Le informamos que su membresía en la categoría ${selectedMember?.categoryName || 'Deportes'} tiene fecha de vencimiento el próximo 15 de Septiembre.

Para mantener activo su acceso a las canchas e instalaciones deportivas sin interrupciones, agradecemos regularizar su cuota mensual de ${formatCurrency(selectedMember?.balance || 250)}.

🏦 Cta BNB: 1000-293819
Titular: Club Polaco`,

    vencido: `🚨 CLUB POLACO — MEMBRESÍA VENCIDA
Estimado(a) socio(a) ${selectedMember?.fullName || 'Jan Kowalski'}:

Le informamos que a la fecha su membresía registra cuotas vencidas. Por normativa del Club, el ingreso a las instalaciones se encuentra temporalmente restringido.

Monto pendiente a regularizar: ${formatCurrency(selectedMember?.balance || 500)}.
Por favor envíe su comprobante por este medio para rehabilitación inmediata.`,

    pago_exitoso: `✅ CLUB POLACO — PAGO Y RENOVACIÓN CONFIRMADA
¡Muchas gracias, socio(a) ${selectedMember?.fullName || 'Jan Kowalski'}!

Hemos recibido y acreditado con éxito su pago de ${formatCurrency(selectedMember?.balance || 250)}.
Su membresía ha sido renovada hasta el 15 de Octubre de 2026.

Adjuntamos su Recibo Oficial timbrado: #REC-2026-0914. ¡Que disfrute de su Club!`,

    bienvenida: `🇵🇱 ¡BIENVENIDO(A) AL CLUB POLACO!
Estimado(a) socio(a) ${selectedMember?.fullName || 'Jan Kowalski'}:

Es un honor darle la bienvenida oficial a nuestra institución. Su membresía de ${selectedMember?.categoryName || 'Deportes'} ha sido habilitada.

A través de este canal oficial de WhatsApp podrá:
• Consultar su estado de cuenta y saldos.
• Recibir cronogramas de torneos y almuerzos.
• Renovar sus cuotas con facilidad.`
  };

  const handleTestDispatch = () => {
    sendSingleWhatsApp(
      selectedMember?.id || 'm-1',
      scenarioMessages[activeScenario],
      selectedMember?.phone || '+591 70123456'
    );
    toast({
      type: 'success',
      title: 'Disparo de Notificación Ejecutado',
      message: `Mensaje enviado al WhatsApp de ${selectedMember?.fullName} (${selectedMember?.phone}).`
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              Canal Oficial WhatsApp
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              Automatización de Expiraciones
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Motor de Avisos Automáticos de Membresía
          </h1>
          <p className="text-xs text-slate-500">
            Reglas inteligentes que notifican al socio antes de que caduque su carnet y envían confirmación al cobrar.
          </p>
        </div>

        <button
          onClick={handleTestDispatch}
          className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Play className="w-4 h-4" />
          <span>Probar Envío al Socio Seleccionado</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Scenarios & Automation Rules */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Member Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Socio Objetivo de Demostración:
            </label>
            <select
              value={selectedMember?.id}
              onChange={(e) => {
                const found = members.find(m => m.id === e.target.value);
                if (found) setSelectedMember(found);
              }}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 font-semibold"
            >
              {members.slice(0, 10).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName} ({m.phone}) — {m.categoryName} — Saldo: {formatCurrency(m.balance)}
                </option>
              ))}
            </select>
          </div>

          {/* Scenario Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Seleccione el Disparador Automático a Probar:
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => setActiveScenario('preventivo')}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  activeScenario === 'preventivo'
                    ? 'border-amber-500 bg-amber-50/50 text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div>1. Recordatorio Preventivo (3-5 días antes)</div>
                    <div className="text-[11px] font-normal text-slate-500">Avisa al socio cordialidad y datos de cuenta</div>
                  </div>
                </div>
                {activeScenario === 'preventivo' && <span className="text-amber-700 font-black">Activo</span>}
              </button>

              <button
                onClick={() => setActiveScenario('vencido')}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  activeScenario === 'vencido'
                    ? 'border-rose-500 bg-rose-50/50 text-rose-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-rose-100 text-rose-700">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div>2. Aviso de Expiración / Mora Activa</div>
                    <div className="text-[11px] font-normal text-slate-500">Notifica restricción de ingreso y solicitud de pago</div>
                  </div>
                </div>
                {activeScenario === 'vencido' && <span className="text-rose-700 font-black">Activo</span>}
              </button>

              <button
                onClick={() => setActiveScenario('pago_exitoso')}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  activeScenario === 'pago_exitoso'
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div>3. Confirmación de Pago & Renovación</div>
                    <div className="text-[11px] font-normal text-slate-500">Despacha el número de recibo y nueva vigencia</div>
                  </div>
                </div>
                {activeScenario === 'pago_exitoso' && <span className="text-emerald-700 font-black">Activo</span>}
              </button>

              <button
                onClick={() => setActiveScenario('bienvenida')}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  activeScenario === 'bienvenida'
                    ? 'border-blue-500 bg-blue-50/50 text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div>4. Bienvenida al Nuevo Socio</div>
                    <div className="text-[11px] font-normal text-slate-500">Mensaje inicial institucional de inducción</div>
                  </div>
                </div>
                {activeScenario === 'bienvenida' && <span className="text-blue-700 font-black">Activo</span>}
              </button>
            </div>
          </div>

        </div>

        {/* Right: Smartphone Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[390px] bg-slate-950 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800">
            
            {/* Notch */}
            <div className="h-5 w-36 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-950" />
            </div>

            {/* WhatsApp Screen */}
            <div className="bg-[#efeae2] rounded-[32px] overflow-hidden flex flex-col h-[560px] shadow-inner">
              
              {/* WhatsApp Header */}
              <div className="bg-[#075e54] text-white p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-polaco-700 text-white font-black text-xs flex items-center justify-center border-2 border-white/40">
                    CP
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">Club Polaco Oficial</div>
                    <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      en línea
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-white/80">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                <div className="text-center my-2">
                  <span className="text-[9px] bg-white/80 text-slate-600 px-2.5 py-0.5 rounded-md shadow-2xs font-medium">
                    HOY • CANAL INSTITUCIONAL OFICIAL
                  </span>
                </div>

                {/* Simulated Received Message */}
                <div className="flex flex-col items-start animate-in fade-in">
                  <div className="max-w-[90%] bg-white text-slate-900 rounded-xl rounded-tl-none p-3 text-xs shadow-xs leading-relaxed">
                    <p className="whitespace-pre-line">{scenarioMessages[activeScenario]}</p>
                    <div className="text-[9px] text-slate-400 text-right mt-1.5 flex items-center justify-end gap-1">
                      <span>10:30 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="bg-[#f0f2f5] p-2.5 flex items-center justify-center text-[11px] text-slate-500 font-semibold border-t border-slate-200">
                🔒 Chat cifrado institucional Club Polaco
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
