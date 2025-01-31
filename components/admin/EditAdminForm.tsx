import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
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
import { Admin } from "@/types/Admin";
import { editAdminFormSchema } from "@/schemas/adminFormSchema";
import { editAdmin } from "@/actions/admins";
import { useForm } from "react-hook-form";
import { Switch } from "../ui/switch";

import RolesSelector from "./RolesSelector";
import PasswordInput from "../PasswordInput";

function EditAdminForm({
  closeForm,
  adminData,
}: {
  closeForm: () => void;
  adminData: Admin;
}) {
  const [admin] = useState(adminData);
  const [state, action, isPending] = useActionState(editAdmin, undefined);
  const formSchema = editAdminFormSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_id: admin.user.role
        ? [
            {
              label: admin.user.role.name,
              value: admin.user.role.id,
            },
          ]
        : [],
      is_active: admin.user.is_active ? 1 : 0,
      email: admin.user.email,
      mobile: admin.user.mobile,
      first_name: admin.user.first_name ?? "",
      last_name: admin.user.last_name ?? undefined,
      password: "",
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
            const { role_id } = data;
            const body: Record<string, unknown> = {};
            const dirtyFields = Object.keys(
              form.formState.dirtyFields
            ) as (keyof typeof data)[];
            for (const val of dirtyFields) {
              body[val] = data[val];
            }
            if (body.hasOwnProperty("role_id")) {
              body.role_id = role_id[0]?.value;
            }
            await action({ ...body, id: admin?.user?.id });
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

export default EditAdminForm;
