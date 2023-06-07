
import queryString from 'query-string';

import { PageProps } from '../../../components/utils/PageProps';

import { getGenerateMetadata } from '../../../lib/meta';
import { API_URL } from '../../../lib/constants';
import { fetchJsonUrl } from '../../../lib/data';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export async function generateMetadata() {
  return getGenerateMetadata({
    title: 'Checkout session redirect'
  })
}

interface ISessionResponse {
  secret: string
}

export default async function Page({ searchParams }: PageProps) {
  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}/stripe/session`,
    'query': searchParams
  })
  const data = await fetchJsonUrl<ISessionResponse>(apiUrl, false);
  if (data === null || !data.secret) {
    redirect('/service/cancel/');
  }
  const redirUrl = `/service/account/?secret=${data.secret}&welcome=true`;
  redirect(redirUrl);
}
