import { fetchAccount } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get("access_token");
  if (!accessToken) {
    return new Response("Expected access_token query parameter", {
      status: 400,
    });
  }

  const account = await fetchAccount(accessToken);
  if (!account) {
    return new Response("Invalid access_token", { status: 403 });
  }

  cookies().set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return redirect("/account/");
}
