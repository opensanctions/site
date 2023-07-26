
import Content from '../../components/Content';
import { Summary } from '../../components/util';
import { ISSUES_URL, REVALIDATE_BASE } from '../../lib/constants';
import { getDatasets } from '../../lib/data';
import { DocumentationMenu } from '../../components/Menu';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getGenerateMetadata } from '../../lib/meta';
import { isCollection } from '../../lib/types';
import { Table } from '../../components/wrapped'
import Link from 'next/link';

export const revalidate = REVALIDATE_BASE;

const TITLE = "Warnings and errors from all datasets";

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE
  })
}

export default async function Page() {
  const datasets = await getDatasets();
  const withIssues = datasets.filter((d) => (!isCollection(d) && d.issue_count > 0));
  return (
    <LayoutFrame activeSection="datasets">
      <Content.Menu title={TITLE} jsonLink={ISSUES_URL} Menu={DocumentationMenu} path="/issues">
        <Summary summary="Below is an overview of all parsing and processing issues that appeared while importing the data." />
        <Table>
          <thead>
            <tr>
              <th>Dataset</th>
              <th className='numeric'>Warnings</th>
              <th className='numeric'>Errors</th>
            </tr>
          </thead>
          <tbody>
            {withIssues.map((dataset) =>
              <tr key={dataset.name}>
                <td><Link href={`/issues/${dataset.name}`}>{dataset.title}</Link></td>
                <td className='numeric'>
                  {dataset.issue_levels.warning > 0 && (
                    <>{dataset.issue_levels.warning}</>
                  )}
                </td>
                <td className='numeric'>
                  {dataset.issue_levels.error > 0 && (
                    <>{dataset.issue_levels.error}</>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Content.Menu>
    </LayoutFrame>
  )
}
