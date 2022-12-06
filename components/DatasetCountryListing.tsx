'use client';

import { useState } from 'react';

import { Table } from "./wrapped";
import { IAggregatedCountry } from '../lib/types';
import { HelpLink, Numeric, Plural, Spacer } from './util';


type DatasetCountryListingProps = {
  datasetName: string
  countries: IAggregatedCountry[]
}

export default function DatasetCountryListing({ datasetName, countries }: DatasetCountryListingProps) {
  const [coverageExpanded, setCoverageExpanded] = useState(false);
  return (
    <Table size="sm" className="inner-table">
      <thead>
        <tr>
          <td colSpan={2}>
            <Plural value={countries.length} one="country" many="countries" />
            <HelpLink href={`/reference/#type.country`} />
            <Spacer />
            {coverageExpanded && (
              <a onClick={(e) => { e.preventDefault(); setCoverageExpanded(false) }} href='#'>Hide overview...</a>
            )}
            {!coverageExpanded && (
              <a onClick={(e) => { e.preventDefault(); setCoverageExpanded(true) }} href='#'>Show overview...</a>
            )}
          </td>
        </tr>
      </thead>
      <tbody>
        {coverageExpanded && countries.map(c =>
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
  )
}
