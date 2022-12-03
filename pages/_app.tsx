import type { AppProps } from 'next/app'
import { SSRProvider } from '@react-aria/ssr';

import '../styles/globals.scss'
import Analytics from '../components/Analytics';

export default function OpenSanctionsApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Analytics />
      <Component {...pageProps} />
    </SSRProvider>
  );
}
