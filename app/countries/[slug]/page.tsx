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
              <ExpandableRow />
              <tbody>
                <tr className="clickable" data-toggle="collapse" data-target="#group-of-rows-2">
                  <td><Plus /></td>
                  <td>Executive branch of the national government</td>
                  <td>4</td>
                  <td>13</td>
                  <td>3</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="clickable" data-toggle="collapse" data-target="#group-of-rows-3">
                  <td><Plus /></td>
                  <td>Legislative branch of the national government</td>
                  <td>4</td>
                  <td>13</td>
                  <td>3</td>
                </tr>
              </tbody>
              <tbody>
                <tr className="clickable" data-toggle="collapse" data-target="#group-of-rows-3">
                  <td><Plus /></td>
                  <td>Office of the head of regional government</td>
                  <td>4</td>
                  <td>13</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </Col>

        </Row>
      </Container>
    </LayoutFrame>
  )
}