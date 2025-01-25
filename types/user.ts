import { AdminUsersPermissionName, RolesPermissionName } from "./Permission";

export type User = {
  avatar: string;
  email: string;
  id: number;
  is_active: boolean;
  mobile: string;
  name: string;
  role: string;
  permissions: PermissionName[];
};
export type LoggedInUser = {
  avatar: string;
  email: string;
  id: number;
  is_active: boolean;
  mobile: string;
  name: string;
  role: { id: number; name: string };
  permissions: {
    Roles: RolesPermissionName[];
    AdminUsers: AdminUsersPermissionName[];
  };
};
