"use client";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLocale, useTranslations } from "next-intl";
import { useFormServerError } from "@/hooks/useFormServerError";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { editSettings } from "@/actions/settings";
import { useUser } from "@/context/AuthContext";
const settingsFormSchema = z.object({
  taxes: z
    .string({
      required_error: "taxesRequiredError",
    })
    // @ts-ignore
    .refine((value) => !isNaN(value), "taxesInvalidError"),
  minor_age: z.coerce
    .number({
      required_error: "minorAgeRequiredError",
    })
    .int("minorAgeInvalidError")
    .positive("minorAgeInvalidError")
    .min(1, "minorAgeInvalidError"),
});
export type SettingsFormData = z.infer<typeof settingsFormSchema>;

function SettingsForm({ settingsData }: { settingsData: SettingsFormData }) {
  const [state, action, isPending] = useActionState(editSettings, undefined);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      taxes: settingsData.taxes,
      minor_age: settingsData.minor_age ?? 1,
    },
  });
  const user = useUser();
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("settings.form");
  useFormServerError(form, state);
  useEffect(() => {
    if (
      state &&
      "success" in state &&
      state.success.message &&
      !toasted.current
    ) {
      toast({
        title: state.success.message,
      });
      toasted.current = true;
    }
  }, [state, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: SettingsFormData) => {
          startTransition(async () => {
            await action(data);
          });
        })}
        className="space-y-8 w-full"
      >
        <div className="flex gap-2 items-center *:flex-1 max-md:flex-col">
          <FormField
            control={form.control}
            translation="settings.form"
            name="taxes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("taxes")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={0.1}
                    placeholder={t("taxes")}
                    disabled={
                      !user.permissions?.Settings.includes("settings-edit")
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            translation="settings.form"
            name="minor_age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("minor_age")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    placeholder={t("minor_age")}
                    disabled={
                      !user.permissions?.Settings.includes("settings-edit")
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {state?.locale === locale &&
          "error" in state &&
          state.error.type === "global" && (
            <p className="text-destructive">{state.error.message}</p>
          )}
        <div className="flex justify-end">
          <Button
            disabled={
              isPending || !user.permissions?.Settings.includes("settings-edit")
            }
            type="submit"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> {t("submitLoadingBtn")}
              </>
            ) : (
              t("submitBtn")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SettingsForm;
