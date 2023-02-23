'use client';

import { FormEvent, useState } from 'react';
import { IModelDatum, Model, Property, Values } from '../lib/ftm';
import { IMatchAPIResponse, IMatchedEntityDatum } from '../lib/types';
import { Container, Col, Row, Form, FormGroup, FormLabel, Table, FormSelect, Button } from './wrapped';
import { EntityLink } from './Entity';
import { Numeric } from './util';
import { DetailPopup } from './utils/DetailPopup';
import { TypeValues } from './Property';

import styles from '../styles/Research.module.scss';

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

type MatcherResultProps = {
  model: Model
  result: IMatchedEntityDatum
}

export function MatcherResult({ model, result }: MatcherResultProps) {
  const entity = model.getEntity(result);
  const topicType = model.getType('topic');
  const topics = entity.getTypeValues(topicType) as Values;
  return (
    <tr>
      <td>
        <EntityLink entity={entity} />
      </td>
      <td>
        <TypeValues type={topicType} values={topics} />
      </td>
      <td className='numeric'><Numeric value={result.score} digits={2} /></td>
      <td className='numeric' width="1%">
        <DetailPopup title="Match score explanation">
          <Table>
            <thead>
              <tr></tr>
            </thead>
          </Table>
        </DetailPopup>

      </td>
    </tr>
  )
}

type MatcherProps = {
  datasets: DatasetOption[]
  modelData: IModelDatum
  schemata: string[]
}

export default function Matcher({ datasets, modelData, schemata }: MatcherProps) {
  const model = new Model(modelData);
  const [dataset, setDataset] = useState('default');
  const [schema, setSchema] = useState('Person');
  const [values, setValues] = useState<{ [key: string]: string; }>({});
  const [results, setResults] = useState<IMatchAPIResponse>({ total: { relation: 'eq', value: 0 }, results: [] });
  const schemaOptions = schemata
    .map((s) => model.getSchema(s))
    .filter((s) => s.matchable);
  const schemaObj = model.getSchema(schema);
  const featured = schemaObj.getFeaturedProperties();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const properties = {} as { [key: string]: string[]; };
    for (let prop of featured) {
      if (values[prop.name] !== undefined) {
        properties[prop.name] = [values[prop.name]]
      }
    }
    const requestData = JSON.stringify({
      'schema': schema,
      'dataset': dataset,
      'properties': properties
    })
    const resp = await fetch('/api/match', { method: 'POST', body: requestData });
    const data = await resp.json() as IMatchAPIResponse;
    setResults(data);
  }

  return (
    <>
      <div className={styles.researchBar}>
        <Container>
          <h2>Advanced screening search</h2>
          <Form onSubmit={onSubmit}>
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                Dataset scope:
              </FormLabel>
              <Col sm={6}>
                <FormSelect value={dataset} onChange={(e) => setDataset(e.target.value)}>
                  {datasets.map((d) => <option key={d.name} value={d.name}>{d.title}</option>)}
                </FormSelect>
              </Col>
            </FormGroup>
            <FormGroup as={Row} className="mb-3">
              <FormLabel column sm={2}>
                Entity type:
              </FormLabel>
              <Col sm={6}>
                <FormSelect value={schema} onChange={(e) => setSchema(e.target.value)}>
                  {schemaOptions.map((s) => <option key={s.name} value={s.name}>{s.label}</option>)}
                </FormSelect>
              </Col>
            </FormGroup>
            {featured.map((prop) => (
              <FormGroup as={Row} className="mb-3" key={prop.name}>
                <FormLabel column sm={2}>
                  {prop.label}:
                </FormLabel>
                <Col sm={6}>
                  <Form.Control
                    value={values[prop.name] || ''}
                    onChange={(e) => setValues({ ...values, [prop.name]: e.target.value })}
                    placeholder={getPlaceholder(prop)}
                  />
                </Col>
              </FormGroup>
            ))}
            <FormGroup as={Row} className="mb-3">
              <Col sm={{ span: 9, offset: 2 }}>
                <Button type="submit">Match</Button>
              </Col>
            </FormGroup>
          </Form>
        </Container>
      </div >
      <Container>
        {results.total.value === 0 && (
          <h2>No results.</h2>
        )}
        {results.total.value > 0 && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Topics</th>
                  <th className='numeric' colSpan={2}>Score</th>
                </tr>
              </thead>
              <tbody>
                {results.results.map((e) => <MatcherResult model={model} result={e} key={e.id} />)}
              </tbody>
            </Table>
            <p className="text-muted">
              The matcher will return a maximum of five results.
            </p>
          </>
        )}
      </Container>
    </>
  )
}
