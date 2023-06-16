import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { Twitter, Github, HeartFill, Slack } from 'react-bootstrap-icons';

import { CLAIM, LICENSE_URL, SPACER } from '../../lib/constants';
import { Row, Col, Container } from '../wrapped';
import styles from '../../styles/Footer.module.scss';
import { Spacer } from '../util';

export default function Footer() {
  return (
    <>
      <div className={classNames("d-print-none", styles.footer)}>
        <Container>
          <Row>
            <Col md={3}>
              <img
                src="https://assets.opensanctions.org/images/ura/logo_footer.svg"
                alt="OpenSanctions project"
                className={styles.logo}
                width="100%"
              />
            </Col>
            <Col md={9}>
              <Row>
                <Col md={4}>
                  <strong>Project</strong>
                  <ul>
                    <li>
                      <Link href="/docs/about/">About OpenSanctions</Link>
                    </li>
                    <li>
                      <Link href="/docs/">Documentation</Link>
                    </li>
                    <li>
                      <Link href="/licensing/">Commercial use</Link>
                    </li>
                  </ul>
                </Col>
                <Col md={4}>
                  <strong>Collections</strong>
                  <ul>
                    <li>
                      <Link href="/datasets/sanctions/">Consolidated global sanctions</Link>
                    </li>
                    <li>
                      <Link href="/pep/">Politically exposed persons</Link>
                    </li>
                    <li>
                      <Link href="/datasets/crime/">Criminal watchlists</Link>
                    </li>
                  </ul>
                </Col>
                <Col md={4}>
                  <strong>Keep in touch</strong>
                  <ul>
                    <li>
                      <Link href="/slack/"><Slack /></Link>
                      {' '}
                      <Link href="/slack/">Slack chat</Link>
                    </li>
                    <li>
                      <Link href="https://twitter.com/open_sanctions"><Twitter /></Link>
                      {' '}
                      <Link href="https://twitter.com/open_sanctions">Twitter</Link>
                    </li>
                    <li>
                      <Link href="https://github.com/opensanctions/opensanctions"><Github /></Link>
                      {' '}
                      <Link href="https://github.com/opensanctions/opensanctions">Github code</Link>
                    </li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <p className={styles.copyright}>
                  The data published on this site is licensed under
                  the terms of <Link href={LICENSE_URL} rel="license">Creative Commons 4.0 Attribution NonCommercial</Link>.
                </p>
                <p className={styles.copyright}>
                  Made with <HeartFill className={styles.love} /> in Berlin
                  {SPACER}
                  <Link href="/impressum/">Impressum</Link>
                  {SPACER}
                  <Link href="/docs/privacy/">Privacy policy</Link>
                </p>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={classNames(styles.printFooter, "d-none", "d-print-block")}>
        <Container>
          <div className={styles.footerImprint}>
            <strong>OpenSanctions</strong> <Spacer /> {CLAIM}<br />
            OpenSanctions Datenbanken GmbH <Spacer /> Registered at: AG Charlottenburg, HRB 251172<br />
            {/* Schonensche Str. 43, 13189 Berlin<br /> */}
            info@opensanctions.org <Spacer /> <Link href="https://opensanctions.org/meeting">https://opensanctions.org/meeting</Link>
          </div>
        </Container>
      </div >
    </>
  )
}