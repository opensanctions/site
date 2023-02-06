import PageHead from "../../../components/layout/PageHead";
import { EntityPageProps } from "./common";
import { getSchemaEntityPage } from '../../../lib/schema';
import { getEntity, getEntityDatasets, isBlocked, isIndexRelevant } from '../../../lib/data';

export default async function Head({ params }: EntityPageProps) {
  // const entity = await getEntity(params.id);
  // if (entity === null) {
  //   return <PageHead title="Entity not found" />;
  // }
  // const datasets = await getEntityDatasets(entity);
  // const structured = getSchemaEntityPage(entity, datasets);
  // const noIndex = !isIndexRelevant(entity);
  // const title = isBlocked(entity) ? 'Blocked entity' : entity.caption;
  // return <PageHead title={title} noIndex={noIndex} structured={structured} />;
  return (
    <>
      <title>under maintenance</title>
    </>
  )
}
