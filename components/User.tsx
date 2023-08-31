import {
  Row,
  Col,
  Alert,
  AlertHeading,
  Table,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Badge,
  Nav,
  NavItem,
  NavLink,
} from "./wrapped";

import { ICredentialUsage, IUserInfo, ICredential } from "../lib/types";
import Link from "next/link";

import styles from "../styles/Account.module.scss";
import { API_URL } from "../lib/constants";
import { FormattedDate } from "./util";
import { ClipboardCopy } from "./utils/ClipboardCopy";
import { ChargebeeCheckout, ChargebeePortal } from "./Chargebee";

export const TITLE = "API account and usage information";
export const SUMMARY =
  "Users of the OpenSanctions API can manage their billing details, " +
  "and review their metered service usage.";

type UsageTableProps = {
  usage: ICredentialUsage;
};

function UsageTable({ usage }: UsageTableProps) {
  if (usage.total === 0) {
    return null;
  }
  return (
    <Row>
      <Col md={9}>
        <h3>Usage metrics (last {usage.days} days)</h3>
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
            {usage.dates.map((date) => (
              <>
                {date.routes.map((route, ridx) => (
                  <tr key={ridx}>
                    {ridx == 0 && (
                      <td rowSpan={date.routes.length}>{date.date}</td>
                    )}
                    <td>{route.route}</td>
                    <td className="numeric">{route.count}</td>
                    {ridx == 0 && (
                      <td rowSpan={date.routes.length} className="numeric">
                        {date.total}
                      </td>
                    )}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

type CredentialTableProps = {
  credentials: ICredential[];
};

function CredentialTable({ credentials }: CredentialTableProps) {
  const now = (new Date()).toISOString();
  if (credentials.length == 0) {
    return (
      <Alert variant="secondary">
        <AlertHeading>Ready to use the API?</AlertHeading>
        <p>
          Create a key to use our programming interface and use OpenSanctions
          as a backend service for your application.
        </p>
        <div>
          <ChargebeeCheckout>
            <Button variant="outline-success">
              Generate an API key
            </Button>
          </ChargebeeCheckout>
        </div>
      </Alert>
    );
  }
  return (
    <>
      <h3>
        <ChargebeeCheckout>
          <Button className={styles.newCredential} variant="primary" size="sm">
            New...
          </Button>
        </ChargebeeCheckout>

        Credentials
      </h3>
      <Table size="sm">
        <thead>
          <tr>
            <th>API Key</th>
            <th>Label</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential) => (
            <tr key={credential.id}>
              <td width="50%">
                <code>{credential.secret}</code>
                <ClipboardCopy text={credential.secret} />
              </td>

              <td>{credential.label}</td>
              <td>
                {(!!credential.stripe_subscription_id || !!credential.chargebee_subscription_id) && (
                  <Badge bg="light">paid</Badge>
                )}
                {(!credential.stripe_subscription_id && !credential.chargebee_subscription_id) && (
                  <Badge bg="light">unpaid</Badge>
                )}
              </td>
              <td>
                {!credential.expires_at && (
                  <Badge bg="success">active</Badge>
                )}
                {(!!credential.expires_at && credential.expires_at > now) && (
                  <Badge bg="warning">expires <FormattedDate date={credential.expires_at} /></Badge>
                )}
                {(!!credential.expires_at && credential.expires_at <= now) && (
                  <Badge bg="danger">disabled</Badge>
                )}
              </td>
              <td><FormattedDate date={credential.created_at} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

type AccountInfoProps = {
  info: IUserInfo;
};

export function UserInfo({ info }: AccountInfoProps) {
  const user = info.user;
  const customer = info.customer;
  const credential = info.credentials.length > 0 ? info.credentials[0] : null;
  const secret = credential ? credential.secret : 'none';
  const stripePortalUrl = `${API_URL}/stripe/portal?api_key=${secret}`;
  return (
    <>
      <Row>
        <Col md={9}>

          <Table className={styles.accountInfo} responsive>
            <tbody>
              <tr>
                <th>Name</th>
                <td>
                  {user.name}
                  {!user.name && <span className="text-muted">unknown</span>}
                </td>
                <th>E-Mail</th>
                <td>
                  {user.email}
                  {!user.email && <span className="text-muted">unknown</span>}
                </td>
              </tr>
              <tr>
                <th>Customer</th>
                <td>{customer.name}</td>
                <td colSpan={2}>
                  <>
                    {(!!customer.stripe_id && !customer.chargebee_id) && (
                      <>
                        <Button href={stripePortalUrl} size="sm" variant="primary">
                          Manage billing and payment
                        </Button>
                      </>
                    )}
                    {!!customer.chargebee_id && (
                      <>
                        <ChargebeePortal>
                          <Button variant="primary" size="sm" >
                            Manage billing & payment
                          </Button>
                        </ChargebeePortal>
                      </>
                    )}
                  </>
                </td>
              </tr>
            </tbody>
          </Table>
          <CredentialTable credentials={info.credentials} />
          <UsageTable usage={info.usage} />
        </Col>
        <Col md={3}>
          <Nav className="flex-column justify-content-start" variant="pills">
            <NavItem>
              <NavLink active={true} href="#">
                Account and usage
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={API_URL}>API Documentation</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/reference">Data dictionary</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://status.opensanctions.org">
                System status
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact support</NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </>
  );
}

type AccountLoginProps = {
  secret?: string | string[] | null;
};

export function AccountLogin({ secret }: AccountLoginProps) {
  const failed = !!secret;
  return (
    <Row>
      <Col md={9}>
        <Form>
          {failed && (
            <Alert variant="danger">
              <strong>Authentication failed.</strong> The API key you entered
              does not belong to an active account.
            </Alert>
          )}
          <FormGroup as={Row} className="mb-3">
            <FormLabel column sm={2}>
              API Key
            </FormLabel>
            <Col sm={10}>
              <FormControl
                name="secret"
                defaultValue={secret || ""}
                placeholder="Please enter your API credential to view account info..."
                aria-label="API key"
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
          <FormGroup as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }} className="text-muted">
              Don't know your API key? Please{" "}
              <Link href="/contact">contact us</Link> to get access.
            </Col>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}
