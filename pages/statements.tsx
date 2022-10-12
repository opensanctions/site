import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import queryString from 'query-string';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'
import { IStatementAPIResponse } from '../lib/types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { ResponsePagination } from '../components/util';
import styles from '../styles/Statement.module.scss'
import { API_URL } from '../lib/constants';
import { FormattedDate, JSONLink } from '../components/util';
import { AspectRatioFill, Link45deg } from 'react-bootstrap-icons';
import { fetchJsonUrl, getStatements } from '../lib/data';

type ExpandProps = {
  href: string
}

function Expand({ href }: ExpandProps) {
  return (
    <td className={styles.colExpand}>
      <a href={href}><AspectRatioFill size={14} /></a>
    </td>
  )

}

type StatementValueProps = {
  value: string
  prop: string
  propType: string
}

function StatementValue({ value, prop, propType }: StatementValueProps) {
  const filterQuery = (args: any) => {
    const newQuery = queryString.stringify({
      ...args
    });
    return `?${newQuery}`;
  }

  if (propType === 'url') {
    return (
      <a href={value}>
        <Link45deg /> {value}
      </a>
    );
  }

  if (propType === 'entity' || prop === 'id') {
    return (
      <Link href={filterQuery({ entity_id: value })}>
        {value}
      </Link>
    );
  }
  return <>{value}</>;
}


export default function Statements({ response }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (response === null) {
    return (
      <Layout.Base title="Failed to load" activeSection="research">
        <Container>
          <h2>Could not load raw data viewer</h2>
        </Container>
      </Layout.Base >
    );
  }
  const title = 'Raw data explorer';

  const filterQuery = (args: any) => {
    const newQuery = queryString.stringify({
      ...args
    });
    return `?${newQuery}`;
  }

  return (
    <Layout.Base title={title} activeSection="research">
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Container>
        <Row>
          <Col md={12}>
            <h1>
              {title}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Alert variant="secondary">
              This table shows statement-based, sourced records from our database. For more context,
              learn about <Alert.Link href="/docs/statements/">how OpenSanctions stores information</Alert.Link>.
            </Alert>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th className={styles.colCanonical} colSpan={2}>ID</th>
                  <th className={styles.colProp} colSpan={2}>Property</th>
                  <th className={styles.colValue}>Value</th>
                  <th className={styles.colDataset} colSpan={2}>Source dataset</th>
                  <th className={styles.colEntity}>Source ID</th>
                  <th className={styles.colDate}>First seen</th>
                  <th className={styles.colDate}>Last seen</th>
                </tr>
              </thead>
              <tbody>
                {response.results.map((stmt) => (
                  <tr key={`stmt-${stmt.id}`}>
                    <td className={styles.colCanonical}>
                      <Link href={filterQuery({ canonical_id: stmt.canonical_id })}>
                        {stmt.canonical_id}
                      </Link>
                    </td>
                    <Expand href={`/entities/${stmt.canonical_id}/`} />
                    <td className={styles.colProp}>
                      <code><span className="text-muted">{stmt.schema}:</span>{stmt.prop}</code>
                    </td>
                    <Expand href={`/reference/#schema.${stmt.schema}`} />
                    <td className={styles.colValue}>
                      <StatementValue value={stmt.value} prop={stmt.prop} propType={stmt.prop_type} />
                    </td>
                    <td className={styles.colDataset}>
                      <Link href={filterQuery({ dataset: stmt.dataset })}>
                        {stmt.dataset}
                      </Link>
                    </td>
                    <Expand href={`/datasets/${stmt.dataset}/`} />
                    <td className={styles.colEntity}>
                      <Link href={filterQuery({ entity_id: stmt.entity_id })}>
                        {stmt.entity_id}
                      </Link>
                    </td>
                    <td className={styles.colDate}>
                      <FormattedDate date={stmt.first_seen} />
                    </td>
                    <td className={styles.colDate}>
                      <FormattedDate date={stmt.last_seen} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ResponsePagination response={response} />
          </Col>
        </Row>
      </Container>
    </Layout.Base >
  )
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const response = await getStatements(context.query);
  return {
    props: {
      response
    }
  };
}
