
import Link from 'next/link';

import { Container, Row, Col, Card, CardHeader, Table } from '../../components/wrapped'
import { FormattedDate, JSONLink, SpacedList, Summary } from '../../components/util';
import { SUMMARY, TITLE } from './common';
import { GRAPH_CATALOG_URL } from '../../lib/constants';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getGraphCatalog } from '../../lib/data';
import { INKDataset } from '../../lib/types';

import styles from '../../styles/Graph.module.scss'

export const revalidate = 3600;

type GraphDatasetCardProps = {
  dataset: INKDataset
}

function GraphDatasetCard({ dataset }: GraphDatasetCardProps) {
  return (
    <Card key={dataset.name} className={styles.datasetCard}>
      <CardHeader className={styles.datasetCardHeader}>
        <a id={`dataset.${dataset.name}`} />
        {dataset.title}
      </CardHeader>
      <Table className={styles.datasetCardTable}>
        <tbody>
          <tr>
            <th className={styles.datasetCardTableHeader}>
              Name:
            </th>
            <td>
              <code>{dataset.name}</code>
            </td>
          </tr>
          {!!dataset.summary && (
            <tr>
              <th className={styles.datasetCardTableHeader}>
                Summary:
              </th>
              <td>
                {dataset.summary}
              </td>
            </tr>
          )}
          {!!dataset.publisher && (
            <tr>
              <th className={styles.datasetCardTableHeader}>
                Publisher:
              </th>
              <td>
                {dataset.publisher.url && (
                  <Link href={dataset.publisher.url}>
                    {dataset.publisher.name}
                  </Link>
                )}
                {!dataset.publisher.url && (
                  <>{dataset.publisher.name}</>
                )}
                {!!dataset.publisher.country_label && (
                  <> ({dataset.publisher.country_label})</>
                )}
              </td>
            </tr>
          )}
          {!!dataset.coverage && (
            <tr>
              <th className={styles.datasetCardTableHeader}>
                Coverage:
              </th>
              <td>
                {dataset.coverage.start && (
                  <>
                    {'from '}
                    <FormattedDate date={dataset.coverage.start} />
                  </>
                )}
                {dataset.coverage.end && (
                  <>
                    {'up until '}
                    <FormattedDate date={dataset.coverage.end} />
                  </>
                )}
              </td>
            </tr>
          )}
          {(dataset.resources && dataset.resources.length > 0) && (
            <tr>
              <th className={styles.datasetCardTableHeader}>
                Downloads:
              </th>
              <td>
                <ul className={styles.resourceList}>
                  {dataset.resources.map((resource) =>
                    <li key={resource.name}>
                      <a href={resource.url} download={resource.name}>
                        {resource.name}
                      </a>
                      {': '}
                      {resource.mime_type_label}
                    </li>
                  )}
                </ul>
              </td>
            </tr>
          )}
          {(dataset.children && dataset.children.length > 0) && (
            <tr>
              <th className={styles.datasetCardTableHeader}>
                Datasets:
              </th>
              <td>
                <SpacedList values={dataset.children.map((child) =>
                  <code>{child}</code>
                )} />
              </td>
            </tr>
          )}
          <tr>
            <th className={styles.datasetCardTableHeader}>
              Last updated:
            </th>
            <td>
              <FormattedDate date={dataset.updated_at} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card >
  );
}


export default async function Page() {
  const catalog = await getGraphCatalog();
  return (
    <LayoutFrame activeSection="datasets">
      <Container>
        <h1>
          {TITLE}
          <JSONLink href={GRAPH_CATALOG_URL} />
        </h1>
        <Row>
          <Col>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h4>What is this?</h4>
            <p>
              The datasets provide information regarding the <strong>control and ownership of
                companies</strong> in various jurisdictions.
              They are collected from public sources, and are published here in a
              cleaned and transformed structure, using
              the <Link href="/docs/entities/">FollowTheMoney entity format</Link>.
            </p>
            <h4>What is it useful for?</h4>
            <p>
              <Link href="https://www.openownership.org/en/publication-categories/briefings/">Beneficial ownership data</Link> is
              used by businesses that want to understand if they're dealing with risky
              counterparties, and by investigators who want to
              understand who is behind a particular company.
            </p>
            <h4>How can I use the data?</h4>
            <p>
              Here's some ways you can use OpenSanctions KYB data:
            </p>
            <ul>
              <li>
                <strong><Link href="https://resources.linkurious.com/openscreening">OpenScreening</Link></strong>:
                We've worked with <Link href="https://linkurious.com/">Linkurious</Link> and
                {' '}<Link href="https://openownership.org/">OpenOwnership</Link> to publish a
                demo application where you can interactively browse and analyse the combined
                OpenSanctions and KYB datasets.
              </li>
              <li>
                <strong><Link href="https://api.graph.opensanctions.org">OpenSanctions KYB API</Link></strong>:
                Use our search and matching API if you want to integrate the datasets into a screening process
                or other application.
              </li>
              <li>
                <strong>Bulk data downloads</strong>:
                Fetch the full datasets for download on this page. They can be
                processed using the <Link href="https://followthemoney.tech">FollowTheMoney</Link> suite
                of tools for the command-line, Python and TypeScript.
              </li>
            </ul>
            <p>
              <Link href="/contact/">Contact us</Link> about a <Link href="/licensing/">data license</Link> if
              you plan to rely on the data for commercial use.
            </p>
            <h4>How is this different from the OpenSanctions core dataset?</h4>
            <p>
              OpenSanctions publishes entities that are <Link href="/docs/criteria">directly or indirectly associated with
                some risk indication</Link>. This obviously doesn't apply to the vast majority of companies.
            </p>
            <p>
              The KYB datasets represent full company databases, irrespective of risk indications. Some
              company records from these datasets will be added to OpenSanctions core via <Link href="/docs/enrichment/">
                data enrichment
              </Link>.
            </p>
            <p>
              Unlike the OpenSanctions core data, the KYB datasets are not de-duplicated. This means that if a
              source registry publishes multiple records that describe a single person or company, they will be
              reproduced in this data as-is.
            </p>
          </Col>
          <Col md={6}>
            {catalog.datasets.map((dataset) =>
              <div key={dataset.name}>
                <GraphDatasetCard dataset={dataset} />
              </div>
            )}
          </Col>
        </Row>
      </Container >
    </LayoutFrame >
  )
}
