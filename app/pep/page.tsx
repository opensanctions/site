import Link from 'next/link'
import styles from '../../styles/Home.module.scss'
import { Col, Row, Container, Badge, Button, ButtonGroup, Table } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { SourcesTableProps } from '../../components/Dataset';
import { FormattedDate, Numeric, UnofficialBadge, Spacer } from '../../components/util';
import { getDatasets, getDatasetByName } from '../../lib/data';
import { isCollection, isSource } from '../../lib/types'
import DatasetCountryListing from '../../components/DatasetCountryListing';


function SourcesTable({ sources }: SourcesTableProps) {
  const sourcesSorted = sources.sort((a, b) => b.target_count - a.target_count)
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Last changed</th>
          <th>Publisher locality</th>
          <th className="numeric">Targets</th>
        </tr>
      </thead>
      <tbody>
        {sourcesSorted.map(source =>
          <tr key={source.name}>
            <td>
              <Link href={source.link}>{source.title}</Link>
              {!source.publisher.official && (
                <>
                  <Spacer />
                  <UnofficialBadge />
                </>
              )}
            </td>
            <td><FormattedDate date={source.last_change} /></td>
            <td>
              <Badge bg="light">{source.publisher.country_label}</Badge>
            </td>
            <td className="numeric">
              <Numeric value={source.target_count} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default async function Page() {
  const dataset = await getDatasetByName("peps");
  if (dataset === undefined) {
    throw "PEP dataset not found on PEP page";
  }
  const datasets = await getDatasets();
  const visibleDatasets = datasets.filter((ds) => !ds.hidden);

  const sources = !isCollection(dataset) ? [] :
    dataset.sources
      .map((name) => visibleDatasets.find((d) => d.name == name))
      .filter((s) => s !== undefined)
      .filter(isSource)
  return (
    <LayoutFrame>
      <div className={styles.claimBanner}>
        <Container>
          <Row>

            <h1 className={styles.claim}>
              Find Politically Exposed Persons (PEPs) worldwide
            </h1>
            <p className={styles.subClaim}>
              We consolidate information about public office holders from most countries in the world into an easy-to-use dataset.
            </p>
            <p><a href="#get-the-data"><Button variant="light">Get the data</Button></a></p>

          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={4} className={styles.explainer}>
            <h2>Data Source Compiling</h2>
            The OpenSanctions PEPs dataset packages publicly available PEP data
            from various sources in a consistent structured format. <a href="#sources">Read
              more about our data PEP sources</a> and how
            they are maintained.
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Cross-referenced and merged</h2>
            Over time our PEP data is <Link href={"/docs/enrichment/"}>enriched</Link> from various sources. Entities are
            cross-referenced and where possible, multiple references to the same
            real world entity are <Link href={"/docs/identifiers/"}>merged to a single identifier</Link>.
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>PEPs data as a commodity</h2>
            Our ultimate objective is not to build another proprietary PEPs database,
            but to expand the coverage of political persons in Wikidata such that it
            becomes a de-facto global commodity.
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Row>
              <section>
                <h2>Who are Politically Exposed Persons? Who needs this?</h2>
                <p>Politically exposed persons (PEP) is a term from the banking
                  industry to describe individuals who have been entrusted with a
                  prominent public function. This might include members of cabinets,
                  parliaments, senior public servants or people that run state-owned
                  companies.</p>
                <p>Being classified as a PEP in no way implies you have done anything
                  wrong. However, the concept is important because PEPs and members of
                  their families should be the subject of enhanced public scrutiny.
                  This is also mandated by financial crime laws in many countries.</p>
                <p>The reason someone is included in the dataset is indicated in the data
                  via the <a href="https://www.opensanctions.org/reference/#type.topic">topic</a> property:</p>

                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Topic</th>
                      <th className="w-75">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>role.pep</code></td>
                      <td>Politically-exposed persons</td>
                    </tr>
                    <tr>
                      <td><code>role.rca</code></td>
                      <td>Relatives and close associates</td>
                    </tr>
                    <tr>
                      <td><code>poi</code></td>
                      <td>Persons who do not meet the general requirements for being considered PEPs but are maintained
                        on lists for closer scrutiny by investigative organisations</td>
                    </tr>
                    <tr>
                      <td><code>sanctioned</code></td>
                      <td>Officially sanctioned entities</td>
                    </tr>
                  </tbody>
                </Table>
              </section>
            </Row>
            <Row>
              <section>
                <h2 id="sources">Data sources</h2>

                <p>OpenSanctions does not monitor political events and capture changes
                  in roles manually based on election results or appointment press
                  releases. Instead we automatically monitor and import updates from
                  a set of public datasets of Politically Exposed Persons with various
                  degrees of geographic influence coverage.</p>

                <p>We then <Link href={"/docs/enrichment/"}>enrich</Link> the PEP data with
                  further information about their potential influence such as companies
                  they control based on matches to company data in official and
                  investigative sources.</p>

                <SourcesTable sources={sources} />

                <p>Official sources are generally government departments and inter-governmental
                  agencies. Non-official sources are generally community, civil-society
                  or journalistic organisations.</p>

                <p><a href="https://www.opensanctions.org/datasets/wd_peps/">Wikidata Politically Exposed Persons</a> data
                  is maintained by volunteers in a similar manner to the rest of the Wikimedia Foundation projects.
                  OpenSanctions monitors specific positions in national and sub-national legislatures, executives and senior
                  administrators for changes. Note, however, that as a volunteer-run organization, there is no guarantee of
                  how up-to-date the information is. <a href="https://www.opensanctions.org/datasets/wd_peps/">Read more...</a></p>

                <p>The <a href="https://www.opensanctions.org/datasets/everypolitician/">EveryPolitician</a> project
                  by mySociety contains a significant foundation of data for national
                  and sub-national legislatures. It was shut down, however, in June
                  of 2019 and is quickly becoming more outdated. We aim to remove or
                  replace this dataset in time. <a href="https://www.opensanctions.org/datasets/everypolitician/">Read more...</a></p>

                <p>The <Link href={"/datasets/ru_rupep/"}>RUPEP dataset</Link> is a
                  database of politically exposed persons and their connections in
                  Russia and Belarus, and beyond, maintained by qualified researchers.</p>
              </section>
            </Row>
            <Row>
              <section>
                <h2 id="quality">How do we measure the quality of this PEP data?</h2>
                <p>Currently we only monitor</p>
                <ul>
                  <li>when our source datasets last changed, and</li>
                  <li>how many entities have been extracted from each source.</li>
                </ul>
                <p>In the near future we would like to generate and publish indicators such as</p>
                <ul>
                  <li>How many out of the total posts in a jurisdiction are included.</li>
                  <li>Which posts are included, and which are not.</li>
                  <li>Which kinds of posts are covered, in which countries.</li>
                  <li>The <a href="https://github.com/opensanctions/opensanctions/issues/267#issuecomment-1460735867">risk level</a> of persons based on FATF guidelines for their post </li>
                </ul>
                <p>In the longer term, we would like to establish quality metrics, e.g. identifying what proportion of
                  positions are out of date via random spot-checks.</p>
                <p><Link href="/contact/">Tell us</Link> what you would like to see.</p>
              </section>
            </Row>
          </Col>

          <Col md={4}>
            <h2>Which countries are in the dataset?</h2>
            <DatasetCountryListing countries={dataset.things.countries} datasetName={dataset.name} defaultExpanded={true} defaultLimit={20} />
          </Col>
        </Row>
      </Container>

      <div className={styles.commercialBanner} id="get-the-data">
        <Container>
          <h2>Use OpenSanctions to manage business risk</h2>
          <Row>
            <Col md={8}>
              <p>The PEP dataset is available for commercial licensing as part of the OpenSanctions Default dataset bulk data license and SaaS API.</p>
              <p>
                OpenSanctions is <strong>free for non-commercial users.</strong> Business
                and commercial users must either acquire a data license to use the
                dataset, or they can subscribe to our pay-as-you-go API service.
              </p>
            </Col>
            <Col md={4} className="d-print-none">
              <ButtonGroup>
                <Button size="lg" href="/api/" variant="secondary">Use the API</Button>
                <Button size="lg" href="/licensing/" variant="light">License bulk data</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
    </LayoutFrame>
  )
}