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

export type PermissionName = RolesPermissionName | AdminUsersPermissionName;

export type Permission = {
  id: number;
  name: PermissionName;
};
