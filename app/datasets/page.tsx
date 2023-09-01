import Link from 'next/link';

import Dataset from '../../components/Dataset'
import { INDEX_URL, COLLECTIONS, REVALIDATE_BASE } from '../../lib/constants';
import { getDatasets } from '../../lib/data'
import { ICollection, isCollection, isExternal, isSource } from '../../lib/types';
import { JSONLink } from '../../components/util';
import { Row, Col, Container } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getDataCatalog } from '../../lib/schema';
import StructuredData from '../../components/utils/StructuredData';
import { getGenerateMetadata } from '../../lib/meta';

export const revalidate = REVALIDATE_BASE;


export async function generateMetadata() {
  return getGenerateMetadata({
    title: `Datasets`
  })
}


export default async function Page() {
  const allDatasets = await getDatasets()
  const datasets = allDatasets.filter((d) => !d.hidden);
  const allCollections = datasets.filter(isCollection)
  const allSources = datasets.filter((d) => !isCollection(d));
  const collections = COLLECTIONS.map(n => allCollections.find(c => c.name == n)) as Array<ICollection>
  return (
    <LayoutFrame activeSection="datasets">
      <StructuredData data={getDataCatalog()} />
      <Container>
        <h1>
          <a id="collections" />
          Collections
          <JSONLink href={INDEX_URL} />
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Collections</strong> are data
              distributions provided by OpenSanctions that combine entities from
              many sources based on a topic.
              {' '}<a href="/docs/faq/#collections">Learn more...</a>
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
        <hr className="d-print-none" />
        <h1 className="new-page">
          <a id="sources" />
          Data sources
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Data sources</strong> collect entities from a
              particular origin. Many sources are published by government authorities
              or international organisations.
            </p>
            <p>
              Can't find a data source you are looking for? <Link href="/contact/">Contact us</Link> to
              learn about planned additions and how you can help.
            </p>
          </Col>
          <Col md={9}>
            <Dataset.DatasetsTable datasets={allSources} />
          </Col>
        </Row>
      </Container>
    </LayoutFrame>
  )
}
