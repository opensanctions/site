import { redirect } from "next/navigation";

type RecentPageProps = {
  params: { name: string }
}

export default function Page({ params }: RecentPageProps) {
  redirect(`/datasets/${params['name']}/#recents`)
  return null;
}