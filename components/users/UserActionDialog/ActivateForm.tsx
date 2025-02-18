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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { useForm } from "react-hook-form";
import { activateUser } from "@/actions/users";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DialogClose } from "@/components/ui/dialog";
export const activatFormSchema = z.object({
  reason: z
    .union([z.string().trim().min(5, "reasonMinLengthError"), z.literal("")])
    .transform((value) => (value === "" ? undefined : value)),
  sendNotification: z.boolean().default(true),
  id: z.number(),
});
function ActivateUserForm({
  closeForm,
  id,
}: {
  closeForm: () => void;
  id: number;
}) {
  const [state, action, isPending] = useActionState(activateUser, undefined);

  const form = useForm<z.infer<typeof activatFormSchema>>({
    resolver: zodResolver(activatFormSchema),
    defaultValues: {
      reason: "",
      sendNotification: true,
      id,
    },
  });
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("usersTable.activateForm");
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
        onSubmit={form.handleSubmit(
          (data: z.infer<typeof activatFormSchema>) => {
            startTransition(async () => {
              await action(data);
            });
          }
        )}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="usersTable.activateForm"
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("reason")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("reason")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sendNotification"
          translation="usersTable.activateForm"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>{t("sendNotification")}</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === true}
                    onCheckedChange={(checked) => {
                      field.onChange(checked ? true : false);
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
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"}>
              {locale === "ar" ? "إغلاق" : "Close"}
            </Button>
          </DialogClose>
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

export default ActivateUserForm;
