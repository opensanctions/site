import Link from 'next/link';
import classNames from 'classnames';
import { EnvelopeFill, LightbulbFill, Magic } from 'react-bootstrap-icons';

import Content from '../../components/Content'
import { Button, Card, CardBody, CardTitle, CardText, CardFooter, Badge, CardGroup, ButtonGroup } from '../../components/wrapped';
import { Numeric, Summary } from '../../components/util';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { AboutMenu } from '../../components/Menu';
import { REVALIDATE_BASE } from '../../lib/constants';
import { SUMMARY, TITLE } from './common';

import styles from '../../styles/Licensing.module.scss'


export const revalidate = REVALIDATE_BASE;

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
                  the <Link href="/docs/self-hosted/">self-hosted API</Link>) or as a
                  component of value-add products and services.
                </CardText>
                <ul>
                  <li>30+ sanctions lists</li>
                  <li>160,000+ PEP profiles</li>
                  <li>11 crime watchlists</li>
                  <li>clean and de-duplicated</li>
                  <li>updated daily</li>
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
                  OEM bulk data<br />
                  <Badge bg="light">
                    <span className="num">custom</span>
                  </Badge>
                </CardTitle>
                <CardText>
                  Use OpenSanctions to provide compliance solutions to third
                  parties, or include our graph in your own data products.
                </CardText>
                <ul>
                  <li>65+ data sources</li>
                  <li>standardised data format</li>
                  <li>cross-list de-duplication</li>
                  <li>complex relationship graph</li>
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
                  <li>pay-as-you-go pricing</li>
                  <li>search within the full dataset</li>
                  <li>easy-to-integrate list checking</li>
                  <li>powerful matching system</li>
                </ul>
              </CardBody>
              <CardFooter>
                <ButtonGroup>
                  <Button href="/api/" variant="secondary">
                    <Magic className="bsIcon" />
                    Get started now
                  </Button>
                </ButtonGroup>
                {/* <div className="buy-now">
                  In a hurry? <a href="https://buy.stripe.com/8wM151fxn6PL4nu7sF">Subscribe now</a>.
                </div> */}
              </CardFooter>
            </Card>
          </CardGroup>
          <p>
            <strong>Not ideal for you?</strong> OpenSanctions
            provides <strong><Link href="/docs/commercial/faq/#exemptions">licensing exemptions
              for journalists and activists</Link></strong>. We are also happy to provide
            {' '}<strong>discounts for startups</strong>, and those building new products. Beyond that,
            we're committed to make this data available to everyone. If the licensing is
            stopping you from using OpenSanctions, <Link href="/contact/">contact us</Link> and
            we'll fix it.
          </p>
          <p>
            <strong>Got more questions?</strong> Check out the <Link href="/docs/commercial/faq/">Commercial use FAQ</Link>
          </p>
        </div>
      </Content.Menu>
    </LayoutFrame >
  )
}
