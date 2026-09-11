"use client";

import React from 'react';
import { CreditCard, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function CompletoMembresiasPage() {
  const { memberships, members } = useCRM();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Tarifario Enterprise
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Planes de Membresía</h1>
        <p className="text-xs text-slate-500">Manejo de aranceles institucionales, cobro recurrente e integración con pasarela de pagos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {memberships.map((mem) => {
          const count = members.filter(m => m.membershipId === mem.id).length;
          return (
            <div key={mem.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">{mem.name}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-black text-slate-950 font-mono">{formatCurrency(mem.monthlyFee)}</span>
                  <span className="text-xs text-slate-500 ml-1">/ {mem.periodicity}</span>
                </div>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Cuota institucional con generación automática de token para débito bancario.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{count} socios activos</span>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Activa
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
