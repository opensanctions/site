import { User } from "../../components/user.component";
// import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Table from 'react-bootstrap/Table';
// import Link from 'next/link';
// import Nav from 'react-bootstrap/Nav';
// import Button from 'react-bootstrap/Button';

import Layout from '../../components/Layout'
// import { PropsWithChildren } from 'react';
// import { API_URL } from '../../lib/constants';
// import { Summary } from '../../components/util';

// import styles from '../../styles/Account.module.scss'
// import { ClipboardPlusFill } from 'react-bootstrap-icons';


const TITLE = 'API account and usage information';
const SUMMARY = "Users of the OpenSanctions API can manage their billing details, "
  + "and review their metered service usage."


export default function Account() {

    return (
    <>
      <Layout.Base title={TITLE} description={SUMMARY}>
        <Container>
          <h1>{TITLE}</h1>
            <Row>
              <Col md={9}>
                <User />
              </Col>
            </Row>
        </Container>
      </Layout.Base>
    </>
    )
  }