import React from 'react';
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Twitter, Github, HeartFill, Slack } from 'react-bootstrap-icons';

import styles from '../styles/Footer.module.scss';
import { LICENSE_URL, SPACER } from '../lib/constants';

export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
        <Container>
          <Row>
            <Col md={3}>
              <img
                src="/static/ura/logo_footer.svg"
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
                      <Link href="/datasets/peps/">Politically exposed persons</Link>
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
                      <Link href="https://bit.ly/osa-slack"><Slack /></Link>
                      {' '}
                      <Link href="https://bit.ly/osa-slack">Slack chat</Link>
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
        </Container >
      </div >
    )
  }
}