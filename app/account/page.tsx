import { Row, Col, Container } from "@/components/wrapped";

import { PageProps } from "@/components/utils/PageProps";
import { getGenerateMetadata } from "@/lib/meta";
import { AccountInfo, SUMMARY, TITLE } from "@/components/Account";

import LayoutFrame from "@/components/layout/LayoutFrame";
import { Summary } from "@/components/util";
import { getAccount, loginUrl } from "@/lib/auth";
import { redirect } from "next/navigation";

export const revalidate = 0;

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY,
  });
}

export default async function Page({ searchParams }: PageProps) {
  const welcome = !!searchParams?.["welcome"];
  
  const info = await getAccount();
  if (!info) {
    return redirect(loginUrl);
  }

  const secret = info.account.secret;

  return (
    <LayoutFrame activeSection="account">
      <Container>
        <h1>{TITLE}</h1>
        <Row>
          <Col md={9}>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        <AccountInfo info={info} welcome={welcome} secret={secret} />
      </Container>
    </LayoutFrame>
  );
}
