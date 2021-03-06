//
// https://developers.google.com/search/docs/advanced/structured-data/dataset
// https://schema.org/Dataset

import { BASE_URL, LICENSE_URL, CLAIM, EMAIL, SITE } from './constants';
import { Entity } from './ftm';
import { IArticleInfo, IDataset, IDatasetDetails, IResource, isExternal, IDatasetPublisher, isSource } from './types';


export function getSchemaOpenSanctionsOrganization() {
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": SITE,
    "url": `${BASE_URL}/docs/about`,
    "email": EMAIL,
    "description": CLAIM,
    "funder": "https://ror.org/04pz7b180"
  }
}

export function getSchemaActions() {
  return {
    "@context": "https://schema.org/",
    "@type": "SearchAction",
    "target": {
      "@context": "https://schema.org/",
      "@type": "EntryPoint",
      "urlTemplate": `${BASE_URL}/search/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string"
  }
}

export function getSchemaWebSite() {
  return {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": SITE,
    "url": BASE_URL,
    "description": CLAIM,
    "license": LICENSE_URL,
    "mainEntityOfPage": getDataCatalog(),
    "creator": getSchemaOpenSanctionsOrganization(),
    "potentialAction": getSchemaActions(),
  }
}

export function getDataCatalog() {
  return {
    "@context": "https://schema.org/",
    "@type": "DataCatalog",
    "name": SITE,
    "url": `${BASE_URL}/datasets/`,
    "creator": getSchemaOpenSanctionsOrganization(),
    license: LICENSE_URL,
  }
}

function getPublisherOrganization(publisher: IDatasetPublisher) {
  return {
    "@context": "https://schema.org/",
    "@type": "Organization",
    "name": publisher.name,
    "url": publisher.url,
    "description": publisher.description,
  }
}

function getResourceDataDownload(resource: IResource) {
  return {
    "@context": "https://schema.org/",
    "@type": "DataDownload",
    "name": resource.title,
    "contentUrl": resource.url,
    "encodingFormat": resource.mime_type,
    "uploadDate": resource.timestamp,
  }
}

export function getSchemaDataset(dataset: IDataset, details?: IDatasetDetails) {
  if (isExternal(dataset)) {
    return {
      "@context": "https://schema.org/",
      "@type": "Dataset",
      "name": dataset.title,
      "url": dataset.url,
      "description": dataset.summary,
      "creator": getPublisherOrganization(dataset.publisher),
      "includedInDataCatalog": getDataCatalog(),
    }
  }
  let schema: any = {
    "@context": "https://schema.org/",
    "@type": "Dataset",
    "name": dataset.title,
    "url": dataset.opensanctions_url,
    "description": dataset.summary,
    "license": LICENSE_URL,
    "includedInDataCatalog": getDataCatalog(),
    "creator": getSchemaOpenSanctionsOrganization(),
    "isAccessibleForFree": true,
    "dateModified": dataset.last_change,
    "potentialAction": getSchemaActions(),
  }
  if (details !== undefined) {
    schema = {
      ...schema,
      "distribution": details.resources.map((r) => getResourceDataDownload(r))
    }
  }
  if (isSource(dataset)) {
    schema = {
      ...schema,
      "isBasedOn": dataset.data.url,
      "creator": getPublisherOrganization(dataset.publisher),
      "maintainer": getSchemaOpenSanctionsOrganization(),
    }
    if (dataset.url) {
      schema = {
        ...schema,
        "isBasedOn": dataset.url,
      }
    }
    if (dataset.publisher.country !== 'zz') {
      schema = {
        ...schema,
        "countryOfOrigin": dataset.publisher.country,
      }
    }
  }
  return schema;
}

export function getSchemaEntityPage(entity: Entity, datasets: Array<IDataset>) {
  return {
    "@context": "https://schema.org/",
    "@type": "WebPage",
    "name": entity.caption,
    "maintainer": getSchemaOpenSanctionsOrganization(),
    "isPartOf": datasets.map(d => getSchemaDataset(d).url),
    "license": LICENSE_URL,
    "dateCreated": entity.first_seen,
    "dateModified": entity.getFirst('modifiedAt') || entity.last_seen,
  }
}


export function getSchemaArticle(article: IArticleInfo) {
  return {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    "headline": article.title,
    "author": getSchemaOpenSanctionsOrganization(),
    "license": LICENSE_URL,
    "description": article.summary,
    "datePublished": article.date,
    "url": article.url
  }
}