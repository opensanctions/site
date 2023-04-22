import Link from 'next/link';

import { Table } from '../../components/wrapped'
import Content from '../../components/Content'
import { getContentBySlug } from '../../lib/content'
import { Summary } from '../../components/util'
import { fetchIndex } from '../../lib/data'
import { INDEX_URL } from '../../lib/constants';
import { DocumentationMenu } from '../../components/Menu';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getContentMetadata } from '../../lib/meta';


export async function generateMetadata() {
  const content = await getContentBySlug('matcher');
  return getContentMetadata(content);
}

export default async function Page() {
  const index = await fetchIndex();
  const content = await getContentBySlug('matcher');
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Menu title={content.title} jsonLink={INDEX_URL} path="/matcher" Menu={DocumentationMenu}>
        <Summary summary={content.summary} />
        <div>
          <Content.Body content={content} />
        </div>
        <h2><a id="features"></a>Matching features</h2>
        <Table>
          <thead>
            <tr>
              <th>Feature</th>
              <th className="numeric">Coefficient</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(index.matcher).map(([name, feature]) => (
              <tr>
                <td><code><Link href={feature.url}>{name}</Link></code></td>
                <td className="numeric">{feature.coefficient.toFixed(3)}</td>
                <td>{feature.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content.Menu>
    </LayoutFrame>
  )
}
