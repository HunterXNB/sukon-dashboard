"use server";

import { fetchData } from "@/lib/utils";

export async function createRole(formData: FormData) {
  const roleData = Object.fromEntries(formData.entries());
  const req = await fetchData("/roles/create", {
    method: "POST",
    body: JSON.stringify(roleData),
  });
  const res = await req.json();
  if (!req.ok) throw new Error(res.message);
  return res;
}
