import React from "react";

function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col justify-center items-center gap-5">
      <h1 className="text-xl md:text-3xl xl:text-6xl">404</h1>
      <p>The requested page is not found.</p>
    </div>
  );
}

export default NotFound;
