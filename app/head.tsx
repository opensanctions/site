import { CLAIM, SUBCLAIM } from "../lib/constants";
import PageHead from "../components/layout/PageHead";
import { getSchemaWebSite } from "../lib/schema";

export default function Head() {
  const structured = getSchemaWebSite();
  return <PageHead title={`OpenSanctions: ${CLAIM}`} description={SUBCLAIM} structured={structured} />;
}

