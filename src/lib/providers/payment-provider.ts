/**
 * Payment Provider Abstraction Layer
 * Supports seamless replacement of Mock providers with real Bolivian Banking / Gateway APIs
 * (BNB Simple QR, CyberSource, Red Enlace, etc.)
 */

export interface PaymentIntentRequest {
  memberId: string;
  quotaId?: string;
  amount: number;
  concept: string;
  currency?: string;
}

export interface QrGenerationResult {
  transactionId: string;
  qrPayload: string;
  qrImageBase64?: string;
  expiresAt: string;
  amount: number;
  status: 'pending' | 'completed' | 'expired';
}

export interface CardChargeRequest {
  amount: number;
  currency: string;
  cardHolder: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
  customerEmail: string;
}

export interface ChargeResult {
  transactionId: string;
  success: boolean;
  authorizationCode: string;
  cardBrand: string;
  last4: string;
  errorMessage?: string;
}

export interface PaymentProvider {
  name: string;
  generateDynamicQr(req: PaymentIntentRequest): Promise<QrGenerationResult>;
  processCardCharge(req: CardChargeRequest): Promise<ChargeResult>;
  verifyTransaction(transactionId: string): Promise<{ status: 'approved' | 'pending' | 'failed' }>;
}

export class MockPaymentProvider implements PaymentProvider {
  name = "Club Polaco Demo Mock Payment Gateway (BNB Simple + CyberSource)";

  async generateDynamicQr(req: PaymentIntentRequest): Promise<QrGenerationResult> {
    const txId = `TX-BNB-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    return {
      transactionId: txId,
      qrPayload: `https://demo.clubpolaco.bo/pay/${txId}`,
      expiresAt: expires,
      amount: req.amount,
      status: 'pending',
    };
  }

  async processCardCharge(req: CardChargeRequest): Promise<ChargeResult> {
    // Artificial 600ms delay to simulate bank processing
    await new Promise(r => setTimeout(r, 600));
    const txId = `TX-CARD-${Math.floor(10000 + Math.random() * 90000)}`;
    const last4 = req.cardNumber.replace(/\s+/g, '').slice(-4) || '4242';
    return {
      transactionId: txId,
      success: true,
      authorizationCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
      cardBrand: req.cardNumber.startsWith('5') ? 'Mastercard' : 'VISA',
      last4,
    };
  }

  async verifyTransaction(transactionId: string): Promise<{ status: 'approved' | 'pending' | 'failed' }> {
    return { status: 'approved' };
  }
}

export const activePaymentProvider = new MockPaymentProvider();
