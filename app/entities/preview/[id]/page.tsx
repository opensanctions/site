import { Container } from '../../../../components/wrapped';
import { Model } from '../../../../lib/ftm';
import { EntityFactsheet, EntityLink, EntityRawLink } from '../../../../components/Entity';
import { SpacedList } from '../../../../components/util';
import { PropertyValues } from '../../../../components/Property';
import Dataset from '../../../../components/Dataset';
import { fetchIndex, getEntity, getEntityData, getEntityDatasets, isBlocked } from '../../../../lib/data';

import styles from '../../../../styles/Entity.module.scss'
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
