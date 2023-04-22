import { getEntity, isBlocked, isIndexRelevant } from "../../lib/data";
import { getGenerateMetadata } from "../../lib/meta";

export interface EntityPageProps {
  params: { entityId: string }
}

export async function generateEntityMetadata({ params }: EntityPageProps) {
  const entity = await getEntity(params.entityId);
  if (entity === null) {
    return getGenerateMetadata({
      title: "Entity not found"
    });
  }
  const title = isBlocked(entity) ? 'Blocked entity' : entity.caption;
  const noIndex = !isIndexRelevant(entity);
  return getGenerateMetadata({
    title: title,
    noIndex: noIndex
  })
}
