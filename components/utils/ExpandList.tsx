'use client';

import { ReactNode, useState } from "react";
import { SPACER } from "../../lib/constants";

type ExpandListProps = {
  short: ReactNode
  moreText: ReactNode
  full: ReactNode
}


export function ExpandList({ short, full, moreText }: ExpandListProps) {
  const [expanded, setExpanded] = useState(false);
  if (!expanded) {
    return (
      <>
        {short}
        {SPACER}
        <a onClick={(e) => { e.preventDefault(); setExpanded(true) }} href="#">{moreText}</a>
      </>
    );
  }
  return <>{full}</>;
}
