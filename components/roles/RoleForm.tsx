import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { usePermissionsList } from "@/context/PermissionsContext";
import { ControllerRenderProps, useForm } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import { RoleFullData } from "@/types/role";
import { Permission } from "@/types/Permission";
import { roleFormSchema } from "@/schemas/roleFormSchema";

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
  const formSchema = roleFormSchema(permisions);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role?.name || "",
      permissions: role?.permissions ? role.permissions.map((p) => p.id) : [],
      id: role && role.id,
    },
  });
  const checkedPermissions = form.watch("permissions");
  const locale = useLocale();
  const { toast } = useToast();
  const toasted = useRef(false);
  const t = useTranslations("rolesTable.form");
  useFormServerError(form, state);
  const tp = useTranslations("permissionsNames");
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
  useEffect(() => {
    if (checkedPermissions.length === 0) return;
    const permissionsById = Object.groupBy(permisions, ({ id }) => id);
    // roles permissions filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "roles-edit" ||
          permissionsById[id]?.[0].name === "roles-delete" ||
          permissionsById[id]?.[0].name === "roles-activation-toggle"
      ).length > 0
    ) {
      const showRoleId = permisions.find((p) => p.name === "roles-show")?.id;
      if (!checkedPermissions.includes(showRoleId!)) {
        form.setValue("permissions", [...checkedPermissions, showRoleId!]);
      }
    }
    // admin users with roles permissions filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "admin-users-create" ||
          permissionsById[id]?.[0].name === "admin-users-edit"
      ).length > 0
    ) {
      const listRolesId = permisions.find((p) => p.name === "roles-list")?.id;
      if (!checkedPermissions.includes(listRolesId!)) {
        form.setValue("permissions", [...checkedPermissions, listRolesId!]);
      }
    }
    // admin users permissions filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "admin-users-activation-toggle" ||
          permissionsById[id]?.[0].name === "admin-users-delete" ||
          permissionsById[id]?.[0].name === "admin-users-edit"
      ).length > 0
    ) {
      const showAdminUserId = permisions.find(
        (p) => p.name === "admin-users-show"
      )?.id;
      if (!checkedPermissions.includes(showAdminUserId!)) {
        form.setValue("permissions", [...checkedPermissions, showAdminUserId!]);
      }
    }
    // tiers permissions filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "tiers-delete" ||
          permissionsById[id]?.[0].name === "tiers-edit"
      ).length > 0
    ) {
      const showTierId = permisions.find((p) => p.name === "tiers-show")?.id;
      if (!checkedPermissions.includes(showTierId!)) {
        form.setValue("permissions", [...checkedPermissions, showTierId!]);
      }
    }

    // settings permissions filter
    if (
      checkedPermissions.filter(
        (id) => permissionsById[id]?.[0].name === "settings-edit"
      ).length > 0
    ) {
      const listSettingsId = permisions.find(
        (p) => p.name === "settings-list"
      )?.id;
      if (!checkedPermissions.includes(listSettingsId!)) {
        form.setValue("permissions", [...checkedPermissions, listSettingsId!]);
      }
    }
    // users permissions filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "users-edit" ||
          permissionsById[id]?.[0].name === "users-delete" ||
          permissionsById[id]?.[0].name === "users-deactivate" ||
          permissionsById[id]?.[0].name === "users-activate"
      ).length > 0
    ) {
      const showUserId = permisions.find((p) => p.name === "users-show")?.id;
      if (!checkedPermissions.includes(showUserId!)) {
        form.setValue("permissions", [...checkedPermissions, showUserId!]);
      }
    }
    // specializations permissions filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "specializations-edit" ||
          permissionsById[id]?.[0].name === "specializations-delete"
      ).length > 0
    ) {
      const showSpecializationId = permisions.find(
        (p) => p.name === "specializations-show"
      )?.id;
      if (!checkedPermissions.includes(showSpecializationId!)) {
        form.setValue("permissions", [
          ...checkedPermissions,
          showSpecializationId!,
        ]);
      }
    }
    // registerations filter
    if (
      checkedPermissions.filter(
        (id) =>
          permissionsById[id]?.[0].name === "registrations-approve" ||
          permissionsById[id]?.[0].name === "registrations-reject" ||
          permissionsById[id]?.[0].name === "registrations-delete"
      ).length > 0
    ) {
      const showRegistrationId = permisions.find(
        (p) => p.name === "registrations-show"
      )?.id;
      if (!checkedPermissions.includes(showRegistrationId!)) {
        form.setValue("permissions", [
          ...checkedPermissions,
          showRegistrationId!,
        ]);
      }
    }
  }, [checkedPermissions, permisions, form]);

  function calculateDisabledState(
    p: Permission,
    fieldValue: ControllerRenderProps<
      {
        name: string;
        permissions: number[];
        id?: number | undefined;
      },
      "permissions"
    >
  ) {
    if (fieldValue.value.length === 0) return false;
    const groupByName = Object.groupBy(permisions, ({ name }) => name);
    // handle roles
    if (p.name === "roles-show") {
      if (
        fieldValue.value.includes(
          groupByName["roles-activation-toggle"]![0].id
        ) ||
        fieldValue.value.includes(groupByName["roles-delete"]![0].id) ||
        fieldValue.value.includes(groupByName["roles-edit"]![0].id)
      ) {
        return true;
      }
    }

    if (p.name === "roles-list") {
      if (
        fieldValue.value.includes(groupByName["admin-users-edit"]![0].id) ||
        fieldValue.value.includes(groupByName["admin-users-create"]![0].id)
      ) {
        return true;
      }
    }
    // handle admin users
    if (p.name === "admin-users-show") {
      if (
        fieldValue.value.includes(
          groupByName["admin-users-activation-toggle"]![0].id
        ) ||
        fieldValue.value.includes(groupByName["admin-users-delete"]![0].id) ||
        fieldValue.value.includes(groupByName["admin-users-edit"]![0].id)
      ) {
        return true;
      }
    }
    if (p.name === "tiers-show") {
      if (
        fieldValue.value.includes(groupByName["tiers-edit"]![0].id) ||
        fieldValue.value.includes(groupByName["tiers-delete"]![0].id)
      ) {
        return true;
      }
    }
    // handle settings
    if (p.name === "settings-list") {
      if (fieldValue.value.includes(groupByName["settings-edit"]![0].id)) {
        return true;
      }
    }
    // handle users
    if (p.name === "users-show") {
      if (
        fieldValue.value.includes(groupByName["users-edit"]![0].id) ||
        fieldValue.value.includes(groupByName["users-delete"]![0].id) ||
        fieldValue.value.includes(groupByName["users-activate"]![0].id) ||
        fieldValue.value.includes(groupByName["users-deactivate"]![0].id)
      ) {
        return true;
      }
    }
    // handle specializations
    if (p.name === "specializations-show") {
      if (
        fieldValue.value.includes(groupByName["specializations-edit"]![0].id) ||
        fieldValue.value.includes(groupByName["specializations-delete"]![0].id)
      ) {
        return true;
      }
    }
    // handle registerations
    if (p.name === "registrations-show") {
      if (
        fieldValue.value.includes(
          groupByName["registrations-approve"]![0].id
        ) ||
        fieldValue.value.includes(groupByName["registrations-delete"]![0].id) ||
        fieldValue.value.includes(groupByName["registrations-reject"]![0].id)
      ) {
        return true;
      }
    }

    return false;
  }
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
                                disabled={calculateDisabledState(
                                  permission,
                                  field
                                )}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {tp(permission.name)}
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
