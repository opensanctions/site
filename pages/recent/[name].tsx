import queryString from 'query-string';
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import Layout from '../../components/Layout';
import { API_URL } from "../../lib/constants";
import { fetchIndex, fetchJsonUrl, getDatasetByName, getDatasets } from "../../lib/data";
import Dataset from '../../components/Dataset';
import { IEntityDatum, Model } from '../../lib/ftm';
import { IDataset, IStatement, IStatementAPIResponse } from '../../lib/types';
import { FormattedDate } from '../../components/util';
import { EntityLink } from '../../components/Entity';


type EntityRowProps = {
  stmt: IStatement
  model: Model
  sourceMap: { [x: string]: IDataset }
  entityMap: { [x: string]: IEntityDatum }
}

function EntityRow({ stmt, model, sourceMap, entityMap }: EntityRowProps) {
  const source = sourceMap[stmt.dataset];
  const entityData = entityMap[stmt.canonical_id];
  if (source === undefined || entityData == undefined) {
    return null;
  }
  const entity = model.getEntity(entityData);
  return (
    <tr key={`stmt-${stmt.id}`}>
      <td>
        <FormattedDate date={stmt.value} />
      </td>
      <td>
        <EntityLink entity={entity} />
      </td>
      <td>
        {entity.schema.label}
      </td>
      <td>
        <Dataset.Link dataset={source} />
      </td>
    </tr>
  )
}


export default function DatasetRecent({ dataset, modelData, statements, sourceMap, entityMap }: InferGetStaticPropsType<typeof getStaticProps>) {
  const model = new Model(modelData);
  return (
    <Layout.Base title={`Latest entries: ${dataset.title}`}>
      <Container>
        <h1>
          {`Latest entries: ${dataset.title}`}
        </h1>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Target</th>
              <th>Type</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {statements.results.map((stmt) => (
              <EntityRow
                stmt={stmt}
                model={model}
                sourceMap={sourceMap}
                entityMap={entityMap}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout.Base >
  )
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
  const params = context.params!
  const index = await fetchIndex();
  const datasets = await getDatasets()
  const dataset = await getDatasetByName(params.name as string);

  if (dataset === undefined) {
    throw Error();
  }

  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}/statements`,
    'query': {
      // ...context.query,
      'limit': 50,
      'dataset': dataset.name,
      'target': true,
      'prop': 'createdAt',
      'sort': 'value:desc',
    }
  })
  const statements = await fetchJsonUrl(apiUrl) as IStatementAPIResponse;
  const sourceNames = statements.results.map(s => s.dataset);
  const sources = datasets.filter((d) => sourceNames.indexOf(d.name) !== -1)
  const sourceMap = sources.reduce((a, d) => ({ ...a, [d.name]: d }), {})

  const promises = statements.results
    .map(s => s.canonical_id)
    .map(id => fetchJsonUrl(`${API_URL}/entities/${id}?nested=false`));
  const responses = await Promise.all(promises) as IEntityDatum[]
  const entityMap = responses.reduce((a, e) => ({ ...a, [e.id]: e }), {})
  return { props: { dataset, modelData: index.model, statements, apiUrl, sourceMap, entityMap } }
}

export async function getStaticPaths() {
  const datasets = await getDatasets()
  const paths = datasets.map((dataset) => {
    return { params: { name: dataset.name } }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}
