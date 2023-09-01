
import Link from 'next/link';

import { Container, Row, Col, Card, CardHeader, Table } from '../../components/wrapped'
import { FormattedDate, JSONLink, SpacedList, Summary } from '../../components/util';
import { GRAPH_CATALOG_URL, REVALIDATE_BASE } from '../../lib/constants';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getGraphCatalog } from '../../lib/data';
import { INKDataset } from '../../lib/types';

import styles from '../../styles/Graph.module.scss'
import { getGenerateMetadata } from '../../lib/meta';

export const revalidate = REVALIDATE_BASE;
const TITLE = "Know-your-business datasets";
const SUMMARY = "OpenSanctions KYB is a group of datasets related to corporate ownership and control. They are published in a well-defined data format and can be used to build complex knowledge graphs and analytical applications.";

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY
  })
}

type GraphDatasetCardProps = {
  dataset: INKDataset
}

function GraphDatasetCard({ dataset }: GraphDatasetCardProps) {
  return (
    <Card key={dataset.name} className={styles.datasetCard}>
      <CardHeader className={styles.datasetCardHeader}>
        <Link href={`/datasets/${dataset.name}/`}>{dataset.title}</Link>
      </CardHeader>
      <Table className={styles.datasetCardTable}>
        <tbody>
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
            <h3>What is this?</h3>
            <p>
              The datasets provide information regarding the <strong>control and ownership of
                companies</strong> in various jurisdictions.
              They are collected from public sources, and are published here in a
              cleaned and transformed structure, using
              the <Link href="/docs/entities/">FollowTheMoney entity format</Link>.
            </p>
            <h3>What is it useful for?</h3>
            <p>
              <Link href="https://www.openownership.org/en/publication-categories/briefings/">Beneficial ownership data</Link> is
              used by businesses that want to understand if they're dealing with risky
              counterparties, and investigators who want to understand who is behind a
              particular company.
            </p>
            <h3>How can I use the data?</h3>
            <p>
              OpenSanctions KYB data is a building block, not an end-user product. Here's some ways you can use it:
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
            <h3>How is this different from the default dataset?</h3>
            <p>
              Our <Link href="/datasets/default/">OpenSanctions default dataset</Link> collects entities that are <Link href="/docs/criteria">directly or indirectly associated with
                some risk indication</Link>. This doesn't apply to the vast majority of companies.
            </p>
            <p>
              The KYB datasets represent full company databases, irrespective of risk indications. Some
              company records from these datasets are routinely added to OpenSanctions core via <Link href="/docs/enrichment/">
                data enrichment
              </Link>.
            </p>
            <p>
              Unlike the OpenSanctions core data, the KYB datasets are not de-duplicated. This means that if a
              source registry publishes multiple records that describe a single person or company, they will be
              reproduced in this data as-is.
            </p>
            <h3>How frequently are datasets updated?</h3>
            <p>
              We update most sources once a week. This doesn't apply to data sources which - by their nature - do
              not change on a regular basis (e.g. the ICIJ OffshoreLeaks database).
            </p>
            <p>
              Updates also exclude the Russian company database: since the Duma has passed laws which allow
              sanctioned companies to hide their information in the registry, we're using a static version
              dated 1. Jan 2022 as the last safe point of reference for Russia.
            </p>
            <h3>I want to use this!</h3>
            <p>
              Brilliant, come talk to us! The OpenSanctions dataset is free to use for
              non-commercial purposes, including users from academia, activists and journalists. If you're
              interested in <Link href="/licensing/">licensing</Link> the data for commercial
              purposes, please <Link href="/contact/">contact us</Link>.
            </p>
          </Col>
          <Col md={6}>
            <h3>Available datasets</h3>
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
