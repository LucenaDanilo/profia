import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser, JWT as NextAuthJWT } from 'next-auth';

// Define o tipo de usuário conforme o retorno da sua API
export interface User {
  id: string;
  name?: string;
  email?: string;
  userRole?: string;
}

// Define a interface JWT para incluir as propriedades que você deseja
export interface JWT extends NextAuthJWT {
  id?: string;
  name?: string;
  email?: string;
  userRole?: string;
  token?: string;
}

// Define a interface do usuário na sessão
export interface SessionUser {
  token: string;
  user: User;
}

// Define a interface da sessão para incluir o objeto `user` com `SessionUser`
export interface Session extends DefaultSession {
  user: SessionUser;
}

// Atualiza a interface padrão do NextAuth
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: SessionUser;
  }
  interface JWT extends NextAuthJWT {
    id?: string;
    name?: string;
    email?: string;
    userRole?: string;
    token?: string;
  }
}
