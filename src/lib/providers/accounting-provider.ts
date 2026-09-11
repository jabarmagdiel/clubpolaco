/**
 * Accounting Integration Provider Layer
 * Prepares the Club Polaco CRM to synchronize with external ERP / Accounting systems
 * (Siigo, Contpaqi, SAP Business One, or custom Bolivian accounting modules)
 */

export interface AccountingTransaction {
  paymentId: string;
  receiptNumber: string;
  memberCode: string;
  amount: number;
  paymentMethod: string;
  date: string;
  accountCredit: string;
  accountDebit: string;
}

export interface AccountingSyncResponse {
  success: boolean;
  batchId: string;
  syncedCount: number;
  message: string;
  timestamp: string;
}

export interface AccountingIntegrationProvider {
  name: string;
  syncPayment(payment: AccountingTransaction): Promise<{ success: boolean; externalJournalId: string }>;
  syncPayments(payments: AccountingTransaction[]): Promise<AccountingSyncResponse>;
  retrySync(batchId: string): Promise<AccountingSyncResponse>;
  getStatus(): Promise<{ connected: boolean; systemName: string; lastSync: string; pendingTransactions: number }>;
}

export class MockAccountingIntegrationProvider implements AccountingIntegrationProvider {
  name = "Conector API Contable Club Polaco (Mock Siigo/ERP Cloud)";

  async syncPayment(payment: AccountingTransaction): Promise<{ success: boolean; externalJournalId: string }> {
    return {
      success: true,
      externalJournalId: `JRN-${Math.floor(10000 + Math.random() * 90000)}`,
    };
  }

  async syncPayments(payments: AccountingTransaction[]): Promise<AccountingSyncResponse> {
    const batchId = `BATCH-ACC-${Date.now().toString().slice(-6)}`;
    return {
      success: true,
      batchId,
      syncedCount: payments.length,
      message: `${payments.length} transacciones sincronizadas correctamente con el Libro Auxiliar de Ingresos.`,
      timestamp: new Date().toISOString(),
    };
  }

  async retrySync(batchId: string): Promise<AccountingSyncResponse> {
    return {
      success: true,
      batchId,
      syncedCount: 1,
      message: `Reintento exitoso para lote ${batchId}.`,
      timestamp: new Date().toISOString(),
    };
  }

  async getStatus(): Promise<{ connected: boolean; systemName: string; lastSync: string; pendingTransactions: number }> {
    return {
      connected: true,
      systemName: "ERP Contable Club Polaco v4.2",
      lastSync: new Date().toISOString(),
      pendingTransactions: 0,
    };
  }
}

export const activeAccountingProvider = new MockAccountingIntegrationProvider();
