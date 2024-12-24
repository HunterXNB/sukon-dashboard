import { z } from "zod";
import { Permission } from "@/types/Permission";

export const roleFormSchema = (permissions: Permission[]) =>
  z.object({
    name: z
      .string({
        required_error: "nameRequiredError",
      })
      .min(2, "nameRequiredError"),
    permissions: z
      .array(z.number())
      .refine((value) => value.length > 0, {
        message: "selectPermissionError",
      })
      .refine((value) => validateRolePermissions(value, permissions), {
        message: "selectShowRoleError",
      })
      .refine((value) => validateAdminUserPermissions(value, permissions), {
        message: "selectShowAdminUserError",
      }),
    id: z.number().optional(),
  });

function validateRolePermissions(value: number[], permissions: Permission[]) {
  const permissionsById = Object.groupBy(permissions, ({ id }) => id);
  if (
    value.some((id) =>
      ["roles-edit", "roles-delete", "roles-activation-toggle"].includes(
        permissionsById[id]![0].name
      )
    )
  ) {
    const showRoleId = permissions.find((p) => p.name === "roles-show")?.id;
    return value.includes(showRoleId!);
  }
  return true;
}

function validateAdminUserPermissions(
  value: number[],
  permissions: Permission[]
) {
  const permissionsById = Object.groupBy(permissions, ({ id }) => id);
  if (
    value.some((id) =>
      [
        "admin-users-activation-toggle",
        "admin-users-delete",
        "admin-users-edit",
      ].includes(permissionsById[id]![0].name)
    )
  ) {
    const showAdminUserId = permissions.find(
      (p) => p.name === "admin-users-show"
    )?.id;
    return value.includes(showAdminUserId!);
  }
  return true;
}
