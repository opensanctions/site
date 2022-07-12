// import { join } from 'path'
// import { promises as fs } from 'fs';
import queryString from 'query-string';
import { IEntityDatum, IModelDatum, Model } from "./ftm";
import { IDataset, ICollection, ISource, IIssueIndex, IIndex, IIssue, IDatasetDetails, IStatementAPIResponse, ISitemapEntity, IExternal, IRecentEntity } from "./types";
import { BASE_URL, API_TOKEN, API_URL } from "./constants";
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

export async function fetchJsonUrl(url: string): Promise<any> {
  const headers = { 'Authorization': `Token ${API_TOKEN}` }
  const data = await fetch(url, { cache: "force-cache", headers });
  if (!data.ok) {
    // console.log('ERROR', data);
    return null;
  }
  return await data.json();
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
  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}/statements`,
    'query': {
      'limit': 500,
      'dataset': 'sanctions',
      'target': true,
      'prop': 'createdAt',
      'sort': 'value:desc',
    }
  })
  const statements = await fetchJsonUrl(apiUrl) as IStatementAPIResponse;
  if (statements === null) {
    return []
  }
  // const canonicalised = new RegExp('(^NK-.*|Q\\d*=)');
  const canonicalised = new RegExp('^NK-.*');
  const entities: Array<ISitemapEntity> = statements.results
    .filter((stmt) => canonicalised.test(stmt.canonical_id))
    .map((stmt) => ({ id: stmt.canonical_id, lastmod: stmt.value }));
  return entities;
}

export async function getRecentEntities(dataset: IDataset): Promise<Array<IRecentEntity>> {
  const index = await fetchIndex();
  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}/statements`,
    'query': {
      'limit': 25,
      'dataset': dataset.name,
      'target': true,
      'prop': 'id',
      'sort': 'first_seen:desc',
    }
  })
  const statements = await fetchJsonUrl(apiUrl) as IStatementAPIResponse;
  if (statements === null) {
    return [];
  }
  const promises = statements.results
    .map(s => s.canonical_id)
    .map(id => fetchJsonUrl(`${API_URL}/entities/${id}?nested=false`));
  const responses = await Promise.all(promises) as IEntityDatum[]
  const seen = new Array<string>();
  const model = new Model(index.model);
  const results = statements.results.map((stmt) => {
    if (seen.indexOf(stmt.canonical_id) !== -1) {
      return undefined;
    }
    seen.push(stmt.canonical_id);
    const data = responses.find((d) => d !== null && d.id === stmt.canonical_id);
    if (data === undefined) {
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