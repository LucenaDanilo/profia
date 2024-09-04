import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "./providers/authprovider";
import { CartProvider } from "./providers/cartprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profia Academico",
  description: "Portal academico da escola de programação Profia",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: never; 
}) {
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
