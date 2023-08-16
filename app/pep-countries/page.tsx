import { Col, Container, Row } from "../../components/wrapped";
import LayoutFrame from "../../components/layout/LayoutFrame";
import { getGenerateMetadata } from "../../lib/meta";
import { REVALIDATE_BASE } from "../../lib/constants";
import { getCountries, getPositions } from "../../lib/peps";

export const revalidate = REVALIDATE_BASE;

export async function generateMetadata() {
  return getGenerateMetadata({
    title: `Countries with known Politically-exposed Persons`
  })
}


export default async function Page() {
  return (
    <LayoutFrame>
      <Container>
        <h1>Countries with known Politically-exposed persons</h1>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th />
              <th colSpan={3}>
                Number of known PEP position occupants
              </th>
            </tr>
            <tr>
              <th>Country</th>
              <th>Current</th>
              <th>Ended</th>
              <th>Unknown</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.entries(getCountries()).map((entry: any) => {
                const [countryCode, country] = entry;
                return (
                  <tr>
                    <td><a href={`/countries/${countryCode}`}>{country.label}</a></td>
                    <td>{country.counts.current}</td>
                    <td>{country.counts.ended}</td>
                    <td>{country.counts.unknown}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Container>
    </LayoutFrame>
  );
}