import React, { ReactNode } from "react";

function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex items-center justify-center w-full">
      {children}
    </div>
  );
}

export default AdminLayout;
