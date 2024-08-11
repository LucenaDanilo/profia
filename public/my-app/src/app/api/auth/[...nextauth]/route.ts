import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'apipost',
      credentials: {
        email: { label: 'Email', type: 'text' },
        userType: { label: 'User Type', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            userType: credentials?.userType,
          }),
        });

        const user = await response.json();

        if(user && response.ok){
          return user
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard',
  },
  callbacks: {
    async jwt({token,user}){
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
