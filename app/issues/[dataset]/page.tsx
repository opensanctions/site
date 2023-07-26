import { notFound } from 'next/navigation';

import Content from '../../../components/Content';
import { IssuesList } from '../../../components/Issue';
import { Summary } from '../../../components/util';
import { REVALIDATE_BASE } from '../../../lib/constants';
import { getDatasetIssues, getDatasets, getDatasetByName } from '../../../lib/data';
import { DocumentationMenu } from '../../../components/Menu';
import LayoutFrame from '../../../components/layout/LayoutFrame';
import { getGenerateMetadata } from '../../../lib/meta';
import Link from 'next/link';


interface IssuesPageProps {
  params: { dataset: string }
}

export const revalidate = REVALIDATE_BASE;
export const dynamic = 'force-static';

const TITLE = "Warnings and errors from all datasets";

export async function generateMetadata({ params }: IssuesPageProps) {
  const dataset = await getDatasetByName(params.dataset);
  if (dataset === undefined) {
    return getGenerateMetadata({
      title: `Dataset not found`
    })
  }
  return getGenerateMetadata({
    title: `Warnings and errors: ${dataset.name}`
  })
}

export async function generateStaticParams() {
  const datasets = await getDatasets()
  return datasets.map((d) => ({ dataset: d.name }))
}

export default async function Page({ params }: IssuesPageProps) {
  const dataset = await getDatasetByName(params.dataset);
  if (dataset === undefined) {
    notFound()
  }
  const title = `Warnings and errors: ${dataset.name}`;
  const issues = await getDatasetIssues(dataset)
  return (
    <LayoutFrame activeSection="datasets">
      <Content.Menu title={title} jsonLink={dataset.issues_url} Menu={DocumentationMenu} path="/issues">
        <Summary summary="Below is an overview of all parsing and processing issues that appeared while importing the data." />
        <p>
          Go back to the <Link href="/issues/">global issues overview</Link> or
          view the <Link href={`/datasets/${dataset.name}`}>dataset page</Link>.
        </p>
        <IssuesList issues={issues} showDataset={false} />
      </Content.Menu>
    </LayoutFrame>
  )
}
