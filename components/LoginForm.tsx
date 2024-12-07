"use client";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";

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
import { login } from "@/actions/auth";
function LoginForm() {
  const t = useTranslations("loginPage.form");
  const locale = useLocale();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, action, isPending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.type === "validation") {
      const errorsArr = Object.entries(state.data) as [
        "email" | "password",
        string[]
      ][];
      errorsArr.forEach(([key, err]) => {
        form.setError(key, {
          message: err[0],
          type: "backend",
        });
      });
    }
  }, [state, form]);
  useEffect(() => {
    if (state?.locale !== locale) {
      form.clearErrors();
    }
  }, [locale, state, form]);
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(() => {
            startTransition(() => {
              action(new FormData(formRef.current!));
            });
          })(e);
        }}
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
        {state?.type === "global" && state.locale === locale && (
          <p className="text-destructive">{state.message}</p>
        )}
        <Button disabled={isPending} className="w-full" type="submit">
          {t("loginButton")}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
