"use client";

import React, { useState } from 'react';
import {
  Building2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Code2,
  Sparkles,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { useToast } from '@/lib/toast';

export default function CompletoContabilidadApiPage() {
  const { payments, accountingSyncs, syncAccounting } = useCRM();
  const { toast } = useToast();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState<string | null>(null);
  const [selectedPayload, setSelectedPayload] = useState<any | null>(null);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncSuccessMsg(null);
    toast({
      type: 'info',
      title: 'Conectando con API Contable',
      message: 'Transmitiendo lotes de cobro mediante token Bearer...',
    });

    setTimeout(async () => {
      const count = await syncAccounting();
      setIsSyncing(false);
      setSyncSuccessMsg(`${count} transacciones sincronizadas correctamente con el sistema contable ERP Siigo.`);
      toast({
        type: 'success',
        title: '¡Sincronización Exitosa!',
        message: `${count} asientos asentados en el Libro Auxiliar de Ingresos.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              Conector API REST ERP
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">
            Sincronización Contable en Tiempo Real
          </h1>
          <p className="text-xs text-slate-500">
            Conexión bidireccional mediante API para contabilización instantánea de cobranzas y recibos oficiales.
          </p>
        </div>

        <button
          onClick={handleSyncNow}
          disabled={isSyncing}
          className={`flex items-center gap-2 py-2.5 px-5 text-xs font-bold rounded-xl transition-all shadow-md ${
            isSyncing
              ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Sincronizando con ERP...' : 'Sincronizar Ahora'}</span>
        </button>
      </div>

      {/* Sync Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">Estado de Enlace API</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-base font-black text-slate-900">CONECTADO</span>
          </div>
          <span className="text-[11px] text-slate-400">Siigo / ERP Cloud</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">Última Sincronización</span>
          <div className="text-base font-black text-slate-900 mt-1">Hace 2 minutos</div>
          <span className="text-[11px] text-emerald-700 font-semibold">Respuesta HTTP 200 OK</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">Asientos Sincronizados</span>
          <div className="text-base font-black text-slate-900 mt-1 font-mono">173 asientos</div>
          <span className="text-[11px] text-slate-400">En gestión activa</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-slate-400 font-bold uppercase text-[10px] block">Pendientes en Cola</span>
          <div className="text-base font-black text-emerald-600 mt-1 font-mono">0 pendientes</div>
          <span className="text-[11px] text-slate-400">Cola vacía y al día</span>
        </div>

      </div>

      {/* Success Notification Bar */}
      {syncSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-bold">{syncSuccessMsg}</span>
        </div>
      )}

      {/* Table: Pagos y su estado de Asiento Contable */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-800 text-[11px] uppercase tracking-wider">
          <span>Libro de Cobranzas vs Asientos Contables</span>
          <span className="text-slate-500 font-normal lowercase">API REST Bearer Auth</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Comprobante</th>
                <th className="py-2.5 px-4">Socio Titular</th>
                <th className="py-2.5 px-4 text-right">Importe</th>
                <th className="py-2.5 px-4">Fecha Pago</th>
                <th className="py-2.5 px-4 text-center">Estado CRM</th>
                <th className="py-2.5 px-4 text-center">Estado Contable</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{p.receiptNumber}</td>
                  <td className="py-3 px-4 font-sans font-semibold text-slate-800">{p.memberName}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{formatCurrency(p.amount)}</td>
                  <td className="py-3 px-4 text-slate-500 font-sans">{p.date}</td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Liquidado
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      ✓ Sincronizado
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedPayload({
                        asiento_id: `AST-${p.receiptNumber.substring(4)}`,
                        fecha_contable: p.date,
                        glosa: `Cobro cuota ordinaria socio ${p.memberName}`,
                        cuenta_debe: p.method === 'efectivo' ? '1.1.01.01' : '1.1.02.01',
                        cuenta_haber: '4.1.01.01',
                        monto: p.amount,
                        moneda: 'BOB',
                        metodo_origen: p.method,
                        referencia_bancaria: p.reference,
                        estado: 'ASENTADO_EN_LIBRO_DIARIO'
                      })}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] inline-flex items-center gap-1 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Ver Payload</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Payload Modal */}
      {selectedPayload && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-800 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-mono font-bold text-sm text-emerald-300">
                  Payload de Asiento Contable API
                </h3>
              </div>
              <button onClick={() => setSelectedPayload(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400 max-h-80">
              <pre>{JSON.stringify(selectedPayload, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPayload(null)}
                className="py-1.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
