import PageHead from "../../components/layout/PageHead";
import { SUMMARY, TITLE } from "./common";

export default function Head() {
  return <PageHead title={TITLE} description={SUMMARY} />;
}
