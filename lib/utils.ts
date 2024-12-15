import {
  getUserToken,
  handleForbidden,
  handleUnauthenticated,
} from "@/actions/auth";
import { clsx, type ClassValue } from "clsx";
import { getLocale } from "next-intl/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData(
  url: RequestInfo | URL | string,
  requestInit: RequestInit = {
    method: "GET",
    headers: {},
  },
  fromLogin: boolean = false
): Promise<Response> {
  if (!requestInit.headers) requestInit.headers = {};
  const token = await getUserToken();
  const locale = await getLocale();
  requestInit.headers = {
    ...requestInit.headers,
    ["x-api-key"]: process.env.NEXT_PUBLIC_API_KEY as string,
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Accept-Language": locale,
  };

  const request = await fetch(url, requestInit);
  if (request.status === 401) {
    await handleUnauthenticated(fromLogin);
  } else if (request.status === 403) {
    await handleForbidden();
  }
  return request;
}
