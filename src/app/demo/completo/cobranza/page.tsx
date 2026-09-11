"use client";

import React, { useState } from 'react';
import { CalendarDays, Send, QrCode, Layers, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import Link from 'next/link';

export default function CompletoCobranzaPage() {
  const { members, sendBulkWhatsAppReminders } = useCRM();
  const { toast } = useToast();
  const debtors = members.filter(m => m.balance > 0);

  const handleBulkReminders = () => {
    sendBulkWhatsAppReminders(debtors.map(d => d.id));
    toast({
      type: 'success',
      title: 'Despacho Automatizado con Links de Pago QR',
      message: `Se enviaron recordatorios a ${debtors.length} socios morosos con enlace directo de cobro.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Gestión Integral de Cobranza
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Centro Financiero de Cobranzas</h1>
          <p className="text-xs text-slate-500">Recaudación omnicanal mediante pasarelas QR, enlaces de pago y conciliación inmediata.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBulkReminders}
            className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Despachar WhatsApp + QR a ({debtors.length}) Morosos</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 uppercase font-bold text-[10px]">Deuda Total Cartera</span>
          <div className="text-2xl font-black text-rose-600 mt-1 font-mono">
            {formatCurrency(debtors.reduce((a, b) => a + b.balance, 0))}
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 uppercase font-bold text-[10px]">Socios en Mora</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{debtors.length}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 uppercase font-bold text-[10px]">Efectividad Recuperación</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">94.2%</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          Socios con Deuda Activa
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Código</th>
                <th className="py-2.5 px-4">Socio</th>
                <th className="py-2.5 px-4">Categoría</th>
                <th className="py-2.5 px-4">Teléfono</th>
                <th className="py-2.5 px-4 text-right">Saldo Deudor</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {debtors.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{m.code}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{m.fullName}</td>
                  <td className="py-3 px-4 text-slate-600">{m.categoryName}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{m.phone}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">{formatCurrency(m.balance)}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/demo/completo/pagos/qr"
                      className="py-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg text-[10px] inline-flex items-center gap-1"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Generar QR</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
