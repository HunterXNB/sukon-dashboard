"use client";
import { LoggedInUser } from "@/types/user";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<LoggedInUser>({} as LoggedInUser);

export default function AuthContextProvider({
  children,
  user,
}: {
  user: LoggedInUser;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export const useUser = () => useContext(AuthContext);
