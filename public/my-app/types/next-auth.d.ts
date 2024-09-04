// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      userRole: string;
      responsibleCPF?: string;
      registration?: string;
      birthday?: string;
      points?: number;
      hrAula?: number;
      especialidade?: string;
    } & DefaultSession["user"];
  }
}
