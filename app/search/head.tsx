import PageHead from "../../components/layout/PageHead";
import { SUMMARY } from "./common";

export default function Head() {
  const title = "Search"
  return <PageHead title={title} description={SUMMARY} />;
}
