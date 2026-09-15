"use client";

import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import Link from 'next/link';
import { Payment } from '@/types/crm';

export default function CompletoCheckoutTarjetasPage() {
  const { members, quotas, simulateCardPayment } = useCRM();
  const { toast } = useToast();

  const [selectedMemberId, setSelectedMemberId] = useState('mem-002'); // María Nowak default
  const [selectedQuotaId, setSelectedQuotaId] = useState('');
  const [amount, setAmount] = useState<number>(450);
  const [cardHolder, setCardHolder] = useState('MARIA NOWAK');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expMonth, setExpMonth] = useState('12');
  const [expYear, setExpYear] = useState('28');
  const [cvv, setCvv] = useState('789');

  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'procesando' | 'autorizando' | 'aprobado'>('idle');
  const [approvedPayment, setApprovedPayment] = useState<Payment | null>(null);

  const selectedMember = members.find((m) => m.id === selectedMemberId);
  const memberQuotas = quotas.filter((q) => q.memberId === selectedMemberId && q.status !== 'pagado');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStatus('procesando');
    toast({ type: 'info', title: 'Conectando con pasarela', message: 'Cifrado de tarjeta con CyberSource...' });

    setTimeout(() => {
      setCheckoutStatus('autorizando');
      setTimeout(async () => {
        const payment = await simulateCardPayment({
          memberId: selectedMemberId,
          quotaId: selectedQuotaId || undefined,
          amount,
          cardHolder,
          cardNumber,
        });

        setCheckoutStatus('aprobado');
        setApprovedPayment(payment);
        toast({
          type: 'success',
          title: '¡Pago con Tarjeta Aprobado!',
          message: `Cargo de ${formatCurrency(amount)} acreditado en cuenta. Recibo ${payment.receiptNumber} emitido.`,
        });
      }, 1200);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Pasarela de Tarjetas CyberSource / Red Enlace
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Checkout de Tarjetas de Crédito y Débito
          </h1>
          <p className="text-xs text-slate-500">
            Cobro en línea con verificación 3D Secure, tokenización y liquidación directa al Club Polanco.
          </p>
        </div>

        <span className="text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          PCI-DSS Nivel 1 Simulado
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-bold text-slate-900 text-sm">
            <span>Formulario de Cobro con Tarjeta</span>
            <span className="text-slate-400 font-mono text-xs">CYBERSOURCE-V3</span>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            
            {/* Socio */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Socio Titular</label>
              <select
                value={selectedMemberId}
                onChange={(e) => {
                  setSelectedMemberId(e.target.value);
                  const mem = members.find(m => m.id === e.target.value);
                  if (mem) {
                    setCardHolder(mem.fullName.toUpperCase());
                    if (mem.balance > 0) setAmount(mem.balance);
                  }
                }}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-hidden focus:ring-2 focus:ring-indigo-600"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.code} — {m.fullName} ({m.categoryName}) — Deuda: {formatCurrency(m.balance)}
                  </option>
                ))}
              </select>
            </div>

            {/* Quota */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Cuota Vinculada</label>
              <select
                value={selectedQuotaId}
                onChange={(e) => {
                  setSelectedQuotaId(e.target.value);
                  const q = memberQuotas.find(item => item.id === e.target.value);
                  if (q) setAmount(q.amount);
                }}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 outline-hidden focus:ring-2 focus:ring-indigo-600"
              >
                <option value="">-- Cuota Ordinaria Actual / Pago a cuenta --</option>
                {memberQuotas.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.period} ({q.status.toUpperCase()}) — {formatCurrency(q.amount)} — Vence: {q.dueDate}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Importe a Cobrar (Bs)</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-sm text-slate-900 outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Cardholder */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre Impreso en la Tarjeta</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 uppercase font-mono outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Número de Tarjeta (Ficticio para Demo)</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono text-sm tracking-wider outline-hidden focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Expiración (MM / AA)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={2}
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    className="w-16 p-2.5 rounded-lg border border-slate-300 font-mono text-center outline-hidden"
                  />
                  <span className="self-center text-slate-400 font-bold">/</span>
                  <input
                    type="text"
                    maxLength={2}
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    className="w-16 p-2.5 rounded-lg border border-slate-300 font-mono text-center outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Código de Seguridad (CVV)</label>
                <input
                  type="password"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-24 p-2.5 rounded-lg border border-slate-300 font-mono text-center outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={checkoutStatus !== 'idle' && checkoutStatus !== 'aprobado'}
              className={`w-full py-3.5 rounded-xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                checkoutStatus === 'aprobado'
                  ? 'bg-emerald-600 text-white'
                  : checkoutStatus === 'procesando' || checkoutStatus === 'autorizando'
                  ? 'bg-indigo-700 text-white animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {checkoutStatus === 'procesando' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>CIFRANDO Y CONECTANDO CON RED ENLACE...</span>
                </>
              ) : checkoutStatus === 'autorizando' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AUTORIZANDO CON BANCO EMISOR (3D SECURE)...</span>
                </>
              ) : checkoutStatus === 'aprobado' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PAGO APROBADO ({formatCurrency(amount)})</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pagar {formatCurrency(amount)}</span>
                </>
              )}
            </button>

            {approvedPayment && (
              <Link
                href={`/demo/completo/pagos/${approvedPayment.id}`}
                className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <Eye className="w-4 h-4 text-amber-700" />
                <span>Ver Timeline de Trazabilidad Completa del Pago</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

          </form>
        </div>

        {/* Right: Visual Credit Card Simulation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          {/* Card Visual Graphic */}
          <div className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div className="w-11 h-8 rounded-md bg-amber-300/80 border border-amber-400 flex items-center justify-center">
                <div className="w-6 h-4 border-t border-b border-slate-950/40" />
              </div>
              <span className="font-black text-lg italic tracking-wider text-white">VISA</span>
            </div>

            <div className="font-mono text-lg tracking-widest text-slate-100 mb-6 drop-shadow-sm">
              {cardNumber || '•••• •••• •••• ••••'}
            </div>

            <div className="flex justify-between text-[10px] text-slate-300 uppercase font-mono">
              <div>
                <span className="text-[9px] text-slate-400 block font-sans">Titular de la tarjeta</span>
                <span className="font-bold text-white tracking-wider">{cardHolder || 'NOMBRE DEL SOCIO'}</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-sans">Válida hasta</span>
                <span className="font-bold text-white tracking-wider">{expMonth}/{expYear}</span>
              </div>
            </div>

            {/* Glowing circle */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs text-center max-w-sm">
            <p className="font-bold text-slate-800">Modo de Demostración Activo</p>
            <p className="mt-1 text-[11px] leading-relaxed">
              No se almacenan datos de tarjetas reales. La transacción genera eventos simulados de pasarela, comprobante oficial y asiento contable en vivo.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
