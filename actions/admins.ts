"use server";
import { fetchData } from "@/lib/utils";
import { createAdminFormSchema } from "@/schemas/adminFormSchema";
import { ActionStateResult } from "@/types/action-state";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
type Fields =
  | "name"
  | "email"
  | "mobile"
  | "is_active"
  | "password"
  | "role_ids";
export async function createAdmin(
  state: ActionStateResult<Fields> | undefined,
  roleData: Omit<
    z.infer<typeof createAdminFormSchema>,
    "avatar" | "passwordConfirm"
  >
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData("/admin-users/create", {
    method: "POST",
    body: JSON.stringify(roleData),
  });
  const res = await req.json();
  if (!req.ok) {
    if (req.status === 400) {
      return {
        error: {
          type: "validation",
          fields: res.data,
          message: res.message,
        },
        locale,
      };
    } else {
      return {
        error: {
          type: "global",
          message: res.message,
        },
        locale,
      };
    }
  }
  revalidatePath("/admin");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
