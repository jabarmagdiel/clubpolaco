"use client";

import React, { useState } from 'react';
import { UploadCloud, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Table, RefreshCw } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';

interface PreviewRow {
  rowNum: number;
  nombre: string;
  ci: string;
  telefono: string;
  categoria: string;
  membresia: string;
  duplicado: boolean;
}

const SAMPLE_PREVIEW: PreviewRow[] = [
  { rowNum: 1, nombre: 'Jan Kowalski', ci: '4820100 LP', telefono: '+591 70500000', categoria: 'Deportes', membresia: 'Individual', duplicado: true },
  { rowNum: 2, nombre: 'Stanisław Lem', ci: '5912401 LP', telefono: '+591 71239841', categoria: 'Entretenimiento', membresia: 'Familiar', duplicado: false },
  { rowNum: 3, nombre: 'Wanda Rutkiewicz', ci: '6129840 LP', telefono: '+591 72948102', categoria: 'Deportes', membresia: 'Individual', duplicado: false },
  { rowNum: 4, nombre: 'Jerzy Kukuczka', ci: '5819204 LP', telefono: '+591 73819204', categoria: 'Deportes', membresia: 'Senior', duplicado: false },
  { rowNum: 5, nombre: 'Carlos Zielinski', ci: '4820374 LP', telefono: '+591 70500422', categoria: 'Deportes', membresia: 'Individual', duplicado: true },
];

export default function EstandarImportacionesPage() {
  const { addMember } = useCRM();
  const { toast } = useToast();

  const [hasFile, setHasFile] = useState(true);
  const [colNombre, setColNombre] = useState('Columna A (Nombre y Apellido)');
  const [colCi, setColCi] = useState('Columna B (Cédula de Identidad)');
  const [colTelefono, setColTelefono] = useState('Columna C (Teléfono Celular)');
  const [colCategoria, setColCategoria] = useState('Columna D (Disciplina)');
  const [isImported, setIsImported] = useState(false);

  const handleConfirmImport = () => {
    // Add non-duplicate rows
    const validRows = SAMPLE_PREVIEW.filter(r => !r.duplicado);
    validRows.forEach(row => {
      addMember({
        fullName: row.nombre,
        ci: row.ci,
        phone: row.telefono,
        categoryName: row.categoria,
        membershipName: row.membresia,
      });
    });

    setIsImported(true);
    toast({
      type: 'success',
      title: 'Importación Completada',
      message: `Se importaron ${validRows.length} socios nuevos. 2 duplicados fueron omitidos.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Gestión Masiva de Datos</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Importador Inteligente de Excel</h1>
          <p className="text-xs text-slate-500">Mapeo dinámico de columnas, detección de socios duplicados y carga validada.</p>
        </div>
      </div>

      {/* Step 1: Upload / File status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            <span>Archivo en Proceso: <strong>Padron_Nuevos_Socios_2026.xlsx</strong> (5 registros detectados)</span>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Columnas Auto-detectadas
          </span>
        </div>

        {/* Column Mapping Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Campo: Nombre Completo</label>
            <select value={colNombre} onChange={(e) => setColNombre(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg">
              <option>Columna A (Nombre y Apellido)</option>
              <option>Columna B (Socio)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Campo: Documento CI</label>
            <select value={colCi} onChange={(e) => setColCi(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg">
              <option>Columna B (Cédula de Identidad)</option>
              <option>Columna C (Documento)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Campo: Teléfono WhatsApp</label>
            <select value={colTelefono} onChange={(e) => setColTelefono(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg">
              <option>Columna C (Teléfono Celular)</option>
              <option>Columna D (Móvil)</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Campo: Categoría</label>
            <select value={colCategoria} onChange={(e) => setColCategoria(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg">
              <option>Columna D (Disciplina)</option>
              <option>Columna E (Categoría)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Live Preview & Duplicate Detection */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Vista Previa de Filas</span>
            <span className="text-slate-500">| Detección de duplicados en padrón actual</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3 Nuevos
            </span>
            <span className="text-[11px] text-rose-700 font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> 2 Duplicados
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4 w-12">Fila</th>
                <th className="py-2.5 px-4">Nombre en Archivo</th>
                <th className="py-2.5 px-4">Documento</th>
                <th className="py-2.5 px-4">Teléfono</th>
                <th className="py-2.5 px-4">Categoría Asignada</th>
                <th className="py-2.5 px-4 text-center">Estado Validación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_PREVIEW.map((row) => (
                <tr key={row.rowNum} className={row.duplicado ? 'bg-rose-50/40' : 'hover:bg-slate-50'}>
                  <td className="py-2.5 px-4 font-mono text-slate-400 font-bold">#{row.rowNum}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{row.nombre}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{row.ci}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">{row.telefono}</td>
                  <td className="py-2.5 px-4 text-slate-700">{row.categoria}</td>
                  <td className="py-2.5 px-4 text-center">
                    {row.duplicado ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] bg-rose-100 text-rose-800">
                        <AlertTriangle className="w-3 h-3" /> Ya existe en CRM
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-3 h-3" /> Válido para alta
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-slate-500">
            Al confirmar, solo se incorporarán los 3 registros válidos, protegiendo la integridad del padrón.
          </span>
          <button
            onClick={handleConfirmImport}
            disabled={isImported}
            className={`py-2 px-5 rounded-xl font-bold transition-all shadow-xs flex items-center gap-2 ${
              isImported
                ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                : 'bg-polaco-600 hover:bg-polaco-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isImported ? 'Importación Realizada' : 'Confirmar Importación de 3 Socios'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
