import OpenedModal from "@/components/OpenedModal";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return <OpenedModal>{children}</OpenedModal>;
}

export default layout;
