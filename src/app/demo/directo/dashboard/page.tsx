"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Clock,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Send,
  UserPlus,
  Receipt,
  UserCog,
  Calendar,
  Phone
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';

export default function DirectoDashboardPage() {
  const { members, payments, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedMemberForPayment, setSelectedMemberForPayment] = useState<any>(null);

  // Filter members by membership status
  const overdueMembers = members.filter(m => m.status === 'moroso');
  // Members expiring soon (next 7 days)
  const expiringSoonMembers = members.slice(0, 5);

  const handleSendReminder = (member: any) => {
    sendSingleWhatsApp(
      member.id,
      `🇵🇱 Estimado(a) socio(a) ${member.fullName}: Le informamos que su membresía del Club Polaco (categoría ${member.categoryName}) expira en los próximos días. Agradecemos regularizar su cuota para mantener habilitado el acceso a instalaciones y canchas.`,
      member.phone
    );
    toast({
      type: 'success',
      title: 'WhatsApp de Expiración Enviado',
      message: `Notificación entregada al número ${member.phone} de ${member.fullName}.`
    });
  };

  const handleBatchReminders = () => {
    expiringSoonMembers.forEach(m => {
      sendSingleWhatsApp(
        m.id,
        `🇵🇱 Estimado(a) socio(a) ${m.fullName}: Su membresía del Club Polaco vence esta semana. Saldo pendiente: ${formatCurrency(m.balance || 250)}.`,
        m.phone
      );
    });
    toast({
      type: 'success',
      title: 'Avisos Masivos Disparados',
      message: `Se enviaron ${expiringSoonMembers.length} recordatorios de expiración de membresía con éxito.`
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Solución Directa & Exclusiva
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              Club Polaco — Membresías + WhatsApp
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Panel de Control Operativo y Cobranzas
          </h1>
          <p className="text-xs text-slate-500">
            Monitoreo en tiempo real de membresías activas, vencimientos inminentes y automatización de avisos por WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/demo/directo/usuarios"
            className="py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5 border border-slate-300 shadow-2xs"
          >
            <UserCog className="w-4 h-4 text-slate-600" />
            <span>Usuarios & Roles</span>
          </Link>
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Receipt className="w-4 h-4" />
            <span>Registrar Cobro</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Socios Totales</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{members.length}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Categorías Deportivas y Recreativas
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Por Expirar (7 días)</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-2">{expiringSoonMembers.length}</div>
          <div className="text-[11px] text-amber-800 font-medium mt-1">
            🟡 Requieren recordatorio previo
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Membresías Vencidas</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-700 mt-2">{overdueMembers.length}</div>
          <div className="text-[11px] text-rose-700 font-medium mt-1">
            🔴 Acceso restringido a portería
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Avisos WhatsApp</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mt-2">42 envíos</div>
          <div className="text-[11px] text-emerald-800 font-medium mt-1">
            🟢 100% de entrega confirmada
          </div>
        </div>

      </div>

      {/* Urgent Members Expiration Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-slate-900">
                Membresías Próximas a Expirar (Acción Preventiva)
              </h2>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Atención Prioritaria
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              El motor automático envía avisos 3 días antes para que el socio renueve su cuota a tiempo sin retrasos.
            </p>
          </div>

          <button
            onClick={handleBatchReminders}
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Disparar Recordatorios a los {expiringSoonMembers.length} Socios</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Socio</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">WhatsApp Oficial</th>
                <th className="py-3 px-4">Expiración Membresía</th>
                <th className="py-3 px-4">Estado Vigencia</th>
                <th className="py-3 px-4 text-right">Cuota Mensual</th>
                <th className="py-3 px-4 text-center">Acción Directa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {expiringSoonMembers.map((m, idx) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{m.fullName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{m.code}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {m.categoryName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-mono text-slate-700">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>{m.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800">
                    {idx === 0 ? '15 de Septiembre' : idx === 1 ? '18 de Septiembre' : '22 de Septiembre'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Vence en {idx * 2 + 3} días
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                    {formatCurrency(m.balance || 250)}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleSendReminder(m)}
                      className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                    >
                      <Send className="w-3 h-3 text-emerald-600" />
                      <span>WhatsApp</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Mostrando los 5 casos más próximos a vencer en el Club Polaco
          </span>
          <Link
            href="/demo/directo/socios"
            className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Ver Base Completa de Socios ({members.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <Link
          href="/demo/directo/socios"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
              <Users className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mt-3">1. Padrón de Socios & Membresías</h3>
          <p className="text-xs text-slate-500 mt-1">
            Gestione altas, bajas, teléfonos y consulte el semáforo de expiración de cada socio.
          </p>
        </Link>

        <Link
          href="/demo/directo/pagos"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
              <Receipt className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mt-3">2. Cobro y Renovación Inmediata</h3>
          <p className="text-xs text-slate-500 mt-1">
            Al registrar el pago, la membresía se renueva y se envía el recibo al WhatsApp del socio.
          </p>
        </Link>

        <Link
          href="/demo/directo/usuarios"
          className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700">
              <UserCog className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm mt-3">3. Gestión de Usuarios & Roles</h3>
          <p className="text-xs text-slate-500 mt-1">
            Añada y controle qué administradores, cajeros y operadores pueden operar el sistema.
          </p>
        </Link>

      </div>

      {/* Manual Payment Modal */}
      <ManualPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setSelectedMemberForPayment(null);
        }}
        defaultMember={selectedMemberForPayment}
      />

    </div>
  );
}
