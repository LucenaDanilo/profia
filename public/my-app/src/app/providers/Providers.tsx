'use client';
import MyProvider from "./testeprovider";
import { SessionProvider } from "next-auth/react";
export function Providers({ children }: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <MyProvider>{children}</MyProvider>
    </SessionProvider>
  );
}