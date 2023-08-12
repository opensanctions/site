import { Col, Container, Row } from "../../../components/wrapped";
import LayoutFrame from "../../../components/layout/LayoutFrame";
import { getGenerateMetadata } from "../../../lib/meta";
import { REVALIDATE_BASE } from "../../../lib/constants";
import { TableRow } from "./components";
import { HelpLink } from "../../../components/util";

import { getCountry } from "../../../lib/peps";
export const revalidate = REVALIDATE_BASE;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const country = getCountry(params.slug);
  return getGenerateMetadata({
    title: `Data available for ${country.label}`
  })
}


export default async function Page({ params }: { params: { slug: string } }) {
  const country = getCountry(params.slug);
   
  return (
    <LayoutFrame>
      <Container>
        <h1>
          {country.label}
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Politically-exposed persons (PEP)</strong> data is available for <i>nn</i> persons connected with {country.label} from <i>nn</i> sources.
            </p>
          </Col>
          <Col md={9}>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th />
                  <th colSpan={3}>
                    Number of known occupants<HelpLink href="#explainer" />
                  </th>
                </tr>
                <tr>
                  <th>Position</th>
                  <th>Current</th>
                  <th>Ended</th>
                  <th>Unsure</th>
                </tr>
              </thead>
              {
                Object.entries(country.positions).map((entry: any) => {
                  const position: any = entry[1];
                  return <TableRow
                    label={position.position_name}
                    current={position.counts.current}
                    ended={position.counts.ended}
                    unsure={position.counts.unknown}
                  />
                })
              }
            </table>
          </Col>

        </Row>
      </Container>
    </LayoutFrame>
  )
}