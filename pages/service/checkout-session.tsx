import queryString from 'query-string';
import { GetServerSidePropsContext } from 'next';
import { fetchJsonUrl } from '../../lib/data';
import { API_URL } from '../../lib/constants';

export default function CheckoutSession() {
  return null;
}


export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const apiUrl = queryString.stringifyUrl({
    'url': `${API_URL}/stripe/session`,
    'query': {
      ...context.query,
    }
  })
  const data = await fetchJsonUrl(apiUrl, false);
  if (!data.secret) {
    return { redirect: { destination: `/service/cancel/`, permanent: false } };
  }
  const redirUrl = `/service/account/?secret=${data.secret}&welcome=true`;
  return { redirect: { destination: redirUrl, permanent: false } };
}