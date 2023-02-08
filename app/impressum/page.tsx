import Content from '../../components/Content'
import LayoutFrame from '../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../lib/constants';
import { getContentBySlug } from '../../lib/content'

export const revalidate = REVALIDATE_BASE;

export default async function Impressum() {
  const content = await getContentBySlug('impressum');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}
