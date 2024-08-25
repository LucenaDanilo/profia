import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "./providers/authprovider";
import { CartProvider } from "./providers/cartprovider";
import { Session } from 'next-auth';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profia Academico",
  description: "Portal academico da escola de programação Profia",
};

interface RootLayoutProps {
  session: Session | null;
  children: React.ReactNode;
}

export default function RootLayout({ session, children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider session={session}>
          <CartProvider>
            {children}
          </CartProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
