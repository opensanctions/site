import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { IContent } from '../lib/types'
import { JSONLink, Markdown, RoutedNavLink, Summary } from './util';

import styles from '../styles/Content.module.scss';
import { LicenseInfo } from './Policy';
import Link from 'next/link';

type ContentProps = {
  content: IContent
}

function ContentBody({ content }: ContentProps) {
  return <Markdown markdown={content.content} />;
}

type ContentMenuProps = {
  title: string
  jsonLink?: string
}

function ContentMenu({ title, children, jsonLink }: React.PropsWithChildren<ContentMenuProps>) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>
            {title}
            {jsonLink && (<JSONLink href={jsonLink} />)}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          {children}
        </Col>
        <Col md={3}>
          <Nav className="flex-column justify-content-start" variant="pills">
            <Nav.Item>
              <RoutedNavLink href="/docs/about/">About OpenSanctions</RoutedNavLink>
              <Nav.Item>
                <RoutedNavLink href="/docs/faq/">Frequently asked questions</RoutedNavLink>
              </Nav.Item>
            </Nav.Item>
            <Nav.Item>
              <RoutedNavLink href="/docs/usage/">Using the data</RoutedNavLink>
              <Nav.Item>
                <RoutedNavLink href="/docs/entities/">Entity structure</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/reference/">Data dictionary</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/docs/identifiers/">Identifiers and de-duplication</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/docs/pairs/">Matcher training data</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/docs/statements/">Statement-based data</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/docs/enrichment/">Data enrichment</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/docs/contribute/">Contribute a source</RoutedNavLink>
              </Nav.Item>
            </Nav.Item>
            <Nav.Item>
              <RoutedNavLink href="/docs/api/">Using the API</RoutedNavLink>
              <Nav.Item>
                <RoutedNavLink href="/matcher/">How we score matches</RoutedNavLink>
              </Nav.Item>
              <Nav.Item>
                <RoutedNavLink href="/docs/self-hosted/">Self-hosted API</RoutedNavLink>
              </Nav.Item>
            </Nav.Item>
            <Nav.Item>
              <RoutedNavLink href="/licensing/">Licensing the data</RoutedNavLink>
              <Nav.Item>
                <RoutedNavLink href="/docs/commercial-faq/">Commercial use FAQ</RoutedNavLink>
              </Nav.Item>
            </Nav.Item>
            <Nav.Item>
              <RoutedNavLink href="/contact/">Contact us</RoutedNavLink>
            </Nav.Item>
          </Nav>
          <LicenseInfo />
        </Col>
      </Row>
    </Container>
  )
}

function ContentPage({ content }: ContentProps) {
  return (
    <ContentMenu title={content.title}>
      <Summary summary={content.summary} />
      <div className={styles.page}>
        <ContentBody content={content} />
        <Card>
          <Card.Body>
            <strong>Got more questions?</strong> Join the <Link href="https://bit.ly/osa-slack">Slack
              chat</Link> to ask questions and get support. You can
            also <Link href="https://book.stripe.com/28o1513OFca54nufZf">book an hour of consulting time</Link> to
            discuss technical questions with the team.
          </Card.Body>
        </Card>
      </div>
    </ContentMenu>
  )
}

export default class Content {
  static Body = ContentBody;
  static Page = ContentPage;
  static Menu = ContentMenu;
}