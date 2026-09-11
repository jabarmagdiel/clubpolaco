"use client";

import React, { useState } from 'react';
import {
  Users,
  CalendarDays,
  DollarSign,
  AlertTriangle,
  Receipt,
  MessageSquare,
  Sparkles,
  Cake,
  Bell,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Plus
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
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { PlanComparisonModal } from '@/components/layout/PlanComparisonModal';
import { useToast } from '@/lib/toast';
import { Member } from '@/types/crm';
import Link from 'next/link';

export default function EstandarDashboard() {
  const { members, quotas, payments, receipts, whatsappMessages, auditLogs, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);

  // 8 KPIs
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === 'activo').length;
  const newMembersThisMonth = 4; // simulated
  const overdueMembers = members.filter((m) => m.status === 'moroso').length;
  const collectedThisMonth = payments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = members.reduce((acc, m) => acc + m.balance, 0);
  const paymentsCount = payments.length;
  const collectionRate = Math.round((collectedThisMonth / (collectedThisMonth + pendingAmount || 1)) * 100);

  // 6 Advanced Charts Data
  // 1. Cobranza mensual
  const monthlyData = [
    { month: 'Jun', total: 11200, meta: 12000 },
    { month: 'Jul', total: 12450, meta: 13000 },
    { month: 'Ago', total: 13100, meta: 13500 },
    { month: 'Sep', total: collectedThisMonth || 14500, meta: 14000 },
  ];

  // 2. Cobrado vs Pendiente
  const cobradoVsPendiente = [
    { name: 'Cobrado', value: collectedThisMonth, color: '#10b981' },
    { name: 'Pendiente', value: pendingAmount, color: '#ef4444' },
  ];

  // 3. Socios por Categoría
  const categoryData = [
    { name: 'Deportes', count: members.filter((m) => m.categoryName === 'Deportes').length },
    { name: 'Recreación', count: members.filter((m) => m.categoryName === 'Recreación').length },
    { name: 'Entretenimiento', count: members.filter((m) => m.categoryName === 'Entretenimiento').length },
    { name: 'Socio General', count: members.filter((m) => m.categoryName === 'Socio General').length },
    { name: 'Honorario', count: members.filter((m) => m.categoryName === 'Honorario').length },
  ];

  // 4. Métodos de Pago
  const paymentMethodsData = [
    { name: 'Efectivo', count: payments.filter((p) => p.method === 'efectivo').length || 1, color: '#64748b' },
    { name: 'Transferencia', count: payments.filter((p) => p.method === 'transferencia').length || 1, color: '#3b82f6' },
    { name: 'QR Simple', count: payments.filter((p) => p.method.includes('qr')).length || 2, color: '#10b981' },
    { name: 'Tarjeta', count: payments.filter((p) => p.method === 'tarjeta').length || 1, color: '#8b5cf6' },
  ];

  // 5. Morosidad por categoría
  const overdueByCategory = [
    { cat: 'Deportes', mora: 1250 },
    { cat: 'Recreación', mora: 750 },
    { cat: 'General', mora: 1500 },
    { cat: 'Entretenimiento', mora: 500 },
  ];

  // 6. Evolución Nuevos Socios
  const newMembersTrend = [
    { mes: 'Mayo', socios: 38 },
    { mes: 'Junio', socios: 42 },
    { mes: 'Julio', socios: 46 },
    { mes: 'Agosto', socios: 48 },
    { mes: 'Septiembre', socios: 50 },
  ];

  // Upcoming Birthdays (first 5 members with Polish names)
  const birthdayMembers = members.slice(0, 4);

  const handleSendBdayGreeting = (m: Member) => {
    sendSingleWhatsApp(m.id, 'tmpl-5');
    toast({
      type: 'success',
      title: 'Felicitación Enviada',
      message: `¡Wszystkiego najlepszego enviado por WhatsApp a ${m.fullName}!`,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-polaco-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Versión Recomendada
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Dashboard Avanzado de Gestión & Cobranza
          </h1>
          <p className="text-xs text-slate-500">
            Control integral de socios, automatización por WhatsApp y análisis predictivo de morosidad.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setComparisonOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-300"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Comparar paquetes</span>
          </button>
          
          <Link
            href="/demo/estandar/cobranza"
            className="flex items-center gap-1.5 py-2 px-4 text-xs font-bold rounded-xl bg-polaco-600 hover:bg-polaco-700 text-white shadow-2xs transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Centro de Cobranza</span>
          </Link>
        </div>
      </div>

      {/* 8 KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Socios Totales</span>
          <div className="text-xl font-black text-slate-900 mt-1">{totalMembers}</div>
          <span className="text-[10px] text-slate-400">En padrón</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Socios Activos</span>
          <div className="text-xl font-black text-emerald-600 mt-1">{activeMembers}</div>
          <span className="text-[10px] text-emerald-700 font-semibold">Al día</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Nuevos Socios</span>
          <div className="text-xl font-black text-blue-600 mt-1">+{newMembersThisMonth}</div>
          <span className="text-[10px] text-slate-400">Este mes</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">En Morosidad</span>
          <div className="text-xl font-black text-rose-600 mt-1">{overdueMembers}</div>
          <span className="text-[10px] text-rose-700 font-semibold">Urgente</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Cobrado Este Mes</span>
          <div className="text-xl font-black text-emerald-700 font-mono mt-1">{formatCurrency(collectedThisMonth)}</div>
          <span className="text-[10px] text-slate-400">Acreditado</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Deuda Pendiente</span>
          <div className="text-xl font-black text-rose-700 font-mono mt-1">{formatCurrency(pendingAmount)}</div>
          <span className="text-[10px] text-slate-400">Por cobrar</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Recibos Emitidos</span>
          <div className="text-xl font-black text-slate-900 mt-1">{paymentsCount}</div>
          <span className="text-[10px] text-slate-400">Comprobantes</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs bg-gradient-to-b from-polaco-50/50 to-white">
          <span className="text-[10px] font-bold text-polaco-700 uppercase block">% Cobranza</span>
          <div className="text-xl font-black text-polaco-800 font-mono mt-1">{collectionRate}%</div>
          <span className="text-[10px] text-polaco-600 font-semibold">Tasa de éxito</span>
        </div>

      </div>

      {/* 6 Advanced Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Chart 1: Cobranza Mensual vs Meta */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Cobranza Real vs Meta</h3>
              <p className="text-[10px] text-slate-500">Recaudación mensual en Bs</p>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="total" name="Cobrado" fill="#dc2626" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" name="Meta" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cobrado vs Pendiente */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Cobrado vs Pendiente</h3>
              <p className="text-[10px] text-slate-500">Relación de liquidez mensual</p>
            </div>
          </div>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={cobradoVsPendiente} cx="50%" cy="50%" innerRadius={42} outerRadius={68} dataKey="value" paddingAngle={4}>
                  {cobradoVsPendiente.map((e, idx) => (
                    <Cell key={idx} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-[11px] mt-1">
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Cobrado: {formatCurrency(collectedThisMonth)}
            </span>
            <span className="flex items-center gap-1 font-semibold text-rose-700">
              <span className="w-2 h-2 rounded-full bg-rose-500" /> Pendiente: {formatCurrency(pendingAmount)}
            </span>
          </div>
        </div>

        {/* Chart 3: Socios por Categoría */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Socios por Categoría</h3>
              <p className="text-[10px] text-slate-500">Distribución de disciplinas</p>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 15, left: 15, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={70} />
                <Tooltip />
                <Bar dataKey="count" fill="#b91c1c" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Métodos de Pago */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Canales de Pago Recibidos</h3>
              <p className="text-[10px] text-slate-500">Preferencia de cobro</p>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={paymentMethodsData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Morosidad por Categoría */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Morosidad por Sector</h3>
              <p className="text-[10px] text-slate-500">Monto vencido en Bs</p>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overdueByCategory} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <XAxis dataKey="cat" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="mora" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Evolución Nuevos Socios */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Crecimiento del Padrón</h3>
              <p className="text-[10px] text-slate-500">Altas acumuladas gestión 2026</p>
            </div>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={newMembersTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="socios" stroke="#dc2626" fill="#fee2e2" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Special Widgets: Próximos Cumpleaños, Actividad Reciente & Cobros Próximos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget: Próximos Cumpleaños Colectividad */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-polaco-50 text-polaco-600 flex items-center justify-center font-bold">
                <Cake className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Próximos Cumpleaños</h3>
                <p className="text-[10px] text-slate-500">Fidelización de socios este mes</p>
              </div>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              4 socios
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {birthdayMembers.map((m) => (
              <div key={m.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg">
                <div>
                  <span className="font-bold text-slate-800">{m.fullName}</span>
                  <div className="text-[10px] text-slate-400">
                    Fecha: {formatDate(m.birthDate)} • {m.categoryName}
                  </div>
                </div>

                <button
                  onClick={() => handleSendBdayGreeting(m)}
                  className="px-2 py-1 rounded bg-polaco-50 hover:bg-polaco-100 text-polaco-700 font-semibold text-[11px] border border-polaco-200 flex items-center gap-1 transition-colors"
                  title="Enviar felicitación por WhatsApp"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Felicitar</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Widget: Cobros Próximos a Vencer */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Cobros Próximos a Vencer</h3>
                <p className="text-[10px] text-slate-500">Vencimiento en 3 días (preventivo)</p>
              </div>
            </div>
            <Link href="/demo/estandar/cobranza" className="text-[11px] font-bold text-polaco-600 hover:underline">
              Ver todos
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {quotas.filter(q => q.status === 'pendiente').slice(0, 4).map((q) => (
              <div key={q.id} className="py-2.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg">
                <div>
                  <span className="font-bold text-slate-800">{q.memberName}</span>
                  <div className="text-[10px] text-slate-400">
                    {q.period} • Vence: {q.dueDate}
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-900 text-xs">
                  {formatCurrency(q.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget: Actividad y Auditoría Reciente */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Actividad de Auditoría</h3>
                <p className="text-[10px] text-slate-500">Trazabilidad con IP simulada</p>
              </div>
            </div>
            <Link href="/demo/estandar/auditoria" className="text-[11px] font-bold text-polaco-600 hover:underline">
              Bitácora
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px]">{log.action}</span>
                  <span className="text-[10px] font-mono text-slate-400">{log.timestamp.substring(11, 16)}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 flex justify-between">
                  <span>{log.module}</span>
                  <span className="font-mono">{log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modals */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        plan="estandar"
      />

      <PlanComparisonModal
        isOpen={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        currentPlan="estandar"
      />

    </div>
  );
}
