
export const SITE = "OpenSanctions"
export const BASE_URL = "https://www.opensanctions.org"
export const INDEX_URL = "https://data.opensanctions.org/datasets/latest/index.json"
export const ISSUES_URL = "https://data.opensanctions.org/datasets/latest/issues.json"
export const LICENSE_URL = "https://creativecommons.org/licenses/by-nc/4.0/"
export const API_URL = process.env.API_URL || "https://api.opensanctions.org"
export const API_TOKEN = process.env.API_TOKEN || "site-dev"
export const SEARCH_DATASET = "default"
export const RENDER_DATASET = "sanctions"
export const SEARCH_SCHEMA = "Thing"
export const CLAIM = "Find sanctions targets and persons of interest"
export const SUBCLAIM = "OpenSanctions helps investigators find leads, allows companies to manage risk and enables technologists to build data-driven products."
export const EMAIL = "info@opensanctions.org"
export const ARTICLE_INDEX_SUMMARY = "Updates from the OpenSanctions project, including new features, technical deep dives, and analysis."

// fake up a semantic ordering of collections
export const COLLECTIONS = ['default', 'sanctions', 'peps', 'crime'];

export const SPACER = " · ";

export const BLOCKED_ENTITIES = ['ofac-9591'];
export const ENTITY_WARNINGS: { [name: string]: string } = {
  'Q4230633': 'The contents of this page have been modified in response to a legal threat on behalf of Mr. Kondrashev.'
}