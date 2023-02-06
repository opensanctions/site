import PageHead from "../../../../components/layout/PageHead";
import { REVALIDATE_BASE } from "../../../../lib/constants";
import { getEntity, isBlocked } from '../../../../lib/data';
import { EntityPageProps } from '../../common';

export const revalidate = REVALIDATE_BASE;

export default async function Head({ params }: EntityPageProps) {
  const entity = await getEntity(params.entityId);
  if (entity === null) {
    return <PageHead title="Loading..." />;
  }
  const title = isBlocked(entity) ? 'Blocked entity' : entity.caption;
  return <PageHead title={title} noIndex={true} />;
}

