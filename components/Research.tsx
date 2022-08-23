import { ParsedUrlQuery } from 'querystring';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import styles from '../styles/Research.module.scss';
import { ensureArray } from '../lib/util';


type ResearchProps = {
  title?: string
  query?: ParsedUrlQuery
}


function ResearchContext({ title, query, children }: React.PropsWithChildren<ResearchProps>) {
  const activeTitle = !!title ? title : 'Research tool';
  const activeQuery = query === undefined ? {} : query;
  const queryText = activeQuery.q || '';
  const otherQuery = { ...activeQuery };
  delete otherQuery['q'];
  delete otherQuery['offset'];
  return (
    <>
      <div className={styles.researchBar}>
        <Container>
          <h2>{activeTitle}</h2>
          <Form className="d-flex" action="/search">
            <InputGroup>
              <Form.Control
                type="search"
                name="q"
                defaultValue={queryText}
                placeholder="Search people, companies and other entities of interest..."
                className={styles.navSearchBox}
                aria-label="Search"
              />
              <Button variant="secondary" type="submit">Search</Button>
              {Object.entries(otherQuery).map(([field, values]) => ensureArray(values).map(value =>
                <input key={field + ':' + value} type="hidden" name={field + ''} value={value} />
              ))}
            </InputGroup>
          </Form>
        </Container>
      </div >
      {children}
    </>
  )
}



export default class Research {
  static Context = ResearchContext;
}