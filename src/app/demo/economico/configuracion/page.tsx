"use client";

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function EconomicoConfiguracionPage() {
  const { toast } = useToast();
  const [clubName, setClubName] = useState('Club Polaco');
  const [nit, setNit] = useState('1028391024');
  const [address, setAddress] = useState('Av. 6 de Agosto #1200');
  const [phone, setPhone] = useState('+591 2 2441920');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      type: 'success',
      title: 'Ajustes guardados',
      message: 'Los parámetros institucionales fueron actualizados.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Parámetros Generales</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Configuración del Club</h1>
        <p className="text-xs text-slate-500">Datos institucionales que figuran en el encabezado de recibos y reportes.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-2xl text-xs">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Razón Social Institucional</label>
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Número de NIT</label>
              <input
                type="text"
                value={nit}
                onChange={(e) => setNit(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Teléfono Institucional</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dirección / Sede</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 bg-polaco-600 hover:bg-polaco-700 text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Parámetros</span>
          </button>
        </form>
      </div>
    </div>
  );
}
