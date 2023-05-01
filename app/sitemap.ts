import { MetadataRoute } from 'next';
import { getArticles, getContents } from '../lib/content';
import { getDatasets, getSitemapEntities } from '../lib/data'
import { BASE_URL } from '../lib/constants';

const PAGES = ['/', '/contact/', '/datasets/', '/docs/']

function dateTruncate(date: string | null | undefined) {
  if (date === null || date === undefined) {
    const now = new Date();
    date = now.toISOString()
  }
  return date.substring(0, 10)
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseMap = PAGES.map(url => ({
    url: `${BASE_URL}/${url}`,
    lastModified: dateTruncate(null)
  }));
  const contents = await getContents()
  const contentMap = contents.map((c) => ({
    url: `${BASE_URL}${c.path}`,
    lastModified: dateTruncate(null)
  }))
  const allDatasets = await getDatasets()
  const datasets = allDatasets.filter((d) => !d.hidden)
  const datasetMap = datasets.map((d) => ({
    url: `${BASE_URL}/datasets/${d.name}/`,
    lastModified: dateTruncate(d.last_change)
  }))
  const entities = await getSitemapEntities()
  const entityMap = entities.map((e) => ({
    url: `${BASE_URL}/entities/${e.id}/`,
    lastModified: dateTruncate(e.lastmod)
  }))
  const articles = await getArticles()
  const articleMap = articles.map((a) => ({
    url: `${BASE_URL}${a.path}`,
    lastModified: dateTruncate(a.date)
  }))
  return [...baseMap, ...articleMap, ...contentMap, ...datasetMap, ...entityMap];
}