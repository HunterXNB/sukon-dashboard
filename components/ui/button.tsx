import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-600 focus-visible:ring-primary dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0 dark:disabled:bg-primary-300 dark:disabled:text-white/50 disabled:bg-primary-200",
        extra:
          "bg-accent text-secondary-900 dark:text-white dark:bg-white/10 hover:bg-[#EBEBEF] dark:hover:bg-white/20 focus-visible:ring-primary dark:ring-offset-0 disabled:text-secondary-300 disabled:bg-secondary-50 dark:disabled:text-white/40",
        "destructive-extra":
          "bg-destructive-secondary dark:bg-white/10 text-destructive hover:bg-destructive-secondary-hover dark:hover:bg-white/20 focus-visible:ring-destructive disabled:text-destructive-outline dark:disabled:text-[#F53D6B80]/50",
        "destructive-ghost":
          "bg-background text-destructive hover:bg-destructive-secondary dark:hover:bg-white/10  focus-visible:ring-destructive disabled:text-[#F98BA6] dark:disabled:text-[#F53D6B80]/50",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover disabled:bg-destructive-outline focus-visible:ring-destructive dark:disabled:text-white/50",
        outline:
          "border shadow-xs border-secondary-200 bg-white dark:border-white/20 dark:bg-black hover:bg-accent dark:hover:bg-white/10 focus-visible:ring-primary  disabled:text-secondary-300 dark:ring-offset-0 dark:disabled:text-white/40",
        "destructive-outline":
          "border border-destructive-outline text-destructive shadow-xs bg-background hover:bg-destructive-secondary dark:hover:bg-white/10 disabled:text-[#F98BA6] dark:disabled:text-[#F53D6B80]/50 focus-visible:ring-destructive",
        secondary:
          "bg-secondary text-secondary-50 dark:bg-white dark:text-secondary-900 hover:bg-secondary-700 dark:hover:bg-white/80 focus-visible:ring-secondary dark:focus-visible:ring-white disabled:bg-secondary-200 dark:disabled:bg-white/20 dark:disabled:text-white/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary disabled:text-secondary-300 dark:hover:bg-white/10 dark:disabled:text-white/40",
        link: "text-primary underline-offset-4 underline hover:text-primary-700 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:text-primary-400 dark:disabled:text-primary-300/50",
        "destructive-link":
          "text-[#D50B3E] underline-offset-4 underline dark:text-[#F53D6B] hover:text-[#AF0932] dark:hover:text-[#F76489] disabled:text-[#F98BA6] dark:disabled:text-[#F53D6B]/50 focus-visible:ring-0 focus-visible:ring-offset-0",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 rounded-md px-2 py-1",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
