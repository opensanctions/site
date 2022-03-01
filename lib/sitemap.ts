import fs from 'fs'
import { join } from 'path'
import { BASE_URL } from './constants';
import { IArticleInfo, IContent, IDataset, isCollection, ISitemapEntity } from "./types";

const PAGES = ['/', '/contact/', '/datasets/', '/docs/']

const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')

function writeUrl(url: string, lastmod?: string, changefreq?: string, priority?: number) {
  const lastmodTag = !!lastmod ? `<lastmod>${lastmod}</lastmod>` : ''
  const changefreqTag = !!changefreq ? `<changefreq>${changefreq}</changefreq>` : ''
  const priorityTag = !!priority ? `<priority>${priority}</priority>` : ''
  const fullUrl = BASE_URL + url
  return `<url>
    <loc>${fullUrl}</loc>
    ${priorityTag}${changefreqTag}${lastmodTag}</url>`
}

export default function writeSitemap(datasets: Array<IDataset>, articles: Array<IArticleInfo>, contents: Array<IContent>, entities: Array<ISitemapEntity>) {
  const urls = PAGES.map(url => writeUrl(url, undefined, undefined, 0.9));
  contents.forEach((content) => {
    urls.push(writeUrl(content.path, undefined, undefined, 0.8))
  })
  datasets.forEach((dataset) => {
    const priority = isCollection(dataset) ? 1.0 : 0.7
    const lastmod = dataset.last_change ? dataset.last_change.split('T')[0] : undefined
    urls.push(writeUrl(`/datasets/${dataset.name}/`, lastmod, 'weekly', priority))
  })
  entities.forEach((entity) => {
    const lastmod = entity.lastmod.split('T')[0];
    urls.push(writeUrl(`/entities/${entity.id}/`, lastmod, 'weekly', 0.7))
  })
  articles.forEach((a) => {
    urls.push(writeUrl(a.path, a.date, undefined, 1.0))
  })
  const body = urls.join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${body}
    </urlset>`
  fs.writeFile(sitemapPath, xml, { encoding: 'utf-8' }, () => { })
}