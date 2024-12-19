import { PermissionName } from "./Permission";

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
