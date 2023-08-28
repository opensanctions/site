/**
 * NOTE: This page will be superseded by the /account page
 */

import queryString from 'query-string';
import { Row, Col, Container } from "../../../components/wrapped";

import { PageProps } from '../../../components/utils/PageProps';
import { getGenerateMetadata } from '../../../lib/meta';
import { AccountLogin } from '../../../components/Account';
import LayoutFrame from '../../../components/layout/LayoutFrame';
import { Summary } from '../../../components/util';
import { fetchJsonUrl } from '../../../lib/data';
import { IUserInfo } from '../../../lib/types';
import { API_URL } from '../../../lib/constants';
import { UserInfo } from '@/components/User';


export const revalidate = 0;
export const TITLE = 'API account and usage information';
export const SUMMARY = "Users of the OpenSanctions API can manage their billing details, "
  + "and review their metered service usage."

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY
  })
}

export default async function Page({ searchParams }: PageProps) {
  const secret = searchParams ? searchParams['secret'] : undefined;

  let info = null;
  if (!!secret) {
    const apiUrl = queryString.stringifyUrl({
      'url': `${API_URL}/account`,
      'query': { 'api_key': secret }
    })
    info = await fetchJsonUrl<IUserInfo>(apiUrl, false);
  }

  return (
    <LayoutFrame activeSection="account">
      <Container>
        <h1>{TITLE}</h1>
        <Row>
          <Col md={9}>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        {!!info && <UserInfo info={info} />}
        {!info && <AccountLogin secret={secret} />}
      </Container>
    </LayoutFrame>
  );
}