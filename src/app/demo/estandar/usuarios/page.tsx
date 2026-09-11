"use client";

import React, { useState } from 'react';
import { UserCog, ShieldCheck, Check, X } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface RoleDef {
  name: string;
  badge: string;
  usersCount: number;
  perms: {
    socios: boolean;
    cobranza: boolean;
    whatsapp: boolean;
    auditoria: boolean;
    contabilidad: boolean;
  };
}

const INITIAL_ROLES: RoleDef[] = [
  { name: 'Superadministrador', badge: 'Acceso Total', usersCount: 1, perms: { socios: true, cobranza: true, whatsapp: true, auditoria: true, contabilidad: true } },
  { name: 'Administrador', badge: 'Gestión', usersCount: 2, perms: { socios: true, cobranza: true, whatsapp: true, auditoria: true, contabilidad: false } },
  { name: 'Caja / Finanzas', badge: 'Cobranza', usersCount: 2, perms: { socios: true, cobranza: true, whatsapp: false, auditoria: false, contabilidad: true } },
  { name: 'Atención al Socio', badge: 'Secretaría', usersCount: 3, perms: { socios: true, cobranza: false, whatsapp: true, auditoria: false, contabilidad: false } },
  { name: 'Auditor Externo', badge: 'Sólo Lectura', usersCount: 1, perms: { socios: true, cobranza: true, whatsapp: false, auditoria: true, contabilidad: true } },
];

export default function EstandarUsuariosPage() {
  const [roles, setRoles] = useState<RoleDef[]>(INITIAL_ROLES);
  const { toast } = useToast();

  const togglePerm = (roleIndex: number, permKey: keyof RoleDef['perms']) => {
    setRoles(prev => prev.map((r, idx) => {
      if (idx === roleIndex) {
        return {
          ...r,
          perms: {
            ...r.perms,
            [permKey]: !r.perms[permKey],
          }
        };
      }
      return r;
    }));
    toast({ type: 'info', title: 'Permiso Modificado', message: 'La matriz de acceso fue actualizada en modo demo.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Control de Acceso</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">Plan Estándar</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Roles y Permisos Granulares</h1>
        <p className="text-xs text-slate-500">Configuración de los 5 perfiles de seguridad para funcionarios del Club Polaco.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider">
          Matriz de Privilegios por Módulo
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Perfil / Rol</th>
                <th className="py-3 px-4 text-center">Gestión Socios</th>
                <th className="py-3 px-4 text-center">Cobranza & Cuotas</th>
                <th className="py-3 px-4 text-center">Despacho WhatsApp</th>
                <th className="py-3 px-4 text-center">Consulta Auditoría</th>
                <th className="py-3 px-4 text-center">Exportación Contable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{r.name}</span>
                      <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        {r.badge}
                      </span>
                    </div>
                  </td>

                  {(['socios', 'cobranza', 'whatsapp', 'auditoria', 'contabilidad'] as const).map((pKey) => (
                    <td key={pKey} className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => togglePerm(idx, pKey)}
                        className={`p-1 rounded transition-colors ${r.perms[pKey] ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'text-slate-300 hover:bg-slate-100'}`}
                      >
                        {r.perms[pKey] ? <Check className="w-4 h-4 font-black" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
