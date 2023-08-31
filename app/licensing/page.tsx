import Link from 'next/link';
import classNames from 'classnames';
import { EnvelopeFill, LightbulbFill, Magic } from 'react-bootstrap-icons';

import Content from '../../components/Content'
import { Button, Card, CardBody, CardTitle, CardText, CardFooter, Badge, CardGroup, ButtonGroup } from '../../components/wrapped';
import { Numeric, Summary } from '../../components/util';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { AboutMenu } from '../../components/Menu';
import { REVALIDATE_BASE } from '../../lib/constants';
import { getGenerateMetadata } from '../../lib/meta';

import styles from '../../styles/Licensing.module.scss'

export const revalidate = REVALIDATE_BASE;
const TITLE = 'Licensing OpenSanctions';
const SUMMARY = 'We provide a fully auditable, high-quality database for '
  + 'open source intelligence. This includes carefully cleaned and de-duplicated '
  + 'entities that are subject to manual review. The use of this data for any '
  + 'business purposes requires a licensing agreement.';

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY
  })
}


export default function Page() {
  return (
    <LayoutFrame activeSection="about">
      <Content.Menu title={TITLE} path="/licensing" Menu={AboutMenu}>
        <Summary summary={SUMMARY} />
        <div className="text-body">
          <CardGroup className="themed-card-group">
            <Card className={classNames(styles.offer, "themed-card-light")}>
              <CardBody>
                <CardTitle>
                  Internal use bulk data<br />
                  <Badge bg="light">
                    <span className="num"><Numeric value={595} /></span> €/mo
                  </Badge>
                </CardTitle>
                <CardText>
                  Use the OpenSanctions dataset for internal applications (e.g.
                  the <Link href="/docs/self-hosted/">self-hosted API</Link>),
                  such as counter-party screening.
                </CardText>
                <ul>
                  <li>Ideal for in-house screening and data analysis</li>
                  <li>
                    <Link href="/datasets/default/">Full dataset</Link>:
                    Sanctions, <Link href="/pep/">PEPs</Link> and criminal watchlists
                  </li>
                  <li>Updated daily</li>
                </ul>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button href="/docs/commercial/faq/" variant="light">
                    <LightbulbFill className="bsIcon" />
                    Learn more
                  </Button>
                  <Button href="/contact/" variant="secondary">
                    <EnvelopeFill className="bsIcon" />
                    Contact us
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
            <Card className={classNames(styles.offer, "themed-card-medium")}>
              <CardBody>
                <CardTitle>
                  Reseller/OEM bulk data<br />
                  <Badge bg="light">
                    <span className="num">custom</span>
                  </Badge>
                </CardTitle>
                <CardText>
                  Use OpenSanctions to provide products and solutions to third
                  parties, or to include our graph in your own data products.
                </CardText>
                <ul>
                  <li>Ideal for building APIs, software solutions and data products</li>
                  <li>
                    <Link href="/datasets/default/">Full dataset</Link>:
                    Sanctions, <Link href="/pep/">PEPs</Link> and criminal watchlists
                  </li>
                  <li>Updated daily</li>
                </ul>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button href="/docs/commercial/faq/" variant="light">
                    <LightbulbFill className="bsIcon" />
                    Learn more
                  </Button>
                  <Button href="/contact/" variant="secondary">
                    <EnvelopeFill className="bsIcon" />
                    Contact us
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
            <Card className={classNames(styles.offer, "themed-card-dark")}>
              <CardBody>
                <CardTitle>
                  OpenSanctions API<br />
                  <Badge bg="light">
                    <span className="num">0.30 - 0.10</span> €/req
                  </Badge>
                </CardTitle>
                <CardText>
                  Easily integrate up-to-date sanctions and PEPs data into your screening
                  or research processes with our powerful matching and search APIs.
                </CardText>
                <ul>
                  <li>Pay-as-you-go pricing</li>
                  <li>Search within the full dataset</li>
                  <li>Easy-to-integrate list checking</li>
                  <li>Powerful matching system</li>
                </ul>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button href="/api/" variant="secondary">
                    <Magic className="bsIcon" />
                    Get started now
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          </CardGroup>
          <p>
            <strong>Not ideal for you?</strong> OpenSanctions
            provides <strong><Link href="/docs/commercial/faq/#exemptions">licensing exemptions
              for journalists and activists</Link></strong>. We are also happy to provide
            {' '}<strong>discounts for startups</strong>, and those building new products.
          </p>
          <p>
            <strong>Got more questions?</strong> Check out the <Link href="/docs/commercial/faq/">Commercial use FAQ</Link>
          </p>
        </div>
      </Content.Menu>
    </LayoutFrame >
  )
}
