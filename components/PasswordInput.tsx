"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<"input">, "type">
>(({ ...props }, ref) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const locale = useLocale();
  return (
    <div className="relative flex flex-col">
      <Input
        {...props}
        ref={ref}
        type={isPasswordShown ? "text" : "password"}
      />
      <button
        tabIndex={-1}
        onClick={() => setIsPasswordShown((prev) => !prev)}
        type="button"
        className={cn(
          `absolute top-1/2 -translate-y-1/2 self-end ${
            locale === "ar" ? "translate-x-2" : "-translate-x-2"
          } text-gray-400 hover:text-primary`,
          {
            "text-primary": isPasswordShown,
          }
        )}
      >
        <Eye />
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
