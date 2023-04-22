import { Container } from '../../../../components/wrapped';
import { EntityFactsheet } from '../../../../components/Entity';
import { getEntity, isBlocked } from '../../../../lib/data';

import { EntityPageProps, generateEntityMetadata } from '../../common';
import { notFound, redirect } from 'next/navigation';

export async function generateMetadata({ params }: EntityPageProps) {
  return generateEntityMetadata({ params: params });
}


export default async function Page({ params }: EntityPageProps) {
  const entity = await getEntity(params.entityId);
  if (entity === null || isBlocked(entity)) {
    notFound()
  }
  if (entity.id !== params.entityId) {
    redirect(`/entities/preview/${entity.id}/`)
  }
  const entityUrl = `/entities/${entity.id}/`;
  return (
    <Container fluid>
      <h3><a href={entityUrl}>{entity.caption}</a></h3>
      <EntityFactsheet entity={entity} />
    </Container >
  )
}
