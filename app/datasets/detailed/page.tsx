import Link from 'next/link';

import Dataset from '../../../components/Dataset'
import { INDEX_URL, COLLECTIONS, REVALIDATE_BASE } from '../../../lib/constants';
import { getDatasets } from '../../../lib/data'
import { ICollection, isCollection, isExternal, isSource } from '../../../lib/types';
import { JSONLink, Numeric, Spacer, UnofficialBadge } from '../../../components/util';
import { Table, Row, Col, Container, Badge } from '../../../components/wrapped';
import LayoutFrame from '../../../components/layout/LayoutFrame';
import { getDataCatalog } from '../../../lib/schema';
import StructuredData from '../../../components/utils/StructuredData';
import { getGenerateMetadata } from '../../../lib/meta';
import { FrequencyBadge } from '@/components/Metadata';

export const revalidate = REVALIDATE_BASE;


export async function generateMetadata() {
  return getGenerateMetadata({
    title: `Detailed dataset overview`
  })
}


export default async function Page() {
  const allDatasets = await getDatasets()
  const datasets = allDatasets.filter((d) => !d.hidden);
  const allSources = datasets.filter((d) => !isCollection(d));
  const datasetsSorted = allSources.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <LayoutFrame activeSection="datasets">
      <StructuredData data={getDataCatalog()} />
      <Container>
        <h1>
          <a id="collections" />
          Detailed data source overview
          <JSONLink href={INDEX_URL} />
        </h1>

        <Table size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Publisher</th>
              <th>Country</th>
              <th>Coverage</th>
              <th className="numeric">Entities</th>
            </tr>
          </thead>
          <tbody>
            {datasetsSorted.map(dataset =>
              <tr key={dataset.name}>
                <td>
                  <Link href={dataset.link}>{dataset.title}</Link>
                </td>
                <td>
                  {!!dataset.publisher && (
                    <>
                      {dataset.publisher.name}
                      {!dataset.publisher.official && (
                        <>
                          <UnofficialBadge />
                        </>
                      )}
                    </>
                  )}
                </td>
                <td>
                  {!!dataset.publisher && (
                    <Badge bg="light">{dataset.publisher.country_label}</Badge>
                  )}
                </td>
                <td>
                  {!!dataset.coverage && (
                    <FrequencyBadge coverage={dataset.coverage} />
                  )}
                </td>
                <td className="numeric">
                  <Numeric value={dataset.thing_count} />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </LayoutFrame>
  )
}
