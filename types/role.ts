export type Role = {
  id: number;
  name: string;
  is_active: boolean;
  is_assigned_to_any_user: boolean;
};
export type RoleFullData = Role & {
  permissions: { id: number; name: PermissionName }[];
};
