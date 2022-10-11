import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Layout from '../../components/Layout';
import Research from '../../components/Research';
import { fetchIndex, getEntity, getEntityDatasets, isBlocked } from '../../lib/data';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSchemaEntityPage } from '../../lib/schema';
import { EntityDisplay, EntityPropsTable } from '../../components/Entity';
import { Model } from '../../lib/ftm';
import { BlockedEntity } from '../../components/Policy';


export default function Entity({ entityData, blocked, modelData, datasets }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (blocked) {
    return <BlockedEntity entity={entityData} />
  }
  const model = new Model(modelData);
  const entity = model.getEntity(entityData);
  const structured = getSchemaEntityPage(entity, datasets);
  return (
    <Layout.Base title={entity.caption} structured={structured} activeSection="research">
      <Research.Context>
        <Container>
          <h1>
            {entity.caption}
          </h1>
          <EntityDisplay entity={entity} datasets={datasets} />
        </Container>
      </Research.Context>
    </Layout.Base>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const entityId = context.params?.id as (string | undefined);
  const entity = await getEntity(entityId);
  if (entity === null) {
    return { notFound: true }
  }
  const index = await fetchIndex();
  if (entity.id !== entityId) {
    return { redirect: { destination: `/entities/${entity.id}/`, permanent: true } };
  }
  return {
    props: {
      entityId,
      blocked: isBlocked(entity),
      datasets: await getEntityDatasets(entity),
      entityData: entity,
      modelData: index.model
    },
    revalidate: 3600
  };
}


export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
