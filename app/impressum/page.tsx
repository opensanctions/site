import Content from '../../components/Content'
import LayoutFrame from '../../components/layout/LayoutFrame'
import { REVALIDATE_BASE } from '../../lib/constants';
import { getContentBySlug } from '../../lib/content'
import { getContentMetadata } from '../../lib/meta';

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata() {
  const content = await getContentBySlug('impressum');
  return getContentMetadata(content);
}

export default async function Impressum() {
  const content = await getContentBySlug('impressum');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Page content={content} />
    </LayoutFrame>
  )
}
