import Link from 'next/link';

import Dataset from '../../components/Dataset'
import { INDEX_URL, COLLECTIONS } from '../../lib/constants';
import { getDatasets } from '../../lib/data'
import { ICollection, isCollection, isExternal, isSource } from '../../lib/types';
import { JSONLink } from '../../components/util';
import { Row, Col, Container } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';


export default async function Page() {
  const allDatasets = await getDatasets()
  const datasets = allDatasets.filter((d) => !d.hidden);
  const allCollections = datasets.filter(isCollection)
  const collections = COLLECTIONS.map(n => allCollections.find(c => c.name == n)) as Array<ICollection>
  const sources = datasets.filter(isSource)
  const externals = datasets.filter(isExternal)
  return (
    <LayoutFrame activeSection="datasets">
      <Container>
        <h1>
          <a id="collections" />
          Collections
          <JSONLink href={INDEX_URL} />
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Collections</strong> are datasets
              provided by OpenSanctions that combine data from
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
              Can't find a data source you are looking for? <Link href="/contact/">Contact us</Link> to
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
    </LayoutFrame>
  )
}
