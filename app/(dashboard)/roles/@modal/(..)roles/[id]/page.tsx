import React from "react";
import RolePage from "../../../[id]/page";

async function page({ params }: { params: Promise<{ id: string }> }) {
  return <RolePage isModal params={params} />;
}

export default page;
