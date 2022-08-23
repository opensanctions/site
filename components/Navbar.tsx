import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import styles from '../styles/Navbar.module.scss';

type NavbarSectionProps = {
  activeSection?: string
}

export default function NavbarSection({ activeSection }: NavbarSectionProps) {
  const activePath = useRouter().asPath;
  const inDataset = activePath.startsWith('/datasets/') || activeSection === 'datasets';
  const inShowcase = activePath === '/showcase/' || activeSection === 'showcase';
  const inAbout = activePath === '/docs/about/' || activeSection === 'about';
  const inDocumentation = activeSection === 'documentation';
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand href="#home">
            <img
              src="/static/ura/logo_text.svg"
              width="190"
              height="30"
              className="align-top"
              alt="OpenSanctions"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Link href="/datasets/" passHref>
              <Nav.Link className={styles.navItem} active={inDataset}>Datasets</Nav.Link>
            </Link>
            <Link href="/showcase/" passHref>
              <Nav.Link className={styles.navItem} active={inShowcase}>Showcase</Nav.Link>
            </Link>
            <Link href="/docs/usage/" passHref>
              <Nav.Link className={styles.navItem} active={inDocumentation}>Documentation</Nav.Link>
            </Link>
            <Link href="/docs/about/" passHref>
              <Nav.Link className={styles.navItem} active={inAbout}>About</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}