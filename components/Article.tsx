import Link from 'next/link';
import { CalendarDateFill } from 'react-bootstrap-icons';

import { Badge, Nav, NavItem } from './wrapped';
import { LicenseInfo } from './Policy';
import { IArticleInfo } from '../lib/types'
import { FormattedDate, RoutedNavLink, Spacer } from './util';

import styles from '../styles/Article.module.scss';


type ArticleProps = {
  article: IArticleInfo
}


function ArticleSidebar({ article }: ArticleProps) {
  return (
    <>
      <p className={styles.sideText}>
        <CalendarDateFill className="bsIcon" size={18} />{' '}
        Published: <FormattedDate date={article.date} />
      </p>
      <p className={styles.sideText}>
        This article is part of OpenSanctions, the open database of sanctions
        targets and persons of interest.
      </p>
      <Nav className="flex-column justify-content-start d-print-none" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/about/" current={article.path}>About OpenSanctions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/search/" current={article.path}>Search data database</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/datasets/" current={article.path}>Explore our datasets</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/bulk/" current={article.path}>Use our bulk data</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/contact/" current={article.path}>Contact us</RoutedNavLink>
        </NavItem>
      </Nav>
      <LicenseInfo />
    </>
  )
}

function ArticleItem({ article }: ArticleProps) {
  return (
    <li key={article.slug}>
      {article.image_url && (
        <div className={styles.articleListImage}>
          <img src={article.image_url} width={200} height={100} alt={article.title} />
        </div>
      )}
      <div className={styles.articleListContent}>
        <p className={styles.articleListTitle}>
          <Link href={article.path}>{article.title}</Link>
        </p>
        <p className={styles.articleListSummary}>
          {article.summary}
        </p>
        <span className={styles.articleListDate}>
          <Badge bg="light">
            <FormattedDate date={article.date} />
          </Badge>
          {article.tags.map((tag) => (
            <span key={tag}>
              <Spacer />
              <Badge bg="secondary">{tag}</Badge>
            </span>
          ))}
        </span>
      </div>
    </li >
  )
}


export default class Article {
  static Sidebar = ArticleSidebar;
  static Item = ArticleItem;
}