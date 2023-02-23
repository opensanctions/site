import Link from 'next/link';

import { PageProps } from '../../components/utils/PageProps';
import { fetchIndex, getDatasets, getModel, postMatch } from '../../lib/data';
import { Col, Container, Row, Table } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { isExternal } from '../../lib/types';
import { asString, ensureArray } from '../../lib/util';
import MatcherForm from '../../components/matcher/MatcherForm';
import MatcherResult from '../../components/matcher/MatcherResult';
import { SEARCH_DATASET } from '../../lib/constants';

import styles from '../../styles/Research.module.scss';

export const revalidate = 0;

export default async function AdvancedSearch({ searchParams }: PageProps) {
  const index = await fetchIndex();
  const model = await getModel();
  const params = searchParams ? searchParams : {};
  const schema = asString(params['schema']) || 'Person';
  const dataset = asString(params['dataset']) || SEARCH_DATASET;
  const allDatasets = await getDatasets()
  const datasets = allDatasets
    .filter((d) => !d.hidden && !isExternal(d))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((d) => ({ name: d.name, title: d.title }));
  const schemaObj = model.getSchema(schema);
  const properties = {} as { [key: string]: string[]; };
  for (const [key, value] of Object.entries(params)) {
    if (schemaObj.hasProperty(key)) {
      properties[key] = ensureArray(value);
    }
  }
  const query = { schema: schema, properties: properties };
  const hasQuery = Object.keys(properties).length > 0;
  const response = await postMatch(query, dataset);

  return (
    <LayoutFrame activeSection="research">
      <div className={styles.researchBar}>
        <Container>
          <h2>Advanced screening search</h2>
          <Row className={styles.advancedForm}>
            <Col md={6}>
              <MatcherForm
                datasets={datasets}
                dataset={dataset}
                modelData={index.model}
                schemata={index.schemata}
                schema={schema}
                isLoading={false}
              />
            </Col>
            <Col md={6} className={styles.advancedExplainer}>
              <p>
                Advanced search will consider multiple criteria and match
                them against the entities in our database.
              </p>
              <ul>
                <li>Choose the entity type "Legal entity" to match people, organizations and
                  companies at the same time.</li>
                <li>Press the icon next to a result score to see an explanation for the score.</li>
                <li>All searches use fuzzy matching and transliteration.</li>
                <li>The matcher will return a maximum of five results.</li>
              </ul>
              <p>
                This search uses the <Link href="https://api.opensanctions.org"><code>/match</code></Link> API
                function which we also recommend to implement bulk screening. When <Link href="/docs/api">using the API</Link>,
                you can include additional search criteria such as addresses.
              </p>
            </Col>
          </Row>
        </Container>
      </div >
      <Container>
        {response.total.value === 0 && hasQuery && (
          <h2>No results.</h2>
        )}
        {response.total.value > 0 && (
          <>
            <Table className={styles.advancedResults}>
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Topics</th>
                  <th className='numeric' colSpan={2}>Score</th>
                </tr>
              </thead>
              <tbody>
                {response.results.map((e) => <MatcherResult model={model} result={e} matcher={index.matcher} key={e.id} />)}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </LayoutFrame>
  );
}