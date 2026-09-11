"use client";

import React from 'react';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';

export default function EstandarMembresiasPage() {
  const { memberships, members } = useCRM();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tarifario de Membresías</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">Plan Estándar</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Tipos de Membresía</h1>
        <p className="text-xs text-slate-500">Estructura arancelaria y cuotas ordinarias vigentes en el Club Polaco.</p>
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
                  Cuota estándar institucional con acceso a instalaciones deportivas y club house.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{count} socios activos</span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Vigente
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
