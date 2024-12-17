import {
  getUserToken,
  handleForbidden,
  handleUnauthenticated,
} from "@/actions/auth";
import { getLocale } from "@/actions/intl";
import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchData(
  endpoint: RequestInfo | URL | string,
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
    ["x-api-key"]: process.env.NEXT_PUBLIC_API_KEY as string,
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Accept-Language": locale,
    "Content-Type": "application/json",
    ...requestInit.headers,
  };
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    requestInit
  );
  if (request.status === 401) {
    await handleUnauthenticated(fromLogin);
  } else if (request.status === 403) {
    await handleForbidden();
  }
  return request;
}
