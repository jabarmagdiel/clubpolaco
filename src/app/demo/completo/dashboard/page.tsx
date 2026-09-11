"use client";

import React, { useState } from 'react';
import {
  Users,
  CalendarDays,
  DollarSign,
  AlertTriangle,
  Receipt,
  QrCode,
  CreditCard,
  Building2,
  Scale,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  ExternalLink,
  SlidersHorizontal,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { PlanComparisonModal } from '@/components/layout/PlanComparisonModal';
import Link from 'next/link';

export default function CompletoDashboard() {
  const { members, quotas, payments, reconciliations, accountingSyncs } = useCRM();
  const [comparisonOpen, setComparisonOpen] = useState(false);

  // Enterprise KPIs
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'activo').length;
  const collectedToday = 1450;
  const collectedThisMonth = payments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = members.reduce((acc, m) => acc + m.balance, 0);
  const overdueAmount = members.filter((m) => m.status === 'moroso').reduce((acc, m) => acc + m.balance, 0);
  const overdueMembersCount = members.filter((m) => m.status === 'moroso').length;
  const digitalPaymentsCount = payments.filter((p) => p.method === 'qr_dinamico' || p.method === 'tarjeta').length;
  const collectionRate = Math.round((collectedThisMonth / (collectedThisMonth + pendingAmount || 1)) * 100);
  const reconciledCount = reconciliations.filter((r) => r.status === 'conciliado').length;
  const pendingReconciliation = reconciliations.filter((r) => r.status === 'pendiente' || r.status === 'diferencia').length;
  const accountingSyncedCount = accountingSyncs.reduce((acc, s) => acc + s.syncedCount, 0);

  // 8 Enterprise Charts Data
  const monthlyRevenue = [
    { month: 'Mayo', qr: 5400, tarjeta: 3200, manual: 4100 },
    { month: 'Junio', qr: 6100, tarjeta: 3800, manual: 3900 },
    { month: 'Julio', qr: 7200, tarjeta: 4100, manual: 3500 },
    { month: 'Agosto', qr: 8400, tarjeta: 4500, manual: 2900 },
    { month: 'Septiembre', qr: 9800, tarjeta: 5100, manual: 2200 },
  ];

  const categoryIncome = [
    { name: 'Deportes', monto: 7500 },
    { name: 'Recreación', monto: 4900 },
    { name: 'Socio General', monto: 3800 },
    { name: 'Entretenimiento', monto: 2600 },
  ];

  const paymentShare = [
    { name: 'QR Simple Dinámico', value: 55, color: '#10b981' },
    { name: 'Tarjetas Débito/Crédito', value: 28, color: '#6366f1' },
    { name: 'Transferencias', value: 12, color: '#38bdf8' },
    { name: 'Efectivo en Caja', value: 5, color: '#94a3b8' },
  ];

  const dailyCollections = [
    { dia: '01 Sep', monto: 850 },
    { dia: '03 Sep', monto: 1420 },
    { dia: '05 Sep', monto: 2900 },
    { dia: '07 Sep', monto: 3850 },
    { dia: '09 Sep', monto: 2100 },
    { dia: '10 Sep', monto: collectedToday },
  ];

  return (
    <div className="space-y-6">
      
      {/* Enterprise Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Nivel Enterprise
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Centro de Mando Financiero & Fintech
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Control en tiempo real con pasarela QR dinámica, checkout de tarjetas, conciliación bancaria y sincronización API.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setComparisonOpen(true)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Comparar Planes</span>
          </button>

          <Link
            href="/demo/completo/pagos/qr"
            className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span>Generar QR Dinámico</span>
          </Link>
        </div>

        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      </div>

      {/* Widget: Estado de Servicios en Tiempo Real (Live Health Monitor) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span className="uppercase tracking-wider">Estado de Servicios & Conectividad Institucional</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
            Simulación Conectada 99.98% SLA
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium block">Pasarela QR BNB Simple</span>
              <span className="font-bold text-slate-900">API Gateway v2.4</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] bg-emerald-100/60 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operativo
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium block">Pasarela Tarjetas</span>
              <span className="font-bold text-slate-900">CyberSource Red Enlace</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] bg-emerald-100/60 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operativo
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium block">Meta WhatsApp Business</span>
              <span className="font-bold text-slate-900">Cloud API Oficial</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] bg-emerald-100/60 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operativo
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-slate-500 font-medium block">Sistema Contable ERP</span>
              <span className="font-bold text-slate-900">Sync REST JSON</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px] bg-emerald-100/60 px-2 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Sincronizado
            </div>
          </div>

        </div>
      </div>

      {/* 12 Enterprise KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Socios Padrón</span>
          <div className="text-xl font-black text-slate-900 mt-0.5">{totalMembers}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">{activeMembers} al día</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Cobrado Hoy</span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">{formatCurrency(collectedToday)}</div>
          <span className="text-[10px] text-slate-400">En tiempo real</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Cobrado Este Mes</span>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">{formatCurrency(collectedThisMonth)}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">+18% vs mes ant.</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Deuda Pendiente</span>
          <div className="text-xl font-black text-rose-700 font-mono mt-0.5">{formatCurrency(pendingAmount)}</div>
          <span className="text-[10px] text-slate-400">{overdueMembersCount} en mora</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs bg-gradient-to-b from-amber-50/40 to-white">
          <span className="text-[10px] font-bold text-amber-800 uppercase block">Pagos Digitales</span>
          <div className="text-xl font-black text-amber-700 font-mono mt-0.5">{digitalPaymentsCount} cobros</div>
          <span className="text-[10px] text-amber-900 font-semibold">QR / Tarjeta</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Tasa de Cobranza</span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">{collectionRate}%</div>
          <span className="text-[10px] text-slate-400">Efectividad global</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Pagos Conciliados</span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-0.5">{reconciledCount}</div>
          <span className="text-[10px] text-slate-400">{pendingReconciliation} pendientes</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Sync Contable</span>
          <div className="text-xl font-black text-slate-900 font-mono mt-0.5">{accountingSyncedCount}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Asientos ERP</span>
        </div>

      </div>

      {/* Flagship Enterprise Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Evolución de Cobranza Multicanal (QR vs Tarjeta vs Manual) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Evolución de Recaudación Digital (Fintech)</h3>
              <p className="text-[11px] text-slate-500">Adopción de QR dinámico vs Tarjetas vs Efectivo (Bs)</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> QR Simple
              </span>
              <span className="flex items-center gap-1 font-semibold text-indigo-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Tarjetas
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Manual
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="qr" name="QR Simple BNB" fill="#10b981" stackId="a" />
                <Bar dataKey="tarjeta" name="Tarjetas" fill="#6366f1" stackId="a" />
                <Bar dataKey="manual" name="Cobro Manual" fill="#cbd5e1" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cuota de Participación de Canales */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Distribución de Canales</h3>
            <p className="text-[11px] text-slate-500">% sobre el volumen total recaudado</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentShare} cx="50%" cy="50%" innerRadius={48} outerRadius={72} dataKey="value" paddingAngle={4}>
                  {paymentShare.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => `${val}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {paymentShare.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Enterprise Shortcuts Strip: QR, Checkout, Webhooks, Conciliación, Portal Socio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
        
        <Link
          href="/demo/completo/pagos/qr"
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">QR Dinámico Bancario</h4>
          <p className="text-slate-500 mt-1 leading-tight">Generación de QR BNB con simulación de pago en cascada.</p>
          <div className="mt-3 text-emerald-700 font-bold flex items-center gap-1">
            <span>Abrir Generador</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/demo/completo/pagos/tarjetas"
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Checkout Tarjetas</h4>
          <p className="text-slate-500 mt-1 leading-tight">Pasarela de débito/crédito con autorización en línea.</p>
          <div className="mt-3 text-indigo-700 font-bold flex items-center gap-1">
            <span>Abrir Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/demo/completo/cobranza/conciliacion"
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Motor de Conciliación</h4>
          <p className="text-slate-500 mt-1 leading-tight">Matching automático de extractos bancarios vs CRM.</p>
          <div className="mt-3 text-blue-700 font-bold flex items-center gap-1">
            <span>Ver Conciliación</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          href="/demo/completo/pagos/webhooks"
          className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Consola Webhooks</h4>
          <p className="text-slate-500 mt-1 leading-tight">Inspección de eventos JSON y payloads bancarios.</p>
          <div className="mt-3 text-purple-700 font-bold flex items-center gap-1">
            <span>Ver Webhooks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        {/* Special Member Portal card */}
        <Link
          href="/demo/completo/portal"
          className="p-4 bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl border-2 border-amber-300 hover:border-amber-400 hover:shadow-md transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold mb-3 group-hover:scale-105 transition-transform">
            <ExternalLink className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-950 text-sm">Portal del Socio</h4>
          <p className="text-slate-700 mt-1 leading-tight">Experiencia autoservicio (Jan Kowalski) con pago directo.</p>
          <div className="mt-3 text-amber-900 font-bold flex items-center gap-1">
            <span>Probar Portal Socio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

      </div>

      <PlanComparisonModal
        isOpen={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        currentPlan="completo"
      />

    </div>
  );
}
