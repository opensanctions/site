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


async function CountryTable(props: {countryTuples: Array<Array<any>>}) {
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th />
          <th colSpan={3}>
            Number of known PEPs by status
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
          props.countryTuples.map((entry: any) => {
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
  );
}

async function PositionTable(props: {positionTuples: Array<Array<any>>}) {
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th />
          <th />
          <th colSpan={3}>
            Number of known PEPs by status
          </th>
        </tr>
        <tr>
          <th>Position</th>
          <th>Number of countries</th>
          <th>Current</th>
          <th>Ended</th>
          <th>Unknown</th>
        </tr>
      </thead>
      <tbody>
        {
          props.positionTuples.map((entry: any) => {
            const [positionLabel, position] = entry;
            return (
              <tr>
                <td>{positionLabel}</td>
                <td>{position.countries.length}</td>
                <td>{position.counts.current}</td>
                <td>{position.counts.ended}</td>
                <td>{position.counts.unknown}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default async function Page() {
  const countryTuples: Array<Array<any>> = Object.entries(getCountries());
  countryTuples.sort((c1: any, c2: any) => c1[1].label > c2[1].label ? 1 : -1);

  const positionTuples: Array<Array<any>> = Object.entries(getPositions());

  return (
    <LayoutFrame>
      <Container>
        <h1>Politically-exposed Persons data for each country</h1>
        <h2>Countries</h2>
        <CountryTable countryTuples={countryTuples} />

        <h2>Positions</h2>
        <PositionTable positionTuples={positionTuples} />
      </Container>
    </LayoutFrame>
  );
}