// import { join } from 'path'
// import { promises as fs } from 'fs';
import queryString from 'query-string';
import { intersection } from 'lodash';
import { Entity, IEntityDatum, IModelDatum, Model } from "./ftm";
import { IDataset, ICollection, ISource, IIssueIndex, IIndex, IIssue, IDatasetDetails, IStatementAPIResponse, ISitemapEntity, IExternal, IRecentEntity } from "./types";
import { BASE_URL, API_TOKEN, API_URL, BLOCKED_ENTITIES } from "./constants";
import { markdownToHtml } from './util';

import indexJson from '../data/index.json';
import issuesJson from '../data/issues.json';

const index = { ...indexJson } as unknown as IIndex;
index.details = {};
index.datasets = index.datasets.map((raw: any) => {
  const { description, targets, things, resources, ...ds } = raw;
  const markdown = markdownToHtml(description)
  index.details[ds.name] = { description: markdown, targets, things, resources } as IDatasetDetails
  ds.link = `/datasets/${ds.name}/`
  ds.opensanctions_url = BASE_URL + ds.link
  if (ds.type === 'collection') {
    return ds as ICollection;
  }
  if (ds.type === 'external') {
    return ds as IExternal;
  }
  return ds as ISource;
})
index.model = index.model as IModelDatum

export async function fetchJsonUrl(url: string, authz: boolean = true): Promise<any> {
  const headers = authz ? { 'Authorization': `ApiKey ${API_TOKEN}` } : undefined;
  const data = await fetch(url, { headers });
  if (!data.ok) {
    // console.log('ERROR', data);
    return null;
  }
  return await data.json();
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
  const data = await fetch(apiUrl, { headers });
  if (!data.ok) {
    throw Error(`Backend error: ${data.text}`);
  }
  return await data.json() as T;
}


export async function fetchIndex(): Promise<IIndex> {
  return index as IIndex
}

export async function getDatasets(): Promise<Array<IDataset>> {
  const index = await fetchIndex()
  return index.datasets
}

export async function getDatasetByName(name: string): Promise<IDataset | undefined> {
  const datasets = await getDatasets()
  return datasets.find((dataset) => dataset.name === name)
}

export async function getDatasetDetails(name: string): Promise<IDatasetDetails | undefined> {
  const index = await fetchIndex()
  return index.details[name];
}

export async function getIssues(): Promise<Array<IIssue>> {
  const index = { ...issuesJson } as unknown as IIssueIndex;
  return index.issues
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
    'limit': 1000,
    'dataset': 'sanctions',
    'target': true,
    'prop': 'createdAt',
    'sort': 'value:desc',
  })
  //const canonicalised = new RegExp('(^NK-.*|Q\\d*=)');
  // const canonicalised = new RegExp('^NK-.*');
  const entities: Array<ISitemapEntity> = statements.results
    // .filter((stmt) => canonicalised.test(stmt.canonical_id))
    .map((stmt) => ({ id: stmt.canonical_id, lastmod: stmt.value }));
  return entities;
}

export async function getRecentEntities(dataset: IDataset): Promise<Array<IRecentEntity>> {
  const index = await fetchIndex();
  const statements = await fetchObject<IStatementAPIResponse>(`/statements`, {
    'limit': 25,
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
  const model = new Model(index.model);
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

export async function getEntity(entityId: any): Promise<IEntityDatum | null> {
  if (entityId === undefined || entityId === null) {
    return null;
  }
  const raw = await fetchObjectMaybe<IEntityDatum>(`/entities/${entityId}`);
  if (raw === undefined || raw === null || raw.id === undefined) {
    return null
  }
  return raw;
}

export async function getEntityDatasets(entity: IEntityDatum | Entity): Promise<IDataset[]> {
  const allDatasets = await getDatasets();
  const datasetNames = entity !== null ? entity.datasets : [];
  return datasetNames
    .map((name) => allDatasets.find((d) => d.name === name))
    .filter((d) => d !== undefined) as IDataset[];
}

export function isBlocked(entity: IEntityDatum | Entity): boolean {
  if (BLOCKED_ENTITIES.indexOf(entity.id) !== -1) {
    return true;
  }
  const joined = intersection(entity.referents, BLOCKED_ENTITIES);
  return joined.length > 0;
}

