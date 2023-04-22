import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import Research from '../../../components/Research';
import { Row, Col, Nav, NavLink, Container } from '../../../components/wrapped';
import { getEntity, getEntityDatasets, getStatements, isBlocked } from '../../../lib/data';
import { Entity } from '../../../lib/ftm';
import { BlockedEntity, EntityWarning, LicenseInfo } from '../../../components/Policy';
import { isExternal, isSource } from '../../../lib/types';
import { HelpLink, SpacedList, Sticky } from '../../../components/util';
import Dataset from '../../../components/Dataset';
import { EntityFactsheet, EntityNote, EntitySchemaTable, EntityTopics } from '../../../components/Entity';
import LayoutFrame from '../../../components/layout/LayoutFrame';
import { REVALIDATE_BASE } from '../../../lib/constants';
import { EntityPageProps, generateEntityMetadata } from '../common';

import styles from '../../../styles/Entity.module.scss'
import { getSchemaEntityPage } from '../../../lib/schema';
import StructuredData from '../../../components/utils/StructuredData';

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata({ params }: EntityPageProps) {
  return generateEntityMetadata({ params: params });
}

export default async function EntityPage({ params }: EntityPageProps) {
  const entity = await getEntity(params.entityId);
  if (entity === null) {
    notFound();
  }
  if (entity.id !== params.entityId) {
    redirect(`/entities/${entity.id}/`);
  }
  const notesResp = await getStatements({ canonical_id: entity.id, prop: 'notes' });
  const notesRaw = notesResp === null ? [] : notesResp?.results;
  const notes = notesRaw.sort((a, b) => a.dataset.localeCompare(b.dataset))
  if (isBlocked(entity)) {
    return <BlockedEntity entity={entity} />
  }
  const datasets = await getEntityDatasets(entity);
  const structured = getSchemaEntityPage(entity, datasets);
  const properties = entity.getDisplayProperties();
  const entityProperties = properties.filter((p) => p.type.name === 'entity');
  const sources = datasets.filter(isSource);
  const externals = datasets.filter(isExternal);
  return (
    <LayoutFrame activeSection="research">
      <StructuredData data={structured} />
      <Research.Context hidePrint>
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={9}>
              <h1>
                {entity.caption}
              </h1>
              <a id="factsheet"></a>
              <EntityTopics entity={entity} />
            </Col>
          </Row>
          <Row>
            <Col md={9} className="order-2">
              <EntityWarning entity={entity} />
              <EntityFactsheet entity={entity} />
              {notes.length > 0 && (
                <div className={styles.entityPageSection}>
                  <h2><a id="notes"></a>Descriptions</h2>
                  {notes.map((stmt) => (
                    <EntityNote key={stmt.id} note={stmt} datasets={datasets} />
                  ))}
                </div>
              )}
              {entityProperties.length > 0 && (
                <>
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
                </>
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
                <hr />
                {entity.referents.length > 0 && (
                  <>
                    Source data IDs<HelpLink href="/docs/identifiers/" />: <SpacedList values={entity.referents.map((r) => <code>{r}</code>)} />
                  </>
                )}
                <p>For experts: <Link rel="nofollow" href={`/statements/?canonical_id=${entity.id}`}>raw data
                  explorer</Link></p>
              </div>
            </Col>
            <Col md={3} className="order-1">
              <Sticky>
                <Nav className="flex-column d-print-none">
                  <NavLink href="#factsheet">Factsheet</NavLink>
                  {notes.length > 0 && <NavLink href="#notes">Descriptions</NavLink>}
                  {entityProperties.length > 0 && <NavLink href="#links">Relationships</NavLink>}
                  <NavLink href="#sources">Data sources</NavLink>
                </Nav>
                <LicenseInfo />
              </Sticky>
            </Col>
          </Row>
        </Container>
      </Research.Context>
    </LayoutFrame>
  )
}
