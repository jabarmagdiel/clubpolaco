import React from 'react';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { AppHeader } from '@/components/layout/AppHeader';
import { Sidebar } from '@/components/layout/Sidebar';

export default function DirectoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <DemoBanner />
      <AppHeader plan="directo" />
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar plan="directo" />
        <main className="flex-1 p-6 overflow-x-hidden min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
