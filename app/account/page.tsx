import { Row, Col, Container } from "@/components/wrapped";

import { PageProps } from "@/components/utils/PageProps";
import { getGenerateMetadata } from "@/lib/meta";

import LayoutFrame from "@/components/layout/LayoutFrame";
import { Summary } from "@/components/util";
import { getUserInfo, LOGIN_URL } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UserInfo } from "@/components/User";

export const revalidate = 0;
export const TITLE = 'API account and usage information';
export const SUMMARY = "Users of the OpenSanctions API can manage their billing details, "
  + "and review their metered service usage."

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY,
  });
}

export default async function Page({ searchParams }: PageProps) {
  const info = await getUserInfo();
  if (info === null) {
    redirect(LOGIN_URL);
  }
  return (
    <LayoutFrame activeSection="about">
      <Container>
        <h1>{TITLE}</h1>
        <Row>
          <Col md={9}>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        <UserInfo info={info} />
      </Container>
    </LayoutFrame>
  );
}
