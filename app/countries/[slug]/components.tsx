'use client'
import { useState } from "react";
import { Plus, Dash } from "react-bootstrap-icons";

export function ExpandableRow() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !open);

  return (
    <>
      <tbody onClick={toggle}>
        <tr>
          <td>
            {open ? <Dash /> : <Plus />}
          </td>
          <td>Office of the head of national government</td>
          <td>4</td>
          <td>13</td>
          <td>3</td>
        </tr>
      </tbody>
      <tbody style={{ display: open ? "contents" : "none" }}>
        <tr>
          <tr />
          <td>President of Russia</td>
          <td>1</td>
          <td>2</td>
          <td>0</td>
        </tr>
        <tr>
          <tr />
          <td>Vice President of Russia</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <tr />
          <td>Prime Minister of Russia</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </>
  )
}
