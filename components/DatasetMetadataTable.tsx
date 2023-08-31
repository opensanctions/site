import Link from 'next/link';

import { Badge, Table } from "./wrapped";
import { IDataset, ICollection, isSource, isExternal, isCollection } from '../lib/types';
import { FormattedDate, HelpLink, Markdown, Numeric, Plural, Spacer, UnofficialBadge, URLLink } from './util';
import DatasetCountryListing from './DatasetCountryListing';
import { FrequencyBadge } from './Metadata';
import { wordList } from '../lib/util';

import styles from '../styles/Dataset.module.scss';



type DatasetScreenProps = {
  dataset: IDataset
  canSearch: boolean
  collections?: Array<ICollection>
}

export default async function DatasetMetadataTable({ dataset, collections, canSearch }: DatasetScreenProps) {
  return (
    <Table responsive="md">
      <tbody>
        <tr>
          <th className={styles.tableHeader}>
            Entities<HelpLink href="/docs/entities/" />:
          </th>
          <td className="contains-inner-table">
            <Table size="sm" className="inner-table">
              <tbody>
                <tr>
                  <td>Total</td>
                  <td className='numeric'>
                    <Numeric value={dataset.entity_count} />
                  </td>
                </tr>
                {dataset.things.total > 0 && canSearch && (
                  <tr>
                    <td>
                      Searchable
                      <HelpLink href={`/reference/#schema.Thing`} />
                    </td>
                    <td className='numeric'>
                      <a href={`/search/?scope=${dataset.name}`}>
                        <Numeric value={dataset.things.total} />
                      </a>
                    </td>
                  </tr>
                )}
                {!!dataset.target_count && dataset.target_count > 0 && (
                  <tr>
                    <td>
                      Targets
                      <HelpLink href="/reference/#targets" />
                    </td>
                    <td className='numeric'>
                      <Numeric value={dataset.target_count} />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </td>

        </tr>
        {dataset.things.schemata.length > 0 && (
          <tr>
            <th className={styles.tableHeader}>
              Entity types:
            </th>
            <td className="contains-inner-table">
              <Table size="sm" className="inner-table">
                <tbody>
                  {dataset.things.schemata.map((ts) =>
                    <tr key={ts.name}>
                      <td>
                        {canSearch && (
                          <a href={`/search/?scope=${dataset.name}&schema=${ts.name}`}>
                            <Plural one={ts.label} many={ts.plural} />
                          </a>
                        )}
                        {!canSearch && (
                          <Plural one={ts.label} many={ts.plural} />
                        )}
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
        )}
        {dataset.things.countries.length > 0 && (
          <tr>
            <th className={styles.tableHeader}>
              Countries:
            </th>
            <td className="contains-inner-table">
              <DatasetCountryListing countries={dataset.things.countries} datasetName={dataset.name} />
            </td>
          </tr>
        )}
        {!!dataset.publisher && (
          <tr>
            <th className={styles.tableHeader}>Publisher:</th>
            <td>
              {dataset.publisher.logo_url &&
                <img src={dataset.publisher.logo_url} className={styles.publisherLogo} />}
              <URLLink url={dataset.publisher.url} label={dataset.publisher.name} icon={false} />
              {!!dataset.publisher.country && (
                <> ({dataset.publisher.country_label})</>
              )}
              {!dataset.publisher.official && (
                <>{' '} <UnofficialBadge /></>
              )}
              <Markdown className={styles.publisherDescription} markdown={dataset.publisher.html} />
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
        {!!dataset.url && (
          <tr>
            {dataset.url && (
              <>
                <th className={styles.tableHeader}>Information:</th>
                <td>
                  <URLLink url={dataset.url} />
                </td>
              </>
            )}
          </tr>
        )}
        {!isCollection(dataset) && dataset.data?.url && (
          <tr>
            <th className={styles.tableHeader}>Source data:</th>
            <td colSpan={dataset.url ? 1 : 3}>
              <URLLink url={dataset.data.url} />
              {dataset.data.format && (
                <>
                  <Spacer />
                  <Badge bg="light">{dataset.data.format}</Badge>
                </>
              )}
            </td>
          </tr>
        )}
        {!!dataset.last_change && (
          <tr>
            <th className={styles.tableHeader}>Last changed:</th>
            <td>
              <FormattedDate date={dataset.last_change} />
              {dataset.coverage && dataset.coverage.end && (
                <>
                  &nbsp;
                  (data until: <FormattedDate date={dataset.coverage.end} />)
                </>
              )}
            </td>
          </tr>
        )}
        {!!dataset.last_export && (
          <tr>
            <th className={styles.tableHeader}>Last checked<HelpLink href="/docs/bulk/faq/#updates" />:</th>
            <td>
              <FormattedDate date={dataset.last_export} />
              {dataset.coverage && dataset.coverage.frequency !== 'unknown' && (
                <>
                  <Spacer />
                  <FrequencyBadge coverage={dataset.coverage} />
                </>
              )}
            </td>
          </tr>
        )}
        {(dataset.issue_levels.error && dataset.issue_levels.error && (
          <tr>
            <th className={styles.tableHeader}>Errors:</th>
            <td>
              <Link href={`/issues/${dataset.name}/`}>
                <Badge bg='danger'>
                  <Plural value={dataset.issue_levels.error} one="Error" many="Errors" />
                </Badge>
              </Link>
            </td>
          </tr>
        ))}
        {dataset.issue_levels.warning && dataset.issue_levels.warning > 0 && (
          <tr>
            <th className={styles.tableHeader}>Warnings:</th>
            <td>
              <Link href={`/issues/${dataset.name}/`}>
                <Badge bg='warning'>
                  <Plural value={dataset.issue_levels.warning} one="Warning" many="Warnings" />
                </Badge>
              </Link>
              {(!dataset.issue_levels.warning) && (
                <Badge bg='light'>no warnings</Badge>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </Table >

  )
}
