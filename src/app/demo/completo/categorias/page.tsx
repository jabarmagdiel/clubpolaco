"use client";

import React, { useState } from 'react';
import { Tags, Plus, CheckCircle2, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

export default function CompletoCategoriasPage() {
  const { categories, members } = useCRM();
  const { toast } = useToast();
  const [list, setList] = useState(categories);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const newC = { id: `cat-${Date.now()}`, name, description: desc || 'Acceso general', active: true, memberCount: 0 };
    setList([...list, newC]);
    setName('');
    setDesc('');
    toast({ type: 'success', title: 'Categoría Creada', message: `Categoría "${name}" agregada.` });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Estructuración Institucional
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">Plan Completo</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mt-1">Categorías de Socios</h1>
        <p className="text-xs text-slate-500">Manejo de comisiones, deportes, cultura y estatus honorario en el Club Polanco.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider">
            Categorías Activas
          </div>
          <div className="divide-y divide-slate-100">
            {list.map((cat) => {
              const count = members.filter(m => m.categoryId === cat.id).length;
              return (
                <div key={cat.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                    <p className="text-slate-500 mt-0.5">{cat.description}</p>
                    <span className="text-[11px] text-amber-800 font-semibold mt-1 inline-block">{count} socios suscritos</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Activa</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs h-fit text-xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm">Nueva Categoría</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nombre</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" placeholder="Ej: Comité Cultural Polanco" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Descripción</label>
              <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg" placeholder="Beneficios..." />
            </div>
            <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg transition-colors">Guardar Categoría</button>
          </form>
        </div>
      </div>
    </div>
  );
}
