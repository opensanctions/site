import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import { Summary } from '../components/util';
import Link from 'next/link';
import { LicenseInfo } from '../components/Policy';

const TITLE = "OpenSanctions in the wild";
const SUMMARY = "Our database and technology provide essential building blocks for investigative reporting, screening technology, and open source intelligence analysis. Below, we're collecting some of the public uses and cooperations we've been part of.";

export default function Showcase({ }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout.Base title={TITLE}>
      <Container>
        <Row>
          <Col>
            <h1>{TITLE}</h1>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-4">
          <Col>
            <Card>
              <Card.Body>
                <h2>Russian Sanctions Tracker</h2>
                <p>
                  Investigative outlets <Link href="https://correctiv.org/">CORRECT!V</Link> and <Link href="https://www.lighthousereports.nl/">Lighthouse Reports</Link> cooperated
                  in early 2022 to <Link href="https://correctiv.org/en/latest-stories/2022/03/01/sanctions-tracker-live-monitoring-of-all-sanctions-against-russia/">track the scope of the Russia-related sanctions</Link> imposed by
                  the international community. Their analysis categorises
                  individual sanctions targets into oligarchs, politicians and
                  others. <Link href="https://www.lighthousereports.nl/tagging-the-oligarchs/">Read more...</Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h2>OpenScreening</h2>
                <p>
                  <Link href="https://resources.linkurious.com/openscreening">OpenScreening</Link> is a joint project with Linkurious. The interactive
                  demo combines Linkurious powerful <Link href="https://linkurious.com/platform/">network analysis solution</Link> to uncover
                  the hidden connections between sanctions targets, politicians and
                  offshore companies.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h2>Blackdot Videris</h2>
                <p>
                  Videris helps investigators and analysts to collect, analyse and visualise open source data. In
                  their effort to make detailed sanctions and PEP information available to their users,
                  Blackdot <Link href="https://blackdotsolutions.com/news/opensanctions-partnership/">has integrated OpenSanctions</Link> into
                  their case development and network analysis platform.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h2>BlueAnvil TruIntel</h2>
                <p>
                  <Link href="https://www.blueanvil.com/truintel/">TruIntel</Link> is a power tool for understanding UK companies. It combines analysis of
                  beneficial ownership, procurement data and PEP/sanctions screening.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <h2>Declarator.org</h2>
                <p>
                  <Link href="http://declarator.org">Declarator.org</Link> is a project by TI Russia that tracks the
                  asset declarations filed by officials. They <Link href="https://transparency.org.ru/en/projects/novosti/deklarator-teper-otobrazhaet-nalichie-persony-v-sankczionnyh-spiskah">use
                    OpenSanctions to include information</Link> on which politicians are sanctioned by
                  the international community.
                </p>
              </Card.Body>
            </Card>
          </Col>

        </Row>
        <Row>
          <Col md={8}>
            <h3>Other uses</h3>
            <ul>
              <li>
                Gridno/YouControl NGO and the Ukrainian National Agency on Corruption Prevention, <Link href="https://ruassets.com/">RuAssets</Link>
              </li>
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
    </Layout.Base>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {}
  }
}

