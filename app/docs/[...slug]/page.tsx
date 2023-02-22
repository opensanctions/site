import Content from '../../../components/Content'
import { getContentBySlug, getContents } from '../../../lib/content'
import { ContentPageProps } from './common'
import LayoutFrame from '../../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../../lib/constants';
import { redirect } from 'next/navigation';

export const revalidate = REVALIDATE_BASE;

export default async function Page({ params }: ContentPageProps) {
  const content = await getContentBySlug(params.slug.join('/'))
  if (content.redirect) {
    redirect(content.redirect)
  }
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}

export async function generateStaticParams() {
  const contents = await getContents()
  const slugs = contents
    .filter((c) => c.path === `/docs/${c.slug}/`)
    .filter((c) => c.path !== '/docs/api/')
    .map((c) => ({ slug: c.slug.split('/') }))
  // console.log("SLUGS", slugs)
  return slugs;
}
