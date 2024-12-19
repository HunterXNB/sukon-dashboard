import { setAuthToken } from "@/actions/auth";
import { fetchData } from "@/lib/utils";
import { ActionStateResult } from "@/types/action-state";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const locale = useLocale() as "ar" | "en";
  const router = useRouter();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async function login(credentials: {
      email: string;
      password: string;
      type: "admin";
    }): Promise<ActionStateResult<"email" | "password"> | undefined> {
      try {
        const request = await fetchData(
          `/auth/admin/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
          },
          true
        );

        if (!request.ok) {
          if (request.status !== 422)
            throw new Error((await request.json()).message);
          throw await request.json();
        }
        const response = await request.json();
        await setAuthToken(response.data.token);
        router.replace("/");
      } catch (error) {
        if (error instanceof Error) {
          return {
            error: {
              type: "global",
              message: error.message,
            },
            locale,
          };
        } else {
          const err = error as
            | {
                message: string;
                data: {
                  [key in "password" | "email"]: string[];
                };
              }
            | {
                message: string;
                errors: {
                  [key in "password" | "email"]: string[];
                };
              };
          return {
            error: {
              type: "validation",
              message: err.message,
              fields: "data" in err ? err.data : err.errors,
            },
            locale,
          };
        }
      }
    },
  });
}
