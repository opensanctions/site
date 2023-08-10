
export const SITE = "OpenSanctions"
export const BASE_URL = "https://www.opensanctions.org"
export const INDEX_URL = "https://data.opensanctions.org/datasets/latest/index.json"
export const ISSUES_URL = "https://data.opensanctions.org/datasets/latest/issues.json"
export const LICENSE_URL = "https://creativecommons.org/licenses/by-nc/4.0/"
export const API_TOKEN = process.env.API_TOKEN || "site-dev"
export const SEARCH_DATASET = "default"
export const RENDER_DATASET = "sanctions"
export const SEARCH_SCHEMA = "Thing"
export const CLAIM = "Find sanctions targets and persons of interest"
export const SUBCLAIM = "OpenSanctions helps investigators find leads, allows companies to manage risk and enables technologists to build data-driven products."
export const EMAIL = "info@opensanctions.org"
export const ARTICLE_INDEX_SUMMARY = "Updates from the OpenSanctions project, including new features, technical deep dives, and analysis."
export const GA_TRACKING_ID = 'G-YRZENQXNNR';
export const GRAPH_CATALOG_URL = "https://data.opensanctions.org/graph/catalog.json"
export const REVALIDATE_BASE = 3600 * 36;
export const THEME_COLOR = '#2563eb';

// client-side variables
export const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "https://api.opensanctions.org"
export const CHARGEBEE_SITE = process.env.NEXT_PUBLIC_CHARGEBEE_SITE || "opensanctions"
const CHARGEBEE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CHARGEBEE_PUBLISHABLE_KEY

if (!CHARGEBEE_PUBLISHABLE_KEY) {
  throw new Error("Missing CHARGEBEE_PUBLISHABLE_KEY")
}

export {
  CHARGEBEE_PUBLISHABLE_KEY as string
}

// fake up a semantic ordering of collections
export const COLLECTIONS = ['default', 'sanctions', 'peps', 'crime'];

export const SPACER = " · ";

export const BLOCKED_ENTITIES = [
  'ofac-9591',
  'gb-coh-ydbwjewipbc3ibij62kywaoyfm4',
  'addr-bf1f426e322e664bbc9f783fe0c277675c7c51cd',
  'gb-coh-uiboqdf8mfm6bnau27gi0qspgla',
  'addr-049628bc181af349e9c3b677c654322a920eecb6',
  'Q1045488',
  'rupep-person-6658',
  'rupep-person-6659',
];
export const ENTITY_WARNINGS: { [name: string]: string } = {
  'Q4230633': 'The contents of this page have been modified in response to a legal threat on behalf of Mr. Kondrashev.',
  'ru-inn-770402098952': 'Mr. Chubar resigned from the Management Board of the Credit Bank of Moscow on 10. June 2022 (cf. https://mkb.ru/en/news/56243). The information on this page is outdated, reflecting the pre-war state of the Russian companies\' registry.'
}