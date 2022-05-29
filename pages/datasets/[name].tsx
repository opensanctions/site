import { GetStaticPropsContext } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import { Download, Search } from 'react-bootstrap-icons';

import Layout from '../../components/Layout'
import Dataset from '../../components/Dataset'
import { getDatasets, getDatasetByName, getDatasetIssues, getDatasetDetails } from '../../lib/data'
import { IDataset, IIssue, ICollection, ISource, isCollection, isSource, IDatasetDetails, isExternal } from '../../lib/types'
import { Summary, FileSize, NumericBadge, JSONLink, HelpLink, Markdown, Spacer } from '../../components/util'
import DatasetMetadataTable from '../../components/DatasetMetadataTable'
import { getSchemaDataset } from '../../lib/schema';

import styles from '../../styles/Dataset.module.scss'
import { LicenseInfo } from '../../components/Policy';
import { API_URL } from '../../lib/constants';


type DatasetScreenProps = {
  dataset: IDataset
  details: IDatasetDetails
  issues: Array<IIssue>
  sources?: Array<ISource>
  collections?: Array<ICollection>
}

export default function DatasetScreen({ dataset, details, issues, sources, collections }: DatasetScreenProps) {
  const router = useRouter();
  const structured = getSchemaDataset(dataset, details);
  return (
    <Layout.Base title={dataset.title} description={dataset.summary} structured={structured} navSearch={false}>
      <Container className={styles.datasetPage}>
        <JSONLink href={dataset.index_url} />
        <h1>
          <Dataset.Icon dataset={dataset} size="30px" /> {dataset.title}
        </h1>
        <Row>
          <Col md={9}>
            <Summary summary={dataset.summary} />
          </Col>
          <Col md={3}>
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <Markdown markdown={details.description} />
            <section>
              <h3>
                <a id="overview"></a>
                Data overview
              </h3>
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
                <Table className="vertical-center" size="sm">
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
                            variant="secondary"
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

            <section>
              <h3>
                <a id="api"></a>
                Using the API
              </h3>
              <p>
                You can query the data in this dataset via the application programming
                interface (API) endpoints below. Please <Link href="/docs/api/">read
                  the introduction</Link> for documentation and terms of service.

                See also: <Link href={`${API_URL}/openapi.json`}>OpenAPI Specification</Link> (JSON)
              </p>
              <Table className="vertical-center">
                <tbody>
                  <tr>
                    <td width="40%">
                      Use the <Link href={`${API_URL}/#tag/Reconciliation`}>Reconciliation API</Link> in <Link href="https://openrefine.org/">OpenRefine</Link>:
                    </td>
                    <td width="60%">
                      <Form.Control readOnly value={`${API_URL}/reconcile/${dataset.name}`} />
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      For <Link href={`${API_URL}/#operation/search_search__dataset__get`}>full-text search</Link>, use the <code>/search</code> endpoint:
                    </td>
                    <td width="60%">
                      <Form.Control readOnly value={`${API_URL}/search/${dataset.name}?q=John+Doe`} />
                    </td>
                  </tr>
                  <tr>
                    <td width="40%">
                      For <Link href={`${API_URL}/#operation/match_match__dataset__post`}>entity matching</Link>, use the <code>/match</code> endpoint:
                    </td>
                    <td width="60%">
                      <Form.Control readOnly value={`${API_URL}/match/${dataset.name}`} />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </section>

            {isCollection(dataset) && !!sources?.length && (
              <section>
                <h3>
                  <a id="sources"></a>
                  Data sources
                  <NumericBadge value={sources.length} />
                </h3>
                <p>
                  {dataset.title} is a <Link href="/docs/faq/#collections">collection dataset</Link> which
                  bundles together entities from the following data sources:
                </p>
                <Dataset.SourcesTable sources={sources} />
              </section>
            )}
          </Col>
          <Col sm={3}>
            <div className="position-sticky">
              <Nav navbarScroll className="flex-column">
                <Nav.Link href="#overview">Overview</Nav.Link>
                <Nav.Link href="#download">Download</Nav.Link>
                <Nav.Link href="#api">API</Nav.Link>
                {!!sources?.length && (
                  <Nav.Link href="#sources">Data sources</Nav.Link>
                )}
              </Nav>
              <LicenseInfo />
            </div>
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
  const issues = await getDatasetIssues(dataset)
  const props: DatasetScreenProps = { dataset, issues, details }
  if (isCollection(dataset)) {
    const sources = await Promise.all(dataset.sources.map((name) => getDatasetByName(name)))
    const visibleSources = sources.filter((s) => s !== undefined && !s.hidden)
    props.sources = visibleSources as Array<ISource>
  }
  if (isSource(dataset) || isExternal(dataset)) {
    const collections = await Promise.all(dataset.collections.map((name) => getDatasetByName(name)))
    const visibleCollections = collections.filter((c) => isCollection(c) && !c.hidden)
    props.collections = visibleCollections as Array<ICollection>
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
