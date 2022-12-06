import { GetStaticPropsContext } from 'next'
import Link from 'next/link';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import { Download, Search } from 'react-bootstrap-icons';

import Layout from '../../components/Layout'
import Dataset from '../../components/Dataset'
import { getDatasets, getDatasetByName, getDatasetIssues, getDatasetDetails, getRecentEntities } from '../../lib/data'
import { IDataset, IIssue, ICollection, ISource, isCollection, isSource, IDatasetDetails, isExternal, IExternal, IRecentEntity } from '../../lib/types'
import { Summary, FileSize, NumericBadge, JSONLink, HelpLink, Markdown, Spacer, FormattedDate, SpacedList, Sticky } from '../../components/util'
import DatasetMetadataTable from '../../components/DatasetMetadataTable'
import { getSchemaDataset } from '../../lib/schema';

import styles from '../../styles/Dataset.module.scss'
import { LicenseInfo } from '../../components/Policy';
import { API_URL } from '../../lib/constants';


type DatasetScreenProps = {
  apiUrl: string
  dataset: IDataset
  details: IDatasetDetails
  issues: Array<IIssue>
  sources?: Array<ISource>
  externals?: Array<IExternal>
  collections?: Array<ICollection>
  recents?: Array<IRecentEntity>
}

export default function DatasetScreen({ apiUrl, dataset, details, issues, sources, externals, collections, recents }: DatasetScreenProps) {
  const structured = getSchemaDataset(dataset, details);
  return (
    <Layout.Base title={dataset.title} description={dataset.summary} structured={structured}>
      <Container className={styles.datasetPage}>
        <JSONLink href={dataset.index_url} />
        <h1>
          <Dataset.Icon dataset={dataset} size="30px" /> {dataset.title}
        </h1>
        <Row>
          <Col md={9}>
            <Summary summary={dataset.summary} />
            <Markdown markdown={details.description} />
            <section>
              <h3>
                <a id="overview"></a>
                Data overview
              </h3>
              {!isExternal(dataset) && (
                <Form className="d-flex" action="/search/">
                  <input type="hidden" name="scope" value={dataset.name} />
                  <InputGroup className={styles.searchBox} size="lg">
                    <Form.Control
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
              <DatasetMetadataTable dataset={dataset} details={details} collections={collections} issues={issues} />
            </section>

            {details.resources.length > 0 && (
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
                    {details.resources.map((resource) =>
                      <tr key={resource.path}>
                        <td className="numeric narrow">
                          <Button
                            size="sm"
                            variant="dark"
                            rel="nofollow"
                            // @ts-expect-error
                            download={true}
                            href={resource.url}
                          >
                            <Download className="bsIcon" />
                          </Button>
                        </td>
                        <td><a href={resource.url} download><code>{resource.path}</code></a></td>
                        <td>{resource.title}<HelpLink href={`/docs/usage/#${resource.path}`} /></td>
                        {/* <td>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip>{resource.mime_type_label}</Tooltip>}>
                          <code>{resource.mime_type}</code>
                        </OverlayTrigger>
                      </td> */}
                        <td className="numeric">
                          <FileSize size={resource.size} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <p>
                  Help: <Link href="/docs/usage">Using the data</Link>
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
                  interface (API) endpoints below. Please <Link href="/docs/api/">read
                    the introduction</Link> for documentation and terms of service.
                </p>
                <Table className={styles.apiTable}>
                  <tbody>
                    <tr>
                      <td width="40%">
                        Use the <a href={`${apiUrl}/#tag/Reconciliation`}>Reconciliation API</a> in <Link href="https://openrefine.org/">OpenRefine</Link>:
                      </td>
                      <td width="60%">
                        <Form.Control readOnly value={`${apiUrl}/reconcile/${dataset.name}?api_key=YOUR_API_KEY`} />
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        For <a href={`${apiUrl}/#operation/search_search__dataset__get`}>full-text search</a>, use the <code>/search</code> endpoint:
                      </td>
                      <td width="60%">
                        <Form.Control readOnly value={`${apiUrl}/search/${dataset.name}?q=John+Doe&?api_key=YOUR_API_KEY`} />
                      </td>
                    </tr>
                    <tr>
                      <td width="40%">
                        For <a href={`${apiUrl}/#operation/match_match__dataset__post`}>entity matching</a>, use the <code>/match</code> endpoint:
                      </td>
                      <td width="60%">
                        <Form.Control readOnly value={`${apiUrl}/match/${dataset.name}?api_key=YOUR_API_KEY`} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </section>
            )}

            {isExternal(dataset) && (
              <Alert variant="secondary">
                <Alert.Heading>About external databases</Alert.Heading>
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
              <Nav className="flex-column">
                {!isExternal(dataset) && (
                  <>
                    <Nav.Link href="#overview">Overview</Nav.Link>
                    <Nav.Link href="#download">Download</Nav.Link>
                    <Nav.Link href="#api">API</Nav.Link>
                  </>
                )}
                {!!sources?.length && (
                  <Nav.Link href="#sources">Data sources</Nav.Link>
                )}
                {!!externals?.length && (
                  <Nav.Link href="#externals">External databases</Nav.Link>
                )}
                {!!recents?.length && (
                  <Nav.Link href="#recents">Recent additions</Nav.Link>
                )}
              </Nav>
              <LicenseInfo />
            </Sticky>
          </Col>
        </Row>
      </Container>
    </Layout.Base >
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const params = context.params!
  const dataset = await getDatasetByName(params.name as string)
  const details = await getDatasetDetails(params.name as string)
  if (dataset === undefined || details === undefined) {
    return { redirect: { destination: '/', permanent: false } };
  }
  const datasets = await getDatasets()
  const visibleDatasets = datasets.filter((ds) => !ds.hidden);
  const issues = await getDatasetIssues(dataset)
  const props: DatasetScreenProps = { apiUrl: API_URL, dataset, issues, details }
  if (isCollection(dataset)) {
    props.sources = dataset.sources
      .map((name) => visibleDatasets.find((d) => d.name == name))
      .filter((s) => s !== undefined)
      .filter(isSource)
    props.externals = dataset.externals
      .map((name) => visibleDatasets.find((d) => d.name == name))
      .filter((s) => s !== undefined)
      .filter(isExternal)
  }
  if (isSource(dataset) || isExternal(dataset)) {
    props.collections = dataset.collections
      .map((name) => visibleDatasets.find((d) => d.name == name))
      .filter((s) => s !== undefined)
      .filter(isCollection)
  }
  if (isSource(dataset)) {
    props.recents = await getRecentEntities(dataset)
  }
  return { props }
}

export async function getStaticPaths() {
  const datasets = await getDatasets()
  const paths = datasets.map((dataset) => {
    return { params: { name: dataset.name } }
  })
  return {
    paths,
    fallback: false
  }
}
