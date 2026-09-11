"use client";

import React from 'react';
import { UserCog, ShieldCheck, User } from 'lucide-react';

const USERS = [
  { name: 'Admin Principal', email: 'admin@clubpolaco.bo', role: 'Administrador', desc: 'Acceso total a configuración, socios y cuotas' },
  { name: 'Operador de Caja', email: 'caja@clubpolaco.bo', role: 'Caja', desc: 'Registro de pagos y emisión de recibos manuales' },
  { name: 'Secretaría / Recepción', email: 'recepcion@clubpolaco.bo', role: 'Consulta', desc: 'Búsqueda de socios y visualización de saldos' },
];

export default function EconomicoUsuariosPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Seguridad Básica</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Usuarios y Roles del Sistema</h1>
        <p className="text-xs text-slate-500">Gestión de cuentas con los 3 roles estándar incluidos en la versión Económica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {USERS.map((u, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {u.role}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{u.name}</h3>
              <p className="text-xs text-slate-500 font-mono">{u.email}</p>
            </div>
            <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
              {u.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
