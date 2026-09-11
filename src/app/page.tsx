"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Minus,
  Shield,
  Zap,
  Building,
  Users,
  CreditCard,
  MessageSquare,
  Scale,
  Lock,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { DemoBanner } from '@/components/layout/DemoBanner';

const COMPARISON_ROWS = [
  { feature: 'CRM y Base de Socios', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
  { feature: 'Categorías y Membresías', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
  { feature: 'Generación de Cuotas', eco: '✓ Manual', std: '✓ Masiva / Cat.', comp: '✓ Masiva y Automatizada' },
  { feature: 'Registro Manual de Pagos', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
  { feature: 'Control de Morosidad', eco: '✓ Básico', std: '✓ Avanzado', comp: '✓ Financiero / Scoring' },
  { feature: 'Recibos Oficiales en PDF', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Electrónico / Firma' },
  { feature: 'Exportación / Importación Excel', eco: '✓ Básico (.xlsx)', std: '✓ Drag&Drop + Mapeo', comp: '✓ Avanzado / Jobs' },
  { feature: 'Dashboard Operativo', eco: '✓ 3 KPIs / 3 Gráficos', std: '✓ 8 KPIs / 6 Gráficos', comp: '✓ Enterprise en Vivo' },
  { feature: 'Reportes de Cobranza', eco: '✓ Básicos', std: '✓ Avanzados', comp: '✓ BI & Conciliación' },
  { feature: 'Centro WhatsApp Integrado', eco: '— No incluido', std: '✓ Incluido (Plantillas)', comp: '✓ Avanzado con métricas' },
  { feature: 'Recordatorios de Vencimiento', eco: '— No incluido', std: '✓ Automático', comp: '✓ Automático + Enlace Pago' },
  { feature: 'Felicitaciones de Cumpleaños', eco: '— No incluido', std: '✓ Automático', comp: '✓ Automático' },
  { feature: 'Motor de Automatizaciones', eco: '— No incluido', std: '✓ 6 Reglas Clave', comp: '✓ Constructor Visual' },
  { feature: 'Auditoría de Actividad', eco: '— No incluido', std: '✓ Registro con IP', comp: '✓ Forense con Diffs' },
  { feature: 'Roles y Permisos Avanzados', eco: '3 Roles fijos', std: '✓ 5 Roles configurables', comp: '✓ Matriz RBAC completa' },
  { feature: 'Integración Contable Preparada', eco: '— No incluido', std: '✓ Exportación CSV/Excel', comp: '✓ Conexión API en Vivo' },
  { feature: 'Generación QR Dinámico', eco: '— No incluido', std: 'Opcional', comp: '✓ Incluido (BNB Simple)' },
  { feature: 'Pasarela de Tarjetas', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido (CyberSource)' },
  { feature: 'Recepción de Webhooks', eco: '— No incluido', std: '— No incluido', comp: '✓ Consola e Inspección JSON' },
  { feature: 'Conciliación Bancaria Automática', eco: '— No incluido', std: '— No incluido', comp: '✓ Motor de Matching' },
  { feature: 'Integración Contable Automática', eco: '— No incluido', std: '— No incluido', comp: '✓ API REST Sincronizada' },
  { feature: 'Trazabilidad Completa del Pago', eco: '— No incluido', std: '— No incluido', comp: '✓ Timeline 9 Fases' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-polaco-600 selection:text-white">
      <DemoBanner />

      {/* Hero Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-polaco-600 to-polaco-800 flex items-center justify-center text-white font-black text-base shadow-md shadow-polaco-600/20">
              CP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black tracking-tight text-slate-900 text-lg leading-none">
                  CLUB POLACO
                </span>
                <span className="text-[10px] uppercase font-bold text-polaco-600 bg-polaco-50 px-2 py-0.5 rounded border border-polaco-200">
                  PROPUESTA COMERCIAL CRM
                </span>
              </div>
              <span className="text-xs text-slate-500 block">
                Plataforma de Administración, Membresías y Cobranza
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#comparar"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              Comparar Planes
            </a>
            <Link
              href="/demo/estandar/dashboard"
              className="py-2 px-4 rounded-xl text-xs font-bold bg-polaco-600 hover:bg-polaco-700 text-white shadow-sm transition-all hover:shadow-md flex items-center gap-1.5"
            >
              <span>Ver Versión Recomendada</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-polaco-50 border border-polaco-200 text-polaco-700 text-xs font-bold uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-top-3">
            <Sparkles className="w-3.5 h-3.5" />
            Demostrador Comercial Interactivo
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Sistema Integral de Gestión <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-polaco-600 via-polaco-700 to-red-900">
              Club Polaco
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Seleccione una versión para explorar las funcionalidades disponibles y comparar de manera visual y operativa el impacto en su administración.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 50 Socios Precargados
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 Experiencias Funcionales
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sin Configuración Externa
            </span>
          </div>

        </div>
      </section>

      {/* The 3 Pricing & Package Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* PAQUETE ECONÓMICO */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-7 relative">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Paquete Inicial
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              ECONÓMICO
            </h3>
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Operativo Esencial
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Digitaliza la administración de socios y pagos esenciales de forma limpia y directa.
            </p>

            <div className="h-[1px] bg-slate-100 my-6" />

            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Funcionalidades Principales:
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 flex-1">
              {[
                'CRM y registro de socios',
                'Categorías y membresías',
                'Generación de cuotas mensual',
                'Registro manual de pagos',
                'Control de morosidad esencial',
                'Emisión de recibos PDF',
                'Exportación / importación Excel',
                'Dashboard básico (5 KPIs)',
                '3 Gráficos operativos',
                '3 Roles de usuarios (Admin, Caja, Consulta)',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/demo/economico/dashboard"
              className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-300 flex items-center justify-center gap-2 shadow-xs"
            >
              <span>EXPLORAR ECONÓMICO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* PAQUETE ESTÁNDAR (RECOMENDADO) */}
          <div className="bg-gradient-to-b from-polaco-50/40 via-white to-white rounded-2xl border-2 border-polaco-600 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col p-7 relative lg:-translate-y-3">
            
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-polaco-600 text-white text-[11px] font-black tracking-widest px-4 py-1 rounded-full uppercase shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              RECOMENDADO
            </div>

            <div className="text-xs font-bold text-polaco-700 uppercase tracking-wider mt-1">
              Propuesta Principal
            </div>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              ESTÁNDAR
            </h3>
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-polaco-100 text-polaco-800 border border-polaco-200">
                Cobranza & WhatsApp
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Automatiza la cobranza y centraliza la relación con los socios mediante WhatsApp y reglas automáticas.
            </p>

            <div className="h-[1px] bg-slate-100 my-6" />

            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Incluye todo Económico, más:
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 flex-1">
              {[
                'Dashboard avanzado (8 KPIs, 6 gráficos)',
                'Centro de mensajería WhatsApp con plantillas',
                'Automatizaciones (bienvenida, cuota, cumpleaños)',
                'Recordatorios de mora con 1 clic a 15 socios',
                'Auditoría completa de acciones con IP simulada',
                '5 Roles y permisos configurables',
                'Reportes avanzados y alertas preventivas',
                'Importador Excel inteligente con mapeo de campos',
                'Integración contable preparada (CSV/Excel)',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-polaco-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/demo/estandar/dashboard"
              className="mt-8 w-full py-3.5 px-4 rounded-xl text-xs font-black text-center bg-polaco-600 hover:bg-polaco-700 text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <span>EXPLORAR ESTÁNDAR</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* PAQUETE COMPLETO */}
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col p-7 relative">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Nivel Enterprise
            </div>
            <h3 className="text-2xl font-black text-white mt-1">
              COMPLETO
            </h3>
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Fintech & Portal Socio
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Automatización avanzada de pagos, conciliación e integración bancaria y contable de grado empresarial.
            </p>

            <div className="h-[1px] bg-slate-800 my-6" />

            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Incluye todo Estándar, más:
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 flex-1">
              {[
                'Generación de QR dinámico interactivo (BNB Simple)',
                'Pasarela y checkout de tarjetas (CyberSource)',
                'Consola de Webhooks con inspección JSON',
                'Verificación y liquidación automática en cascada',
                'Motor de conciliación bancaria inteligente',
                'Constructor visual de automatizaciones (CUANDO-SI-ENTONCES)',
                'Sincronización contable en tiempo real vía API',
                'Timeline de trazabilidad completa del pago (9 fases)',
                'Portal Autoservicio del Socio (Jan Kowalski)',
                'Auditoría forense con diffs antes/después',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/demo/completo/dashboard"
              className="mt-8 w-full py-3 px-4 rounded-xl text-xs font-bold text-center bg-white hover:bg-slate-100 text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>EXPLORAR COMPLETO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* EXTRA PROPOSAL BANNER: MÓDULO ESPECIALIZADO DE WHATSAPP */}
        <div className="mt-12 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-3xl border-2 border-emerald-500/50 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  PROPUESTA EXTRA / MÓDULO INDEPENDIENTE
                </span>
                <span className="text-xs text-emerald-300 font-semibold">
                  Sin necesidad de cambiar su sistema actual
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Automatización de Mensajería & Cobranza por WhatsApp
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ¿El Club Polaco ya cuenta con un sistema administrativo o planillas Excel y solo busca modernizar su cobranza y atención a socios? Esta propuesta independiente incorpora un <strong>asistente virtual interactivo 24/7</strong>, recordatorios preventivos de cuotas, cobranza de mora y felicitaciones de cumpleaños de forma automática.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-emerald-400 font-bold text-xs">Bot 24/7</div>
                  <div className="text-[11px] text-slate-400">Atención de saldos y eventos</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-emerald-400 font-bold text-xs">5 Reglas Activas</div>
                  <div className="text-[11px] text-slate-400">Cobranza y cumpleaños</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-emerald-400 font-bold text-xs">Envío Masivo</div>
                  <div className="text-[11px] text-slate-400">A 15 deudores en 1 clic</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <div className="text-emerald-400 font-bold text-xs">Cero Migración</div>
                  <div className="text-[11px] text-slate-400">Listo en menos de 48 horas</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-64">
              <Link
                href="/demo/whatsapp-automation"
                className="py-3.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs text-center transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                <span>EXPLORAR MÓDULO WHATSAPP</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo/whatsapp-automation"
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs text-center border border-white/20 transition-colors"
              >
                Ver Simulador en Vivo
              </Link>
            </div>
          </div>

          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Por qué implementar el sistema */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-polaco-600 uppercase tracking-wider">
              Beneficios Estratégicos
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              ¿Por qué implementar el sistema CRM en el Club Polaco?
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Diseñado específicamente para las necesidades administrativas de clubes sociales y deportivos en Bolivia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: Users,
                title: 'Centralización de Socios',
                desc: 'Un único padrón ordenado por categorías (Deportes, Recreación, General, Honorario) eliminando planillas dispersas.',
              },
              {
                icon: Shield,
                title: 'Reducción de Errores',
                desc: 'Registro riguroso de pagos con número correlativo de recibo oficial y trazabilidad que evita duplicidades.',
              },
              {
                icon: TrendingUp,
                title: 'Mejor Cobranza',
                desc: 'Identificación inmediata de socios al día vs. cuotas pendientes, acelerando los ingresos mensuales del Club.',
              },
              {
                icon: FileCheck2,
                title: 'Control de Morosidad',
                desc: 'Reportes de socios morosos calculados por días de atraso para cobranza proactiva y control de accesos.',
              },
              {
                icon: MessageSquare,
                title: 'Automatización WhatsApp',
                desc: 'Envío de recordatorios preventivos y confirmaciones de pago con plantillas formales y personalizadas.',
              },
              {
                icon: Scale,
                title: 'Conciliación Bancaria',
                desc: 'Cruce sistemático entre depósitos, transferencias, QR bancario y el extracto de cuenta institucional.',
              },
              {
                icon: Building,
                title: 'Integración Contable',
                desc: 'Exportación limpia para el contador o conexión directa con el sistema contable vigente del Club.',
              },
              {
                icon: Zap,
                title: 'Trazabilidad Integral',
                desc: 'Auditoría detallada de cada movimiento, usuario responsable y cambio realizado en el sistema.',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all hover:shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-polaco-600 flex items-center justify-center mb-4 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparar" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-polaco-600 uppercase tracking-wider">
            Evaluación Técnica
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Comparativa Detallada de Características
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Revise qué incluye cada versión para seleccionar el paquete óptimo para el Club Polaco.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="py-4 px-6 font-bold uppercase text-[11px] tracking-wider w-2/5">
                    Módulos & Funcionalidades
                  </th>
                  <th className="py-4 px-4 font-bold text-center w-1/5">
                    <div className="uppercase tracking-wider text-[11px] text-slate-300">Económico</div>
                    <div className="text-xs font-semibold text-slate-400 mt-0.5">Operativo Base</div>
                  </th>
                  <th className="py-4 px-4 font-bold text-center w-1/5 bg-polaco-800">
                    <div className="uppercase tracking-wider text-[11px] text-polaco-200 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3" /> Estándar
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">Cobranza Activa</div>
                  </th>
                  <th className="py-4 px-4 font-bold text-center w-1/5">
                    <div className="uppercase tracking-wider text-[11px] text-amber-400">Completo</div>
                    <div className="text-xs font-semibold text-amber-300 mt-0.5">Fintech & API</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="py-3 px-6 font-medium text-slate-900">
                      {row.feature}
                    </td>
                    
                    <td className="py-3 px-4 text-center">
                      {row.eco.includes('✓') ? (
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {row.eco}
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center justify-center gap-1">
                          <Minus className="w-3.5 h-3.5" /> No incluido
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center bg-polaco-50/20 font-semibold">
                      {row.std.includes('✓') ? (
                        <span className="font-semibold text-polaco-800 bg-polaco-50 px-2 py-0.5 rounded border border-polaco-200">
                          {row.std}
                        </span>
                      ) : row.std.includes('Opcional') ? (
                        <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Opcional
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center justify-center gap-1">
                          <Minus className="w-3.5 h-3.5" /> No incluido
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center font-bold text-slate-900">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                        {row.comp}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Disclaimers & Notes */}
      <section className="py-12 bg-slate-100 border-t border-slate-200 text-xs text-slate-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
              i
            </div>
            <div>
              <p className="font-bold text-slate-800">Costos de Servicios de Terceros</p>
              <p className="mt-0.5 text-slate-600 leading-relaxed">
                Los costos de proveedores externos como WhatsApp Business API (Meta), pasarelas de pago, entidades bancarias para QR, certificados de firma digital o hosting empresarial no están incluidos en el costo de la solución de software.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
            <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
              !
            </div>
            <div>
              <p className="font-bold text-slate-800">Alcance de Integraciones Técnicas</p>
              <p className="mt-0.5 text-slate-600 leading-relaxed">
                En el Plan Completo, la integración definitiva con QR bancario boliviano, tarjetas y sistema contable depende directamente de la disponibilidad, credenciales y documentación técnica oficial de las APIs proporcionadas por la entidad bancaria y el software contable del Club.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-polaco-700 text-white font-black text-xs flex items-center justify-center">
              CP
            </div>
            <span className="font-bold text-white">Club Polaco — Prototipo Comercial CRM</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/demo/economico/dashboard" className="hover:text-white transition-colors">Plan Económico</Link>
            <Link href="/demo/estandar/dashboard" className="hover:text-polaco-400 transition-colors font-bold">Plan Estándar</Link>
            <Link href="/demo/completo/dashboard" className="hover:text-amber-300 transition-colors">Plan Completo</Link>
          </div>

          <p className="text-[11px] text-slate-500">
            DEMO_MODE=true • Plataforma Comercial CRM
          </p>
        </div>
      </footer>
    </div>
  );
}
