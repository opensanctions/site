import Link from 'next/link';
import { CalendarDateFill } from 'react-bootstrap-icons';

import { Nav, NavItem } from './wrapped';
import { IArticleInfo } from '../lib/types'
import { FormattedDate, RoutedNavLink } from './util';

import styles from '../styles/Article.module.scss';
import Image from 'next/image';


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
      <Nav className="flex-column justify-content-start" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/about/" current={article.path}>About OpenSanctions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/faq/" current={article.path}>FAQ</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/datasets/" current={article.path}>Datasets</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/sponsor/" current={article.path}>Sponsor the project</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/contact/" current={article.path}>Contact us</RoutedNavLink>
        </NavItem>
      </Nav>
    </>
  )
}

function ArticleItem({ article }: ArticleProps) {
  return (
    <li key={article.slug}>
      {article.image_url && (
        <div className={styles.articleListImage}>
          <Image src={article.image_url} width={200} height={100} alt={article.title} />
        </div>
      )}
      <p className={styles.articleListTitle}>
        <span className={styles.articleListDate}>
          <FormattedDate date={article.date} />
          {': '}
        </span>
        <Link href={article.path}>{article.title}</Link>
      </p>
      <p className={styles.articleListSummary}>
        {article.summary}
      </p>
      <div className="clearfix"></div>
    </li>
  )
}


export default class Article {
  static Sidebar = ArticleSidebar;
  static Item = ArticleItem;
}