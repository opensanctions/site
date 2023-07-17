import { Col, Container, Row } from "../../../components/wrapped";
import LayoutFrame from "../../../components/layout/LayoutFrame";
import { getGenerateMetadata } from "../../../lib/meta";
import { REVALIDATE_BASE } from "../../../lib/constants";
import { Plus } from 'react-bootstrap-icons';
import { ExpandableRow } from "./components";
import { HelpLink } from "../../../components/util";

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata() {
  return getGenerateMetadata({
    title: `Data available for Russia`
  })
}

/*const summary = [
  {
    label: "Office of the head of national government",
    current: 3,
    ended: 4,
    unsure: 2,
    positions: [
      { current: 1, ended: 2, unsure: 0, label: "President of Russia" },
      { current: 1, ended: 0, unsure: 1, label: "Vice President of Russia" },
      { current: 1, ended: 2, unsure: 2, label: "Prime minister of Russia" },
    ]
  }
]*/

export default async function Page() {
  return (
    <LayoutFrame>
      <Container>
        <h1>
          Russia
        </h1>
        <Row>
          <Col md={3}>
            <p>
              <strong>Sanctions</strong> data for 12,345 entities connected with Russia are availble from 123 sources.
            </p>
          </Col>
          <Col md={9}>
            something something truncated list of datasets?
          </Col>
        </Row>
        <hr className="d-print-none" />
        <Row>
          <Col md={3}>
            <p>
              <strong>Politically-exposed persons (PEP)</strong> data is available for 12,345 persons connected with Russia from 123 sources.
            </p>
          </Col>
          <Col md={9}>
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th />
                  <th />
                  <th colSpan={3}>
                    Number of known occupants<HelpLink href="#" />
                  </th>
                </tr>
                <tr>
                  <th />
                  <th>Category</th>
                  <th>Current</th>
                  <th>Ended</th>
                  <th>Unsure</th>
                </tr>
              </thead>
              <ExpandableRow label="Office of the head of national government" current="3" ended="9" unsure="2" />
              <ExpandableRow label="Executive branch of the national government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Legislative branch of the national government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Administration of national government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Office of the head of regional government" current="3" ended="9" unsure="2" />
              <ExpandableRow label="Executive branch of regional government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Legislative branch of regional government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Administration of regional government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Office of head of local government" current="205" ended="194" unsure="202" />
              <ExpandableRow label="Executive branch of local government" current="2055" ended="194" unsure="202" />
              <ExpandableRow label="Legislative branch of local government" current="159" ended="57" unsure="84" />
              <ExpandableRow label="Administration of local government" current="159" ended="57" unsure="234" />
              <ExpandableRow label="Military" current="83" ended="203" unsure="190" />
              <ExpandableRow label="Public entities" current="" ended="" unsure="" />
              <ExpandableRow label="State-owned enterprises" current="47" ended="12" unsure="34" />
              <ExpandableRow label="Diplomatic" current="47" ended="35" unsure="20" />
              <ExpandableRow label="Judiciary" current="76" ended="65" unsure="50" />
              <ExpandableRow label="Banking" current="10" ended="12" unsure="15" />
              <ExpandableRow label="Political parties" current="20" ended="15" unsure="23" />
              <ExpandableRow label="Private organizations" current="467" ended="123" unsure="456" />
              <ExpandableRow label="Religious" current="3" ended="2" unsure="23" />
              
            </table>
          </Col>

        </Row>
      </Container>
    </LayoutFrame>
  )
}