import Content from '../../../components/Content'
import { getContentBySlug, getContents } from '../../../lib/content'
import LayoutFrame from '../../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../../lib/constants';
import { getContentMetadata } from '../../../lib/meta';

export const revalidate = REVALIDATE_BASE;
export const dynamic = 'force-static';

interface ContentPageProps {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: ContentPageProps) {
  const content = await getContentBySlug(params.slug.join('/'));
  return getContentMetadata(content);
}


export default async function Page({ params }: ContentPageProps) {
  const content = await getContentBySlug(params.slug.join('/'))
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
    .filter((c) => c.path !== '/api/')
    .map((c) => ({ slug: c.slug.split('/') }))
  // console.log("SLUGS", slugs)
  return slugs;
}
