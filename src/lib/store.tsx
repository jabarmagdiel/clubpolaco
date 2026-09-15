"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Member,
  Category,
  MembershipType,
  Quota,
  Payment,
  Receipt,
  WhatsAppTemplate,
  WhatsAppMessage,
  AutomationRule,
  AuditLog,
  WebhookEvent,
  ReconciliationRecord,
  AccountingSyncLog,
  PaymentMethod
} from '@/types/crm';
import {
  INITIAL_MEMBERS,
  INITIAL_CATEGORIES,
  INITIAL_MEMBERSHIPS,
  INITIAL_QUOTAS,
  INITIAL_PAYMENTS,
  INITIAL_RECEIPTS,
  INITIAL_WHATSAPP_TEMPLATES,
  INITIAL_WHATSAPP_MESSAGES,
  INITIAL_AUTOMATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_WEBHOOKS,
  INITIAL_RECONCILIATION,
  INITIAL_ACCOUNTING_SYNCS
} from './mock-data';

interface CRMContextType {
  members: Member[];
  categories: Category[];
  memberships: MembershipType[];
  quotas: Quota[];
  payments: Payment[];
  receipts: Receipt[];
  whatsappTemplates: WhatsAppTemplate[];
  whatsappMessages: WhatsAppMessage[];
  automations: AutomationRule[];
  auditLogs: AuditLog[];
  webhooks: WebhookEvent[];
  reconciliations: ReconciliationRecord[];
  accountingSyncs: AccountingSyncLog[];
  
