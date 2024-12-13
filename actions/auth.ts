"use server";

import { fetchData } from "@/lib/utils";
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
        headers: {
          "Accept-Language": locale,
        },
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

export async function logout(fromLogin: boolean = false) {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  if (!fromLogin) return redirect("/login");
}

export async function handleForbidden() {
  return redirect("/");
}
