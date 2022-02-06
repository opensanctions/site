import { Property } from "../lib/ftm/property";
import { PropertyType } from "../lib/ftm/type";
import { Schema } from "../lib/ftm/schema";
import Link from "next/link";
import Table from 'react-bootstrap/Table';
import { wordList } from "../lib/util";
import { Spacer } from "./util";


type TypeReferenceProps = {
  type: PropertyType
}

export function TypeReference({ type, children }: React.PropsWithChildren<TypeReferenceProps>) {
  const values = Array.from(type.values.entries())

  return (
    <>
      <h3><a id={`type.${type.name}`} />{type.plural}</h3>
      <p className="text-body">
        {children}
      </p>
      {!!values.length && (
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Code</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {values.map(([code, label]) => (
              <tr key={code}>
                <td><code>{code}</code></td>
                <td>{label}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

type PropTypeLinkProps = {
  prop: Property
}

function PropTypeLink({ prop }: PropTypeLinkProps) {
  const range = prop.getRange()
  if (range !== undefined) {
    return <code><Link href={`#schema.${range.name}`}>{range.name}</Link></code>
  }
  if (['country', 'topic', 'date'].indexOf(prop.type.name) !== -1) {
    return <code><Link href={`#type.${prop.type.name}`}>{prop.type.name}</Link></code>
  }
  return <code>{prop.type.name}</code>;
}

type PropInverseLinkProps = {
  prop: Property
}


function PropInverseLink({ prop }: PropInverseLinkProps) {
  const reverse = prop.getReverse();
  if (prop.stub || reverse === undefined) {
    return null;
  }
  return (
    <code>
      see{' '}
      <Link href={`#prop.${reverse.qname}`}>{reverse.qname}</Link>
      {' '}(inverse)
    </code>
  )
}

type SchemaReferenceProps = {
  schema: Schema
  schemata: Array<Schema>
}

export function SchemaReference({ schema, schemata }: SchemaReferenceProps) {
  const allProperties = Array.from(schema.getProperties().values())
  const properties = allProperties
    .filter(prop => !prop.hidden)
    .filter(prop => {
      const range = prop.getRange();
      return range === undefined || -1 !== schemata.indexOf(range)
    })
  const parents = schema.getParents()
    .map(s => <Link href={`#schema.${s.name}`}>{s.name}</Link>)
  const children = schema.getChildren()
    .filter(s => schemata.indexOf(s) !== -1)
    .map(s => <Link href={`#schema.${s.name}`}>{s.name}</Link>)
  return (
    <>
      <h4><a id={`schema.${schema.name}`} /><code>{schema.name}</code> - {schema.plural}</h4>
      <p className="text-body">
        {schema.description}
      </p>
      <Table striped bordered size="sm">
        <tbody>
          <tr>
            <th>Extends</th>
            <td>{wordList(parents, <Spacer />)}</td>
          </tr>
          {!!children.length && (
            <tr>
              <th>Sub-types</th>
              <td>{wordList(children, <Spacer />)}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Table striped bordered size="sm">
        <thead>
          <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {properties.map(prop => (
            <tr key={prop.name}>
              <td>
                {prop.schema === schema && <a id={`prop.${prop.qname}`} />}
                <code><span className="text-muted">{prop.schema.name}:</span>{prop.name}</code>
              </td>
              <td><PropTypeLink prop={prop} /></td>
              <td>{prop.label}</td>
              <td>
                <PropInverseLink prop={prop} />
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}