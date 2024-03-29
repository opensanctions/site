import Link from 'next/link'

import { getDatasets } from '../lib/data'
import { CLAIM, SUBCLAIM, SPACER, COLLECTIONS, ARTICLE_INDEX_SUMMARY, REVALIDATE_BASE } from '../lib/constants'
import { Search } from 'react-bootstrap-icons';
import { FormattedDate, NumericBadge } from '../components/util';
import { ICollection, isCollection } from '../lib/types';
import { getArticles } from '../lib/content';
import Dataset from '../components/Dataset';
import Article from '../components/Article';
import { Col, Row, Container, Form, FormControl, Badge, Button, ButtonGroup, InputGroup } from '../components/wrapped';
import LayoutFrame from '../components/layout/LayoutFrame';
import { getSchemaWebSite } from "../lib/schema";
import StructuredData from '../components/utils/StructuredData';
import { getGenerateMetadata } from '../lib/meta';

import styles from '../styles/Home.module.scss'
import articleStyles from '../styles/Article.module.scss'
import claimStyles from '../styles/ClaimBanner.module.scss'
import utilStyles from '../styles/util.module.scss'

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata() {
  return getGenerateMetadata({
    title: `OpenSanctions: ${CLAIM}`,
    description: SUBCLAIM
  })
}

export default async function Page() {
  const articles = await getArticles()
  const publishedArticles = articles.filter((a) => !a.draft);
  const datasets = await getDatasets()
  const collections = datasets.filter(isCollection)
  const refDataset = collections.find((c) => c.name === 'default');
  const sortedCollections = COLLECTIONS.map((name) => collections.find((c) => c.name === name)) as Array<ICollection>
  const datasetCount = (refDataset?.externals?.length || 0) + (refDataset?.sources?.length || 0);
  return (
    <LayoutFrame>
      <StructuredData data={getSchemaWebSite()} />
      <div className={claimStyles.claimBanner}>
        <Container>
          <Row>
            <Col md={8}>
              <h1 className={claimStyles.claim}>
                {CLAIM}
              </h1>
              <p className={claimStyles.subClaim}>
                {SUBCLAIM}
              </p>
              <div className={styles.search}>
                <Form action="/search/" className="d-print-none">
                  <InputGroup size="lg" className="mb-6">
                    <FormControl
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
              {refDataset && (
                <p className={styles.stats}>
                  <NumericBadge value={refDataset.thing_count} /> entities
                  {SPACER}
                  <NumericBadge value={datasetCount} /> data sources
                  {SPACER}
                  updated{' '}
                  <Badge>
                    <FormattedDate date={refDataset.last_change} />
                  </Badge>
                  {SPACER}
                  <Link href="/datasets">get bulk data</Link>
                </p>
              )}
            </Col>
            <Col md={4} className="d-none d-md-block">
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={4} className={utilStyles.explainer}>
            <h2>People and companies that matter</h2>
            Persons of interest data provides the key that helps analysts find evidence of
            corruption, money laundering and other criminal activity.
          </Col>
          <Col md={4} className={utilStyles.explainer}>
            <h2>Clean data and transparent process</h2>
            Our open source data pipeline takes on the complex task of building a clean,
            de-duplicated, and <Link href="/reference/">well-understood dataset</Link>.
          </Col>
          <Col md={4} className={utilStyles.explainer}>
            <h2>Sources with global scope</h2>
            We integrate data from over eighty global sources, including official sanctions
            lists, data on politically exposed persons and entities of criminal interest.
          </Col>
        </Row>
      </Container>
      <div className={styles.commercialBanner}>
        <Container>
          <h2>Use OpenSanctions to manage business risk</h2>
          <Row>
            <Col md={8}>
              <p>
                OpenSanctions is <strong>free for non-commercial users.</strong> Business
                and commercial users must either acquire a data license to use our high-quality
                dataset, or subscribe to our pay-as-you-go API service.
              </p>
            </Col>
            <Col md={4} className="d-print-none">
              <ButtonGroup>
                <Button size="lg" href="/api/" variant="secondary">Use the API</Button>
                <Button size="lg" href="/licensing/" variant="light">License bulk data</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className={utilStyles.explainer}>
          <h2>News &amp; updates</h2>
          <Col md={3}>
            <p>
              {ARTICLE_INDEX_SUMMARY}
            </p>
          </Col>
          <Col md={9}>
            <ul className={articleStyles.articleList}>
              {publishedArticles.map((article) => <Article.Item key={article.slug} article={article} />)}
            </ul>
            <p>
              See <Link href="/articles">all of our project updates</Link>...
            </p>
          </Col>
        </Row>
        <Row className={utilStyles.explainer}>
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
    </LayoutFrame>
  )
}
