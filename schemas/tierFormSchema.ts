import { z } from "zod";
import { Permission } from "@/types/Permission";

export const tierFormSchema = (permissions: Permission[]) =>
  z.object({
    name: z
      .string({
        required_error: "nameRequiredError",
      })
      .min(2, "nameRequiredError"),
    permission_ids: z
      .array(z.number())
      .refine((value) => value.length > 0, {
        message: "selectPermissionError",
      })
      .refine((value) => validateRolePermissions(value, permissions), {
        message: "selectShowRoleError",
      })
      .refine((value) => validateAdminUserPermissions(value, permissions), {
        message: "selectShowAdminUserError",
      })
      .refine((value) => validateTiersPermissions(value, permissions), {
        message: "selectShowTierError",
      }),
    id: z.number().optional(),
    usd_price: z.coerce
      .number({
        required_error: "usdPriceRequiredError",
      })
      .min(0, "usdPriceRequiredError"),
    egp_price: z.coerce
      .number({
        required_error: "egpPriceRequiredError",
      })
      .min(0, "egpPriceRequiredError"),
    commission: z.coerce
      .number({
        required_error: "commissionRequiredError",
      })
      .min(0, "commissionRequiredError"),
    description: z
      .string({
        required_error: "descriptionRequiredError",
      })
      .min(10, "descriptionMinLengthError")
      .max(500, "descriptionMaxLengthError"),
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
function validateTiersPermissions(value: number[], permissions: Permission[]) {
  const permissionsById = Object.groupBy(permissions, ({ id }) => id);
  if (
    value.some((id) =>
      ["tiers-delete", "tiers-edit"].includes(permissionsById[id]![0].name)
    )
  ) {
    const showTierId = permissions.find((p) => p.name === "tiers-show")?.id;
    return value.includes(showTierId!);
  }
  return true;
}
