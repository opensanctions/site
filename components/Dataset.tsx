import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import TextTruncate from 'react-text-truncate';
import { CloudFill, FolderFill, Server } from 'react-bootstrap-icons';

import { IDataset, IExternal, isCollection, isExternal, ISource, isSource } from '../lib/types'
import { Numeric, NumericBadge, Spacer } from './util';
import styles from '../styles/Dataset.module.scss'
import Link from 'next/link';


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
    return <CloudFill className="bsIcon" {...props} />
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
      <Card.Body>
        <Card.Title className={styles.cardTitle}>
          <DatasetLink dataset={dataset} />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {isCollection(dataset) && (
            <><Numeric value={dataset.sources.length} /> data sources</>
          )}
          {isSource(dataset) && (
            <>{dataset.publisher.country_label}</>
          )}
          <Spacer />
          <Numeric value={dataset.target_count} /> targets
        </Card.Subtitle>
        <Card.Text>
          {dataset.summary}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}


function DatasetItem({ dataset }: DatasetProps) {
  return (
    <Card key={dataset.name} className={styles.item}>
      <Card.Body>
        <a href={dataset.link} className={styles.itemHeader}>
          <DatasetIcon dataset={dataset} /> {dataset.title}
          {!isExternal(dataset) && (
            <NumericBadge value={dataset.target_count} className={styles.itemTargets} />
          )}
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
          {isSource(dataset) && (
            <>
              <Badge bg="light">{dataset.publisher.country_label}</Badge>
              <Spacer />
              {dataset.publisher.name}
            </>
          )}
          {isExternal(dataset) && (
            <>
              <Badge bg="light">External dataset</Badge>
              <Spacer />
              {dataset.publisher.name}
            </>
          )}
        </p>
      </Card.Body>
    </Card>
  )
}

type SourcesTableProps = {
  sources: Array<ISource>
}

function SourcesTable({ sources }: SourcesTableProps) {
  const sourcesSorted = sources.sort((a, b) => b.target_count - a.target_count)
  return (
    <Table size="sm">
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th className="numeric">Targets</th>
        </tr>
      </thead>
      <tbody>
        {sourcesSorted.map(source =>
          <tr key={source.name}>
            <td>
              <Link href={source.link}>{source.title}</Link>
            </td>
            <td>
              <Badge bg="light">{source.publisher.country_label}</Badge>
            </td>
            <td className="numeric">
              <Numeric value={source.target_count} />
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
              {ext.publisher.name}
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
  static SourcesTable = SourcesTable
  static ExternalsTable = ExternalsTable
  static Icon = DatasetIcon
  static Link = DatasetLink
}