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

import { IAccountInfo, IAccountUsage } from "../lib/types";
import Link from "next/link";

import styles from "../styles/Account.module.scss";
import { API_URL } from "../lib/constants";
import { FormattedDate, Money } from "./util";
import { ClipboardCopy } from "./utils/ClipboardCopy";
import { ChargebeeCheckout, ChargebeePortal } from "./Chargebee";

export const TITLE = "API account and usage information";
export const SUMMARY =
  "Users of the OpenSanctions API can manage their billing details, " +
  "and review their metered service usage.";

type UsageTableProps = {
  usage: IAccountUsage;
};

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
        )}
      </Col>
    </Row>
  );
}

type AccountInfoProps = {
  info: any; // IAccountInfo
  welcome: boolean;
  secret: string;
};

export function UserInfo({ info, welcome, secret }: AccountInfoProps) {
  const user = info.user;
  const accountName = user.name || user.key;
  const portalUrl = `${API_URL}/stripe/portal?api_key=${secret}`;
  return (
    <>
      <Row>
        <Col md={9}>
          {welcome && (
            <Alert variant="success">
              <AlertHeading>Welcome to OpenSanctions!</AlertHeading>
              <p>
                You've successfully subscribed to the OpenSanctions API. Use the
                credentials below to start querying and exploring the system.
              </p>
            </Alert>
          )}
          <Table className={styles.accountInfo} responsive>
            <tbody>
              <tr>
                <th>API key</th>
                <td>
                  {secret ? (
                    <>
                      <code>{secret}</code>
                      <ClipboardCopy text={secret} />
                    </>
                  ) : (
                    "—"
                  )}
                </td>
                <th>API</th>
                <td>
                  <Link href={API_URL}>{API_URL}</Link>
                </td>
              </tr>
              <tr>
                <th>Status</th>
                <td>
                  {user.active && <Badge bg="success">active</Badge>}
                  {!user.active && <Badge bg="danger">inactive</Badge>}
                </td>
                <th>Signed up</th>
                <td>
                  <FormattedDate date={user.created_at} />
                </td>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  {accountName}
                  {!accountName && <span className="text-muted">unknown</span>}
                </td>
                <th>E-Mail</th>
                <td>
                  {user.email}
                  {!user.email && <span className="text-muted">unknown</span>}
                </td>
              </tr>
              <tr>
                <th>Billing</th>
                <td colSpan={info.charge_info ? 1 : 3}>
                  {user.chargebee_customer_id ? (
                    <>
                      <p>Your account is linked to a Chargebee subscription.</p>
                      <ChargebeePortal>
                        <Button variant="primary">
                          Manage billing & payment
                        </Button>
                      </ChargebeePortal>
                    </>
                  ) : (
                    <>
                      <p>Your account does not use automatic billing.</p>
                      <ChargebeeCheckout>
                        <Button variant="primary">Set up billing</Button>
                      </ChargebeeCheckout>
                    </>
                  )}
                </td>
                {!!info.charge_info && (
                  <>
                    <th>Cost</th>
                    <td>
                      <>
                        <div>
                          {"Charges incurred: "}
                          <Money
                            value={info.charge_info.total / 100.0}
                            currency={info.charge_info.currency}
                          />
                        </div>
                        <div className="text-tiny">
                          {"Billing period: "}
                          <FormattedDate date={info.charge_info.start_date} />
                          {" to "}
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
      <UsageTable usage={info.usage} />
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
