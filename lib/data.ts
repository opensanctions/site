import 'server-only';
import queryString from 'query-string';
import intersection from 'lodash/intersection';
import { Entity, IEntityDatum, Model } from "./ftm";
import { IDataset, isDataset, ICollection, ISource, IIssueIndex, IIndex, IIssue, IStatementAPIResponse, ISitemapEntity, IExternal, IRecentEntity, INKDataCatalog, IMatchAPIResponse, IMatchQuery, IAlgorithmResponse, ISearchAPIResponse, isCollection } from "./types";
import { BASE_URL, API_TOKEN, API_URL, BLOCKED_ENTITIES, GRAPH_CATALOG_URL, REVALIDATE_BASE, REVALIDATE_SHORT, SEARCH_DATASET } from "./constants";

import indexJson from '../data/index.json';
import { markdownToHtml } from './util';

const cacheBase = { next: { revalidate: REVALIDATE_BASE } };
const cacheShort = { next: { revalidate: REVALIDATE_SHORT } };

const index = indexJson as any as IIndex;
const ftmModel = new Model(index.model);


async function parseDataset(data: any): Promise<IDataset> {
  const dataset = {
    ...data,
    link: `/datasets/${data.name}/`,
    opensanctions_url: BASE_URL + `/datasets/${data.name}/`,
    issue_count: data.issue_count || 0,
    issue_levels: data.issue_levels || {},
    things: data.things || { total: 0, countries: [], schemata: [] },
    thing_count: data.things?.total || 0,
  };
  if (!!dataset.publisher && !!dataset.publisher.description) {
    dataset.publisher.html = await markdownToHtml(dataset.publisher.description);
  }
  if (dataset.type === 'collection') {
    return dataset as ICollection;
  }
  if (dataset.type === 'external') {
    return dataset as IExternal;
  }
  return dataset as ISource;
}


export async function fetchJsonUrl<T>(url: string, authz: boolean = true): Promise<T | null> {
  const headers = authz ? { 'Authorization': `ApiKey ${API_TOKEN}` } : undefined;
  const data = await fetch(url, { headers });
  if (!data.ok) {
    return null;
  }
  return await data.json() as T;
}

export async function fetchUrl<T>(url: string): Promise<T> {
  const data = await fetch(url, { ...cacheBase });
  if (!data.ok) {
    throw Error(`Backend error: ${data.statusText}`);
  }
  return await data.json() as T;
}

export async function fetchObjectMaybe<T>(path: string, query: any = undefined, authz: boolean = true): Promise<T | null> {
  try {
    return await fetchObject<T>(path, query, authz);
  } catch {
    return null;
  }
}

export async function fetchObject<T>(path: string, query: any = undefined, authz: boolean = true): Promise<T> {
  const headers = authz ? { 'Authorization': `ApiKey ${API_TOKEN}` } : undefined;
  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}${path}`,
    'query': query
  })
  const data = await fetch(apiUrl, { headers, ...cacheBase });
  if (!data.ok) {
    throw Error(`Backend error: ${data.statusText}`);
  }
  return await data.json() as T;
}

export async function postMatch(query: IMatchQuery, dataset: string, algorithm: string): Promise<IMatchAPIResponse> {
  const headers = {
    'Authorization': `ApiKey ${API_TOKEN}`,
    'Content-Type': 'application/json',
  }
  if (Object.keys(query.properties).length === 0) {
    return { total: { value: 0, relation: 'eq' }, results: [] }
  }
  const options = {
    headers: headers,
    body: JSON.stringify({ queries: { ui: query } }),
    method: 'POST',
  };
  const url = queryString.stringifyUrl({
    'url': `${API_URL}/match/${dataset}`,
    'query': { algorithm: algorithm }
  })
  const resp = await fetch(url, options)
  if (!resp.ok) {
    throw Error(`Backend error: ${resp.statusText}`);
  }
  const data = await resp.json()
  return data['responses']['ui'] as IMatchAPIResponse;
}


export async function fetchIndex(): Promise<IIndex> {
  // const index = { ...indexJson } as unknown as IIndex;
  // const data = await fetch(INDEX_URL, { ...cacheConfig });
  // if (!data.ok) {
  //   throw Error("Cannot fetch index file!")
  // }
  return index;
}

export async function getModel(): Promise<Model> {
  // const index = await fetchIndex()
  return ftmModel;
}

export async function getDatasets(): Promise<Array<IDataset>> {
  const datasets = Promise.all(index.datasets.map(parseDataset));
  return datasets
}

export async function getDatasetByName(name: string): Promise<IDataset | undefined> {
  const datasetUrl = `https://data.opensanctions.org/datasets/latest/${name}/index.json`
  const data = await fetch(datasetUrl, cacheShort);
  if (!data.ok) {
    return undefined;
  }
  const jsonData = await data.json();
  return await parseDataset(jsonData);
}

export async function getDatasetCollections(dataset: IDataset): Promise<Array<ICollection>> {
  const datasets = await getDatasets();
  return datasets
    .filter(isCollection)
    .filter((c) => c.sources.indexOf(dataset.name) !== -1 || c.externals.indexOf(dataset.name) !== -1)
}

