import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import { Summary } from '../components/util';
import Link from 'next/link';
import { LicenseInfo } from '../components/Policy';

const TITLE = "Showcase: OpenSanctions in the wild";
const SUMMARY = "Our database and technology provide essential building blocks for investigative reporting, screening technology, and open source intelligence analysis. Below, we're collecting some of the public uses and cooperations we've been part of.";

export default function Showcase({ }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout.Base title={TITLE} description={SUMMARY}>
      <Container>
        <Row>
          <Col>
            <h1>{TITLE}</h1>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/nazk_logo.png" />
              <Card.Body>
                <Card.Title>War &amp; Sanctions</Card.Title>
                <Card.Text>
                  Ukraine's <Link href="https://nazk.gov.ua/en/">National Agency on Corruption
                    Prevention</Link> uses our linked-up data to track the adoption of
                  Russia-related sanctions by other countries and drive efforts to advocate
                  for additional designations by national authorities across the world.
                </Card.Text>
                <Card.Link href="https://sanctions.nazk.gov.ua/en/">
                  Project page
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/tracker.png" />
              <Card.Body>
                <Card.Title>Russian Sanctions Tracker</Card.Title>
                <Card.Text>
                  Non-profit investigative outlets <Link href="https://correctiv.org/">CORRECTIV</Link> and <Link href="https://www.lighthousereports.nl/">Lighthouse Reports</Link> cooperated
                  in early 2022 to track the scope of the Russia-related sanctions imposed by
                  the international community. Their analysis categorises
                  individual sanctions targets into oligarchs, politicians and
                  others.
                </Card.Text>
                <Card.Link href="https://www.lighthousereports.nl/tagging-the-oligarchs/">
                  Introduction
                </Card.Link>
                <Card.Link href="https://correctiv.org/en/latest-stories/2022/03/01/sanctions-tracker-live-monitoring-of-all-sanctions-against-russia/">
                  Project page
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/openscreening.png" />
              <Card.Body>
                <Card.Title>OpenScreening</Card.Title>
                <Card.Text>
                  OpenScreening offers free access to an interactive
                  PEP &amp; Sanctions screening playground combining
                  Linkurious' <Link href="https://linkurious.com/platform/">powerful investigation
                    software</Link> with our graph data to uncover the hidden connections between
                  sanctions targets, politicians and offshore companies.
                </Card.Text>
                <Card.Link href="https://bit.ly/3bgXWlG">
                  Explore OpenScreening
                </Card.Link>
                <Card.Link href="https://github.com/opensanctions/offshore-graph">
                  Source code
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/blackdot.png" />
              <Card.Body>
                <Card.Title>Blackdot Solutions Videris</Card.Title>
                <Card.Text>
                  Videris is a complete investigations and intelligence platform which allows
                  investigators and analysts to collect, analyse and visualise open source data
                  in one place. Blackdot has integrated OpenSanctions to allow users to quickly
                  search, map and understand sanctioned entities and their networks.
                </Card.Text>
                <Card.Link href="https://blackdotsolutions.com/news/opensanctions-partnership/">
                  Announcement
                </Card.Link>
                <Card.Link href="https://blackdotsolutions.com/blog/map-sanctioned-entities-with-videris/">
                  Tutorial
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/truintel.png" />
              <Card.Body>
                <Card.Title>BlueAnvil Truintel</Card.Title>
                <Card.Text>
                  Truintel is a power tool for understanding UK companies. It combines analysis of
                  beneficial ownership, procurement data and PEP/sanctions screening.
                </Card.Text>
                <Card.Link href="https://www.blueanvil.com/truintel/">
                  Product info
                </Card.Link>
                <Card.Link href="https://truintel.app/signup">
                  Sign up
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/occrp.png" />
              <Card.Body>
                <Card.Title>OCCRP Aleph</Card.Title>
                <Card.Text>
                  Aleph uses sanctions and politicians lists as contrast material
                  that helps to find evidence of illicit activity and corruption
                  in large datasets, such as leaked documents or company ownership
                  databases.
                </Card.Text>
                <Card.Link href="https://aleph.occrp.org.org">
                  Search Aleph
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/declarator.png" />
              <Card.Body>
                <Card.Title>Declarator.org</Card.Title>
                <Card.Text>
                  Transparency International Russia tracks the asset declarations filed by
                  officials. They use OpenSanctions to highlight which politicians and
                  functionaries are subject to sanctions by the international community.
                </Card.Text>
                <Card.Link href="http://declarator.org">
                  Project page
                </Card.Link>
                <Card.Link href="https://transparency.org.ru/en/projects/novosti/deklarator-teper-otobrazhaet-nalichie-persony-v-sankczionnyh-spiskah">
                  Announcement
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <Card.Img variant="top" src="/static/showcase/omnio.png" />
              <Card.Body>
                <Card.Title>OMNIO</Card.Title>
                <Card.Text>
                  OMNIO uses machine learning technology and compliance knowledge
                  to automate financial crime compliance processes. In their
                  Customer Monitoring, they use OpenSanctions to instantly check
                  for sanctions, PEP, and negative media.
                </Card.Text>
                <Card.Link href="https://omniocompliance.com/product/customer-monitoring/">
                  Product info
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h3>Other uses</h3>
            <ul>
              <li>
                Ontotext: <Link href="https://www.ontotext.com/knowledgehub/webinars/effective-sanctions/">Effective Sanctions Compliance with Ontotext</Link>
              </li>
              <li>
                OSINT Combine: <Link href="https://www.osintcombine.com/sanctions-search">Sanctions Search</Link>
              </li>
              <li>
                Wikipedia: <Link href="https://en.wikipedia.org/wiki/International_sanctions_during_the_2022_Russian_invasion_of_Ukraine">International sanctions during the 2022 Russian invasion of Ukraine
                </Link>, <Link href="https://www.kaggle.com/code/gianlab/sanctions-against-russia">Kaggle analysis</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <LicenseInfo />
          </Col>
        </Row>
      </Container>
    </Layout.Base >
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {}
  }
}

