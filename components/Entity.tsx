import React from 'react';
import Link from 'next/link'
import queryString from 'query-string';

import { Table } from "./wrapped";
import { Entity, Property, Schema } from '../lib/ftm';
import { compareDisplayProps } from '../lib/ftm/ordering';
import { IDataset, isCollection, IStatement } from '../lib/types';
import { isBlocked, isIndexRelevant } from '../lib/data';
import { PropertyValues } from './Property';
import { FormattedDate, HelpLink, SpacedList, UnofficialBadge } from './util';
import Dataset from './Dataset';

import styles from '../styles/Entity.module.scss';
import { DetailPopup } from './utils/DetailPopup';


export interface EntityRawLinkProps {
  entity: Entity
  prop: string
}

export function EntityRawLink({ entity, prop }: EntityRawLinkProps) {
  const query = queryString.stringify({
    canonical_id: entity.id,
    prop: prop
  })
  return <Link className={styles.rawLink} data-nosnippet prefetch={false} href={`/statements/?${query}`}>[sources]</Link>
}

export interface EntityDisplayProps {
  entity: Entity
  via?: Property
}

export function EntityLink({ entity, children }: React.PropsWithChildren<EntityDisplayProps>) {
  if (isBlocked(entity)) {
    return <a href={`/entities/${entity.id}/`} rel='nofollow'>[blocked entity]</a>
  }
  const rel = isIndexRelevant(entity) ? '' : 'nofollow';
  const content = children || entity.caption;
  return <a href={`/entities/${entity.id}/`} rel={rel}>{content}</a>
}


export interface EntityPropsTableProps extends EntityDisplayProps {
  entity: Entity
  datasets: Array<IDataset>
  showEmpty?: boolean
  via?: Property
}

export function EntityPropsTable({ entity, via, datasets, showEmpty = false }: EntityPropsTableProps) {
  const viaReverse = via?.getReverse();
  const props = entity.getDisplayProperties()
    .filter((p) => viaReverse === undefined || p.qname !== viaReverse.qname)
    // .filter((p) => p.getRange() === undefined)
    .filter((p) => showEmpty || entity.getProperty(p).length > 0)
    .sort(compareDisplayProps);

  const entityDatasets = datasets.filter((d) => entity.datasets.indexOf(d.name) !== -1);

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
        {entityDatasets.length > 0 && (
          <tr key="datasets">
            <th className={styles.cardProp}>Data sources</th>
            <td colSpan={2}>
              <SpacedList values={entityDatasets.map((d) => <Dataset.Link dataset={d} />)} />
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
    .sort(compareDisplayProps);

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

export type FeaturedValuesProps = {
  entity: Entity,
  schema: Schema,
  prop: Property
}

function FeaturedValues({ entity, schema, prop }: FeaturedValuesProps) {
  const values = <PropertyValues
    prop={prop}
    values={entity.getProperty(prop)}
    empty="-"
    limit={4}
    entity={EntityLink}
  />;
  if (prop.type.name === 'entity') {
    return values;
  }
  if (schema.isA('Thing') && schema.caption.indexOf(prop.name) !== -1) {
    return <EntityLink entity={entity}>{values}</EntityLink>;
  }
  return values;
}


export type EntitySchemaTableProps = {
  entities: Array<Entity>,
  datasets: Array<IDataset>,
  prop: Property
}

export function EntitySchemaTable({ entities, datasets, prop }: EntitySchemaTableProps) {
  const schema = prop.getRange();
  const reverse = prop.getReverse();
  if (schema === undefined || reverse === undefined) {
    return null;
  }
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

  return (
    <>
      <a id={`rel.${prop.name}`} />
      <Table bordered size="sm">
        <thead>
          <tr>
            <th colSpan={featured.length + 1}>
              {prop.label}
              <HelpLink href={`/reference/#schema.${schema.name}`} />
            </th>
          </tr>
          <tr>
            {featured.map((prop) => (
              <th key={prop.name} className={styles.tableHeader}>{prop.label}</th>
            ))}
            <th style={{ width: 0 }}></th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => (
            <React.Fragment key={entity.id}>
              <tr key={entity.id}>
                {featured.map((prop) => (
                  <td key={prop.name} className={`type-${prop.type.name}`}>
                    <FeaturedValues prop={prop} entity={entity} schema={schema} />
                  </td>
                ))}
                <td style={{ width: 0 }}>
                  <DetailPopup title={entity.caption}>
                    <EntityPropsTable
                      entity={entity}
                      datasets={datasets}
                      showEmpty={true}
                      via={prop}
                    />
                  </DetailPopup>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
}


interface EntityNoteProps {
  note: IStatement
  datasets: IDataset[]
}

export function EntityNote({ note, datasets }: EntityNoteProps) {
  const dataset = datasets.find(d => d.name == note.dataset);
  return (
    <figure key={note.id} className={styles.statementNote}>
      <blockquote>
        <p>{note.value}</p>
      </blockquote>
      <figcaption>—{' '}
        {dataset !== undefined && (
          <>
            <Dataset.Link dataset={dataset} />
            {!isCollection(dataset) && !dataset.publisher?.official && (
              <>
                {' '}<UnofficialBadge />
              </>
            )}
            {', '}
          </>
        )}
        <FormattedDate date={note.first_seen} />
      </figcaption>
    </figure>
  );
}

interface EntityTopicsProps {
  entity: Entity
}


export function EntityTopics({ entity }: EntityTopicsProps) {
  const prop = entity.schema.getProperty('topics');
  if (prop === undefined) {
    return null;
  }
  const values = entity.getProperty(prop);
  const isSanctioned = values.indexOf('sanction') !== -1;
  const isPEP = values.indexOf('role.pep') !== -1;
  const showPEP = !isSanctioned && isPEP;
  const isRCA = values.indexOf('role.rca') !== -1;
  const showRCA = (!isSanctioned && !isPEP && isRCA);
  const isOther = (!isSanctioned && !isPEP && !isRCA);
  const isPerson = entity.schema.isA("Person");
  const showPersonOther = isOther && isPerson;
  const showEntityOther = isOther && !isPerson;
  return (
    <div className={styles.topicsArea}>
      {values.length > 0 && (
        <div className={styles.topicsList}>
          <PropertyValues prop={prop} values={values} />
        </div>
      )}
      <div className={styles.topicsNarrative}>
        {isSanctioned && (
          <>
            {entity.caption} is subject to sanctions.
            <> See <a href="#rel.sanctions">the individual program listings</a> below.</>
            {isPEP && (
              <> They are also a <Link href="/pep/">politically exposed person</Link>.</>
            )}
          </>
        )}
        {showPEP && (
          <>
            {entity.caption} is a <Link href="/pep/">politically exposed person</Link>.
            They are a <Link href="/docs/criteria/">person of interest</Link>, but have not been
            found on international sanctions lists.
          </>
        )}
        {showRCA && (
          <>
            {entity.caption} is a family member or associate of a <Link href="/pep/">politically exposed person</Link>.
            They have not been found on international sanctions lists.
          </>
        )}
        {showPersonOther && (
          <>
            {entity.caption} is a <Link href="/docs/criteria/">person of interest</Link>.
            They have not been found on international sanctions lists.
          </>
        )}
        {showEntityOther && (
          <>
            {entity.caption} is an <Link href="/docs/criteria/">entity of interest</Link>.
            It has not been found on international sanctions lists.
          </>
        )}
      </div>
    </div >
  );
}