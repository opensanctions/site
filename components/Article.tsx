import Link from 'next/link';
import { CalendarDateFill } from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';

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
        <Nav.Item>
          <RoutedNavLink href="/docs/about/">About OpenSanctions</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/faq/">FAQ</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/datasets/">Datasets</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/sponsor/">Sponsor the project</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/contact/">Contact us</RoutedNavLink>
        </Nav.Item>
      </Nav>
    </>
  )
}

function ArticleItem({ article }: ArticleProps) {
  return (
    <li key={article.slug}>
      {article.image_url && (
        <div className={styles.articleListImage}>
          <Image src={article.image_url} width={200} height={100} />
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