import queryString from 'query-string';
import { Row, Col, Container } from "../../../components/wrapped";

import { PageProps } from '../../../components/utils/PageProps';
import { getGenerateMetadata } from '../../../lib/meta';
import { AccountInfo, AccountLogin, SUMMARY, TITLE } from '../../../components/Account';

import LayoutFrame from '../../../components/layout/LayoutFrame';
import { Summary } from '../../../components/util';
import { fetchJsonUrl } from '../../../lib/data';
import { IAccountInfo } from '../../../lib/types';
import { API_URL } from '../../../lib/constants';


export const revalidate = 0;

export async function generateMetadata() {
  return getGenerateMetadata({
    title: TITLE,
    description: SUMMARY
  })
}

export default async function Page({ searchParams }: PageProps) {
  const welcome = (searchParams && !!searchParams['welcome']) || false;
  const secret = searchParams ? searchParams['secret'] : undefined;

  let info = null;
  if (!!secret) {
    const apiUrl = queryString.stringifyUrl({
      'url': `${API_URL}/account`,
      'query': { 'api_key': secret }
    })
    info = await fetchJsonUrl<IAccountInfo>(apiUrl, false);
  }

  return (
    <LayoutFrame activeSection="datasets">
      <Container>
        <h1>{TITLE}</h1>
        <Row>
          <Col md={9}>
            <Summary summary={SUMMARY} />
          </Col>
        </Row>
        {(!!secret && !!info) && <AccountInfo info={info} welcome={welcome} secret={secret} />}
        {!info && <AccountLogin secret={secret} />}
      </Container>
    </LayoutFrame>
  );
}