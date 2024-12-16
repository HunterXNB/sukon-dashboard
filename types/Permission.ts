export type PermissionName =
  | "roles-list"
  | "roles-show"
  | "roles-create"
  | "roles-edit"
  | "roles-delete"
  | "roles-activation-toggle"
  | "admin-users-list"
  | "admin-users-show"
  | "admin-users-create"
  | "admin-users-edit"
  | "admin-users-delete"
  | "admin-users-activation-toggle";

export type Permission = {
  id: number;
  name: PermissionName;
};
