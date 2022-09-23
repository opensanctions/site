import { CaretRightFill, EnvelopeFill, Slack, Twitter } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import Layout from '../components/Layout'
import Content from '../components/Content'
import { Summary } from '../components/util';
import Link from 'next/link';
import Menu from '../components/Menu';

import styles from '../styles/Contact.module.scss'

export default function Contact() {
  const title = "Contact the team";
  const summary = "OpenSanctions exists to start a conversation. We're keen to get in touch with anyone who is interested in using the data, giving us feedback, or supporting to the project.";
  return (
    <Layout.Base title={title} description={summary} activeSection="about">
      <Content.Menu title={title} Menu={Menu.About}>
        <Summary summary={summary} />
        <div className="text-body">
          <CardGroup className={styles.contactPanel}>
            <Card className={styles.firstColumn} text="white">
              <Card.Body>
                <Card.Title><EnvelopeFill className="bsIcon" /> E-mail</Card.Title>
                <Card.Text>
                  Reach out to the core team to discuss the project.
                  <br /><br />
                  Or: <a href="https://meetings-eu1.hubspot.com/douglas-arellanes">book a call directly</a>.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button href="mailto:info@opensanctions.org" variant="secondary">
                  <CaretRightFill className="bsIcon" /> info@opensanctions.org
                </Button>
              </Card.Footer>
            </Card>
            <Card className={styles.secondColumn} text="white">
              <Card.Body>
                <Card.Title><Slack /> Slack chat</Card.Title>
                <Card.Text>
                  Join our Slack workspace and chat with the team and others
                  working on sanctions data.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button href="https://bit.ly/osa-slack" variant="secondary">
                  <CaretRightFill className="bsIcon" /> OpenSanctions Slack
                </Button>
              </Card.Footer>
            </Card>
            <Card className={styles.thirdColumn} text="white">
              <Card.Body>
                <Card.Title><Twitter /> Twitter</Card.Title>
                <Card.Text>
                  Keep in the loop with OpenSanctions on Twitter.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button href="https://twitter.com/open_sanctions" variant="secondary">
                  <CaretRightFill className="bsIcon" /> @open_sanctions
                </Button>
              </Card.Footer>
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
    </Layout.Base >
  )
}
