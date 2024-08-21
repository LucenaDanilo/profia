import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser, JWT } from 'next-auth';
import type { User } from 'next-auth';
declare module 'next-auth' {
  interface Session{
    user: User &{
      id: string
      name: string
      email: string
      userRole: string
      responsibleCPF?: string
      registration?: string
      birthday?:string
      points?: number
      hrAula?: number
      especialidade?:string
    }
  }
}