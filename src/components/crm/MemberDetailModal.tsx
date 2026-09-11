"use client";

import React, { useState } from 'react';
import { X, User, CreditCard, CalendarDays, Receipt, Phone, Mail, MapPin, Tag, AlertTriangle, CheckCircle2, Plus, ArrowRight } from 'lucide-react';
import { Member, PaymentMethod } from '@/types/crm';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import { PlanType } from '@/types/plans';

interface MemberDetailModalProps {
  member: Member | null;
  onClose: () => void;
  plan: PlanType;
  onOpenPaymentModal?: (member: Member) => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  member,
  onClose,
  plan,
  onOpenPaymentModal,
}) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'cuotas' | 'pagos' | 'recibos' | 'mensajes'>('resumen');
  const { quotas, payments, receipts, whatsappMessages, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  if (!member) return null;

  const memberQuotas = quotas.filter((q) => q.memberId === member.id);
  const memberPayments = payments.filter((p) => p.memberId === member.id);
  const memberReceipts = receipts.filter((r) => r.memberId === member.id);
  const memberMessages = whatsappMessages.filter((m) => m.memberId === member.id);

  const handleSendWa = () => {
    sendSingleWhatsApp(member.id, 'tmpl-2');
    toast({
      type: 'success',
      title: 'Mensaje de WhatsApp enviado',
      message: `Se envió recordatorio preventivo al teléfono de ${member.fullName}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 rounded-t-2xl flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-polaco-600 to-polaco-800 text-white font-black text-xl flex items-center justify-center shadow-md">
              {member.fullName.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {member.code}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  member.status === 'activo'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {member.status === 'activo' ? 'Socio al día' : 'Socio con mora'}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {member.categoryName} • {member.membershipName}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {member.fullName}
              </h2>
              <p className="text-xs text-slate-500">
                CI: {member.ci} • Tel: {member.phone} • Socio desde: {formatDate(member.joinDate)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Bar */}
        <div className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Saldo pendiente:</span>
            <span className={`font-mono font-bold text-sm ${member.balance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {formatCurrency(member.balance)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPaymentModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPaymentModal(member);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-2xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Registrar Pago</span>
              </button>
            )}

            {plan !== 'economico' && member.balance > 0 && (
              <button
                onClick={handleSendWa}
                className="px-3 py-1.5 rounded-lg bg-polaco-600 hover:bg-polaco-700 text-white font-bold transition-colors shadow-2xs flex items-center gap-1"
              >
                <span>WhatsApp Cobranza</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/50">
          {(['resumen', 'cuotas', 'pagos', 'recibos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-xs font-bold border-b-2 capitalize transition-colors ${
                activeTab === tab
                  ? 'border-polaco-600 text-polaco-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
          {plan !== 'economico' && (
            <button
              onClick={() => setActiveTab('mensajes')}
              className={`py-3 px-4 text-xs font-bold border-b-2 capitalize transition-colors ${
                activeTab === 'mensajes'
                  ? 'border-polaco-600 text-polaco-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Mensajes ({memberMessages.length})
            </button>
          )}
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === 'resumen' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Datos de Membresía
                  </span>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Categoría:</span>
                    <span className="font-semibold text-slate-800">{member.categoryName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Tipo de Membresía:</span>
                    <span className="font-semibold text-slate-800">{member.membershipName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Fecha de Nacimiento:</span>
                    <span className="font-semibold text-slate-800">{formatDate(member.birthDate)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Dirección:</span>
                    <span className="font-semibold text-slate-800 text-right">{member.address}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Contacto & Notificaciones
                  </span>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Teléfono Móvil:</span>
                    <span className="font-semibold text-slate-800">{member.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Correo Electrónico:</span>
                    <span className="font-semibold text-slate-800">{member.email}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Etiquetas:</span>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {member.tags?.map((t, idx) => (
                        <span key={idx} className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Debt overview */}
              {member.balance > 0 ? (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <p className="font-bold text-rose-900">Mora activa acumulada</p>
                      <p className="text-rose-700 text-[11px]">
                        El socio registra {memberQuotas.filter(q => q.status === 'vencido').length} cuota(s) vencida(s).
                      </p>
                    </div>
                  </div>
                  <span className="text-lg font-black font-mono text-rose-700">
                    {formatCurrency(member.balance)}
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Socio al día</p>
                    <p className="text-emerald-700 text-[11px]">No registra cuotas vencidas ni pendientes en el sistema.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'cuotas' && (
            <div className="space-y-3">
              {memberQuotas.length === 0 ? (
                <p className="text-slate-500 py-6 text-center">No hay cuotas registradas para este socio.</p>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3 text-left">Período</th>
                        <th className="py-2.5 px-3 text-left">Concepto</th>
                        <th className="py-2.5 px-3 text-left">Vencimiento</th>
                        <th className="py-2.5 px-3 text-right">Monto</th>
                        <th className="py-2.5 px-3 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {memberQuotas.map((q) => (
                        <tr key={q.id}>
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{q.period}</td>
                          <td className="py-2.5 px-3 text-slate-600">{q.concept}</td>
                          <td className="py-2.5 px-3 text-slate-500">{q.dueDate}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">{formatCurrency(q.amount)}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              q.status === 'pagado' ? 'bg-emerald-100 text-emerald-800' :
                              q.status === 'vencido' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {q.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pagos' && (
            <div className="space-y-3">
              {memberPayments.length === 0 ? (
                <p className="text-slate-500 py-6 text-center">No hay pagos registrados para este socio.</p>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3 text-left">Recibo</th>
                        <th className="py-2.5 px-3 text-left">Fecha</th>
                        <th className="py-2.5 px-3 text-left">Método</th>
                        <th className="py-2.5 px-3 text-left">Referencia</th>
                        <th className="py-2.5 px-3 text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {memberPayments.map((p) => (
                        <tr key={p.id}>
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{p.receiptNumber}</td>
                          <td className="py-2.5 px-3 text-slate-500">{p.date}</td>
                          <td className="py-2.5 px-3 capitalize text-slate-700">{p.method.replace('_', ' ')}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">{p.reference}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recibos' && (
            <div className="space-y-3">
              {memberReceipts.length === 0 ? (
                <p className="text-slate-500 py-6 text-center">No hay recibos emitidos para este socio.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {memberReceipts.map((r) => (
                    <div key={r.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-xs text-slate-900">{r.number}</span>
                        <p className="text-[11px] text-slate-500">{r.concept}</p>
                        <p className="text-[10px] text-slate-400">{r.date}</p>
                      </div>
                      <span className="font-mono font-bold text-sm text-polaco-700">{formatCurrency(r.amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'mensajes' && (
            <div className="space-y-3">
              {memberMessages.length === 0 ? (
                <p className="text-slate-500 py-6 text-center">No hay mensajes de WhatsApp registrados para este socio.</p>
              ) : (
                <div className="space-y-2">
                  {memberMessages.map((m) => (
                    <div key={m.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{m.templateName}</span>
                        <span className="text-[10px] text-slate-400">{m.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{m.content}</p>
                      <div className="flex justify-end">
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                          Estado: {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Cerrar Perfil
          </button>
        </div>

      </div>
    </div>
  );
};
