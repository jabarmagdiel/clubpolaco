import { Member, Category, MembershipType, Quota, Payment, Receipt, WhatsAppTemplate, WhatsAppMessage, AutomationRule, AuditLog, WebhookEvent, ReconciliationRecord, AccountingSyncLog } from '@/types/crm';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Deportes', description: 'Acceso a canchas, piscina y torneos internos', active: true, memberCount: 16 },
  { id: 'cat-2', name: 'Recreación', description: 'Actividades de esparcimiento, club house y parrilleros', active: true, memberCount: 12 },
  { id: 'cat-3', name: 'Entretenimiento', description: 'Cultura, eventos sociales, danza folclórica y biblioteca', active: true, memberCount: 9 },
  { id: 'cat-4', name: 'Socio General', description: 'Membresía estándar con acceso pleno a instalaciones', active: true, memberCount: 10 },
  { id: 'cat-5', name: 'Honorario', description: 'Socios vitalicios o destacados de la colectividad', active: true, memberCount: 3 },
];

export const INITIAL_MEMBERSHIPS: MembershipType[] = [
  { id: 'mem-1', name: 'Individual', monthlyFee: 250, periodicity: 'mensual', active: true },
  { id: 'mem-2', name: 'Familiar', monthlyFee: 450, periodicity: 'mensual', active: true },
  { id: 'mem-3', name: 'Juvenil', monthlyFee: 150, periodicity: 'mensual', active: true },
  { id: 'mem-4', name: 'Senior / Vitalicio', monthlyFee: 180, periodicity: 'mensual', active: true },
];

