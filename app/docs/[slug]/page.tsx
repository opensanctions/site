import Content from '../../../components/Content'
import { getContentBySlug, getContents } from '../../../lib/content'
import { ContentPageProps } from './common'
import LayoutFrame from '../../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../../lib/constants';

export const revalidate = REVALIDATE_BASE;

export default async function Page({ params }: ContentPageProps) {
  const content = await getContentBySlug(params.slug)
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}

export async function generateStaticParams() {
  const contents = await getContents()
  return contents
    .filter((c) => c.path === `/docs/${c.slug}/`)
    .filter((c) => c.path !== '/docs/api/')
    .map((c) => ({ slug: c.slug }))
}
