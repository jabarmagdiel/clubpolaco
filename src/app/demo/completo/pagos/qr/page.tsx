"use client";

import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Smartphone,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import { Payment } from '@/types/crm';

export default function CompletoQrPage() {
  const { members, quotas, simulateQrPayment } = useCRM();
  const { toast } = useToast();

  const [selectedMemberId, setSelectedMemberId] = useState('mem-001'); // Jan Kowalski default
  const [selectedQuotaId, setSelectedQuotaId] = useState('');
  const [amount, setAmount] = useState<number>(250);
  const [concept, setConcept] = useState('Cuota Ordinaria Septiembre 2026');
  
  // QR Transaction State
  const [txId, setTxId] = useState('TX-BNB-9812401');
  const [qrStatus, setQrStatus] = useState<'pendiente' | 'procesando' | 'pagado'>('pendiente');
  const [createdPayment, setCreatedPayment] = useState<Payment | null>(null);
  const [countdown, setCountdown] = useState(899); // 15 mins

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const memberQuotas = quotas.filter((q) => q.memberId === selectedMemberId && q.status !== 'pagado');

  useEffect(() => {
    // Generate fresh TX id when member changes
    setTxId(`TX-BNB-${Math.floor(1000000 + Math.random() * 9000000)}`);
    setQrStatus('pendiente');
    setCreatedPayment(null);
  }, [selectedMemberId]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSimulatePayment = async () => {
    setQrStatus('procesando');
    toast({
      type: 'info',
      title: 'Banca Móvil detectada',
      message: 'Socio escaneó el código QR. Procesando compensación interbancaria...',
    });

    // Simulate realistic bank network processing
    setTimeout(async () => {
      const payment = await simulateQrPayment(selectedMemberId, selectedQuotaId || undefined, amount);
      setQrStatus('pagado');
      setCreatedPayment(payment);
      toast({
        type: 'success',
        title: '¡Pago Confirmado por Pasarela BNB!',
        message: `Transacción ${txId} liquidada. Saldo actualizado, recibo oficial generado y WhatsApp despachado.`,
      });
    }, 1800);
  };

  const qrUrl = `https://demo.clubpolanco.bo/pay/${txId}`;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Pasarela Digital BNB Simple
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Generador de QR Dinámico Interactivo
          </h1>
          <p className="text-xs text-slate-500">
            Emisión de código QR único por transacción con verificación inmediata y liquidación en cascada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            API Bancaria en Vivo
          </span>
        </div>
      </div>

      {/* Main Grid: Generator Controls & Visual QR Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Configuration Form */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <span>Configurar Emisión de QR</span>
            <span className="text-slate-400 font-mono text-xs">BNB-SIMPLE-V2</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Socio Titular</label>
            <select
              value={selectedMemberId}
              onChange={(e) => {
                setSelectedMemberId(e.target.value);
                const mem = members.find(m => m.id === e.target.value);
                if (mem && mem.balance > 0) setAmount(mem.balance);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} — {m.fullName} ({m.categoryName}) — Deuda: {formatCurrency(m.balance)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Vincular a Cuota Específica</label>
            <select
              value={selectedQuotaId}
              onChange={(e) => {
                setSelectedQuotaId(e.target.value);
                const q = memberQuotas.find(item => item.id === e.target.value);
                if (q) {
                  setAmount(q.amount);
                  setConcept(q.concept);
                }
              }}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="">-- Cuota Ordinaria Actual / A Cuenta --</option>
              {memberQuotas.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.period} ({q.status.toUpperCase()}) — {formatCurrency(q.amount)} — Vence: {q.dueDate}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Importe a Cobrar (Bs)</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-sm text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Moneda</label>
              <input
                type="text"
                disabled
                value="BOB (Bolivianos)"
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Concepto Oficial de Cobro</label>
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Explanation of cascade */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
            <p className="font-bold text-slate-900">Efecto en Cascada Automático:</p>
            <p>
              Al simular el cobro bancario, el sistema liquidará la deuda, emitirá el recibo fiscal, notificará por WhatsApp al socio, ingresará al libro de conciliación y pondrá el asiento en la cola contable.
            </p>
          </div>

          {/* Action: Simulate Bank Payment */}
          <button
            onClick={handleSimulatePayment}
            disabled={qrStatus === 'procesando' || qrStatus === 'pagado'}
            className={`w-full py-3.5 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
              qrStatus === 'pagado'
                ? 'bg-emerald-600 text-white cursor-default'
                : qrStatus === 'procesando'
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-slate-950 hover:bg-slate-800 text-white hover:shadow-lg'
            }`}
          >
            {qrStatus === 'procesando' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>PROCESANDO EN BANCA BNB...</span>
              </>
            ) : qrStatus === 'pagado' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>PAGO BANCARIO CONFIRMADO</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>SIMULAR PAGO DESDE BANCO</span>
              </>
            )}
          </button>

          {createdPayment && (
            <Link
              href={`/demo/completo/pagos/${createdPayment.id}`}
              className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4 text-amber-700" />
              <span>Ver Timeline de Trazabilidad Completa del Pago</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

        </div>

        {/* Right: Dynamic QR Ticket Display */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl max-w-sm w-full p-6 text-center text-xs relative overflow-hidden">
            
            {/* Status Top Tag */}
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <div className="w-6 h-6 rounded-lg bg-polaco-600 text-white font-black text-xs flex items-center justify-center">
                  CP
                </div>
                <span>Club Polanco • Cobro QR</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                qrStatus === 'pagado'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : qrStatus === 'procesando'
                  ? 'bg-amber-100 text-amber-800 animate-pulse'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {qrStatus === 'pagado' ? '✓ PAGADO' : qrStatus === 'procesando' ? 'PROCESANDO' : 'PENDIENTE'}
              </span>
            </div>

            {/* QR Render Canvas */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block shadow-inner relative">
              <QRCodeSVG
                value={qrUrl}
                size={180}
                level="H"
                includeMargin={false}
              />

              {qrStatus === 'pagado' && (
                <div className="absolute inset-0 bg-emerald-950/85 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white p-4 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-1" />
                  <span className="font-black text-sm uppercase tracking-wider">¡PAGO EXITOSO!</span>
                  <span className="text-[10px] text-emerald-200 font-mono mt-0.5">AUTH-BNB-992144</span>
                </div>
              )}
            </div>

            {/* Ticket Info Details */}
            <div className="mt-4 text-slate-700 space-y-1.5 text-left bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Transaction ID:</span>
                <span className="font-mono font-bold text-slate-900">{txId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Socio Titular:</span>
                <span className="font-bold text-slate-900">{selectedMember?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Concepto:</span>
                <span className="text-slate-800 truncate max-w-[180px]">{concept}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500 font-bold">Importe Total:</span>
                <span className="font-black font-mono text-base text-polaco-700">{formatCurrency(amount)}</span>
              </div>
            </div>

            {/* Expiration Countdown */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Expira en: <strong className="font-mono text-slate-700">{formatCountdown(countdown)}</strong></span>
            </div>

            <div className="mt-3 text-[10px] text-slate-400 leading-tight">
              Escanee desde cualquier banca móvil autorizada (BNB, BCP, Bisa, Mercantil Santa Cruz).
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
