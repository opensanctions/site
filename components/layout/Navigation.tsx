import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavbarBrand, NavbarToggle, NavbarCollapse, Navbar, Nav, NavLink, Container } from '../wrapped';

import styles from '../../styles/Navigation.module.scss';

type NavbarSectionProps = {
  activeSection?: string
}

export default function Navigation({ activeSection }: NavbarSectionProps) {
  const activePath = usePathname() || '/';
  const inDataset = activePath.startsWith('/datasets/') || activeSection === 'datasets';
  const inShowcase = activePath === '/showcase/' || activeSection === 'showcase';
  const inAbout = activePath === '/docs/about/' || activeSection === 'about';
  const inDocumentation = activeSection === 'documentation';
  const inResearch = activeSection === 'research';
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar}>
      <Container>
        <Link href="/" passHref>
          <NavbarBrand>
            <img
              src="/static/ura/logo_text.svg"
              width="190"
              height="30"
              className="align-top"
              alt="OpenSanctions"
            />
          </NavbarBrand>
        </Link>
        <NavbarToggle />
        <NavbarCollapse className="justify-content-end">
          <Nav className="justify-content-end">
            <Link href="/research/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={inResearch}>Research</NavLink>
            </Link>
            <Link href="/datasets/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={inDataset}>Datasets</NavLink>
            </Link>
            <Link href="/showcase/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={inShowcase}>Showcase</NavLink>
            </Link>
            <Link href="/docs/usage/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={inDocumentation}>Documentation</NavLink>
            </Link>
            <Link href="/docs/about/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={inAbout}>About</NavLink>
            </Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar >
  )
}