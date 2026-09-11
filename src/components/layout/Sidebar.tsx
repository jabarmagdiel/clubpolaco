"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Tags,
  CreditCard,
  CalendarDays,
  Receipt,
  FileSpreadsheet,
  BarChart3,
  Settings,
  UserCog,
  MessageSquare,
  Zap,
  ShieldCheck,
  Building2,
  QrCode,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Scale,
  Activity,
  History,
  AlertTriangle,
  UploadCloud,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PlanType } from '@/types/plans';

interface SidebarProps {
  plan: PlanType;
}

export const Sidebar: React.FC<SidebarProps> = ({ plan }) => {
  const pathname = usePathname();
  const [lockedModal, setLockedModal] = useState<{ title: string; requiredPlan: 'estandar' | 'completo'; benefit: string } | null>(null);

  const isActive = (path: string) => pathname === path || (path !== `/demo/${plan}/dashboard` && pathname.startsWith(path));

  const showLockedFeature = (title: string, requiredPlan: 'estandar' | 'completo', benefit: string) => {
    setLockedModal({ title, requiredPlan, benefit });
  };

  return (
    <>
      <aside className="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-4rem-28px)] sticky top-[92px] overflow-y-auto z-20">
        
        {/* Tier Info Card */}
        <div className="p-3 m-3 rounded-xl border bg-slate-50/70 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-400">Entorno CRM</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              plan === 'economico' ? 'bg-slate-200 text-slate-700' :
              plan === 'estandar' ? 'bg-polaco-100 text-polaco-700' : 'bg-slate-900 text-amber-300'
            }`}>
              {plan === 'economico' ? 'Inicial' : plan === 'estandar' ? 'Recomendado' : 'Enterprise'}
            </span>
          </div>
          <div className="font-bold text-slate-800 text-xs mt-1 capitalize flex items-center gap-1">
            {plan === 'estandar' && <Sparkles className="w-3 h-3 text-polaco-600 inline" />}
            {plan === 'completo' && <ShieldCheck className="w-3 h-3 text-amber-500 inline" />}
            Edición {plan}
          </div>
          <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
            {plan === 'economico' && 'Administración básica y pagos'}
            {plan === 'estandar' && 'WhatsApp y cobranza inteligente'}
            {plan === 'completo' && 'Fintech, QR, Conciliación & API'}
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 space-y-4 pb-6">

          {/* ======================= ECONÓMICO SIDEBAR ======================= */}
          {plan === 'economico' && (
            <div className="space-y-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2">
                Menú Principal
              </div>

              <SidebarLink href="/demo/economico/dashboard" icon={LayoutDashboard} label="Dashboard" active={isActive('/demo/economico/dashboard')} />
              <SidebarLink href="/demo/economico/socios" icon={Users} label="Socios" active={isActive('/demo/economico/socios')} />
              <SidebarLink href="/demo/economico/categorias" icon={Tags} label="Categorías" active={isActive('/demo/economico/categorias')} />
              <SidebarLink href="/demo/economico/membresias" icon={CreditCard} label="Membresías" active={isActive('/demo/economico/membresias')} />
              <SidebarLink href="/demo/economico/cuotas" icon={CalendarDays} label="Cuotas" active={isActive('/demo/economico/cuotas')} />
              <SidebarLink href="/demo/economico/pagos" icon={Receipt} label="Registro de Pagos" active={isActive('/demo/economico/pagos')} />
              <SidebarLink href="/demo/economico/morosidad" icon={AlertTriangle} label="Morosidad" active={isActive('/demo/economico/morosidad')} />
              <SidebarLink href="/demo/economico/recibos" icon={Receipt} label="Recibos PDF" active={isActive('/demo/economico/recibos')} />
              <SidebarLink href="/demo/economico/reportes" icon={BarChart3} label="Reportes Básicos" active={isActive('/demo/economico/reportes')} />
              <SidebarLink href="/demo/economico/excel" icon={FileSpreadsheet} label="Excel (Import/Export)" active={isActive('/demo/economico/excel')} />
              <SidebarLink href="/demo/economico/usuarios" icon={UserCog} label="Usuarios & Roles" active={isActive('/demo/economico/usuarios')} />
              <SidebarLink href="/demo/economico/configuracion" icon={Settings} label="Configuración" active={isActive('/demo/economico/configuracion')} />

              {/* Locked Features (Subtle Teaser) */}
              <div className="pt-4 border-t border-slate-100 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 flex items-center justify-between">
                  <span>Módulos Superiores</span>
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                </div>
                <LockedSidebarItem
                  label="Centro WhatsApp"
                  planName="Plan Estándar"
                  onClick={() => showLockedFeature('Centro de Comunicación WhatsApp', 'estandar', 'Permite enviar notificaciones automatizadas, plantillas de mora y felicitaciones de cumpleaños con 1 clic.')}
                />
                <LockedSidebarItem
                  label="Automatizaciones"
                  planName="Plan Estándar"
                  onClick={() => showLockedFeature('Motor de Automatizaciones', 'estandar', 'Dispara recordatorios 3 días antes del vencimiento y notifica confirmaciones de pago automáticamente.')}
                />
                <LockedSidebarItem
                  label="QR Dinámico Bancario"
                  planName="Plan Completo"
                  onClick={() => showLockedFeature('Generación de QR Dinámico BNB', 'completo', 'Genera QR único por cuota que concilia y cancela la deuda automáticamente al recibir la confirmación bancaria.')}
                />
              </div>
            </div>
          )}

          {/* ======================= ESTÁNDAR SIDEBAR ======================= */}
          {plan === 'estandar' && (
            <div className="space-y-4">
              
              {/* Core */}
              <div className="space-y-0.5">
                <SidebarLink href="/demo/estandar/dashboard" icon={LayoutDashboard} label="Dashboard General" active={isActive('/demo/estandar/dashboard')} />
              </div>

              {/* CRM */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  CRM & Socios
                </div>
                <SidebarLink href="/demo/estandar/socios" icon={Users} label="Base de Socios" active={isActive('/demo/estandar/socios')} badge="50" />
                <SidebarLink href="/demo/estandar/categorias" icon={Tags} label="Categorías" active={isActive('/demo/estandar/categorias')} />
                <SidebarLink href="/demo/estandar/membresias" icon={CreditCard} label="Membresías" active={isActive('/demo/estandar/membresias')} />
              </div>

              {/* Cobranza */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  Cobranza & Pagos
                </div>
                <SidebarLink href="/demo/estandar/cobranza" icon={CalendarDays} label="Gestión de Cuotas" active={isActive('/demo/estandar/cobranza')} />
                <SidebarLink href="/demo/estandar/pagos" icon={Receipt} label="Historial de Pagos" active={isActive('/demo/estandar/pagos')} />
                <SidebarLink href="/demo/estandar/morosidad" icon={AlertTriangle} label="Control Morosidad" active={isActive('/demo/estandar/morosidad')} badge="10 mora" badgeColor="text-rose-600 bg-rose-50" />
                <SidebarLink href="/demo/estandar/recibos" icon={Receipt} label="Recibos Emitidos" active={isActive('/demo/estandar/recibos')} />
              </div>

              {/* Comunicación */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 flex items-center justify-between">
                  <span>Comunicación</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">Activo</span>
                </div>
                <SidebarLink href="/demo/estandar/whatsapp" icon={MessageSquare} label="Centro WhatsApp" active={isActive('/demo/estandar/whatsapp')} />
                <SidebarLink href="/demo/estandar/automatizaciones" icon={Zap} label="Automatizaciones" active={isActive('/demo/estandar/automatizaciones')} badge="6 reglas" />
              </div>

              {/* Operaciones */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  Operaciones & Datos
                </div>
                <SidebarLink href="/demo/estandar/reportes" icon={BarChart3} label="Reportes Avanzados" active={isActive('/demo/estandar/reportes')} />
                <SidebarLink href="/demo/estandar/importaciones" icon={UploadCloud} label="Importador Excel" active={isActive('/demo/estandar/importaciones')} />
                <SidebarLink href="/demo/estandar/integraciones/contabilidad" icon={Building2} label="Preparación Contable" active={isActive('/demo/estandar/integraciones/contabilidad')} />
              </div>

              {/* Control */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  Seguridad & Roles
                </div>
                <SidebarLink href="/demo/estandar/usuarios" icon={UserCog} label="Roles y Permisos" active={isActive('/demo/estandar/usuarios')} />
                <SidebarLink href="/demo/estandar/auditoria" icon={History} label="Auditoría de Acciones" active={isActive('/demo/estandar/auditoria')} />
                <SidebarLink href="/demo/estandar/configuracion" icon={Settings} label="Configuración" active={isActive('/demo/estandar/configuracion')} />
              </div>

              {/* Teaser for Completo */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 flex items-center justify-between">
                  <span>Plan Completo Enterprise</span>
                  <Lock className="w-2.5 h-2.5 text-amber-500" />
                </div>
                <LockedSidebarItem
                  label="QR Dinámico & Tarjetas"
                  planName="Plan Completo"
                  onClick={() => showLockedFeature('Pasarela Digital Completa', 'completo', 'Permite generar cobros QR bancarios automatizados y pasarela de tarjetas con aprobación en línea.')}
                />
                <LockedSidebarItem
                  label="Conciliación Bancaria"
                  planName="Plan Completo"
                  onClick={() => showLockedFeature('Conciliación Bancaria Automática', 'completo', 'Compara transacciones de extractos bancarios contra pagos del CRM con matching automatizado.')}
                />
              </div>
            </div>
          )}

          {/* ======================= COMPLETO SIDEBAR ======================= */}
          {plan === 'completo' && (
            <div className="space-y-4">
              
              {/* Dashboard */}
              <div className="space-y-0.5">
                <SidebarLink href="/demo/completo/dashboard" icon={LayoutDashboard} label="Dashboard Enterprise" active={isActive('/demo/completo/dashboard')} />
                <SidebarLink href="/demo/completo/portal" icon={ExternalLink} label="Portal del Socio (Jan K.)" active={isActive('/demo/completo/portal')} badge="Demo" badgeColor="bg-amber-100 text-amber-900 border border-amber-300" />
              </div>

              {/* CRM Enterprise */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  CRM & Segmentación
                </div>
                <SidebarLink href="/demo/completo/socios" icon={Users} label="Base de Socios" active={isActive('/demo/completo/socios')} badge="50" />
                <SidebarLink href="/demo/completo/categorias" icon={Tags} label="Categorías" active={isActive('/demo/completo/categorias')} />
                <SidebarLink href="/demo/completo/membresias" icon={CreditCard} label="Membresías" active={isActive('/demo/completo/membresias')} />
              </div>

              {/* Cobranza & Conciliación */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  Cobranza & Conciliación
                </div>
                <SidebarLink href="/demo/completo/cobranza" icon={CalendarDays} label="Centro de Cobranzas" active={isActive('/demo/completo/cobranza')} />
                <SidebarLink href="/demo/completo/pagos" icon={Receipt} label="Libro de Pagos" active={isActive('/demo/completo/pagos')} />
                <SidebarLink href="/demo/completo/morosidad" icon={AlertTriangle} label="Morosidad & Scoring" active={isActive('/demo/completo/morosidad')} badge="10" badgeColor="text-rose-600 bg-rose-50" />
                <SidebarLink href="/demo/completo/cobranza/conciliacion" icon={Scale} label="Conciliación Bancaria" active={isActive('/demo/completo/cobranza/conciliacion')} badge="Motor Live" badgeColor="text-emerald-700 bg-emerald-50" />
              </div>

              {/* Pagos Digitales Fintech */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider px-3 flex items-center justify-between">
                  <span>Pagos Digitales</span>
                  <span className="text-[9px] bg-amber-100 text-amber-900 font-mono px-1 rounded font-bold">API</span>
                </div>
                <SidebarLink href="/demo/completo/pagos/qr" icon={QrCode} label="QR Dinámico Bancario" active={isActive('/demo/completo/pagos/qr')} />
                <SidebarLink href="/demo/completo/pagos/tarjetas" icon={CreditCard} label="Checkout Tarjetas" active={isActive('/demo/completo/pagos/tarjetas')} />
                <SidebarLink href="/demo/completo/pagos/transacciones" icon={Activity} label="Transacciones Digitales" active={isActive('/demo/completo/pagos/transacciones')} />
                <SidebarLink href="/demo/completo/pagos/webhooks" icon={Zap} label="Consola Webhooks" active={isActive('/demo/completo/pagos/webhooks')} badge="JSON" />
              </div>

              {/* Comunicación & Automatización */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  WhatsApp & Reglas
                </div>
                <SidebarLink href="/demo/completo/whatsapp" icon={MessageSquare} label="WhatsApp Enterprise" active={isActive('/demo/completo/whatsapp')} />
                <SidebarLink href="/demo/completo/automatizaciones" icon={Zap} label="Flujos Automatizados" active={isActive('/demo/completo/automatizaciones')} />
                <SidebarLink href="/demo/completo/recibos" icon={Receipt} label="Recibos Digitales" active={isActive('/demo/completo/recibos')} />
              </div>

              {/* Integraciones & Reportes */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  Integraciones & ERP
                </div>
                <SidebarLink href="/demo/completo/integraciones/contabilidad" icon={Building2} label="Sincronización Contable" active={isActive('/demo/completo/integraciones/contabilidad')} badge="Conectado" badgeColor="text-emerald-700 bg-emerald-50" />
                <SidebarLink href="/demo/completo/integraciones/estado" icon={Activity} label="Estado de Servicios" active={isActive('/demo/completo/integraciones/estado')} />
                <SidebarLink href="/demo/completo/reportes" icon={BarChart3} label="BI & Ratios Financieros" active={isActive('/demo/completo/reportes')} />
                <SidebarLink href="/demo/completo/importaciones" icon={UploadCloud} label="Importador Avanzado" active={isActive('/demo/completo/importaciones')} />
              </div>

              {/* Seguridad & Auditoría */}
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  Seguridad Enterprise
                </div>
                <SidebarLink href="/demo/completo/seguridad" icon={ShieldCheck} label="Centro de Seguridad" active={isActive('/demo/completo/seguridad')} />
                <SidebarLink href="/demo/completo/auditoria" icon={History} label="Auditoría Forense / Diffs" active={isActive('/demo/completo/auditoria')} />
                <SidebarLink href="/demo/completo/usuarios" icon={UserCog} label="Usuarios & Permisos" active={isActive('/demo/completo/usuarios')} />
                <SidebarLink href="/demo/completo/configuracion" icon={Settings} label="Configuración General" active={isActive('/demo/completo/configuracion')} />
              </div>
            </div>
          )}

        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-slate-900 truncate">Administración Club</div>
            <div className="text-[10px] text-slate-500 truncate">admin@clubpolaco.bo</div>
          </div>
        </div>

      </aside>

      {/* Locked Feature Modal */}
      {lockedModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
              <Lock className="w-6 h-6" />
            </div>
            
            <div className="text-xs font-bold text-polaco-600 uppercase tracking-wider">
              Función Exclusiva
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {lockedModal.title}
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {lockedModal.benefit}
            </p>

            <div className="my-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">Disponible a partir del:</span>
              <div className="font-bold text-slate-800 text-sm mt-0.5 uppercase">
                {lockedModal.requiredPlan === 'estandar' ? 'Plan Estándar (Recomendado)' : 'Plan Completo (Enterprise)'}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setLockedModal(null)}
                className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                Permanecer en {plan}
              </button>
              <Link
                href={`/demo/${lockedModal.requiredPlan}/dashboard`}
                onClick={() => setLockedModal(null)}
                className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-polaco-600 hover:bg-polaco-700 text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Explorar {lockedModal.requiredPlan}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: any;
  label: string;
  active: boolean;
  badge?: string;
  badgeColor?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon: Icon, label, active, badge, badgeColor }) => (
  <Link
    href={href}
    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
      active
        ? 'bg-polaco-50 text-polaco-800 font-bold border-l-4 border-polaco-600 shadow-sm'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`}
  >
    <div className="flex items-center gap-2.5 truncate">
      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-polaco-600' : 'text-slate-400'}`} />
      <span className="truncate">{label}</span>
    </div>
    {badge && (
      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${badgeColor || 'bg-slate-200 text-slate-700'}`}>
        {badge}
      </span>
    )}
  </Link>
);

const LockedSidebarItem: React.FC<{ label: string; planName: string; onClick: () => void }> = ({ label, planName, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors group text-left"
  >
    <div className="flex items-center gap-2.5 truncate">
      <Lock className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-500 transition-colors shrink-0" />
      <span className="truncate">{label}</span>
    </div>
    <span className="text-[9px] text-amber-600 bg-amber-50 px-1 py-0.5 rounded border border-amber-200 font-medium">
      {planName}
    </span>
  </button>
);
