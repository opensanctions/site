import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Layout from '../../components/Layout'
import Dataset from '../../components/Dataset'
import { INDEX_URL, COLLECTIONS } from '../../lib/constants';
import { getDatasets } from '../../lib/data'
import { getDataCatalog } from '../../lib/schema'
import { ICollection, isCollection, isExternal, isSource } from '../../lib/types';
import { JSONLink } from '../../components/util';


export default function DatasetIndex({ datasets }: InferGetStaticPropsType<typeof getStaticProps>) {
  const structured = getDataCatalog()
  const allCollections = datasets.filter(isCollection)
  const collections = COLLECTIONS.map(n => allCollections.find(c => c.name == n)) as Array<ICollection>
  const sources = datasets.filter(isSource)
  const externals = datasets.filter(isExternal)
  return (
    <Layout.Base title="Datasets" structured={structured}>
      <Container>
        <h1>
          <a id="collections" />
          Collections
          <JSONLink href={INDEX_URL} />
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Collections</strong> are custom datasets
              provided by OpenSanctions that combine data from
              many sources based on a topic.
              {' '}<Link href="/docs/faq/#collections">Learn more...</Link>
            </p>
          </Col>
          <Col md={9}>
            <Row>
              {collections.map((d) => (
                <Col sm={6} key={d.name}>
                  <Dataset.Card dataset={d} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <hr />
        <h1>
          <a id="sources" />
          Data sources
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Data sources</strong> collect targeted entities from a
              particular origin. Many sources are published by government authorities
              or international organisations.
            </p>
            <p>
              Can't find a data source you are looking for? Check the page
              on <Link href="/docs/contribute/">contributing a data source</Link> to
              learn about planned additions and how you can help.
            </p>
          </Col>
          <Col md={9}>
            {sources.map((d) => (
              <Dataset.Item key={d.name} dataset={d} />
            ))}
          </Col>
        </Row>
        <hr />
        <h1>
          <a id="externals" />
          External databases
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>External databases</strong> are used
              to <Link href="/docs/enrichment/">enrich the data</Link> in
              OpenSanctions with additional properties and entities linked to
              entities of interest.
            </p>
            <p>
              Entities from external sources are only included if there is a
              confirmed match between an entity in the source data and the
              external database.
            </p>
          </Col>
          <Col md={9}>
            {externals.map((d) => (
              <Dataset.Item key={d.name} dataset={d} />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout.Base>
  )
}

export const getStaticProps = async () => {
  const datasets = await getDatasets()
  return {
    props: {
      datasets: datasets.filter((ds) => !ds.hidden)
    }
  }
}
