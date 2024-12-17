"use server";

import { fetchData } from "@/lib/utils";
import { ActionStateResult } from "@/types/action-state";
import { User } from "@/types/user";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = async (
  state: ActionStateResult<"email" | "password"> | undefined,
  formData: {
    email: string;
    password: string;
    type: "admin";
  }
): Promise<ActionStateResult<"email" | "password"> | undefined> => {
  let isLoggedIn = false;
  const locale = (await getLocale()) as "ar" | "en";
  try {
    const request = await fetchData(
      `/auth/admin/login`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      },
      true
    );

    if (!request.ok) {
      if (request.status !== 422)
        throw new Error((await request.json()).message);
      throw await request.json();
    }
    const response = await request.json();
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token, {
      maxAge: 30 * 24 * 60 * 60,
    });
    isLoggedIn = true;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return {
        error: {
          type: "global",
          message: error.message,
        },
        locale,
      };
    } else {
      const err = error as {
        message: string;
        data: {
          [key in "password" | "email"]: string[];
        };
      };
      return {
        error: {
          type: "validation",
          message: err.message,
          fields: err.data,
        },
        locale,
      };
    }
  } finally {
    if (isLoggedIn) {
      return redirect("/");
    }
  }
};

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return redirect("/login");
}
export async function handleUnauthenticated(fromLogin: boolean = false) {
  if (!fromLogin) return redirect("/login");
}

export async function handleForbidden() {
  return redirect("/");
}

export async function getUserToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}
export async function isAuthenticated() {
  const token = await getUserToken();
  if (token) {
    const req = await fetchData(`/auth/me`);
    if (req.ok) {
      return true;
    }
  }
  return false;
}

export async function getUser() {
  const req = await fetchData(`/auth/view-profile`);
  if (req.ok) {
    return (await req.json()).data.user as User;
  }
  return;
}
