import { cva } from "class-variance-authority";

export const buttonGroupVariants = cva(
    [
        "w-fit",
        "h-fit",
        "flex",
        "justify-center",
        "items-center",
        "border",
        "mt-2",
        "lg:mt-3",

        "transform",
        "duration-300",
    ],
    {
        variants: {
            variant: {
                default: [],
                rounded: ["rounded-full"],
            },
            dir: {
                row: "flex-row",
                col: "flex-col",
            },
        },
        defaultVariants: {
            variant: "default",
            dir: "row",
        },
    }
);
