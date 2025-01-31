import { changePassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import PasswordInput from "./PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { useToast } from "@/hooks/use-toast";
import { useFormServerError } from "@/hooks/useFormServerError";
const changePasswordFormSchema = z
  .object({
    current_password: loginFormSchema.shape.password,
    password: loginFormSchema.shape.password,
    password_confirmation: z.string({
      required_error: "passwordConfirmRequiredError",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "passwordNotMatchError",
    path: ["password_confirmation"],
  });
export default function ChangePasswordDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const locale = useLocale();
  const t = useTranslations("changePasswordDialog");
  const [state, action, isPending] = useActionState(changePassword, undefined);
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });
  const { toast } = useToast();
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
      setIsOpen(false);
    }
  }, [state, toast, setIsOpen]);
  function onSubmit(data: z.infer<typeof changePasswordFormSchema>) {
    startTransition(async function () {
      await action(data);
    });
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        dir={locale === "en" ? "ltr" : "rtl"}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="current_password"
              translation="changePasswordDialog"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("currentPassword")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("currentPassword")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              translation="changePasswordDialog"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("newPassword")}</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder={t("newPassword")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              translation="changePasswordDialog"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPassword")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("confirmPassword")}
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
              {isPending ? t("loading") : t("trigger")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