const POLISH_NAMES = [
  { first: 'Jan', last: 'Kowalski', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'moroso' as const, balance: 500 },
  { first: 'María', last: 'Nowak', sex: 'F', cat: 'cat-2', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Carlos', last: 'Zielinski', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'moroso' as const, balance: 250 },
  { first: 'Anna', last: 'Wiśniewska', sex: 'F', cat: 'cat-3', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Pedro', last: 'Kowalski', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'moroso' as const, balance: 750 },
  { first: 'Sofia', last: 'Lewandowski', sex: 'F', cat: 'cat-1', mem: 'mem-3', status: 'activo' as const, balance: 0 },
  { first: 'Stanisław', last: 'Dąbrowski', sex: 'M', cat: 'cat-5', mem: 'mem-4', status: 'activo' as const, balance: 0 },
  { first: 'Helena', last: 'Wójcik', sex: 'F', cat: 'cat-2', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Tomasz', last: 'Kamiński', sex: 'M', cat: 'cat-1', mem: 'mem-2', status: 'moroso' as const, balance: 450 },
  { first: 'Gabriela', last: 'Szymańska', sex: 'F', cat: 'cat-3', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Marek', last: 'Woźniak', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'moroso' as const, balance: 250 },
  { first: 'Ewa', last: 'Kozłowska', sex: 'F', cat: 'cat-2', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Michał', last: 'Jankowski', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Katarzyna', last: 'Mazur', sex: 'F', cat: 'cat-3', mem: 'mem-3', status: 'moroso' as const, balance: 300 },
  { first: 'Andrzej', last: 'Wojciechowski', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Agnieszka', last: 'Kwiatkowska', sex: 'F', cat: 'cat-2', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Krzysztof', last: 'Krawczyk', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'moroso' as const, balance: 250 },
  { first: 'Barbara', last: 'Kaczmarek', sex: 'F', cat: 'cat-5', mem: 'mem-4', status: 'activo' as const, balance: 0 },
  { first: 'Piotr', last: 'Piotrowski', sex: 'M', cat: 'cat-4', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Magdalena', last: 'Grabowska', sex: 'F', cat: 'cat-3', mem: 'mem-1', status: 'moroso' as const, balance: 500 },
  { first: 'Janusz', last: 'Pawlak', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Monika', last: 'Michalska', sex: 'F', cat: 'cat-2', mem: 'mem-3', status: 'activo' as const, balance: 0 },
  { first: 'Grzegorz', last: 'Nowicki', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'moroso' as const, balance: 250 },
  { first: 'Teresa', last: 'Adamczyk', sex: 'F', cat: 'cat-5', mem: 'mem-4', status: 'activo' as const, balance: 0 },
  { first: 'Wojciech', last: 'Dudek', sex: 'M', cat: 'cat-1', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Joanna', last: 'Zając', sex: 'F', cat: 'cat-3', mem: 'mem-1', status: 'moroso' as const, balance: 450 },
  { first: 'Rafał', last: 'Wieczorek', sex: 'M', cat: 'cat-2', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Danuta', last: 'Jabłońska', sex: 'F', cat: 'cat-4', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Marcin', last: 'Król', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Alicja', last: 'Majewska', sex: 'F', cat: 'cat-3', mem: 'mem-3', status: 'activo' as const, balance: 0 },
  { first: 'Bartosz', last: 'Olszewski', sex: 'M', cat: 'cat-2', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Beata', last: 'Jaworska', sex: 'F', cat: 'cat-4', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Maciej', last: 'Malinowski', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'moroso' as const, balance: 500 },
  { first: 'Aleksandra', last: 'Pawłowska', sex: 'F', cat: 'cat-2', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Łukasz', last: 'Górski', sex: 'M', cat: 'cat-3', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Natalia', last: 'Witkowska', sex: 'F', cat: 'cat-1', mem: 'mem-3', status: 'activo' as const, balance: 0 },
  { first: 'Mariusz', last: 'Sikora', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Dorota', last: 'Walczak', sex: 'F', cat: 'cat-2', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Dominik', last: 'Baran', sex: 'M', cat: 'cat-1', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Karolina', last: 'Rutkowska', sex: 'F', cat: 'cat-3', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Kamil', last: 'Michalak', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Izabela', last: 'Szewczyk', sex: 'F', cat: 'cat-2', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Sebastian', last: 'Ostrowski', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Marta', last: 'Tomaszewska', sex: 'F', cat: 'cat-3', mem: 'mem-3', status: 'activo' as const, balance: 0 },
  { first: 'Patryk', last: 'Zalewski', sex: 'M', cat: 'cat-4', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Paulina', last: 'Wróbel', sex: 'F', cat: 'cat-2', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Artur', last: 'Jasiński', sex: 'M', cat: 'cat-1', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Wiktoria', last: 'Marciniak', sex: 'F', cat: 'cat-3', mem: 'mem-1', status: 'activo' as const, balance: 0 },
  { first: 'Filip', last: 'Bąk', sex: 'M', cat: 'cat-4', mem: 'mem-2', status: 'activo' as const, balance: 0 },
  { first: 'Emilia', last: 'Zawadzka', sex: 'F', cat: 'cat-2', mem: 'mem-1', status: 'activo' as const, balance: 0 },
];

export const INITIAL_MEMBERS: Member[] = POLISH_NAMES.map((person, index) => {
  const idNum = String(index + 1).padStart(3, '0');
  const cat = INITIAL_CATEGORIES.find(c => c.id === person.cat)!;
  const mem = INITIAL_MEMBERSHIPS.find(m => m.id === person.mem)!;
  const ciNum = 4820100 + index * 137;
  const phoneNum = 70500000 + index * 211;
  const birthDay = (index % 28) + 1;
  const birthMonth = (index % 12) + 1;
  const isBdayUpcoming = index < 5; // 5 upcoming birthdays for widgets

  return {
    id: `mem-${idNum}`,
    code: `CP-${idNum}`,
    fullName: `${person.first} ${person.last}`,
    ci: `${ciNum} LP`,
    phone: `+591 ${phoneNum}`,
    email: `${person.first.toLowerCase()}.${person.last.toLowerCase().replace(/[^a-z]/g, '')}@clubpolaco.bo`,
    categoryId: cat.id,
    categoryName: cat.name,
    membershipId: mem.id,
    membershipName: mem.name,
    status: person.status,
    balance: person.balance,
    joinDate: `2024-0${(index % 9) + 1}-15`,
    birthDate: isBdayUpcoming ? `198${index % 9}-09-${String(birthDay).padStart(2, '0')}` : `198${index % 9}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`,
    address: `Av. 6 de Agosto #${1200 + index * 15}`,
    tags: person.status === 'moroso' ? ['Cobranza Urgente', 'Mora > 60d'] : ['Al Día', 'Frecuente'],
  };
});

// Generate 50+ quotas (including pending, overdue, and paid)
export const INITIAL_QUOTAS: Quota[] = [];
INITIAL_MEMBERS.forEach((m, idx) => {
  const memType = INITIAL_MEMBERSHIPS.find(mem => mem.id === m.membershipId)!;
  
  // Current month quota
  if (m.status === 'moroso') {
    INITIAL_QUOTAS.push({
      id: `q-${idx}-1`,
      memberId: m.id,
      memberName: m.fullName,
      memberCode: m.code,
      period: 'Agosto 2026',
      amount: memType.monthlyFee,
      dueDate: '2026-08-10',
      status: 'vencido',
      concept: `Cuota Ordinaria ${memType.name} - Agosto 2026`,
    });
    if (m.balance > 250) {
      INITIAL_QUOTAS.push({
        id: `q-${idx}-2`,
        memberId: m.id,
        memberName: m.fullName,
        memberCode: m.code,
        period: 'Julio 2026',
        amount: memType.monthlyFee,
        dueDate: '2026-07-10',
        status: 'vencido',
        concept: `Cuota Ordinaria ${memType.name} - Julio 2026`,
      });
    }
  } else {
    // Active member has current pending or paid quota
    INITIAL_QUOTAS.push({
      id: `q-${idx}-0`,
      memberId: m.id,
      memberName: m.fullName,
      memberCode: m.code,
      period: 'Septiembre 2026',
      amount: memType.monthlyFee,
      dueDate: '2026-09-25',
      status: idx % 3 === 0 ? 'pendiente' : 'pagado',
      concept: `Cuota Ordinaria ${memType.name} - Septiembre 2026`,
      paidAt: idx % 3 === 0 ? undefined : '2026-09-05 11:30',
      paymentMethod: idx % 2 === 0 ? 'qr_dinamico' : 'efectivo',
    });
  }
});

// Payments history
export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-101',
    receiptNumber: 'REC-2026-0891',
    memberId: 'mem-001',
    memberName: 'Jan Kowalski',
    memberCi: '4820100 LP',
    amount: 250,
    method: 'qr_dinamico',
    reference: 'TX-BNB-9812401',
    date: '2026-09-08 10:20',
    status: 'aprobado',
    transactionId: 'TX-BNB-9812401',
    qrPayload: 'https://demo.clubpolaco.bo/pay/TX-BNB-9812401',
    conciliated: true,
    accountingStatus: 'sincronizado',
    timeline: [
      { time: '09:32', title: 'Cuota generada', description: 'Generación de cuota ordinaria Individual Septiembre', status: 'completed' },
      { time: '10:15', title: 'QR Dinámico generado', description: 'Emisión por pasarela bancaria BNB', status: 'completed' },
      { time: '10:19', title: 'Pago iniciado en banca móvil', description: 'Escaneado por socio Jan Kowalski', status: 'completed' },
      { time: '10:20', title: 'Webhook recibido y autenticado', description: 'Evento payment.approved procesado con HMAC SHA-256', status: 'completed' },
      { time: '10:20', title: 'Pago confirmado y acreditado', description: 'Saldo actualizado a Bs 0. Cuota liquidada', status: 'completed' },
      { time: '10:21', title: 'Recibo electrónico emitido', description: 'Recibo oficial REC-2026-0891 generado', status: 'completed' },
      { time: '10:21', title: 'Notificación WhatsApp enviada', description: 'Confirmación entregada al +591 70500000', status: 'completed' },
      { time: '10:22', title: 'Pago conciliado automáticamente', description: 'Coincidencia exacta con extracto bancario', status: 'completed' },
      { time: '10:23', title: 'Sincronizado con sistema contable', description: 'Asiento contable ID #AST-9021 en cola contable', status: 'completed' },
    ],
  },
  {
    id: 'pay-102',
    receiptNumber: 'REC-2026-0892',
    memberId: 'mem-002',
    memberName: 'María Nowak',
    memberCi: '4820237 LP',
    amount: 450,
    method: 'tarjeta',
    reference: 'VISA-AUTH-7712',
    date: '2026-09-08 14:45',
    status: 'aprobado',
    transactionId: 'TX-CARD-44190',
    conciliated: true,
    accountingStatus: 'sincronizado',
  },
  {
    id: 'pay-103',
    receiptNumber: 'REC-2026-0893',
    memberId: 'mem-004',
    memberName: 'Anna Wiśniewska',
    memberCi: '4820511 LP',
    amount: 450,
    method: 'transferencia',
    reference: 'TRF-BISA-5519',
    date: '2026-09-09 09:15',
    status: 'aprobado',
    conciliated: true,
    accountingStatus: 'pendiente',
  },
  {
    id: 'pay-104',
    receiptNumber: 'REC-2026-0894',
    memberId: 'mem-006',
    memberName: 'Sofia Lewandowski',
    memberCi: '4820785 LP',
    amount: 150,
    method: 'efectivo',
    reference: 'CAJA-DIR-0021',
    date: '2026-09-09 11:30',
    status: 'aprobado',
    conciliated: true,
    accountingStatus: 'pendiente',
  },
  {
    id: 'pay-105',
    receiptNumber: 'REC-2026-0895',
    memberId: 'mem-008',
    memberName: 'Helena Wójcik',
    memberCi: '4821059 LP',
    amount: 250,
    method: 'qr_dinamico',
    reference: 'TX-BNB-9812499',
    date: '2026-09-09 16:00',
    status: 'aprobado',
    transactionId: 'TX-BNB-9812499',
    conciliated: false,
    accountingStatus: 'pendiente',
  },
];

export const INITIAL_RECEIPTS: Receipt[] = INITIAL_PAYMENTS.map((p, idx) => ({
  id: `rec-${idx + 1}`,
  number: p.receiptNumber,
  paymentId: p.id,
  memberId: p.memberId,
  memberName: p.memberName,
  memberCi: p.memberCi,
  memberCode: `CP-${String(idx + 1).padStart(3, '0')}`,
  amount: p.amount,
  concept: 'Cuota Ordinaria Mensual de Membresía',
  method: p.method,
  date: p.date,
  generatedBy: 'Administración Club Polaco',
}));

export const INITIAL_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Bienvenida Nuevo Socio',
    category: 'Onboarding',
    content: '¡Dzień dobry, {{nombre}}! 🇵🇱 Le damos la más cordial bienvenida a la familia del Club Polaco. Su número de socio es {{codigo}}. Recuerde que sus instalaciones deportivas y sociales están a su total disposición.',
  },
  {
    id: 'tmpl-2',
    name: 'Recordatorio Cuota Próxima a Vencer',
    category: 'Cobranza Preventiva',
    content: 'Estimado(a) {{nombre}}, le recordamos cordialmente que su cuota de {{concepto}} por Bs {{monto}} vence el {{fecha_vencimiento}}. Puede realizar su pago en secretaría o mediante transferencia bancaria.',
  },
  {
    id: 'tmpl-3',
    name: 'Aviso de Cuota Vencida (Mora)',
    category: 'Cobranza Urgente',
    content: 'Estimado socio {{nombre}}, registramos una cuota pendiente de {{concepto}} por un saldo de Bs {{monto}}. Para mantener activo su acceso a las instalaciones, le solicitamos regularizar su pago a la brevedad.',
  },
  {
    id: 'tmpl-4',
    name: 'Confirmación de Pago Exitoso',
    category: 'Transaccional',
    content: '¡Gracias, {{nombre}}! Hemos recibido su pago de Bs {{monto}} correspondiente a {{concepto}}. Su recibo oficial es el {{nro_recibo}}. ¡Que tenga una excelente jornada en el Club Polaco!',
  },
  {
    id: 'tmpl-5',
    name: 'Felicitación de Cumpleaños',
    category: 'Fidelización',
    content: '¡Wszystkiego najlepszego z okazji urodzin, {{nombre}}! 🎉 De parte de todo el Directorio del Club Polaco, le deseamos un muy feliz cumpleaños junto a sus seres queridos.',
  },
];

export const INITIAL_WHATSAPP_MESSAGES: WhatsAppMessage[] = [
  {
    id: 'msg-1',
    memberId: 'mem-001',
    memberName: 'Jan Kowalski',
    phone: '+591 70500000',
    templateName: 'Confirmación de Pago Exitoso',
    content: '¡Gracias, Jan Kowalski! Hemos recibido su pago de Bs 250 correspondiente a Cuota Ordinaria. Su recibo oficial es el REC-2026-0891.',
    status: 'leido',
    timestamp: '2026-09-08 10:21',
  },
  {
    id: 'msg-2',
    memberId: 'mem-003',
    memberName: 'Carlos Zielinski',
    phone: '+591 70500422',
    templateName: 'Aviso de Cuota Vencida (Mora)',
    content: 'Estimado socio Carlos Zielinski, registramos una cuota pendiente de Cuota Ordinaria Agosto 2026 por un saldo de Bs 250.',
    status: 'entregado',
    timestamp: '2026-09-09 09:00',
  },
  {
    id: 'msg-3',
    memberId: 'mem-005',
    memberName: 'Pedro Kowalski',
    phone: '+591 70500844',
    templateName: 'Aviso de Cuota Vencida (Mora)',
    content: 'Estimado socio Pedro Kowalski, registramos una deuda acumulada de Bs 750 correspondiente a 3 cuotas vencidas.',
    status: 'enviado',
    timestamp: '2026-09-09 09:02',
  },
  {
    id: 'msg-4',
    memberId: 'mem-002',
    memberName: 'María Nowak',
    phone: '+591 70500211',
    templateName: 'Felicitación de Cumpleaños',
    content: '¡Wszystkiego najlepszego z okazji urodzin, María Nowak! 🎉 De parte de todo el Directorio del Club Polaco...',
    status: 'leido',
    timestamp: '2026-09-07 08:30',
  },
];

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'auto-1',
    name: 'Bienvenida Nuevo Socio',
    trigger: 'Nuevo socio registrado',
    condition: 'Estado = Activo',
    action: 'Enviar WhatsApp de bienvenida',
    enabled: true,
    executionsCount: 42,
    lastRun: '2026-09-08 16:30',
  },
  {
    id: 'auto-2',
    name: 'Recordatorio Preventivo (3 días antes)',
    trigger: '3 días antes del vencimiento',
    condition: 'Saldo cuota > Bs 0',
    action: 'Enviar recordatorio WhatsApp con datos de pago',
    enabled: true,
    executionsCount: 128,
    lastRun: '2026-09-07 08:00',
  },
  {
    id: 'auto-3',
    name: 'Aviso Día del Vencimiento',
    trigger: 'Día del vencimiento a las 09:00',
    condition: 'Estado cuota = Pendiente',
    action: 'Enviar recordatorio de vencimiento hoy',
    enabled: true,
    executionsCount: 95,
    lastRun: '2026-09-10 09:00',
  },
  {
    id: 'auto-4',
    name: 'Alerta Morosidad (7 días después)',
    trigger: '7 días posteriores al vencimiento',
    condition: 'Estado = Vencido',
    action: 'Enviar aviso de mora y marcar en lista de cobranza',
    enabled: true,
    executionsCount: 38,
    lastRun: '2026-09-05 10:00',
  },
  {
    id: 'auto-5',
    name: 'Confirmación Inmediata de Pago',
    trigger: 'Pago registrado o aprobado',
    condition: 'Monto > Bs 0',
    action: 'Generar recibo y enviar notificación WhatsApp',
    enabled: true,
    executionsCount: 310,
    lastRun: '2026-09-09 16:00',
  },
  {
    id: 'auto-6',
    name: 'Felicitación de Cumpleaños Matutina',
    trigger: 'Día de cumpleaños a las 08:30',
    condition: 'Socio activo',
    action: 'Enviar saludo personalizado en polaco y español',
    enabled: true,
    executionsCount: 52,
    lastRun: '2026-09-09 08:30',
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-09 16:00:21',
    user: 'admin@clubpolaco.bo',
    action: 'Registro de Pago QR',
    module: 'Pagos Digitales',
    recordId: 'TX-BNB-9812499',
    ip: '192.168.1.104',
    riskLevel: 'bajo',
    newValue: 'Aprobado: Bs 250 (Helena Wójcik)',
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-09 14:22:10',
    user: 'caja@clubpolaco.bo',
    action: 'Emisión de Recibo Manual',
    module: 'Recibos',
    recordId: 'REC-2026-0894',
    ip: '192.168.1.112',
    riskLevel: 'bajo',
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-09 09:12:00',
    user: 'sistema.automatizaciones',
    action: 'Envío Masivo de Recordatorios',
    module: 'WhatsApp',
    recordId: 'BATCH-WA-4421',
    ip: '127.0.0.1',
    riskLevel: 'medio',
    previousValue: '15 socios morosos sin notificar',
    newValue: '15 mensajes despachados a cola WhatsApp',
  },
  {
    id: 'aud-4',
    timestamp: '2026-09-08 17:35:44',
    user: 'admin@clubpolaco.bo',
    action: 'Modificación de Tarifa de Membresía',
    module: 'Membresías',
    recordId: 'mem-2',
    ip: '192.168.1.104',
    riskLevel: 'critico',
    previousValue: 'Familiar: Bs 420',
    newValue: 'Familiar: Bs 450',
  },
  {
    id: 'aud-5',
    timestamp: '2026-09-08 10:20:15',
    user: 'webhook.gateway.bnb',
    action: 'Webhook Payment Approved',
    module: 'Pasarela QR',
    recordId: 'TX-BNB-9812401',
    ip: '200.105.144.12',
    riskLevel: 'bajo',
    transactionId: 'TX-BNB-9812401',
    newValue: 'payment.approved - Liquidado Bs 250',
  },
];

export const INITIAL_WEBHOOKS: WebhookEvent[] = [
  {
    id: 'wh-001',
    transactionId: 'TX-BNB-9812401',
    event: 'payment.approved',
    receivedAt: '2026-09-08 10:20:14',
    status: 'procesado',
    payload: {
      event_id: 'evt_9812401_app',
      transaction_id: 'TX-BNB-9812401',
      qr_id: 'qr_cpol_jan_001',
      amount: 250.00,
      currency: 'BOB',
      bank_code: 'BNB',
      channel: 'SIMPLE_QR_BOLIVIA',
      auth_code: 'AUTH-992144',
      payer: {
        name: 'Jan Kowalski',
        document: '4820100',
        account: 'BNB-***-4091'
      },
      metadata: {
        member_id: 'mem-001',
        quota_id: 'q-0-0',
        club_id: 'CLUB_POLACO_LP'
      }
    }
  },
  {
    id: 'wh-002',
    transactionId: 'TX-BNB-9812401',
    event: 'payment.processing',
    receivedAt: '2026-09-08 10:19:45',
    status: 'procesado',
    payload: {
      event_id: 'evt_9812401_proc',
      transaction_id: 'TX-BNB-9812401',
      status: 'PROCESSING_CLEARING',
      message: 'Operación en proceso de compensación interbancaria'
    }
  },
  {
    id: 'wh-003',
    transactionId: 'TX-CARD-44190',
    event: 'payment.approved',
    receivedAt: '2026-09-08 14:45:02',
    status: 'procesado',
    payload: {
      event_id: 'evt_card_44190_app',
      transaction_id: 'TX-CARD-44190',
      brand: 'VISA',
      last4: '4112',
      amount: 450.00,
      currency: 'BOB',
      authorization: 'AUTH-7712'
    }
  }
];

export const INITIAL_RECONCILIATION: ReconciliationRecord[] = [
  {
    id: 'rec-bn-1',
    bankTxId: 'BNB-STMT-90124',
    crmPaymentId: 'pay-101',
    amount: 250,
    bankDate: '2026-09-08 10:20',
    channel: 'QR Simple BNB',
    status: 'conciliado',
    matchedAt: '2026-09-08 10:22',
  },
  {
    id: 'rec-bn-2',
    bankTxId: 'VISA-STMT-4419',
    crmPaymentId: 'pay-102',
    amount: 450,
    bankDate: '2026-09-08 14:45',
    channel: 'Pasarela Tarjetas',
    status: 'conciliado',
    matchedAt: '2026-09-08 14:46',
  },
  {
    id: 'rec-bn-3',
    bankTxId: 'BISA-TRF-55190',
    crmPaymentId: 'pay-103',
    amount: 450,
    bankDate: '2026-09-09 09:15',
    channel: 'Transferencia Directa',
    status: 'conciliado',
    matchedAt: '2026-09-09 10:00',
  },
  {
    id: 'rec-bn-4',
    bankTxId: 'BNB-STMT-99812',
    amount: 250,
    bankDate: '2026-09-09 16:00',
    channel: 'QR Simple BNB',
    status: 'pendiente',
  },
  {
    id: 'rec-bn-5',
    bankTxId: 'BNB-STMT-77129',
    amount: 255,
    crmPaymentId: 'pay-105',
    differenceAmount: 5,
    bankDate: '2026-09-09 17:30',
    channel: 'QR Simple BNB',
    status: 'diferencia',
  },
];

export const INITIAL_ACCOUNTING_SYNCS: AccountingSyncLog[] = [
  {
    id: 'sync-batch-01',
    batchId: 'BATCH-ACC-20260908',
    timestamp: '2026-09-08 23:59:00',
    syncedCount: 128,
    status: 'completado',
    targetSystem: 'Sistema Contable Siigo / ERP Club Polaco',
    payloadSummary: '128 transacciones de cobros y comisiones asentadas en Libro Auxiliar de Ingresos',
  },
  {
    id: 'sync-batch-02',
    batchId: 'BATCH-ACC-20260909',
    timestamp: '2026-09-09 18:00:00',
    syncedCount: 45,
    status: 'completado',
    targetSystem: 'Sistema Contable Siigo / ERP Club Polaco',
    payloadSummary: '45 transacciones conciliadas exportadas mediante API REST con token Bearer',
  },
];
