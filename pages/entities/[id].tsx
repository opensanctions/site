import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Layout from '../../components/Layout';
import Research from '../../components/Research';
import { fetchIndex, getEntity, getEntityDatasets, isBlocked } from '../../lib/data';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSchemaEntityPage } from '../../lib/schema';
import { EntityDisplay } from '../../components/Entity';
import { Model } from '../../lib/ftm';


export default function Entity({ entityData, blocked, modelData, datasets }: InferGetStaticPropsType<typeof getStaticProps>) {
  const model = new Model(modelData);
  const entity = model.getEntity(entityData);
  if (blocked) {
    return (
      <Layout.Base title="Blocked entity" activeSection="research">
        <Research.Context>
          <Container>
            <br />
            <Alert variant="warning">
              <Alert.Heading>Blocked entity</Alert.Heading>
              <p>
                The entity with ID <code>{entityData.id}</code> has been removed from the
                OpenSanctions website due to unusual legal circumstances. It is still
                contained in the API and bulk data products to maintain list completeness.
              </p>
            </Alert>
          </Container>
        </Research.Context>
      </Layout.Base>
    );
  }
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
