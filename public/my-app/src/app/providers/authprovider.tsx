// // src/app/providers/authprovider.tsx
// "use client";
// import { SessionProvider } from "next-auth/react";
// import { Session } from "next-auth";
// interface Props {
//   session: Session;
// }

// export default function NextAuthSessionProvider({ children, session}: {children: React.ReactNode, }) {
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// }

"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};