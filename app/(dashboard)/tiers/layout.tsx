import React, { ReactNode } from "react";

function AdminLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      <div className="flex-1 flex items-center justify-center w-full">
        {children}
      </div>
      <div className="hidden">{modal}</div>
    </>
  );
}

export default AdminLayout;
