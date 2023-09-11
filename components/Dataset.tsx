import Link from 'next/link';
import { FolderFill, NodePlusFill, Server } from 'react-bootstrap-icons';

import { Badge, Table, Card, CardBody, CardSubtitle, CardText, TextTruncate } from "./wrapped";
import { IDataset, IExternal, isCollection, isExternal } from '../lib/types';
import { Numeric, NumericBadge, Spacer, UnofficialBadge } from './util';

import styles from '../styles/Dataset.module.scss';
import { FrequencyBadge } from './Metadata';


type DatasetProps = {
  dataset: IDataset
}

type DatasetIconProps = {
  dataset?: IDataset
  color?: string
  size?: string
}

function DatasetIcon({ dataset, ...props }: DatasetIconProps) {
  if (dataset === undefined) {
    return null;
  }
  if (isCollection(dataset)) {
    return <FolderFill className="bsIcon" {...props} />
  }
  if (isExternal(dataset)) {
    return <NodePlusFill className="bsIcon" {...props} />
  }
  return <Server className="bsIcon" {...props} />
}

function DatasetLink({ dataset, ...props }: DatasetIconProps) {
  if (dataset === undefined) {
    return null;
  }
  return (
    <a href={dataset.link}>
      <span><DatasetIcon dataset={dataset} {...props} /> {dataset.title}</span>
    </a>
  )
}


function DatasetCard({ dataset }: DatasetProps) {
  return (
    <Card key={dataset.name} className={styles.card}>
      <CardBody>
        <h5 className={styles.cardTitle}>
          <DatasetLink dataset={dataset} />
        </h5>
        <CardSubtitle className="mb-2 text-muted">
          {isCollection(dataset) && (
            <><Numeric value={dataset.sources.length + dataset.externals.length} /> data sources</>
          )}
          {!!dataset.publisher && (
            <>
              {dataset.publisher.country_label}
              {!dataset.publisher.official && (
                <>
                  <Spacer />
                  <UnofficialBadge />
                </>
              )}
            </>
          )}
          <Spacer />
          <Numeric value={dataset.thing_count} /> entities
        </CardSubtitle>
        <CardText>
          {dataset.summary}
        </CardText>
      </CardBody>
    </Card>
  )
}


function DatasetItem({ dataset }: DatasetProps) {
  return (
    <Card key={dataset.name} className={styles.item}>
      <CardBody>
        <a href={dataset.link} className={styles.itemHeader}>
          <DatasetIcon dataset={dataset} /> {dataset.title}
          <NumericBadge value={dataset.thing_count} className={styles.itemTargets} />
        </a>
        <p className={styles.itemSummary}>
          <TextTruncate line={1} text={dataset.summary} element="span" />
        </p>
        <p className={styles.itemDetails}>
          {isCollection(dataset) && (
            <>
              <Badge bg="light">Collection</Badge>
              <Spacer />
              <Numeric value={dataset.sources.length} /> data sources
            </>
          )}
          {!!dataset.publisher && (
            <>
              {isExternal(dataset) && (
                <>
                  <Badge bg="light">External dataset</Badge>
                  <Spacer />
                </>
              )}
              {dataset.publisher.country_label && (
                <>
                  <Badge bg="light">{dataset.publisher.country_label}</Badge>
                  <Spacer />
                </>
              )}
              {dataset.publisher.name}
              {!dataset.publisher.official && (
                <>
                  <Spacer />
                  <UnofficialBadge />
                </>
              )}
            </>
          )}
        </p>
      </CardBody>
    </Card>
  )
}

type DatasetsTableProps = {
  datasets: Array<IDataset>
  icon?: boolean
  publisher?: boolean
  country?: boolean
  frequency?: boolean
}

function DatasetsTable({ datasets, icon = true, publisher = false, country = true, frequency = false }: DatasetsTableProps) {
  // const datasetsSorted = datasets.sort((a, b) => b.entity_count - a.entity_count)
  const datasetsSorted = datasets.sort((a, b) => a.title.localeCompare(b.title));
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th colSpan={icon ? 2 : 1}>Name</th>
          {publisher && (
            <th>Publisher</th>
          )}
          {country && (
            <th>Country</th>
          )}
          {frequency && (
            <th>Coverage</th>
          )}
          <th className="numeric">Entities</th>
        </tr>
      </thead>
      <tbody>
        {datasetsSorted.map(dataset =>
          <tr key={dataset.name}>
            {icon && (
              <td>
                <DatasetIcon dataset={dataset} />
              </td>
            )}
            <td>
              <Link href={dataset.link}>{dataset.title}</Link>
            </td>
            {publisher && (
              <td>
                {!!dataset.publisher && (
                  <>
                    {dataset.publisher.name}
                    {!dataset.publisher.official && (
                      <>
                        <UnofficialBadge />
                      </>
                    )}
                  </>
                )}
              </td>
            )}
            {country && (
              <td>
                {!!dataset.publisher && (
                  <Badge bg="light">{dataset.publisher.country_label}</Badge>
                )}
              </td>
            )}
            {frequency && (
              <td>
                {!!dataset.coverage && (
                  <FrequencyBadge coverage={dataset.coverage} />
                )}
              </td>
            )}
            <td className="numeric">
              <Numeric value={dataset.thing_count} />
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

type ExternalsTableProps = {
  externals: Array<IExternal>
}

function ExternalsTable({ externals }: ExternalsTableProps) {
  const externalsSorted = externals.sort((a, b) => b.entity_count - a.entity_count)
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Publisher</th>
        </tr>
      </thead>
      <tbody>
        {externalsSorted.map(ext =>
          <tr key={ext.name}>
            <td>
              <Link href={ext.link}>{ext.title}</Link>
            </td>
            <td>
              {!!ext.publisher && (
                <>
                  {ext.publisher.name}
                </>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

export default class Dataset {
  static Card = DatasetCard
  static Item = DatasetItem
  static Table = DatasetsTable
  static Icon = DatasetIcon
  static Link = DatasetLink
}