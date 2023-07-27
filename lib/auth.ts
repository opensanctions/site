import { cookies } from "next/headers";
import queryString from "query-string";

import { API_URL } from "@/lib/constants";
import { fetchJsonUrl } from "@/lib/data";
import { IAccountInfo } from "@/lib/types";

export async function getAccount() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    return null;
  }

  return fetchAccount(accessToken);
}

export async function fetchAccount(accessToken: string) {
  const apiUrl = queryString.stringifyUrl({
    url: `${API_URL}/account`,
    query: { access_token: accessToken },
  });

  return await fetchJsonUrl<IAccountInfo>(apiUrl, false);
}
