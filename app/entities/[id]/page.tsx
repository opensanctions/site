import Link from 'next/link';

import Research from '../../../components/Research';
import { Row, Col, Nav, NavLink, Container } from '../../../components/wrapped';
import { getEntity, getEntityDatasets, getStatements, isBlocked } from '../../../lib/data';
import { Entity } from '../../../lib/ftm';
import { BlockedEntity, EntityWarning, LicenseInfo } from '../../../components/Policy';
import { isExternal, isSource } from '../../../lib/types';
import { HelpLink, SpacedList, Sticky } from '../../../components/util';
import Dataset from '../../../components/Dataset';
import { EntityFactsheet, EntityNote, EntitySchemaTable, EntityTopics } from '../../../components/Entity';

import { notFound, redirect } from 'next/navigation';
import LayoutFrame from '../../../components/layout/LayoutFrame';
import { EntityPageProps } from './common';

import styles from '../../../styles/Entity.module.scss'


export default async function EntityPage({ params }: EntityPageProps) {
  const entity = await getEntity(params.id);
  if (entity === null) {
    notFound();
  }
  if (entity.id !== params.id) {
    redirect(`/entities/${entity.id}/`);
  }
  const notesResp = await getStatements({ canonical_id: entity.id, prop: 'notes' });
  const notesRaw = notesResp === null ? [] : notesResp?.results;
  const notes = notesRaw.sort((a, b) => a.dataset.localeCompare(b.dataset))
  if (isBlocked(entity)) {
    return <BlockedEntity entity={entity} />
  }
  const properties = entity.getDisplayProperties();
  const entityProperties = properties.filter((p) => p.type.name === 'entity');
  const datasets = await getEntityDatasets(entity);
  const sources = datasets.filter(isSource);
  const externals = datasets.filter(isExternal);
  return (
    <LayoutFrame activeSection="research">
      <Research.Context>
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
                <Nav className="flex-column">
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
