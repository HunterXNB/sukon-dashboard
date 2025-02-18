import React, { ReactNode } from "react";

function RolesLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      <div className="hidden">{modal}</div>
    </>
  );
}

export default RolesLayout;
