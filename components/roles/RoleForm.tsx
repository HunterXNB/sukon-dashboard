import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { usePermissionsList } from "@/context/PermissionsContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createRole, editRole } from "@/actions/roles";
import { useLocale, useTranslations } from "next-intl";
import { useFormServerError } from "@/hooks/useFormServerError";
import { Checkbox } from "../ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
// import { PermissionName } from "@/types/Permission";
import { useToast } from "@/hooks/use-toast";
import { RoleFullData } from "@/types/role";

// const permissionNames: {
//   [key in PermissionName]: string;
// } = {
//   "roles-show": "Show roles",
//   "roles-create": "Create a new role",
//   "roles-delete": "Delete roles",
//   "roles-edit": "Edit roles",
//   "roles-list": "List roles",
//   "roles-activation-toggle": "Toggle activation status",
//   "admin-users-create": "Add new admin user",
//   "admin-users-show": "Show admin user",
//   "admin-users-delete": "Delete admin user",
//   "admin-users-edit": "Edit admin user",
//   "admin-users-list": "List admin users",
//   "admin-users-activation-toggle": "Toggle admin user activation status",
// } as const;

const formSchema = z.object({
  name: z
    .string({
      required_error: "nameRequiredError",
    })
    .min(2, "nameRequiredError"),
  permissions: z.array(z.number()).refine((value) => value.length > 0, {
    message: "selectPermissionError",
  }),
  id: z.number().optional(),
});
function RoleForm({
  closeForm,
  role,
}: {
  closeForm: () => void;
  role?: RoleFullData;
}) {
  const permisions = usePermissionsList();
  const [state, action, isPending] = useActionState(
    role ? editRole : createRole,
    undefined
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role?.name || "",
      permissions: role?.permissions ? role.permissions.map((p) => p.id) : [],
      id: role && role.id,
    },
  });
  // const watched = form.watch("permissions");
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("rolesTable.form");
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
            await action(data);
          });
        })}
        className="space-y-8 w-full"
      >
        <FormField
          control={form.control}
          translation="rolesTable.form"
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
          name="permissions"
          translation="rolesTable.form"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">{t("permissions")}</FormLabel>
                <FormDescription>{t("permissionsDescription")}</FormDescription>
              </div>
              <div className="flex max-w-full flex-wrap gap-7">
                {permisions.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    translation="rolesTable.form"
                    name="permissions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={permission.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <div className="flex items-center gap-1">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(permission.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        permission.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== permission.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {t(permission.name)}
                            </FormLabel>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
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

export default RoleForm;
