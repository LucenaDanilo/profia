// @ts-ignore
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./providers/cartprovider";
import { Session } from "next-auth";
import { NextAuthProvider } from "./providers/authprovider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profia Academico",
  description: "Portal academico da escola de programação Profia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <NextAuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
       </NextAuthProvider>       
      </body>
    </html>
  );
}
