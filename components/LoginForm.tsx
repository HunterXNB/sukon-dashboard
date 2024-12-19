"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import PasswordInput from "./PasswordInput";
import { useFormServerError } from "@/hooks/useFormServerError";
import useLogin from "@/hooks/useLogin";
function LoginForm() {
  const t = useTranslations("loginPage.form");
  const locale = useLocale();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      type: "admin",
    },
  });
  const { data, mutate, isPending, status } = useLogin();
  useFormServerError(form, data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => {
          mutate(v);
        })}
        className="space-y-8"
      >
        <FormField
          translation="loginPage.form"
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("emailLabel")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          translation="loginPage.form"
          control={form.control}
          name="password"
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
        {data?.locale === locale &&
          "error" in data &&
          data.error.type === "global" && (
            <p className="text-destructive">{data.error.message}</p>
          )}
        <Button
          disabled={isPending || (status === "success" && data === undefined)}
          className="w-full"
          type="submit"
        >
          {t("loginButton")}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
