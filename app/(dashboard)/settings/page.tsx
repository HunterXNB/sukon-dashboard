import { getUser } from "@/actions/auth";
import SettingsForm, {
  SettingsFormData,
} from "@/components/settings/SettingsForm";
import { fetchData } from "@/lib/utils";
import { redirect } from "next/navigation";
import React from "react";

async function SettingsPage() {
  const user = await getUser();

  const settingsPermissions = user?.permissions?.Settings.filter(
    (el) => el !== "settings-edit"
  );
  if ((settingsPermissions?.length ?? 0) === 0) return redirect("/");
  const req = await fetchData("/settings/index");
  if (!req.ok) {
    if (req.status === 403 || req.status === 401) return redirect("/");
  }
  const data = (await req.json()).data as SettingsFormData[];

  return (
    <div className="flex-1 flex items-center justify-center w-full">
      <SettingsForm settingsData={data[0]} />
    </div>
  );
}

export default SettingsPage;
