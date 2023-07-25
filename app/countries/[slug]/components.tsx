'use client'
import { useState } from "react";
import { Plus, Dash } from "react-bootstrap-icons";

interface ExpandableRowProps {
  current: string,
  ended: string,
  unsure: string,
  label: string 
}

export function ExpandableRow(props: ExpandableRowProps) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !open);

  return (
    <>
      <tbody onClick={toggle}>
        <tr>
          <td>
            {open ? <Dash /> : <Plus />}
          </td>
          <td><a href="#">{props.label}</a></td>
          <td>{props.current}</td>
          <td>{props.ended}</td>
          <td>{props.unsure}</td>
        </tr>
      </tbody>
      <tbody style={{ display: open ? "contents" : "none" }}>
        <tr>
          <td />
          <td><a href="#">President of Russia</a></td>
          <td>1</td>
          <td>2</td>
          <td>0</td>
        </tr>
        <tr>
          <td />
          <td><a href="#">Vice President of Russia</a></td>
          <td>1</td>
          <td>4</td>
          <td>1</td>
        </tr>
        <tr>
          <td />
          <td><a href="#">Prime Minister of Russia</a></td>
          <td>1</td>
          <td>3</td>
          <td>1</td>
        </tr>
      </tbody>
    </>
  )
}