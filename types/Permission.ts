export type RolesPermissionName =
  | "roles-list"
  | "roles-show"
  | "roles-create"
  | "roles-edit"
  | "roles-delete"
  | "roles-activation-toggle";
export type AdminUsersPermissionName =
  | "admin-users-list"
  | "admin-users-show"
  | "admin-users-create"
  | "admin-users-edit"
  | "admin-users-delete"
  | "admin-users-activation-toggle";
export type TiersPermissionName =
  | "tiers-list"
  | "tiers-show"
  | "tiers-create"
  | "tiers-edit"
  | "tiers-delete";
export type UsersPermissionName =
  | "users-list"
  | "users-show"
  | "users-edit"
  | "users-delete"
  | "users-activate"
  | "users-deactivate";

export type SettingsPermissionName = "settings-list" | "settings-edit";
export type PermissionName =
  | RolesPermissionName
  | AdminUsersPermissionName
  | TiersPermissionName
  | SettingsPermissionName
  | UsersPermissionName;

export type Permission = {
  id: number;
  name: PermissionName;
};
