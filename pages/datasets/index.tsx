import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Layout from '../../components/Layout'
import Dataset from '../../components/Dataset'
import { getDatasets } from '../../lib/api'
import { getSchemaDataCatalog } from '../../lib/schema'
import { isCollection, isSource } from '../../lib/dataset';

export default function DatasetIndex({ datasets, structured }: InferGetStaticPropsType<typeof getStaticProps>) {
  const collections = datasets.filter(isCollection)
  const sources = datasets.filter(isSource)
  return (
    <Layout.Base title="Datasets" structured={structured}>
      <Container>
        <h1>
          Collections
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
            <Row>
              {sources.map((d) => (
                <Col sm={4} key={d.name}>
                  <Dataset.Card dataset={d} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout.Base>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      datasets: await getDatasets(),
      structured: await getSchemaDataCatalog()
    }
  }
}
