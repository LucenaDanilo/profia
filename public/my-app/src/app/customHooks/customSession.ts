"use client"
import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  especialidades?: string[];
}

interface Session {
  user: User;
}

function customSession() {
  const [sessionHook, setSessionHook] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData: any = await getSession();
        if (sessionData) {
          const session: Session = {
            user: sessionData.user,
          };
          setSessionHook(session);
        } else {
          setSessionHook(null);
        }
      } catch (error: any) {
        console.log('Erro ao pegar session do backend: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { sessionHook, loading };
}
export default customSession;