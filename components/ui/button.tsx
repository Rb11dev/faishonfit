import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-luxury disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-void text-bone hover:bg-champagne hover:text-void dark:bg-bone dark:text-void dark:hover:bg-champagne",
        invert:
          "bg-bone text-void hover:bg-champagne",
        outline:
          "border border-current bg-transparent hover:bg-foreground hover:text-background",
        ghost: "bg-transparent hover:bg-white/5",
        link: "underline-offset-4 hover:underline normal-case tracking-normal",
        champagne: "bg-champagne text-void hover:bg-champagne-light",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-5 text-[11px]",
        lg: "h-14 px-10 text-sm",
        icon: "h-11 w-11",
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
