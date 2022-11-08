import Link from 'next/link'
import Container from 'react-bootstrap/Container';

import Layout from '../components/Layout'

import styles from '../styles/Error.module.scss'

export default function ServerError() {
  return (
    <Layout.Base title="Server error">
      <Container>
        <h1 className={styles.errorTitle}>
          Server error
        </h1>
        <p className={styles.errorSummary}>
          There was an error while running processing your request.
          Please try again in a few moments, or <Link href="/contact/">contact us</Link>
          to report the issue.§
        </p>
      </Container>
    </Layout.Base>
  )
}