export async function canSearchDataset(dataset: IDataset): Promise<boolean> {
  const scope = await getDatasetByName(SEARCH_DATASET);
  if (scope === undefined || !isCollection(scope)) {
    return false;
  }
  const scopes = [...scope.sources, ...scope.externals];
  const range = isCollection(dataset) ? [...dataset.sources, ...dataset.externals] : [dataset.name];
  const intersection = range.filter(x => scopes.includes(x));
  return intersection.length == range.length;
}

export function filterMatchingNames(datasets: Array<IDataset>, names: Array<string>): Array<IDataset> {
  return names.map((name) => datasets.find((d) => d.name == name))
    .filter(isDataset) // Exclude undefineds (non-matches) and guarantee return member types
}

export async function getAlgorithms(): Promise<IAlgorithmResponse> {
  return await fetchObject<IAlgorithmResponse>(`/algorithms`);
}

export async function getDatasetIssues(dataset?: IDataset): Promise<Array<IIssue>> {
  if (dataset === undefined) {
    return []
  }
  const issues_url = `https://data.opensanctions.org/datasets/latest/${dataset.name}/issues.json`
  try {
    const index = await fetchUrl<IIssueIndex>(issues_url);
    return index.issues;
  } catch (error) {
    // console.error(`Error fetching issues for dataset '${dataset.name}'.`, error);
    return [];
  }
}

export async function getSitemapEntities(): Promise<Array<ISitemapEntity>> {
  const statements = await fetchObject<IStatementAPIResponse>(`/statements`, {
    'limit': 500,
    'dataset': 'sanctions',
    'target': true,
    'prop': 'topics',
    'value': 'sanction',
    'sort': 'first_seen:desc',
  })
  //const canonicalised = new RegExp('(^NK-.*|Q\\d*=)');
  // const canonicalised = new RegExp('^NK-.*');
  const entities: Array<ISitemapEntity> = statements.results
    // .filter((stmt) => canonicalised.test(stmt.canonical_id))
    .map((stmt) => ({ id: stmt.canonical_id, lastmod: stmt.first_seen }));
  return entities;
}

export async function getRecentEntities(dataset: IDataset): Promise<Array<IRecentEntity>> {
  // const model = await getModel();
  const params = {
    'limit': 15,
    'sort': 'first_seen:desc',
    'target': true,
  }
  const response = await fetchObjectMaybe<ISearchAPIResponse>(`/search/${dataset.name}`, params);
  if (response === null) {
    return []
  }
  return response.results.map((result) => {
    const entity = ftmModel.getEntity(result)
    const country = ftmModel.getType('country');
    return {
      id: entity.id,
      caption: entity.caption,
      schema: entity.schema.label,
      countries: entity.getTypeValues(country).map((c) => country.getLabel(c as string)),
      first_seen: entity.first_seen,
    } as IRecentEntity;
  });
}

export async function getStatements(query: any, limit: number = 100): Promise<IStatementAPIResponse | null> {
  const params = {
    ...query,
    'limit': limit,
  };
  return await fetchObject<IStatementAPIResponse>(`/statements`, params);
}

export async function getEntityData(entityId: any): Promise<IEntityDatum | null> {
  if (entityId === undefined || entityId === null) {
    return null;
  }
  const raw = await fetchObjectMaybe<IEntityDatum>(`/entities/${entityId}`);
  if (raw === undefined || raw === null || raw.id === undefined) {
    return null
  }
  return raw;
}

export async function getEntity(entityId: string) {
  const entityData = await getEntityData(entityId);
  if (entityData === null) {
    return null;
  }
  // const model = await getModel();
  return ftmModel.getEntity(entityData);
}

export async function getEntityDatasets(entity: Entity) {
  const allDatasets = await getDatasets();
  return entity.datasets
    .map((name) => allDatasets.find((d) => d.name === name))
    .filter((d) => d !== undefined && !d.hidden) as IDataset[];
}

export function isBlocked(entity: Entity): boolean {
  if (BLOCKED_ENTITIES.indexOf(entity.id) !== -1) {
    return true;
  }
  const joined = intersection(entity.referents, BLOCKED_ENTITIES);
  return joined.length > 0;
}

export function isIndexRelevant(entity: Entity): boolean {
  if (isBlocked(entity)) {
    return false;
  }
  const topics = entity.getProperty('topics');
  // all sanctioned entities
  if (topics.indexOf("sanction") !== -1) {
    return true;
  }
  // all interpol entities
  if (entity.datasets.indexOf("interpol_red_notices") !== -1) {
    return true;
  }
  // no crime-related entities
  if (topics.indexOf("crime") !== -1) {
    return false;
  }
  // non-human things are more OK re privacy
  if (['Company', 'Organization', 'Vessel', 'Airplane'].indexOf(entity.schema.name) !== -1) {
    return true;
  }
  // default: no
  return false;
}

export async function getGraphDatasets(): Promise<IDataset[]> {
  const catalog = await fetchUrl<INKDataCatalog>(GRAPH_CATALOG_URL);
  return Promise.all(catalog.datasets.map(parseDataset))
}
