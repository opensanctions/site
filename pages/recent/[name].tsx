import { GetStaticPropsContext } from "next";
import { getDatasets } from "../../lib/data";

export default function DatasetRecent() {
  return null;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const params = context.params!
  return { redirect: { destination: `/datasets/${params.name}/#recents`, permanent: false } };

}

export async function getStaticPaths() {
  const datasets = await getDatasets()
  const paths = datasets.map((dataset) => {
    return { params: { name: dataset.name } }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}
