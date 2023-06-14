'use client';

import { useState } from 'react';

import { Table } from "./wrapped";
import { IAggregatedCountry } from '../lib/types';
import { HelpLink, Numeric, Plural, Spacer } from './util';


type DatasetCountryListingProps = {
  datasetName: string
  countries: IAggregatedCountry[]
  defaultExpanded?: boolean
  defaultLimit?: number | null
}

export default function DatasetCountryListing({ datasetName, countries, defaultExpanded = false, defaultLimit = null }: DatasetCountryListingProps) {
  const [coverageExpanded, setCoverageExpanded] = useState(defaultExpanded);
  const [limit, setLimit] = useState(defaultLimit);
  const visibleCountries = (typeof (limit) == "number") ? countries.slice(0, limit - 1) : countries;

  return (
    <>
      <Table size="sm" className="inner-table">
        <thead>
          <tr>
            <td colSpan={2}>
              <Plural value={countries.length} one="country" many="countries" />
              <HelpLink href={`/reference/#type.country`} />
              {coverageExpanded && !defaultExpanded && (
                <>
                  <Spacer />
                  <a onClick={(e) => { e.preventDefault(); setCoverageExpanded(false) }} href='#'>Hide overview...</a>
                </>
              )}
              {!coverageExpanded && (
                <>
                  <Spacer />
                  <a onClick={(e) => { e.preventDefault(); setCoverageExpanded(true) }} href='#'>Show overview...</a>
                </>
              )}
            </td>
          </tr>
        </thead>
        <tbody>
          {coverageExpanded && visibleCountries.map(c =>
            <tr key={c.code}>
              <td>
                <a href={`/search/?scope=${datasetName}&countries=${c.code}`}>
                  {c.label}
                </a>
              </td>
              <td className="numeric"><Numeric value={c.count} /></td>
            </tr>
          )}
        </tbody>
      </Table>
      {coverageExpanded && limit !== null && (
        <a onClick={(e) => { e.preventDefault(); setLimit(null) }} href='#'>Show all...</a>
      )}
    </>
  )
}
