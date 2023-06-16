import Link from 'next/link'
import claimStyles from '../../styles/ClaimBanner.module.scss'
import utilStyles from '../../styles/util.module.scss'
import { Col, Row, Container, Badge, Button, Table } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { FormattedDate, Numeric, UnofficialBadge, Spacer } from '../../components/util';
import { getDatasets, getDatasetByName, filterMatchingNames } from '../../lib/data';
import { isCollection, isSource } from '../../lib/types'
import DatasetCountryListing from '../../components/DatasetCountryListing';
import { LicenseInfo } from '../../components/Policy';
import { ISource } from '../../lib/types';

type SourcesTableProps = {
  sources: Array<ISource>
}

function SourcesTable({ sources }: SourcesTableProps) {
  const sourcesSorted = sources.sort((a, b) => b.target_count - a.target_count)
  return (
    <div className="table-responsive">
      <Table size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last changed</th>
            <th className="d-none  d-sm-table-cell">Publisher locality</th>
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
                    <br />
                    <UnofficialBadge />
                  </>
                )}
              </td>
              <td><FormattedDate date={source.last_change} /></td>
              <td className="d-none d-sm-table-cell">
                <Badge bg="light">{source.publisher.country_label}</Badge>
              </td>
              <td className="numeric">
                <Numeric value={source.target_count} />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
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
    filterMatchingNames(visibleDatasets, dataset.sources)
      .filter(isSource)
  return (
    <LayoutFrame>
      <div className={claimStyles.claimBanner}>
        <Container>
          <Row>

            <h1 className={claimStyles.claim}>
              Find Politically Exposed Persons (PEPs) worldwide
            </h1>
            <p className={claimStyles.subClaim}>
              We consolidate information about public office holders from most countries in the world into an easy-to-use dataset.
            </p>
            <p><a href="#get-the-data"><Button variant="light">Get the data</Button></a></p>

          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={4} className={utilStyles.explainer}>
            <h2>Consolidated data sources</h2>
            The OpenSanctions PEPs dataset packages publicly available PEP data
            from various sources in a consistent, structured format. <a href="#sources">Read
              more about our data PEP sources</a> and how
            they are maintained.
          </Col>
          <Col md={4} className={utilStyles.explainer}>
            <h2>Cross-referenced and merged</h2>
            Over time our PEP data is <Link href={"/docs/enrichment/"}>enriched</Link> from various sources. Entities are
            cross-referenced and where possible, multiple references to the same
            real world entity are <Link href={"/docs/identifiers/"}>merged to a single identifier</Link>.
          </Col>
          <Col md={4} className={utilStyles.explainer}>
            <h2>PEPs data as a commodity</h2>
            Our ultimate objective is not to build another proprietary PEPs database,
            but to expand the coverage of political persons in Wikidata such that it
            becomes a de-facto global commodity.
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col md={8}>

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

            <h2 id="sources">Where is our PEP data sourced from?</h2>

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

            <p><Link href={"/datasets/wd_peps/"}>Wikidata Politically Exposed Persons</Link> data
              is maintained by volunteers in a similar manner to the rest of the Wikimedia Foundation projects.
              OpenSanctions monitors specific positions in national and sub-national legislatures, executives and senior
              administrators for changes. Note, however, that as a volunteer-run organization, there is no guarantee of
              how up-to-date the information is.</p>

            <p>The <Link href={"/datasets/everypolitician/"}>EveryPolitician</Link> project
              by mySociety contains a significant foundation of data for national
              and sub-national legislatures. It was shut down, however, in June
              of 2019 and is quickly becoming more outdated. We aim to remove or
              replace this dataset in time. </p>

            <p>The <Link href={"/datasets/ru_rupep/"}>RUPEP dataset</Link> is a
              database of politically exposed persons and their connections in
              Russia and Belarus, and beyond, maintained by qualified researchers. </p>

            <h2 id="quality">How complete and up to date is your coverage?</h2>

            <p>The <Link href={dataset.link}>PEPs dataset page</Link> summarises the dataset by the country a position is/was held in, as we do here.
              Select a country to see e.g. how many politicians, close associates, etc are known for that country.</p>

            <p>You can also see when our source datasets last changed, and how many entities have been extracted from each source.</p>

            <p>We are working on a public summary of:</p>

            <ul>
              <li>Which posts in a jurisdiction are monitored in each country.</li>
              <li>Which posts have a person known to hold the post.</li>
              <li>Which kinds of posts are covered in each country.</li>
              <li>The <a href="https://github.com/opensanctions/opensanctions/issues/267#issuecomment-1460735867">risk level</a> of persons based on FATF guidelines based on their post.</li>
            </ul>

            <p>Until that is online, please <Link href="/contact/">get in touch</Link> with specific enquiries about our data coverage.</p>

            <p>In the longer term, we would like to establish quality metrics that assess coverage and freshness, e.g. identifying what proportion of
              positions are out of date, e.g. via periodic surveys.</p>

            <h2 id="get-the-data">How do I get the data?</h2>
            <span>The PEP dataset is available for commercial licensing as part of the OpenSanctions Default dataset bulk data license and SaaS API.</span>

            <LicenseInfo />
          </Col>

          <Col md={4}>
            <h2>Which countries are in the dataset?</h2>
            <DatasetCountryListing countries={dataset.things.countries} datasetName={dataset.name} defaultExpanded={true} defaultLimit={20} />
          </Col>
        </Row>
      </Container >
    </LayoutFrame >
  )
}