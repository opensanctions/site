import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import { Summary } from '../components/util';
import Link from 'next/link';

const TITLE = "OpenSanctions in the wild"

export default function Showcase({ }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout.Base title={TITLE}>
      <Container>
        <Row>
          <Col>
            <h1>{TITLE}</h1>
            <Summary summary="Our database works as a building block" />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h2>Russian Sanctions Tracker</h2>
                <p>
                  Investigative outlets CORRECT!V and Lighthouse Reports cooperated
                  in early 2022 to track the scope of the Sanctions imposed by
                  the international community following Russias invasion of Ukraine.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h2>OpenScreening</h2>
                <p>
                  Together with Linkurious, we developed <Link href="https://resources.linkurious.com/openscreening">OpenScreening</Link>. The interactive
                  demo combines Linkurious powerful network analysis solution to uncover
                  the hidden connections between sanctions targets, politicians and
                  offshore companies.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
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
        </Row>
        {/* https://correctiv.org/en/latest-stories/2022/03/01/sanctions-tracker-live-monitoring-of-all-sanctions-against-russia/ */}
      </Container>
    </Layout.Base>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {}
  }
}

