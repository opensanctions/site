
import Script from "next/script";

type StructuredDataProps = {
  data?: any
}

export default function StructuredData({ data }: StructuredDataProps) {
  if (!data) {
    return null;
  }
  return (
    <Script type="application/ld+json" dangerouslySetInnerHTML={{ '__html': JSON.stringify(data) }} />
  )
}

