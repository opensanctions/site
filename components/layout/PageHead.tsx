import { usePathname } from "next/navigation";
import { BASE_URL, SITE } from "../../lib/constants";

type HeadTagsProps = {
  title: string
  description?: string
  structured?: any,
  imageUrl?: string | null,
  noIndex?: boolean
}

export default function PageHead({ title, description, structured, imageUrl, noIndex }: HeadTagsProps) {
  const path = usePathname();
  const url = `${BASE_URL}${path}`;
  return (
    <>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
        </>
      )}
      <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@open_sanctions" />
      <meta name="twitter:creator" content="@pudo" />
      {!!description && (
        <>
          <meta property="og:description" content={description.trim()} />
          <meta name="description" content={description.trim()} />
        </>
      )}
      {noIndex && (
        <meta name="robots" content="noindex" />
      )}
      {structured && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ '__html': JSON.stringify(structured) }} />
      )}
      <meta property="og:image" content={(!!imageUrl) ? imageUrl : "/static/card.jpg"} />
      <meta name="og:site" content={SITE} />
      <meta property="og:url" content={url} />
    </>
  )
}

