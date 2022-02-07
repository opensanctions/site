import Container from 'react-bootstrap/Container';

import Layout from '../../components/Layout'
import { ISource, isSource } from '../../lib/types';
import { fetchIndex, fetchJsonUrl, getDatasets } from '../../lib/data';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { API_URL } from '../../lib/constants';
import { JSONLink } from '../../components/util';
import { getSchemaEntityPage } from '../../lib/schema';
import { EntityDisplay } from '../../components/Entity';
import { IEntityDatum, Model } from '../../lib/ftm';

// import styles from '../styles/Search.module.scss'


export default function Entity({ apiUrl, entityData, modelData, sources }: InferGetStaticPropsType<typeof getStaticProps>) {
  const model = new Model(modelData);
  const entity = model.getEntity(entityData);
  const structured = getSchemaEntityPage(entity, sources);
  return (
    <Layout.Base title={entity.caption} structured={structured}>
      <Container>
        <h1>
          {entity.caption}
          <JSONLink href={apiUrl} />
        </h1>
        <EntityDisplay entity={entity} datasets={sources} />
      </Container>
    </Layout.Base >
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const entityId = context.params?.id as (string | undefined);
  if (entityId === undefined) {
    return { redirect: { destination: '/search/', permanent: false } };
  }
  const index = await fetchIndex();
  const datasets = await getDatasets();
  const apiUrl = `${API_URL}/entities/${entityId}`;
  const raw = await fetchJsonUrl(apiUrl);
  if (raw === undefined || raw === null || raw.id === undefined) {
    return { notFound: true }
  }
  const entity = raw as IEntityDatum;
  if (entity.id !== entityId) {
    return { redirect: { destination: `/entities/${entity.id}`, permanent: false } };
  }
  const sourceNames = entity !== null ? entity.datasets : [];

  const sources = sourceNames
    .map((name) => datasets.find((d) => d.name === name))
    .filter((d) => d !== undefined)
    .filter((d) => isSource(d)) as Array<ISource>

  return {
    props: {
      entityId,
      apiUrl,
      sources: sources,
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
