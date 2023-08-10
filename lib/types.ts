import { IEntityDatum, IModelDatum } from "./ftm";


export interface IContentBase {
  slug: string
  title: string
  image_url: string | null
  summary: string | null
  no_index: boolean
}


export interface IContent extends IContentBase {
  content: string
  path: string
  menu_path: string
  section: string
}

export interface IArticleInfo extends IContentBase {
  date: string
  path: string
  url: string
  section: string
  tags: string[]
  draft: boolean
}

export interface IArticle extends IArticleInfo {
  content: string
}

export interface IResource {
  url: string
  name: string
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

export interface INKDatasetBase {
  name: string
  type: string
  title: string
  link: string
  summary: string
  description?: string
  resources: Array<IResource>
}


export interface IDatasetBase extends INKDatasetBase {
  hidden: boolean
  opensanctions_url: string
  index_url: string
  last_change: string
  last_export: string
  issue_count: number
  issue_levels: IIssueType
  issues_url: string
  target_count: number
  entity_count: number
  thing_count: number
  targets: IAggregatedStats
  things: IAggregatedStats
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
  official: boolean
  country?: string
  country_label?: string
  logo_url?: string
}

export interface IDatasetCoverage {
  start: string
  end: string
  countries: string[]
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

export interface INKDataset extends INKDatasetBase {
  updated_at: string
  version: string
  children: Array<string>
  publisher?: IDatasetPublisher
  coverage?: IDatasetCoverage
}

export interface INKDataCatalog {
  datasets: Array<INKDataset>
}

export function isCollection(dataset?: IDataset): dataset is ICollection {
  return dataset?.type === 'collection';
}

export function isSource(dataset?: IDataset): dataset is ISource {
  return dataset?.type === 'source';
}

export function isExternal(dataset?: IDataset): dataset is IExternal {
  return dataset?.type === 'external';
}

export function isDataset(dataset: IDataset | undefined): dataset is IDataset {
  return isCollection(dataset) || isSource(dataset) || isExternal(dataset);
}

export interface IMatcherFeature {
  coefficient: number
  description: string
  url: string
}

export interface IAlgorithm {
  name: string
  description?: string
  features: { [key: string]: IMatcherFeature }
}

export interface IAlgorithmResponse {
  algorithms: IAlgorithm[]
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

export interface IMatchedEntityDatum extends IEntityDatum {
  features: { [key: string]: number }
  score: number
  match: boolean
}

export interface IMatchAPIResponse {
  results: Array<IMatchedEntityDatum>
  total: IResponseTotal
}

export interface IMatchQuery {
  schema: string
  properties: { [prop: string]: string[] }
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
  lang?: string
  original_value?: string
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

export interface IAccount {
  key?: string
  name?: string
  email?: string
  secret: string
  active: boolean
  stripe_customer_id?: string
  stripe_subscription_id?: string
  created_at: string
}

export interface IRouteUsage {
  route: string
  count: number
}

export interface IDateUsage {
  routes: IRouteUsage[]
  date: string
  total: number
}

export interface IAccountUsage {
  dates: IDateUsage[]
  days: number
  total: number
}

export interface IChargeInfo {
  total: number
  total_excluding_tax: number
  currency: string
  start_date: string
  end_date: string
}

export interface IAccountInfo {
  account: IAccount
  usage: IAccountUsage
  charge_info?: IChargeInfo
}
