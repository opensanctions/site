import React, { ReactElement } from 'react'
import castArray from 'lodash/castArray';
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'


export function markdownToHtml(markdown: string): string {
  const result = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .processSync(markdown)
  return result.value as string;
}

/*
 * https://stackoverflow.com/questions/23618744/rendering-comma-separated-list-of-links
 */
export function wordList(arr: Array<any>, sep: string | ReactElement): ReactElement {
  if (arr.length === 0) {
    return <></>;
  }

  return arr.slice(1)
    .reduce((xs, x, i) => xs.concat([
      <span key={`${i}_sep`} className="separator">{sep}</span>,
      <span key={i}>{x}</span>
    ]), [<span key={arr[0]}>{arr[0]}</span>])
}

export function ensureArray(value: string | string[] | null | undefined) {
  if (value === null || value === undefined) {
    return [];
  }
  return castArray(value);
}

export function asString(value: any): string | undefined {
  if (!Array.isArray(value)) {
    value = [value];
  }
  for (let item of value) {
    if (item !== null && item !== undefined) {
      item = item + ''
      item = item.trim()
      if (item.length > 0) {
        return item;
      }
    }
  }
  return undefined;
}

export const swrFetcher = (url: string) => fetch(url).then(res => res.json())
