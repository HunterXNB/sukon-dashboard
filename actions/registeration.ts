"use server";

import { fetchData } from "@/lib/utils";
import { RegistrationFullData } from "@/types/Registration";
import { revalidatePath } from "next/cache";

export async function getRegisteration(registerationId: number) {
  const req = await fetchData(
    "/providers/registerations/show/" + registerationId
  );
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res.data as RegistrationFullData;
}

export async function deleteRegisteration(
  state:
    | {
        type: "success" | "error";
        message: string;
      }
    | undefined,
  id: number
): Promise<{
  type: "success" | "error";
  message: string;
}> {
  const req = await fetchData(`/providers/registerations/delete/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/registerations");
  return { type: "success", message: res.message };
}
export async function approveRegisteration(
  state:
    | {
        type: "success" | "error";
        message: string;
      }
    | undefined,
  id: number
): Promise<{
  type: "success" | "error";
  message: string;
}> {
  const req = await fetchData(`/providers/registerations/${id}/approve`, {
    method: "PATCH",
  });

  const res = await req.json();

  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/registerations");
  return { type: "success", message: res.message };
}
export async function rejectRegisteration(
  state:
    | {
        type: "success" | "error";
        message: string;
      }
    | undefined,
  id: number
): Promise<{
  type: "success" | "error";
  message: string;
}> {
  const req = await fetchData(`/providers/registerations/${id}/reject`, {
    method: "PATCH",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/registerations");
  return { type: "success", message: res.message };
}
