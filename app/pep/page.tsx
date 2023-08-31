import Link from 'next/link'
import claimStyles from '../../styles/ClaimBanner.module.scss'
import utilStyles from '../../styles/util.module.scss'
import { Col, Row, Container, Badge, Table } from '../../components/wrapped';
import LayoutFrame from '../../components/layout/LayoutFrame';
import { Numeric, UnofficialBadge } from '../../components/util';
import { getDatasets, getDatasetByName, filterMatchingNames } from '../../lib/data';
import { isCollection, isSource } from '../../lib/types'
import DatasetCountryListing from '../../components/DatasetCountryListing';
import { LicenseInfo } from '../../components/Policy';
import { ISource } from '../../lib/types';
import { getGenerateMetadata } from '../../lib/meta';



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
            <th className="d-none  d-sm-table-cell">Publisher locality</th>
            <th className="numeric">Targets</th>
          </tr>
        </thead>
        <tbody>
          {sourcesSorted.map(source =>
            <tr key={source.name}>
              <td>
                <Link href={source.link}>{source.title}</Link>
                {!source.publisher?.official && (
                  <>
                    <br />
                    <UnofficialBadge />
                  </>
                )}
              </td>
              <td className="d-none d-sm-table-cell">
                {!!source.publisher?.country_label && (
                  <Badge bg="light">{source.publisher.country_label}</Badge>
                )}
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

export async function generateMetadata() {

  return getGenerateMetadata({
    title: "Politically Exposed Persons (PEPs) data from OpenSanctions",
    description: "Consolidated information about public office holders from most countries in the world as an easy-to-use dataset."
  })
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
          </Row>
        </Container>
      </div>
      <Container>
        <Row className={utilStyles.explainer}>
          <Col md={4}>
            <h2>Diverse data sources</h2>
            The OpenSanctions PEPs dataset packages publicly available PEP data
            from various sources in a consistently structured format. <a href="#sources">Read
              more about our data PEP sources</a> and how
            they are maintained.
          </Col>
          <Col md={4}>
            <h2>De-duplicated profiles</h2>
            Persons are cross-referenced and where possible, multiple references to the same
            real world individual are <Link href={"/docs/identifiers/"}>merged to a single identifier</Link>.
            The profiles are also <Link href={"/docs/enrichment/"}>enriched</Link> with information from
            various sources of beneficial ownership information.
          </Col>
          <Col md={4}>
            <h2>Built by community</h2>
            Our ultimate objective is not to build another proprietary PEPs database,
            but to expand the coverage of political persons in Wikidata such that it
            becomes a de-facto data commodity.
          </Col>
        </Row>
        <Row className={utilStyles.explainer}>
          <Col md={8}>

            <h2>What are Politically Exposed Persons? Who needs this?</h2>

            <p>Politically exposed persons (PEP) is a term from the financial
              services industry to describe individuals who have been entrusted
              with a prominent public function. This might include members of cabinets,
              parliaments, senior public servants, the military, or people that
              run state-owned companies.</p>

            <p>
              Being classified as a PEP does not imply you have done anything
              wrong. However, the concept is important because PEPs and members of
              their families should be the subject of enhanced public scrutiny.
              This is also mandated by financial crime laws in many countries.
            </p>

            <h2 id="sources">Where is our PEP data sourced from?</h2>

            <p>OpenSanctions does not monitor political events and capture changes
              in roles manually based on election results or appointment press
              releases. Instead we automatically monitor and import updates from
              a set of public datasets with varying degrees of coverage of influence
              in various countries.</p>

            <p>We then <Link href={"/docs/enrichment/"}>enrich</Link> the PEP data with
              further information about their potential influence such as companies
              they control based on matches to company data in official and
              investigative sources.</p>

            <SourcesTable sources={sources} />

            <p>
              Official sources are generally government departments and inter-governmental
              agencies. Non-official sources are generally community, civil-society
              or journalistic organisations:
            </p>

            <ul>
              <li><Link href={"/datasets/wd_peps/"}>Wikidata Politically Exposed Persons</Link> data
                is maintained by volunteers in a similar manner to the rest of the Wikimedia Foundation projects.
                OpenSanctions monitors specific positions in national and sub-national legislatures, executives and senior
                administrators for changes. As a volunteer-driven project, there are very limited guarantees of
                how up-to-date the information is.
              </li>
              <li>
                mySociety's <Link href={"/datasets/everypolitician/"}>EveryPolitician</Link> project
                contains a significant foundation of data for national legislatures. However, its maintenance
                ended in June 2019 and the data is quickly becoming more outdated. We aim to remove or
                replace this dataset in time.
              </li>
              <li>
                The <Link href={"/datasets/ru_rupep/"}>RuPEP dataset</Link> is a database of politically
                exposed persons from Russia and Belarus, as well as their families and buisness interests.
                It is maintained by an expert team of researchers. Learn more at <Link href="https://www.rupep.org">RuPEP.org</Link>.
              </li>
            </ul>

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
            <p>
              You can download the PEP data in bulk, or search individual entries on our list, on
              the <Link href="/datasets/peps">dataset information page</Link>. Commercial users of
              the data can license it as part of the OpenSanctions <Link href="/licensing/">bulk
                data license</Link> or access the data via the hosted <Link href="/api/">OpenSanctions
                  API</Link>. We do not offer a separate licensing option for PEPs data alone.
            </p>
            <LicenseInfo />
          </Col>

          <Col md={4}>
            <h2>Which countries are in the dataset?</h2>
            <DatasetCountryListing
              countries={dataset.things.countries}
              datasetName={dataset.name}
              defaultExpanded={true}
              defaultLimit={50}
              isNested={false}
            />
          </Col>
        </Row>
      </Container >
    </LayoutFrame >
  )
}