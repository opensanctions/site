
import { Nav, NavItem } from "./wrapped";
import { RoutedNavLink } from './util';

import { LicenseInfo } from './Policy';
import { BoxArrowUpRight } from "react-bootstrap-icons";

export type MenuProps = {
  path: string
}


export function AboutMenu({ path }: MenuProps) {
  return (
    <>
      <Nav className="flex-column justify-content-start d-print-none" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/about/" current={path}>About OpenSanctions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/company/team/" current={path}>The team</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/faq/" current={path}>Frequently asked questions</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/licensing/" current={path}>Licensing the data</RoutedNavLink>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/commercial/faq/" current={path}>Commercial use FAQ</RoutedNavLink>
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
          <RoutedNavLink href="/impressum/" current={path}>Impressum</RoutedNavLink>
        </NavItem>
      </Nav>
      <LicenseInfo />
    </>
  );
}

export function DocumentationMenu({ path }: MenuProps) {
  return (
    <>
      <Nav className="flex-column justify-content-start d-print-none" variant="pills">
        <NavItem>
          <RoutedNavLink href="/docs/bulk/" current={path}>Using the bulk data</RoutedNavLink>
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
          <NavItem>
            <RoutedNavLink href="/docs/bulk/faq/" current={path}>Frequently asked questions</RoutedNavLink>
          </NavItem>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/api/" current={path}>Using the API</RoutedNavLink>
          <NavItem>
            <RoutedNavLink href="/docs/self-hosted/" current={path}>Self-hosted API</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/api/authentication/" current={path}>Authentication</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/api/matching/" current={path}>Using the matching API</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/api/scoring/" current={path}>Scoring algorithms</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/api/search/" current={path}>Using the search API</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="/docs/api/faq/" current={path}>Frequently asked questions</RoutedNavLink>
          </NavItem>
        </NavItem>
        <NavItem>
          <RoutedNavLink href="/docs/opensource/" current={path}>Open source</RoutedNavLink>
          <NavItem>
            <RoutedNavLink href="/docs/yente/" current={path}>yente</RoutedNavLink>
          </NavItem>
          <NavItem>
            <RoutedNavLink href="https://zavod.opensanctions.org" current={path}>zavod <BoxArrowUpRight className="menu-icon" /></RoutedNavLink>
          </NavItem>
        </NavItem>
      </Nav >
      <LicenseInfo />
    </>
  );
}
