import { ComponentType } from 'react';
import Link from 'next/link'

import { Badge } from "./wrapped";
import { Property, PropertyType, Entity, Value, Values } from "../lib/ftm";
import { FormattedDate, SpacedList, URLLink } from "./util";
import { EntityLink, EntityDisplayProps } from "./Entity";
import { ExpandList } from './utils/ExpandList';


type TypeValueProps = {
  type: PropertyType
  value: Value
  plain?: boolean
  prop?: Property
  entity?: ComponentType<EntityDisplayProps>
}

export function TypeValue({ type, value, plain = false, entity: Entity = EntityLink, prop }: TypeValueProps) {
  if (['country', 'language'].indexOf(type.name) != -1) {
    return <>{type.values.get(value as string) || value}</>
  }
  if (type.name === 'date') {
    return <FormattedDate date={value as string} />
  }
  if (type.name === 'url' && !plain) {
    return <URLLink url={value as string} />
  }
  if (prop?.name == 'leiCode') {
    return <Link href={`https://search.gleif.org/#/record/${value}`}>{value + ''}</Link>
  }
  if (prop?.name === 'wikidataId') {
    return <Link href={`https://wikidata.org/wiki/${value}`}>{value + ''}</Link>
  }
  if (type.name === 'identifier' && !plain) {
    return <code>{value + ''}</code>
  }
  if (type.name === 'topic') {
    const label = type.values.get(value as string) || value;
    if (plain) {
      return <>{label + ''}</>;
    } else {
      return <Badge bg="warning">{label + ''}</Badge>
    }
  }
  if (type.name === 'entity' && !plain) {
    if (typeof (value) !== 'string') {
      return <Entity entity={value as Entity} via={prop} />
    }
    return <code>{value}</code>
  }
  return <>{value}</>
}

type TypeValuesProps = {
  type: PropertyType
  values: Values
  limit?: number
  prop?: Property
  empty?: string
  entity?: ComponentType<EntityDisplayProps>
}

export function TypeValues({ type, values, entity, prop, limit, empty }: TypeValuesProps) {
  const elems = values.sort().map((v) => <TypeValue type={type} value={v} entity={entity} prop={prop} />)
  if (elems.length === 0 && empty) {
    return <span className="text-muted">{empty}</span>
  }
  if (limit !== undefined && limit < elems.length) {
    const shortElems = elems.slice(0, limit);
    const moreCount = elems.length - limit;
    const moreText = <>{`${moreCount} more...`}</>
    return (
      <ExpandList
        short={<SpacedList values={shortElems} />}
        full={<SpacedList values={elems} />}
        moreText={moreText}
      />
    );
  }
  return <SpacedList values={elems} />
}

type PropertyValueProps = {
  prop: Property
  value: Value
  entity?: ComponentType<EntityDisplayProps>
}

export function PropertyValue({ prop, value, entity }: PropertyValueProps) {
  return <TypeValue type={prop.type} value={value} entity={entity} prop={prop} />
}

type PropertyValuesProps = {
  prop: Property
  values: Values
  limit?: number
  empty?: string
  entity?: ComponentType<EntityDisplayProps>
}

export function PropertyValues({ prop, values, entity, limit, empty }: PropertyValuesProps) {
  return (
    <TypeValues
      type={prop.type}
      values={values}
      limit={limit}
      entity={entity}
      empty={empty}
      prop={prop}
    />
  );
}