"use server";
import { ActionStateResult } from "@/types/action-state";
import { getLocale } from "./intl";
import { fetchData } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { SpecializationFullData } from "@/types/Specialization";

type Fields = "name.en" | "name.ar";
export async function createSpecialization(
  state: ActionStateResult<Fields> | undefined,
  specializationData: {
    name: {
      en: string;
      ar: string;
    };
  }
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData("/specializations/create", {
    method: "POST",
    body: JSON.stringify(specializationData),
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
  revalidatePath("/specializations");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
export async function getSpecialization(specializationId: number) {
  const req = await fetchData("/specializations/show/" + specializationId);
  const res = await req.json();
  if (!req.ok) {
    throw new Error(res.message);
  }
  return res.data as SpecializationFullData;
}

export async function deleteSpecialization(
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
  const req = await fetchData(`/specializations/delete/${id}`, {
    method: "DELETE",
  });
  const res = await req.json();
  if (!req.ok) {
    return { type: "error", message: res.message };
  }
  revalidatePath("/specializations");
  return { type: "success", message: res.message };
}

export async function editSpecialization(
  state: ActionStateResult<Fields> | undefined,
  specializationData: {
    id?: number;
    name: SpecializationFullData["name"];
  }
): Promise<ActionStateResult<Fields>> {
  const locale = (await getLocale()) as "ar" | "en";

  const req = await fetchData(
    "/specializations/edit/" + specializationData.id,
    {
      method: "PUT",
      body: JSON.stringify({
        name: specializationData.name,
      }),
    }
  );
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
  revalidatePath("/specializations");
  return {
    success: {
      message: res.message,
    },
    locale,
  };
}
