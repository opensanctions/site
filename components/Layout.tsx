import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Footer from './Footer';

import styles from '../styles/Layout.module.scss';
import { IContent } from '../lib/types';
import { BASE_URL, SITE } from '../lib/constants';

type LayoutBaseProps = {
  title?: string,
  description?: string | null,
  imageUrl?: string | null,
  structured?: any,
  activeSection?: string
}

function LayoutBase({ title, description, imageUrl, structured, activeSection, children }: React.PropsWithChildren<LayoutBaseProps>) {
  const router = useRouter();
  const url = `${BASE_URL}${router.asPath}`;
  const fullTitle = `${title} - ${SITE}`
  return (
    <>
      <Head>
        {title && (
          <>
            <title>{fullTitle}</title>
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@open_sanctions" />
        <meta name="twitter:creator" content="@pudo" />
        {!!description && (
          <>
            <meta property="og:description" content={description.trim()} />
            <meta name="description" content={description.trim()} />
          </>
        )}
        {structured && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ '__html': JSON.stringify(structured) }} />
        )}
        <meta property="og:image" content={(!!imageUrl) ? imageUrl : "/static/card.jpg"} />
        <meta name="og:site" content={SITE} />
        <meta property="og:url" content={url} />
      </Head>
      <div className={styles.page}>
        <Navbar activeSection={activeSection} />
        {children}
      </div>
      <Footer />
    </>
  )
}


type LayoutContentProps = {
  content: IContent
}


function LayoutContent({ content, children }: React.PropsWithChildren<LayoutContentProps>) {
  return (
    <LayoutBase title={content.title} description={content.summary} imageUrl={content.image_url} activeSection={content.section}>
      {children}
    </LayoutBase>
  )
}

export default class Layout {
  static Base = LayoutBase;
  static Content = LayoutContent;
}