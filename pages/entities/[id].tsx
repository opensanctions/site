import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import Layout from '../../components/Layout';
import Research from '../../components/Research';
import { IDataset } from '../../lib/types';
import { fetchIndex, fetchJsonUrl, getDatasets, isBlocked } from '../../lib/data';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { API_URL } from '../../lib/constants';
import { getSchemaEntityPage } from '../../lib/schema';
import { EntityDisplay } from '../../components/Entity';
import { IEntityDatum, Model } from '../../lib/ftm';


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
  if (entityId === undefined) {
    return { redirect: { destination: '/search/', permanent: false } };
  }
  const index = await fetchIndex();
  const allDatasets = await getDatasets();
  const apiUrl = `${API_URL}/entities/${entityId}`;
  const raw = await fetchJsonUrl(apiUrl);
  if (raw === undefined || raw === null || raw.id === undefined) {
    return { notFound: true }
  }
  const entity = raw as IEntityDatum;
  if (entity.id !== entityId) {
    return { redirect: { destination: `/entities/${entity.id}/`, permanent: true } };
  }
  const datasetNames = entity !== null ? entity.datasets : [];

  const datasets = datasetNames
    .map((name) => allDatasets.find((d) => d.name === name))
    .filter((d) => d !== undefined) as IDataset[];

  return {
    props: {
      entityId,
      blocked: isBlocked(entity),
      datasets: datasets,
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
