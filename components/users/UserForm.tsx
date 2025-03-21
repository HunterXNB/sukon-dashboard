import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
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
import { AppUserFull } from "@/types/user";
import { editUser } from "@/actions/users";
const formSchema = z.object({
  name: z
    .string({
      required_error: "nameRequiredError",
    })
    .min(6, "nameMinLengthError")
    .max(25, "nameMaxLengthError"),
  email: z
    .string({
      required_error: "emailRequiredError",
    })
    .email("emailInvalidError"),
});
function UserForm({
  closeForm,
  user,
}: {
  closeForm: () => void;
  user: AppUserFull;
}) {
  const [state, action, isPending] = useActionState(editUser, undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:
        [user.first_name, user.last_name].filter((n) => !!n).join(" ") || "_",
      email: user.email,
    },
  });
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("usersTable.form");
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
            const [first_name, last_name] = data.name.split(" ");
            await action({
              first_name,
              last_name,
              email: data.email,
              id: user.id,
            });
          });
        })}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="usersTable.form"
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
          translation="userssTable.form"
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("email")} {...field} />
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

export default UserForm;
