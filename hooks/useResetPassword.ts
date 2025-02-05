"use client";
import { fetchData } from "@/lib/utils";
import { ActionStateResult } from "@/types/action-state";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
type ResetPasswordFields = "email" | "new_password" | "code";

export default function useResetPassword() {
  const locale = useLocale() as "ar" | "en";

  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async function ResetPassword(userData: {
      email: string;
      new_password: string;
      code: string;
    }): Promise<ActionStateResult<ResetPasswordFields> | undefined> {
      const req = await fetchData("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(userData),
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
      return {
        success: {
          message: res.message,
        },
        locale,
      };
    },
  });
}
