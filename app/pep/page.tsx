import Link from 'next/link'
import styles from '../../styles/Home.module.scss'
import { Col, Row, Container, Badge, Button, ButtonGroup, Table } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { SourcesTableProps } from '../../components/Dataset';
import { FormattedDate, Numeric, UnofficialBadge, Spacer } from '../../components/util';
import { getDatasets, getDatasetByName } from '../../lib/data';
import { isCollection, isSource } from '../../lib/types'


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
              Find Politically Exposed Persons (PEP) worldwide
            </h1>
            <p className={styles.subClaim}>
              Screen against PEP data compiled from an assortment of continually updated sources
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
            from various sources in a consistent structured format.
            <a href="#sources">Read more about our data PEP sources</a> and how
            they are maintained.
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Feature box 2</h2>
            ...feature blurb 2...
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Data quality transparency</h2>
            PEP datasets are not as complete as other lists and are mostly
            maintained and updated by volunteers. Our aim is to transparently
            and continuously improve our data quality while also understanding
            its limitations.
          </Col>
        </Row>
        <Row>
          <section style={{ marginTop: "2em" }}>
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
              via the <a href="https://www.opensanctions.org/reference/#type.topic">
                topic</a> property:</p>

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
            <SourcesTable sources={sources} />
            <p>The <a href="https://www.opensanctions.org/datasets/wd_peps/">Wikidata Politically Exposed Persons</a> data
              is maintained by volunteers in a similar manner to the rest of the Wikimedia Foundation projects.
              OpenSanctions monitors specific positions in national and sub-national legislatures, executives and senior
              administrators for changes. Note however that this data is only as up to date as the community-contributed
              updates. In future, OpenSanctions hopes to support more active maintenance of the data in Wikidata, and by extension
              this dataset. <a href="https://www.opensanctions.org/datasets/wd_peps/">Read more...</a></p>
            <p>The <a href="https://www.opensanctions.org/datasets/everypolitician/">EveryPolitician project</a> by
              mySociety was shut down in June 2019. While it contains a significant foundation of data for national
              and sub-national legislatures in 233 countries and territories, it is becoming less representative over
              time and will be removed or replaced in time. <a href="https://www.opensanctions.org/datasets/everypolitician/">Read more...</a></p>
            <p>The RUPEP dataset is ...</p>
          </section>
        </Row>
        <Row>
          <section>
            <h2>How do we measure the quality of this PEP data?</h2>
            <p>Currently we only know when our source datasets last changed, and how many entities have been extracted.</p>
            <p>In the near future we would like to generate and publish:</p>
            <ul>
              <li>How many out of the total posts in a jurisdiction are included.</li>
              <li>Which posts are included, and which are not.</li>
              <li>...</li>
            </ul>
            <p>In the longer term, we would like to establish quality metrics, e.g. identifying what proportion of
              positions are out of date via random spot-checks.
            </p>
          </section>
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