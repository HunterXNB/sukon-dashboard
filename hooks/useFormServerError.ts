"use client";

import { ActionStateResult } from "@/types/action-state";
import { useLocale } from "next-intl";
import { useEffect } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export function useFormServerError<T extends FieldValues>(
  form: UseFormReturn<T>,
  actionState: ActionStateResult<Path<T>> | undefined
) {
  const locale = useLocale();
  useEffect(() => {
    if (actionState && "error" in actionState) {
      if (actionState.error.type === "validation") {
        const errorsArr = Object.entries(actionState?.error.fields) as [
          Path<T>,
          string[]
        ][];
        errorsArr.forEach(([key, err]) => {
          form.setError(key, {
            message: err?.[0],
            type: "backend",
          });
        });
      }
    }
  }, [actionState, form]);
  useEffect(() => {
    if (actionState?.locale !== locale) {
      const formCustomErrors = Object.entries(form.formState.errors)
        .filter(([, err]) => err?.type === "backend")
        .map(([name]) => name);
      if (formCustomErrors) {
        form.clearErrors(formCustomErrors as []);
      }
    }
  }, [locale, actionState, form]);
}
