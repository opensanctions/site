import React from 'react';
import queryString from 'query-string';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import Research from '../components/Research';
import { ISearchAPIResponse } from '../lib/types';
import { fetchJsonUrl } from '../lib/data';
import { InferGetStaticPropsType } from 'next';
import { SearchFacet } from '../components/Search';
import { API_URL, SEARCH_DATASET, SEARCH_SCHEMA } from '../lib/constants';

import styles from '../styles/Research.module.scss'

const TITLE = "Research tool"
const SUMMARY = "Provide a search term to search across sanctions lists and other persons of interest.";

export default function ResearchIntro({ response }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout.Base title={TITLE} description={SUMMARY} activeSection="research">
      <Research.Context title={TITLE}>
        <Container>
          <Row className={styles.researchIntro}>
            <Col md={3}>
            </Col>
            <Col md={6}>
              <h2>Browse and search sanctions data</h2>
            </Col>
            <Col md={3}>
            </Col>
          </Row>
          {response !== null && response.facets && response.total.value > 0 && (
            <Row>
              <Col md={4}>
                <SearchFacet field="topics" facet={response.facets.topics} />
              </Col>
              <Col md={4}>
                <SearchFacet field="datasets" facet={response.facets.datasets} />
              </Col>
              <Col md={4}>
                <SearchFacet field="countries" facet={response.facets.countries} />
              </Col>
            </Row>
          )}
        </Container>
      </Research.Context >
    </Layout.Base >
  )
}


export async function getStaticProps() {
  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}/search/${SEARCH_DATASET}`,
    'query': {
      'limit': 0,
      'schema': SEARCH_SCHEMA
    }
  })
  const response = await fetchJsonUrl(apiUrl) as ISearchAPIResponse;
  return {
    props: {
      response
    }
  }
}