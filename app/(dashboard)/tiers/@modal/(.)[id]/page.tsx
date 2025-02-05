import React from "react";
import TierPage from "@/components/tiers/TierPage";

function page({ params }: { params: Promise<{ id: string }> }) {
  return <TierPage params={params} isModal />;
}

export default page;
