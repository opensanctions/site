import React from 'react';
import Link from 'next/link';
import { NavbarBrand, NavbarToggle, NavbarCollapse, Navbar, Nav, NavLink, Container } from '../wrapped';

import styles from '../../styles/Navigation.module.scss';

type NavbarSectionProps = {
  activeSection?: string
}

export default function Navigation({ activeSection }: NavbarSectionProps) {
  return (
    <Navbar bg="light" expand="lg" className={styles.navBar}>
      <Container>
        <Link href="/" passHref>
          <NavbarBrand>
            <img
              src="https://assets.opensanctions.org/images/ura/logo_text.svg"
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
              <NavLink className={styles.navItem} active={activeSection === 'research'}>Research</NavLink>
            </Link>
            <Link href="/datasets/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={activeSection === 'datasets'}>Datasets</NavLink>
            </Link>
            <Link href="/showcase/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={activeSection === 'showcase'}>Showcase</NavLink>
            </Link>
            <Link href="/docs/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={activeSection === 'docs'}>Documentation</NavLink>
            </Link>
            <Link href="/docs/about/" passHref legacyBehavior>
              <NavLink className={styles.navItem} active={activeSection === 'about'}>About</NavLink>
            </Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar >
  )
}