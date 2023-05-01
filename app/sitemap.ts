import { MetadataRoute } from 'next';
import { getArticles, getContents } from '../lib/content';
import { getDatasets, getSitemapEntities } from '../lib/data'
import { BASE_URL } from '../lib/constants';

const PAGES = ['/', '/contact/', '/datasets/', '/docs/']


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const date = now.toISOString().substring(0, 10);
  const baseMap = PAGES.map(url => ({
    url: `${BASE_URL}/${url}`,
    lastModified: date
  }));
  const contents = await getContents()
  const contentMap = contents.map((c) => ({
    url: `${BASE_URL}${c.path}`,
    lastModified: date
  }))
  const allDatasets = await getDatasets()
  const datasets = allDatasets.filter((d) => !d.hidden)
  const datasetMap = datasets.map((d) => ({
    url: `${BASE_URL}/datasets/${d.name}/`,
    lastModified: d.last_change.substring(0, 10)
  }))
  const entities = await getSitemapEntities()
  const entityMap = entities.map((e) => ({
    url: `${BASE_URL}/entities/${e.id}/`,
    lastModified: e.lastmod.substring(0, 10)
  }))
  const articles = await getArticles()
  const articleMap = articles.map((a) => ({
    url: `${BASE_URL}${a.path}`,
    lastModified: a.date
  }))
  return [...baseMap, ...articleMap, ...contentMap, ...datasetMap, ...entityMap];
}