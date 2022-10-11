import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

import { Model } from '../../../lib/ftm';
import { EntityLink, EntityRawLink } from '../../../components/Entity';
import { SpacedList } from '../../../components/util';
import { PropertyValues } from '../../../components/Property';
import Dataset from '../../../components/Dataset';
import { fetchIndex, getEntity, getEntityDatasets, isBlocked } from '../../../lib/data';

import styles from '../../../styles/Entity.module.scss'


export default function EntityPreview({ entityData, modelData, datasets }: InferGetStaticPropsType<typeof getStaticProps>) {
  const model = new Model(modelData);
  const entity = model.getEntity(entityData);
  const entityUrl = `/entities/${entity.id}/`;
  const props = entity.getDisplayProperties()
    .filter((p) => p.getRange() === undefined || p.getRange()?.isA('Thing'));

  return (
    <>
      <Head>
        <title>{entity.caption}</title>
        <link rel="canonical" href={entityUrl} />
      </Head>
      <Container>
        <h3><a href={entityUrl}>{entity.caption}</a></h3>
        <Table className={styles.previewTable} size="sm">
          <tbody>
            {props.map((prop) =>
              <tr key={prop.qname}>
                <th className={styles.cardProp}>{prop.label}</th>
                <td>
                  <PropertyValues
                    prop={prop}
                    values={entity.getProperty(prop)}
                    empty="not available"
                    limit={5}
                    entity={EntityLink}
                  />
                </td>
                <td className={styles.rawColumn}>
                  <EntityRawLink entity={entity} prop={prop.name} />
                </td>
              </tr>
            )}
            {datasets !== undefined && datasets.length > 0 && (
              <tr key="datasets">
                <th className={styles.cardProp}>Data sources</th>
                <td>
                  <SpacedList values={entity.datasets.map((n) => datasets.find((d) => d.name === n)).map((d) => <Dataset.Link dataset={d} />)} />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container >
    </>
  )
}


export const getStaticProps: GetStaticProps = async (context) => {
  const entityId = context.params?.id as (string | undefined);
  const entity = await getEntity(entityId);
  if (entity === null) {
    return { notFound: true }
  }
  const index = await fetchIndex();
  if (isBlocked(entity)) {
    return { notFound: true }
  }
  return {
    props: {
      entityData: entity,
      datasets: await getEntityDatasets(entity),
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
