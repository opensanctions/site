import { PageProps } from '../../../components/utils/PageProps';
import { fetchIndex, getDatasets } from '../../../lib/data';
import LayoutFrame from '../../../components/layout/LayoutFrame';
import Matcher from '../../../components/Matcher';
import { isExternal } from '../../../lib/types';


export const revalidate = 0;

export default async function AdvancedSearch({ searchParams }: PageProps) {
  const index = await fetchIndex();
  const allDatasets = await getDatasets()
  const datasets = allDatasets
    .filter((d) => !d.hidden && !isExternal(d))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((d) => ({ name: d.name, title: d.title }));

  return (
    <LayoutFrame activeSection="research">
      <Matcher datasets={datasets} modelData={index.model} schemata={index.schemata} />
    </LayoutFrame>
  );
}