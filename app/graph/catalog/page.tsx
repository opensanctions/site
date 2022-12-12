
import Link from 'next/link';

import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardFooter, CardGroup, CardHeader, Table } from '../../../components/wrapped'
import { FormattedDate, JSONLink, SpacedList, Spacer, Summary } from '../../../components/util';
import { SUMMARY, TITLE } from './common';
import { GRAPH_CATALOG_URL } from '../../../lib/constants';
import LayoutFrame from '../../../components/layout/LayoutFrame';

import styles from '../../../styles/Graph.module.scss'
import { getGraphCatalog } from '../../../lib/data';
import { INKDataset } from '../../../lib/types';

type GraphDatasetCardProps = {
    dataset: INKDataset
}

function GraphDatasetCard({ dataset }: GraphDatasetCardProps) {
    return (
        <Card key={dataset.name} className={styles.datasetCard}>
            <CardHeader className={styles.datasetCardHeader}>
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
                    <Col md={4}>
                        <h4>What is this?</h4>
                        <p>
                            The data published on this site is converted from their respective source
                            formats
                            to <Link href="/docs/entities/">FollowTheMoney entity format</Link> by
                            OpenSanctions in order to enable <Link href="/docs/enrichment/">
                                data enrichment
                            </Link>. We are publishing the full datasets here
                            for third parties to use. Please <Link href="/contact/">contact us</Link> about
                            a special <Link href="/licensing/">license contract</Link> if you plan to
                            rely on the data for business uses.
                        </p>
                        <h4>How can I use the data?</h4>
                        <p>
                            <Link href="/docs/entities/">FollowTheMoney entities</Link> describe investigative
                            atoms like people, companies or their relationships. In order to use this data, it
                            can be queried as an API using the yente tool, or processed into Neo4J property
                            graph data and queried there for analytical purposes.
                        </p>
                    </Col>
                    <Col md={8}>
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
