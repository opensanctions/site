import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import styles from '../styles/Research.module.scss';


type ResearchProps = {
  title?: string
  query?: string
}


function ResearchContext({ title, query, children }: React.PropsWithChildren<ResearchProps>) {
  const activeTitle = title ? title : 'Research';
  return (
    <>
      <div className={styles.researchBar}>
        <Container>
          <h2>{activeTitle}</h2>
          <Form className="d-flex" action="/search/">
            <InputGroup>
              <Form.Control
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search people, companies and other entities of interest..."
                className={styles.navSearchBox}
                aria-label="Search"
              />
              <Button variant="secondary" type="submit">Search</Button>
            </InputGroup>
          </Form>
        </Container>
      </div>
      {children}
    </>
  )
}



export default class Research {
  static Context = ResearchContext;
}