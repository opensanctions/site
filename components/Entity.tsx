import React, { useState } from 'react';
import Link from 'next/link'
import queryString from 'query-string';
import classNames from 'classnames';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Property } from '../lib/ftm/property';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

import { Entity } from '../lib/ftm'
import { IDataset, isExternal, isSource } from '../lib/types'
import { PropertyValues } from './Property';
import { FormattedDate, HelpLink, SpacedList, Summary } from './util';
import Dataset from './Dataset';

import styles from '../styles/Entity.module.scss'
import { LicenseInfo } from './Policy';


export type EntityRawLinkProps = {
  entity: Entity
  prop: string
}

export function EntityRawLink({ entity, prop }: EntityRawLinkProps) {
  const query = queryString.stringify({
    canonical_id: entity.id,
    prop: prop
  })
  return <a className={styles.rawLink} data-nosnippet rel="nofollow" href={`/statements/?${query}`}>[raw]</a>
}


export type EntityProps = {
  entity: Entity
  datasets?: Array<IDataset>
  showEmpty?: boolean
  via?: Property
}

export function EntityLink({ entity }: EntityProps) {
  return <Link href={`/entities/${entity.id}/`}>{entity.caption}</Link>
}

export function EntityPropsTable({ entity, via, datasets, showEmpty = false }: EntityProps) {
  const viaReverse = via?.getReverse();
  const props = entity.getDisplayProperties()
    .filter((p) => viaReverse === undefined || p.qname !== viaReverse.qname)
    .filter((p) => showEmpty || entity.getProperty(p).length > 0)

  return (
    <Table className={styles.cardTable} size="sm">
      <tbody>
        {props.map((prop) =>
          <tr key={prop.qname}>
            <th className={styles.cardProp}>{prop.label}</th>
            <td>
              <PropertyValues
                prop={prop}
                values={entity.getProperty(prop)}
                empty="not available"
                entity={EntityLink}
              />
            </td>
            <td className={styles.rawColumn}>
              <EntityRawLink entity={entity} prop={prop.name} />
            </td>
          </tr>
        )}
        {datasets !== undefined && datasets.length > 0 && (
          <tr key="datasets">
            <th className={styles.cardProp}>Data sources</th>
            <td>
              <SpacedList values={entity.datasets.map((n) => datasets.find((d) => d.name === n)).map((d) => <Dataset.Link dataset={d} />)} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}


export function EntityCard({ entity, via, showEmpty = false }: EntityProps) {
  return (
    <Card key={entity.id} className={styles.card}>
      <Card.Header>
        <strong>{entity.schema.label}</strong>
      </Card.Header>
      <EntityPropsTable entity={entity} via={via} showEmpty={showEmpty} />
    </Card>
  );
}

export type EntitySchemaTableProps = {
  entities: Array<Entity>,
  datasets?: Array<IDataset>,
  prop: Property
}

export function EntitySchemaTable({ entities, datasets, prop }: EntitySchemaTableProps) {
  const schema = prop.getRange();
  const reverse = prop.getReverse();
  if (schema === undefined || reverse === undefined) {
    return null;
  }
  const [expanded, setExpanded] = useState('none');
  let featuredNames = schema.featured;
  ['startDate', 'endDate'].forEach((p) => {
    if (schema.isA('Interval') && featuredNames.indexOf(p) === -1) {
      featuredNames.push(p);
    }
  })
  if (schema.isA('Address')) {
    featuredNames = ['full', 'country'];
  }
  const featured = featuredNames
    .filter((n) => n !== reverse.name)
    .map((n) => schema.getProperty(n))
    .filter(Property.isProperty);

  const toggleExpand = function (e: React.MouseEvent<HTMLAnchorElement>, entity: Entity) {
    e.preventDefault();
    setExpanded(expanded === entity.id ? 'none' : entity.id);
  }

  return (
    <Table bordered size="sm">
      <thead>
        <tr>
          <th colSpan={featured.length + 1}>
            {prop.label}
            <HelpLink href={`/reference/#schema.${schema.name}`} />
          </th>
        </tr>
        <tr>
          <th style={{ width: 0 }}></th>
          {featured.map((prop) => (
            <th key={prop.name} className={styles.tableHeader}>{prop.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => (
          <React.Fragment key={entity.id}>
            <tr key={entity.id}>
              <td style={{ width: 0 }}>
                <a onClick={(e) => toggleExpand(e, entity)} className={styles.expandButton}>
                  <>
                    {expanded === entity.id && (
                      <CaretUpFill />
                    )}
                    {expanded !== entity.id && (
                      <CaretDownFill />
                    )}
                  </>
                </a>
              </td>
              {featured.map((prop) => (
                <td key={prop.name} className={`type-${prop.type.name}`}>
                  <PropertyValues
                    prop={prop}
                    values={entity.getProperty(prop)}
                    empty="-"
                    limit={4}
                    entity={EntityLink}
                  />
                </td>
              ))}
            </tr>
            <tr key={`expand-${entity.id}`} className={classNames({ 'd-none': expanded !== entity.id })}>
              <td></td>
              <td colSpan={featured.length} className={styles.expandCell}>
                <EntityPropsTable
                  entity={entity}
                  datasets={datasets}
                  via={prop}
                  showEmpty={true}
                />
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table >
  );
}


export type EntitySidebarProps = {
  entity: Entity,
  rawLinks?: boolean
}

export function EntitySidebar({ entity, rawLinks = true }: EntitySidebarProps) {
  const properties = entity.getDisplayProperties();
  const sidebarProperties = properties.filter((p) => p.type.name !== 'entity' && p.name !== 'notes');
  return (
    <>
      <p>
        {rawLinks && (
          <span className={styles.rawFloat}>
            <EntityRawLink entity={entity} prop="id" />
          </span>
        )}
        <strong>Type</strong><br />
        <span>{entity.schema.label}</span>
      </p>
      {sidebarProperties.map((prop) =>
        <p key={prop.name}>
          <span className={styles.rawFloat}>
            <EntityRawLink entity={entity} prop={prop.name} />
          </span>
          <strong>{prop.label}</strong><br />
          <span>
            <PropertyValues
              prop={prop}
              values={entity.getProperty(prop)}
              limit={5}
              empty="not available"
            />
          </span>
        </p>
      )}
    </>
  );
}

export type EntityDisplayProps = {
  entity: Entity,
  datasets: Array<IDataset>
}

export function EntityDisplay({ entity, datasets }: EntityDisplayProps) {
  const properties = entity.getDisplayProperties();
  const entityProperties = properties.filter((p) => p.type.name === 'entity');
  const sources = datasets.filter(isSource);
  const externals = datasets.filter(isExternal);
  return (
    <Row>
      <Col md={9} className="order-2">
        {entity.hasProperty('notes') && (
          <div className={styles.entityPageSection}>
            {/* <h2>Notes</h2> */}
            {entity.getStringProperty('notes').sort((a, b) => b.length - a.length).map((v, idx) => (
              <Summary key={idx} summary={v as string} />
            ))}
          </div>
        )}
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
          <h3>Data sources</h3>
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
              For experts: <Link href={`/statements/?canonical_id=${entity.id}`}>raw data
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
        <EntitySidebar entity={entity} />
      </Col>
    </Row >
  );
}
