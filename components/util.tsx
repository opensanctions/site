import Link from 'next/link'
import React, { ReactNode } from 'react';
import queryString from 'query-string';
import { usePathname } from 'next/navigation';
import { filesize } from 'filesize';
import { FileEarmarkCodeFill, Link45deg, QuestionCircleFill } from 'react-bootstrap-icons';

import { Badge, Button, NavLink, Pagination, PaginationItem, PaginationNext, PaginationPrev, Spinner } from "./wrapped";
import { SPACER } from '../lib/constants';
import { IPaginatedResponse } from '../lib/types';
import { ServerSearchParams } from './utils/PageProps';

import styles from '../styles/util.module.scss';


type RoutedNavLinkProps = {
  href: string
}


export function RoutedNavLink({ href, children }: React.PropsWithChildren<RoutedNavLinkProps>) {
  const path = usePathname();
  return (
    <Link href={href} passHref legacyBehavior>
      <NavLink active={path == href}>{children}</NavLink>
    </Link>
  )
}


type NumericProps = {
  value?: number | null
}

export function Numeric({ value }: NumericProps) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  if (value === undefined || value === null) {
    return null;
  }
  const fmt = new Intl.NumberFormat('en-US');
  return <span>{fmt.format(value)}</span>;
}

type MoneyProps = {
  value: number
  currency: string
}

export function Money({ value, currency }: MoneyProps) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() });
  return <span>{fmt.format(value)}</span>;
}

type NumericBadgeProps = {
  value?: number | null
  bg?: string
  className?: string
}

export function NumericBadge({ value, bg, className }: NumericBadgeProps) {
  return <Badge bg={bg || 'dark'} className={className}><Numeric value={value} /></Badge>;
}

type PluralProps = {
  value?: number | null
  one: string | ReactNode
  many: string | ReactNode
}


export function Plural({ value, one, many }: PluralProps) {
  return <><Numeric value={value} /> {value === 1 ? one : many}</>;
}


type FileSizeProps = {
  size: number
}


export function FileSize({ size }: FileSizeProps) {
  return <span>{filesize(size, { round: 0, standard: 'jedec', locale: 'en-US' }) as string}</span>
}

type MarkdownProps = {
  markdown?: string | null
}

export function Markdown({ markdown }: MarkdownProps) {
  if (markdown === undefined || markdown === null) {
    return null;
  }
  //const html = markdownToHtml(markdown);
  return <div className="text-body" dangerouslySetInnerHTML={{ __html: markdown }} />
}

type FormattedDateProps = {
  date?: string | null
}

export function FormattedDate({ date }: FormattedDateProps) {
  if (date === undefined || date === null) {
    return null;
  }
  // if (date.length <= 10) {
  //   return <time dateTime={date}>{date}</time>
  // }
  // // const obj = new Date(date);
  // try {
  //   // const fmt = new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium', timeStyle: 'short' });
  //   // return <time dateTime={date}>{fmt.format(obj)}</time>
  //   const short = date.slice(0, 16).replace('T', ' ');
  //   return <time dateTime={date}>{short}</time>
  // } catch {
  //   return <time dateTime={date}>{date}</time>
  // }
  const short = date.slice(0, 10).replace('T', ' ');
  return <time dateTime={date} className={styles.formattedDate}>{short}</time>
}

type SummaryProps = {
  summary?: string | null
}

export function Summary({ summary }: SummaryProps) {
  if (summary === undefined || summary === null) {
    return null;
  }
  return <p className={styles.summary}>{summary}</p>
}


export function UnofficialBadge() {
  return <Badge bg="light">non-official source</Badge>;
}

export function Sticky({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.stickyParent}>
      <div className={styles.stickyChild}>
        {children}
      </div>
    </div>
  )
}

function getHost(href: string): string {
  try {
    const url = new URL(href);
    return url.hostname;
  } catch (e) {
    return href;
  }
}

type URLLinkProps = {
  url?: string | null
  label?: string
  icon?: boolean
}


export function URLLink({ url, label, icon = true }: URLLinkProps) {
  if (url === undefined || url === null) {
    return !!label ? <>{label}</> : null;
  }
  const href = /^https?:\/\//i.test(url) ? url : `//${url}`;
  const host = getHost(href);
  const textLabel = label || host;
  return (
    <>
      {icon && (
        <a href={href} rel="noreferrer" target="_blank" title={textLabel}>
          <Link45deg className="bsIcon" />
        </a>
      )}
      <a href={href} rel="noreferrer" target="_blank" title={url}>{textLabel}</a>
    </>
  );
}

type HelpLinkProps = {
  href: string
  size?: number
}

export function HelpLink({ href, size = 10 }: HelpLinkProps) {
  return (
    <a href={href} className={styles.helpLink}>
      <sup><QuestionCircleFill size={size} /></sup>
    </a>
  )
}


export function JSONLink({ href }: HelpLinkProps) {
  return (
    <Button
      variant="outline-dark"
      size="sm"
      className={styles.jsonLink}
      href={href}
      type={"application/json" as unknown as undefined}  // fuck that's hacky 
    >
      <FileEarmarkCodeFill className="bsIcon" />
      {' '}JSON
    </Button>
  )
}

type SpacedListProps = {
  values: Array<ReactNode>
}

export function SpacedList({ values }: SpacedListProps) {
  if (values.length == 0) {
    return null;
  }
  return (
    <>
      {values
        .map<React.ReactNode>((t, idx) => <span key={idx}>{t}</span>)
        .reduce((prev, curr, idx) => [prev, <Spacer key={`spacer-${idx}`} />, curr])}
    </>
  )
}

export function SectionSpinner() {
  return (
    <div className={styles.spinner}>
      <Spinner animation="grow" variant="secondary" />
    </div>
  );
}

export function Spacer() {
  return (
    <span className={styles.spacer}>{SPACER}</span>
  )
}


type ResponsePaginationProps = {
  response: IPaginatedResponse
  searchParams: ServerSearchParams
}

export function ResponsePagination({ response, searchParams }: ResponsePaginationProps) {
  if (response.total.value === 0) {
    return null;
  }
  const nextOffset = response.offset + response.limit;
  const upper = Math.min(response.total.value, nextOffset);
  const hasPrev = response.offset > 0;
  const hasNext = response.total.value > nextOffset;

  const prevLink = queryString.stringify({
    ...searchParams,
    offset: Math.max(0, response.offset - response.limit)
  })
  const nextLink = queryString.stringify({
    ...searchParams,
    offset: response.offset + response.limit
  })
  const relationText = response.total.relation == 'gte' ? 'more than ' : '';

  return (
    <Pagination>
      <PaginationPrev disabled={!hasPrev} href={`?${prevLink}`} />
      <PaginationItem disabled>
        {response.offset + 1} - {upper} of {relationText} {response.total.value}
      </PaginationItem>
      <PaginationNext disabled={!hasNext} href={`?${nextLink}`} />
    </Pagination>
  );
}
