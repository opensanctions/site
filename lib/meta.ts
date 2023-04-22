import { Metadata } from "next"
import { IContentBase } from "./types"
import { THEME_COLOR } from "./constants"


type MetaProps = {
  title: string
  description?: string
  imageUrl?: string | null,
  noIndex?: boolean
}

export function getGenerateMetadata({ title, description, imageUrl, noIndex }: MetaProps): Metadata {
  const imageDefaultUrl = !!imageUrl ? imageUrl : "https://assets.opensanctions.org/images/card.jpg";
  // FIXME: <link rel="search" type="application/opensearchdescription+xml" title="OpenSanctions" href="/opensearch.xml" />
  const meta: Metadata = {
    title: title,
    description: description,
    applicationName: 'OpenSanctions.org',
    creator: "OpenSanctions",
    icons: {
      icon: 'https://assets.opensanctions.org/images/favicon-32x32.png',
      apple: 'https://assets.opensanctions.org/images/apple-touch-icon.png'
    },
    openGraph: {
      title: title,
      description: description,
      siteName: "OpenSanctions.org",
      images: [{ url: imageDefaultUrl }],
    },
    twitter: {
      creator: "@open_sanctions"
    },
    robots: {
      index: !noIndex
    },
    themeColor: THEME_COLOR,
  }
  return meta;
}


export function getContentMetadata(content: IContentBase): Metadata {
  return getGenerateMetadata({
    title: content.title,
    noIndex: content.no_index,
    description: content.summary || undefined,
    imageUrl: content.image_url
  })
}