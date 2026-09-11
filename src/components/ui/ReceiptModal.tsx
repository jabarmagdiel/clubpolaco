"use client";

import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Receipt } from '@/types/crm';
import { formatCurrency, formatDate } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';

interface ReceiptModalProps {
  receipt: Receipt | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `================================================
RECIBO OFICIAL DE PAGO — CLUB POLACO LA PAZ
================================================
Número de Recibo: ${receipt.number}
Fecha de Emisión: ${receipt.date}
Socio: ${receipt.memberName} (Código: ${receipt.memberCode})
Documento / CI: ${receipt.memberCi}
------------------------------------------------
Concepto: ${receipt.concept}
Método de Pago: ${receipt.method.toUpperCase()}
Monto Total: ${formatCurrency(receipt.amount)}
------------------------------------------------
Emitido por: ${receipt.generatedBy}
Estado: VALIDAD Y ACREDITADO
Club Polaco — Sopocachi, La Paz, Bolivia
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${receipt.number}_club_polaco.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        
        {/* Modal Actions Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Recibo Electrónico Oficial
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-polaco-600 rounded-lg hover:bg-polaco-700 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Layout */}
        <div id="printable-receipt" className="p-8 bg-white text-slate-900">
          
          {/* Header of Receipt */}
          <div className="flex items-start justify-between border-b-2 border-slate-800 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-polaco-700 text-white font-black text-xl flex items-center justify-center shadow-md">
                CP
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">CLUB POLACO</h2>
                <p className="text-xs text-slate-500">Asociación Civil y Recreativa • Sopocachi, La Paz</p>
                <p className="text-[10px] text-slate-400 font-mono">NIT: 1028391024 • Personería Jurídica Nº 1948</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-polaco-700 uppercase bg-polaco-50 border border-polaco-200 px-2 py-0.5 rounded">
                RECIBO OFICIAL
              </span>
              <div className="text-lg font-black font-mono text-slate-900 mt-1">
                {receipt.number}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Fecha: {receipt.date}
              </div>
            </div>
          </div>

          {/* Member Details */}
          <div className="grid grid-cols-2 gap-4 py-5 border-b border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block uppercase font-bold text-[10px]">Recibido de:</span>
              <span className="font-bold text-sm text-slate-900">{receipt.memberName}</span>
              <span className="text-slate-500 block">CI: {receipt.memberCi}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block uppercase font-bold text-[10px]">Código de Socio:</span>
              <span className="font-bold text-sm text-slate-900">{receipt.memberCode}</span>
              <span className="text-slate-500 block capitalize">Método: {receipt.method.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Concept Line Item Table */}
          <div className="py-4">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500 text-[10px] uppercase font-bold text-left">
                  <th className="py-2">Descripción del Concepto</th>
                  <th className="py-2 text-right">Importe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3">
                    <p className="font-bold text-slate-800">{receipt.concept}</p>
                    <p className="text-[11px] text-slate-500">Membresía institucional Club Polaco - Gestión 2026</p>
                  </td>
                  <td className="py-3 text-right font-mono font-bold text-sm text-slate-900">
                    {formatCurrency(receipt.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Box */}
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 uppercase font-bold block">Total Cancelado</span>
              <span className="text-[11px] text-slate-400">Expresado en moneda nacional (Bolivianos)</span>
            </div>
            <div className="text-2xl font-black text-polaco-700 font-mono">
              {formatCurrency(receipt.amount)}
            </div>
          </div>

          {/* Signatures & Security Stamp */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QRCodeSVG
                value={`https://demo.clubpolaco.bo/verify/receipt/${receipt.number}`}
                size={54}
                level="M"
              />
              <div className="text-[10px] text-slate-400 max-w-[200px] leading-tight">
                Comprobante electrónico verificado con firma digital interna. Escanee para auditar.
              </div>
            </div>

            <div className="text-center">
              <div className="w-36 border-b border-slate-400 pb-1 mb-1 font-signature text-xs text-slate-600">
                Administración
              </div>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider block">
                Firma y Sello Club Polaco
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex items-center justify-between text-xs text-slate-500">
          <span>Emitido en MODO DEMOSTRACIÓN</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
