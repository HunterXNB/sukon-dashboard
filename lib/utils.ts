import { handleForbidden, logout } from "@/actions/auth";
import { clsx, type ClassValue } from "clsx";
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
  requestInit.headers = {
    ...requestInit.headers,
    ["x-api-key"]: process.env.NEXT_PUBLIC_API_KEY as string,
    Accept: "application/json",
  };

  const request = await fetch(url, requestInit);
  if (request.status === 401) {
    await logout(fromLogin);
  } else if (request.status === 403) {
    await handleForbidden();
  }
  return request;
}
