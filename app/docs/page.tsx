import Content from '../../components/Content'
import { getContentBySlug } from '../../lib/content'
import LayoutFrame from '../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../lib/constants';

export const revalidate = REVALIDATE_BASE;

export default async function Page() {
  const content = await getContentBySlug('index');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}
