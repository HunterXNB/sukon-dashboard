import TierPage from "@/components/tiers/TierPage";
import React from "react";
interface IProps {
  params: Promise<{ id: string }>;
}
async function AdminPage({ params }: IProps) {
  return <TierPage params={params} />;
}

export default AdminPage;
