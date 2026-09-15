"use client";

import React, { useState } from 'react';
import {
  Users,
  CalendarDays,
  DollarSign,
  AlertTriangle,
  Receipt,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Member, Payment, Receipt as ReceiptType } from '@/types/crm';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { ReceiptModal } from '@/components/ui/ReceiptModal';
import { PlanComparisonModal } from '@/components/layout/PlanComparisonModal';
import Link from 'next/link';

export default function EconomicoDashboard() {
  const { members, quotas, payments, receipts } = useCRM();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType | null>(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  // 5 Essential KPIs
  const activeMembersCount = members.filter((m) => m.status === 'activo').length;
  const pendingQuotasCount = quotas.filter((q) => q.status === 'pendiente').length;
  const collectedThisMonth = payments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = members.reduce((acc, m) => acc + m.balance, 0);
  const overdueMembersCount = members.filter((m) => m.status === 'moroso').length;

  // Chart 1: Monthly Collection (Past 4 months)
  const monthlyData = [
    { month: 'Junio', total: 11200 },
    { month: 'Julio', total: 12450 },
    { month: 'Agosto', total: 13100 },
    { month: 'Septiembre', total: collectedThisMonth || 14200 },
  ];

  // Chart 2: Quota Status Distribution
  const quotaStatusData = [
    { name: 'Pagadas', value: quotas.filter((q) => q.status === 'pagado').length, color: '#10b981' },
    { name: 'Pendientes', value: pendingQuotasCount, color: '#f59e0b' },
    { name: 'Vencidas', value: quotas.filter((q) => q.status === 'vencido').length, color: '#ef4444' },
  ];

  // Chart 3: Members per Category
  const categoryData = [
    { name: 'Deportes', count: members.filter((m) => m.categoryName === 'Deportes').length },
    { name: 'Recreación', count: members.filter((m) => m.categoryName === 'Recreación').length },
    { name: 'Entretenimiento', count: members.filter((m) => m.categoryName === 'Entretenimiento').length },
    { name: 'Socio General', count: members.filter((m) => m.categoryName === 'Socio General').length },
    { name: 'Honorario', count: members.filter((m) => m.categoryName === 'Honorario').length },
  ];

  // Recent Debts
  const overdueMembers = members.filter((m) => m.balance > 0).slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Panel Administrativo
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
              Plan Económico
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Dashboard de Control Operativo
          </h1>
          <p className="text-xs text-slate-500">
            Resumen esencial de socios, pagos manuales y estado de cobranza del Club Polanco.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setComparisonOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Comparar con otros paquetes</span>
          </button>
          
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="flex items-center gap-1.5 py-2 px-4 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Registrar Pago Manual</span>
          </button>
        </div>
      </div>

      {/* 5 Essential KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Socios Activos</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{activeMembersCount}</div>
          <span className="text-[11px] text-slate-400">De un total de {members.length} socios</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Cuotas Pendientes</span>
            <CalendarDays className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{pendingQuotasCount}</div>
          <span className="text-[11px] text-slate-400">Por liquidar este ciclo</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Cobrado este Mes</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            {formatCurrency(collectedThisMonth)}
          </div>
          <span className="text-[11px] text-slate-400">{payments.length} recibos emitidos</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Monto Pendiente</span>
            <DollarSign className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700 font-mono">
            {formatCurrency(pendingAmount)}
          </div>
          <span className="text-[11px] text-slate-400">Deuda global acumulada</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase">Socios Morosos</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-700">{overdueMembersCount}</div>
          <span className="text-[11px] text-slate-400">Con cuotas vencidas</span>
        </div>

      </div>

      {/* Maximum 3 Essential Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Cobranza Mensual */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Cobranza Mensual</h3>
              <p className="text-[11px] text-slate-500">Ingresos históricos recaudados (Bs)</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">Total Gestión</span>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="total" fill="#dc2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Estado de Cuotas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Estado de Cuotas</h3>
              <p className="text-[11px] text-slate-500">Distribución de cumplimiento</p>
            </div>
          </div>
          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={quotaStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {quotaStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs mt-1">
            {quotaStatusData.map((item, idx) => (
              <span key={idx} className="flex items-center gap-1 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}: <strong>{item.value}</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Chart 3: Socios por Categoría */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Socios por Categoría</h3>
              <p className="text-[11px] text-slate-500">Padrón activo por disciplina</p>
            </div>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 15, left: 20, bottom: 5 }}>
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={75} />
                <Tooltip />
                <Bar dataKey="count" fill="#334155" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Operative Lists: Últimos Pagos y Socios con Deuda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Últimos Pagos Registrados */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Últimos Pagos Registrados</h3>
              <p className="text-[11px] text-slate-500">Movimientos asentados en caja</p>
            </div>
            <Link
              href="/demo/economico/pagos"
              className="text-xs text-polaco-600 hover:text-polaco-700 font-semibold flex items-center gap-0.5"
            >
              <span>Ver todos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {payments.slice(0, 5).map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{p.receiptNumber}</span>
                    <span className="text-slate-600 font-semibold">{p.memberName}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 capitalize">
                    {p.date} • {p.method.replace('_', ' ')} • Ref: {p.reference}
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    {formatCurrency(p.amount)}
                  </span>
                  <button
                    onClick={() => {
                      const r = receipts.find(rec => rec.paymentId === p.id) || {
                        id: `rec-${p.id}`,
                        number: p.receiptNumber,
                        paymentId: p.id,
                        memberId: p.memberId,
                        memberName: p.memberName,
                        memberCi: p.memberCi,
                        memberCode: 'CP-001',
                        amount: p.amount,
                        concept: 'Cuota de Membresía',
                        method: p.method,
                        date: p.date,
                        generatedBy: 'Caja Club Polanco',
                      };
                      setSelectedReceipt(r);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                    title="Ver Recibo PDF"
                  >
                    <Receipt className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Socios con Deuda / Alerta Morosidad */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Socios con Deuda Pendiente</h3>
              <p className="text-[11px] text-slate-500">Mora acumulada para cobro manual</p>
            </div>
            <Link
              href="/demo/economico/morosidad"
              className="text-xs text-polaco-600 hover:text-polaco-700 font-semibold flex items-center gap-0.5"
            >
              <span>Ver reporte mora</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {overdueMembers.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400 font-bold">{m.code}</span>
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="font-bold text-slate-900 hover:text-polaco-600 hover:underline text-left"
                    >
                      {m.fullName}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {m.categoryName} • Tel: {m.phone}
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <span className="font-mono font-bold text-rose-700 text-sm">
                    {formatCurrency(m.balance)}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedMember(m);
                      setPaymentModalOpen(true);
                    }}
                    className="py-1 px-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px] border border-emerald-200 transition-colors"
                  >
                    Cobrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Upgrade Teaser to Estándar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-polaco-600/30 border border-polaco-500/50 flex items-center justify-center text-polaco-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Evolución Comercial
            </div>
            <p className="text-sm font-bold text-white mt-0.5">
              ¿Desea automatizar los recordatorios de cobranza por WhatsApp?
            </p>
            <p className="text-xs text-slate-300">
              Con el <strong>Plan Estándar</strong> podrá enviar avisos masivos a 15 morosos con un solo clic y felicitaciones de cumpleaños automáticas.
            </p>
          </div>
        </div>

        <Link
          href="/demo/estandar/dashboard"
          className="shrink-0 py-2 px-4 rounded-xl bg-polaco-600 hover:bg-polaco-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>Explorar Plan Estándar</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Modals */}
      <ManualPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        defaultMember={selectedMember}
      />

      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        plan="economico"
        onOpenPaymentModal={(m) => {
          setSelectedMember(m);
          setPaymentModalOpen(true);
        }}
      />

      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      <PlanComparisonModal
        isOpen={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        currentPlan="economico"
      />

    </div>
  );
}
