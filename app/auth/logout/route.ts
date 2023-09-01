import { COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  cookies().delete(COOKIE_NAME);

  return redirect("/");
}
