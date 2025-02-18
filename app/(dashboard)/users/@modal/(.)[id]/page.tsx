import React from "react";
import UserPage from "@/components/users/UserPage";

function page({ params }: { params: Promise<{ id: string }> }) {
  return <UserPage params={params} isModal />;
}

export default page;
