import React from "react";
import AdminPage from "../../[id]/page";

function page({ params }: { params: Promise<{ id: string }> }) {
  return <AdminPage params={params} />;
}

export default page;
