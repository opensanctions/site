// 'use client';

import React from 'react';

import Navigation from './Navigation';
import Footer from './Footer';
import { CookieConsent } from '../Consent';
import styles from '../../styles/Layout.module.scss';

type LayoutFrameProps = {
  activeSection?: string
}

export default function LayoutFrame({ activeSection, children }: React.PropsWithChildren<LayoutFrameProps>) {
  return (
    <>
      <div className={styles.page}>
        <Navigation activeSection={activeSection} />
        {children}
        {/* <CookieConsent /> */}
      </div>
      <Footer />
    </>
  )
}
