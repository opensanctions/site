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
              Screen against well-understood PEP data
            </h1>
            <p className={styles.subClaim}>
              Preventative screening where you can have insight into the data you're working with.
            </p>
            <p><a href="#get-the-data"><Button variant="light">Get the data now</Button></a></p>

          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={4} className={styles.explainer}>
            <h2>Data source transparency</h2>
            The OpenSanctions PEPs dataset packages publicly available PEP data in a consistent structured format. <a href="#sources">Read more about our data PEP sources</a> and how they are maintained.
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Inclusion methodology</h2>
            We currently take the conservative approach of maintaining PEPs 5 years after they leave any relevant posts. We are working towards expanding that within <a href="https://www.fatf-gafi.org/en/publications/Fatfrecommendations/Peps-r12-r22.html">FATF-GATF guidelines</a>
          </Col>
          <Col md={4} className={styles.explainer}>
            <h2>Data quality transparency</h2>
            We are continually improving the transparent evaluation of our data quality, sharing the methodology openly and building on feedback from data users.
          </Col>
        </Row>
        <Row>
          <section style={{ marginTop: "2em" }}>
            <h2>Who are Politically Exposed Persons? Who needs this?</h2>
            <p>PEPs are people in positions of power. Being classified as a PEP doesn't imply you've done anything wrong. ... Lorem ipsum dolor blah...</p>
            <p>The reason someone is included in the dataset is indicated in the data.
              Known PEPs are annotated with the <code>role.pep</code> <a href="https://www.opensanctions.org/reference/#type.topic">topic</a>,
              while their known close associates would be annotated with the <code>role.rca</code> topic.
              Persons who do not meet the general requirements for being considered PEPs but are maintained
              on lists for closer scrutiny by investigative organisations are annotated with the <code>poi</code> topic.
              In contrast, officially sanctioned entities will be annotated with the <code>sanctioned</code> topic.</p>
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