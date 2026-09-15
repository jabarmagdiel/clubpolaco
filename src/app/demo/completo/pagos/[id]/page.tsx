"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock,
  CheckCircle2,
  Receipt,
  MessageSquare,
  QrCode,
  Building2,
  Scale,
  ShieldCheck,
  ArrowLeft,
  Share2,
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function CompletoPaymentTraceabilityPage() {
  const params = useParams();
  const router = useRouter();
  const { payments, receipts } = useCRM();

  const paymentId = (params?.id as string) || 'pay-101';
  const payment = payments.find((p) => p.id === paymentId) || payments[0];
  const receipt = receipts.find((r) => r.paymentId === payment?.id);

  // High-impact step-by-step timeline
  const timelineSteps = [
    { time: '09:32', title: 'Cuota Generada en Sistema', desc: 'Emisión automática de cuota ordinaria de membresía por ciclo regular.', icon: CalendarDays, status: 'completed' },
    { time: '10:15', title: 'Código QR Dinámico Generado', desc: `Token bancario generado con BNB Simple API. Transacción ID: ${payment?.transactionId || 'TX-BNB-9812401'}.`, icon: QrCode, status: 'completed' },
    { time: '10:19', title: 'Pago Iniciado en Banca Móvil', desc: `Socio ${payment?.memberName} escaneó el código QR desde app de banca móvil autorizada.`, icon: ShieldCheck, status: 'completed' },
    { time: '10:20', title: 'Webhook Recibido y Validado', desc: 'Pasarela interbancaria notificó el evento payment.approved con firma digital HMAC SHA-256.', icon: Zap, status: 'completed' },
    { time: '10:20', title: 'Pago Confirmado y Acreditado', desc: `Importe de ${formatCurrency(payment?.amount || 250)} acreditado en la cuenta corriente del Club Polanco.`, icon: DollarSign, status: 'completed' },
    { time: '10:20', title: 'Cuota Actualizada & Saldo en Cero', desc: 'La cuota de membresía pasó a estado PAGADO y el saldo pendiente del socio se liquidó automáticamente.', icon: CheckCircle2, status: 'completed' },
    { time: '10:21', title: 'Recibo Electrónico Emitido', desc: `Comprobante correlativo oficial ${payment?.receiptNumber} generado con código QR de auditoría.`, icon: Receipt, status: 'completed' },
    { time: '10:21', title: 'Notificación WhatsApp Enviada', desc: `Aviso oficial despachado al número celular del socio con acuse de recibo y link de descarga.`, icon: MessageSquare, status: 'completed' },
    { time: '10:22', title: 'Pago Conciliado con Extracto', desc: 'El motor de conciliación cruzó la transacción con el extracto bancario con coincidencia del 100%.', icon: Scale, status: 'completed' },
    { time: '10:23', title: 'Sincronizado con Sistema Contable', desc: 'Asiento contable ID #AST-9812 generado en el Libro Auxiliar de Ingresos mediante API REST.', icon: Building2, status: 'completed' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Back button & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver a Pagos</span>
        </button>

        <span className="text-[10px] font-mono bg-slate-900 text-amber-300 font-bold px-2 py-0.5 rounded uppercase">
          Trazabilidad Enterprise
        </span>
      </div>

      {/* Transaction Hero Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                TRANSACCIÓN LIQUIDADA AL 100%
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {payment?.memberName}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Recibo: <strong className="text-white font-mono">{payment?.receiptNumber}</strong> • Ref: <strong className="text-white font-mono">{payment?.reference}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">Importe Cancelado</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono mt-0.5">
              {formatCurrency(payment?.amount || 250)}
            </div>
            <span className="text-[11px] text-slate-400 capitalize">{payment?.method.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs relative z-10">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Fecha del Cobro</span>
              <span className="font-semibold text-slate-200">{payment?.date}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Conciliación</span>
              <span className="font-semibold text-emerald-400">Conciliado (Live)</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Asiento Contable</span>
              <span className="font-semibold text-slate-200">Sincronizado</span>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Visual Timeline Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Timeline de Auditoría & Trazabilidad</h2>
            <p className="text-xs text-slate-500">Secuencia exacta de eventos disparados por la pasarela bancaria</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            10/10 Pasos Completados
          </span>
        </div>

        {/* The Timeline Track */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-emerald-400 before:to-emerald-600">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="relative group text-xs">
              
              {/* Pin indicator */}
              <div className="absolute -left-[27px] sm:-left-[35px] top-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md ring-4 ring-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>

              <div className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                      {step.time}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Paso #{idx + 1}</span>
                </div>
                <p className="text-slate-600 mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
import { Zap, CalendarDays } from 'lucide-react';
