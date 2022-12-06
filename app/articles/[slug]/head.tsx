import Content from "../../../components/Content";
import { getArticleBySlug, getContentBySlug } from "../../../lib/content";
import { getSchemaArticle } from "../../../lib/schema";
import { ArticlePageProps } from "./common";

export default async function Head({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  const structured = getSchemaArticle(article)
  return <Content.Head content={article} structured={structured} />;
}
