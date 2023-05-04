import Link from 'next/link';

import { Table } from '../../components/wrapped'
import Content from '../../components/Content'
import { getContentBySlug } from '../../lib/content'
import { Summary } from '../../components/util'
import { fetchIndex, getAlgorithms } from '../../lib/data'
import { INDEX_URL, REVALIDATE_BASE } from '../../lib/constants';
import { DocumentationMenu } from '../../components/Menu';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { getContentMetadata } from '../../lib/meta';

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata() {
  const content = await getContentBySlug('matcher');
  return getContentMetadata(content);
}

export default async function Page() {
  const index = await fetchIndex();
  const content = await getContentBySlug('matcher');
  const algorithms = await getAlgorithms()
  return (
    <LayoutFrame activeSection={content.section}>
      <Content.Menu title={content.title} jsonLink={INDEX_URL} path="/matcher" Menu={DocumentationMenu}>
        <Summary summary={content.summary} />
        <div>
          <Content.Body content={content} />
        </div>
        {algorithms.algorithms.map((algo) => (
          <section key={algo.name}>
            <h2><a id={algo.name}></a> {algo.name}</h2>
            {algo.description && <p>{algo.description}</p>}
            <Table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="numeric">Coefficient</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(algo.features).map(([name, feature]) => (
                  <tr>
                    <td><code><Link href={feature.url}>{name}</Link></code></td>
                    <td className="numeric">{feature.coefficient.toFixed(3)}</td>
                    <td>{feature.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        ))}
      </Content.Menu>
    </LayoutFrame>
  )
}
