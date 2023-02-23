'use client';

import queryString from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { IModelDatum, Model, Property, Values } from '../../lib/ftm';
import { IMatchAPIResponse, IMatchedEntityDatum } from '../../lib/types';
import { asString } from '../../lib/util';
import { Container, Col, Row, Form, FormGroup, FormLabel, Table, FormSelect, Button } from '../wrapped';



export type DatasetOption = {
  name: string
  title: string
}


function getPlaceholder(prop: Property) {
  if (prop.type.name === 'name') {
    return 'entity name';
  }
  if (prop.type.name === 'date') {
    return 'format 1984-02-18 or 1984 (year only)'
  }
  if (prop.type.name === 'country') {
    return 'country name (Russia) or code (RU)'
  }
  if (prop.type.name === 'identifier') {
    return 'like 743587867'
  }
  return prop.description || prop.label;
}

type MatcherProps = {
  datasets: DatasetOption[]
  modelData: IModelDatum
  schemata: string[]
  schema: string
  dataset: string
  isLoading: boolean
}

export default function MatcherForm({ datasets, modelData, schemata, schema, dataset, isLoading }: MatcherProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname() || '/search/advanced/';
  const router = useRouter();
  const model = new Model(modelData);
  const schemaOptions = schemata
    .map((s) => model.getSchema(s))
    .filter((s) => s.matchable);
  const schemaObj = model.getSchema(schema);
  const featured = schemaObj.getFeaturedProperties();
  const [values, setValues] = useState(Object.fromEntries(searchParams));

  const setDataset = async (dataset: string) => {
    router.replace(queryString.stringifyUrl({
      url: pathname,
      query: { ...values, dataset: dataset }
    }));
  }

  const setSchema = async (schema: string) => {
    router.replace(queryString.stringifyUrl({
      url: pathname,
      query: { dataset: dataset, schema: schema }
    }));
    setValues({});
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(queryString.stringifyUrl({
      url: pathname,
      query: { ...values, dataset: dataset, schema: schema }
    }));
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={4}>
          Dataset scope:
        </FormLabel>
        <Col sm={8}>
          <FormSelect value={dataset} onChange={(e) => setDataset(e.target.value)} disabled={isLoading}>
            {datasets.map((d) => <option key={d.name} value={d.name}>{d.title}</option>)}
          </FormSelect>
        </Col>
      </FormGroup>
      <FormGroup as={Row} className="mb-3">
        <FormLabel column sm={4}>
          Entity type:
        </FormLabel>
        <Col sm={8}>
          <FormSelect value={schema} onChange={(e) => setSchema(e.target.value)} disabled={isLoading}>
            {schemaOptions.map((s) => <option key={s.name} value={s.name}>{s.label}</option>)}
          </FormSelect>
        </Col>
      </FormGroup>
      {featured.map((prop) => (
        <FormGroup as={Row} className="mb-3" key={prop.name}>
          <FormLabel column sm={4}>
            {prop.label}:
          </FormLabel>
          <Col sm={8}>
            <Form.Control
              value={values[prop.name] || ''}
              disabled={isLoading}
              onChange={(e) => setValues({ ...values, [prop.name]: e.target.value })}
              placeholder={getPlaceholder(prop)}
            />
          </Col>
        </FormGroup>
      ))}
      <FormGroup as={Row} className="mb-3">
        <Col sm={{ span: 8, offset: 4 }}>
          <Button type="submit" disabled={isLoading}>Match</Button>
        </Col>
      </FormGroup>
    </Form>
  )
}
