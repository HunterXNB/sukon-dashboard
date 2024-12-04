"use server";

import { fetchData } from "@/lib/utils";
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
    }
  | ({
      type: "validation";
    } & TError);
export const login = async (
  state: LoginStateType | undefined,
  formData: FormData
): Promise<LoginStateType | undefined> => {
  let isLoggedIn = false;

  try {
    const request = await fetchData(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!request.ok) {
      if (request.status === 404) {
        throw new Error("Wrong email or password");
      } else {
        throw await request.json();
      }
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
      };
    } else {
      return {
        type: "validation",
        ...(error as TError),
      };
    }
  } finally {
    if (isLoggedIn) {
      return redirect("/");
    }
  }
};
