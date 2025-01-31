"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { useLocale, useTranslations } from "next-intl";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import PasswordInput from "./PasswordInput";
import { ResetPassword, sendResetPasswordEmail } from "@/actions/auth";
import { useFormServerError } from "@/hooks/useFormServerError";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
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
  const [state, action, isPending] = useActionState(
    sendResetPasswordEmail,
    undefined
  );
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();
  const locale = useLocale();
  const toasted = useRef(false);
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
      setEmail(form.getValues().email);
    }
  }, [state, toast, setEmail, form]);

  function onSubmit(data: z.infer<typeof emailSchema>) {
    startTransition(async () => {
      await action(data);
    });
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
        {state?.locale === locale &&
          "error" in state &&
          state.error.type === "global" && (
            <p className="text-destructive">{state.error.message}</p>
          )}
        <Button disabled={isPending} type="submit" className="self-end">
          {t("sendCode")}
        </Button>
      </form>
    </Form>
  );
}
const changePasswordFormSchema = emailSchema
  .extend({
    code: z.string({
      required_error: "codeRequiredError",
    }),
    passwordConfirm: z.string({
      required_error: "passwordConfirmRequiredError",
    }),
    new_password: loginFormSchema.shape.password,
  })
  .refine((data) => data.new_password === data.passwordConfirm, {
    message: "passwordNotMatchError",
    path: ["passwordConfirm"],
  });

function ChangePasswordForm({ email }: { email: string }) {
  const t = useTranslations("resetPasswordPage.form");
  const [state, action, isPending] = useActionState(ResetPassword, undefined);
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      email,
    },
  });
  const { toast } = useToast();
  const locale = useLocale();
  const toasted = useRef(false);
  const router = useRouter();
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
      router.push("/login");
    }
  }, [state, toast, router]);
  function onSubmit(data: z.infer<typeof changePasswordFormSchema>) {
    startTransition(async function () {
      await action(data);
    });
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
          name="new_password"
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
        {state?.locale === locale &&
          "error" in state &&
          state.error.type === "global" && (
            <p className="text-destructive">{state.error.message}</p>
          )}
        <Button disabled={isPending} type="submit" className="w-full">
          {t("resetPassword")}
        </Button>
      </form>
    </Form>
  );
}
export default ResetPasswordForm;
