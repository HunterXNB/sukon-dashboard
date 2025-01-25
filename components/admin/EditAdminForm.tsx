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
      role_ids: admin.user.role
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
      name: admin.user.name,
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
            const { email, is_active, password, role_ids, name, mobile } = data;
            await action({
              email,
              is_active,
              password,
              role_ids: role_ids[0]?.value ? [role_ids[0]?.value] : [],
              name,
              mobile,
              id: admin?.user?.id,
            });
          });
        })}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="adminsTable.form"
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name")} {...field} />
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
          name="role_ids"
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
