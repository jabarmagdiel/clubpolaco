"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Sparkles,
  Bot,
  Zap,
  CheckCircle2,
  Clock,
  Send,
  Users,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
  Play,
  RotateCcw,
  Smartphone,
  PhoneCall,
  Calendar,
  AlertTriangle,
  Gift,
  HelpCircle
} from 'lucide-react';
import { useCRM } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { formatCurrency } from '@/lib/utils';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function WhatsAppAutomationPage() {
  const { members, whatsappTemplates } = useCRM();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<'bot' | 'reglas' | 'campana' | 'roi'>('bot');
  const [selectedMember, setSelectedMember] = useState(members[0]);
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);

  // Chat simulator state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Bienvenido al canal oficial automatizado del Club Polanco! 🏛️\n¿En qué podemos ayudarte hoy?',
      time: '10:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  // Rules toggles
  const [rules, setRules] = useState([
    {
      id: 'r1',
      name: 'Recordatorio Preventivo de Cuota',
      trigger: '3 días antes del vencimiento (día 7)',
      audience: 'Socios con cuotas ordinarias pendientes',
      count: 34,
      enabled: true,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      id: 'r2',
      name: 'Aviso de Vencimiento de Cuota',
      trigger: 'Día exacto de vencimiento (día 10 a las 10:00 AM)',
      audience: 'Socios que no registraron su pago',
      count: 22,
      enabled: true,
      icon: AlertTriangle,
      color: 'text-rose-600 bg-rose-50'
    },
    {
      id: 'r3',
      name: 'Cobranza Firme de Mora Escalonada',
      trigger: '15 días después del vencimiento (día 25)',
      audience: 'Socios con 1 o más cuotas en retraso',
      count: 15,
      enabled: true,
      icon: Zap,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'r4',
      name: 'Saludos de Cumpleaños Institucional',
      trigger: 'Día del cumpleaños a las 09:00 AM',
      audience: 'Cumpleañeros del día con tarjeta oficial',
      count: 2,
      enabled: true,
      icon: Gift,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 'r5',
      name: 'Comunicados de Eventos & Torneos',
      trigger: '48 horas antes de cada evento o asamblea',
      audience: 'Todos los socios activos',
      count: 50,
      enabled: true,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50'
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    toast({
      type: 'info',
      title: 'Regla actualizada',
      message: 'El estado de la regla de automatización ha sido modificado.'
    });
  };

  // Bot interaction simulation
  const handleQuickQuestion = (question: string, reply: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: question,
      time: timeNow
    };

    setChatMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: inputText,
      time: timeNow
    };

    setChatMessages(prev => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    setTimeout(() => {
      let reply = 'Gracias por comunicarte con el Club Polanco. Un operador de la administración revisará tu mensaje en breve.';

      if (query.includes('saldo') || query.includes('debo') || query.includes('cuota') || query.includes('pago')) {
        reply = `Estimado(a) socio(a), de acuerdo con nuestros registros, su saldo pendiente actual es de ${formatCurrency(selectedMember.balance || 250)}. Puede realizar su pago por transferencia o consultar su QR institucional.`;
      } else if (query.includes('torneo') || query.includes('evento') || query.includes('actividad') || query.includes('sabado')) {
        reply = '🏆 Agenda del Club Polanco este fin de semana:\n• Sábado 09:00: Torneo interno de Tenis categoría Dobles.\n• Sábado 13:00: Almuerzo gastronómico campestre y parrillada.\n• Domingo 10:00: Encuentro de confraternización de socios.';
      } else if (query.includes('cuenta') || query.includes('banco') || query.includes('transferencia')) {
        reply = '🏦 Cuentas Oficiales del Club Polanco:\n• Banco Nacional de Bolivia (BNB): Cta Cte Nº 1000-293819\n• Titular: Club Polanco\n• NIT: 1028391024\nUna vez realizado el depósito, envíe aquí su comprobante para emisión inmediata de su recibo.';
      } else if (query.includes('invitado') || query.includes('amigo')) {
        reply = 'ℹ️ Política de Invitados: Los socios pueden ingresar con hasta 2 invitados de cortesía para instalaciones sociales. Para uso de canchas deportivas se abona el arancel reglamentario en portería.';
      }

      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  // Mass campaign dispatch simulation
  const handleTriggerCampaign = () => {
    setIsSending(true);
    setSendProgress(10);

    const interval = setInterval(() => {
      setSendProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSending(false);
          toast({
            type: 'success',
            title: 'Campaña WhatsApp Completada',
            message: 'Se despacharon exitosamente 15 recordatorios con 100% de tasa de entrega.'
          });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleTestRule = (ruleName: string) => {
    toast({
      type: 'success',
      title: 'Disparo de prueba ejecutado',
      message: `La regla "${ruleName}" procesó 15 socios con éxito. Recibieron el aviso en tiempo real.`
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner / Breadcrumb */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/60 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-sm">
              <Sparkles className="w-3 h-3" />
              Propuesta Especializada / Módulo Extra
            </span>
            <span className="text-xs text-emerald-300 font-medium">
              100% Independiente • Sin necesidad de cambiar su sistema actual
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Automatización de Mensajería & Cobranza por WhatsApp
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Plataforma inteligente diseñada específicamente para el Club Polanco. Dispara recordatorios preventivos, avisos de vencimiento, cobranza escalonada, saludos de cumpleaños y atiende a los socios 24/7 con un asistente virtual interactivo.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              ← Volver a Portada Comercial
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-3 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Se conecta a cualquier Excel o sistema contable en menos de 48 horas
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tasa de Lectura</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">98.4%</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            vs 18% del correo electrónico tradicional
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Respuesta Rápida</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">&lt; 3 min</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Tiempo medio de consulta de los socios
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recuperación de Mora</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 mt-2">+42%</div>
          <div className="text-[11px] text-slate-500 mt-1">
            En los primeros 30 días de implementación
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ahorro Administrativo</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700 mt-2">32 hrs/mes</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Menos llamadas y mensajes manuales de cobranza
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-2xs gap-1.5 overflow-x-auto">
        <button
          onClick={() => setActiveTab('bot')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'bot'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>1. Asistente Bot Interactivo (Simulador en Vivo)</span>
        </button>

        <button
          onClick={() => setActiveTab('reglas')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'reglas'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>2. Motor de Reglas Automáticas (5 Reglas)</span>
        </button>

        <button
          onClick={() => setActiveTab('campana')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'campana'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>3. Campaña Masiva con 1 Clic</span>
        </button>

        <button
          onClick={() => setActiveTab('roi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'roi'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>4. Ventajas de Implementación Rápida</span>
        </button>
      </div>

      {/* TAB 1: ASISTENTE BOT INTERACTIVO */}
      {activeTab === 'bot' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls & Quick Questions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-900">Demostración con el Cliente</h2>
                  <p className="text-xs text-slate-500">
                    Haga clic en los escenarios típicos para ver cómo responde el bot automáticamente:
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <button
                  onClick={() => handleQuickQuestion(
                    'Hola, ¿cuánto es mi saldo pendiente y cómo puedo pagar?',
                    `Estimado socio ${selectedMember.fullName}, su saldo actual al día de hoy es de ${formatCurrency(selectedMember.balance || 250)} correspondiente a cuotas ordinarias. Puede transferir al Banco BNB Nº 1000-293819 o responder "PAGAR" para recibir su enlace directo.`
                  )}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs font-medium text-slate-800 transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    1. "¿Cuánto debo y cómo pago?"
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleQuickQuestion(
                    '¿Qué actividades o torneos hay programados este fin de semana en el Club?',
                    '🏆 Estimado socio, la agenda deportiva del Club Polanco es:\n• Sábado 09:00: Torneo de Tenis Dobles Senior.\n• Sábado 13:00: Almuerzo de fraternidad de socios.\n• Domingo 10:30: Práctica libre en canchas de fútbol y recreación infantil.'
                  )}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs font-medium text-slate-800 transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    2. "¿Qué eventos hay este fin de semana?"
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleQuickQuestion(
                    'Acabo de hacer la transferencia, ¿a dónde les mando el comprobante?',
                    '✅ ¡Excelente! Puede adjuntar la foto o captura de su comprobante directamente en este chat. El sistema reconocerá su número de socio (#POL-001) y le enviará su Recibo Oficial timbrado en menos de 5 minutos.'
                  )}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs font-medium text-slate-800 transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    3. "Enviar comprobante de pago"
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => handleQuickQuestion(
                    '¿Puedo llevar invitados a la piscina este domingo?',
                    'ℹ️ Con su categoría actual (Individual Activo), tiene habilitado el ingreso de hasta 2 invitados sociales. Para uso de instalaciones acuáticas el pase diario de invitado es de Bs 35 por persona que puede abonar en recepción.'
                  )}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs font-medium text-slate-800 transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    4. "¿Puedo llevar invitados?"
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setChatMessages([
                    {
                      id: '1',
                      sender: 'bot',
                      text: '¡Bienvenido al canal oficial automatizado del Club Polanco! 🏛️\n¿En qué podemos ayudarte hoy?',
                      time: '10:00 AM'
                    }
                  ])}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reiniciar conversación
                </button>

                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  🟢 Bot en Línea (24/7)
                </span>
              </div>
            </div>

            {/* Explanatory card for the client */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                ¿Cómo funciona para el Club Polanco?
              </div>
              <p className="text-slate-300 leading-relaxed">
                El asistente virtual se configura con las respuestas oficiales del Club (cuentas bancarias, horarios, aranceles, estatuto). Cuando un socio escribe a cualquier hora, recibe atención inmediata sin saturar al personal administrativo.
              </p>
            </div>
          </div>

          {/* Smartphone Simulator */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[420px] bg-slate-950 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="h-5 w-36 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-950" />
              </div>

              {/* WhatsApp Screen */}
              <div className="bg-[#efeae2] rounded-[32px] overflow-hidden flex flex-col h-[580px] shadow-inner">
                
                {/* WhatsApp Header */}
                <div className="bg-[#075e54] text-white p-3 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-polaco-700 text-white font-black text-xs flex items-center justify-center border-2 border-white/40">
                      CP
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">Club Polanco Oficial</div>
                      <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        en línea (asistente virtual)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/80">
                    <PhoneCall className="w-4 h-4" />
                    <Bot className="w-4 h-4 text-emerald-300" />
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                  <div className="text-center my-2">
                    <span className="text-[9px] bg-white/80 text-slate-600 px-2.5 py-0.5 rounded-md shadow-2xs font-medium">
                      HOY • MENSAJES CIFRADOS DE EXTREMO A EXTREMO
                    </span>
                  </div>

                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-1`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl p-3 text-xs shadow-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#d9fdd3] text-slate-900 rounded-tr-none'
                            : 'bg-white text-slate-900 rounded-tl-none'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <div className="text-[9px] text-slate-400 text-right mt-1 flex items-center justify-end gap-1">
                          <span>{msg.time}</span>
                          {msg.sender === 'user' && <span className="text-blue-500 font-bold">✓✓</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Input Bar */}
                <form onSubmit={handleSendMessage} className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-slate-200">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Escriba un mensaje de prueba..."
                    className="flex-1 bg-white text-xs text-slate-900 px-3.5 py-2.5 rounded-full border border-slate-300 focus:outline-hidden focus:border-emerald-600 shadow-xs"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-[#00a884] text-white flex items-center justify-center shrink-0 hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MOTOR DE REGLAS AUTOMÁTICAS */}
      {activeTab === 'reglas' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Reglas Programadas de Cobranza & Notificaciones
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  El sistema evalúa todos los días a las 08:30 AM los vencimientos y cumpleaños, y dispara los mensajes de forma silenciosa y automática.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Motor Activo: 5 Reglas
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {rules.map((rule) => {
                const IconComponent = rule.icon;
                return (
                  <div
                    key={rule.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      rule.enabled ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${rule.color}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{rule.name}</h3>
                          <span className="text-[11px] text-slate-500 block mt-0.5">
                            Disparador: <strong>{rule.trigger}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Toggle */}
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                          rule.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                            rule.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Destinatarios estimados: <strong>{rule.count} socios</strong>
                      </span>
                      <button
                        onClick={() => handleTestRule(rule.name)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        Probar Disparo
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAÑA MASIVA CON 1 CLIC */}
      {activeTab === 'campana' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Lanzador de Campañas Masivas WhatsApp
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Envíe avisos urgentes a toda la cartera de morosos o comunicados generales en un solo clic.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-polaco-50 text-polaco-700 border border-polaco-200">
                15 Morosos Seleccionados
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Form & Dispatch */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Grupo Objetivo
                </label>
                <select className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 font-medium">
                  <option>Todos los socios con mora mayor a 30 días (15 socios)</option>
                  <option>Todos los socios activos del Club Polanco (50 socios)</option>
                  <option>Categoría Tenis & Deportes (22 socios)</option>
                  <option>Categoría Vitalicios & Honorarios (12 socios)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Plantilla Homologada
                </label>
                <select className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 font-medium">
                  <option>Aviso Urgente de Cuotas Vencidas (Con enlace de pago)</option>
                  <option>Invitación a Asamblea General Extraordinaria</option>
                  <option>Convocatoria a Torneo Anual de Tenis</option>
                  <option>Actualización de Datos de Socio</option>
                </select>
              </div>

              {/* Progress bar during sending */}
              {isSending && (
                <div className="space-y-2 p-4 bg-emerald-50 rounded-xl border border-emerald-200 animate-in fade-in">
                  <div className="flex justify-between text-xs font-bold text-emerald-900">
                    <span>Enviando mensajes vía WhatsApp Cloud API...</span>
                    <span>{sendProgress}%</span>
                  </div>
                  <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full transition-all duration-300"
                      style={{ width: `${sendProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleTriggerCampaign}
                disabled={isSending}
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Procesando Envío...' : 'Disparar Campaña Masiva a 15 Socios'}</span>
              </button>
            </div>

            {/* Live Message Preview */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-slate-600" />
                Vista Previa del Mensaje Personalizado
              </div>

              <div className="bg-[#d9fdd3] p-4 rounded-2xl text-xs text-slate-900 shadow-xs border border-emerald-200 space-y-2 leading-relaxed">
                <p className="font-bold text-[#075e54]">🏛️ CLUB POLANCO — RECORDATORIO DE CUOTA</p>
                <p>Estimado(a) socio(a) <strong>Jan Kowalski</strong> (Código: #POL-001):</p>
                <p>Le saludamos cordialmente. Le recordamos que a la fecha registra un saldo pendiente de <strong>Bs 500</strong> correspondiente a sus cuotas mensuales de la categoría <strong>Deportes</strong>.</p>
                <p>Agradecemos regularizar su membresía para mantener habilitado el ingreso a todas las instalaciones deportivas y sociales del club.</p>
                <p className="text-[11px] text-slate-600 pt-2 border-t border-emerald-300">
                  Puede transferir al Banco BNB Cta 1000-293819 o responder a este mensaje con la palabra <strong>PAGAR</strong>.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span>Variables dinámicas detectadas:</span>
                <span className="font-mono text-emerald-700 font-bold">3 reemplazos automáticos</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: VENTAJAS COMERCIALES (ROI) */}
      {activeTab === 'roi' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              Cero Migración de Software
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Si el Club Polanco ya utiliza Excel o un sistema contable de escritorio, este módulo se conecta directamente sin obligarlos a cambiar sus procesos actuales.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              Implementación en 48 Horas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Configuración inmediata del número institucional de WhatsApp del Club Polanco, carga de las plantillas oficiales y puesta en marcha del bot.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              Canal Oficial Verificado
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uso de la API oficial de WhatsApp Business (Meta Cloud API). Cero riesgo de bloqueos o suspensión de línea telefónica institucional.
            </p>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            ¿Desea combinarlo o contratarlo por separado?
          </span>
          <h3 className="text-xl font-black text-white">
            Disponible como Propuesta Independiente o Módulo Adicional
          </h3>
          <p className="text-xs text-slate-400">
            Se adapta al presupuesto y requerimiento prioritario de la directiva del Club Polanco.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/comparar"
            className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            Comparar Todos los Módulos
          </Link>
          <Link
            href="/demo/estandar/dashboard"
            className="py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black transition-colors shadow-md flex items-center gap-1.5"
          >
            <span>Ver Plan Estándar CRM</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
