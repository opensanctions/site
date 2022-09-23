import { InferGetStaticPropsType } from 'next';
import { CreditCard2BackFill, EnvelopeFill, LightbulbFill, Magic } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import CardGroup from 'react-bootstrap/CardGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Layout from '../components/Layout'
import Content from '../components/Content'
import Menu from '../components/Menu';
import { Numeric, Summary } from '../components/util';
import Link from 'next/link';
import { getDatasets } from '../lib/data';

import styles from '../styles/Licensing.module.scss'

const TITLE = 'Licensing OpenSanctions';
const SUMMARY = 'We provide a fully auditable, high-quality database for '
  + 'open source intelligence. This includes carefully cleaned and de-duplicated '
  + 'entities that are subject to manual review. The use of this data for any '
  + 'business purposes requires a licensing agreement.';

export default function Licensing({ sanctions_count, default_count }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout.Base title={TITLE} description={SUMMARY} activeSection="about">
      <Content.Menu title={TITLE} Menu={Menu.About}>
        <Summary summary={SUMMARY} />
        <div className="text-body">
          <CardGroup className={styles.pricingPanel}>
            <Card className={styles.firstColumn} text="white">
              <Card.Body>
                <Card.Title>
                  Internal use bulk data<br />
                  <Badge bg="light">
                    <span className="num"><Numeric value={595} /></span> €/mo
                  </Badge>
                </Card.Title>
                <Card.Text>
                  Use the OpenSanctions dataset for internal applications (e.g.
                  the <Link href="/docs/self-hosted/">self-hosted API</Link>) or as a
                  component of value-add products and services.
                </Card.Text>
                <ul>
                  <li>30+ sanctions lists</li>
                  <li>160,000+ PEP profiles</li>
                  <li>11 crime watchlists</li>
                  <li>clean and de-duplicated</li>
                  <li>updated daily</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <ButtonGroup>
                  <Button href="/docs/commercial-faq/" variant="light">
                    <LightbulbFill className="bsIcon" />
                    Learn more
                  </Button>
                  <Button href="https://buy.stripe.com/8wMeVRgBrca54nu5kD" variant="secondary">
                    <CreditCard2BackFill className="bsIcon" /> Subscribe
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
            <Card className={styles.secondColumn} text="white">
              <Card.Body>
                <Card.Title>
                  External use bulk data<br />
                  <Badge bg="light">
                    <span className="num">custom</span>
                  </Badge>
                </Card.Title>
                <Card.Text>
                  Use OpenSanctions to provide compliance solutions to third
                  parties, or include our graph in your own data products.
                </Card.Text>
                <ul>
                  <li>60+ data sources</li>
                  <li>standardised data format</li>
                  <li>cross-list de-duplication</li>
                  <li>relationship graph</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <ButtonGroup>
                  <Button href="/docs/commercial-faq/" variant="light">
                    <LightbulbFill className="bsIcon" />
                    Learn more
                  </Button>
                  <Button href="/contact/" variant="secondary">
                    <EnvelopeFill className="bsIcon" />
                    Contact us
                  </Button>
                </ButtonGroup>
              </Card.Footer>
            </Card>
            <Card className={styles.thirdColumn} text="white">
              <Card.Body>
                <Card.Title>
                  OpenSanctions API<br />
                  <Badge bg="light">
                    <span className="num">0.30 - 0.10</span> €/req
                  </Badge>
                </Card.Title>
                <Card.Text>
                  Easily integrate up-to-date sanctions and PEPs data into your screening
                  or research processes with our powerful matching and search APIs.
                </Card.Text>
                <ul>
                  <li>pay-as-you-go pricing</li>
                  <li>search within the full dataset</li>
                  <li>easy-to-integrate list checking</li>
                  <li>powerful matching logic</li>
                </ul>
              </Card.Body>
              <Card.Footer>
                <ButtonGroup>
                  <Button href="/docs/api/" variant="secondary">
                    <Magic className="bsIcon" />
                    Get started now
                  </Button>
                </ButtonGroup>
                {/* <div className="buy-now">
                  In a hurry? <a href="https://buy.stripe.com/8wM151fxn6PL4nu7sF">Subscribe now</a>.
                </div> */}
              </Card.Footer>
            </Card>
          </CardGroup>
          <p>
            <strong>Not ideal for you?</strong> OpenSanctions
            provides <strong><Link href="/docs/commercial-faq/#exemptions">licensing exemptions
              for journalists and activists</Link></strong>. We are also happy to provide
            {' '}<strong>discounts for startups</strong>, and those building new products. Beyond that,
            we're committed to make this data available to everyone. If the licensing is
            stopping you from using OpenSanctions, <Link href="/contact/">contact us</Link> and
            we'll fix it.
          </p>
          <p>
            <strong>Got more questions?</strong> Check out the <Link href="/docs/commercial-faq/">Commercial use FAQ</Link>
          </p>
        </div>
      </Content.Menu>
    </Layout.Base >
  )
}


export const getStaticProps = async () => {
  const datasets = await getDatasets();
  const sanctions = datasets.find(d => d.name === 'sanctions');
  const default_ = datasets.find(d => d.name === 'default');
  return {
    props: {
      sanctions_count: sanctions?.target_count || 25000,
      default_count: default_?.target_count || 25000,
    }
  }
}
