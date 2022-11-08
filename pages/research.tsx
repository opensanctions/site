import React from 'react';
import queryString from 'query-string';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import Research from '../components/Research';
import { ISearchAPIResponse } from '../lib/types';
import { fetchJsonUrl, fetchObject } from '../lib/data';
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
            <Col md={2}>
            </Col>
            <Col md={8}>
              <h3>Browse and search sanctions data</h3>
              <p>
                Use the research tool to search the OpenSanctions dataset, including
                sanctioned people and companies, policially exposed persons and
                wanted criminals from around the world.
              </p>
            </Col>
            <Col md={2}>
            </Col>
          </Row>
          {response.facets && response.total.value > 0 && (
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
  const response = await fetchObject<ISearchAPIResponse>(apiUrl);
  return {
    props: {
      response
    }
  }
}