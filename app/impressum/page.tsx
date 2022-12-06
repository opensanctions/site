import Content from '../../components/Content'
import LayoutFrame from '../../components/layout/LayoutFrame'
import { getContentBySlug } from '../../lib/content'

export default async function Impressum() {
  const content = await getContentBySlug('impressum');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}
