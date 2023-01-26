
import { Nav, NavItem } from "./wrapped";
import { RoutedNavLink } from './util';

import { LicenseInfo } from './Policy';

type MenuProps = {
  path: string
}


function AboutMenu({ path }: MenuProps) {
  return (
    <>
      <Nav className="flex-column justify-content-start" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/about/" current={path}>About OpenSanctions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/faq/" current={path}>Frequently asked questions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/licensing/" current={path}>Licensing the data</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/commercial-faq/" current={path}>Commercial use FAQ</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/criteria/" current={path}>Data inclusion criteria</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/contact/" current={path}>Contact us</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/terms/" current={path}>Terms of service</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/privacy/" current={path}>Privacy Policy</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/impressum/">Impressum</RoutedNavLink>
        </NavItem>
      </Nav>
      <LicenseInfo />
    </>
  );
}

function DocumentationMenu({ path }: MenuProps) {
  return (
    <>
      <Nav className="flex-column justify-content-start" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/usage/" current={path}>Using the data</RoutedNavLink>
          <NavItem>
            <RoutedNavLink href="/docs/entities/" current={path}>Entity structure</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/reference/" current={path}>Data dictionary</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/identifiers/" current={path}>Identifiers and de-duplication</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/pairs/" current={path}>Matcher training data</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/statements/" current={path}>Statement-based data</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/enrichment/" current={path}>Data enrichment</RoutedNavLink>
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