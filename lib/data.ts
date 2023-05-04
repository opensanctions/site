import queryString from 'query-string';
import intersection from 'lodash/intersection';
import { Entity, IEntityDatum, Model } from "./ftm";
import { IDataset, ICollection, ISource, IIssueIndex, IIndex, IIssue, IStatementAPIResponse, ISitemapEntity, IExternal, IRecentEntity, INKDataCatalog, IMatchAPIResponse, IMatchQuery, IAlgorithmResponse } from "./types";
import { BASE_URL, API_TOKEN, API_URL, BLOCKED_ENTITIES, ISSUES_URL, GRAPH_CATALOG_URL, REVALIDATE_BASE, INDEX_URL } from "./constants";
// import 'server-only';

import indexJson from '../data/index.json';

const cacheConfig = { next: { revalidate: REVALIDATE_BASE } };


export async function fetchJsonUrl<T>(url: string, authz: boolean = true): Promise<T | null> {
  const headers = authz ? { 'Authorization': `ApiKey ${API_TOKEN}` } : undefined;
  const data = await fetch(url, { headers });
  if (!data.ok) {
    return null;
  }
  return await data.json() as T;
}

export async function fetchUrl<T>(url: string): Promise<T> {
  const data = await fetch(url, { ...cacheConfig });
  if (!data.ok) {
    throw Error(`Backend error: ${data.text}`);
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
  const data = await fetch(apiUrl, { headers, ...cacheConfig });
  if (!data.ok) {
    throw Error(`Backend error: ${data.text}`);
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
  const data = await fetch(INDEX_URL, { ...cacheConfig });
  if (!data.ok) {
    throw Error("Cannot fetch index file!")
  }
  const index = await data.json() as IIndex;
  index.datasets = index.datasets.map((raw: any) => {
    const ds = {
      ...raw,
      link: `/datasets/${raw.name}/`
    };
    ds.opensanctions_url = BASE_URL + ds.link
    if (ds.type === 'collection') {
      return ds as ICollection;
    }
    if (ds.type === 'external') {
      return ds as IExternal;
    }
    return ds as ISource;
  })
  return index;
}

export async function getModel(): Promise<Model> {
  const index = await fetchIndex()
  return new Model(index.model);
}

export async function getDatasets(): Promise<Array<IDataset>> {
  const index = await fetchIndex()
  return index.datasets
}

export async function getDatasetByName(name: string): Promise<IDataset | undefined> {
  const datasets = await getDatasets()
  return datasets.find((dataset) => dataset.name === name)
}

export async function getIssues(): Promise<Array<IIssue>> {
  const index = await fetchUrl<IIssueIndex>(ISSUES_URL);
  return index.issues
}

export async function getAlgorithms(): Promise<IAlgorithmResponse> {
  return await fetchObject<IAlgorithmResponse>(`/algorithms`);
}

export async function getDatasetIssues(dataset?: IDataset): Promise<Array<IIssue>> {
  const issues = await getIssues()
  if (dataset === undefined) {
    return []
  }
  return issues.filter(issue => issue.dataset === dataset.name);
}

export async function getSitemapEntities(): Promise<Array<ISitemapEntity>> {
  const statements = await fetchObject<IStatementAPIResponse>(`/statements`, {
    'limit': 2000,
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
  const model = await getModel();
  const statements = await fetchObject<IStatementAPIResponse>(`/statements`, {
    'limit': 10,
    'dataset': dataset.name,
    'target': true,
    'prop': 'id',
    'sort': 'first_seen:desc',
  })
  const promises = statements.results
    .map(s => s.canonical_id)
    .map(id => fetchObjectMaybe<IEntityDatum>(`/entities/${id}?nested=false`));
  const responses = await Promise.all(promises)
  const seen = new Array<string>();
  const results = statements.results.map((stmt) => {
    if (seen.indexOf(stmt.canonical_id) !== -1) {
      return undefined;
    }
    seen.push(stmt.canonical_id);
    const data = responses.find((d) => d !== null && d.id === stmt.canonical_id);
    if (data === undefined || data === null) {
      return undefined
    }
    const entity = model.getEntity(data)
    const country = model.getType('country');
    return {
      id: entity.id,
      caption: entity.caption,
      schema: entity.schema.label,
      countries: entity.getTypeValues(country).map((c) => country.getLabel(c as string)),
      first_seen: stmt.first_seen,
    } as IRecentEntity;
  })
  return results.filter(r => r !== undefined) as Array<IRecentEntity>;
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
  const model = await getModel();
  return model.getEntity(entityData);
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

export async function getGraphCatalog(): Promise<INKDataCatalog> {
  return await fetchUrl<INKDataCatalog>(GRAPH_CATALOG_URL);
}
