"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import PasswordInput from "./PasswordInput";
const emailSchema = loginFormSchema.pick({
  email: true,
});

function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  return email === "" ? (
    <SendEmailForm setEmail={setEmail} />
  ) : (
    <ChangePasswordForm email={email} />
  );
}

function SendEmailForm({ setEmail }: { setEmail: (value: string) => void }) {
  const t = useTranslations("resetPasswordPage.form");
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof emailSchema>) {
    setEmail(values.email);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          translation="resetPasswordPage.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("emailLabel")} {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>{t("emailFormDescription")}</FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          {t("sendCode")}
        </Button>
      </form>
    </Form>
  );
}
const changePasswordFormSchema = loginFormSchema
  .extend({
    code: z.string({
      required_error: "codeRequiredError",
    }),
    passwordConfirm: z.string({
      required_error: "passwordConfirmRequiredError",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "passwordNotMatchError",
    path: ["passwordConfirm"],
  });

function ChangePasswordForm({ email }: { email: string }) {
  const t = useTranslations("resetPasswordPage.form");
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      email,
    },
  });
  function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    console.log("onSubmit", values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          translation="resetPasswordPage.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("emailLabel")} {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          translation="resetPasswordPage.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("codeLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("codeLabel")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          translation="resetPasswordPage.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordLabel")}</FormLabel>
              <FormControl>
                <PasswordInput placeholder={t("passwordLabel")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          translation="resetPasswordPage.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("passwordConfirmLabel")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("passwordConfirmLabel")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {t("resetPassword")}
        </Button>
      </form>
    </Form>
  );
}
export default ResetPasswordForm;
