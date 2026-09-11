"use client";

import React, { useState } from 'react';
import { Building2, Download, FileSpreadsheet, Lock, ArrowUpRight, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';
import * as XLSX from 'xlsx';
import Link from 'next/link';

export default function EstandarContabilidadPage() {
  const { payments } = useCRM();
  const { toast } = useToast();
  const [techSpecModalOpen, setTechSpecModalOpen] = useState(false);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["NroRecibo,Fecha,Socio,CI,Metodo,Importe,CuentaDebe,CuentaHaber,Referencia"]
      .concat(payments.map(p => `${p.receiptNumber},${p.date},"${p.memberName}",${p.memberCi},${p.method},${p.amount},1101-CAJA-BANCOS,4101-CUOTAS-SOCIOS,${p.reference}`))
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Asientos_Cobranza_Club_Polaco.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({ type: 'success', title: 'Exportación Exitosa', message: 'Archivo CSV descargado para importación en sistema contable.' });
  };

  const handleExportExcel = () => {
    const data = payments.map(p => ({
      Comprobante: p.receiptNumber,
      Fecha: p.date,
      Socio: p.memberName,
      CI: p.memberCi,
      Importe: p.amount,
      CuentaContableIngreso: '4.1.01.01 (Ingresos Cuotas Ordinarias)',
      CuentaContableCaja: p.method === 'efectivo' ? '1.1.01.01 (Caja Chica)' : '1.1.02.01 (Banco BNB)',
      ReferenciaBancaria: p.reference,
      EstadoIntegracion: 'Pendiente de carga',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AsientosContables');
    XLSX.writeFile(wb, 'Exportacion_Contable_Club_Polaco.xlsx');

    toast({ type: 'success', title: 'Excel Contable Generado', message: 'Formato estándar contable listo para el auditor.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Módulo de Enlace</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-300">
              Plan Estándar
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Integración Contable Preparada</h1>
          <p className="text-xs text-slate-500">
            Estructuración de datos contables para exportación a Excel, CSV o enlace futuro por API.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTechSpecModalOpen(true)}
            className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
          >
            <Code2 className="w-4 h-4" />
            <span>Ver Configuración de Integración</span>
          </button>
        </div>
      </div>

      {/* Commercial Banner Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-polaco-50 text-polaco-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sistema Preparado para Integración Futura
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                La arquitectura del software cuenta con los campos contables estandarizados (cuentas de debe/haber, centros de costo y referencias fiscales).
              </p>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
            Pendiente de Enlace API
          </span>
        </div>

        {/* Upgrade alert for automatic sync */}
        <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Sincronización Automática en Tiempo Real:</strong> Disponible en el <strong>Plan Completo</strong> con conector API REST directo al software contable.
            </span>
          </div>
          <Link
            href="/demo/completo/integraciones/contabilidad"
            className="shrink-0 py-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold transition-colors flex items-center gap-1"
          >
            <span>Ver Modo API Completo</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Transactions ready for accounting export */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Transacciones Disponibles para Exportación Contable
            </span>
            <p className="text-[11px] text-slate-500">{payments.length} cobranzas listas para asentar en el Libro Diario</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="py-1.5 px-3 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-bold text-slate-700 transition-colors flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors flex items-center gap-1 shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Exportar Excel Contable</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Comprobante</th>
                <th className="py-2.5 px-4">Fecha</th>
                <th className="py-2.5 px-4">Socio Titular</th>
                <th className="py-2.5 px-4">Cuenta Débito (Caja/Banco)</th>
                <th className="py-2.5 px-4">Cuenta Crédito (Ingresos)</th>
                <th className="py-2.5 px-4 text-right">Importe</th>
                <th className="py-2.5 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{p.receiptNumber}</td>
                  <td className="py-2.5 px-4 text-slate-500">{p.date}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-900">{p.memberName}</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">1101-CAJA-BANCOS</td>
                  <td className="py-2.5 px-4 font-mono text-slate-600">4101-CUOTAS-SOCIOS</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      Pendiente Exportación
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tech Spec Modal */}
      {techSpecModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 text-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Especificación Técnica de Integración</h3>
            <p className="text-slate-600 leading-relaxed">
              El sistema genera esquemas normalizados para importar en software contable:
            </p>
            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto space-y-1">
              <div>// JSON Payload estándar para Contabilidad:</div>
              <div>{`{`}</div>
              <div className="pl-4">"journal_entry": "ING-2026-09",</div>
              <div className="pl-4">"concept": "Cobranza Cuotas Ordinarias",</div>
              <div className="pl-4">"debit_account": "1.1.02.01", // Banco BNB</div>
              <div className="pl-4">"credit_account": "4.1.01.01", // Ingreso Membresías</div>
              <div className="pl-4">"currency": "BOB",</div>
              <div className="pl-4">"batch_date": "2026-09-10"</div>
              <div>{`}`}</div>
            </div>
            <button
              onClick={() => setTechSpecModalOpen(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