  // Actions
  registerManualPayment: (data: {
    memberId: string;
    quotaId?: string;
    amount: number;
    method: PaymentMethod;
    reference: string;
    notes?: string;
  }) => Payment;
  simulateQrPayment: (memberId: string, quotaId?: string, amount?: number) => Promise<Payment>;
  simulateCardPayment: (data: {
    memberId: string;
    quotaId?: string;
    amount: number;
    cardHolder: string;
    cardNumber: string;
  }) => Promise<Payment>;
  simulateWebhookEvent: (event: WebhookEvent['event'], txId: string) => void;
  syncAccounting: () => Promise<number>;
  sendBulkWhatsAppReminders: (memberIds: string[]) => void;
  sendSingleWhatsApp: (memberId: string, templateId: string, customText?: string) => void;
  toggleAutomation: (id: string) => void;
  reconcileRecord: (id: string) => void;
  reconcileAllPending: () => void;
  addMember: (data: Partial<Member>) => void;
  updateMember: (id: string, data: Partial<Member>) => void;
  generateBulkQuotas: (period: string, dueDate: string) => number;
  resetAllDemoData: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const STORAGE_KEY = 'cp_crm_demo_data_v1';

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [memberships, setMemberships] = useState<MembershipType[]>(INITIAL_MEMBERSHIPS);
  const [quotas, setQuotas] = useState<Quota[]>(INITIAL_QUOTAS);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [receipts, setReceipts] = useState<Receipt[]>(INITIAL_RECEIPTS);
  const [whatsappTemplates] = useState<WhatsAppTemplate[]>(INITIAL_WHATSAPP_TEMPLATES);
  const [whatsappMessages, setWhatsappMessages] = useState<WhatsAppMessage[]>(INITIAL_WHATSAPP_MESSAGES);
  const [automations, setAutomations] = useState<AutomationRule[]>(INITIAL_AUTOMATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [webhooks, setWebhooks] = useState<WebhookEvent[]>(INITIAL_WEBHOOKS);
  const [reconciliations, setReconciliations] = useState<ReconciliationRecord[]>(INITIAL_RECONCILIATION);
  const [accountingSyncs, setAccountingSyncs] = useState<AccountingSyncLog[]>(INITIAL_ACCOUNTING_SYNCS);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.members) setMembers(parsed.members);
        if (parsed.quotas) setQuotas(parsed.quotas);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.receipts) setReceipts(parsed.receipts);
        if (parsed.whatsappMessages) setWhatsappMessages(parsed.whatsappMessages);
        if (parsed.automations) setAutomations(parsed.automations);
        if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
        if (parsed.webhooks) setWebhooks(parsed.webhooks);
        if (parsed.reconciliations) setReconciliations(parsed.reconciliations);
        if (parsed.accountingSyncs) setAccountingSyncs(parsed.accountingSyncs);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage when critical items update
  const persist = (updated: any) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const addAudit = (action: string, module: string, recordId: string, risk: 'bajo' | 'medio' | 'critico' = 'bajo', details?: { prev?: string; next?: string }) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'admin@clubpolanco.bo',
      action,
      module,
      recordId,
      ip: '192.168.1.104',
      riskLevel: risk,
      previousValue: details?.prev,
      newValue: details?.next,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Register manual payment (Económico / Estándar / Completo)
  const registerManualPayment = (data: {
    memberId: string;
    quotaId?: string;
    amount: number;
    method: PaymentMethod;
    reference: string;
    notes?: string;
  }): Payment => {
    const member = members.find(m => m.id === data.memberId);
    const receiptNum = `REC-2026-${String(payments.length + 895).padStart(4, '0')}`;
    const paymentId = `pay-${Date.now()}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newPayment: Payment = {
      id: paymentId,
      receiptNumber: receiptNum,
      memberId: data.memberId,
      memberName: member ? member.fullName : 'Socio Desconocido',
      memberCi: member ? member.ci : 'N/A',
      quotaId: data.quotaId,
      amount: data.amount,
      method: data.method,
      reference: data.reference,
      date: now,
      notes: data.notes,
      status: 'aprobado',
      conciliated: false,
      accountingStatus: 'pendiente',
    };

    const newReceipt: Receipt = {
      id: `rec-${Date.now()}`,
      number: receiptNum,
      paymentId: paymentId,
      memberId: data.memberId,
      memberName: member ? member.fullName : 'Socio',
      memberCi: member ? member.ci : 'N/A',
      memberCode: member ? member.code : 'CP-000',
      amount: data.amount,
      concept: data.quotaId ? 'Pago Cuota Ordinaria Membresía' : 'Pago Administrativo Cuota Socio',
      method: data.method,
      date: now,
      generatedBy: 'Caja Club Polanco',
    };

    // Update member balance
    const updatedMembers = members.map(m => {
      if (m.id === data.memberId) {
        const newBalance = Math.max(0, m.balance - data.amount);
        return {
          ...m,
          balance: newBalance,
          status: newBalance === 0 ? ('activo' as const) : m.status,
        };
      }
      return m;
    });

    // Update quota if linked
    const updatedQuotas = quotas.map(q => {
      if (data.quotaId && q.id === data.quotaId) {
        return {
          ...q,
          status: 'pagado' as const,
          paidAt: now,
          paymentMethod: data.method,
        };
      }
      return q;
    });

    const updatedPayments = [newPayment, ...payments];
    const updatedReceipts = [newReceipt, ...receipts];

    setMembers(updatedMembers);
    setQuotas(updatedQuotas);
    setPayments(updatedPayments);
    setReceipts(updatedReceipts);

    addAudit('Registro Manual de Pago', 'Caja / Cobranza', receiptNum, 'bajo', {
      next: `Pago Bs ${data.amount} por ${data.method} ref: ${data.reference}`
    });

    persist({
      members: updatedMembers,
      quotas: updatedQuotas,
      payments: updatedPayments,
      receipts: updatedReceipts,
    });

    return newPayment;
  };

  // Simulate Dynamic QR Payment (Completo)
  const simulateQrPayment = async (memberId: string, quotaId?: string, amount?: number): Promise<Payment> => {
    const member = members.find(m => m.id === memberId);
    const payAmount = amount || 250;
    const txId = `TX-BNB-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const receiptNum = `REC-2026-${String(payments.length + 900).padStart(4, '0')}`;
    const paymentId = `pay-${Date.now()}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const fullTimeline = [
      { time: '09:30', title: 'Cuota generada', description: 'Generación cuota en sistema', status: 'completed' as const },
      { time: '10:00', title: 'QR Dinámico emitido', description: `Emisión transacción BNB ID: ${txId}`, status: 'completed' as const },
      { time: '10:01', title: 'Pago iniciado en banca móvil', description: 'Socio escaneó código QR desde su app bancaria', status: 'completed' as const },
      { time: '10:02', title: 'Webhook recibido y validado', description: 'Firma HMAC SHA-256 verificada. Evento payment.approved', status: 'completed' as const },
      { time: '10:02', title: 'Pago acreditado en cuenta', description: 'Liquidación interbancaria confirmada', status: 'completed' as const },
      { time: '10:03', title: 'Recibo oficial emitido', description: `Recibo electrónico ${receiptNum} generado`, status: 'completed' as const },
      { time: '10:03', title: 'Notificación WhatsApp enviada', description: `Comprobante despachado al teléfono de ${member?.fullName}`, status: 'completed' as const },
      { time: '10:04', title: 'Conciliación bancaria completada', description: 'Coincidencia automática 100% con extracto', status: 'completed' as const },
      { time: '10:05', title: 'Sincronizado con sistema contable', description: 'Asiento contable ID #AST-9812 generado en ERP', status: 'completed' as const },
    ];

    const newPayment: Payment = {
      id: paymentId,
      receiptNumber: receiptNum,
      memberId,
      memberName: member?.fullName || 'Socio',
      memberCi: member?.ci || 'N/A',
      quotaId,
      amount: payAmount,
      method: 'qr_dinamico',
      reference: txId,
      date: now,
      status: 'aprobado',
      transactionId: txId,
      qrPayload: `https://demo.clubpolanco.bo/pay/${txId}`,
      conciliated: true,
      accountingStatus: 'sincronizado',
      timeline: fullTimeline,
    };

    const newReceipt: Receipt = {
      id: `rec-${Date.now()}`,
      number: receiptNum,
      paymentId,
      memberId,
      memberName: member?.fullName || 'Socio',
      memberCi: member?.ci || 'N/A',
      memberCode: member?.code || 'CP-000',
      amount: payAmount,
      concept: 'Cuota Ordinaria Mensual (QR Dinámico)',
      method: 'qr_dinamico',
      date: now,
      generatedBy: 'Pasarela Digital BNB Simple',
    };

    // Auto WhatsApp
    const newWaMsg: WhatsAppMessage = {
      id: `msg-${Date.now()}`,
      memberId,
      memberName: member?.fullName || 'Socio',
      phone: member?.phone || '+591 70000000',
      templateName: 'Confirmación de Pago Exitoso',
      content: `¡Dzień dobry, ${member?.fullName}! Confirmamos la recepción de su pago QR por Bs ${payAmount}. Recibo Nro. ${receiptNum}.`,
      status: 'leido',
      timestamp: now,
    };

    // Webhook event
    const newWh: WebhookEvent = {
      id: `wh-${Date.now()}`,
      transactionId: txId,
      event: 'payment.approved',
      receivedAt: now,
      status: 'procesado',
      payload: {
        event_id: `evt_${txId}_approved`,
        transaction_id: txId,
        amount: payAmount,
        currency: 'BOB',
        provider: 'BNB_SIMPLE_QR',
        auth_code: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
        payer: member?.fullName,
        timestamp: now,
      }
    };

    // Auto Reconciliation Record
    const newRec: ReconciliationRecord = {
      id: `rec-bn-${Date.now()}`,
      bankTxId: `BNB-STMT-${txId.substring(7)}`,
      crmPaymentId: paymentId,
      amount: payAmount,
      bankDate: now,
      channel: 'QR Simple BNB',
      status: 'conciliado',
      matchedAt: now,
    };

    // Update member & quota
    const updatedMembers = members.map(m => {
      if (m.id === memberId) {
        const newBal = Math.max(0, m.balance - payAmount);
        return {
          ...m,
          balance: newBal,
          status: newBal === 0 ? ('activo' as const) : m.status,
        };
      }
      return m;
    });

    const updatedQuotas = quotas.map(q => {
      if (quotaId && q.id === quotaId) {
        return { ...q, status: 'pagado' as const, paidAt: now, paymentMethod: 'qr_dinamico' };
      }
      return q;
    });

    setMembers(updatedMembers);
    setQuotas(updatedQuotas);
    setPayments(prev => [newPayment, ...prev]);
    setReceipts(prev => [newReceipt, ...prev]);
    setWhatsappMessages(prev => [newWaMsg, ...prev]);
    setWebhooks(prev => [newWh, ...prev]);
    setReconciliations(prev => [newRec, ...prev]);

    addAudit('Pago QR Dinámico Aprobado', 'Pasarela QR', txId, 'bajo', {
      next: `Pago digital Bs ${payAmount} acreditado y conciliado`
    });

    return newPayment;
  };

  // Simulate Card Payment
  const simulateCardPayment = async (data: {
    memberId: string;
    quotaId?: string;
    amount: number;
    cardHolder: string;
    cardNumber: string;
  }): Promise<Payment> => {
    const member = members.find(m => m.id === data.memberId);
    const txId = `TX-CARD-${Math.floor(10000 + Math.random() * 90000)}`;
    const receiptNum = `REC-2026-${String(payments.length + 901).padStart(4, '0')}`;
    const paymentId = `pay-${Date.now()}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const last4 = data.cardNumber.replace(/\s+/g, '').slice(-4) || '4242';

    const newPayment: Payment = {
      id: paymentId,
      receiptNumber: receiptNum,
      memberId: data.memberId,
      memberName: member?.fullName || data.cardHolder,
      memberCi: member?.ci || 'N/A',
      quotaId: data.quotaId,
      amount: data.amount,
      method: 'tarjeta',
      reference: `VISA-AUTH-${txId.substring(8)}`,
      date: now,
      status: 'aprobado',
      transactionId: txId,
      conciliated: true,
      accountingStatus: 'sincronizado',
    };

    const newReceipt: Receipt = {
      id: `rec-${Date.now()}`,
      number: receiptNum,
      paymentId,
      memberId: data.memberId,
      memberName: member?.fullName || data.cardHolder,
      memberCi: member?.ci || 'N/A',
      memberCode: member?.code || 'CP-000',
      amount: data.amount,
      concept: 'Cuota de Membresía (Tarjeta de Crédito/Débito)',
      method: 'tarjeta',
      date: now,
      generatedBy: 'Pasarela CyberSource / Red Enlace',
    };

    const newWh: WebhookEvent = {
      id: `wh-${Date.now()}`,
      transactionId: txId,
      event: 'payment.approved',
      receivedAt: now,
      status: 'procesado',
      payload: {
        event_id: `evt_${txId}_card`,
        transaction_id: txId,
        brand: 'VISA',
        last4,
        holder: data.cardHolder,
        amount: data.amount,
        auth_code: `AUTH-${Math.floor(1000 + Math.random() * 9000)}`,
      }
    };

    setMembers(prev => prev.map(m => m.id === data.memberId ? { ...m, balance: Math.max(0, m.balance - data.amount), status: (m.balance - data.amount <= 0) ? 'activo' : m.status } : m));
    setQuotas(prev => prev.map(q => (data.quotaId && q.id === data.quotaId) ? { ...q, status: 'pagado', paidAt: now, paymentMethod: 'tarjeta' } : q));
    setPayments(prev => [newPayment, ...prev]);
    setReceipts(prev => [newReceipt, ...prev]);
    setWebhooks(prev => [newWh, ...prev]);

    addAudit('Pago Tarjeta Aprobado', 'Pasarela Tarjetas', txId, 'bajo', {
      next: `Tarjeta **** ${last4} aprobada por Bs ${data.amount}`
    });

    return newPayment;
  };

  const simulateWebhookEvent = (event: WebhookEvent['event'], txId: string) => {
    const newWh: WebhookEvent = {
      id: `wh-${Date.now()}`,
      transactionId: txId,
      event,
      receivedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'procesado',
      payload: {
        event_id: `evt_sim_${Date.now()}`,
        transaction_id: txId,
        event_name: event,
        simulated: true,
        source_ip: '200.105.144.12',
      }
    };
    setWebhooks(prev => [newWh, ...prev]);
  };

  const syncAccounting = async (): Promise<number> => {
    const pendingCount = payments.filter(p => p.accountingStatus === 'pendiente').length || 128;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const batchId = `BATCH-ACC-${Date.now().toString().slice(-6)}`;

    // Mark pending payments as synced
    setPayments(prev => prev.map(p => ({ ...p, accountingStatus: 'sincronizado' })));

    const newSyncLog: AccountingSyncLog = {
      id: `sync-${Date.now()}`,
      batchId,
      timestamp: now,
      syncedCount: pendingCount,
      status: 'completado',
      targetSystem: 'Sistema Contable Siigo / ERP Club Polanco',
      payloadSummary: `${pendingCount} transacciones exportadas correctamente vía API JSON REST (Asientos contables creados)`,
    };

    setAccountingSyncs(prev => [newSyncLog, ...prev]);
    addAudit('Sincronización Contable Exitosa', 'Integración Contable', batchId, 'medio', {
      next: `${pendingCount} transacciones sincronizadas con ERP Contable`
    });

    return pendingCount;
  };

  const sendBulkWhatsAppReminders = (memberIds: string[]) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newMsgs: WhatsAppMessage[] = memberIds.map((mId, idx) => {
      const member = members.find(m => m.id === mId);
      return {
        id: `msg-bulk-${Date.now()}-${idx}`,
        memberId: mId,
        memberName: member?.fullName || 'Socio',
        phone: member?.phone || '+591 70000000',
        templateName: 'Aviso de Cuota Vencida (Mora)',
        content: `Estimado(a) ${member?.fullName}, registramos cuota pendiente en el Club Polanco por Bs ${member?.balance}. Agradeceremos regularizar su pago.`,
        status: 'entregado',
        timestamp: now,
      };
    });

    setWhatsappMessages(prev => [...newMsgs, ...prev]);
    addAudit('Envío Masivo de WhatsApp', 'WhatsApp Cobranza', `BATCH-WA-${memberIds.length}`, 'medio', {
      next: `${memberIds.length} recordatorios despachados a socios morosos`
    });
  };

  const sendSingleWhatsApp = (memberId: string, templateId: string, customText?: string) => {
    const member = members.find(m => m.id === memberId);
    const tmpl = whatsappTemplates.find(t => t.id === templateId);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const content = customText || (tmpl ? tmpl.content.replace('{{nombre}}', member?.fullName || '').replace('{{monto}}', String(member?.balance || '0')) : 'Mensaje oficial Club Polanco');

    const newMsg: WhatsAppMessage = {
      id: `msg-single-${Date.now()}`,
      memberId,
      memberName: member?.fullName || 'Socio',
      phone: member?.phone || '+591 70000000',
      templateName: tmpl?.name || 'Mensaje Personalizado',
      content,
      status: 'leido',
      timestamp: now,
    };

    setWhatsappMessages(prev => [newMsg, ...prev]);
    addAudit('Envío de WhatsApp Individual', 'WhatsApp', member?.phone || '', 'bajo', {
      next: `Plantilla "${tmpl?.name}" enviada a ${member?.fullName}`
    });
  };

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    addAudit('Cambio Estado Automatización', 'Automatizaciones', id, 'medio');
  };

  const reconcileRecord = (id: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setReconciliations(prev => prev.map(r => r.id === id ? { ...r, status: 'conciliado', matchedAt: now } : r));
    addAudit('Conciliación Manual de Transacción', 'Conciliación Bancaria', id, 'bajo');
  };

  const reconcileAllPending = () => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    setReconciliations(prev => prev.map(r => ({ ...r, status: 'conciliado', matchedAt: now })));
    addAudit('Conciliación Masiva Automática', 'Conciliación Bancaria', 'BATCH-RECON', 'bajo');
  };

  const addMember = (data: Partial<Member>) => {
    const idNum = String(members.length + 1).padStart(3, '0');
    const newMem: Member = {
      id: `mem-${idNum}`,
      code: `CP-${idNum}`,
      fullName: data.fullName || 'Nuevo Socio',
      ci: data.ci || '1000000 LP',
      phone: data.phone || '+591 70000000',
      email: data.email || 'socio@clubpolanco.bo',
      categoryId: data.categoryId || 'cat-4',
      categoryName: data.categoryName || 'Socio General',
      membershipId: data.membershipId || 'mem-1',
      membershipName: data.membershipName || 'Individual',
      status: 'activo',
      balance: 0,
      joinDate: new Date().toISOString().substring(0, 10),
      birthDate: data.birthDate || '1990-01-01',
      address: data.address || 'Av. Principal #100',
      tags: ['Nuevo Socio'],
    };
    setMembers(prev => [newMem, ...prev]);
    addAudit('Alta de Nuevo Socio', 'CRM Socios', newMem.code, 'medio', {
      next: `Socio ${newMem.fullName} registrado en categoría ${newMem.categoryName}`
    });
  };

  const updateMember = (id: string, data: Partial<Member>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    addAudit('Edición de Socio', 'CRM Socios', id, 'bajo');
  };

  const generateBulkQuotas = (period: string, dueDate: string): number => {
    let generated = 0;
    const newQuotas: Quota[] = [];
    members.forEach((m, idx) => {
      const memType = memberships.find(mem => mem.id === m.membershipId) || memberships[0];
      newQuotas.push({
        id: `q-bulk-${Date.now()}-${idx}`,
        memberId: m.id,
        memberName: m.fullName,
        memberCode: m.code,
        period,
        amount: memType.monthlyFee,
        dueDate,
        status: 'pendiente',
        concept: `Cuota Ordinaria ${memType.name} - ${period}`,
      });
      generated++;
    });

    setQuotas(prev => [...newQuotas, ...prev]);
    addAudit('Generación Masiva de Cuotas', 'Cobranza', period, 'medio', {
      next: `${generated} cuotas generadas para el período ${period}`
    });
    return generated;
  };

  const resetAllDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMembers(INITIAL_MEMBERS);
    setCategories(INITIAL_CATEGORIES);
    setMemberships(INITIAL_MEMBERSHIPS);
    setQuotas(INITIAL_QUOTAS);
    setPayments(INITIAL_PAYMENTS);
    setReceipts(INITIAL_RECEIPTS);
    setWhatsappMessages(INITIAL_WHATSAPP_MESSAGES);
    setAutomations(INITIAL_AUTOMATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setWebhooks(INITIAL_WEBHOOKS);
    setReconciliations(INITIAL_RECONCILIATION);
    setAccountingSyncs(INITIAL_ACCOUNTING_SYNCS);
  };

  return (
    <CRMContext.Provider
      value={{
        members,
        categories,
        memberships,
        quotas,
        payments,
        receipts,
        whatsappTemplates,
        whatsappMessages,
        automations,
        auditLogs,
        webhooks,
        reconciliations,
        accountingSyncs,
        registerManualPayment,
        simulateQrPayment,
        simulateCardPayment,
        simulateWebhookEvent,
        syncAccounting,
        sendBulkWhatsAppReminders,
        sendSingleWhatsApp,
        toggleAutomation,
        reconcileRecord,
        reconcileAllPending,
        addMember,
        updateMember,
        generateBulkQuotas,
        resetAllDemoData,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
