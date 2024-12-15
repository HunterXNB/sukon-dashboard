"use client";
import { User } from "@/types/user";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<User>({} as User);

export default function AuthContextProvider({
  children,
  user,
}: {
  user: User;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export const useUser = () => useContext(AuthContext);
