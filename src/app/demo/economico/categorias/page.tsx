"use client";

import React, { useState } from 'react';
import { Tags, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

export default function EconomicoCategoriasPage() {
  const { categories, members } = useCRM();
  const { toast } = useToast();

  const [categoryList, setCategoryList] = useState(categories);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      description: newCatDesc || 'Actividades y acceso general',
      active: true,
      memberCount: 0,
    };

    setCategoryList([...categoryList, newCat]);
    setNewCatName('');
    setNewCatDesc('');
    toast({ type: 'success', title: 'Categoría Creada', message: `Categoría "${newCatName}" agregada.` });
  };

  const toggleCategory = (id: string) => {
    setCategoryList(categoryList.map(c => c.id === id ? { ...c, active: !c.active } : c));
    toast({ type: 'info', title: 'Estado modificado', message: 'La categoría fue actualizada.' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Configuración CRM</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Plan Económico</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Categorías de Socios</h1>
        <p className="text-xs text-slate-500">Estructuración interna de actividades del Club Polanco (Deportes, Recreación, etc.).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 uppercase tracking-wider">
            Categorías Activas en el Club
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {categoryList.map((cat) => {
              const count = members.filter(m => m.categoryId === cat.id).length;
              return (
                <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${cat.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                        {cat.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">{cat.description}</p>
                    <span className="text-[11px] text-polaco-700 font-semibold mt-1 inline-block">
                      {count} socios registrados
                    </span>
                  </div>

                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="text-xs font-semibold px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700"
                  >
                    {cat.active ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add New Category */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs h-fit text-xs">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Crear Nueva Categoría</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre de la Categoría</label>
              <input
                type="text"
                required
                placeholder="Ej: Tenis & Raqueta"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg outline-hidden focus:ring-2 focus:ring-polaco-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Descripción / Alcance</label>
              <textarea
                rows={3}
                placeholder="Detalle de beneficios de esta categoría..."
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg outline-hidden focus:ring-2 focus:ring-polaco-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-polaco-600 hover:bg-polaco-700 text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Guardar Categoría</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
