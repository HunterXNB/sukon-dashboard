"use server";

import { fetchData } from "@/lib/utils";
import { User } from "@/types/user";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
type TError = {
  message: string;
  data: {
    email?: string[];
    password?: string[];
  };
};
type LoginStateType =
  | {
      type: "global";
      message: string;
      locale: string;
    }
  | ({
      type: "validation";
      locale: string;
    } & TError);
export const login = async (
  state: LoginStateType | undefined,
  formData: FormData
): Promise<LoginStateType | undefined> => {
  let isLoggedIn = false;
  const locale = await getLocale();
  try {
    const request = await fetchData(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
      {
        method: "POST",
        body: formData,
      },
      true
    );

    if (!request.ok) {
      if (request.status === 401)
        throw new Error((await request.json()).message);
      throw await request.json();
    }
    const response = await request.json();
    const cookieStore = await cookies();
    cookieStore.set("token", response.data.token);
    isLoggedIn = true;
  } catch (error) {
    if (error instanceof Error) {
      return {
        type: "global",
        message: error.message,
        locale,
      };
    } else {
      return {
        type: "validation",
        ...(error as TError),
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
    const req = await fetchData(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`);
    if (req.ok) {
      return true;
    }
  }
  return false;
}

export async function getUser() {
  const req = await fetchData(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/view-profile`
  );
  if (req.ok) {
    return (await req.json()).data.user as User;
  }
  return;
}
