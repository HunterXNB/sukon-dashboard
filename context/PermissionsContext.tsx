"use client";

import { Permission } from "@/types/Permission";
import { createContext, ReactNode, useContext } from "react";

const PermissionsContext = createContext<Permission[]>([]);
export const PermissionsContextProvider = ({
  children,
  permissionsList,
}: {
  children: ReactNode;
  permissionsList: Permission[];
}) => (
  <PermissionsContext.Provider value={permissionsList}>
    {children}
  </PermissionsContext.Provider>
);
export const usePermissionsList = () => useContext(PermissionsContext);
