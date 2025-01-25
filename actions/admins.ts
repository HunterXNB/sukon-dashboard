"use server";
import { fetchData } from "@/lib/utils";
import {
  createAdminFormSchema,
  editAdminFormSchema,
} from "@/schemas/adminFormSchema";
import { ActionStateResult } from "@/types/action-state";
import { Admin } from "@/types/Admin";
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
  adminData: Omit<z.infer<typeof createAdminFormSchema>, "passwordConfirm">
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData("/admin-users/create", {
    method: "POST",
    body: JSON.stringify(adminData),
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
export async function toggleAdminActiveStatus(
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
  const req = await fetchData(`/admin-users/${id}/activation/toggle`, {
    method: "PUT",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/admin");
  return { type: "success", message: res.message };
}
export async function deleteAdmin(
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
  const req = await fetchData(`/admin-users/delete/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/admins");
  return { type: "success", message: res.message };
}
export async function getAdmin(adminId: number) {
  const req = await fetchData("/admin-users/show/" + adminId);
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res.data as Admin;
}

export async function editAdmin(
  state: ActionStateResult<Fields> | undefined,
  adminData: Partial<
    Omit<z.infer<typeof editAdminFormSchema>, "passwordConfirm" | "role_ids">
  > & {
    id: number;
    role_ids: number[];
  }
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData("/admin-users/edit/" + adminData.id, {
    method: "PUT",
    body: JSON.stringify(adminData),
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
