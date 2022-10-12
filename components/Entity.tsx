import React, { useState } from 'react';
import Link from 'next/link'
import queryString from 'query-string';
import classNames from 'classnames';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { Property } from '../lib/ftm/property';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

import { Entity } from '../lib/ftm';
import { IDataset } from '../lib/types';
import { isBlocked } from '../lib/data';
import { PropertyValues } from './Property';
import { HelpLink, SpacedList } from './util';
import Dataset from './Dataset';

import styles from '../styles/Entity.module.scss'



export type EntityRawLinkProps = {
  entity: Entity
  prop: string
}

export function EntityRawLink({ entity, prop }: EntityRawLinkProps) {
  const query = queryString.stringify({
    canonical_id: entity.id,
    prop: prop
  })
  return <a className={styles.rawLink} data-nosnippet rel="nofollow" href={`/statements/?${query}`}>[sources]</a>
}


export type EntityLinkProps = {
  entity: Entity
}

export function EntityLink({ entity }: EntityLinkProps) {
  if (isBlocked(entity)) {
    return <Link href={`/entities/${entity.id}/`}>[blocked entity]</Link>
  }
  return <Link href={`/entities/${entity.id}/`}>{entity.caption}</Link>
}


export type EntityPropsTableProps = {
  entity: Entity
  datasets?: Array<IDataset>
  showEmpty?: boolean
  via?: Property
}

export function EntityPropsTable({ entity, via, datasets, showEmpty = false }: EntityPropsTableProps) {
  const viaReverse = via?.getReverse();
  const props = entity.getDisplayProperties()
    .filter((p) => viaReverse === undefined || p.qname !== viaReverse.qname)
    .filter((p) => p.getRange() === undefined)
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
                limit={5}
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



export type EntityFactsheetProps = {
  entity: Entity
}

export function EntityFactsheet({ entity }: EntityFactsheetProps) {
  const skip = ['notes', 'topics'];
  const props = entity.getDisplayProperties()
    .filter((p) => p.getRange() === undefined)
    .filter((p) => skip.indexOf(p.name) === -1)

  return (
    <Table className={styles.factsheet}>
      <tbody>
        <tr>
          <th className={styles.cardProp}>Type</th>
          <td>{entity.schema.label}</td>
          <td className={styles.rawColumn}>
            <EntityRawLink entity={entity} prop="id" />
          </td>
        </tr>
        {props.map((prop) =>
          <tr key={prop.qname}>
            <th className={styles.cardProp}>{prop.label}</th>
            <td>
              <PropertyValues
                prop={prop}
                values={entity.getProperty(prop)}
                empty="not available"
                limit={5}
                entity={EntityLink}
              />
            </td>
            <td className={styles.rawColumn}>
              <EntityRawLink entity={entity} prop={prop.name} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}


export function EntityCard({ entity, via, showEmpty = false }: EntityPropsTableProps) {
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
