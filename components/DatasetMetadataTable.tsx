import Link from 'next/link'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'

import { IDataset, ICollection, isSource, isExternal, IDatasetDetails, IIssue, LEVEL_ERROR, LEVEL_WARNING } from '../lib/types'
import { FormattedDate, HelpLink, Numeric, Plural, Spacer, URLLink } from './util'
import { wordList } from '../lib/util'

import styles from '../styles/Dataset.module.scss'
import { useState } from 'react'



type DatasetScreenProps = {
  dataset: IDataset
  details: IDatasetDetails
  issues: Array<IIssue>
  collections?: Array<ICollection>
}

export default function DatasetMetadataTable({ dataset, details, collections, issues }: DatasetScreenProps) {
  const errors = issues.filter((i) => i.level === LEVEL_ERROR);
  const warnings = issues.filter((i) => i.level === LEVEL_WARNING);
  const [coverageExpanded, setCoverageExpanded] = useState(false);
  return (
    <Table responsive="md">
      <tbody>
        {!isExternal(dataset) &&
          <tr>
            <th className={styles.tableHeader}>
              Targets<HelpLink href="/reference/#targets" />:
            </th>
            <td>
              <Numeric value={dataset.target_count} />
            </td>
          </tr>
        }
        <tr>
          <th className={styles.tableHeader}>
            Entity types:
          </th>
          <td className="contains-inner-table">
            <Table size="sm" className="inner-table">
              <tbody>
                {details.targets.schemata.map((ts) =>
                  <tr key={ts.name}>
                    <td>
                      <a href={`/search/?scope=${dataset.name}&schema=${ts.name}`}>
                        <Plural one={ts.label} many={ts.plural} />
                      </a>
                      <HelpLink href={`/reference/#schema.${ts.name}`} />
                    </td>
                    <td className="numeric">
                      <Numeric value={ts.count} />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </td>
        </tr>
        <tr>
          <th className={styles.tableHeader}>
            Coverage:
          </th>
          <td className="contains-inner-table">
            <Table size="sm" className="inner-table">
              <thead>
                <tr>
                  <td colSpan={2}>
                    <Plural value={details.targets.countries.length} one="country" many="countries" />
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
                {coverageExpanded && details.targets.countries.map(c =>
                  <tr key={c.code}>
                    <td>
                      <a href={`/search/?scope=${dataset.name}&countries=${c.code}`}>
                        {c.label}
                      </a>
                    </td>
                    <td className="numeric"><Numeric value={c.count} /></td>
                  </tr>
                )}
              </tbody>
            </Table>
          </td>
        </tr>
        {isSource(dataset) && (
          <tr>
            <th className={styles.tableHeader}>Publisher:</th>
            <td>
              <URLLink url={dataset.publisher.url} label={dataset.publisher.name} icon={false} />
              {dataset.publisher.country !== 'zz' && (
                <> ({dataset.publisher.country_label})</>
              )}
              <p className={styles.publisherDescription}>{dataset.publisher.description}</p>
            </td>
          </tr>
        )}
        {(isSource(dataset) || isExternal(dataset)) && !!dataset.url && (
          <tr>
            <th className={styles.tableHeader}>Information:</th>
            <td>
              <URLLink url={dataset.url} />
            </td>
          </tr>
        )}
        {isSource(dataset) && dataset.data.url && (
          <tr>
            <th className={styles.tableHeader}>Source data:</th>
            <td>
              <URLLink url={dataset.data.url} />
              <> ({dataset.data.format})</>
            </td>
          </tr>
        )}
        {(isSource(dataset) || isExternal(dataset)) && !!collections?.length && (
          <tr>
            <th className={styles.tableHeader}>
              Collections<HelpLink href="/docs/faq/#collections" />:
            </th>
            <td>
              <>in </>
              {wordList(collections.map((collection) =>
                <Link href={collection.link}>
                  {collection.title}
                </Link>
              ), <Spacer />)}
            </td>
          </tr>
        )}
        {(isSource(dataset) || isExternal(dataset)) && !!issues?.length && (
          <tr>
            <th className={styles.tableHeader}>Issues:</th>
            <td>
              {errors.length > 0 && (
                <>
                  <Badge bg='danger'>
                    <Plural value={errors.length} one="Error" many="Errors" />
                  </Badge>
                  <Spacer />
                </>
              )}
              {warnings.length > 0 && (
                <>
                  <Badge bg='warning'>
                    <Plural value={warnings.length} one="Warning" many="Warnings" />
                  </Badge>
                  <Spacer />
                </>
              )}
              <Link href="/issues">See all...</Link>
            </td>
          </tr>
        )}
        <tr>
          <th className={styles.tableHeader}>Last changed<HelpLink href="/docs/faq/#updates" />:</th>
          <td><FormattedDate date={dataset.last_change} /></td>
        </tr>
      </tbody>
    </Table >

  )
}
