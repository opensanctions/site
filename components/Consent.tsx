'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import * as gtag from '../lib/gtag'
import { Row, Col, Container, ButtonGroup, Button } from "./wrapped";

import styles from '../styles/Consent.module.scss';


export function CookieConsent() {
  const [consent, setConsent] = useState('server');

  useEffect(function () {
    const storedConsent = localStorage.getItem("analytics-consent") || "ask";
    setConsent(storedConsent);
    gtag.consent(storedConsent);
  }, []);

  const configureConsent = (consent: string) => {
    localStorage.setItem("analytics-consent", consent);
    setConsent(consent);
    gtag.consent(consent);
  }

  if (consent !== 'ask') {
    return null;
  }

  return (
    <div className={styles.consentBox}>
      <Container>
        <Row>
          <Col md="8">
            <p>
              OpenSanctions would like to use analytics to better understand how
              people use the service.
              <br />
              For more information, read our <Link href="/docs/privacy/">privacy policy</Link>.
            </p>
          </Col>
          <Col md="4" className={styles.consentButtons}>
            <ButtonGroup>
              <Button onClick={() => configureConsent('granted')} variant="secondary">OK</Button>
              <Button onClick={() => configureConsent('denied')} variant="light">Disable</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}