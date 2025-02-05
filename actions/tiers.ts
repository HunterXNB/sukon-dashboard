"use server";

import { ActionStateResult } from "@/types/action-state";
import { getLocale } from "./intl";
import { fetchData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { TierFullData } from "@/types/Tiers";
type Fields =
  | "name"
  | "description"
  | "usd_price"
  | "egp_price"
  | "permission_ids"
  | "commission";
export async function getTier(tierId: number) {
  const req = await fetchData("/tiers/show/" + tierId);
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res.data as TierFullData;
}
export async function createTier(
  state: ActionStateResult<Fields> | undefined,
  tierData: {
    name: string;
    permission_ids: number[];
    usd_price?: number;
    egp_price?: number;
    description?: string;
    commission?: number;
    id?: number;
  }
): Promise<ActionStateResult<Fields>> {
  const locale = await getLocale();

  const req = await fetchData("/tiers/create", {
    method: "POST",
    body: JSON.stringify(tierData),
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
  revalidatePath("/tiers");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
export async function editTier(
  state: ActionStateResult<Fields> | undefined,
  tierData: {
    name?: string;
    permission_ids?: number[];
    id?: number;
    description?: string;
    usd_price?: number;
    egp_price?: number;
    commission?: number;
  }
): Promise<ActionStateResult<Fields>> {
  const locale = await getLocale();

  const req = await fetchData("/tiers/edit/" + tierData.id, {
    method: "PUT",
    body: JSON.stringify(tierData),
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
  revalidatePath("/tiers");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
export async function deleteTier(
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
  const req = await fetchData(`/tiers/delete/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/tiers");
  return { type: "success", message: res.message };
}
