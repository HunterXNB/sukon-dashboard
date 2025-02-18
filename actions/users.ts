"use server";

import { activatFormSchema } from "@/components/users/UserActionDialog/ActivateForm";
import { fetchData } from "@/lib/utils";
import { ActionStateResult } from "@/types/action-state";
import { AppUserFull } from "@/types/user";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getLocale } from "./intl";
import { deactivatFormSchema } from "@/components/users/UserActionDialog/DeactivateForm";

export async function getUser(userId: number) {
  const req = await fetchData("/users/show/" + userId);
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res.data.user as AppUserFull;
}
export async function deleteUser(
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
  const req = await fetchData(`/users/delete/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/users");
  return { type: "success", message: res.message };
}
type ActivateFields = "reason" | "sendNotification";
export async function activateUser(
  state: ActionStateResult<ActivateFields> | undefined,
  activationDetails: z.infer<typeof activatFormSchema>
): Promise<ActionStateResult<ActivateFields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData(`/users/${activationDetails.id}/activate`, {
    method: "PATCH",
    body: JSON.stringify({
      reason: activationDetails.reason,
      sendNotification: activationDetails.sendNotification,
    }),
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
  revalidatePath("/users");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
export async function deactivateUser(
  state: ActionStateResult<"reason"> | undefined,
  activationDetails: z.infer<typeof deactivatFormSchema>
): Promise<ActionStateResult<"reason">> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData(`/users/${activationDetails.id}/deactivate`, {
    method: "PATCH",
    body: JSON.stringify({
      reason: activationDetails.reason,
    }),
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
  revalidatePath("/users");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
