"use client";

import React, { useState } from 'react';
import { UserCog, Shield, Check, X, Sparkles } from 'lucide-react';
import { useToast } from '@/lib/toast';

const ENTERPRISE_ROLES = [
  { name: 'Superadministrador', desc: 'Directorio y Presidencia del Club Polaco', perms: ['crm', 'pagos', 'qr', 'tarjetas', 'webhooks', 'conciliacion', 'contabilidad', 'auditoria', 'seguridad'] },
  { name: 'Director de Finanzas', desc: 'Tesorería y Gestión Bancaria', perms: ['crm', 'pagos', 'qr', 'tarjetas', 'conciliacion', 'contabilidad', 'auditoria'] },
  { name: 'Operador de Caja', desc: 'Cobros presenciales y emisión de comprobantes', perms: ['crm', 'pagos', 'qr'] },
  { name: 'Secretaría General', desc: 'Padrón de socios y atención en recepción', perms: ['crm'] },
  { name: 'Auditor Contable Externo', desc: 'Fiscalización y cruce con extractos bancarios', perms: ['conciliacion', 'contabilidad', 'auditoria'] },
];

export default function CompletoUsuariosPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Seguridad RBAC
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Gestión de Usuarios & Control de Accesos</h1>
        <p className="text-xs text-slate-500">Esquema Role-Based Access Control (RBAC) con separación de funciones contables y de caja.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
        {ENTERPRISE_ROLES.map((role, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">{role.name}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-slate-500 mt-1 leading-relaxed">{role.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">Módulos Asignados:</span>
              <div className="flex flex-wrap gap-1">
                {role.perms.map((p, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[9px]">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
