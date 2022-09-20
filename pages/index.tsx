import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

import styles from '../styles/Home.module.scss'
import articleStyles from '../styles/Article.module.scss'
import Layout from '../components/Layout'
import { getDatasets } from '../lib/data'
import { CLAIM, SUBCLAIM, SPACER, COLLECTIONS, ARTICLE_INDEX_SUMMARY } from '../lib/constants'
import { getSchemaWebSite } from '../lib/schema';
import { Search } from 'react-bootstrap-icons';
import { FormattedDate, NumericBadge } from '../components/util';
import { ICollection, isCollection, isSource } from '../lib/types';
import { getArticles } from '../lib/content';
import Dataset from '../components/Dataset';
import Article from '../components/Article';


export default function Home({ collections, sourceCount, articles }: InferGetStaticPropsType<typeof getStaticProps>) {
  const structured = getSchemaWebSite()
  const all = collections.find((c) => c.name === 'all');
  if (all === undefined) {
    return null;
  }
  const sortedCollections = COLLECTIONS.map((name) => collections.find((c) => c.name === name)) as Array<ICollection>
  return (
    <Layout.Base title={CLAIM} description={SUBCLAIM} structured={structured}>
      <div className={styles.claimBanner}>
        <Container>
          <Row>
            <Col md={8}>
              <h1 className={styles.claim}>
                {CLAIM}
              </h1>
              <p className={styles.subClaim}>
                {SUBCLAIM}
              </p>
              <div className={styles.search}>
                <Form action="/search/">
                  <InputGroup size="lg" className="mb-6">
                    <Form.Control
                      type="search"
                      name="q"
                      autoFocus={true}
                      placeholder={`Search people and companies in our database...`}
                      aria-label="Search"
                    />
                    <Button variant="secondary" type="submit">
                      <Search className="bsIcon" />{' '}
                      Search
                    </Button>
                  </InputGroup>
                </Form>
              </div>
              <p className={styles.stats}>
                <NumericBadge value={all.target_count} className={styles.statsBadge} /> targets
                {SPACER}
                <NumericBadge value={sourceCount} className={styles.statsBadge} /> data sources
                {SPACER}
                updated{' '}
                <Badge className={styles.statsBadge}>
                  <FormattedDate date={all.last_change} />
                </Badge>
                {SPACER}
                <Link href="/datasets">get bulk data</Link>
              </p>
            </Col>
            <Col md={4} className="d-none d-md-block">

            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={4} className={styles.explainer}>
            <h2>People and companies that matter</h2>
            Persons of interest data provides the key that helps analysts find evidence of
            corruption, money laundering and other criminal activity.
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Clean data and transparent process</h2>
            We consolidate data from a <Link href="/datasets/#sources">broad range of sources</Link> and take on the
            complex task of transforming it into a clean and <Link href="/reference/">well-understood
              dataset</Link>.
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Open source code and data</h2>
            OpenSanctions makes both its database and processing tools available
            for free. It's easy to <Link href="/docs/usage/">use the data</Link>
            {' '}and <Link href="/docs/api/">integrate the technology</Link>.
          </Col>
        </Row>
        <Row className={styles.explainer}>
          <h2>News &amp; updates</h2>
          <Col md={3}>
            <p>
              {ARTICLE_INDEX_SUMMARY}
            </p>
          </Col>
          <Col md={9}>
            <ul className={articleStyles.articleList}>
              {articles.map((article) => <Article.Item key={article.slug} article={article} />)}
            </ul>
            <p>
              See <Link href="/articles">all of our project updates</Link>...
            </p>
          </Col>
        </Row>
        <Row className={styles.explainer}>
          <h2>Collections</h2>
          <Col md={3}>
            <p>
              <Link href="/docs/faq/#collections">Collections</Link> are datasets
              provided by OpenSanctions that combine data from <Link href="/datasets/#sources">
                various data sources</Link> focussed on a topic.
            </p>
          </Col>
          <Col md={9}>
            <Row>
              {sortedCollections.map((d) => (
                <Col sm={6} key={d.name}>
                  <Dataset.Card dataset={d} key={d.name} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout.Base >
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const articles = await getArticles()
  const datasets = await getDatasets()
  const collections = datasets.filter(isCollection)
  const sources = datasets.filter(isSource)
  return {
    props: {
      collections,
      sourceCount: sources.length,
      articles: articles.slice(0, 3)
    }
  }
}
