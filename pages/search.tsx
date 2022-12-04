import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Model } from '../lib/ftm/model';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import Research from '../components/Research';
import { ISearchAPIResponse } from '../lib/types';
import { fetchIndex, fetchObject, getDatasets } from '../lib/data';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { SearchFacet, SearchFilterTags, SearchResultEntity } from '../components/Search';
import { SEARCH_DATASET, SEARCH_SCHEMA } from '../lib/constants';
import { FormattedDate, ResponsePagination } from '../components/util';

import styles from '../styles/Search.module.scss'

const SUMMARY = "Provide a search term to search across sanctions lists and other persons of interest.";

export default function Search({ modelData, datasets, scopeName, response }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const model = new Model(modelData);
  const params = useSearchParams();
  const searchParams = Object.fromEntries(params.entries())
  const hasScope = scopeName !== SEARCH_DATASET;
  const scope = datasets.find((d) => d.name === scopeName);

  if (scope === undefined) {
    return (
      <Layout.Base title="Failed to load" activeSection="research">
        <Research.Context query={searchParams}>
          <Container>
            <h2>Could not load search function.</h2>
          </Container>
        </Research.Context>
      </Layout.Base >
    );
  }
  const title = hasScope ? `Search in: ${scope.title}` : 'Search OpenSanctions';

  return (
    <Layout.Base title={title} description={SUMMARY} activeSection="research">
      <Research.Context query={searchParams} title={title}>
        <Container>
          <Row className={styles.searchMeta}>
            <Col md={8}>
              <SearchFilterTags scope={scope} model={model} datasets={datasets} />
            </Col>
            <Col md={4}>
              <p className={styles.searchNotice}>
                Data current as of <FormattedDate date={scope.last_change} />
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              {response === null && (
                <Alert variant="warning">
                  <Alert.Heading>Search failed.</Alert.Heading>
                  <p>
                    You may have entered an invalid search term, or our system
                    is not working as expected.
                  </p>
                </Alert>
              )}
              {response !== null && (
                <>
                  {response.total.value === 0 && (
                    <Alert variant="warning">
                      <Alert.Heading> No matching entities were found.</Alert.Heading>
                      <p>
                        Try searching a partial name, or use a different spelling.
                      </p>
                    </Alert>
                  )
                  }
                  < ul className={styles.resultList}>
                    {response.results.map((r) => (
                      <SearchResultEntity key={r.id} data={r} model={model} />
                    ))}
                  </ul>
                  <ResponsePagination response={response} searchParams={searchParams} />
                </>
              )}
            </Col>
            <Col md={4}>
              {response !== null && response.facets && response.total.value > 0 && (
                <>
                  <SearchFacet field="topics" facet={response.facets.topics} searchParams={searchParams} />
                  <SearchFacet field="datasets" facet={response.facets.datasets} searchParams={searchParams} />
                  <SearchFacet field="countries" facet={response.facets.countries} searchParams={searchParams} />
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Research.Context>
    </Layout.Base >
  )
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const index = await fetchIndex();
  const datasets = await getDatasets();
  const scopeName = context.query.scope || SEARCH_DATASET;
  const schemaName = context.query.schema || SEARCH_SCHEMA;
  const params = {
    ...context.query,
    'limit': 25,
    'fuzzy': 'false',
    'simple': 'true',
    'schema': schemaName
  }
  const response = await fetchObject<ISearchAPIResponse>(`/search/${scopeName}`, params);
  return {
    props: {
      response,
      scopeName,
      datasets: datasets,
      modelData: index.model
    }
  };
}
