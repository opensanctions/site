import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Layout from '../../components/Layout'


const TITLE = 'API account and usage information';
const SUMMARY = "Users of the OpenSanctions API can manage their billing details, "
  + "and review their metered service usage."


export default async function Account() {
  const session = await getServerSession(authOptions);

    return (
      <Layout.Base title={TITLE} description={SUMMARY}>
        <Container>
          <h1>{TITLE}</h1>
            <Row>
              <Col md={9}>
                    <h1>Hello {session?.user?.name}!</h1>
              </Col>
            </Row>
        </Container>
      </Layout.Base>
    )
  }