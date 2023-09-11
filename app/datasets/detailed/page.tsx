import Link from 'next/link';

import Dataset from '../../../components/Dataset'
import { INDEX_URL, COLLECTIONS, REVALIDATE_BASE } from '../../../lib/constants';
import { getDatasets, getGraphDatasets } from '../../../lib/data'
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
  const graphDatasets = await getGraphDatasets();
  const datasets = allDatasets.filter((d) => !d.hidden);
  const allSources = datasets.filter((d) => !isCollection(d));
  return (
    <LayoutFrame activeSection="datasets">
      <StructuredData data={getDataCatalog()} />
      <Container>
        <h1>
          <a id="collections" />
          Detailed data source overview
          <JSONLink href={INDEX_URL} />
        </h1>
        <Dataset.Table datasets={allSources} frequency publisher />
        <h3>Know-your-business add-on datasets</h3>
        <Dataset.Table datasets={graphDatasets} frequency publisher />
      </Container>
    </LayoutFrame>
  )
}
