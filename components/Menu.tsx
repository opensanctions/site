import Nav from 'react-bootstrap/Nav';
import { RoutedNavLink } from './util';

import { LicenseInfo } from './Policy';

function AboutMenu() {
  return (
    <>
      <Nav className="flex-column justify-content-start" variant="pills">
        <Nav.Item>
          <RoutedNavLink href="/docs/about/">About OpenSanctions</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/faq/">Frequently asked questions</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/licensing/">Licensing the data</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/commercial-faq/">Commercial use FAQ</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/criteria/">Data inclusion criteria</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/contact/">Contact us</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/terms/">Terms of service</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/privacy/">Privacy Policy</RoutedNavLink>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/impressum/">Impressum</RoutedNavLink>
        </Nav.Item>
      </Nav>
      <LicenseInfo />
    </>
  );
}

function DocumentationMenu() {
  return (
    <>
      <Nav className="flex-column justify-content-start" variant="pills">
        <Nav.Item>
          <RoutedNavLink href="/docs/usage/">Using the data</RoutedNavLink>
          <Nav.Item>
            <RoutedNavLink href="/docs/entities/">Entity structure</RoutedNavLink>
          </Nav.Item>
          <Nav.Item>
            <RoutedNavLink href="/reference/">Data dictionary</RoutedNavLink>
          </Nav.Item>
          <Nav.Item>
            <RoutedNavLink href="/docs/identifiers/">Identifiers and de-duplication</RoutedNavLink>
          </Nav.Item>
          <Nav.Item>
            <RoutedNavLink href="/docs/pairs/">Matcher training data</RoutedNavLink>
          </Nav.Item>
          <Nav.Item>
            <RoutedNavLink href="/docs/statements/">Statement-based data</RoutedNavLink>
          </Nav.Item>
          <Nav.Item>
            <RoutedNavLink href="/docs/enrichment/">Data enrichment</RoutedNavLink>
          </Nav.Item>
        </Nav.Item>
        <Nav.Item>
          <RoutedNavLink href="/docs/api/">Using the API</RoutedNavLink>
          <Nav.Item>
            <RoutedNavLink href="/matcher/">How we score matches</RoutedNavLink>
          </Nav.Item>
          <Nav.Item>
            <RoutedNavLink href="/docs/self-hosted/">Self-hosted API</RoutedNavLink>
          </Nav.Item>
        </Nav.Item>
      </Nav>
      <LicenseInfo />
    </>
  );
}

export default class Menu {
  static Documentation = DocumentationMenu;
  static About = AboutMenu;
}