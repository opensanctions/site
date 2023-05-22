"use client";
import '../styles/globals.scss'
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth'

// export const metadata = {
//   title: {
//     template: '%s - OpenSanctions',
//     default: 'OpenSanctions'
//   },
// }

interface Props {
  session: Session | null;
  children: React.ReactNode;
}


export default function RootLayout({ children, session }: Props) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
