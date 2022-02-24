import { IEntityDatum, IModelDatum } from "./ftm";


export interface IContent {
  slug: string
  content: string
  title: string
  path: string
  summary: string | null
}

export interface IArticleInfo {
  slug: string
  title: string
  date: string
  path: string
  url: string
  draft: boolean
  summary: string | null
}

export interface IArticle extends IArticleInfo {
  content: string
}

export interface IResource {
  url: string
  path: string
  sha1: string
  timestamp: string
  dataset: string
  mime_type: string
  mime_type_label: string
  size: number
  title: string
}

export interface IIssueType {
  warning: number
  error: number
}

export interface ITargetCountry {
  code: string
  count: number
  label: string
}

export interface ITargetSchema {
  name: string
  count: number
  label: string
  plural: string
}

export interface ITargetStats {
  countries: Array<ITargetCountry>
  schemata: Array<ITargetSchema>
}

export interface IDatasetDetails {
  description?: string
  targets: ITargetStats
  resources: Array<IResource>
}


export interface IDatasetBase {
  name: string
  type: string
  title: string
  hidden: boolean
  link: string
  opensanctions_url: string
  summary: string
  index_url: string
  last_change: string
  last_export: string
  issue_count: number
  issue_levels: IIssueType
  issues_url: string
  target_count: number
}

export interface ISourceData {
  url?: string
  format?: string
  model?: string
}

export interface ISourcePublisher {
  url?: string
  name: string
  description: string
  country?: string
  country_label?: string
}


export interface ISource extends IDatasetBase {
  url?: string
  data: ISourceData
  publisher: ISourcePublisher
  collections: Array<string>
}

export interface ICollection extends IDatasetBase {
  sources: Array<string>
}

export type IDataset = ISource | ICollection

export function isCollection(dataset?: IDataset): dataset is ICollection {
  return dataset?.type === 'collection';
}

export function isSource(dataset?: IDataset): dataset is ISource {
  return dataset?.type === 'source';
}

export const LEVEL_ERROR = 'error'
export const LEVEL_WARNING = 'warning'

export interface IIssue {
  id: number
  level: string
  message: string
  module: string
  timestamp: string
  data: { [key: string]: string }
  dataset: string
  entity_id?: string | null
  entity_schema?: string | null
}

export interface IIssueIndex {
  issues: Array<IIssue>
}

export interface IIndex {
  app: string
  version: string
  model: IModelDatum
  issues_url: string
  schemata: Array<string>
  datasets: Array<IDataset>
  details: { [key: string]: IDatasetDetails }
}

export interface ISearchFacetItem {
  name: string
  label: string
  count: number
}

export interface ISearchFacet {
  label: string
  values: Array<ISearchFacetItem>
}

export interface IResponseTotal {
  value: number
  relation: string
}

export interface IPaginatedResponse {
  total: IResponseTotal
  limit: number
  offset: number
}

export interface ISearchAPIResponse extends IPaginatedResponse {
  results: Array<IEntityDatum>
  facets: { [prop: string]: ISearchFacet }
}


export interface IStatement {
  id: string
  entity_id: string
  canonical_id: string
  prop: string
  prop_type: string
  schema: string
  dataset: string
  value: string
  first_seen: string
  last_seen: string
}

export interface IStatementAPIResponse extends IPaginatedResponse {
  results: Array<IStatement>
}
