import PageHead from "../../../../components/layout/PageHead";
import { getEntity, isBlocked } from '../../../../lib/data';
import { EntityPageProps } from '../../[id]/common';


export default async function Head({ params }: EntityPageProps) {
  const entity = await getEntity(params.id);
  if (entity === null) {
    return <PageHead title="Loading..." />;
  }
  const title = isBlocked(entity) ? 'Blocked entity' : entity.caption;
  return <PageHead title={title} noIndex={true} />;
}

