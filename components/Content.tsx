import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

import { IContent } from '../lib/types'
import { JSONLink, Markdown, Summary } from './util';

import styles from '../styles/Content.module.scss';
import Link from 'next/link';
import Menu from './Menu';

type ContentProps = {
  content: IContent
}

type ContentFrameProps = {
  content: IContent
  children?: React.ReactNode
}

function ContentBody({ content }: ContentProps) {
  return <Markdown markdown={content.content} />;
}

type ContentMenuProps = {
  title: string
  jsonLink?: string
  Menu: React.ComponentType
}

function ContentMenu({ title, children, jsonLink, Menu }: React.PropsWithChildren<ContentMenuProps>) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>
            {title}
            {jsonLink && (<JSONLink href={jsonLink} />)}
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          {children}
        </Col>
        <Col md={3}>
          <Menu />
        </Col>
      </Row>
    </Container>
  )
}

function ContentContext({ content, children }: ContentFrameProps) {
  const MenuComponent = content.section === "about" ? Menu.About : Menu.Documentation;
  return (
    <ContentMenu title={content.title} Menu={MenuComponent}>
      <Summary summary={content.summary} />
      <div className={styles.page}>
        {children}
        <Card>
          <Card.Body>
            <strong>Got more questions?</strong> Join the <Link href="https://bit.ly/osa-slack">Slack
              chat</Link> to ask questions and get support. You can
            also <Link href="https://book.stripe.com/28o1513OFca54nufZf">book an hour of consulting time</Link> to
            discuss technical questions with the team.
          </Card.Body>
        </Card>
      </div>
    </ContentMenu>
  )
}

function ContentPage({ content }: ContentProps) {
  return (
    <ContentContext content={content}>
      <ContentBody content={content} />
    </ContentContext>
  );
}

export default class Content {
  static Body = ContentBody;
  static Page = ContentPage;
  static Menu = ContentMenu;
  static Context = ContentContext;
}