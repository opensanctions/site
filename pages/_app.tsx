import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'

import { SSRProvider } from '@react-aria/ssr';
import { SessionProvider } from 'next-auth/react'

import '../styles/globals.scss'
import Analytics from '../components/Analytics';

export default function OpenSanctionsApp({ 
  Component,
  pageProps: { session, ...pageProps }, 
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Analytics />
        <Component {...pageProps} />
      </SSRProvider>
    </SessionProvider>
  );
}
