'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import customSession from '../customHooks/customSession';

interface User {
  id: string;
  email: string;
  name: string;
  userRole: string;
}

interface Session {
  user: User;
}

interface MyContextType {
  soraka: string;
  setSoraka: React.Dispatch<React.SetStateAction<string>>;
  sessionHook: Session | null;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export default function MyProvider({ children }: { children: ReactNode }) {
  const [sessionHook, setSessionHook] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [soraka, setSoraka] = useState("Vasco");

  useEffect(() => {
    async function fetchSession() {
      const { sessionHook } = await customSession();
      setSessionHook(sessionHook);
      setLoading(false);
    }

    fetchSession();
  }, []);

  if (loading) {
    // Você pode renderizar um spinner ou algo enquanto espera a sessão carregar
    return <div>Carregando...</div>;
  }

  return (
    <MyContext.Provider value={{ soraka, setSoraka, sessionHook }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext deve ser usado dentro de MyProvider');
  }
  return context;
}
