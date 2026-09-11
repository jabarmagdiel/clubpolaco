"use client";

import React from 'react';
import Link from 'next/link';
import { X, Check, Minus, Sparkles, ArrowRight } from 'lucide-react';
import { PlanType } from '@/types/plans';

interface PlanComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: PlanType;
}

const COMPARISON_ROWS = [
  { feature: 'CRM y Base de Socios', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido', group: 'Gestión Principal' },
  { feature: 'Categorías y Membresías', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido', group: 'Gestión Principal' },
  { feature: 'Generación de Cuotas', eco: '✓ Manual', std: '✓ Masiva / Cat.', comp: '✓ Masiva y Automatizada', group: 'Gestión Principal' },
  { feature: 'Registro de Pagos Manual', eco: '✓ Incluido', std: '✓ Incluido', comp: '✓ Incluido', group: 'Cobranza' },
  { feature: 'Control de Morosidad', eco: '✓ Básico', std: '✓ Avanzado', comp: '✓ Financiero / Scoring', group: 'Cobranza' },
  { feature: 'Emisión de Recibos PDF', eco: '✓ Incluido', std: '✓ Con plantilla', comp: '✓ Electrónico / Firma', group: 'Cobranza' },
  { feature: 'Exportación / Importación Excel', eco: '✓ Básico (.xlsx)', std: '✓ Drag&Drop + Mapeo', comp: '✓ Bidireccional / Jobs', group: 'Operaciones' },
  { feature: 'Dashboard y Reportes', eco: '3 KPIs / 3 Gráficos', std: '8 KPIs / 6 Gráficos', comp: 'Enterprise en tiempo real', group: 'Analítica' },
  { feature: 'Centro de Mensajería WhatsApp', eco: '— No incluido', std: '✓ Incluido (Plantillas)', comp: '✓ Avanzado con métricas', group: 'Comunicación' },
  { feature: 'Recordatorios y Cumpleaños', eco: '— No incluido', std: '✓ Automático', comp: '✓ Automático + Enlace Pago', group: 'Comunicación' },
  { feature: 'Motor de Automatizaciones', eco: '— No incluido', std: '✓ 6 Reglas Clave', comp: '✓ Constructor Visual de Flujos', group: 'Automatización' },
  { feature: 'Auditoría de Actividad', eco: '— No incluido', std: '✓ Básica con IPs', comp: '✓ Diffs antes/después + Riesgo', group: 'Seguridad' },
  { feature: 'Roles y Permisos Avanzados', eco: '3 Roles fijos', std: '✓ 5 Roles configurables', comp: '✓ Matriz de seguridad RBAC', group: 'Seguridad' },
  { feature: 'Integración Contable Preparada', eco: '— No incluido', std: '✓ Exportación CSV/Excel', comp: '✓ Conexión API en Tiempo Real', group: 'Contabilidad' },
  { feature: 'Generación QR Bancario Dinámico', eco: '— No incluido', std: 'Opcional', comp: '✓ Incluido (BNB Simple)', group: 'Fintech' },
  { feature: 'Pasarela de Tarjetas Crédito/Débito', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido (CyberSource)', group: 'Fintech' },
  { feature: 'Recepción y Trazabilidad Webhooks', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido con payload JSON', group: 'Fintech' },
  { feature: 'Conciliación Bancaria Automática', eco: '— No incluido', std: '— No incluido', comp: '✓ Motor de matching 100%', group: 'Fintech' },
  { feature: 'Timeline de Trazabilidad del Pago', eco: '— No incluido', std: '— No incluido', comp: '✓ Timeline 9 pasos visual', group: 'Fintech' },
  { feature: 'Portal Autoservicio del Socio', eco: '— No incluido', std: '— No incluido', comp: '✓ Incluido (Jan Kowalski)', group: 'Experiencia' },
];

export const PlanComparisonModal: React.FC<PlanComparisonModalProps> = ({ isOpen, onClose, currentPlan }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50/80 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-polaco-100 text-polaco-800 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Matriz Comparativa Comercial
              </span>
              {currentPlan && (
                <span className="text-xs text-slate-500 font-medium">
                  (Viendo actualmente: <strong className="uppercase text-slate-800">{currentPlan}</strong>)
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Comparativa de Paquetes — Club Polaco
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4 mb-6 sticky top-0 bg-white/95 backdrop-blur-md pb-4 pt-2 border-b border-slate-200 z-10">
            <div className="col-span-1 flex items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Módulos & Capacidades</span>
            </div>
            
            {/* Plan Económico Card */}
            <div className={`p-4 rounded-xl border transition-all ${currentPlan === 'economico' ? 'border-polaco-600 bg-polaco-50/40 ring-2 ring-polaco-600/20' : 'border-slate-200 bg-slate-50'}`}>
              <div className="text-xs font-bold text-slate-500 uppercase">Económico</div>
              <div className="text-xs font-semibold text-slate-600 mt-0.5">Operativo Esencial</div>
              <div className="text-[11px] text-slate-600 mt-1 line-clamp-2">Gestión esencial y pagos manuales</div>
              <Link
                href="/demo/economico/dashboard"
                onClick={onClose}
                className="mt-3 block text-center py-1.5 px-3 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors shadow-sm"
              >
                {currentPlan === 'economico' ? 'Plan Activo' : 'Ver Económico'}
              </Link>
            </div>

            {/* Plan Estándar Card (Recommended) */}
            <div className={`p-4 rounded-xl border relative transition-all ${currentPlan === 'estandar' ? 'border-polaco-600 bg-polaco-50/60 ring-2 ring-polaco-600/30' : 'border-polaco-300 bg-gradient-to-b from-polaco-50/60 to-white shadow-md'}`}>
              <div className="absolute -top-2.5 right-3 bg-polaco-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <Sparkles className="w-2.5 h-2.5" /> Recomendado
              </div>
              <div className="text-xs font-bold text-polaco-700 uppercase">Estándar</div>
              <div className="text-xs font-bold text-polaco-800 mt-0.5">Cobranza & WhatsApp</div>
              <div className="text-[11px] text-slate-600 mt-1 line-clamp-2">Cobranza automatizada & WhatsApp</div>
              <Link
                href="/demo/estandar/dashboard"
                onClick={onClose}
                className="mt-3 block text-center py-1.5 px-3 rounded-lg text-xs font-semibold bg-polaco-600 text-white hover:bg-polaco-700 transition-colors shadow-sm"
              >
                {currentPlan === 'estandar' ? 'Plan Activo' : 'Ver Estándar'}
              </Link>
            </div>

            {/* Plan Completo Card */}
            <div className={`p-4 rounded-xl border transition-all ${currentPlan === 'completo' ? 'border-polaco-600 bg-polaco-50/40 ring-2 ring-polaco-600/20' : 'border-slate-900 bg-slate-900 text-white shadow-md'}`}>
              <div className="text-xs font-bold text-slate-400 uppercase">Completo Enterprise</div>
              <div className="text-xs font-semibold text-amber-300 mt-0.5">Fintech & API</div>
              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">QR dinámico, tarjetas, conciliación & API</div>
              <Link
                href="/demo/completo/dashboard"
                onClick={onClose}
                className="mt-3 block text-center py-1.5 px-3 rounded-lg text-xs font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
              >
                {currentPlan === 'completo' ? 'Plan Activo' : 'Ver Completo'}
              </Link>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="divide-y divide-slate-100">
            {COMPARISON_ROWS.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 py-2.5 px-2 hover:bg-slate-50 text-xs items-center transition-colors rounded-lg">
                <div className="col-span-1 pr-3">
                  <span className="font-medium text-slate-800">{row.feature}</span>
                  <span className="block text-[10px] text-slate-400">{row.group}</span>
                </div>
                
                {/* Económico Value */}
                <div className="col-span-1 px-2 text-center text-slate-700">
                  {row.eco.includes('✓') ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {row.eco}
                    </span>
                  ) : row.eco.includes('—') ? (
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Minus className="w-3.5 h-3.5" /> No incluido
                    </span>
                  ) : (
                    <span className="text-slate-600">{row.eco}</span>
                  )}
                </div>

                {/* Estándar Value */}
                <div className="col-span-1 px-2 text-center font-medium">
                  {row.std.includes('✓') ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      {row.std}
                    </span>
                  ) : row.std.includes('—') ? (
                    <span className="inline-flex items-center gap-1 text-slate-400">
                      <Minus className="w-3.5 h-3.5" /> No incluido
                    </span>
                  ) : row.std.includes('Opcional') ? (
                    <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                      Opcional
                    </span>
                  ) : (
                    <span className="text-slate-700">{row.std}</span>
                  )}
                </div>

                {/* Completo Value */}
                <div className="col-span-1 px-2 text-center font-semibold text-slate-900">
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    {row.comp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Commercial Note */}
          <div className="mt-6 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <div className="p-1 rounded-full bg-slate-200 text-slate-700 font-bold shrink-0">i</div>
            <p className="leading-relaxed">
              <strong>Nota comercial:</strong> Los costos de proveedores externos (WhatsApp Business API, comisiones de pasarela de tarjetas, entidades bancarias para QR o hosting empresarial) no están incluidos en el costo de licencia de software y dependen de los contratos directos del Club.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between rounded-b-2xl">
          <Link
            href="/comparar"
            onClick={onClose}
            className="text-xs text-polaco-600 hover:text-polaco-700 font-semibold flex items-center gap-1"
          >
            Ver tabla comparativa extendida <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Cerrar Comparativa
          </button>
        </div>
      </div>
    </div>
  );
};
