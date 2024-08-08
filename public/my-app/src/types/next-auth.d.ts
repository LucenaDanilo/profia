import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser, JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session{
    user:{
      id: string
      email: string
      especialidades: [string]
    }
  }
}