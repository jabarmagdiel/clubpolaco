"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, DollarSign } from 'lucide-react';
import { Member, PaymentMethod } from '@/types/crm';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMember?: Member | null;
  onSuccess?: (payment: any) => void;
}

export const ManualPaymentModal: React.FC<ManualPaymentModalProps> = ({
  isOpen,
  onClose,
  defaultMember,
  onSuccess,
}) => {
  const { members, quotas, registerManualPayment } = useCRM();
  const { toast } = useToast();

  const [selectedMemberId, setSelectedMemberId] = useState(defaultMember?.id || members[0]?.id || '');
  const [selectedQuotaId, setSelectedQuotaId] = useState('');
  const [amount, setAmount] = useState<number>(250);
  const [method, setMethod] = useState<PaymentMethod>('efectivo');
  const [reference, setReference] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentMember = members.find((m) => m.id === selectedMemberId);
  const memberPendingQuotas = quotas.filter(
    (q) => q.memberId === selectedMemberId && (q.status === 'pendiente' || q.status === 'vencido')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId || amount <= 0) {
      toast({ type: 'error', title: 'Error', message: 'Complete los datos requeridos.' });
      return;
    }

    const payment = registerManualPayment({
      memberId: selectedMemberId,
      quotaId: selectedQuotaId || undefined,
      amount,
      method,
      reference: reference || `MAN-${Date.now().toString().slice(-6)}`,
      notes,
    });

    toast({
      type: 'success',
      title: 'Pago registrado exitosamente',
      message: `Se registró cobro por ${formatCurrency(amount)} con recibo ${payment.receiptNumber}`,
    });

    onClose();
    if (onSuccess) onSuccess(payment);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Registrar Pago Manual</h3>
              <p className="text-[11px] text-slate-500">Confirmación administrativa directa en caja</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {/* Socio */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Socio Titular</label>
            <select
              value={selectedMemberId}
              onChange={(e) => {
                setSelectedMemberId(e.target.value);
                setSelectedQuotaId('');
              }}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-polaco-600 focus:border-polaco-600 outline-hidden"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.code} — {m.fullName} ({m.categoryName}) — Deuda: {formatCurrency(m.balance)}
                </option>
              ))}
            </select>
          </div>

          {/* Cuota a cancelar (opcional) */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Vincular a Cuota Pendiente</label>
            <select
              value={selectedQuotaId}
              onChange={(e) => {
                setSelectedQuotaId(e.target.value);
                const q = memberPendingQuotas.find((quota) => quota.id === e.target.value);
                if (q) setAmount(q.amount);
              }}
              className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-polaco-600 outline-hidden"
            >
              <option value="">-- Pago a cuenta / Sin cuota específica --</option>
              {memberPendingQuotas.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.period} ({q.status.toUpperCase()}) — {formatCurrency(q.amount)} — Vence: {q.dueDate}
                </option>
              ))}
            </select>
            {memberPendingQuotas.length === 0 && (
              <p className="text-[11px] text-emerald-600 mt-1">Este socio no registra cuotas pendientes actuales.</p>
            )}
          </div>

          {/* Monto y Método */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Monto a Cobrar (Bs)</label>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-900 font-mono font-bold text-sm outline-hidden focus:ring-2 focus:ring-polaco-600"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Método de Pago</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
              >
                <option value="efectivo">Efectivo en Caja</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="qr_manual">QR Manual (Comprobante)</option>
              </select>
            </div>
          </div>

          {/* Referencia */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Referencia o Nro. de Depósito</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Ej: DEP-881920, TRF-BISA-1102"
              className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Observaciones</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notas de caja (opcional)"
              className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
            />
          </div>

          {/* Notice */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px] leading-relaxed">
            Al registrar, el sistema actualizará el saldo del socio, marcará la cuota como pagada y emitirá el correlativo de recibo oficial.
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Registrar Pago</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
