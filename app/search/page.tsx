import React from 'react';
import { Model } from '../../lib/ftm/model';

import Research from '../../components/Research';
import { ISearchAPIResponse } from '../../lib/types';
import { Container, Row, Col, Alert, AlertHeading } from '../../components/wrapped';
import { fetchIndex, fetchObject, getDatasets } from '../../lib/data';
import { SearchFacet, SearchFilterTags, SearchResultEntity } from '../../components/Search';
import { SEARCH_DATASET, SEARCH_SCHEMA } from '../../lib/constants';
import { FormattedDate, ResponsePagination } from '../../components/util';
import { LicenseInfo } from '../../components/Policy';
import { getGenerateMetadata } from '../../lib/meta';

import { PageProps } from '../../components/utils/PageProps';
import LayoutFrame from '../../components/layout/LayoutFrame';

import styles from '../../styles/Search.module.scss';

export const revalidate = 0;
export const SUMMARY = "Provide a search term to search across sanctions lists and other persons of interest.";


export async function generateMetadata() {
  return getGenerateMetadata({
    title: `Search`,
    description: SUMMARY
  })
}


export default async function Search({ searchParams }: PageProps) {
  const index = await fetchIndex();
  const datasets = await getDatasets();
  if (searchParams === undefined) {
    return <LayoutFrame activeSection="research" />;
  }
  const scopeName = searchParams['scope'] || SEARCH_DATASET;
  const schemaName = searchParams['schema'] || SEARCH_SCHEMA;
  const params = {
    ...searchParams,
    'limit': 25,
    'fuzzy': 'false',
    'simple': 'true',
    'schema': schemaName
  }
  const response = await fetchObject<ISearchAPIResponse>(`/search/${scopeName}`, params);
  const model = new Model(index.model);
  const hasScope = scopeName !== SEARCH_DATASET;
  const scope = datasets.find((d) => d.name === scopeName);

  if (scope === undefined) {
    return (
      <LayoutFrame activeSection="research">
        <Research.Context query={searchParams}>
          <Container>
            <h2>Could not load search function.</h2>
          </Container>
        </Research.Context>
      </LayoutFrame>
    );
  }

  const title = hasScope ? `Search in: ${scope.title}` : 'Search OpenSanctions';

  return (
    <LayoutFrame activeSection="research">
      <Research.Context query={searchParams} title={title}>
        <Container>
          <Row className={styles.searchMeta}>
            <Col md={8}>
              <SearchFilterTags scope={scope} model={model} datasets={datasets} searchParams={searchParams} />
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
                  <AlertHeading>Search failed.</AlertHeading>
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
                      <AlertHeading> No matching entities were found.</AlertHeading>
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
              <LicenseInfo />
            </Col>
          </Row>
        </Container>
      </Research.Context>
    </LayoutFrame>
  )
}
