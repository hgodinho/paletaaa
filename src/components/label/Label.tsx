import { cn } from "@/lib";
import { LabelProps } from "./types";
import { cva, VariantProps } from "class-variance-authority";

const labelVariants = cva(["flex", "gap-2", "text-lg"], {
    variants: {
        size: {
            small: ["text-sm", "items-center"],
            medium: ["text-lg", "flex-col"],
            large: ["text-xl"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

export function Label({
    ref,
    className,
    title,
    children,
    size,
    ...props
}: LabelProps<VariantProps<typeof labelVariants>>) {
    return (
        <label
            ref={ref}
            className={labelVariants({ className, size })}
            {...props}
        >
            {title && (
                <span className={cn("font-bold", "font-mono")}>{title}</span>
            )}
            {children}
        </label>
    );
}
