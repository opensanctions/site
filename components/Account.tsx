import Link from "next/link";

import { Row, Col, Alert, Form, FormGroup, FormControl, FormLabel, Button } from "./wrapped";

type AccountLoginProps = {
  secret?: string | string[] | null
}

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
              Don't know your API key?
              Please <Link href="/contact">contact us</Link> to get access.
            </Col>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
}
