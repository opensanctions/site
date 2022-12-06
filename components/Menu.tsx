
import { Nav, NavItem } from "./wrapped";
import { RoutedNavLink } from './util';

import { LicenseInfo } from './Policy';

function AboutMenu() {
  return (
    <>
      <Nav className="flex-column justify-content-start" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/about/">About OpenSanctions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/faq/">Frequently asked questions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/licensing/">Licensing the data</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/commercial-faq/">Commercial use FAQ</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/criteria/">Data inclusion criteria</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/contact/">Contact us</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/terms/">Terms of service</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/privacy/">Privacy Policy</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/impressum/">Impressum</RoutedNavLink>
        </NavItem>
      </Nav>
      <LicenseInfo />
    </>
  );
}

function DocumentationMenu() {
  return (
    <>
      <Nav className="flex-column justify-content-start" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/usage/">Using the data</RoutedNavLink>
          <NavItem>
            <RoutedNavLink href="/docs/entities/">Entity structure</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/reference/">Data dictionary</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/identifiers/">Identifiers and de-duplication</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/pairs/">Matcher training data</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/statements/">Statement-based data</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/enrichment/">Data enrichment</RoutedNavLink>
          </NavItem>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/api/">Using the API</RoutedNavLink>
          <NavItem>
            <RoutedNavLink href="/matcher/">How we score matches</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/self-hosted/">Self-hosted API</RoutedNavLink>
          </NavItem>
        </NavItem>
      </Nav>
      <LicenseInfo />
    </>
  );
}

export default class Menu {
  static Documentation = DocumentationMenu;
  static About = AboutMenu;
}