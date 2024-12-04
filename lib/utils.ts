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
  }
): Promise<Response> {
  if (!requestInit.headers) requestInit.headers = {};
  // @ts-ignore
  requestInit.headers["x-api-key"] = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(url, requestInit);
  if (response.status === 401) {
    // logout
  }
  return response;
}
