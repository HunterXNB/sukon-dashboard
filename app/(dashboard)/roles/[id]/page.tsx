import RolePage from "@/components/roles/RolePage";

function Page({ params }: { params: Promise<{ id: string }> }) {
  return <RolePage params={params} />;
}

export default Page;
