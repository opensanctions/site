import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Download, Search } from 'react-bootstrap-icons';

import { Row, Col, Nav, NavLink, Form, FormControl, Alert, AlertHeading, Badge, Table, Button, InputGroup, Container } from '../../../components/wrapped'
import Dataset from '../../../components/Dataset'
import { getDatasets, getDatasetByName, filterMatchingNames, getDatasetIssues, getRecentEntities, getGraphCatalog } from '../../../lib/data'
import { isCollection, isSource, isExternal } from '../../../lib/types'
import { Summary, FileSize, NumericBadge, JSONLink, HelpLink, Markdown, Spacer, FormattedDate, SpacedList, Sticky } from '../../../components/util'
import DatasetMetadataTable from '../../../components/DatasetMetadataTable'
import { LicenseInfo } from '../../../components/Policy';
import { API_URL, REVALIDATE_BASE } from '../../../lib/constants';

import styles from '../../../styles/Dataset.module.scss'
import LayoutFrame from '../../../components/layout/LayoutFrame';
import { markdownToHtml } from '../../../lib/util';
import { getGenerateMetadata } from '../../../lib/meta';
import StructuredData from '../../../components/utils/StructuredData';
import { getSchemaDataset } from '../../../lib/schema';

interface DatasetPageProps {
  params: { name: string }
}

export const revalidate = REVALIDATE_BASE;


export async function generateMetadata({ params }: DatasetPageProps) {
  const dataset = await getDatasetByName(params.name);
  if (dataset === undefined) {
    return getGenerateMetadata({
      title: `Dataset not found`
    })
  }
  return getGenerateMetadata({
    title: dataset.title,
    description: dataset.summary,
    noIndex: dataset.hidden
  })
}


