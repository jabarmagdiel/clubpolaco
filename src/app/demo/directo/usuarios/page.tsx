"use client";

import React, { useState } from 'react';
import {
  UserCog,
  Plus,
  Shield,
  CheckCircle2,
  Mail,
  Phone,
  Lock,
  Search,
  UserCheck,
  UserX,
  X,
  Edit2,
  KeyRound
} from 'lucide-react';
import { useToast } from '@/lib/toast';

interface SystemUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'admin' | 'caja' | 'porteria' | 'cobranza';
  roleLabel: string;
  status: 'activo' | 'inactivo';
  lastLogin: string;
  permissions: string[];
}

export default function DirectoUsuariosPage() {
  const { toast } = useToast();

  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: 'usr-1',
      fullName: 'Miguel Ángel Kowalczyk',
      email: 'admin@clubpolanco.bo',
      phone: '+591 70619283',
      role: 'admin',
      roleLabel: 'Administrador General',
      status: 'activo',
      lastLogin: 'Hace 10 minutos',
      permissions: ['Control Total', 'Crear Usuarios', 'Configuración WhatsApp', 'Reportes Financieros'],
    },
    {
      id: 'usr-2',
      fullName: 'Beatriz Zielinski',
      email: 'caja@clubpolanco.bo',
      phone: '+591 71529384',
      role: 'caja',
      roleLabel: 'Encargada de Caja & Pagos',
      status: 'activo',
      lastLogin: 'Hoy a las 08:30 AM',
      permissions: ['Cobro de Cuotas', 'Emisión de Recibos', 'Renovación de Membresías'],
    },
    {
      id: 'usr-3',
      fullName: 'Jorge Domínguez',
      email: 'porteria@clubpolanco.bo',
      phone: '+591 72049182',
      role: 'porteria',
      roleLabel: 'Control de Acceso / Portería',
      status: 'activo',
      lastLogin: 'Ayer a las 18:00',
      permissions: ['Verificación de Carnets', 'Consulta de Estado (Al Día / Vencido)'],
    },
    {
      id: 'usr-4',
      fullName: 'Valeria Wozniak',
      email: 'cobranzas@clubpolanco.bo',
      phone: '+591 73819204',
      role: 'cobranza',
      roleLabel: 'Operadora de WhatsApp & Mora',
      status: 'activo',
      lastLogin: 'Hoy a las 09:15 AM',
      permissions: ['Disparo de Recordatorios', 'Atención Chat WhatsApp', 'Gestión de Morosos'],
    },
  ]);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // New User Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+591 ');
  const [formRole, setFormRole] = useState<'admin' | 'caja' | 'porteria' | 'cobranza'>('caja');
  const [formPassword, setFormPassword] = useState('');

  const filteredUsers = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.roleLabel.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      toast({ type: 'error', title: 'Error', message: 'Nombre y correo son obligatorios.' });
      return;
    }

    const roleLabels = {
      admin: 'Administrador General',
      caja: 'Encargada de Caja & Pagos',
      porteria: 'Control de Acceso / Portería',
      cobranza: 'Operadora de WhatsApp & Mora'
    };

    const rolePermissions = {
      admin: ['Control Total', 'Crear Usuarios', 'Configuración WhatsApp', 'Reportes Financieros'],
      caja: ['Cobro de Cuotas', 'Emisión de Recibos', 'Renovación de Membresías'],
      porteria: ['Verificación de Carnets', 'Consulta de Estado (Al Día / Vencido)'],
      cobranza: ['Disparo de Recordatorios', 'Atención Chat WhatsApp', 'Gestión de Morosos']
    };

    const newUser: SystemUser = {
      id: `usr-${Date.now()}`,
      fullName: formName,
      email: formEmail,
      phone: formPhone,
      role: formRole,
      roleLabel: roleLabels[formRole],
      status: 'activo',
      lastLogin: 'Recién registrado',
      permissions: rolePermissions[formRole],
    };

    setUsers(prev => [newUser, ...prev]);

    toast({
      type: 'success',
      title: 'Usuario Creado Exitosamente',
      message: `${formName} ahora puede acceder al sistema con el rol de ${roleLabels[formRole]}.`
    });

    setModalOpen(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('+591 ');
    setFormPassword('');
  };

  const handleToggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'activo' ? 'inactivo' : 'activo';
        toast({
          type: 'info',
          title: 'Estado de Usuario Actualizado',
          message: `${u.fullName} ahora se encuentra ${nextStatus.toUpperCase()}.`
        });
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <UserCog className="w-3.5 h-3.5" />
              Control de Accesos
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              {users.length} Usuarios Habilitados
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Gestión de Usuarios & Permisos del Sistema
          </h1>
          <p className="text-xs text-slate-500">
            Añada y administre al personal del Club Polanco con roles específicos (Administración, Caja, Portería y WhatsApp).
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Nuevo Usuario</span>
        </button>
      </div>

      {/* Role Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-400">Administradores</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {users.filter(u => u.role === 'admin').length}
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Acceso irrestricto</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-400">Operadores de Caja</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {users.filter(u => u.role === 'caja').length}
          </div>
          <div className="text-[11px] text-blue-700 font-semibold mt-0.5">Cobranza y recibos</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-400">Control de Acceso</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {users.filter(u => u.role === 'porteria').length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold mt-0.5">Verificación de carnets</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-bold uppercase text-slate-400">Operadores WhatsApp</div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {users.filter(u => u.role === 'cobranza').length}
          </div>
          <div className="text-[11px] text-purple-700 font-semibold mt-0.5">Gestión de mora</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar usuario por nombre, email o rol..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-600 font-medium"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Usuario / Correo</th>
                <th className="py-3 px-4">Teléfono de Contacto</th>
                <th className="py-3 px-4">Rol Asignado</th>
                <th className="py-3 px-4">Permisos Operativos</th>
                <th className="py-3 px-4">Último Ingreso</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{u.fullName}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{u.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700">
                    {u.phone}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                      u.role === 'admin' ? 'bg-slate-900 text-white' :
                      u.role === 'caja' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      u.role === 'porteria' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      <Shield className="w-3 h-3" />
                      {u.roleLabel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {u.permissions.map((p, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-500 font-mono">
                    {u.lastLogin}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                        u.status === 'activo'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'activo' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {u.status === 'activo' ? 'ACTIVO' : 'INACTIVO'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className="py-1 px-2.5 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      {u.status === 'activo' ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Crear Nuevo Usuario */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Añadir Usuario del Club</h3>
                  <p className="text-xs text-slate-300">Asignar credenciales y permisos operativos</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Correo Electrónico (Acceso al CRM)
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="ejemplo@clubpolanco.bo"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+591 70000000"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Rol en el Club Polanco
                </label>
                <select
                  value={formRole}
                  onChange={(e: any) => setFormRole(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-bold text-slate-800"
                >
                  <option value="admin">Administrador General (Acceso Total)</option>
                  <option value="caja">Encargada de Caja (Cobro de Cuotas y Recibos)</option>
                  <option value="porteria">Portería (Control de Ingreso y Carnets)</option>
                  <option value="cobranza">Operadora WhatsApp (Notificaciones y Mora)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contraseña Temporal
                </label>
                <input
                  type="password"
                  required
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Crear Usuario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
