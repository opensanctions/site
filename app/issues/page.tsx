
import Content from '../../components/Content';
import { IssuesList } from '../../components/Issue';
import { Summary } from '../../components/util';
import { ISSUES_URL } from '../../lib/constants';
import { getIssues } from '../../lib/data';
import { DocumentationMenu } from '../../components/Menu';
import { TITLE } from './common';
import LayoutFrame from '../../components/layout/LayoutFrame';



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
