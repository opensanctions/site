import queryString from 'query-string';
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Layout from '../../components/Layout';
import { API_URL } from "../../lib/constants";
import { fetchIndex, fetchJsonUrl, getDatasetByName, getDatasets } from "../../lib/data";
import Dataset from '../../components/Dataset';
import { IEntityDatum, Model } from '../../lib/ftm';
import { IDataset, IStatement, IStatementAPIResponse } from '../../lib/types';
import { FormattedDate, JSONLink, Spacer } from '../../components/util';
import { EntityLink } from '../../components/Entity';
import { TypeValues } from '../../components/Property';


type EntityRowProps = {
  stmt: IStatement
  model: Model
  sourceMap: { [x: string]: IDataset }
  entityMap: { [x: string]: IEntityDatum }
}

function EntityRow({ stmt, model, sourceMap, entityMap }: EntityRowProps) {
  const source = sourceMap[stmt.dataset];
  const entityData = entityMap[stmt.canonical_id];
  if (source === undefined || source == null || entityData == undefined || entityData == null) {
    return null;
  }
  const countryType = model.getType('country');
  const entity = model.getEntity(entityData);
  const countries = entity.getTypeValues(countryType);
  return (
    <tr>
      <td>
        <FormattedDate date={stmt.value} />
      </td>
      <td>
        <strong>
          <EntityLink entity={entity} />
        </strong>
        <p>
          <Badge bg="light">{entity.schema.label}</Badge>
          {!!countries.length && (
            <>
              <Spacer />
              <TypeValues type={countryType} values={countries} limit={4} />
            </>
          )}
        </p>
      </td>
      <td>
        <Dataset.Link dataset={source} />
      </td>
    </tr>
  )
}


export default function DatasetRecent({ dataset, apiUrl, modelData, statements, sourceMap, entityMap }: InferGetStaticPropsType<typeof getStaticProps>) {
  const model = new Model(modelData);
  if (statements === null || statements === undefined) {
    return (
      <Layout.Base title="Failed to load">
        <Container>
          <h2>Could not load search function.</h2>
        </Container>
      </Layout.Base >
    );
  }

  return (
    <Layout.Base title={`Latest entries: ${dataset.title}`}>
      <Container>
        <Row>
          <Col md={12}>
            <h1>
              {`Latest targeted entities`}
              <JSONLink href={apiUrl} />
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Target</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {statements.results.map((stmt) => (
                  <EntityRow
                    key={`stmt-${stmt.id}`}
                    stmt={stmt}
                    model={model}
                    sourceMap={sourceMap}
                    entityMap={entityMap}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={3}>
            <p>
              <Badge bg="light">
                Data as of <FormattedDate date={dataset.last_change} />
              </Badge>
            </p>
            <Alert variant="primary">
              See the latest targets published in <Alert.Link href={`/datasets/${dataset.name}`}>{dataset.title}</Alert.Link>. This table shows
              when a particular entity was added to the source - the profile page
              will instead name the first date the entity was targeted by any of the
              sources included in our database.
            </Alert>
          </Col>
        </Row>
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
      'limit': 100,
      'dataset': dataset.name,
      'target': true,
      'prop': 'createdAt',
      'sort': 'value:desc',
    }
  })
  const statements = await fetchJsonUrl(apiUrl) as IStatementAPIResponse;
  if (statements === null) {
    return { props: { dataset, modelData: index.model, statements, apiUrl, sourceMap: {}, entityMap: {} } }
  }
  const sourceNames = statements.results.map(s => s.dataset);
  const sources = datasets.filter((d) => sourceNames.indexOf(d.name) !== -1)
  const sourceMap = sources.reduce((a, d) => ({ ...a, [d.name]: d }), {})

  const promises = statements.results
    .map(s => s.canonical_id)
    .map(id => fetchJsonUrl(`${API_URL}/entities/${id}?nested=false`));
  const responses = await Promise.all(promises) as IEntityDatum[]
  const entityMap = responses
    .filter((e) => e !== null)
    .reduce((a, e) => ({ ...a, [e.id]: e }), {})
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
