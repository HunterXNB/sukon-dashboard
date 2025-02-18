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
import { deactivateUser } from "@/actions/users";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@/components/ui/dialog";
export const deactivatFormSchema = z.object({
  reason: z
    .string({
      required_error: "reasonRequiredError",
    })
    .trim()
    .min(5, "reasonMinLengthError"),
  id: z.number(),
});
function DeactivateUserForm({
  closeForm,
  id,
}: {
  closeForm: () => void;
  id: number;
}) {
  const [state, action, isPending] = useActionState(deactivateUser, undefined);

  const form = useForm<z.infer<typeof deactivatFormSchema>>({
    resolver: zodResolver(deactivatFormSchema),
    defaultValues: {
      reason: "",
      id,
    },
  });
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("usersTable.deactivateForm");
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
          (data: z.infer<typeof deactivatFormSchema>) => {
            startTransition(async () => {
              await action(data);
            });
          }
        )}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="usersTable.deactivateForm"
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

export default DeactivateUserForm;
