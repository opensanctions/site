import Link from 'next/link';
import { Model } from '../lib/ftm/model';
import queryString from "query-string";

import { Card, CardHeader, ListGroup, ListGroupItem, Badge } from './wrapped';
import { IEntityDatum, Values } from '../lib/ftm';
import { IDataset, ISearchFacet } from "../lib/types";
import { NumericBadge, Spacer } from "./util";
import { SEARCH_DATASET, SEARCH_SCHEMA } from "../lib/constants";
import { EntityLink } from './Entity';
import { TypeValue, TypeValues } from './Property';
import { ensureArray } from '../lib/util';
import { ServerSearchParams } from './utils/PageProps';

import styles from '../styles/Search.module.scss'



type SearchFacetProps = {
  field: string
  facet: ISearchFacet
  searchParams: ServerSearchParams
}

export function SearchFacet({ field, facet, searchParams }: SearchFacetProps) {
  const filters = ensureArray(searchParams[field]);
  if (!facet.values.length) {
    return null;
  }

  const filteredUrl = (value: string) => {
    const idx = filters.indexOf(value);
    const newFilters = idx === -1 ? [...filters, value] : filters.filter((e) => e !== value);
    const param = newFilters.length ? newFilters : undefined;
    const newQuery = { ...searchParams, [field]: param };
    return queryString.stringifyUrl({ url: '/search/', query: newQuery });
  }

  return (
    <div className={styles.facet}>
      <Card>
        <CardHeader>{facet.label}</CardHeader>
        <ListGroup variant="flush">
          {facet.values.map((value) => (
            <ListGroupItem key={value.name}
              active={filters.indexOf(value.name) !== -1}
              as={Link}
              href={filteredUrl(value.name)}
              className={styles.facetListItem}
              prefetch={false}
            >
              <NumericBadge value={value.count} bg="light" className={styles.facetCount} />
              <span className={styles.facetLabel}>{value.label}</span>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}

type SearchFilterTagsProps = {
  model: Model
  scope: IDataset
  datasets: Array<IDataset>
  searchParams: ServerSearchParams
}

export function SearchFilterTags({ scope, model, datasets, searchParams }: SearchFilterTagsProps) {
  const unfilterUrl = (field: string, value: string) => {
    const values = ensureArray(searchParams[field]).filter((v) => v !== value);
    const newQuery = { ...searchParams, [field]: values }
    return queryString.stringifyUrl({ url: '/search/', query: newQuery });
  }
  const filters = [];
  const schema = searchParams['schema'];
  if (schema !== null && schema !== undefined && schema !== SEARCH_SCHEMA) {
    filters.push({
      'field': 'schema',
      'value': schema as string,
      'label': model.getSchema(schema as string).plural
    })
  }
  if (scope.name !== SEARCH_DATASET) {
    filters.push({
      'field': 'scope',
      'value': scope.name,
      'label': scope.title
    })
  }
  const countries = ensureArray(searchParams['countries']);
  const countryType = model.getType('country');
  for (let country of countries) {
    if (country.trim().length) {
      filters.push({
        'field': 'countries',
        'value': country,
        'label': <TypeValue type={countryType} value={country} plain={true} />
      })
    }
  }

  const topics = ensureArray(searchParams['topics']);
  const topicType = model.getType('topic');
  for (let topic of topics) {
    if (topic.trim().length) {
      filters.push({
        'field': 'topics',
        'value': topic,
        'label': <TypeValue type={topicType} value={topic} plain={true} />
      })
    }
  }

  const datasetNames = ensureArray(searchParams['datasets']);
  for (let dataset of datasetNames) {
    const ds = datasets.find((d) => d.name == dataset)
    if (ds !== undefined) {
      filters.push({
        'field': 'datasets',
        'value': dataset,
        'label': ds.title
      })
    }
  }

  if (filters.length === 0) {
    return null;
  }
  return (
    <p className={styles.tagsSection}>
      <Badge bg="light">Filtered:</Badge>{' '}
      {filters.map((spec) =>
        <span key={`${spec.field}:${spec.value}`}>
          <a href={unfilterUrl(spec.field, spec.value)}>
            <Badge className={styles.tagsButton}>
              {spec.label}
            </Badge>
          </a>
          {' '}
        </span>
      )}
    </p>
  )
}

type SearchResultEntityProps = {
  data: IEntityDatum
  model: Model
}

export function SearchResultEntity({ data, model }: SearchResultEntityProps) {
  const entity = model.getEntity(data);
  const countryType = model.getType('country');
  const countries = entity.getTypeValues(countryType) as Values;
  const topicType = model.getType('topic');
  const topics = entity.getTypeValues(topicType) as Values;
  return (
    <li key={entity.id} className={styles.resultItem}>
      <div className={styles.resultTitle}>
        <EntityLink entity={entity} />
      </div>
      <p className={styles.resultDetails}>
        <Badge bg="light">{entity.schema.label}</Badge>
        {topics.length > 0 && (
          <>
            <Spacer />
            <TypeValues type={topicType} values={topics} />
          </>
        )}
        {countries.length > 0 && (
          <>
            <Spacer />
            <TypeValues type={countryType} values={countries} />
          </>
        )}
      </p>
    </li>
  );
}
