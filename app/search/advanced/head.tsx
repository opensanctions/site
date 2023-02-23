import PageHead from "../../../components/layout/PageHead";
import { SUMMARY } from "./common";

export default function Head() {
  const title = "Advanced screening search"
  return <PageHead title={title} description={SUMMARY} />;
}
