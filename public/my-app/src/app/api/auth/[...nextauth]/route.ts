import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DefaultSession, DefaultUser, JWT as NextAuthJWT } from 'next-auth';



const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'apipost',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch('http://172.19.96.1:8080/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (data && response.ok) {
          const { token, user } = data;
          return { ...user, token };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard',
  },
  callbacks:{
    async jwt({token, user}){
        user && (token.user = user) 
        return token
    },
    async session({session, token}){
        session = token.user as any
        return session
    }
},

};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
