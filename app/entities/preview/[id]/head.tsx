import PageHead from "../../../../components/layout/PageHead";
import { getEntity, isBlocked, isIndexRelevant } from '../../../../lib/data';
import { EntityPageProps } from '../../[id]/common';


export default async function Head({ params }: EntityPageProps) {
  const entity = await getEntity(params.id);
  if (entity == null) {
    return <PageHead title="Loading..." />;
  }
  const noIndex = !isIndexRelevant(entity);
  const title = isBlocked(entity) ? 'Blocked entity' : entity.caption;
  const entityUrl = `/entities/${entity.id}/`;
  return (
    <>
      <PageHead title={title} noIndex={noIndex} />
      <link rel="canonical" href={entityUrl} />
    </>
  );
}

