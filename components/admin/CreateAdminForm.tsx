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

import { createAdminFormSchema } from "@/schemas/adminFormSchema";
import { createAdmin } from "@/actions/admins";
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";

import RolesSelector from "./RolesSelector";
import PasswordInput from "../PasswordInput";

function CreateAdminForm({ closeForm }: { closeForm: () => void }) {
  const [state, action, isPending] = useActionState(createAdmin, undefined);
  const formSchema = createAdminFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      is_active: 0,
      email: "",
      password: "",
      mobile: "",
      first_name: "",
      passwordConfirm: "",
    },
  });
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("adminsTable.form");
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
      closeForm();
    }
  }, [state, toast, closeForm]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: z.infer<typeof formSchema>) => {
          startTransition(async () => {
            const {
              email,
              is_active,
              password,
              role_id,
              first_name,
              last_name,
              mobile,
            } = data;
            await action({
              email,
              is_active,
              password,
              role_id,
              first_name,
              last_name,
              mobile,
            });
          });
        })}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="adminsTable.form"
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("first_name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("first_name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          translation="adminsTable.form"
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("last_name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("last_name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          translation="adminsTable.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">{t("email")}</FormLabel>
              <Input placeholder={t("email")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role_id"
          translation="adminsTable.form.selector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("roles")}</FormLabel>
              <FormControl>
                <RolesSelector field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          translation="adminsTable.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">{t("password")}</FormLabel>
              <PasswordInput placeholder={t("password")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          translation="adminsTable.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">
                {t("passwordConfirm")}
              </FormLabel>
              <PasswordInput placeholder={t("passwordConfirm")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          translation="adminsTable.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">{t("mobile")}</FormLabel>
              <Input placeholder={t("mobile")} {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          translation="adminsTable.form"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>{t("status")}</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === 1}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? 1 : 0);
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {state?.locale === locale &&
          "error" in state &&
          state.error.type === "global" && (
            <p className="text-destructive">{state.error.message}</p>
          )}
        <div className="flex justify-end">
          <Button disabled={isPending} type="submit">
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

export default CreateAdminForm;
