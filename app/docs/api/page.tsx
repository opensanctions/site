import Link from 'next/link';

import Content from '../../../components/Content';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardFooter, Table, Button, CardGroup } from '../../../components/wrapped';
import { getContentBySlug } from '../../../lib/content';
import { CreditCard2BackFill, InfoSquareFill } from 'react-bootstrap-icons';
import { API_URL } from '../../../lib/constants';
import LayoutFrame from '../../../components/layout/LayoutFrame';

import styles from '../../../styles/API.module.scss';

export default async function Page() {
  const content = await getContentBySlug('api');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Context content={content}>
        <CardGroup className={styles.apiOptionsPanel}>
          <Card className={styles.firstColumn} text="white">
            <CardBody>
              <CardTitle>OpenSanctions API service</CardTitle>
              <CardText>
                Easily integrate up-to-date sanctions and PEPs data
                into your screening or research processes.
              </CardText>
              <ul className={styles.featureList}>
                <li>Powerful API for entity matching and search</li>
                <li>30 sanctions lists, 160,000+ PEPs, 11 crime lists</li>
                <li>Pay-as-you-go pricing</li>
              </ul>
              <Table size="sm" variant="dark" className={styles.pricingTable}>
                <thead>
                  <tr>
                    <th>Calls per month</th>
                    <th className="numeric">Price per call</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>up to 1,000</td>
                    <td className="numeric">0.30 €</td>
                  </tr>
                  <tr>
                    <td>1,000 - 10,000</td>
                    <td className="numeric">0.20 €</td>
                  </tr>
                  <tr>
                    <td>more than 10,000</td>
                    <td className="numeric">0.10 €</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Button href={`${API_URL}/stripe/subscribe`} variant="secondary">
                <CreditCard2BackFill className="bsIcon" /> Sign up now
              </Button>
            </CardFooter>
          </Card>
          <Card className={styles.secondColumn} text="white">
            <CardBody>
              <CardTitle>On-premises solution</CardTitle>
              <CardText>
                Run our API software on your own infrastructure to be in
                control of scaling and protect data privacy.
              </CardText>
              <ul className={styles.featureList}>
                <li>Use our open source matching software</li>
                <li>Pay for a single <Link href="/licensing/">bulk data license</Link> to use our data</li>
                <li>Run as many requests as you need</li>
                <li>Include additional, in-house datasets in matcher</li>
                <li>Customer data remains entirely on your systems</li>
              </ul>
            </CardBody>
            <CardFooter>
              <Button href="/docs/self-hosted/" variant="light">
                <InfoSquareFill className="bsIcon" /> Learn more
              </Button>
            </CardFooter>
          </Card>
        </CardGroup>
        <Row>
          <Col md={4}>
            <h5>Service guidance</h5>
            <ul>
              <li><Link href={API_URL}>Service (API) documentation</Link></li>
              <li><Link href="/service/account/">Account and usage dashboard</Link></li>
              <li>Tutorial: <Link href="/articles/2022-02-01-matching-api/">Using the matching API</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Data coverage</h5>
            <ul>
              <li><Link href="/datasets/#sources">Dataset overview</Link></li>
              <li><Link href="/reference/">Data dictionary</Link></li>
              <li><Link href="/research/">Explore the data</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Commercial information</h5>
            <ul>
              <li><Link href="/docs/commercial-faq/">Commercial use FAQ</Link></li>
              <li><Link href="/docs/terms/">Terms of service</Link></li>
              <li><Link href="/docs/privacy/">Privacy policy</Link></li>
            </ul>
          </Col>
        </Row>
      </Content.Context>
    </LayoutFrame>
  )
}
