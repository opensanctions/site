import Link from 'next/link';
import { InferGetStaticPropsType } from 'next'
import { Model } from "../lib/ftm/model"
import Table from 'react-bootstrap/Table';

import Layout from '../components/Layout'
import Content from '../components/Content'
import { getContentBySlug } from '../lib/content'
import { Summary } from '../components/util'
import { fetchIndex } from '../lib/data'
import { INDEX_URL } from '../lib/constants';


export default function Matcher({ content, matcher }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout.Content content={content}>
      <Content.Menu title={content.title} jsonLink={INDEX_URL}>
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
            {Object.entries(matcher).map(([name, feature]) => (
              <tr>
                <td><code><Link href={feature.url}>{name}</Link></code></td>
                <td className="numeric">{feature.coefficient.toFixed(3)}</td>
                <td>{feature.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content.Menu>
    </Layout.Content >
  )
}

export async function getStaticProps() {
  const index = await fetchIndex()
  return {
    props: {
      content: await getContentBySlug('matcher'),
      matcher: index.matcher,
    }
  }
}