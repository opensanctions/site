import { GetStaticPropsContext } from 'next'
import Link from 'next/link';

import { Row, Col, Container, Card, CardBody } from '../../../components/wrapped'
import { Summary } from '../../../components/util'
import { getArticleBySlug, getArticles } from '../../../lib/content';
import Content from '../../../components/Content';
import Article from '../../../components/Article';
import { ArticlePageProps } from './common';
import LayoutFrame from '../../../components/layout/LayoutFrame';


export default async function Page({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)
  return (
    <LayoutFrame activeSection="about" >
      <Container>
        <h1>{article.title}</h1>
        <Row>
          <Col md={8}>
            <Summary summary={article.summary} />
            <Content.Body content={article} />
            <Card>
              <CardBody>
                <strong>Like what we're writing about?</strong> Keep the conversation going! You
                can <Link href="https://twitter.com/open_sanctions">follow us on Twitter</Link> or
                join the <Link href="https://bit.ly/osa-slack">Slack chat</Link> to
                bring in your own ideas and questions. Or, check out the <Link href="/docs/">project
                  documentation</Link> to learn more about OpenSanctions.
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="d-print-none">
            <Article.Sidebar article={article} />
          </Col>
        </Row>
      </Container>
    </LayoutFrame >
  )
}


export async function generateStaticParams() {
  const articles = await getArticles()
  return articles
    .map((a) => ({ slug: a.slug }))
}
