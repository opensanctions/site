
import Content from '../../components/Content';
import { IssuesList } from '../../components/Issue';
import { Summary } from '../../components/util';
import { ISSUES_URL, REVALIDATE_BASE } from '../../lib/constants';
import { getIssues } from '../../lib/data';
import { DocumentationMenu } from '../../components/Menu';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getGenerateMetadata } from '../../lib/meta';

export const revalidate = 1800;
const TITLE = "Warnings and errors from all datasets";

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE
  })
}

export default async function Page() {
  const issues = await getIssues();
  return (
    <LayoutFrame activeSection="datasets">
      <Content.Menu title={TITLE} jsonLink={ISSUES_URL} Menu={DocumentationMenu} path="/issues">
        <Summary summary="Below is an overview of all parsing and processing issues that appeared while importing the data." />
        <IssuesList issues={issues} showDataset={true} />
      </Content.Menu>
    </LayoutFrame>
  )
}
