import { cookies } from "next/headers";
import queryString from "query-string";

import { API_URL, COOKIE_NAME } from "@/lib/constants";
import { fetchJsonUrl } from "@/lib/data";
import { IUserInfo } from "@/lib/types";

export const LOGIN_URL = `${API_URL}/auth/login`;

export function getAccessToken(): string | null {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_NAME)?.value;
  if (!accessToken) {
    return null;
  }
  return accessToken;
}

export async function getUserInfo(): Promise<IUserInfo | null> {
  const accessToken = getAccessToken();
  const apiUrl = queryString.stringifyUrl({
    url: `${API_URL}/billing/account`,
    query: { access_token: accessToken },
  });
  const user = await fetchJsonUrl<IUserInfo>(apiUrl, false);
  if (!user) {
    return null;
  }
  return user;
}
