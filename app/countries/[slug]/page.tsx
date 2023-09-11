import { Col, Container, Row } from "../../../components/wrapped";
import LayoutFrame from "../../../components/layout/LayoutFrame";
import { getGenerateMetadata } from "../../../lib/meta";
import { REVALIDATE_BASE } from "../../../lib/constants";
import { HelpLink, Numeric } from "../../../components/util";

import { getCountry } from "../../../lib/peps";
import { getDatasetByName, getModel } from "../../../lib/data";

export const revalidate = REVALIDATE_BASE;
export const dynamic = 'force-static';

const slugCountryCode = (slug: string) => slug.split("-")[0];

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const model = await getModel()
  const label = model.getType('country').getLabel(params.slug);
  return getGenerateMetadata({
    title: `Data available for ${label}`
  })
}

export async function generateStaticParams() {
  const model = await getModel()
  const countries = model.getType('country');
  const codes = Array.from(countries.values.keys());
  return codes.map((d) => ({ slug: d }))
}


export default async function Page({ params }: { params: { slug: string } }) {
  const model = await getModel()
  const countryCode = slugCountryCode(params.slug);
  const label = model.getType('country').getLabel(countryCode);
  const country = getCountry(countryCode);
  const positions = !!country.positions ? Object.values(country.positions) : [];
  const peps = await getDatasetByName("peps");
  const countryPeps = peps?.things.countries.filter((c) => c.code == countryCode)[0];

  positions.sort((a: any, b: any) => {
    return a.position_name.toLowerCase() > b.position_name.toLowerCase() ? 1 : -1
  });

  return (
    <LayoutFrame>
      <Container>
        <h1>
          {label}
        </h1>
        {positions.length > 0 && (
          <Row>
            <Col md={3}>
              <p>
                Our <strong>Politically-exposed persons (PEP)</strong> dataset contains <Numeric value={countryPeps?.count} /> entities
                connected with <a href={`/search/?scope=peps&countries=${countryCode}`}></a>{label}.</p>
              <p>Here's a summary of the positions held by known Politically Exposed Persons for {label}.
              </p>
            </Col>
            <Col md={9}>
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th />
                    <th colSpan={3} className="numeric">
                      Number of known occupants<HelpLink href="#explainer" />
                    </th>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <th className="numeric">Current</th>
                    <th className="numeric">Ended</th>
                    <th className="numeric">Unsure</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    positions.map((position: any) => {
                      return (
                        <tr>
                          <td>{position.position_name}</td>
                          <td className="numeric">
                            <Numeric value={position.counts.current} />
                          </td>
                          <td className="numeric">
                            <Numeric value={position.counts.ended} />
                          </td>
                          <td className="numeric">
                            <Numeric value={position.counts.unknown} />
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

              <h2 id="explainer">What do these numbers mean?</h2>
              <p>Any person holding a position is counted once. If a person previously held a position,
                and also currently holds the same position, they are only counted once and recorded
                under Current. If it is unclear from the source whether they have left the position,
                they will be counted under Unknown and not under Ended.</p>
            </Col>
          </Row>
        )}
      </Container>
    </LayoutFrame>
  )
}