import { cookies } from "next/headers";
import queryString from "query-string";

import { API_URL } from "@/lib/constants";
import { fetchJsonUrl } from "@/lib/data";
import { IAccountInfo } from "@/lib/types";

export const loginUrl = `${API_URL}/auth/login`;

export async function getUser() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    return null;
  }

  return fetchUser(accessToken);
}

export async function fetchUser(accessToken: string) {
  const apiUrl = queryString.stringifyUrl({
    url: `${API_URL}/account`,
    query: { access_token: accessToken },
  });

  const user = await fetchJsonUrl<IAccountInfo>(apiUrl, false);
  if (!user) {
    throw new Error("Error fetching user");
  }

  return user;
}
