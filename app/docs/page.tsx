import Content from '../../components/Content'
import { getContentBySlug } from '../../lib/content'
import LayoutFrame from '../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../lib/constants';
import { getContentMetadata } from '../../lib/meta';

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata() {
  const content = await getContentBySlug('index');
  return getContentMetadata(content);
}

export default async function Page() {
  const content = await getContentBySlug('index');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}
