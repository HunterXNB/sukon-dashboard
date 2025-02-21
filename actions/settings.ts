"use server";

import { ActionStateResult } from "@/types/action-state";
import { getLocale } from "./intl";
import { fetchData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
type Fields = "taxes" | "minor_age";
export async function editSettings(
  state: ActionStateResult<Fields> | undefined,
  settingsData: {
    [k: string]: unknown;
  }
): Promise<ActionStateResult<Fields>> {
  const locale = await getLocale();

  const req = await fetchData("/settings/edit", {
    method: "PUT",
    body: JSON.stringify(settingsData),
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
  revalidatePath("/settings");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
