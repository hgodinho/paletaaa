import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    ["disabled:opacity-50", "disabled:cursor-not-allowed"],
    {
        variants: {
            variant: {
                default: ["bg-black", "text-white", "p-4"],
                menu: ["p-2", "w-full", "h-full"],
                icon: [
                    "p-2",
                    "rounded-full",
                    "hover:bg-gray-00",
                    "aria-disabled:opacity-50",
                    "aria-disabled:cursor-not-allowed",
                ],
                square: [
                    "flex",
                    "items-center",
                    "justify-center",
                    "h-8",
                    "border",
                    "rounded-sm",
                    "border",
                    "border-gray-800",
                    "hover:bg-gray-00",
                ],
                trigger: [
                    "flex",
                    "items-center",
                    "justify-center",
                    "p-2",
                    "border",
                    "border-gray-800",
                    "hover:bg-gray-00",
                    "z-20",
                    "duration-300",
                ],
                none: [],
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);
