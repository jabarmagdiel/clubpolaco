"use client";

import React, { useState } from 'react';
import { Zap, Code2, RefreshCw, Send, CheckCircle2, Play, Eye, X } from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { WebhookEvent } from '@/types/crm';

export default function CompletoWebhooksPage() {
  const { webhooks, simulateWebhookEvent } = useCRM();
  const { toast } = useToast();

  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  const [selectedEventType, setSelectedEventType] = useState<WebhookEvent['event']>('payment.approved');

  const handleSimulateWebhook = () => {
    const txId = `TX-BNB-${Math.floor(1000000 + Math.random() * 9000000)}`;
    simulateWebhookEvent(selectedEventType, txId);
    toast({
      type: 'success',
      title: 'Webhook Simulado con Éxito',
      message: `Evento "${selectedEventType}" recibido e interpretado con idempotencia.`,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              Event-Driven Architecture
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-amber-300">
              Plan Completo
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Consola de Webhooks Bancarios</h1>
          <p className="text-xs text-slate-500">
            Monitor en tiempo real de notificaciones HTTP enviadas por bancos y pasarelas de pago con validación HMAC.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedEventType}
            onChange={(e) => setSelectedEventType(e.target.value as any)}
            className="py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white font-bold text-slate-800"
          >
            <option value="payment.created">payment.created</option>
            <option value="payment.pending">payment.pending</option>
            <option value="payment.processing">payment.processing</option>
            <option value="payment.approved">payment.approved</option>
            <option value="payment.failed">payment.failed</option>
            <option value="payment.refunded">payment.refunded</option>
          </select>

          <button
            onClick={handleSimulateWebhook}
            className="flex items-center gap-1.5 py-2 px-4 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-2xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simular Recepción de Webhook</span>
          </button>
        </div>
      </div>

      {/* Webhook Endpoint Info */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold font-mono">
            POST
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Endpoint Activo en Servidor</span>
            <span className="font-mono text-emerald-400 text-sm">https://demo.clubpolanco.bo/api/webhooks/payments</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-300">
          <span>HMAC-SHA256: Habilitado</span>
          <span>•</span>
          <span>Idempotencia: Activa</span>
        </div>
      </div>

      {/* Webhooks Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-800 uppercase tracking-wider text-[11px] flex justify-between items-center">
          <span>Registro de Notificaciones Recibidas</span>
          <span className="text-slate-500">{webhooks.length} eventos registrados</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Event ID</th>
                <th className="py-2.5 px-4">Transaction ID</th>
                <th className="py-2.5 px-4">Tipo de Evento</th>
                <th className="py-2.5 px-4">Fecha y Hora</th>
                <th className="py-2.5 px-4 text-center">Estado Procesamiento</th>
                <th className="py-2.5 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {webhooks.map((wh) => (
                <tr key={wh.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-800">{wh.id}</td>
                  <td className="py-2.5 px-4 text-purple-700 font-bold">{wh.transactionId}</td>
                  <td className="py-2.5 px-4 font-sans font-bold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      wh.event === 'payment.approved' ? 'bg-emerald-100 text-emerald-800' :
                      wh.event === 'payment.failed' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {wh.event}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-500">{wh.receivedAt}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ {wh.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedEvent(wh)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[10px] inline-flex items-center gap-1 font-sans transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Ver JSON</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Payload Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-slate-800 text-white animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-400" />
                <h3 className="font-mono font-bold text-sm text-purple-300">
                  Payload JSON: {selectedEvent.event} ({selectedEvent.transactionId})
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400 max-h-96">
              <pre>{JSON.stringify(selectedEvent.payload, null, 2)}</pre>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="py-1.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs"
              >
                Cerrar Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
