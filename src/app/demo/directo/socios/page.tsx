"use client";

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Send,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  UserCheck,
  UserPlus,
  Sparkles,
  X
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { formatCurrency } from '@/lib/utils';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';

export default function DirectoSociosPage() {
  const { members, addMember, sendSingleWhatsApp } = useCRM();
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'al_dia' | 'por_vencer' | 'moroso'>('all');
  const [newMemberModalOpen, setNewMemberModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedMemberForPayment, setSelectedMemberForPayment] = useState<any>(null);

  // Form State for New Member
  const [formName, setFormName] = useState('');
  const [formCi, setFormCi] = useState('');
  const [formPhone, setFormPhone] = useState('+591 ');
  const [formCategory, setFormCategory] = useState('Deportes');
  const [formMembership, setFormMembership] = useState('Individual');
  const [formExpireDate, setFormExpireDate] = useState('2026-10-15');

  // Filter logic
  const filteredMembers = members.filter((m, idx) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase()) ||
      m.ci.includes(search);

    if (!matchesSearch) return false;

    // Simulate expiration status for demo
    const isExpiringSoon = idx % 7 === 0 && m.status !== 'moroso';
    if (filterStatus === 'por_vencer') return isExpiringSoon;
    if (filterStatus === 'al_dia') return m.status === 'activo' && !isExpiringSoon;
    if (filterStatus === 'moroso') return m.status === 'moroso';

    return true;
  });

  const handleSendWhatsApp = (m: any, isExpiring: boolean) => {
    let message = '';
    if (m.status === 'moroso') {
      message = `🏛️ Estimado(a) socio(a) ${m.fullName}: Su membresía en el Club Polanco registra cuotas vencidas por ${formatCurrency(m.balance || 250)}. Le solicitamos regularizar su pago para rehabilitar su acceso. Puede transferir a la cta BNB 1000-293819.`;
    } else if (isExpiring) {
      message = `🏛️ Estimado(a) socio(a) ${m.fullName}: Le recordamos cordialmente que su membresía del Club Polanco vence el 15 de Septiembre. Responda este mensaje si desea recibir su código QR de renovación.`;
    } else {
      message = `🏛️ Estimado(a) socio(a) ${m.fullName}: Le confirmamos que su membresía en el Club Polanco se encuentra AL DÍA y vigente. ¡Esperamos que disfrute de las instalaciones del Club este fin de semana!`;
    }

    sendSingleWhatsApp(m.id, message, m.phone);
    toast({
      type: 'success',
      title: 'WhatsApp Enviado al Socio',
      message: `Mensaje despachado a ${m.fullName} (${m.phone}).`
    });
  };

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formCi.trim()) {
      toast({ type: 'error', title: 'Campos requeridos', message: 'Nombre y CI son obligatorios.' });
      return;
    }

    addMember({
      fullName: formName,
      ci: formCi,
      phone: formPhone,
      email: `${formName.toLowerCase().replace(/\s+/g, '.')}@socio.clubpolanco.bo`,
      categoryId: 'cat-1',
      categoryName: formCategory,
      membershipId: 'mem-1',
      membershipName: formMembership,
      address: 'Av. Principal #1200',
    });

    // Send Welcome WhatsApp
    sendSingleWhatsApp(
      'new-member',
      `🏛️ ¡Bienvenido al Club Polanco, ${formName}! Su membresía (${formMembership}) ha sido registrada con éxito. Su fecha de vigencia es hasta el ${formExpireDate}. Puede consultar saldos o actividades escribiendo a este canal.`,
      formPhone
    );

    toast({
      type: 'success',
      title: 'Socio Registrado Exitosamente',
      message: `${formName} fue dado de alta y recibió su WhatsApp de bienvenida automático.`
    });

    setNewMemberModalOpen(false);
    setFormName('');
    setFormCi('');
    setFormPhone('+591 ');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              Padrón Centralizado
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300">
              {members.length} Socios Registrados
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Gestión de Socios & Fechas de Expiración
          </h1>
          <p className="text-xs text-slate-500">
            Control de vigencia, teléfonos oficiales de WhatsApp y disparo de recordatorios de membresía.
          </p>
        </div>

        <button
          onClick={() => setNewMemberModalOpen(true)}
          className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Socio</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar socio por nombre, código o CI..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:border-emerald-600 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({members.length})
          </button>
          <button
            onClick={() => setFilterStatus('al_dia')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
              filterStatus === 'al_dia'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            Vigentes / Al Día
          </button>
          <button
            onClick={() => setFilterStatus('por_vencer')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
              filterStatus === 'por_vencer'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            Por Expirar (7d)
          </button>
          <button
            onClick={() => setFilterStatus('moroso')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
              filterStatus === 'moroso'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            Vencidos ({members.filter(m => m.status === 'moroso').length})
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Código / Socio</th>
                <th className="py-3 px-4">Categoría & Membresía</th>
                <th className="py-3 px-4">Teléfono WhatsApp</th>
                <th className="py-3 px-4">Vigencia Membresía</th>
                <th className="py-3 px-4">Semáforo de Estado</th>
                <th className="py-3 px-4 text-right">Saldo</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredMembers.map((m, idx) => {
                const isExpiring = idx % 7 === 0 && m.status !== 'moroso';
                return (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{m.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {m.code} • CI: {m.ci}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{m.categoryName}</div>
                      <div className="text-[11px] text-slate-500">{m.membershipName}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-mono text-slate-800 font-semibold">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{m.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      {isExpiring ? '15 de Septiembre' : m.status === 'moroso' ? 'Expiró 10 de Agosto' : '15 de Octubre'}
                    </td>
                    <td className="py-3.5 px-4">
                      {m.status === 'moroso' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          VENCIDO
                        </span>
                      ) : isExpiring ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          VENCE EN 5 DÍAS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          AL DÍA (VIGENTE)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold">
                      {m.balance > 0 ? (
                        <span className="text-rose-700">{formatCurrency(m.balance)}</span>
                      ) : (
                        <span className="text-emerald-700">Bs 0</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleSendWhatsApp(m, isExpiring)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                          title="Disparar recordatorio por WhatsApp"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMemberForPayment(m);
                            setPaymentModalOpen(true);
                          }}
                          className="py-1 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors"
                          title="Registrar cobro y renovar vigencia"
                        >
                          Renovar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Registrar Nuevo Socio */}
      {newMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Registrar Nuevo Socio</h3>
                  <p className="text-xs text-slate-300">Club Polanco — Alta y vinculación de WhatsApp</p>
                </div>
              </div>
              <button
                onClick={() => setNewMemberModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ej. Stanislaw Nowak"
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    C.I. / Documento
                  </label>
                  <input
                    type="text"
                    required
                    value={formCi}
                    onChange={(e) => setFormCi(e.target.value)}
                    placeholder="Ej. 4819203"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Teléfono WhatsApp
                  </label>
                  <input
                    type="text"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+591 70123456"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Categoría
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-medium"
                  >
                    <option>Deportes (Tenis / Fútbol)</option>
                    <option>Recreación & Social</option>
                    <option>General Institucional</option>
                    <option>Vitalicio / Honorario</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tipo de Membresía
                  </label>
                  <select
                    value={formMembership}
                    onChange={(e) => setFormMembership(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-medium"
                  >
                    <option>Individual (Bs 250/mes)</option>
                    <option>Familiar (Bs 450/mes)</option>
                    <option>Juvenil (Bs 180/mes)</option>
                    <option>Senior (Bs 150/mes)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Fecha Inicial de Expiración
                </label>
                <input
                  type="date"
                  value={formExpireDate}
                  onChange={(e) => setFormExpireDate(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-emerald-600 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  El sistema disparará recordatorios de WhatsApp 5 días antes de esta fecha.
                </p>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setNewMemberModalOpen(false)}
                  className="flex-1 py-3 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guardar y Enviar Bienvenida</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Payment Modal */}
      <ManualPaymentModal
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setSelectedMemberForPayment(null);
        }}
        defaultMember={selectedMemberForPayment}
      />

    </div>
  );
}
