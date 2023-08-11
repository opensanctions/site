import Link from 'next/link';

import { Badge, Table } from "./wrapped";
import { IDataset, ICollection, isSource, isExternal } from '../lib/types';
import { FormattedDate, HelpLink, Numeric, Plural, Spacer, UnofficialBadge, URLLink } from './util';
import DatasetCountryListing from './DatasetCountryListing';
import { FrequencyBadge } from './Metadata';
import { wordList } from '../lib/util';

import styles from '../styles/Dataset.module.scss';



type DatasetScreenProps = {
  dataset: IDataset
  collections?: Array<ICollection>
}

export default function DatasetMetadataTable({ dataset, collections }: DatasetScreenProps) {
  const errors = dataset.issue_levels.error;
  const warnings = dataset.issue_levels.error;
  return (
    <Table responsive="md">
      <tbody>
        <tr>
          <th className={styles.tableHeader}>
            Entities<HelpLink href="/docs/entities/" />:
          </th>
          <td>
            {dataset.things.total > 0 && (
              <>
                <a href={`/search/?scope=${dataset.name}`}>
                  <Plural value={dataset.things.total}
                    one={"searchable"}
                    many={"searchable"}
                  />
                </a>
                <Spacer />
              </>
            )}
            <Plural
              value={dataset.entity_count}
              one={"total"}
              many={"total"}
            />
          </td>
          <th className={styles.tableHeader}>
            Targets<HelpLink href="/reference/#targets" />:
          </th>
          <td>
            <Numeric value={dataset.target_count} />
          </td>
        </tr>
        {dataset.things.schemata.length > 0 && (
          <tr>
            <th className={styles.tableHeader}>
              Entity types:
            </th>
            <td className="contains-inner-table" colSpan={3}>
              <Table size="sm" className="inner-table">
                <tbody>
                  {dataset.things.schemata.map((ts) =>
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
        )}
        {dataset.things.countries.length > 0 && (
          <tr>
            <th className={styles.tableHeader}>
              Countries:
            </th>
            <td className="contains-inner-table" colSpan={3}>
              <DatasetCountryListing countries={dataset.things.countries} datasetName={dataset.name} />
            </td>
          </tr>
        )}
        {(isSource(dataset) || isExternal(dataset)) && (
          <tr>
            {dataset.url && (
              <>
                <th className={styles.tableHeader}>Information:</th>
                <td colSpan={dataset.data?.url ? 1 : 3}>
                  <URLLink url={dataset.url} />
                </td>
              </>
            )}
            {dataset.data?.url && (
              <>
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
              </>
            )}
          </tr>
        )}
        <tr>
          <th className={styles.tableHeader}>Last changed:</th>
          <td>
            <FormattedDate date={dataset.last_change} />
            {dataset.coverage && dataset.coverage.end && (
              <>
                <Spacer />
                (data until: <FormattedDate date={dataset.coverage.end} />)
              </>
            )}
          </td>
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
        {(isSource(dataset) || isExternal(dataset)) && dataset.issue_count > 0 && (
          <tr>
            <th className={styles.tableHeader}>Errors:</th>
            <td colSpan={1}>
              {dataset.issue_levels.error && dataset.issue_levels.error > 0 && (
                <Link href={`/issues/${dataset.name}/`}>
                  <Badge bg='danger'>
                    <Plural value={dataset.issue_levels.error} one="Error" many="Errors" />
                  </Badge>
                </Link>
              )}
              {(!dataset.issue_levels.error) && (
                <Badge bg='light'>no errors</Badge>
              )}
            </td>
            <th className={styles.tableHeader}>Warnings:</th>
            <td colSpan={1}>
              {dataset.issue_levels.warning && dataset.issue_levels.warning > 0 && (
                <Link href={`/issues/${dataset.name}/`}>
                  <Badge bg='warning'>
                    <Plural value={dataset.issue_levels.warning} one="Warning" many="Warnings" />
                  </Badge>
                </Link>
              )}
              {(!dataset.issue_levels.warning) && (
                <Badge bg='light'>no warnings</Badge>
              )}
            </td>
          </tr>
        )}
        {(isSource(dataset) || isExternal(dataset)) && (
          <tr>
            <th className={styles.tableHeader}>Publisher:</th>
            <td colSpan={3}>
              {dataset.publisher.logo_url &&
                <img src={dataset.publisher.logo_url} className={styles.publisherLogo} />}
              <URLLink url={dataset.publisher.url} label={dataset.publisher.name} icon={false} />
              {!!dataset.publisher.country && (
                <> ({dataset.publisher.country_label})</>
              )}
              {!dataset.publisher.official && (
                <>{' '} <UnofficialBadge /></>
              )}
              <p className={styles.publisherDescription}>{dataset.publisher.description}</p>

            </td>
          </tr>
        )}
        {(isSource(dataset) || isExternal(dataset)) && !!collections?.length && (
          <tr>
            <th className={styles.tableHeader}>
              Collections<HelpLink href="/docs/faq/#collections" />:
            </th>
            <td colSpan={3}>
              <>in </>
              {wordList(collections.map((collection) =>
                <Link href={collection.link}>
                  {collection.title}
                </Link>
              ), <Spacer />)}
            </td>
          </tr>
        )}
      </tbody>
    </Table >

  )
}
