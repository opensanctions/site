import { redirect } from "next/navigation";
import { getDatasets } from "../../../lib/data";

type RecentPageProps = {
  params: { name: string }
}

export default function Page({ params }: RecentPageProps) {
  redirect(`/datasets/${params['name']}/#recents`)
  return null;
}

export async function generateStaticParams() {
  const datasets = await getDatasets();

  return datasets.map((ds) => ({
    name: ds.name,
  }));
}