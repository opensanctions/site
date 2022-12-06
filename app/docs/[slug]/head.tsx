import Content from "../../../components/Content";
import { getContentBySlug } from "../../../lib/content";
import { ContentPageProps } from "./common";

export default async function Head({ params }: ContentPageProps) {
  const content = await getContentBySlug(params.slug);
  return <Content.Head content={content} />;
}
