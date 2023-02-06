import { Container } from '../../../../components/wrapped';
import { EntityFactsheet } from '../../../../components/Entity';
import { getEntity, isBlocked } from '../../../../lib/data';

import { EntityPageProps } from '../../[id]/common';
import { notFound, redirect } from 'next/navigation';


export default async function Page({ params }: EntityPageProps) {
  const entity = await getEntity(params.id);
  if (entity === null || isBlocked(entity)) {
    notFound()
  }
  if (entity.id !== params.id) {
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
