import { cva } from "class-variance-authority";

export const inputVariants = cva([], {
    variants: {
        inputType: {
            default: [
                "border",
                "border-gray-800",
                "placeholder:text-gray-400",
                "rounded-sm",
                "font-sans",
                "w-full",

                "border",
                "bg-transparent",
                "shadow-sm",
                "transition-colors",
                "placeholder:text-muted-foreground",
                "focus-visible:outline-none",
                "ring-gray-400",
                "focus-visible:ring-2",
                "focus-visible:ring-ring",
                "disabled:cursor-not-allowed",
                "disabled:opacity-50",
            ],
            invisible: ["invisible", "absolute"],
        },
        size: {
            fit: ["text-sm"],
            small: ["p-2", "text-sm"],
            medium: ["p-3"],
            large: ["p-4"],
        },
        type: {
            text: ["text"],
            number: [
                "number",
                "[appearance:textfield]",
                "[&::-webkit-outer-spin-button]:appearance-none",
                "[&::-webkit-inner-spin-button]:appearance-none",
            ],
            password: ["password"],
            email: ["email"],
            search: ["search"],
            tel: ["tel"],
            url: ["url"],
        },
    },
    defaultVariants: {
        inputType: "default",
        size: "medium",
        type: "text",
    },
    compoundVariants: [
        {
            inputType: "invisible",
            size: "medium",
            className: ["!p-0"],
        },
    ],
});
