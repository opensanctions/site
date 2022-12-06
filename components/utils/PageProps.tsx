
export type ServerSearchParams = { [key: string]: string | string[] | undefined }

export type PageProps = {
  searchParams?: ServerSearchParams
}