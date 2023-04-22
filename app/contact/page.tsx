import Link from 'next/link';
import { CaretRightFill, EnvelopeFill, Slack, Twitter } from 'react-bootstrap-icons';

import { Button, Card, CardBody, CardTitle, CardText, CardFooter, CardGroup } from '../../components/wrapped'
import Content from '../../components/Content'
import { Summary } from '../../components/util';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { REVALIDATE_BASE } from '../../lib/constants';
import { AboutMenu } from '../../components/Menu';

import { getGenerateMetadata } from '../../lib/meta';

export const revalidate = REVALIDATE_BASE;
export const TITLE = "Contact the team";
export const SUMMARY = "OpenSanctions exists to start a conversation. We're keen to get in touch with anyone who is interested in using the data, giving us feedback, or supporting to the project.";


export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY
  })
}


export default async function Contact() {
  return (
    <LayoutFrame activeSection="about">
      <Content.Menu title={TITLE} Menu={AboutMenu} path="/contact">
        <Summary summary={SUMMARY} />
        <div className="text-body">
          <CardGroup className="themed-card-group">
            <Card className="themed-card-dark">
              <CardBody>
                <CardTitle><EnvelopeFill className="bsIcon" /> E-mail</CardTitle>
                <CardText>
                  Reach out to the core team to discuss the project.
                  <br /><br />
                  Or: <Link href="/meeting/">book a call directly</Link>.
                </CardText>
              </CardBody>
              <CardFooter>
                <Button href="mailto:info@opensanctions.org" variant="secondary">
                  <CaretRightFill className="bsIcon" /> info@opensanctions.org
                </Button>
              </CardFooter>
            </Card>
            <Card className="themed-card-medium">
              <CardBody>
                <CardTitle><Slack /> Slack chat</CardTitle>
                <CardText>
                  Join our Slack workspace and chat with the team and others
                  working on sanctions data.
                </CardText>
              </CardBody>
              <CardFooter>
                <Button href="/slack/" variant="secondary">
                  <CaretRightFill className="bsIcon" /> OpenSanctions Slack
                </Button>
              </CardFooter>
            </Card>
            <Card className="themed-card-light">
              <CardBody>
                <CardTitle><Twitter /> Twitter</CardTitle>
                <CardText>
                  Keep in the loop with OpenSanctions on Twitter.
                </CardText>
              </CardBody>
              <CardFooter>
                <Button href="https://twitter.com/open_sanctions" variant="secondary">
                  <CaretRightFill className="bsIcon" /> @open_sanctions
                </Button>
              </CardFooter>
            </Card>
          </CardGroup>
          <p>
            Also check out the <Link href="/docs/">documentation</Link> and
            the <Link href="/docs/faq">frequently asked questions</Link> for
            detailed information regarding the data and project.
          </p>
          <p>
            And, of course, please consider communicating with us
            in <Link href="/licensing/">the sweetest language of all</Link>.
            You can also <Link href="https://book.stripe.com/28o1513OFca54nufZf">book
              an hour of consulting time</Link> to discuss technical questions
            and integration options with the maintainers.
          </p>
        </div>
      </Content.Menu>
    </LayoutFrame>
  )
}
