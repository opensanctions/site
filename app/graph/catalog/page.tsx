
import Link from 'next/link';

import { Container, Row, Col, Button, Card, CardBody, CardTitle, CardText, CardFooter, CardGroup, CardHeader, Table } from '../../../components/wrapped'
import { FormattedDate, JSONLink, Spacer, Summary } from '../../../components/util';
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
                    <tr>
                        <th className={styles.datasetCardTableHeader}>
                            Updated at:
                        </th>
                        <td>
                            <FormattedDate date={dataset.updated_at} />
                        </td>
                    </tr>
                    <tr>
                        <th className={styles.datasetCardTableHeader}>
                            Downloads:
                        </th>
                        <td>
                            <ul className={styles.resourceList}>
                                {dataset.resources.map((resource) =>
                                    <li key={resource.name}>
                                        <a href={resource.url} download>
                                            {resource.name}
                                        </a>
                                        {': '}
                                        {resource.mime_type_label}
                                    </li>
                                )}
                            </ul>
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
                    {catalog.datasets.map((dataset) =>
                        <Col sm={6} key={dataset.name}>
                            <GraphDatasetCard dataset={dataset} />
                        </Col>
                    )}
                </Row>
            </Container >
        </LayoutFrame >
    )
}
