"use server";

import { fetchData } from "@/lib/utils";
import { ActionStateResult } from "@/types/action-state";
import { RoleFullData } from "@/types/role";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

type Fields = "name" | "permissions";
export async function createRole(
  state: ActionStateResult<Fields> | undefined,
  roleData: {
    name: string;
    permissions: number[];
    id?: number;
  }
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData("/roles/create", {
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
  revalidatePath("/roles");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
export async function getRole(roleId: number) {
  const req = await fetchData("/roles/show/" + roleId);
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res.data as RoleFullData;
}
export async function editRole(
  state: ActionStateResult<Fields> | undefined,
  roleData: {
    name?: string;
    permissions?: number[];
    id?: number;
  }
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData("/roles/edit/" + roleData.id, {
    method: "PUT",
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
  revalidatePath("/roles");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
export async function toggleRoleActiveStatus(
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
  const req = await fetchData(`/roles/${id}/activation/toggle`, {
    method: "PUT",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/roles");
  return { type: "success", message: res.message };
}
export async function deleteRole(
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
  const req = await fetchData(`/roles/delete/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/roles");
  return { type: "success", message: res.message };
}
