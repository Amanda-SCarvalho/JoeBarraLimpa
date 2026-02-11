import "./globals.css";
import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: {
    default: "Elétrica e Modificações Scania",
    template: "%s | Elétrica e Modificações Scania",
  },
  description:
    "Especialistas em elétrica automotiva e modificações para caminhões Scania.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors">
        <ThemeProvider>
          <CartProvider>
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
