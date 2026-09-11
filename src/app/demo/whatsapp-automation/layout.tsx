import React from 'react';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { AppHeader } from '@/components/layout/AppHeader';

export default function WhatsAppAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DemoBanner />
      <AppHeader plan="estandar" />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
