import RolePage from "@/components/roles/RolePage";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  return <RolePage isModal params={params} />;
}

export default page;
