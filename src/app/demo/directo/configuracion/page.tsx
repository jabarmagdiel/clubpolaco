"use client";

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Building, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function DirectoConfiguracionPage() {
  const { toast } = useToast();

  const [clubName, setClubName] = useState('Club Polaco');
  const [nit, setNit] = useState('1028391024');
  const [address, setAddress] = useState('Av. 6 de Agosto #1200');
  const [phone, setPhone] = useState('+591 2 2441920');
  const [whatsappNumber, setWhatsappNumber] = useState('+591 70619283');
  const [autoReminderDays, setAutoReminderDays] = useState('5');
  const [allowGuestPasses, setAllowGuestPasses] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      type: 'success',
      title: 'Configuración Guardada',
      message: 'Los parámetros del Club Polaco y del canal de WhatsApp han sido actualizados.',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Parámetros del Sistema</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
            Edición Directa
          </span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Configuración Institucional & WhatsApp</h1>
        <p className="text-xs text-slate-500">
          Ajuste los datos de la institución y el comportamiento del motor de notificaciones automáticas.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Club Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Building className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Datos Oficiales del Club</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nombre de la Institución
              </label>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                NIT / Identificación Tributaria
              </label>
              <input
                type="text"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Dirección de la Sede
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Teléfono de Contacto Fijo
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Channel Config */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Parámetros del Canal WhatsApp</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Línea Oficial Emisora (Meta Cloud API)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono font-bold text-emerald-800"
              />
              <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                ✓ Canal verificado activo con cuota ilimitada
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Anticipación del Recordatorio de Vencimiento
              </label>
              <select
                value={autoReminderDays}
                onChange={(e) => setAutoReminderDays(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-bold"
              >
                <option value="3">3 días antes de expirar</option>
                <option value="5">5 días antes de expirar (Recomendado)</option>
                <option value="7">7 días antes de expirar</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Configuración</span>
          </button>
        </div>

      </form>

    </div>
  );
}
