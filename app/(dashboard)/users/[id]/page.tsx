import UserPage from "@/components/users/UserPage";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
}
async function AdminPage({ params }: IProps) {
  return <UserPage params={params} />;
}

export default AdminPage;
