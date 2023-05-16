import { useSession, signIn, signOut } from "next-auth/react"
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import Layout from '../../components/Layout'
import { PropsWithChildren } from 'react';
import { API_URL } from '../../lib/constants';

import styles from '../../styles/Account.module.scss'
import { ClipboardPlusFill } from 'react-bootstrap-icons';

const TITLE = 'API account and usage information';
const SUMMARY = "Users of the OpenSanctions API can manage their billing details, "
  + "and review their metered service usage."

function AccountContext({ children }: PropsWithChildren) {
  return (
    <Layout.Base title={TITLE} description={SUMMARY}>
      <Container>
        <h1>{TITLE}</h1>
        <Row>
          <Col md={9}>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        <>{children}</>
      </Container>
    </Layout.Base>
  );
}

export default function Account() {
  const { data: session, status } = useSession()
  const userName = session?.user?.name
  const userEmail = session?.user?.email

  if (status === "loading") {
    return <p>Hang in there...</p>
  }

  if (status === "authenticated") {
    return (
      <AccountContext>
        <Row>
          <Col md={9}>
            <Alert variant="success">
              <Alert.Heading>Welcome to OpenSanctions!</Alert.Heading>
              <p>
                You've successfully subscribed to the OpenSanctions API. Use the credentials
                below to start querying and exploring the system.
              </p>
            </Alert>
            <Table className={styles.accountInfo} responsive>
              <tbody>
                <tr>
                  <th>
                    API key
                  </th>
                  <td>
                    <code>API key placeholder</code>
                    <span className={styles.copySecret} onClick={() => { navigator.clipboard.writeText("API key placeholder") }}>
                      <ClipboardPlusFill />
                    </span>

                  </td>
                  <th>
                    API
                  </th>
                  <td>
                    <Link href={apiUrl}>{apiUrl}</Link>
                  </td>
                </tr>
                <tr>
                  <th>
                    Name
                  </th>
                  <td>
                    {userName}
                    {!userName && (
                      <span className="text-muted">unknown</span>
                    )}
                  </td>
                  <th>
                    E-Mail
                  </th>
                  <td>
                    {userEmail}
                    {!userEmail && (
                      <span className="text-muted">unknown</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={3}>
            <Nav className="flex-column justify-content-start" variant="pills">
              <Nav.Item>
                <Nav.Link active={true} href="#">Account and usage</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={apiUrl}>API Documentation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/reference">Data dictionary</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/contact">Contact support</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </AccountContext >
      <>
        <p>Signed in as {userEmail}</p>
        <Button variant="outline-secondary"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </>
    )
  }

  return (
    <>
      <p>Not signed in.</p>
      <Button size="lg" variant="secondary"
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    </>
  )
}