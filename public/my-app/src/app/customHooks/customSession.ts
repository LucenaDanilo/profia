"use client"
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  userRole: string;
}

interface Session {
  user: User;
}

async function customSession(): Promise<{ sessionHook: Session | null; loading: boolean }> {
  const { data: session, status } = useSession();
  const [sessionHook, setSessionHook] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      if (session) {
        const customSession: Session = {
          user: session.user as any,
        };
        console.log("minha sessao", session);
        setSessionHook(customSession);
      } else {
        console.log("to caindo aqui socorro");
        setSessionHook(null);
      }
    }

    fetchSession();
  }, [session]);

  const loading = status === 'loading';

  // Aguardando até que o useEffect seja executado
  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (sessionHook !== null || status === 'loading') {
        clearInterval(interval);
        resolve();
      }
    }, 5000);
  });

  return { sessionHook, loading };
}

export default customSession;
