"use client";

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  DollarSign,
  Download,
  CheckCircle2,
  AlertTriangle,
  X
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Member } from '@/types/crm';
import { MemberDetailModal } from '@/components/crm/MemberDetailModal';
import { ManualPaymentModal } from '@/components/crm/ManualPaymentModal';
import { useToast } from '@/lib/toast';

export default function EconomicoSociosPage() {
  const { members, categories, memberships, addMember, updateMember } = useCRM();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);
  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCi, setFormCi] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCategory, setFormCategory] = useState('cat-1');
  const [formMembership, setFormMembership] = useState('mem-1');
  const [formAddress, setFormAddress] = useState('');

  // Filtered members
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.ci.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter ? m.categoryId === categoryFilter : true;
    const matchesStatus = statusFilter ? m.status === statusFilter : true;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    const catObj = categories.find((c) => c.id === formCategory);
    const memObj = memberships.find((m) => m.id === formMembership);

    addMember({
      fullName: formName,
      ci: formCi || '5000000 LP',
      phone: formPhone || '+591 70000000',
      email: formEmail || `${formName.toLowerCase().replace(/\s+/g, '.')}@clubpolaco.bo`,
      categoryId: formCategory,
      categoryName: catObj?.name || 'Deportes',
      membershipId: formMembership,
      membershipName: memObj?.name || 'Individual',
      address: formAddress || 'La Paz, Bolivia',
    });

    toast({
      type: 'success',
      title: 'Socio Registrado',
      message: `${formName} fue incorporado exitosamente al padrón.`,
    });

    setIsNewMemberModalOpen(false);
    setFormName('');
    setFormCi('');
    setFormPhone('');
    setFormEmail('');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    updateMember(editingMember.id, {
      fullName: formName,
      ci: formCi,
      phone: formPhone,
      email: formEmail,
      address: formAddress,
    });

    toast({
      type: 'success',
      title: 'Socio Actualizado',
      message: 'Los datos personales fueron actualizados correctamente.',
    });

    setEditingMember(null);
  };

  const openEdit = (m: Member) => {
    setEditingMember(m);
    setFormName(m.fullName);
    setFormCi(m.ci);
    setFormPhone(m.phone);
    setFormEmail(m.email);
    setFormAddress(m.address);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Padrón de Socios
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
              {members.length} Socios en Base
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Gestión de Socios del Club Polaco
          </h1>
          <p className="text-xs text-slate-500">
            Administración del registro de socios, membresías y estados de cuenta en Plan Económico.
          </p>
        </div>

        <button
          onClick={() => {
            setFormName('');
            setFormCi('');
            setFormPhone('');
            setFormEmail('');
            setFormAddress('');
            setIsNewMemberModalOpen(true);
          }}
          className="flex items-center gap-1.5 py-2.5 px-4 text-xs font-bold rounded-xl bg-polaco-600 hover:bg-polaco-700 text-white shadow-2xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Socio</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between text-xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, código o CI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600 focus:border-polaco-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 outline-hidden focus:ring-2 focus:ring-polaco-600"
          >
            <option value="">Todas las Categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-700 outline-hidden focus:ring-2 focus:ring-polaco-600"
          >
            <option value="">Todos los Estados</option>
            <option value="activo">Al Día (Activo)</option>
            <option value="moroso">Con Mora (Moroso)</option>
          </select>

          {(searchTerm || categoryFilter || statusFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setStatusFilter('');
              }}
              className="p-2 text-slate-400 hover:text-slate-700 transition-colors"
              title="Limpiar filtros"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Nombre y Apellidos</th>
                <th className="py-3 px-4">Documento (CI)</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Membresía</th>
                <th className="py-3 px-4">Teléfono</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Saldo Pendiente</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">
                    {m.code}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedMember(m)}
                      className="font-bold text-slate-900 hover:text-polaco-600 hover:underline text-left"
                    >
                      {m.fullName}
                    </button>
                    <span className="block text-[11px] text-slate-400">{m.email}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    {m.ci}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {m.categoryName}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {m.membershipName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    {m.phone}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        m.status === 'activo'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {m.status === 'activo' ? 'Al Día' : 'Moroso'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold">
                    <span className={m.balance > 0 ? 'text-rose-600' : 'text-slate-400'}>
                      {formatCurrency(m.balance)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                        title="Ver detalle del socio"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(m)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded"
                        title="Editar datos personales"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {m.balance > 0 && (
                        <button
                          onClick={() => setPaymentMember(m)}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[11px] font-bold border border-emerald-200 transition-colors"
                          title="Cobro rápido"
                        >
                          Cobrar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-xs">
            No se encontraron socios que coincidan con los criterios de búsqueda.
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      <MemberDetailModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        plan="economico"
        onOpenPaymentModal={(m) => setPaymentMember(m)}
      />

      {/* Manual Payment Modal */}
      <ManualPaymentModal
        isOpen={!!paymentMember}
        onClose={() => setPaymentMember(null)}
        defaultMember={paymentMember}
      />

      {/* New Member Modal */}
      {isNewMemberModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Registrar Nuevo Socio</h3>
              <button onClick={() => setIsNewMemberModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Jan Kowalski"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">C.I. / Documento</label>
                  <input
                    type="text"
                    placeholder="Ej: 4820100 LP"
                    value={formCi}
                    onChange={(e) => setFormCi(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    placeholder="Ej: +591 70500000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="socio@clubpolaco.bo"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo de Membresía</label>
                  <select
                    value={formMembership}
                    onChange={(e) => setFormMembership(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-800 outline-hidden focus:ring-2 focus:ring-polaco-600"
                  >
                    {memberships.map((m) => (
                      <option key={m.id} value={m.id}>{m.name} ({formatCurrency(m.monthlyFee)}/mes)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dirección Domiciliaria</label>
                <input
                  type="text"
                  placeholder="Ej: Av. 6 de Agosto #1200, Sopocachi"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewMemberModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-polaco-600 hover:bg-polaco-700 text-white font-bold shadow-xs"
                >
                  Guardar Socio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Editar Socio ({editingMember.code})</h3>
              <button onClick={() => setEditingMember(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSave} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Documento (CI)</label>
                  <input
                    type="text"
                    value={formCi}
                    onChange={(e) => setFormCi(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-slate-900 outline-hidden focus:ring-2 focus:ring-polaco-600"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-polaco-600 hover:bg-polaco-700 text-white font-bold shadow-xs"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
