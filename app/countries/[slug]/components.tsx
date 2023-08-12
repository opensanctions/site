'use client'
import { useState } from "react";

interface RowProps {
  current: string,
  ended: string,
  unsure: string,
  label: string 
}

export function TableRow(props: RowProps) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !open);

  return (
    <>
      <tbody onClick={toggle}>
        <tr>
          <td><a href="#">{props.label}</a></td>
          <td>{props.current}</td>
          <td>{props.ended}</td>
          <td>{props.unsure}</td>
        </tr>
      </tbody>
    </>
  )
}