export default async function Page({ params }: DatasetPageProps) {
  const dataset = await getDatasetByName(params.name);
  if (dataset === undefined) {
    notFound()
  }
  const datasets = await getDatasets();
  const graphCatalog = await getGraphCatalog();
  const inGraphCatalog = undefined !== graphCatalog.datasets.find((gd) => gd.name === dataset.name);
  const visibleDatasets = datasets.filter((ds) => !ds.hidden);
  const issues = await getDatasetIssues(dataset)
  const sources = !isCollection(dataset) ? [] :
    filterMatchingNames(visibleDatasets, dataset.sources)
      .filter(isSource);
  const externals = !isCollection(dataset) ? [] :
    filterMatchingNames(visibleDatasets, dataset.externals)
      .filter(isExternal)
  const collections = !(isSource(dataset) || isExternal(dataset)) ? [] :
    filterMatchingNames(visibleDatasets, dataset.collections)
      .filter(isCollection)
  const recents = !isSource(dataset) ? [] :
    await getRecentEntities(dataset);
  const markdown = markdownToHtml(dataset.description || '')

  return (
    <LayoutFrame>
      <StructuredData data={getSchemaDataset(dataset)} />
      <Container className={styles.datasetPage}>
        <JSONLink href={dataset.index_url} />
        <h1>
          <Dataset.Icon dataset={dataset} size="30px" /> {dataset.title}
        </h1>
        <Row>
          <Col md={9}>
            <Summary summary={dataset.summary} />
            <Markdown markdown={markdown} />
            <section>
              <h3>
                <a id="overview"></a>
                Data overview
              </h3>
              {!isExternal(dataset) && (
                <Form className="d-flex d-print-none" action="/search/">
                  <input type="hidden" name="scope" value={dataset.name} />
                  <InputGroup className={styles.searchBox} size="lg">
                    <FormControl
                      type="search"
                      name="q"
                      autoFocus={true}
                      placeholder={`Search in ${dataset.title}...`}
                      aria-label="Search"
                    />
                    <Button variant="secondary" type="submit">
                      <Search className="bsIcon" />{' '}
                      Search
                    </Button>
                  </InputGroup>
                </Form>
              )}
              <DatasetMetadataTable dataset={dataset} collections={collections} issues={issues} />
            </section>

            {isExternal(dataset) && inGraphCatalog && (
              <section>
                <h3>
                  <a id="download"></a>
                  Bulk download
                </h3>
                <p>
                  You can download bulk data for <strong>{dataset.title}</strong> from
                  the <Link href={`/kyb/#dataset.${dataset.name}`}>OpenSanctions KYB</Link> page.
                </p>
              </section>
            )}

            {dataset.resources.length > 0 && (
              <section>
                <h3>
                  <a id="download"></a>
                  Bulk download
                </h3>
                <p>
                  Downloads contain the full set of entities contained in this dataset. You can fetch
                  a simplified tabular form, or detailed, structured data in JSON format. Updated files
                  will be provided once a day at the same location.
                </p>
                <Table className={styles.downloadTable} size="sm">
                  <thead>
                    <tr>
                      <th className="numeric narrow"></th>
                      <th>File name</th>
                      <th>Export type</th>
                      <th className="numeric">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataset.resources.map((resource) =>
                      <tr key={resource.path}>
                        <td className="numeric narrow">
                          <a className="btn btn-dark btn-sm" rel="nofollow" download href={resource.url}>
                            <Download className="bsIcon" />
                          </a>
                        </td>
                        <td>
                          <a href={resource.url} rel="nofollow" download>
                            <code>{resource.path}</code>
                          </a>
                        </td>
                        <td>{resource.title}</td>
                        <td className="numeric">
                          <FileSize size={resource.size} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <p>
                  Help: <Link href="/docs/bulk/">Using the data</Link>
                  <Spacer />
                  <Link href="/reference/">format reference</Link>
                  <Spacer />
                  <Link href="/docs/identifiers/">identifier use</Link>
                  <Spacer />
                  <Link href="/licensing/">commercial licensing</Link>
                </p>
              </section>
            )}

            {!isExternal(dataset) && (
              <section>
                <h3>
                  <a id="api"></a>
                  Using the API
                </h3>
                <p>
                  You can query the data in this dataset via the application programming
                  interface (API) endpoints below. Please <Link href="/api/">read
                    the introduction</Link> for documentation and terms of service.
                </p>
                <Table className={styles.apiTable}>
                  <tbody>
                    <tr>
                      <td width="40%">
                        Use the <a href={`${API_URL}/#tag/Reconciliation`}>Reconciliation API</a> in <Link href="https://openrefine.org/">OpenRefine</Link>:
                      </td>
                      <td width="60%">
                        <FormControl readOnly value={`${API_URL}/reconcile/${dataset.name}?api_key=YOUR_API_KEY`} />
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        For <a href={`${API_URL}/#operation/search_search__dataset__get`}>full-text search</a>, use the <code>/search</code> endpoint:
                      </td>
                      <td width="60%">
                        <FormControl readOnly value={`${API_URL}/search/${dataset.name}?q=John+Doe&api_key=YOUR_API_KEY`} />
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        For <a href={`${API_URL}/#operation/match_match__dataset__post`}>entity matching</a>, use the <code>/match</code> endpoint:
                      </td>
                      <td width="60%">
                        <FormControl readOnly value={`${API_URL}/match/${dataset.name}?api_key=YOUR_API_KEY`} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </section>
            )}

            {isExternal(dataset) && (
              <Alert variant="secondary">
                <AlertHeading>About external databases</AlertHeading>
                <p>
                  {dataset.title} is an external database that is used
                  to <Link href="/docs/enrichment/">enrich the data</Link> in
                  OpenSanctions with additional details and connections.
                </p>
                <p>
                  This means that we have only included entities where there
                  is a connection (e.g. to a sanctions target or a politician)
                  and we are not reproducing the database in full.
                </p>
                <p>
                  Data from {dataset.title} is included in the collections
                  listed above. However, since the enrichment data only makes
                  sense in conjunction with the entities it relates to, we
                  are not offering it for bulk download separately.
                </p>
              </Alert>
            )}

            {isCollection(dataset) && !!sources?.length && (
              <section>
                <h3>
                  <a id="sources"></a>
                  Data sources
                  <NumericBadge value={sources.length} />
                </h3>
                <p>
                  {dataset.title} is a <a href="/docs/faq/#collections">collection dataset</a> which
                  bundles together entities from the following data sources:
                </p>
                <Dataset.SourcesTable sources={sources} />
              </section>
            )}

            {isCollection(dataset) && !!externals?.length && (
              <section>
                <h3>
                  <a id="externals"></a>
                  External databases
                  <NumericBadge value={externals.length} />
                </h3>
                <p>
                  {dataset.title} also includes <Link href="/docs/enrichment/">selected
                    details and connections</Link> from the following
                  external databases:
                </p>
                <Dataset.ExternalsTable externals={externals} />
              </section>
            )}

            {!!recents?.length && (
              <section>
                <h3>
                  <a id="recents"></a>
                  Recent additions
                </h3>
                <p>
                  The following targeted entities have been added to this data source most recently:
                </p>
                <Table>
                  <thead>
                    <tr>
                      <th>Added</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Countries</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recents.map((r) =>
                      <tr key={r.id}>
                        <td>
                          <FormattedDate date={r.first_seen} />
                        </td>
                        <td>
                          <strong>
                            <Link href={`/entities/${r.id}`}>{r.caption}</Link>
                          </strong>
                        </td>
                        <td>
                          <Badge bg="light">{r.schema}</Badge>
                        </td>
                        <td>
                          <SpacedList values={r.countries} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </section>
            )}
          </Col>
          <Col sm={3}>
            <Sticky>
              <Nav className="flex-column d-print-none">
                {!isExternal(dataset) && (
                  <>
                    <NavLink href="#overview">Overview</NavLink>
                    <NavLink href="#download">Download</NavLink>
                    <NavLink href="#api">API</NavLink>
                  </>
                )}
                {!!sources?.length && (
                  <NavLink href="#sources">Data sources</NavLink>
                )}
                {!!externals?.length && (
                  <NavLink href="#externals">External databases</NavLink>
                )}
                {!!recents?.length && (
                  <NavLink href="#recents">Recent additions</NavLink>
                )}
              </Nav>
              <LicenseInfo />
            </Sticky>
          </Col>
        </Row>
      </Container>
    </LayoutFrame >
  )
}

export async function generateStaticParams() {
  const datasets = await getDatasets()
  return datasets.map((d) => ({ name: d.name }))
}
