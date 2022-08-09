import Link from 'next/link';
import Alert from 'react-bootstrap/Alert';

import styles from '../styles/Policy.module.scss';

export function LicenseInfo() {
  return (
    <Alert variant="light" className={styles.licenseBox}>
      OpenSanctions is <strong>free for non-commercial users.</strong> Business users
      can <Link href="/licensing">acquire a data license</Link> to use the
      dataset.
    </Alert>
  );
}