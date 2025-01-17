import { cva } from "class-variance-authority";

export const labelVariants = cva(["flex", "flex-col", "gap-1", "text-lg"], {
    variants: {
        size: {
            fit: ["text-sm"],
            small: ["text-sm"],
            medium: ["text-lg"],
            large: ["text-xl"],
        },
    },
    defaultVariants: {
        size: "medium",
    },
});
