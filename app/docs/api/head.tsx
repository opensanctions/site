import Content from "../../../components/Content";
import { getContentBySlug } from "../../../lib/content";

export default async function Head() {
  const content = await getContentBySlug('api');
  return <Content.Head content={content} />;
}
