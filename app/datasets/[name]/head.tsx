import { getSchemaDataset } from "../../../lib/schema";
import PageHead from "../../../components/layout/PageHead";
import { DatasetPageProps } from "./common";
import { getDatasetByName } from "../../../lib/data";

export default async function Head({ params }: DatasetPageProps) {
  const dataset = await getDatasetByName(params.name)
  if (dataset === undefined) {
    return <PageHead title="Loading..." />;
  }
  const structured = getSchemaDataset(dataset);
  return <PageHead title={dataset.title} description={dataset.summary} structured={structured} />;
}
