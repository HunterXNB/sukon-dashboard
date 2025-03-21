import {
  AdminUsersPermissionName,
  RolesPermissionName,
  SettingsPermissionName,
  TiersPermissionName,
  UsersPermissionName,
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
export type AppUser = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  created_at: string;
  is_active: boolean;
};
export type AppUserFull = {
  id: number;
  first_name: string;
  last_name: string | null;
  mobile: string;
  email: string;
  avatar: string;
  type: string;
  date_of_birth: string;
  gender: "male" | "female";
  is_active: boolean;
  is_email_verified: boolean;
  has_completed_signup: boolean;
  role: {
    id: number;
    name: string;
    is_active: boolean;
  };
  last_login_at: string;
  login_count: number;
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
    Settings: SettingsPermissionName[];
    Users: UsersPermissionName[];
  } | null;
};
