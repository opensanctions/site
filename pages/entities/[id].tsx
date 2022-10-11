import Link from 'next/link';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import Layout from '../../components/Layout';
import Research from '../../components/Research';
import { fetchIndex, getEntity, getEntityDatasets, isBlocked } from '../../lib/data';
import { getSchemaEntityPage } from '../../lib/schema';
import { Entity, Model } from '../../lib/ftm';
import { BlockedEntity, LicenseInfo } from '../../components/Policy';
import { isExternal, isSource } from '../../lib/types';
import { FormattedDate, HelpLink, SpacedList, Summary } from '../../components/util';
import Dataset from '../../components/Dataset';
import { EntityFactsheet, EntitySchemaTable } from '../../components/Entity';

import styles from '../../styles/Entity.module.scss'
import { PropertyValues } from '../../components/Property';


export default function EntityPage({ entityData, blocked, modelData, datasets }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blocked) {
    return <BlockedEntity entity={entityData} />
  }
  const model = new Model(modelData);
  const entity = model.getEntity(entityData);
  const topicsProp = entity.schema.getProperty('topics');
  const structured = getSchemaEntityPage(entity, datasets);
  const properties = entity.getDisplayProperties();
  const entityProperties = properties.filter((p) => p.type.name === 'entity');
  const sources = datasets.filter(isSource);
  const externals = datasets.filter(isExternal);
  return (
    <Layout.Base title={entity.caption} structured={structured} activeSection="research">
      <Research.Context>
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={9}>
              <h1>
                <a id="factsheet"></a>
                {entity.caption}
              </h1>
              {topicsProp && (
                <PropertyValues
                  prop={topicsProp}
                  values={entity.getProperty(topicsProp)}
                />
              )}
            </Col>
          </Row>
          <Row>
            <Col md={9} className="order-2">
              <EntityFactsheet entity={entity} />
              {entity.hasProperty('notes') && (
                <div className={styles.entityPageSection}>
                  <h2><a id="notes"></a>Description</h2>
                  {entity.getStringProperty('notes').sort((a, b) => b.length - a.length).map((v, idx) => (
                    <Summary key={idx} summary={v as string} />
                  ))}
                </div>
              )}
              <h2><a id="links"></a>Relationships</h2>
              {entityProperties.map((prop) =>
                <div className={styles.entityPageSection} key={prop.qname}>
                  <EntitySchemaTable
                    prop={prop}
                    entities={entity.getProperty(prop).map((v) => v as Entity)}
                    datasets={datasets}
                  />
                </div>
              )}
              <div className={styles.entityPageSection}>
                <h2><a id="sources"></a>Data sources</h2>
                {sources.map((d) => (
                  <Dataset.Item key={d.name} dataset={d} />
                ))}
                {externals.length > 0 && (
                  <>
                    {sources.length > 0 && (
                      <h5>External databases</h5>
                    )}
                    <p>
                      The record has
                      been <Link href="/docs/enrichment/">enriched with data</Link> from
                      the following external databases:
                    </p>
                    {externals.map((d) => (
                      <Dataset.Item key={d.name} dataset={d} />
                    ))}
                  </>
                )}
              </div>
              <div className={styles.entityPageSection}>
                <h3>About this page</h3>
                <ul>
                  <li>
                    This page describes an entity that is documented as part of the <Link href="/docs/about/">OpenSanctions
                      project</Link> in the public interest (<Link href="/docs/faq/">FAQ</Link>).
                  </li>
                  <li>
                    The entity was added <FormattedDate date={entity.first_seen} /> and last updated <FormattedDate date={entity.last_seen} />.
                  </li>
                  <li>
                    For experts: <Link rel="nofollow" href={`/statements/?canonical_id=${entity.id}`}>raw data
                      explorer</Link> with per-attribute information on data provenance.
                  </li>
                </ul>
                <LicenseInfo />
                {entity.referents.length > 0 && (
                  <>
                    <hr />
                    Source data IDs<HelpLink href="/docs/identifiers/" />: <SpacedList values={entity.referents.map((r) => <code>{r}</code>)} />
                  </>
                )}
              </div>
            </Col>
            <Col md={3} className="order-1">
              <div className="position-fixed">
                <Nav navbarScroll className="flex-column">
                  <Nav.Link href="#factsheet">Factsheet</Nav.Link>
                  <Nav.Link href="#notes">Description</Nav.Link>
                  <Nav.Link href="#links">Relationships</Nav.Link>
                  <Nav.Link href="#sources">Data sources</Nav.Link>
                </Nav>
              </div>
            </Col>
          </Row >
        </Container>
      </Research.Context>
    </Layout.Base>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const entityId = context.params?.id as (string | undefined);
  const entity = await getEntity(entityId);
  if (entity === null) {
    return { notFound: true }
  }
  const index = await fetchIndex();
  if (entity.id !== entityId) {
    return { redirect: { destination: `/entities/${entity.id}/`, permanent: true } };
  }
  return {
    props: {
      entityId,
      blocked: isBlocked(entity),
      datasets: await getEntityDatasets(entity),
      entityData: entity,
      modelData: index.model
    },
    revalidate: 3600
  };
}


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
