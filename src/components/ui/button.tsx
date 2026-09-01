import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 min-h-11 px-3.5 text-sm font-medium duration-150 ease-out disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
  {
    variants: {
      variant: {
        solid: "rounded-sm bg-magenta text-surface hover:brightness-110",
        cyan: "rounded-sm bg-cyan text-bg hover:brightness-110",
        ghost:
          "rounded-sm border border-line bg-raised text-fg hover:border-cyan",
        chip: "rounded-full border border-line bg-raised text-fg",
        copy: "rounded-sm border border-cyan bg-transparent text-cyan hover:bg-cyan hover:text-bg",
      },
    },
    defaultVariants: { variant: "ghost" },
  },
);

export function Button({
  className,
  variant,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
