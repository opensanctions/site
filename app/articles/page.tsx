import Link from 'next/link';

import { getArticles } from '../../lib/content'
import { Github, Slack, Twitter } from 'react-bootstrap-icons';
import { Row, Col, Container } from '../../components/wrapped';
import { Summary } from '../../components/util';
import { ARTICLE_INDEX_SUMMARY, REVALIDATE_BASE } from '../../lib/constants';

import Article from '../../components/Article';
import LayoutFrame from '../../components/layout/LayoutFrame';

import styles from '../../styles/Article.module.scss';

export const revalidate = REVALIDATE_BASE;

export default async function Page() {
  const articles = await getArticles();
  const publishedArticles = articles.filter((a) => !a.draft);
  return (
    <LayoutFrame activeSection="about">
      <Container>
        <h1>
          What's happening at OpenSanctions?
        </h1>
        <Summary summary={ARTICLE_INDEX_SUMMARY} />
        <Row>
          <Col md={8}>
            <ul className={styles.articleList}>
              {publishedArticles.map((article) => <Article.Item article={article} />)}
            </ul>
          </Col>
          <Col md={4}>
            <strong>More ways to keep in touch</strong>
            <ul>
              <li>
                <Link href="https://twitter.com/open_sanctions"><Twitter /></Link>
                {' '}
                <Link href="https://twitter.com/open_sanctions">Twitter</Link>
              </li>
              <li>
                <Link href="https://bit.ly/osa-slack"><Slack /></Link>
                {' '}
                <Link href="https://bit.ly/osa-slack">Slack chat</Link>
              </li>
              <li>
                <Link href="https://github.com/opensanctions/opensanctions"><Github /></Link>
                {' '}
                <Link href="https://github.com/opensanctions/opensanctions">Github code</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </LayoutFrame>
  )
}
