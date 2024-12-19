import React from "react";
import RolePage from "../../../[id]/page";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RolePage isModal params={Promise.resolve({ id })} />;
}

export default page;
