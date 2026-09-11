export type MemberStatus = 'activo' | 'moroso' | 'inactivo';

export interface Member {
  id: string;
  code: string;
  fullName: string;
  ci: string;
  phone: string;
  email: string;
  categoryId: string;
  categoryName: string;
  membershipId: string;
  membershipName: string;
  status: MemberStatus;
  balance: number;
  joinDate: string;
  birthDate: string;
  address: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  active: boolean;
  memberCount: number;
}

export interface MembershipType {
  id: string;
  name: string;
  monthlyFee: number;
  periodicity: 'mensual' | 'anual';
  active: boolean;
}

export type QuotaStatus = 'pendiente' | 'pagado' | 'vencido' | 'anulado';

export interface Quota {
  id: string;
  memberId: string;
  memberName: string;
  memberCode: string;
  period: string; // e.g. "Septiembre 2026"
  amount: number;
  dueDate: string;
  status: QuotaStatus;
  concept: string;
  paidAt?: string;
  paymentMethod?: string;
}

export type PaymentMethod = 'efectivo' | 'transferencia' | 'qr_manual' | 'qr_dinamico' | 'tarjeta';

export interface Payment {
  id: string;
  receiptNumber: string;
  memberId: string;
  memberName: string;
  memberCi: string;
  quotaId?: string;
  amount: number;
  method: PaymentMethod;
  reference: string;
  date: string;
  notes?: string;
  status: 'aprobado' | 'pendiente' | 'reembolsado';
  // Completo features
  transactionId?: string;
  qrPayload?: string;
  conciliated?: boolean;
  accountingStatus?: 'pendiente' | 'sincronizado' | 'error';
  timeline?: {
    time: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
  }[];
}

export interface Receipt {
  id: string;
  number: string;
  paymentId: string;
  memberId: string;
  memberName: string;
  memberCi: string;
  memberCode: string;
  amount: number;
  concept: string;
  method: PaymentMethod;
  date: string;
  generatedBy: string;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
}

export interface WhatsAppMessage {
  id: string;
  memberId: string;
  memberName: string;
  phone: string;
  templateName: string;
  content: string;
  status: 'enviado' | 'entregado' | 'leido' | 'error';
  timestamp: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  enabled: boolean;
  executionsCount: number;
  lastRun?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  recordId: string;
  ip: string;
  riskLevel: 'bajo' | 'medio' | 'critico';
  previousValue?: string;
  newValue?: string;
  transactionId?: string;
}

export interface WebhookEvent {
  id: string;
  transactionId: string;
  event: 'payment.created' | 'payment.pending' | 'payment.processing' | 'payment.approved' | 'payment.failed' | 'payment.refunded';
  receivedAt: string;
  status: 'procesado' | 'pendiente' | 'error';
  payload: Record<string, any>;
}

export interface ReconciliationRecord {
  id: string;
  bankTxId: string;
  crmPaymentId?: string;
  amount: number;
  bankDate: string;
  channel: string;
  status: 'conciliado' | 'pendiente' | 'diferencia' | 'error';
  differenceAmount?: number;
  matchedAt?: string;
}

export interface AccountingSyncLog {
  id: string;
  batchId: string;
  timestamp: string;
  syncedCount: number;
  status: 'completado' | 'pendiente' | 'error';
  targetSystem: string;
  payloadSummary: string;
}
