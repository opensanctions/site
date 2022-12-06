import Content from '../../components/Content'
import { getContentBySlug } from '../../lib/content'
import LayoutFrame from '../../components/layout/LayoutFrame'

export default async function Page() {
  const content = await getContentBySlug('docs')
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}
