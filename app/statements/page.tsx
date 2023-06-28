import React from 'react';
import Link from 'next/link';
import queryString from 'query-string';

import { ResponsePagination } from '../../components/util';
import { FormattedDate } from '../../components/util';
import { AspectRatioFill, Link45deg } from 'react-bootstrap-icons';
import { getStatements } from '../../lib/data';
import { getGenerateMetadata } from '../../lib/meta';
import { PageProps } from '../../components/utils/PageProps';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { Container, Row, Col, Table, Alert, AlertLink } from '../../components/wrapped';

import styles from '../../styles/Statement.module.scss'
import { IStatement } from '../../lib/types';


export const revalidate = 0;
const TITLE = "Raw data explorer";

type ExpandProps = {
  href: string
}

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE
  })
}

function Expand({ href }: ExpandProps) {
  return (
    <td className={styles.colExpand}>
      <Link href={href}><AspectRatioFill size={14} /></Link>
    </td>
  )

}

type StatementValueProps = {
  stmt: IStatement
}

function StatementValue({ stmt }: StatementValueProps) {
  const filterQuery = (args: any) => {
    const newQuery = queryString.stringify({
      ...args
    });
    return `/statements/?${newQuery}`;
  }

  if (stmt.prop_type === 'url') {
    return (
      <a href={stmt.value}>
        <Link45deg /> {stmt.value}
      </a>
    );
  }

  if (stmt.prop_type === 'entity') {
    return (
      <Link href={filterQuery({ entity_id: stmt.value })} prefetch={false} rel="nofollow">
        {stmt.value}
      </Link>
    );
  }
  if (!!stmt.original_value) {
    return <abbr title={stmt.original_value}>{stmt.value}</abbr>;
  }
  return <>{stmt.value}</>;
}


export default async function Page({ searchParams }: PageProps) {
  const response = await getStatements(searchParams);
  if (response === null || searchParams === undefined) {
    return (
      <LayoutFrame activeSection="research">
        <Container>
          <h2>Could not load raw data viewer</h2>
        </Container>
      </LayoutFrame>
    );
  }

  const filterQuery = (args: any) => {
    const newQuery = queryString.stringify({
      ...args
    });
    return `/statements/?${newQuery}`;
  }

  return (
    <LayoutFrame activeSection="research">
      <Container>
        <Row>
          <Col md={12}>
            <h1>
              {TITLE}
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Alert variant="secondary">
              This table shows statement-based, sourced records from our database. For more context,
              learn about <AlertLink href="/docs/statements/">how OpenSanctions stores information</AlertLink>.
            </Alert>
            <Table bordered size="sm">
              <thead>
                <tr>
                  <th className={styles.colCanonical} colSpan={2}>ID</th>
                  <th className={styles.colProp} colSpan={2}>Property</th>
                  <th className={styles.colValue}>Value</th>
                  <th className={styles.colLang}>Lang</th>
                  <th className={styles.colDataset} colSpan={2}>Source dataset</th>
                  <th className={styles.colEntity}>Source ID</th>
                  <th className={styles.colDate}>First seen</th>

                  {/* <th className={styles.colDate}>Last seen</th> */}
                </tr>
              </thead>
              <tbody>
                {response.results.map((stmt) => (
                  <tr key={`stmt-${stmt.id}`}>
                    <td className={styles.colCanonical}>
                      <Link href={filterQuery({ canonical_id: stmt.canonical_id })} prefetch={false} rel="nofollow">
                        {stmt.canonical_id}
                      </Link>
                    </td>
                    <Expand href={`/entities/${stmt.canonical_id}/`} />
                    <td className={styles.colProp}>
                      <code><span className="text-muted">{stmt.schema}:</span>{stmt.prop}</code>
                    </td>
                    <Expand href={`/reference/#schema.${stmt.schema}`} />
                    <td className={styles.colValue}>
                      <StatementValue stmt={stmt} />
                    </td>
                    <td className={styles.colLang}>
                      {stmt.lang || ''}
                    </td>
                    <td className={styles.colDataset}>
                      <Link href={filterQuery({ dataset: stmt.dataset })} prefetch={false} rel="nofollow">
                        {stmt.dataset}
                      </Link>
                    </td>
                    <Expand href={`/datasets/${stmt.dataset}/`} />
                    <td className={styles.colEntity}>
                      <Link href={filterQuery({ entity_id: stmt.entity_id })} prefetch={false} rel="nofollow">
                        {stmt.entity_id}
                      </Link>
                    </td>
                    <td className={styles.colDate}>
                      <FormattedDate date={stmt.first_seen} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ResponsePagination response={response} searchParams={searchParams} />
          </Col>
        </Row>
      </Container>
    </LayoutFrame >
  )
}
