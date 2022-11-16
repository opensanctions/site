import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import styles from '../styles/Policy.module.scss';
import Layout from './Layout';
import Research from './Research';
import { Entity, IEntityDatum } from '../lib/ftm';
import { ENTITY_WARNINGS } from '../lib/constants';

export function LicenseInfo() {
  return (
    <Alert variant="light" className={styles.licenseBox}>
      <p>
        OpenSanctions is <strong>free for non-commercial users.</strong> Businesses
        must acquire a data license to use the dataset.
      </p>
      <ButtonGroup>
        <Button href="/docs/api/" variant="secondary">Use the API</Button>
        <Button href="/licensing/" variant="light">License in bulk</Button>
      </ButtonGroup>
    </Alert>
  );
}

interface BlockedEntityProps {
  entity: IEntityDatum
}

export function BlockedEntity({ entity }: BlockedEntityProps) {
  return (
    <Layout.Base title="Blocked entity" activeSection="research">
      <Research.Context>
        <Container>
          <br />
          <Alert variant="warning">
            <Alert.Heading>Blocked entity</Alert.Heading>
            <p>
              The entity with ID <code>{entity.id}</code> has been removed from the
              OpenSanctions website due to unusual legal circumstances.
            </p>
          </Alert>
        </Container>
      </Research.Context>
    </Layout.Base>
  );
}

interface EntityWarningProps {
  entity: Entity
}

export function EntityWarning({ entity }: EntityWarningProps) {
  const warning = ENTITY_WARNINGS[entity.id];
  if (!warning) {
    return null;
  }
  return (
    <Alert variant="danger">
      {warning}
    </Alert>
  );
}