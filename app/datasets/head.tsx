import PageHead from "../../components/layout/PageHead";
import { getDataCatalog } from "../../lib/schema";

export default function Head() {
  const structured = getDataCatalog()
  return <PageHead title="Datasets" structured={structured} />;
}
