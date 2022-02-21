import Container from 'react-bootstrap/Container';

import { fetchIndex, fetchJsonUrl } from '../../../lib/data';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { API_URL } from '../../../lib/constants';
import { IEntityDatum, Model } from '../../../lib/ftm';
import { EntitySidebar } from '../../../components/Entity';
import Head from 'next/head';


export default function EntityPreview({ entityData, modelData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const model = new Model(modelData);
  const entity = model.getEntity(entityData);
  const entityUrl = `/entities/${entity.id}/`;
  return (
    <>
      <Head>
        <title>{entity.caption}</title>
        <link rel="canonical" href={entityUrl} />
      </Head>
      <Container>
        <h3><a href={entityUrl}>{entity.caption}</a></h3>
        <EntitySidebar entity={entity} rawLinks={false} />
      </Container >
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const entityId = context.params?.id as (string | undefined);
  if (entityId === undefined) {
    return { notFound: true }
  }
  const index = await fetchIndex();
  const apiUrl = `${API_URL}/entities/${entityId}`;
  const raw = await fetchJsonUrl(apiUrl);
  if (raw === undefined || raw === null || raw.id === undefined) {
    return { notFound: true }
  }
  const entity = raw as IEntityDatum;
  if (entity.id !== entityId) {
    return { redirect: { destination: `/entities/${entity.id}`, permanent: false } };
  }
  return {
    props: {
      entityId,
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
