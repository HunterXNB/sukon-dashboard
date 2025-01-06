"use client";

import { useState } from "react";
import MultipleSelector from "../ui/extension/multi-select";
import { fetchData } from "@/lib/utils";
import { Role } from "@/types/role";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

function RolesSelector<T>({ field }: { field: T }) {
  const [err, setErr] = useState(false);
  const t = useTranslations("adminsTable.form.rolesSelector");

  return (
    <MultipleSelector
      {...field}
      onSearch={async (value) => {
        const req = await fetchData(`/roles/index?search=${value}`);
        if (!req.ok) {
          setErr(true);
          return [];
        }
        const res = await req.json();
        const data = (res.data.data as Role[]).map((role) => ({
          value: role.id.toString(),
          label: role.name,
        }));
        return data;
      }}
      triggerSearchOnFocus
      placeholder={t("placeholder")}
      loadingIndicator={
        <p className="py-5 flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </p>
      }
      emptyIndicator={
        <p className="w-full text-center text-lg leading-10 text-muted-foreground">
          {err ? t("error") : t("noRoles")}
        </p>
      }
    />
  );
}

export default RolesSelector;
