import type { Metadata } from "next";
import "./globals.css";
import { CRMProvider } from "@/lib/store";
import { ToastProvider } from "@/lib/toast";

export const metadata: Metadata = {
  title: "CRM Club Polaco — Prototipo Comercial Multiversión",
  description: "Sistema Integral de Gestión de Socios, Cuotas y Cobranza para el Club Polaco. Comparativa interactiva de versiones Económico, Estándar y Completo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <CRMProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CRMProvider>
      </body>
    </html>
  );
}
