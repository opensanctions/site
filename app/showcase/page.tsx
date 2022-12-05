import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { Container, Row, Col, Card, CardTitle, CardImg, CardBody, CardText, CardLink } from '../../components/wrapped';
import { Summary } from '../../components/util';
import Link from 'next/link';
import { LicenseInfo } from '../../components/Policy';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { SUMMARY, TITLE } from './common';


export default function Page() {
  return (
    <LayoutFrame>
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
              <CardImg variant="top" src="/static/showcase/nazk_logo.png" />
              <CardBody>
                <CardTitle>War &amp; Sanctions</CardTitle>
                <CardText>
                  Ukraine's <Link href="https://nazk.gov.ua/en/">National Agency on Corruption
                    Prevention</Link> uses our linked-up data to track the adoption of
                  Russia-related sanctions by other countries and drive efforts to advocate
                  for additional designations by national authorities across the world.
                </CardText>
                <CardLink href="https://sanctions.nazk.gov.ua/en/">
                  Project page
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/tracker.png" />
              <CardBody>
                <CardTitle>Russian Sanctions Tracker</CardTitle>
                <CardText>
                  Non-profit investigative outlets <Link href="https://correctiv.org/">CORRECTIV</Link> and <Link href="https://www.lighthousereports.nl/">Lighthouse Reports</Link> cooperated
                  in early 2022 to track the scope of the Russia-related sanctions imposed by
                  the international community. Their analysis categorises
                  individual sanctions targets into oligarchs, politicians and
                  others.
                </CardText>
                <CardLink href="https://www.lighthousereports.nl/tagging-the-oligarchs/">
                  Introduction
                </CardLink>
                <CardLink href="https://correctiv.org/en/latest-stories/2022/03/01/sanctions-tracker-live-monitoring-of-all-sanctions-against-russia/">
                  Project page
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/openscreening.png" />
              <CardBody>
                <CardTitle>OpenScreening</CardTitle>
                <CardText>
                  OpenScreening offers free access to an interactive
                  PEP &amp; Sanctions screening playground combining
                  Linkurious' <Link href="https://linkurious.com/platform/">powerful investigation
                    software</Link> with our graph data to uncover the hidden connections between
                  sanctions targets, politicians and offshore companies.
                </CardText>
                <CardLink href="https://bit.ly/3bgXWlG">
                  Explore OpenScreening
                </CardLink>
                <CardLink href="https://github.com/opensanctions/offshore-graph">
                  Source code
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/blackdot.png" />
              <CardBody>
                <CardTitle>Blackdot Solutions Videris</CardTitle>
                <CardText>
                  Videris is a complete investigations and intelligence platform which allows
                  investigators and analysts to collect, analyse and visualise open source data
                  in one place. Blackdot has integrated OpenSanctions to allow users to quickly
                  search, map and understand sanctioned entities and their networks.
                </CardText>
                <CardLink href="https://blackdotsolutions.com/news/opensanctions-partnership/">
                  Announcement
                </CardLink>
                <CardLink href="https://blackdotsolutions.com/blog/map-sanctioned-entities-with-videris/">
                  Tutorial
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/truintel.png" />
              <CardBody>
                <CardTitle>BlueAnvil Truintel</CardTitle>
                <CardText>
                  Truintel is a power tool for understanding UK companies. It combines analysis of
                  beneficial ownership, procurement data and PEP/sanctions screening.
                </CardText>
                <CardLink href="https://www.blueanvil.com/truintel/">
                  Product info
                </CardLink>
                <CardLink href="https://truintel.app/signup">
                  Sign up
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/occrp.png" />
              <CardBody>
                <CardTitle>OCCRP Aleph</CardTitle>
                <CardText>
                  Aleph uses sanctions and politicians lists as contrast material
                  that helps to find evidence of illicit activity and corruption
                  in large datasets, such as leaked documents or company ownership
                  databases.
                </CardText>
                <CardLink href="https://aleph.occrp.org.org">
                  Search Aleph
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/ruassets.png" />
              <CardBody>
                <CardTitle>YouControl RuAssets</CardTitle>
                <CardText>
                  RuAssets is an international tool for searching for Russian and
                  Belarusian assets, and to seize the property of those responsible
                  for the war in Ukraine. Sanctions and PEPs data is combined with
                  a company and property registries.
                </CardText>
                <CardLink href="https://ruassets.com/">
                  Information and sign-up
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/declarator.png" />
              <CardBody>
                <CardTitle>Declarator.org</CardTitle>
                <CardText>
                  Transparency International Russia tracks the asset declarations filed by
                  officials. They use OpenSanctions to highlight which politicians and
                  functionaries are subject to sanctions by the international community.
                </CardText>
                <CardLink href="http://declarator.org">
                  Project page
                </CardLink>
                <CardLink href="https://transparency.org.ru/en/projects/novosti/deklarator-teper-otobrazhaet-nalichie-persony-v-sankczionnyh-spiskah">
                  Announcement
                </CardLink>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card bg="light">
              <CardImg variant="top" src="/static/showcase/omnio.png" />
              <CardBody>
                <CardTitle>OMNIO</CardTitle>
                <CardText>
                  OMNIO uses machine learning technology and compliance knowledge
                  to automate financial crime compliance processes. In their
                  Customer Monitoring, they use OpenSanctions to instantly check
                  for sanctions, PEP, and negative media.
                </CardText>
                <CardLink href="https://omniocompliance.com/product/customer-monitoring/">
                  Product info
                </CardLink>
              </CardBody>
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
    </LayoutFrame>
  )
}