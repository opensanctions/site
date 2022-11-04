import Link from 'next/link';
import queryString from 'query-string';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import Layout from '../../components/Layout'
import { fetchJsonUrl } from '../../lib/data';
import { API_URL } from '../../lib/constants';
import { IAccountInfo, IAccountUsage } from '../../lib/types';
import { PropsWithChildren } from 'react';
import { FormattedDate, Money, Summary } from '../../components/util';


import styles from '../../styles/Account.module.scss'
import { ClipboardPlusFill } from 'react-bootstrap-icons';

const TITLE = 'API account and usage information';
const SUMMARY = "Users of the OpenSanctions API can manage their billing details, "
  + "and review their metered service usage."

type UsageTableProps = {
  usage: IAccountUsage
}

function UsageTable({ usage }: UsageTableProps) {
  return (
    <Row>
      <Col md={9}>
        <h3>Usage metrics (last {usage.days} days)</h3>
        {usage.total == 0 && (
          <Alert variant="dark">
            Once you've started using the API, this section will show the number
            and type of calls you have made.
          </Alert>
        )}
        {usage.total > 0 && (
          <Table size="sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Endpoint</th>
                <th className="numeric">Requests</th>
                <th className="numeric">Total</th>
              </tr>
            </thead>
            <tbody>
              {usage.dates.map((date) => <>
                {date.routes.map((route, ridx) => (
                  <tr key={ridx}>
                    {ridx == 0 && (
                      <td rowSpan={date.routes.length}>{date.date}</td>
                    )}
                    <td>{route.route}</td>
                    <td className="numeric">{route.count}</td>
                    {ridx == 0 && (
                      <td rowSpan={date.routes.length} className="numeric">{date.total}</td>
                    )}
                  </tr>
                ))}
              </>)}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

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

type AccountLoginProps = {
  secret?: string | null
}

function AccountLogin({ secret }: AccountLoginProps) {
  const failed = (secret !== null);
  return (
    <AccountContext>
      <Row>
        <Col md={9}>
          <Form>
            {failed && (
              <Alert variant="danger">
                <strong>Authentication failed.</strong> The API key you entered
                does not belong to an active account.
              </Alert>
            )}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                API Key
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  name="secret"
                  defaultValue={secret || ""}
                  placeholder="Please enter your API credential to view account info..."
                  aria-label="API key"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Sign in</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }} className="text-muted">
                Don't know your API key?
                Please <Link href="/contact">contact us</Link> to get access.
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </AccountContext>
  );
}

export default function Account({ apiUrl, secret, info, welcome }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (info === null) {
    return <AccountLogin secret={secret} />;
  }
  const account = info.account;
  const accountName = account.name || account.key;
  const portalUrl = `${apiUrl}/stripe/portal?api_key=${secret}`;
  return (
    <AccountContext>
      <Row>
        <Col md={9}>
          {welcome && (
            <Alert variant="success">
              <Alert.Heading>Welcome to OpenSanctions!</Alert.Heading>
              <p>
                You've successfully subscribed to the OpenSanctions API. Use the credentials
                below to start querying and exploring the system.
              </p>
            </Alert>
          )}
          <Table className={styles.accountInfo} responsive>
            <tbody>
              <tr>
                <th>
                  API key
                </th>
                <td>
                  <code>{account.secret}</code>
                  <span className={styles.copySecret} onClick={() => { navigator.clipboard.writeText(account.secret) }}>
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
                  Status
                </th>
                <td>
                  {account.active && (
                    <Badge bg="success">active</Badge>
                  )}
                  {!account.active && (
                    <Badge bg="danger">inactive</Badge>
                  )}
                </td>
                <th>
                  Signed up
                </th>
                <td>
                  <FormattedDate date={account.created_at} />
                </td>
              </tr>
              <tr>
                <th>
                  Name
                </th>
                <td>
                  {accountName}
                  {!accountName && (
                    <span className="text-muted">unknown</span>
                  )}
                </td>
                <th>
                  E-Mail
                </th>
                <td>
                  {account.email}
                  {!account.email && (
                    <span className="text-muted">unknown</span>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  Billing
                </th>
                <td colSpan={info.charge_info ? 1 : 3}>
                  {account.stripe_customer_id && (
                    <>
                      <p>Your account is linked to a Stripe subscription.</p>
                      <Button href={portalUrl} variant="primary">
                        Manage billing and payment
                      </Button>
                    </>
                  )}
                  {!account.stripe_customer_id && (
                    <>Your account does not use automatic billing</>
                  )}
                </td>
                {!!info.charge_info && (
                  <>
                    <th>
                      Cost
                    </th>
                    <td>
                      <>
                        <div>
                          {'Charges incurred: '}
                          <Money value={info.charge_info.total / 100.0} currency={info.charge_info.currency} />
                        </div>
                        <div className="text-tiny">
                          {'Billing period: '}
                          <FormattedDate date={info.charge_info.start_date} />
                          {' to '}
                          <FormattedDate date={info.charge_info.end_date} />
                        </div>
                        <div className="text-tiny">
                          Usage is reported/updated daily.
                        </div>
                      </>
                    </td>
                  </>
                )}
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
      <UsageTable usage={info.usage} />
    </AccountContext >
  )
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const secret = (context.query.secret || null) as string | null;

  let info = null;
  if (secret !== undefined) {
    const apiUrl = queryString.stringifyUrl({
      'url': `${API_URL}/account`,
      'query': { 'api_key': secret }
    })
    const data = await fetchJsonUrl(apiUrl, false);
    info = data as IAccountInfo | null;
  }
  return {
    props: {
      secret,
      info,
      apiUrl: API_URL,
      welcome: !!context.query.welcome,
    },
  }
}