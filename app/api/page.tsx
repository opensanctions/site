import Link from 'next/link';

import Content from '../../components/Content';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardFooter, Table, Button, CardGroup } from '../../components/wrapped';
import { getContentBySlug } from '../../lib/content';
import { CreditCard2BackFill, InfoSquareFill } from 'react-bootstrap-icons';
import { API_URL, REVALIDATE_BASE } from '../../lib/constants';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getContentMetadata } from '../../lib/meta';
import { signIn, useSession } from "next-auth/react"

import styles from '../../styles/API.module.scss';


export const revalidate = REVALIDATE_BASE;


export async function generateMetadata() {
  const content = await getContentBySlug('api/index');
  return getContentMetadata(content);
}


export default async function Page() {
  const { data: session } = useSession();
  const content = await getContentBySlug('api/index');
  return (
  <>
    <LayoutFrame activeSection={content.section}>
      <Content.Context content={content}>
        <CardGroup className="themed-card-group">
          <Card className="themed-card-dark">
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
              {!session && (
              <>
                <Button size="lg" variant="secondary"
                  href={`/api/auth/signin`}
                  onClick={(e) => {
                    e.preventDefault()
                    signIn()
                  }}
                >
                  <CreditCard2BackFill className="bsIcon" /> Sign up now
                </Button>
                <br />
              </>
               )}
            </CardFooter>
          </Card>
          <Card className="themed-card-medium">
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
              <li><a href={API_URL}>Service (API) documentation</a></li>
              <li><a href="/service/account/">Account and usage dashboard</a></li>
              <li>Tutorial: <a href="/articles/2022-02-01-matching-api/">Using the matching API</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Data coverage</h5>
            <ul>
              <li><a href="/datasets/#sources">Dataset overview</a></li>
              <li><a href="/reference/">Data dictionary</a></li>
              <li><a href="/research/">Explore the data</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Commercial information</h5>
            <ul>
              <li><a href="/docs/commercial/faq/">Commercial use FAQ</a></li>
              <li><a href="/docs/terms/">Terms of service</a></li>
              <li><a href="/docs/privacy/">Privacy policy</a></li>
            </ul>
          </Col>
        </Row>
      </Content.Context>
    </LayoutFrame>
  </>
  )
}
