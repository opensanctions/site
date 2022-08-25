import { IEntityDatum, IModelDatum } from "./ftm";


export interface IContent {
  slug: string
  content: string
  title: string
  path: string
  section: string
  image_url: string | null
  summary: string | null
}

export interface IArticleInfo {
  slug: string
  title: string
  date: string
  path: string
  url: string
  section: string
  image_url: string | null
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

export interface IAggregatedCountry {
  code: string
  count: number
  label: string
}

export interface IAggregatedSchema {
  name: string
  count: number
  label: string
  plural: string
}

export interface IAggregatedStats {
  total: number
  countries: Array<IAggregatedCountry>
  schemata: Array<IAggregatedSchema>
}

export interface IDatasetDetails {
  description?: string
  targets: IAggregatedStats
  things: IAggregatedStats
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
  entity_count: number
}

export interface ISourceData {
  url?: string
  format?: string
  model?: string
}

export interface IDatasetPublisher {
  url?: string
  name: string
  description: string
  country?: string
  country_label?: string
}


export interface ISource extends IDatasetBase {
  url?: string
  data: ISourceData
  publisher: IDatasetPublisher
  collections: Array<string>
}

export interface IExternal extends IDatasetBase {
  url?: string
  publisher: IDatasetPublisher
  collections: Array<string>
}

export interface ICollection extends IDatasetBase {
  sources: Array<string>
  externals: Array<string>
}

export type IDataset = ISource | IExternal | ICollection

export function isCollection(dataset?: IDataset): dataset is ICollection {
  return dataset?.type === 'collection';
}

export function isSource(dataset?: IDataset): dataset is ISource {
  return dataset?.type === 'source';
}

export function isExternal(dataset?: IDataset): dataset is IExternal {
  return dataset?.type === 'external';
}

export interface IMatcherFeature {
  coefficient: number
  description: string
  url: string
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
  matcher: { [key: string]: IMatcherFeature }
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
  target: boolean
  external: boolean
  first_seen: string
  last_seen: string
}

export interface IStatementAPIResponse extends IPaginatedResponse {
  results: Array<IStatement>
}

export interface ISitemapEntity {
  id: string
  lastmod: string
}

export interface IRecentEntity {
  id: string
  caption: string
  first_seen: string
  schema: string
  countries: string[]
}
