import Link from 'next/link';

import { Row, Col, Card, CardBody, Container } from './wrapped';
import { IContent, IContentBase } from '../lib/types'
import { JSONLink, Markdown, Summary } from './util';
import { AboutMenu, DocumentationMenu, MenuProps } from './Menu';
import PageHead from './layout/PageHead';

import styles from '../styles/Content.module.scss';


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
  path: string
  jsonLink?: string
  Menu: React.ComponentType<MenuProps>
}

function ContentMenu({ title, path, children, jsonLink, Menu }: React.PropsWithChildren<ContentMenuProps>) {
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
          <Menu path={path} />
        </Col>
      </Row>
    </Container>
  )
}

function ContentContext({ content, children }: ContentFrameProps) {
  const MenuComponent = content.section === "about" ? AboutMenu : DocumentationMenu;
  return (
    <ContentMenu title={content.title} path={content.menu_path} Menu={MenuComponent}>
      <Summary summary={content.summary} />
      <div className={styles.page}>
        {children}
        <Card className="d-print-none">
          <CardBody>
            <strong>Got more questions?</strong> Join the <Link href="https://bit.ly/osa-slack">Slack
              chat</Link> to ask questions and get support. You can
            also <Link href="https://book.stripe.com/28o1513OFca54nufZf">book an hour of consulting time</Link> to
            discuss technical questions with the team.
          </CardBody>
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

type ContentHeadProps = {
  content: IContentBase
  structured?: any
}


function ContentHead({ content, structured }: ContentHeadProps) {
  return <PageHead
    title={content.title}
    noIndex={content.no_index}
    description={content.summary || undefined}
    imageUrl={content.image_url}
    structured={structured}
  />
}

export default class Content {
  static Body = ContentBody;
  static Page = ContentPage;
  static Menu = ContentMenu;
  static Head = ContentHead;
  static Context = ContentContext;
}