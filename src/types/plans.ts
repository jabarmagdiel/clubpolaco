export type PlanType = 'economico' | 'estandar' | 'completo';

export interface PlanConfig {
  id: PlanType;
  name: string;
  price: string;
  tagline: string;
  badge?: string;
  features: {
    crm: boolean;
    paymentsManual: boolean;
    whatsapp: boolean;
    automations: boolean;
    auditBasic: boolean;
    auditAdvanced: boolean;
    qrDynamic: boolean;
    cards: boolean;
    webhooks: boolean;
    reconciliation: boolean;
    accountingExport: boolean;
    accountingApi: boolean;
    memberPortal: boolean;
    rolesAdvanced: boolean;
    excelImportAdvanced: boolean;
  };
}

export const PLANS_CONFIG: Record<PlanType, PlanConfig> = {
  economico: {
    id: 'economico',
    name: 'Económico',
    price: '',
    tagline: 'Digitaliza la administración de socios y pagos esenciales.',
    features: {
      crm: true,
      paymentsManual: true,
      whatsapp: false,
      automations: false,
      auditBasic: false,
      auditAdvanced: false,
      qrDynamic: false,
      cards: false,
      webhooks: false,
      reconciliation: false,
      accountingExport: false,
      accountingApi: false,
      memberPortal: false,
      rolesAdvanced: false,
      excelImportAdvanced: false,
    },
  },
  estandar: {
    id: 'estandar',
    name: 'Estándar',
    price: '',
    badge: 'RECOMENDADO',
    tagline: 'Automatiza la cobranza y centraliza la relación con los socios.',
    features: {
      crm: true,
      paymentsManual: true,
      whatsapp: true,
      automations: true,
      auditBasic: true,
      auditAdvanced: false,
      qrDynamic: false,
      cards: false,
      webhooks: false,
      reconciliation: false,
      accountingExport: true,
      accountingApi: false,
      memberPortal: false,
      rolesAdvanced: true,
      excelImportAdvanced: true,
    },
  },
  completo: {
    id: 'completo',
    name: 'Completo',
    price: '',
    tagline: 'Automatización avanzada de pagos, conciliación e integración empresarial.',
    features: {
      crm: true,
      paymentsManual: true,
      whatsapp: true,
      automations: true,
      auditBasic: true,
      auditAdvanced: true,
      qrDynamic: true,
      cards: true,
      webhooks: true,
      reconciliation: true,
      accountingExport: true,
      accountingApi: true,
      memberPortal: true,
      rolesAdvanced: true,
      excelImportAdvanced: true,
    },
  },
};
