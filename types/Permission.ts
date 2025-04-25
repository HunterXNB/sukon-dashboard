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
export type SpecializationsPermissionName =
  | "specializations-list"
  | "specializations-create"
  | "specializations-edit"
  | "specializations-delete"
  | "specializations-show";
export type RegistrationsPermissionsName =
  | "registrations-list"
  | "registrations-show"
  | "registrations-delete"
  | "registrations-approve"
  | "registrations-reject";

export type SettingsPermissionName = "settings-list" | "settings-edit";
export type PermissionName =
  | RolesPermissionName
  | AdminUsersPermissionName
  | TiersPermissionName
  | SettingsPermissionName
  | UsersPermissionName
  | SpecializationsPermissionName
  | RegistrationsPermissionsName;

export type Permission = {
  id: number;
  name: PermissionName;
};
