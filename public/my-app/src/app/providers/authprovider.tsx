'use client'
import { ReactNode } from "react";
import {SessionProvider} from 'next-auth/react'
import  {Session} from 'next-auth'

interface NextAuthSessionProvider{
    children: ReactNode
    session: Session | null;  
}

export default function NextAuthSessionProvider({children, session}: NextAuthSessionProvider){
    return <SessionProvider session={session}> {children}</SessionProvider>
}