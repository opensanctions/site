
import Research from './Research';
import { Alert, ButtonGroup, Button, Container } from './wrapped';
import { Entity } from '../lib/ftm';
import { ENTITY_WARNINGS } from '../lib/constants';

import styles from '../styles/Policy.module.scss';
import LayoutFrame from './layout/LayoutFrame';

export function LicenseInfo() {
  return (
    <div className={styles.licenseBox}>
      <Alert variant="light">
        <p>
          OpenSanctions is <strong>free for non-commercial users.</strong> Businesses
          must acquire a data license to use the dataset.
        </p>
        <ButtonGroup>
          <Button href="/api/" variant="secondary">Use the API</Button>
          <Button href="/licensing/" variant="light">License in bulk</Button>
        </ButtonGroup>
      </Alert>
    </div>
  );
}

interface BlockedEntityProps {
  entity: Entity
}

export function BlockedEntity({ entity }: BlockedEntityProps) {
  return (
    <LayoutFrame activeSection="research">
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
    </LayoutFrame>
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