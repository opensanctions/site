'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

import * as gtag from '../lib/gtag'

export default function Analytics() {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  ad_storage: "denied",
                  analytics_storage: "denied",
                  functionality_storage: "denied",
                  personalization_storage : "denied",
                  security_storage : "denied",
                });
              `,
        }}
      />
    </>
  );
}