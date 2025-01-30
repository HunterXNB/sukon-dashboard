import {
  AdminUsersPermissionName,
  RolesPermissionName,
  TiersPermissionName,
} from "./Permission";

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
  first_name: string;
  last_name: string | null;
  role: { is_active: boolean; name: string };
  permissions: {
    Roles: RolesPermissionName[];
    AdminUsers: AdminUsersPermissionName[];
    Tiers: TiersPermissionName[];
  } | null;
};
