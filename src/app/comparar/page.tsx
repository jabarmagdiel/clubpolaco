"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle2, Minus, ArrowRight } from 'lucide-react';
import { DemoBanner } from '@/components/layout/DemoBanner';

const COMPARISON_DATA = [
  { group: '1. Padrón y Gestión de Socios', items: [
    { name: 'Base unificada de 50+ socios', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Clasificación por Categorías (Deportes, Recreación, etc.)', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Tipos de Membresía (Individual, Familiar, Juvenil, Senior)', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Perfil completo del socio con saldo histórico', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Etiquetas y segmentación avanzada', eco: '— No incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Portal autoservicio del socio (experiencia Jan Kowalski)', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
  ]},
  { group: '2. Cobranza, Cuotas y Recibos', items: [
    { name: 'Generación manual de cuotas', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Generación masiva segmentada por categoría', eco: '— No incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Registro manual de pagos (Efectivo, Transferencia, QR manual)', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Emisión de Recibos Oficiales en PDF con QR de auditoría', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Control de socios morosos y días de mora', eco: '✓ Vista básica', std: '✓ Con filtros avanzados', comp: '✓ Scoring financiero' },
    { name: 'Envío de recordatorio masivo a 15 morosos con 1 clic', eco: '— No incluido', std: '✓ Vía WhatsApp', comp: '✓ WhatsApp + Link Pago' },
  ]},
  { group: '3. Pasarela Fintech y Pagos Digitales', items: [
    { name: 'QR manual (confirmación manual del administrador)', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'QR Dinámico bancario BNB (generación e ID único por cuota)', eco: '— No incluido', std: 'Opcional', comp: '✓ Incluido' },
    { name: 'Simulador bancario reactivo (Pendiente -> Pagado)', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
    { name: 'Checkout pasarela de tarjetas (VISA / Mastercard)', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
    { name: 'Consola e inspección de Webhooks bancarios (JSON)', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
    { name: 'Motor de Conciliación Bancaria automática', eco: '— No incluido', std: '— No incluido', comp: '✓ Live Matching' },
    { name: 'Timeline de Trazabilidad completa del pago (9 pasos)', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
  ]},
  { group: '4. WhatsApp y Automatizaciones', items: [
    { name: 'Centro de mensajería WhatsApp', eco: '— No incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Plantillas formales (bienvenida, mora, cumpleaños, pago)', eco: '— No incluido', std: '✓ 5 Plantillas', comp: '✓ Plantillas dinámicas' },
    { name: 'Motor de automatizaciones (eventos por reglas)', eco: '— No incluido', std: '✓ 6 Reglas automáticas', comp: '✓ Constructor Visual' },
    { name: 'Métricas de lectura y entrega de mensajes', eco: '— No incluido', std: 'Básicas', comp: '✓ Avanzadas' },
  ]},
  { group: '5. Integración Contable y Operaciones', items: [
    { name: 'Exportación a Excel / CSV básica', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido' },
    { name: 'Importador Excel con drag&drop y mapeo de columnas', eco: '— No incluido', std: '✓ Incluido', comp: '✓ Con validación previa' },
    { name: 'Exportación estructurada para sistema contable', eco: '— No incluido', std: '✓ Preparada', comp: '✓ API REST en Vivo' },
    { name: 'Monitor de estado de servicios (APIs banco/contabilidad)', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
  ]},
  { group: '6. Seguridad y Auditoría', items: [
    { name: 'Roles de usuario', eco: '3 Roles fijos', std: '5 Roles configurables', comp: 'Matriz RBAC completa' },
    { name: 'Bitácora de auditoría con IP simulada', eco: '— No incluido', std: '✓ Incluido', comp: '✓ Forense con Diffs' },
    { name: 'Panel de monitoreo de seguridad y sesiones activas', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido' },
  ]},
];

export default function CompararPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DemoBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la portada</span>
          </Link>
          <span className="text-xs font-mono text-slate-400">Club Polaco CRM • Tabla Comparativa</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Matriz Comparativa de Paquetes
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Análisis funcional y técnico de las tres ediciones disponibles para el Club Polaco.
          </p>
        </div>

        {/* Pricing Header Strip */}
        <div className="grid grid-cols-4 gap-4 mb-6 sticky top-4 bg-slate-50/95 backdrop-blur-md pt-2 pb-4 border-b border-slate-200 z-20">
          <div className="col-span-1 flex items-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacidades</span>
          </div>

          <div className="col-span-1 p-4 bg-white rounded-xl border border-slate-200 shadow-sm text-center">
            <div className="text-xs font-bold text-slate-500 uppercase">Económico</div>
            <div className="text-xs font-semibold text-slate-600 mt-1">Operativo Esencial</div>
            <Link
              href="/demo/economico/dashboard"
              className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg w-full transition-colors"
            >
              <span>Ver Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="col-span-1 p-4 bg-gradient-to-b from-polaco-50 to-white rounded-xl border-2 border-polaco-600 shadow-md text-center relative">
            <div className="absolute -top-2.5 right-3 bg-polaco-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Recomendado
            </div>
            <div className="text-xs font-bold text-polaco-700 uppercase">Estándar</div>
            <div className="text-xs font-bold text-polaco-800 mt-1">Cobranza & WhatsApp</div>
            <Link
              href="/demo/estandar/dashboard"
              className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-bold text-white bg-polaco-600 hover:bg-polaco-700 px-3 py-1.5 rounded-lg w-full transition-colors"
            >
              <span>Ver Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="col-span-1 p-4 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-md text-center">
            <div className="text-xs font-bold text-amber-400 uppercase">Completo Enterprise</div>
            <div className="text-xs font-semibold text-amber-300 mt-1">Fintech & Integraciones</div>
            <Link
              href="/demo/completo/dashboard"
              className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 px-3 py-1.5 rounded-lg w-full transition-colors"
            >
              <span>Ver Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Detailed Groups */}
        <div className="space-y-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          {COMPARISON_DATA.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <h3 className="text-xs font-bold text-polaco-700 uppercase tracking-wider pb-2 border-b border-slate-200">
                {group.group}
              </h3>
              <div className="divide-y divide-slate-100">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="grid grid-cols-4 py-2.5 px-2 hover:bg-slate-50 text-xs items-center rounded-lg">
                    <div className="col-span-1 font-medium text-slate-900 pr-3">
                      {item.name}
                    </div>
                    <div className="col-span-1 text-center text-slate-700">
                      {item.eco.includes('✓') ? (
                        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{item.eco}</span>
                      ) : (
                        <span className="text-slate-400 flex items-center justify-center gap-1"><Minus className="w-3 h-3" /> No incluido</span>
                      )}
                    </div>
                    <div className="col-span-1 text-center font-medium">
                      {item.std.includes('✓') ? (
                        <span className="font-semibold text-polaco-800 bg-polaco-50 px-2 py-0.5 rounded border border-polaco-200">{item.std}</span>
                      ) : item.std.includes('Opcional') ? (
                        <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">{item.std}</span>
                      ) : (
                        <span className="text-slate-400 flex items-center justify-center gap-1"><Minus className="w-3 h-3" /> No incluido</span>
                      )}
                    </div>
                    <div className="col-span-1 text-center font-bold text-slate-900">
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{item.comp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
