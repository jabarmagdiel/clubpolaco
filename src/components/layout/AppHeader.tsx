"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Sparkles, SlidersHorizontal, Home, Shield, ExternalLink, MessageSquare, ArrowRight } from 'lucide-react';
import { PlanType } from '@/types/plans';
import { PlanComparisonModal } from './PlanComparisonModal';

interface AppHeaderProps {
  plan: PlanType;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ plan }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitchPlan = (newPlan: PlanType) => {
    setDropdownOpen(false);
    // Keep relative subroute if possible, or redirect to dashboard of new plan
    const subPath = pathname.split('/').slice(3).join('/');
    // Check if subroute makes sense or fall back to dashboard
    router.push(`/demo/${newPlan}/${subPath || 'dashboard'}`);
  };

  return (
    <>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-polaco-600 to-polaco-800 flex items-center justify-center text-white font-black text-sm shadow-md shadow-polaco-600/20 group-hover:scale-105 transition-transform">
                CP
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black tracking-tight text-slate-900 text-base leading-none">
                    CLUB POLACO
                  </span>
                  <span className="text-[10px] uppercase font-bold text-polaco-600 bg-polaco-50 px-1.5 py-0.5 rounded border border-polaco-200">
                    CRM
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 block leading-tight">
                  Sistema Integral de Gestión
                </span>
              </div>
            </Link>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

            {/* Current Plan Badge */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Plan actual:</span>
              {plan === 'directo' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  DIRECTO EXCLUSIVO
                  <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.2 rounded font-extrabold ml-0.5">
                    A MEDIDA
                  </span>
                </span>
              )}
              {plan === 'economico' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  ECONÓMICO
                </span>
              )}
              {plan === 'estandar' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-polaco-50 text-polaco-700 border border-polaco-300 shadow-sm">
                  <Sparkles className="w-3 h-3 text-polaco-600" />
                  ESTÁNDAR
                  <span className="bg-polaco-600 text-white text-[9px] px-1.5 py-0.2 rounded font-extrabold ml-0.5">
                    RECOMENDADO
                  </span>
                </span>
              )}
              {plan === 'completo' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900 text-amber-300 border border-slate-700 shadow-sm">
                  <Shield className="w-3 h-3 text-amber-400" />
                  COMPLETO
                  <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-mono ml-0.5">
                    ENTERPRISE
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Controls: Plan Switcher Dropdown & Comparison Button */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Switch Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors shadow-sm"
              >
                <span>Cambiar paquete</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Seleccionar Versión Comercial
                  </div>

                  <button
                    onClick={() => handleSwitchPlan('directo')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors ${plan === 'directo' ? 'bg-emerald-50 font-bold text-emerald-900 border-l-4 border-emerald-600' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="flex items-center gap-1 font-bold text-emerald-950">
                        <span>Directo Exclusivo</span>
                        <span className="text-[9px] bg-emerald-600 text-white font-black px-1 rounded">A MEDIDA</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Membresías + Pagos + WhatsApp directo</div>
                    </div>
                    {plan === 'directo' && <span className="text-xs text-emerald-700 font-bold">✓ Activo</span>}
                  </button>

                  <button
                    onClick={() => handleSwitchPlan('economico')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${plan === 'economico' ? 'bg-slate-50 font-bold text-slate-900 border-l-4 border-slate-800' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-semibold">Económico</div>
                      <div className="text-[11px] text-slate-500">Operativo esencial de socios y caja</div>
                    </div>
                    {plan === 'economico' && <span className="text-xs text-slate-900 font-bold">✓ Activo</span>}
                  </button>

                  <button
                    onClick={() => handleSwitchPlan('estandar')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-polaco-50 transition-colors ${plan === 'estandar' ? 'bg-polaco-50 font-bold text-polaco-800 border-l-4 border-polaco-600' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="flex items-center gap-1 font-semibold text-polaco-900">
                        <span>Estándar</span>
                        <span className="text-[9px] bg-polaco-600 text-white font-bold px-1 rounded">RECOMENDADO</span>
                      </div>
                      <div className="text-[11px] text-slate-500">Cobranza activa, WhatsApp & Auditoría</div>
                    </div>
                    {plan === 'estandar' && <span className="text-xs text-polaco-600 font-bold">✓ Activo</span>}
                  </button>

                  <button
                    onClick={() => handleSwitchPlan('completo')}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-900 hover:text-white transition-colors ${plan === 'completo' ? 'bg-slate-900 text-white font-bold border-l-4 border-amber-400' : 'text-slate-700'}`}
                  >
                    <div>
                      <div className="font-semibold">Completo Enterprise</div>
                      <div className="text-[11px] opacity-80">QR dinámico, Conciliación & Portal</div>
                    </div>
                    {plan === 'completo' && <span className="text-xs text-amber-400 font-bold">✓ Activo</span>}
                  </button>

                  {/* Extra Standalone Proposal */}
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <div className="px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-600" /> Propuesta Extra / Módulo Independiente
                    </div>
                    <Link
                      href="/demo/whatsapp-automation"
                      onClick={() => setDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition-colors text-slate-800"
                    >
                      <div>
                        <div className="font-semibold text-emerald-950 flex items-center gap-1">
                          <span>Automatización WhatsApp</span>
                          <span className="text-[9px] bg-emerald-600 text-white font-bold px-1 rounded">EXTRA</span>
                        </div>
                        <div className="text-[11px] text-slate-500">Recordatorios, cobranza y bot 24/7</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Quick WhatsApp Proposal Link */}
            <Link
              href="/demo/whatsapp-automation"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors shadow-2xs"
              title="Ver Módulo Extra de Automatización WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Módulo WhatsApp Extra</span>
            </Link>

            {/* Compare Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-polaco-600 hover:bg-polaco-700 text-white shadow-sm transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Comparar con otros paquetes</span>
              <span className="sm:hidden">Comparar</span>
            </button>

            {/* Member Portal Link for Completo */}
            {plan === 'completo' && (
              <Link
                href="/demo/completo/portal"
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors"
                title="Ver experiencia del socio en portal autoservicio"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Portal Socio</span>
              </Link>
            )}

            {/* Link back to Landing */}
            <Link
              href="/"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Volver a la landing comercial"
            >
              <Home className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Comparison Modal */}
      <PlanComparisonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentPlan={plan}
      />
    </>
  );
};
