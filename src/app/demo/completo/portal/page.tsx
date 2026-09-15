"use client";

import React, { useState } from 'react';
import {
  User,
  CreditCard,
  QrCode,
  CalendarDays,
  Receipt,
  Download,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Check,
  AlertCircle
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import { useToast } from '@/lib/toast';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { Receipt as ReceiptType } from '@/types/crm';

export default function CompletoPortalSocioPage() {
  const { members, quotas, payments, receipts, simulateQrPayment, simulateCardPayment } = useCRM();
  const { toast } = useToast();

  // Jan Kowalski is member 'mem-001'
  const jan = members.find((m) => m.id === 'mem-001') || members[0];
  const janQuotas = quotas.filter((q) => q.memberId === jan.id);
  const janPayments = payments.filter((p) => p.memberId === jan.id);
  const janReceipts = receipts.filter((r) => r.memberId === jan.id);

  const [activeTab, setActiveTab] = useState<'resumen' | 'cuotas' | 'pagos' | 'recibos'>('resumen');
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payMethod, setPayMethod] = useState<'qr' | 'tarjeta'>('qr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);

  const handleSelfPay = async () => {
    setIsProcessing(true);
    toast({ type: 'info', title: 'Conectando con pasarela', message: 'Iniciando débito de autoservicio...' });

    setTimeout(async () => {
      if (payMethod === 'qr') {
        await simulateQrPayment(jan.id, undefined, jan.balance > 0 ? jan.balance : 250);
      } else {
        await simulateCardPayment({
          memberId: jan.id,
          amount: jan.balance > 0 ? jan.balance : 250,
          cardHolder: jan.fullName.toUpperCase(),
          cardNumber: '4111 2222 3333 4444',
        });
      }
      setIsProcessing(false);
      setPayModalOpen(false);
      toast({
        type: 'success',
        title: '¡Pago Acreditado Exitosamente!',
        message: 'Su saldo ha sido liquidado y su recibo electrónico oficial ya está disponible para descarga.',
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Exclusive Completo Tag */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Exclusivo Plan Completo — Demostración de Autoservicio
          </span>
        </div>
        <span className="text-xs text-slate-500">Vista del Socio en Teléfono o Computadora</span>
      </div>

      {/* Member Profile Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-polaco-600 to-polaco-800 text-white font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-slate-800">
              JK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Hola, {jan.fullName}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  {jan.balance === 0 ? 'Socio al día' : 'Socio Activo'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Código: <strong className="text-slate-200 font-mono">{jan.code}</strong> • Categoría: <strong className="text-slate-200">{jan.categoryName}</strong> • {jan.membershipName}
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col sm:items-end justify-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Saldo Pendiente</span>
            <div className={`text-2xl sm:text-3xl font-black font-mono mt-0.5 ${jan.balance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {formatCurrency(jan.balance)}
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">Próxima cuota: 10 de Octubre de 2026</span>
          </div>

        </div>

        {/* Quick Self-service buttons */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => setPayModalOpen(true)}
            className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pagar Ahora ({formatCurrency(jan.balance > 0 ? jan.balance : 250)})</span>
          </button>

          <button
            onClick={() => setActiveTab('cuotas')}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
            <span>Ver Cuotas</span>
          </button>

          <button
            onClick={() => setActiveTab('pagos')}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Receipt className="w-3.5 h-3.5 text-slate-400" />
            <span>Ver Pagos</span>
          </button>

          <button
            onClick={() => setActiveTab('recibos')}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Descargar Recibos</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex gap-2 text-xs font-bold">
        {(['resumen', 'cuotas', 'pagos', 'recibos'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-xl capitalize transition-colors ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs text-xs">
        {activeTab === 'resumen' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Instalaciones Disponibles para Jan Kowalski
                </span>
                <div className="space-y-2 pt-1 text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Acceso a Canchas de Tenis y Polideportivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Club House y Área de Parrilleros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Biblioteca y Actividades Culturales Polacas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Beneficios para Familiares en Sede Sopocachi</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Carnet Digital de Socio
                </span>
                <div className="flex items-center gap-4">
                  <QRCodeSVG
                    value={`https://demo.clubpolanco.bo/socio/${jan.code}`}
                    size={80}
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">{jan.fullName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">ID: {jan.code}</span>
                    <span className="text-[11px] text-slate-500 block">CI: {jan.ci}</span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 mt-1 inline-block">
                      Acceso Autorizado 2026
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick action to pay */}
            {jan.balance > 0 && (
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">Cuota pendiente por liquidar</h4>
                  <p className="text-amber-800 text-[11px] mt-0.5">
                    Evite recargos regularizando su cuota en línea mediante QR Bancario o Tarjeta.
                  </p>
                </div>
                <button
                  onClick={() => setPayModalOpen(true)}
                  className="py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs"
                >
                  Pagar {formatCurrency(jan.balance)}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cuotas' && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Historial de Cuotas Mensuales</h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Período</th>
                    <th className="py-2.5 px-4">Concepto</th>
                    <th className="py-2.5 px-4">Vencimiento</th>
                    <th className="py-2.5 px-4 text-right">Importe</th>
                    <th className="py-2.5 px-4 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {janQuotas.map((q) => (
                    <tr key={q.id}>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{q.period}</td>
                      <td className="py-2.5 px-4 text-slate-600">{q.concept}</td>
                      <td className="py-2.5 px-4 text-slate-500">{q.dueDate}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-900">{formatCurrency(q.amount)}</td>
                      <td className="py-2.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          q.status === 'pagado' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pagos' && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Histórico de Pagos Realizados</h3>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Recibo Oficial</th>
                    <th className="py-2.5 px-4">Fecha</th>
                    <th className="py-2.5 px-4">Medio de Pago</th>
                    <th className="py-2.5 px-4">Referencia Bancaria</th>
                    <th className="py-2.5 px-4 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {janPayments.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2.5 px-4 font-bold text-slate-900">{p.receiptNumber}</td>
                      <td className="py-2.5 px-4 text-slate-500 font-sans">{p.date}</td>
                      <td className="py-2.5 px-4 capitalize font-sans">{p.method.replace('_', ' ')}</td>
                      <td className="py-2.5 px-4 text-slate-600">{p.reference}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'recibos' && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Comprobantes y Recibos Oficiales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {janReceipts.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900">{r.number}</span>
                    <p className="text-[11px] text-slate-500">{r.concept}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{r.date}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="font-mono font-bold text-sm text-polaco-700 block">{formatCurrency(r.amount)}</span>
                    <button
                      onClick={() => setSelectedReceipt(r)}
                      className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded text-[10px] font-bold text-slate-700 transition-colors inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pay Now Self-service Modal (QR / Card) */}
      {payModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-200 text-xs space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Portal de Pago en Línea</h3>
                <p className="text-slate-500 text-[11px]">Jan Kowalski • Membresía Individual</p>
              </div>
              <span className="font-mono font-black text-lg text-polaco-700">
                {formatCurrency(jan.balance > 0 ? jan.balance : 250)}
              </span>
            </div>

            {/* Selector: QR or Card */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayMethod('qr')}
                className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  payMethod === 'qr' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Pagar con QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPayMethod('tarjeta')}
                className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  payMethod === 'tarjeta' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Pagar con Tarjeta</span>
              </button>
            </div>

            {/* Display QR or Card form */}
            {payMethod === 'qr' ? (
              <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="inline-block p-3 bg-white rounded-xl shadow-xs border border-slate-200">
                  <QRCodeSVG
                    value={`https://demo.clubpolanco.bo/pay/TX-PORTAL-${Date.now()}`}
                    size={150}
                  />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Escanee desde su aplicación bancaria BNB o cualquier banco de Bolivia.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Titular</span>
                  <span className="font-bold text-slate-800">{jan.fullName.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase">Tarjeta Demo</span>
                  <span className="font-bold text-slate-800">VISA •••• 4444</span>
                </div>
              </div>
            )}

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setPayModalOpen(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSelfPay}
                disabled={isProcessing}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors"
              >
                {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

    </div>
  );
}
