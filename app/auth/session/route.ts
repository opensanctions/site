import { COOKIE_NAME } from "@/lib/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const maxAge = request.nextUrl.searchParams.get("maxage");
  if (!!token) {
    const options = { maxAge: parseInt(maxAge || '', 10) || 3600, path: "/" }
    cookies().set(COOKIE_NAME, token, options)
  }
  return redirect("/account/");
}
