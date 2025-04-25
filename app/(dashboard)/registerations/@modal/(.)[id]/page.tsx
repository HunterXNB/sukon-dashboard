import React from "react";
import RegisterationPage from "../../[id]/page";

function page({ params }: { params: Promise<{ id: string }> }) {
  return <RegisterationPage params={params} />;
}

export default page;
