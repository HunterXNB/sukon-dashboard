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
import {
  createSpecialization,
  editSpecialization,
} from "@/actions/specializations";
import { SpecializationFullData } from "@/types/Specialization";
const formSchema = z.object({
  name: z.object({
    en: z
      .string({ required_error: "enNameRequired" })
      .trim()
      .min(3, "enNameMinLength"),
    ar: z
      .string({ required_error: "arNameRequired" })
      .trim()
      .min(3, "arNameMinLength"),
  }),
});
function SpecializationForm({
  closeForm,
  specialization,
}: {
  closeForm: () => void;
  specialization?: SpecializationFullData;
}) {
  const [state, action, isPending] = useActionState(
    specialization ? editSpecialization : createSpecialization,
    undefined
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: {
        en: specialization?.name.en ?? "",
        ar: specialization?.name.ar ?? "",
      },
    },
  });
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("specializationsTable.form");
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
            if (specialization) {
              await action({ id: specialization.id, ...data });
            } else {
              await action(data);
            }
          });
        })}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="specializationsTable.form"
          name="name.en"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameEn")}</FormLabel>
              <FormControl>
                <Input placeholder={t("nameEn")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          translation="specializationsTable.form"
          name="name.ar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameAr")}</FormLabel>
              <FormControl>
                <Input placeholder={t("nameAr")} {...field} />
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

export default SpecializationForm;
