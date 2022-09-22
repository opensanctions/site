import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import styles from '../styles/Policy.module.scss';

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